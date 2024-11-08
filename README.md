# IoT-based Attendance Management System


A modern, real-time attendance management system powered by IoT devices and a web-based dashboard. The system uses IoT sensors for entry/exit detection and provides comprehensive analytics through an interactive dashboard.

## Features

- **Real-time Attendance Tracking**
  - Automated entry/exit detection using IoT sensors
  - Instant attendance status updates
  - Section-wise attendance monitoring

- **Interactive Dashboard**
  - Class-wise attendance visualization
  - Weekly attendance trends
  - Hourly attendance patterns
  - Attendance prediction analytics

- **Data Management**
  - CSV export functionality
  - Detailed attendance records
  - Section-wise filtering
  - Summary statistics

- **Technical Features**
  - RESTful API backend
  - InfluxDB time-series database
  - Real-time data updates
  - Responsive web design

## Technology Stack

- **Frontend**
  - HTML5/CSS3
  - JavaScript
  - Chart.js for data visualization
  - Tailwind CSS for styling

- **Backend**
  - Node.js
  - Express.js
  - InfluxDB for time-series data
  - RESTful API architecture

- **IoT**
  - Entry/Exit detection sensors
  - Real-time data transmission

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/iot-attendance-system.git
cd iot-attendance-system
```

2. Install dependencies:
```bash
npm install
```

3. Configure InfluxDB:
   - Set up an InfluxDB instance
   - Update the configuration in `app.js`:
```javascript
const url = 'your-influxdb-url';
const token = 'your-token';
const org = 'your-org';
const bucket = 'your-bucket';
```

4. Start the server:
```bash
npm start
```

5. Access the dashboard at `http://localhost:3040`

## API Endpoints

### GET /api/attendance
Fetches attendance records with optional section filtering.

**Query Parameters:**
- `section` (optional): Filter by section (A-F, or 'overall')

**Response:**
```json
{
  "attendanceData": [
    {
      "section": "A",
      "roll_number": "001",
      "status": "entry_detected",
      "time": "2024-11-08 10:30:00"
    }
  ],
  "summary": {
    "totalStudents": 100,
    "totalEntries": 80,
    "totalExits": 75,
    "sectionWise": {
      "A": {
        "totalStudents": 20,
        "entries": 15,
        "exits": 14
      }
    }
  }
}
```

## Configuration

The system can be configured through the following environment variables:

```env
PORT=3040
INFLUXDB_URL=your-influxdb-url
INFLUXDB_TOKEN=your-token
INFLUXDB_ORG=your-org
INFLUXDB_BUCKET=your-bucket
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

Mungara Hitesh- hiteshmungara012@gmail.com
Project Link: https://github.com/yourusername/iot-attendance-system

## Acknowledgments

* Chart.js for visualization components
* Tailwind CSS for the UI framework
* InfluxDB for time-series data management
* All contributors who have helped shape this project