// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { } from 'dotenv/config';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import mongoose from 'mongoose';
import helmet from 'helmet';
import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import { userRoutes } from './modules/user';
import { authRoutes } from './modules/auth';
import validAuthentication from './middlewares/validAuthentication';

mongoose.Promise = global.Promise;

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

app.use(validAuthentication());

// Routes
app.use('/user', userRoutes);

// catch 404 and forward to error handler
// app.use((req, res, next) => {
//   const err = new Error("Not Found");
//   err.status = 404;
//   next(err);
// });

mongoose.connect(
  process.env.MONGODB_URL_CONNECT,
  { useNewUrlParser: true, useUnifiedTopology: true },
  async (err: Error) => {
    if (err) {
      console.log('There was an error connecting to MongoDB', err.message);
      throw err;
    } else {
      try {
        app.listen({ port: process.env.PORT }, () => {
          if (process.env.NODE_ENV === 'develop') {
            console.log(`Server is working on PORT: ${process.env.PORT}`);
          } else {
            console.log('Server is working on "..."');
          }
        });
      } catch (errServer) {
        console.log('There was an error connecting to the application');
        throw errServer;
      }
    }
  },
);
