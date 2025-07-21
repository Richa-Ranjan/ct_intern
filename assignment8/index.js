const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = 3000;

// Set storage engine
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// Init upload
const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 }, // 1MB
    fileFilter: function (req, file, cb) {
        const filetypes = /jpeg|jpg|png|gif/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);
        if (mimetype && extname) return cb(null, true);
        cb(new Error('Only image files are allowed!'));
    }
});

// Serve static folders
app.use('/uploads', express.static('uploads'));
app.use(express.static('public'));

// Route: Serve Upload Form
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route: Handle File Upload
app.post('/upload', upload.single('myImage'), (req, res) => {
    if (!req.file) return res.send('No file uploaded.');

    res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Upload Success</title>
    <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@500&display=swap" rel="stylesheet">
    <style>
        body {
            background: linear-gradient(135deg, #e6e6fa, #f8e8ff);
            font-family: 'Quicksand', sans-serif;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            text-align: center;
            color: #4b0082;
            animation: fadeIn 1s ease-in-out;
        }

        .container {
            background: #fff0f5;
            padding: 30px 40px;
            border-radius: 16px;
            box-shadow: 0 12px 30px rgba(75, 0, 130, 0.2);
        }

        h2 {
            margin-bottom: 15px;
            color: #6a0dad;
        }

        img {
            max-width: 250px;
            border-radius: 12px;
            margin-top: 20px;
        }

        a {
            display: inline-block;
            margin-top: 15px;
            padding: 10px 20px;
            border-radius: 25px;
            background-color: #b57edc;
            color: white;
            text-decoration: none;
            transition: 0.3s ease;
        }

        a:hover {
            background-color: #a060c0;
        }

        .back {
            margin-top: 15px;
            font-size: 14px;
        }

        .back a {
            background: none;
            color: #6a0dad;
            text-decoration: underline;
            padding: 0;
        }

        @keyframes fadeIn {
            from { opacity: 0; }
            to   { opacity: 1; }
        }
    </style>
</head>
<body>
    <div class="container">
        <h2>✅ File Uploaded Successfully!</h2>
        <a href="/uploads/${req.file.filename}" target="_blank">🔗 View Image</a>
        <br>
        <img src="/uploads/${req.file.filename}" alt="Uploaded Image">
        <div class="back">
            <p><a href="/">⬅️ Upload Another Image</a></p>
        </div>
    </div>
</body>
</html>
    `);
});

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Error: ' + err.message);
});

app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
