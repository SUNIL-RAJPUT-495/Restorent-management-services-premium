import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './src/config/db.js';
import morgan from 'morgan';
import http from 'http';
import { Server } from "socket.io";
import mongoose from 'mongoose';

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
import publicRoutes from './src/routes/app/publicRoutes.js';

dotenv.config();
const isVercel = !!process.env.VERCEL;

const app = express();
const allowedOrigins = new Set([
  "http://localhost:5173",
  "http://localhost:8080",
  "https://restorent-management-services-premi-fawn.vercel.app",
  "https://restorent-management-services-premi.vercel.app",
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

let httpServer;
let io;
let server;

if (!isVercel) {
  httpServer = http.createServer(app);
  io = new Server(httpServer, {
    cors: {
      origin: ["http://localhost:5173", "http://localhost:8080", "https://restorent-management-eight.vercel.app", "https://restorent-management-services-premi.vercel.app"],
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
app.use('/api/public/:restId', publicRoutes);

app.get('/', (req, res) => {
  res.send('Restaurant Management API is running');
});

connectDB().then(() => {
  console.log('Database connected successfully');
  
  if (!isVercel && httpServer) {
    const PORT = process.env.PORT || 5000;
    let retries = 0;
    const maxRetries = 2;

    const startServer = () => {
      server = httpServer.listen(PORT, () => {
        console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`);
      });

      server.on('error', (err) => {
        if (err.code === 'EADDRINUSE') {
          if (retries < maxRetries) {
            retries++;
            console.log(`⚠️ Port ${PORT} is busy, retrying in 2s... (Attempt ${retries}/${maxRetries})`);
            setTimeout(startServer, 2000);
          } else {
            console.error(`❌ Port ${PORT} is still in use after retries. Please check for zombie processes.`);
            setTimeout(() => process.exit(1), 1000);
          }
        } else {
          console.error('Server error:', err);
        }
      });
    };

    startServer();
  }
}).catch((error) => {
  console.error('Database connection failed:', error.message);
  if (!isVercel) process.exit(1);
});

// Graceful shutdown
const gracefulShutdown = () => {
  console.log('Shutting down gracefully...');
  if (typeof server !== 'undefined') {
    server.close(() => {
      console.log('HTTP server closed');
      mongoose.connection.close(false).then(() => {
        console.log('MongoDB connection closed');
        process.exit(0);
      });
    });
  } else {
    process.exit(0);
  }
};

process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);

export default app;