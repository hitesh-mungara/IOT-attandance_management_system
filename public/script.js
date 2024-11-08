document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/attendance')
      .then(response => response.json())
      .then(data => {
        const tbody = document.querySelector('#data-table tbody');
        tbody.innerHTML = '';
  
        data.attendanceData.forEach(record => {
          const row = document.createElement('tr');
  
          const hourCell = document.createElement('td');
          hourCell.textContent = record.hour;
          row.appendChild(hourCell);
  
          const minuteCell = document.createElement('td');
          minuteCell.textContent = record.minute;
          row.appendChild(minuteCell);
  
          const statusCell = document.createElement('td');
          statusCell.textContent = record.status;
          row.appendChild(statusCell);
  
          const timeCell = document.createElement('td');
          timeCell.textContent = new Date(record.time).toLocaleString();
          row.appendChild(timeCell);
  
          tbody.appendChild(row);
        });
      })
      .catch(error => console.error('Error fetching data:', error));
  });
  