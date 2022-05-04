import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import filesRouter from './routes/files.route';

const dev = process.env.NODE_ENV !== 'production';

dotenv.config({ path: `.env.${dev ? 'development' : 'production'}` });

const fileUpload = require('express-fileupload');
const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(fileUpload());
app.use('/api/files', filesRouter);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

//FOR TESTING PURPOSE
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "test.html"));
});

if (!dev) {
    app.use(express.static(path.join(__dirname, './client')));

    app.get('/*', (req, res) => {
        res.sendFile(path.join(__dirname, './client/test.html'));
    });
}
