import express from 'express';
import path from 'path';
import dotenv from 'dotenv';

const dev = process.env.NODE_ENV !== 'production';

dotenv.config({ path: `.env.${dev ? 'development' : 'production'}` });

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

if (!dev) {
    app.use(express.static(path.join(__dirname, './client')));

    app.get('/*', (req, res) => {
        res.sendFile(path.join(__dirname, './client/index.html'));
    });
}
