const express = require('express');
const http = require('http');
const request = require('request');

const app = express();
const port = process.env.PORT || 8000;
const serverName = 'Maksym Zimak';

app.use(express.static('public'));

app.get('/', function(req, res) {
  const clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const time = new Date().toLocaleString('en-US', { timeZone });
  
  res.send(`
    <div>
      <p>Your IP address is: ${clientIp}</p>
      <p>The current time in your timezone is: ${time}</p>
    </div>
  `);
});

const server = http.createServer(app);

server.listen(port, async function() {
  console.log(`Server started on ${new Date()} by ${serverName}. Listening on port ${port}`);
  
  try {
    const open = (await import('open')).default;
    open(`http://localhost:${port}`);
  } catch (error) {
    console.error('Failed to open the browser:', error);
  }
});
