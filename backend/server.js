import path from 'path';
import express from 'express';
import 'colors';
import 'dotenv/config';
import morgan from 'morgan';
import connectDb from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from './routes/uploadRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

connectDb();

const app = express();

if(process.env.NODE_ENV === 'development'){
  app.use(morgan('dev'))
}

app.use(express.json())

app.get('/', (req, res) => {
    res.send('home');
});

app.use('/api/products', productRoutes);

app.use('/api/users', userRoutes)

app.use("/api/orders", orderRoutes);

app.use('/api/upload', uploadRoutes)

app.get("/api/config/paypal", (req, res) =>
  {
    res.send(process.env.PAYPAL_CLIENT_ID)
}
);

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

app.use(notFound);

app.use(errorHandler);

const PORT = process.env.PORT || 3800;

app.listen(PORT, console.log(`server running in ${process.env.NODE_ENV} mode on PORT ${PORT}`.green.underline.bold));