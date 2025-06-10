const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = 3000;

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    const query = parsedUrl.query;

    if (pathname === '/create') {
        const filePath = path.join(__dirname, query.filename);
        fs.writeFile(filePath, query.content || '', (err) => {
            if (err) {
                res.writeHead(500);
                return res.end('Error creating file');
            }
            res.writeHead(200);
            res.end(`File ${query.filename} created`);
        });

    } else if (pathname === '/read') {
        const filePath = path.join(__dirname, query.filename);
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                res.writeHead(404);
                return res.end('File not found');
            }
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(data);
        });

    } else if (pathname === '/delete') {
        const filePath = path.join(__dirname, query.filename);
        fs.unlink(filePath, (err) => {
            if (err) {
                res.writeHead(404);
                return res.end('File not found or already deleted');
            }
            res.writeHead(200);
            res.end(`File ${query.filename} deleted sucessfully`);
        });

    } else {
        res.writeHead(404);
        res.end('Invalid endpoint');
    }
});

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
