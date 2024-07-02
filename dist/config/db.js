"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.conn = exports.connection = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
require("dotenv/config");
const connection = () => __awaiter(void 0, void 0, void 0, function* () {
    var connectionString = `mongodb://${process.env.DB_USER}:${process.env.DB_PSWD}@${process.env.DB_IP}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
    yield mongoose_1.default.connect(connectionString);
    mongoose_1.default.connection.on('connected', function () {
        console.log(`****************************************************\n****************************************************\n******************* ${'HappyTaxi_db'} *******************\n****************************************************\n****************************************************
     `);
    });
    mongoose_1.default.connection.on('error', function (err) {
        //console.log(("Mongoose default connection has occured " + err + " error"));
    });
    mongoose_1.default.connection.on('disconnected', function () {
        //console.log(("Mongoose default connection is disconnected"));
    });
});
exports.connection = connection;
exports.conn = mongoose_1.default.connection;
// const { MongoClient } = require('mongodb');
// export const mongodb =  MongoClient.connect(connectionString, {}).then((client) => {
//     const db = client.db('node-mongo-blog');
//     // do database things
// }).catch((error) => {
//     // handle connection errors
// });
//# sourceMappingURL=db.js.map