const express = require('express');
const { InfluxDB } = require('@influxdata/influxdb-client');
const cors = require('cors');
const path = require('path');
const app = express();
const port = 3041;

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// InfluxDB configuration
const url = 'https://us-east-1-1.aws.cloud2.influxdata.com';
const token = 'GMl6XxkFlO7mCeWt0FDgM9xs-iJPbVmg5ZxGIUUeq5mAZ_m1X-Rz2yLOajelza2tmgOmjM8EuHAfvdMJvXELWA==';
const org = 'Amrita';
const bucket = 'gg';
const influxDB = new InfluxDB({ url, token });
const queryApi = influxDB.getQueryApi(org);

// Endpoint to fetch past week's attendance data
app.get('/api/attendance', async (req, res) => {
  const section = req.query.section || 'overall';
  
  let query = `
    from(bucket: "${bucket}")
    |> range(start: -7d)
    |> filter(fn: (r) => r._measurement == "attendance_records")
  `;

  if (section !== 'overall') {
    query += `|> filter(fn: (r) => r.section == "${section}")`;
  }

  query += `|> pivot(rowKey:["_time"], columnKey: ["_field"], valueColumn: "_value")`;

  try {
    const attendanceData = [];
    await new Promise((resolve, reject) => {
      queryApi.queryRows(query, {
        next(row, tableMeta) {
          const record = tableMeta.toObject(row);
          attendanceData.push({
            section: record.section,
            roll_number: record.roll_number,
            status: record.status,
            time: new Date(record._time).toLocaleString(),
          });
        },
        error(error) {
          console.error('Query error:', error);
          reject(error);
        },
        complete() {
          resolve();
        },
      });
    });

    // Add summary statistics
    const summary = {
      totalStudents: new Set(attendanceData.map(r => r.roll_number)).size,
      totalEntries: attendanceData.filter(r => r.status === 'entry_detected').length,
      totalExits: attendanceData.filter(r => r.status === 'exit_detected').length,
      sectionWise: {},
    };

    // Calculate section-wise statistics
    const sections = ['A', 'B', 'C', 'D', 'E', 'F'];
    sections.forEach(sec => {
      const sectionData = attendanceData.filter(r => r.section === sec);
      summary.sectionWise[sec] = {
        totalStudents: new Set(sectionData.map(r => r.roll_number)).size,
        entries: sectionData.filter(r => r.status === 'entry_detected').length,
        exits: sectionData.filter(r => r.status === 'exit_detected').length,
      };
    });

    res.json({ 
      attendanceData, 
      summary,
      count: attendanceData.length 
    });
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Error fetching attendance data' });
  }
});

// Serve the UI
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});