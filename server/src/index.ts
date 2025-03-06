import dotenv from 'dotenv';
dotenv.config();

import 'reflect-metadata';
import { DB } from './common/config/postgresql.config';
import express from 'express';
import cors from 'cors';
import compression from 'compression';
import Logger from './middlewares/logeer';
import errorHandler from './middlewares/errorHandler';
import router from './routes';
import corsOption from './common/config/cors.config';
import cookieParser from 'cookie-parser';

const app = express();

// * middelwares
app.use(cors(corsOption));
app.use(express.json());
app.use(compression());
app.use(cookieParser());

app.use('/api', router);
app.use(Logger);
app.use(errorHandler);

const startServer = async () => {
  try {
    await DB.initialize();
    console.log('Connected to DB');

    // port, host
    const port = Number(process.env.PORT);
    const host = process.env.HOST; // 개발 0.0.0.0 , 배포 127.0.0.1
    // server start
    app.listen(port, host, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error('Unable to start the server:', error);
  }
};

startServer();
