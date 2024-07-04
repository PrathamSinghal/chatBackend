import { error } from 'winston';
import { Response, Request, json } from 'express';
import mongoose from 'mongoose';
import * as dotenv from "dotenv";
dotenv.config();
import moment from 'moment';
import axios from 'axios';
import EventEmitter from 'events';

import { enumType, resObj } from '../../utils/responseMessage';
import { _httpStatusService } from '../../utils/_httpStatus';
import { PdfService } from "../../services/pdf.service";
import { BoxService } from '../../services/box.service';


class pdfController {

    constructor() {

    }

    async pdfList(req:Request,res:Response) {

        try {
            let querys: any = req.query;
    
            let query = {
                page: parseInt(querys.page) || 1,
                limit: parseInt(querys.limit) || 10,
            }
    
            let result = await PdfService.list({ }, query)
            return res.status(_httpStatusService.status.OK)
            .json({
                status:_httpStatusService.status.OK,
                message:"Pdf Details fetched successfully",
                data:result
            })

        } catch (error) {
            return res.status(_httpStatusService.status.serverError)
            .json(resObj.error(error))
        }

    }

    async getPdfDetails(req:Request,res:Response) {

        try {
            let _id: any = req.params;

            let thisId = new mongoose.Types.ObjectId(_id);

            let result = await PdfService.findOne({ _id: thisId });



            let tokenData = await BoxService.getFileFolderToken(result?.boxFileId,result?.parentFolder);

            return res.status(_httpStatusService.status.OK)
                .json({
                    message: "Details Fetched Succesfully",
                    data: {
                        ...result._doc,
                        ...tokenData
                    }
                })

        } catch (error) {
            return res.status(_httpStatusService.status.serverError)
            .json(resObj.error(error))
        }

    }

    async pdfDelete(req:Request,res:Response) {

        try {
            let { ids } = req.body;
    
            ids.map(async (id:any) => {
                await PdfService.delete({ _id: id });
            })
    
            let obj = {
                "status": 200,
                "message": "Pdf delete successfully !",
            }
            return res.status(_httpStatusService.status.OK)
                    .json(obj)

        } catch (error) {
            return res.status(_httpStatusService.status.serverError)
            .json(resObj.error(error))
        }

    }

    async processPdf(req:Request,res:Response) {

        try {
            
            // "url": "https://app.box.com/shared/static/xb03u32krysahuilj0kdf4yho4cn0ca6.pdf"
            let data = JSON.stringify({
                "url": req.body.url,
                "pdfId": req.body.pdfId
            });

            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'http://127.0.0.1:4005/process_pdf',
                headers: { 
                    'Content-Type': 'application/json'
                },
                data : data
            };

            await axios.request(config)
            .then((response) => {
                return res.status(200).json(response.data);
            })
            .catch((error) => {
                console.log(error);
                return res.status(400).json({error})
            });

        } catch (error) {
            return res.status(_httpStatusService.status.serverError)
            .json(resObj.error(error))
        }

    }

    async askQuestion(req:Request,res:Response) {

        try {
            
            // "url": "https://app.box.com/shared/static/xb03u32krysahuilj0kdf4yho4cn0ca6.pdf"
            let data = JSON.stringify({
                "question": req.body.question,
                pdfId: "1234"
            });

            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'http://127.0.0.1:4005/ask_question',
                headers: { 
                    'Content-Type': 'application/json'
                },
                data : data
            };

            await axios.request(config)
            .then((response) => {
                console.log(response.data);

                

                return res.status(200).json(response.data);
            })
            .catch((error) => {
                console.log(error);
                return res.status(400).json({error})
            });

        } catch (error) {
            return res.status(_httpStatusService.status.serverError)
            .json(resObj.error(error))
        }

    }

    async askQuestionSocket(question?:any,pdfId?:any) {
        try {
            
            let data = JSON.stringify({
                "question": question,
                pdfId: pdfId
            });

            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'http://127.0.0.1:4005/ask_question',
                headers: { 
                    'Content-Type': 'application/json'
                },
                data : data
            };
            

            const responseData  = await axios.request(config);
            return responseData?.data?.reply;

        } catch (error) {
            return error.message;
        }

    }

    async processPdfSocket(url?:any,pdfId?:any) {

        try {
            
            // "url": "https://app.box.com/shared/static/xb03u32krysahuilj0kdf4yho4cn0ca6.pdf"
            let data = JSON.stringify({
                "url": url,
                "pdfId": pdfId
            });

            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'http://127.0.0.1:4005/process_pdf',
                headers: { 
                    'Content-Type': 'application/json'
                },
                data : data
            };

            const pdfUploadData =  await axios.request(config);
            return pdfUploadData;

        } catch (error) {
            return error.message;
        }

    }


}


export const PdfController = new pdfController()


