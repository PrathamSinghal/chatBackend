import morgan from 'morgan';
import {Request,Response} from 'express';
import { join } from "path";
import { createWriteStream } from "fs";
import readline from 'readline'
import fs from "fs";
let accessLog = createWriteStream(join(__dirname, 'access.log'));

morgan.token('host', function(req:Request, res:Response) {
    return req.hostname;
});
morgan.token('apiUrl', function(req:Request, res:Response) {
    // console.log(req)
    return req['_parsedUrl']['pathname'];
});
morgan.token('apiTime', function(req:Request, res:Response) {
    return new Date()
});

morgan.token('quary', function(req:Request, res:Response) {
    return JSON.stringify(req.query);
});
morgan.token('body', function(req:Request, res:Response) {
    return JSON.stringify(req.body);
});


morgan.token('params', function(req:Request, res:Response) {
    return JSON.stringify(req.params);
});

morgan.token('header', function(req:Request, res:Response) {
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

const loggArray:any = []
const loggArray1:any = [];
let temp_obj:any ={};
let obj = {
    // obj_key:obj_value
}
export const winston_logger_file =async(req:Request, res:Response)=>{
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
      
      return res.download(join(__dirname, 'access.log'))
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
}
// export  const winston_logger =  morgan("date|:apiTime, method|:method, header|:header, host|:host, apiUrl|:apiUrl ,quary|:quary, body|:body,params|:params,status|:status ,res|:res[content-length] -, response_time|:response-time ms",{stream:accessLog})
