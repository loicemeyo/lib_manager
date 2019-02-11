import userModel from '../models/user';
import { MongoClient } from 'mongodb';
const databaseUrl = 'mongodb://127.0.0.1:27017/hellobooks';

export default class UserController {
  static signUp(req, res) {
    (async function mongo() {
      let client;
      try {
        const client = await MongoClient.connect(databaseUrl, {
          useNewUrlParser: true
        });
        const db = client.db();
        const userCollection = await userModel(db);
        const takenUser = await userCollection
          .find({ email: req.body.email })
          .toArray();
        if (takenUser.length > 0) {
          return res.json({
            message: 'email is taken'
          });
        } else {
          const user = await userCollection.insertOne({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            role: 'user'
          });
          res.status(201).json({
            success: true,
            user: user,
            message: 'Account created succesfully'
          });
        }
      } catch (error) {
        res.status(500).json({
          success: false,
          error: {
            message: error
          }
        });
      }
    })();
  }
  static signIn(req, res) {
    (async function mongo() {
      let client;
      try {
        const client = await MongoClient.connect(databaseUrl, {
          useNewUrlParser: true
        });
        const db = client.db();
        const userCollection = await userModel(db);
        const registeredUser = await userCollection
          .find({ email: req.body.email })
          .toArray();
        const correctPassword = await userCollection
          .find({ password: req.body.password })
          .toArray();
        if (registeredUser.length < 1) {
          return res.json({
            message: 'Unregistered user. Make sure you register as a user first'
          });
        } else if (correctPassword.length < 1) {
          return res.json({
            message: 'Please provide correct password'
          });
        } else {
          const loggingInUser = await userCollection.insertOne({
            email: req.body.email,
            password: req.body.password
          });
          res.status(200).json({
            loggedIn: loggingInUser,
            success: true,
            message: 'User logged in successfully'
          });
        }
      } catch (error) {
        res.status(500).json({
          success: false,
          error: {
            message: error
          }
        });
      }
    })();
  }
}
