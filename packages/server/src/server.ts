import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT_NUMBER || 5000;

app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
});