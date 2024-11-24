const express = require('express');
const https = require('https');
const fs = require('fs');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

const options = {
    key: fs.readFileSync(path.join(__dirname, '../certs/localhost+1-key.pem')),
    cert: fs.readFileSync(path.join(__dirname, '../certs/localhost+1.pem'))
};

const server = https.createServer(options, app);

const PORT = 433;

server.listen(PORT, () => {
    console.log(`Server is running on https://localhost:${PORT}`);
});