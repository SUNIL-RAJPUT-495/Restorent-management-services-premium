import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './src/config/db.js';
import morgan from 'morgan';
import http from 'http';
import { Server } from "socket.io";

// super Admin 
import superAdminRouter from './src/routes/Super_Admin/auth.Super.js';
import SaasPlanRouter from './src/routes/Super_Admin/createSaasPlan.js';
import restorentRouter from './src/routes/Super_Admin/restorentRouter.js';
import blogRouter from './src/routes/Super_Admin/blogRouter.js';
import authRoutes from './src/routes/app/authRoutes.js';
import productRoutes from './src/routes/app/productRoutes.js';
import orderRoutes from './src/routes/app/orderRoutes.js';
import tableRoutes from './src/routes/app/tableRoutes.js';
import ingredientRoutes from './src/routes/app/ingredientRoutes.js';
import settingRoutes from './src/routes/app/settingRoutes.js';
import webhookRoutes from './src/routes/app/webhook.routes.js';
import leadRoutes from './src/routes/app/leadRoutes.js';
import imbPaymentRoutes from './src/routes/app/imbPaymentRoutes.js';

dotenv.config();
const isVercel = !!process.env.VERCEL;

const app = express();
const allowedOrigins = new Set([
  "http://localhost:5173",
  "https://restorent-management-eight.vercel.app",
  "https://restorent-management-services-premi.vercel.app",
  "https://restorent-management-services-premium.vercel.app",
]);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow server-to-server and non-browser requests.
      if (!origin) return callback(null, true);

      // Allow explicit known origins and related Vercel subdomains.
      const isAllowed =
        allowedOrigins.has(origin) ||
        /^https:\/\/restorent-management-services-[a-z0-9-]+\.vercel\.app$/i.test(origin);

      if (isAllowed) return callback(null, true);
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(morgan('dev'));

if (!isVercel) {
  const httpServer = http.createServer(app);
  const io = new Server(httpServer, {
    cors: {
      origin: ["https://restorent-management-eight.vercel.app", "https://restorent-management-services-premi.vercel.app"],
      methods: ["GET", "POST", "PUT", "DELETE"]
    }
  });

  app.set('socketio', io);

  io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);
    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });

  const PORT = process.env.PORT || 5000;
  const server = httpServer.listen(PORT, () => {
    console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      process.exit(1);
    } else {
      throw err;
    }
  });
}

app.use('/api/super-admin', superAdminRouter);
app.use('/api/saas-plan', SaasPlanRouter);
app.use('/api/restaurant', restorentRouter);
app.use('/api/blogs', blogRouter);


app.use('/api/admin', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/tables', tableRoutes);
app.use('/api/ingredients', ingredientRoutes);
app.use('/api/settings', settingRoutes);
app.use('/api/webhooks', webhookRoutes);
app.use('/api/leads', leadRoutes);
app.use('/api/public/payment/imb', imbPaymentRoutes);

app.get('/', (req, res) => {
  res.send('Restaurant Management API is running');
});

connectDB().catch((error) => {
  console.error('Database connection failed:', error.message);
});

export default app;