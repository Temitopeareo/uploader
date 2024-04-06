const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 3000;

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

app.use(express.static(path.join(__dirname, 'public')));

/*app.post('/uploads', upload.array('uploaded_files', 5), (req, res) => {
    const files = req.files;
    if (!files) {
        return res.status(400).send('No files were uploaded.');
    }

    res.send('Files uploaded successfully!');
});*/
app.post('/uploads', upload.array('uploaded_files'), (req, res) => {
    const files = req.files;
    if (!files || files.length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    res.send('Files uploaded successfully!');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
