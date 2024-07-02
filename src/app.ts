import express, { Application as ExApplication, Handler, } from 'express';
import cors from 'cors'
import { userRoutes } from './routes/user.routes';
import { logger } from './utils/Logger';
// import {winston_logger,winston_logger_file}from './utils/winston-logger';
import { resObj } from './utils/responseMessage';
// import { fileUpdate } from './utils/s3.service';
import { BoxService } from './services/box.service';
var md5 = require('md5');

import * as dotenv from "dotenv";
import 'module-alias/register';
import glob from 'glob'
dotenv.config();

import path from 'path';
import multer from 'multer';

const allowedExt = [
    '.js',
    '.ico',
    '.css',
    '.png',
    '.jpg',
    '.woff2',
    '.woff',
    '.ttf',
    '.svg',
];
// const limiter = rateLimit({
//     windowMs: 1 * 60 * 1000, // 15 minutes
//     max: 40, // limit each IP to 1 request per windowMs
//     message: "Too many request from this IP"
// });


class Application {

    private readonly _instance: ExApplication;
    get instance(): ExApplication {
        return this._instance;
    }
    Logger: any = logger
    constructor() {
        this._instance = express();
        this._instance.set('view engine', 'ejs');
        this._instance.set('views', path.join(__dirname, 'views'))
        this._instance.use(express.json({ limit: '5000mb' }))
        this._instance.use(express.urlencoded({ limit: '5000mb', extended: false, parameterLimit: 5000000 }))
        this._instance.use(cors());
        this._instance.use(express.json());


        // this._instance.use('/status', (req: express.Request, res: express.Response) => {
        //     res.json({
        //         status: 200
        //     })
        // })
        // this._instance.post('/debug', (req: express.Request, res: express.Response) => {
        //     var cdr = req.body;
        //     console.log(cdr);
        //     res.send('got it');
        
        // })

        let storage = multer.diskStorage({
            destination: function (req, file, callback) {
    
                callback(null, 'temp/');
            },
            filename: function (req, file, callback) {
                let fileUniqueName = md5(Date.now());
                callback(null, fileUniqueName + path.extname(file.originalname));
            }
        });
        let upload = multer({
            storage: storage
        });

        

        
        this._instance.use('/apiDoc', express.static(path.resolve(__dirname, "doc/")));
        // this._instance.route('/fileUpload').post(multer({ dest: 'temp/', limits: { fieldSize: 8 * 1024 * 1024 } }).single('file'), fileUpdate);
        this._instance.route('/fileUploadBox').post(upload.single('file'),
        // multer({ dest: 'temp/', limits: { fieldSize: 8 * 1024 * 1024 } }).single('file'), 
        BoxService.uploadFileBox);

        this._instance.use('/api/user/', userRoutes)
        
        this._instance.use('*', (req, res) => {
            console.log("ismeaaya2");
            console.log(path.join(__dirname, '..', '..', '..', 'chatFrontend'),"path.joi");
            console.log(req,"request")
            console.log(req.url,"requesturl")
            console.log(req.baseUrl,"baseUrl")

            if (allowedExt.filter(ext => req.baseUrl.indexOf(ext) > 0).length > 0) {
                let url = (req.baseUrl).replace('/pdfDetails', '')
                console.log(req.baseUrl,"baseUrl1")

                console.log(url,"finalurl")

                res.sendFile(path.resolve(path.join(__dirname, '..', '..', '..', 'chatFrontend', 'build', url)));
            } else
                res.sendFile(path.resolve(path.join(__dirname, '..', '..', '..', 'chatFrontend', 'build', 'index.html')));


        })

       
        this._instance.use(function (req, res, next) {
            // Website you wish to allow to connect
            res.setHeader('Access-Control-Allow-Origin', '*');

            // Request methods you wish to allow
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

            // Request headers you wish to allow
            res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

            // Set to true if you need the website to include cookies in the requests sent
            // to the API (e.g. in case you use sessions)
            // res.setHeader('Access-Control-Allow-Credentials', true);

            // Pass to next layer of middleware
            next();
        });



        this._instance.use((err: any, req: any, res: any, next: any) => {
            res.status(400).json(resObj.InvalidJson(err.message))
            logger.error(`${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        })

        // Capture 404 erors
        this._instance.use((req, res, next) => {
            res.status(404).json(resObj.pageNotFound(req.originalUrl));
            logger.error(`400 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        })

        

    }

    initRoutes = (app: any) => {
        // including all routes
        glob(path.join(__dirname, 'Routes', '*.js'), {
            cwd: path.resolve("./src")
        }, (err: any, routes: any) => {
            if (err) {
                ////console.log("Error occured including routes");
                return;
            }
            routes.forEach((routePath: any) => {
                require(routePath).getRouter(app); // eslint-disable-line
            });

            app.get('*', (req: any, res: any) => {

                console.log(req,"ismeaaya1")
                console.log(req.url,"req.url")

                if (allowedExt.filter(ext => req.url.indexOf(ext) > 0).length > 0) {
                    let url = (req.url.split('?')[0]).replace('/webPanel', '')
                    res.sendFile(path.resolve(path.join(__dirname, '..', '..', '..', 'Web-Scraper', 'build', url)));
                } else
                    res.sendFile(path.resolve(path.join(__dirname, '..', '..', '..', 'Web-Scraper', 'build', 'index.html')));

            });

        });
    }



}
export default new Application()

