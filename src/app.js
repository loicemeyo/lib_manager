import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import express from 'express';
import mongodb from 'mongodb';
// import dotenv from 'dotenv';

// dotenv.config();

const app = express();
const MongoClient = mongodb.MongoClient;
// const databaseUrl = process.env.DATABASE_URL;
const databaseUrl = 'mongodb://127.0.0.1:27017/hellobooks';
import userModel from './models/user';
import userRouter from './routes/user';

(async () => {
  try {
    const client = await MongoClient.connect(
      databaseUrl,
      { useNewUrlParser: true }
    );

    const db = client.db();
  } catch (e) {
    console.log(e);
  }
  //Middleware

  app.use(cors());
  app.use(morgan('dev'));
  app.options('*', cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  app.get('/', (req, res) => {
    res.send('Hello World');
  });
  app.use('/api/v1/users', userRouter);
})();
export default app;
