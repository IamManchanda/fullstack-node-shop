/* Node.js */

const http = require('http');
const fs = require('fs');

const server = http.createServer(function requestListener(request, response) {
  const { url, method } = request;
  if (url === '/') {
    response.writeHead(200, {
      'Content-Type': 'text/html',
    });
    response.write(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/foundation/6.5.3/css/foundation.min.css"/>
        <title>Enter Message</title>
      </head>
      <body>
        <div class="grid-container fluid">
          <div class="grid-x grid-padding-x grid-padding-y">
            <div class="cell">
              <h1>Enter Message</h1>
              <form action="/message" method="POST">
                <div class="grid-x">
                  <div class="cell medium-10">
                    <input type="text" name="message" />
                  </div>
                  <div class="cell medium-2">
                    <button class="button expanded" type="submit">Send</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </body>
      </html>
    `);
    return response.end();
  }
  if (url === '/message' && method === 'POST') {
    const body = [];
    request.on('data', function fetchChunk(chunk) {
      body.push(chunk);
    });
    return request.on('end', function makeBuffer() {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split('=')[1];
      fs.writeFile('message.txt', message, function done(error) {
        if (error) console.error({ error });
        response.writeHead(302, { 'Location': '/' });
        response.end();
      });
    });
  }
  response.writeHead(200, {
    'Content-Type': 'text/html',
  });
  response.write('<h1>404</h1>');
  response.end();
});

server.listen(3000);
