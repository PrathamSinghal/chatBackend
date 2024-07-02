

import {Router} from 'express';
import * as validations from '../validations/_index';
import * as controllers from '../controller/_index';
import {errorResponse} from '../middleware/validations-error.middleware';


const router:Router = Router();


// all books routes 
export  const userRoutes = [

    router.get('/pdfList',controllers.user.PdfController.pdfList),
    router.get('/getpdfDetails/:id',validations.user.getPdfData,errorResponse,controllers.user.PdfController.getPdfDetails),
    router.post('/pdfDelete',controllers.user.PdfController.pdfDelete),


    // router.post('/processPdf',controllers.user.PdfController.processPdf),
];