import aws from 'aws-sdk';
import fs from 'fs';
import moment from 'moment';
import { environment } from '../../environment';
import { PdfService } from '../services/pdf.service';
const multerS3 = require('multer-s3');

// export const  fileUpdate=(req:any, res:any) =>{
//     // aws.config.setPromisesDependency();
//      aws.config.update({
//       accessKeyId: environment.ACCESS_KEY_ID,
//       secretAccessKey: environment.SECRET_ACCESS_KEY,
//       region: environment.AWS_REGION
//     });
//     const s3 = new aws.S3();
//     var fileName = moment().format('mmssmmHHMMYYYY');
//     console.log(`${fileName}.${req.file.mimetype.split('/')[1]}`)
//     var params = {
//       ACL: 'public-read',
//       Bucket: environment.S3_BUCKET,
//       Body: fs.createReadStream(req.file.path),
//       Key: `${fileName}.${req.file.mimetype.split('/')[1]}`,
//       contentType: multerS3.AUTO_CONTENT_TYPE,
//     };
    
//     s3.upload(params,async (err:any, data:any) => {
//       if (err) {
//         console.log('Error occured while trying to upload to S3 bucket', err);
//         return res.status(422).json({
//           status:422,
//           message:"  validate all fields ",
//           errors:[
//             {
//               msg:err.message,
//               param:"file",
//               location:"body"
//             }
//           ]
//         })
        
//       }

//       if (data) {
//         // console.log({hh:req})
//         //  console.log({req:req})
//         //  let token = await JsonWebTokenService._accessJwtTokenCheck(req);
//         //  if(!token) return res.json({h:32})
     
//         fs.unlinkSync(req.file.path); // Empty temp folder
//         const locationUrl = data.Location;

//         let pdfData = {
//             name: req.file.originalname.split('.')[0],
//             size: req.file.size,
//             url: data.Location
//         }

//         let pdfSavedData = await PdfService.create(pdfData);

//         return res.json({
//           status:200,
//           message:"successfully upload Imgae",
//           data: pdfSavedData,
//         })
     
//       }
//     });
// }