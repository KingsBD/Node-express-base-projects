/* eslint-disable import/first */
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

import helmet from 'helmet';
import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import { userRoutes } from '../modules/user';
import { authRoutes } from '../modules/auth';
import validAuthentication from '../middlewares/validAuthentication';
import serverErrorManager from '../utils/exeptions/server-errors.exeption';

const app = express();

const arrAllowedOrigins = [process.env.BASE_URL, process.env.FRONT_URL];

if (process.env.DEV_FRONT_URL) {
  arrAllowedOrigins.push(process.env.DEV_FRONT_URL);
}

const corsOptions = {
  origin(origin: any, callback: any) {
    if (arrAllowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

app.use(cors(corsOptions));

app.use(helmet());

app.use(bodyParser.json());

app.use('/auth', authRoutes);

app.use(validAuthentication);

// Routes
app.use('/user', userRoutes);

// Errors
app.use(serverErrorManager);

export default app;
