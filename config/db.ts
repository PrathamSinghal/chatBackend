import mongoose from 'mongoose';
import 'dotenv/config';

export const connection = async () => {
     var connectionString = `mongodb://${process.env.DB_USER}:${process.env.DB_PSWD}@${process.env.DB_IP}:${process.env.DB_PORT}/${process.env.DB_NAME}`
    await mongoose.connect(connectionString)
      mongoose.connection.on('connected', function () {
     console.log(`****************************************************\n****************************************************\n******************* ${'HappyTaxi_db'} *******************\n****************************************************\n****************************************************
     `)
    });
    mongoose.connection.on('error', function (err) {
        //console.log(("Mongoose default connection has occured " + err + " error"));
    });
        mongoose.connection.on('disconnected', function () {
        //console.log(("Mongoose default connection is disconnected"));
    });
    
}


export const conn = mongoose.connection;


// const { MongoClient } = require('mongodb');


// export const mongodb =  MongoClient.connect(connectionString, {}).then((client) => {
//     const db = client.db('node-mongo-blog');
//     // do database things
// }).catch((error) => {
//     // handle connection errors
// });