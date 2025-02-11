import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { connectDatabase } from './db';

dotenv.config({ path: path.resolve(__dirname, '../../../.env') });
const app = express();
const PORT = process.env.MAIN_SERVER_PORT || 5000;

connectDatabase();
app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
});