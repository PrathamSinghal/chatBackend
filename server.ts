
import application from './src/app';
import * as http from 'http';
import {connection} from './config/db';
import {logger} from './src/utils/Logger';


import 'module-alias/register';

import moment from 'moment';
console.time("Starting")
const PORT = process.env.PORT || 3000;
const server = http.createServer(application.instance);
console.timeEnd("Starting")
console.time("db connect")
connection()
console.timeEnd("db connect")

console.time("server start")
server.listen(PORT, () => {
  ////console.log(`Server is listening on :${PORT}`);
  logger.info(`Server started and running on http://localhost:${process.env.PORT}}`)
  console.timeEnd("server start")
});


