import express from 'express';
import dotenv from 'dotenv';
import { connection } from './config/database.js';
import userRouter from './routes/user.js';
import authRouter from './routes/auth.js';
import productRouter from './routes/products.js';
import cartRouter from './routes/cart.js';
import ErrorAPI from './utils/errorAPI.js';
import globalError from './middleware/error.js';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'node:fs';
import cors from 'cors';

dotenv.config();
connection();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(express.json());
app.post('/image', (req, res) => {
  const imageBuffer = fs.readFileSync(path.join(__dirname, `uploads/${req.body.path}`));
  res.send(imageBuffer);
});
app.use(cors());
app.use('/user', userRouter);
app.use('/auth', authRouter);
app.use('/product', productRouter);
app.use('/cart', cartRouter);
app.use(globalError);

app.all('*', (req, res, next) => {
  next(new ErrorAPI(`Can't find this route: ${req.originalUrl}`, 404));
});
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`app listening on port : ${PORT} `);
});
