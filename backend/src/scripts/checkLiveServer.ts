import axios from 'axios';

async function scanPorts() {
  const ports = [5000, 5001, 5002, 5040, 5050, 7070, 8000, 8080];
  for (const port of ports) {
    try {
      const res = await axios.get(`http://127.0.0.1:${port}/`, { timeout: 1500 });
      console.log(`Port ${port} is active:`, res.data);
    } catch (e: any) {
      if (e.response) {
        console.log(`Port ${port} returned status ${e.response.status}:`, e.response.data);
      }
    }
  }
}

scanPorts();
