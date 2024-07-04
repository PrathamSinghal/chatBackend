
import application from './src/app';
import * as http from 'http';
import {connection} from './config/db';
import {logger} from './src/utils/Logger';

import 'module-alias/register';

import moment from 'moment';
import { PdfController } from './src/controller/user/pdfController';
console.time("Starting")
const PORT = process.env.PORT || 3000;
const server = http.createServer(application.instance);
console.timeEnd("Starting")
console.time("db connect")
connection()
console.timeEnd("db connect")


const socketIO = require('socket.io')(server, {
  cors: {
      origin: "*"
  }
});
let users = []

socketIO.on('connection', async (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`)  
  socket.on("message", async data => {
    console.log({data})
    socketIO.emit("messageResponse", data)
    // console.log(socketIO)
    console.log(socket.id);

    const responseData = await PdfController.askQuestionSocket(data?.text,data?.pdfId);
    console.log(responseData,"responseData")

    let respData = {
      text: responseData,
      name: 'chatbot',
      id: `${socket.id}${Math.random()}`,
      socketID: socket.id,
      pdfId: data?.pdfId
    }

    socketIO.emit("messageResponse", respData)

    // socket.emit("message", 
    //     {
    //         text: "message", 
    //         name: "chatbot", 
    //         id: `${socket.id}${Math.random()}`,
    //         socketID: socket.id,
    //         pdfId: "1578952789881"
    //     }
    // )
  })

  socket.on("typing", data => (
    socket.broadcast.emit("typingResponse", data)
  ))

  socket.on("newUser", data => {
    users.push(data)
    socketIO.emit("newUserResponse", users)
  })

  socket.on('disconnect', () => {
    console.log('🔥: A user disconnected');
    users = users.filter(user => user.socketID !== socket.id)
    socketIO.emit("newUserResponse", users)
    socket.disconnect()
  });
});

console.time("server start")
server.listen(PORT, () => {
  ////console.log(`Server is listening on :${PORT}`);
  logger.info(`Server started and running on http://localhost:${process.env.PORT}}`)
  console.timeEnd("server start")
});


