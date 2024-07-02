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
exports.winston_logger_file = void 0;
const morgan_1 = __importDefault(require("morgan"));
const path_1 = require("path");
const fs_1 = require("fs");
let accessLog = (0, fs_1.createWriteStream)((0, path_1.join)(__dirname, 'access.log'));
morgan_1.default.token('host', function (req, res) {
    return req.hostname;
});
morgan_1.default.token('apiUrl', function (req, res) {
    // console.log(req)
    return req['_parsedUrl']['pathname'];
});
morgan_1.default.token('apiTime', function (req, res) {
    return new Date();
});
morgan_1.default.token('quary', function (req, res) {
    return JSON.stringify(req.query);
});
morgan_1.default.token('body', function (req, res) {
    return JSON.stringify(req.body);
});
morgan_1.default.token('params', function (req, res) {
    return JSON.stringify(req.params);
});
morgan_1.default.token('header', function (req, res) {
    return JSON.stringify(req.headers);
});
// fs.open('./start.html', 'r', function(err, fileToRead){
//     if (!err){
//         fs.readFile(fileToRead, {encoding: 'utf-8'}, function(err,data){
//             if (!err){
//             console.log('received data: ' + data);
//             // response.writeHead(200, {'Content-Type': 'text/html'});
//             // response.write(data);
//             // response.end();
//             }else{
//                 console.log(err);
//             }
//         });
//     }else{
//         console.log(err);
//     }
// });
const loggArray = [];
const loggArray1 = [];
let temp_obj = {};
let obj = {
// obj_key:obj_value
};
const winston_logger_file = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const fileStream:any = fs.createReadStream(join(__dirname, 'access.log'));
    //     fs.readFile(join(__dirname, 'access.log'), 'utf8', function(err, data) {
    //         console.log(data.toString(),"?");
    //         loggArray1.push(data)
    //   });
    //     const rl = readline.createInterface({
    //         input: fileStream,
    //         crlfDelay: Infinity
    //       });
    //       // Note: we use the crlfDelay option to recognize all instances of CR LF
    //       // ('\r\n') in input.txt as a single line break.
    //       for await (const line of rl) {
    //         // Each line in input.txt will be successively available here as `line`.
    //         // console.log(`Line from file: ${line}`);
    //         // let txt = line.toString()
    //         // let stringArray = txt.split(",");
    //         // console.log(`Line from file: ${stringArray}`);
    //         loggArray.push(line)
    //         // loggArray1.push(obj)
    //       }
    //       loggArray.map((v:any,i)=>{
    //         let stringArray = v.split(",");
    //         console.log({i})
    //         stringArray.map((k,i)=>{
    //             let key = k.split("|");
    //             let obj_key =key[0].trim();
    //             let obj_value =key[1];
    //             obj[obj_key] = obj_value
    //             //    console.log({obj_key,obj_value,obj})
    //         })
    //         // console.log({v,stringArray})
    //       })
    return res.download((0, path_1.join)(__dirname, 'access.log'));
    // fs.readFile(join(__dirname, 'access.log'), {encoding: 'utf-8'}, function(err,data){
    //     if (!err) {
    //         console.log('received data: ' + data);
    //         // response.writeHead(200, {'Content-Type': 'text/html'});
    //         // response.write(data);
    //         // response.end();
    //     } else {
    //         console.log(err);
    //     }
    // });
});
exports.winston_logger_file = winston_logger_file;
// export  const winston_logger =  morgan("date|:apiTime, method|:method, header|:header, host|:host, apiUrl|:apiUrl ,quary|:quary, body|:body,params|:params,status|:status ,res|:res[content-length] -, response_time|:response-time ms",{stream:accessLog})
//# sourceMappingURL=winston-logger.js.map