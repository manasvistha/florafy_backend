import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:3000' }));
app.use(express.json());

// Serve admin-uploaded product images (florafy_backend/uploads).
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// Express 5 leaves req.body as undefined when no body parser ran (e.g. a request
// sent without `Content-Type: application/json`), whereas Express 4 defaulted it
// to {}. Controllers destructure req.body, so without this they'd throw a
// TypeError and return a confusing 500 instead of a proper 400 validation error.
app.use((req, res, next) => {
  if (req.body === undefined) req.body = {};
  next();
});

app.get('/', (req, res) => {
  res.json({ message: 'Florafy API is running' });
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);

export default app;