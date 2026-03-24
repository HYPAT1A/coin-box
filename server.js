const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 10000;

// Try multiple possible locations for the static files
const possiblePaths = [
    __dirname,
    path.join(__dirname, '..'),
    path.join(__dirname, 'src'),
    '/opt/render/project/src',
    path.join(process.cwd(), 'coin-box')
];

let staticPath = __dirname;
for (const p of possiblePaths) {
    try {
        require('fs').statSync(path.join(p, 'index.html'));
        staticPath = p;
        break;
    } catch (e) {
        // continue
    }
}

console.log('Serving static files from:', staticPath);

app.use(express.static(staticPath));

app.get('/', (req, res) => {
    res.sendFile(path.join(staticPath, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});