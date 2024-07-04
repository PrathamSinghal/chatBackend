"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const app_1 = __importDefault(require("./src/app"));
const http = __importStar(require("http"));
const db_1 = require("./config/db");
const Logger_1 = require("./src/utils/Logger");
require("module-alias/register");
const pdfController_1 = require("./src/controller/user/pdfController");
console.time("Starting");
const PORT = process.env.PORT || 3000;
const server = http.createServer(app_1.default.instance);
console.timeEnd("Starting");
console.time("db connect");
(0, db_1.connection)();
console.timeEnd("db connect");
const socketIO = require('socket.io')(server, {
    cors: {
        origin: "*"
    }
});
let users = [];
socketIO.on('connection', (socket) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`⚡: ${socket.id} user just connected!`);
    socket.on("message", (data) => __awaiter(void 0, void 0, void 0, function* () {
        console.log({ data });
        socketIO.emit("messageResponse", data);
        // console.log(socketIO)
        console.log(socket.id);
        const responseData = yield pdfController_1.PdfController.askQuestionSocket(data === null || data === void 0 ? void 0 : data.text, data === null || data === void 0 ? void 0 : data.pdfId);
        console.log(responseData, "responseData");
        let respData = {
            text: responseData,
            name: 'chatbot',
            id: `${socket.id}${Math.random()}`,
            socketID: socket.id,
            pdfId: data === null || data === void 0 ? void 0 : data.pdfId
        };
        socketIO.emit("messageResponse", respData);
        // socket.emit("message", 
        //     {
        //         text: "message", 
        //         name: "chatbot", 
        //         id: `${socket.id}${Math.random()}`,
        //         socketID: socket.id,
        //         pdfId: "1578952789881"
        //     }
        // )
    }));
    socket.on("typing", data => (socket.broadcast.emit("typingResponse", data)));
    socket.on("newUser", data => {
        users.push(data);
        socketIO.emit("newUserResponse", users);
    });
    socket.on('disconnect', () => {
        console.log('🔥: A user disconnected');
        users = users.filter(user => user.socketID !== socket.id);
        socketIO.emit("newUserResponse", users);
        socket.disconnect();
    });
}));
console.time("server start");
server.listen(PORT, () => {
    ////console.log(`Server is listening on :${PORT}`);
    Logger_1.logger.info(`Server started and running on http://localhost:${process.env.PORT}}`);
    console.timeEnd("server start");
});
//# sourceMappingURL=server.js.map