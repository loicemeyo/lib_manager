import express from 'express';
import mongodb from 'mongodb';


const app = express();

const MongoClient = mongodb.MongoClient;
let db;

// Initialize connection once
MongoClient.connect('mongodb://127.0.0.1:27017', { useNewUrlParser: true }, function(err, database) {
  if(err) return console.error(err);

  db = database; 
});

export default app;