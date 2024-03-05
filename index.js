const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 8080;

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/html');

  if (req.url === '/' || req.url === '/index.html') {
    serveFile('index.html', 'text/html', res);
  } else if (req.url === '/about' || req.url === '/about.html') {
    serveFile('about.html', 'text/html', res);
  } else if (req.url === '/contact-me' || req.url === '/contact-me.html') {
    serveFile('contact-me.html', 'text/html', res);
  } else if (req.url.endsWith('.css')) {
    serveFile(req.url.slice(1), 'text/css', res);
  } else {
    // Serve error page
    serveFile('404.html', 'text.html', res);
  }
});

function serveFile(fileName, contentType, res) {
  fs.readFile(path.join(__dirname, fileName), (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.end('Internal Server Error');
    } else {
      res.setHeader('Content-Type', contentType);
      res.statusCode = 200;
      res.end(data);
    }
  })
}

server.listen(port, (error) => {
  if (error) console.log('Something went wrong', error);
  else console.log('Server is listening on port ', + port);
});