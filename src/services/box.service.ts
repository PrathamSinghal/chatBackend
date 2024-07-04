import mongoose from 'mongoose';
import * as db from '../model/_index';
import fs from "fs";
import path from "path";
import { PdfService } from "./pdf.service";

import BoxSDK from "box-node-sdk";
// import { environment } from '../../environment';
import serviceAccount from '../../box.json';
import { PdfController } from '../controller/user/pdfController';


let BOX_APP_SETTINGS = {
    "clientID": serviceAccount.clientID,
    "clientSecret": serviceAccount.clientSecret,
    "appAuth": serviceAccount.appAuth
}

var sdk = new BoxSDK(BOX_APP_SETTINGS);
var client = sdk.getAppAuthClient('enterprise', process.env.Enterprise_ID_JWT);

const getFileExchangeToken = async (fileId:any) => {
    console.log(fileId,"fileId")
    return await client.exchangeToken('item_preview', `https://api.box.com/2.0/files/${fileId}`)
    .then(tokenInfo => {
        return tokenInfo;
        // tokenInfo.accessToken contains the new downscoped access token
    }).catch(function (error) {
        return error
      });
}

class boxService {
    constructor() {

    }

    async getFileFolderToken(fileId,folderId) {

        return await client.exchangeToken('item_preview', `https://api.box.com/2.0/files/${fileId}`)
        .then(async tokenInfo => {
            return await client.exchangeToken([
                'item_preview',
                'item_upload', 'item_delete','item_download','item_rename','item_share',
                'base_explorer',
                'root_readwrite'
            ], `https://api.box.com/2.0/folders/${folderId}`)
            .then(tokenInfoFolder => {
    
                let dataToReturn = {
                    fileAccessData: {
                        ...tokenInfo
                    },
                    folderAccessData: {
                        ...tokenInfoFolder
                    }
                }
                return dataToReturn;
            }).catch(function (error) {
                return ""
            });
            
        }).catch(function (error) {
            return ""
        });
    
    
    }

    async uploadFileBox(req, res) {

        console.log(req.file,"req.file")
    
        var filePath = path.join(__dirname, '../../../temp/',req.file.filename);
        console.log({filePath});
        var fileData = fs.createReadStream(filePath);
        // console.log(client)
        client.files.uploadFile(req.body.fileFolder, req.file.filename, fileData, function(err, file) {
            if (err){
                console.log(err);
                fs.unlinkSync(filePath);
                return res.status(400).json({message:err})
            }
            else{
                client.files.update(file.entries[0].id, {
                    shared_link: {
                        access: "open",
                        permissions: {
                            can_view: true,
                            can_download: true,
                            can_edit: true
                        }
                    }
                }).then(async file => {
                    fs.unlinkSync(filePath);
                    console.log({file});
                    console.log(file.id,"fileidd");
                    // let getFileExchangeTokenData = await getFileExchangeToken(file.id);
                    // let datPush = {
                    //     ...file,
                    //     ...getFileExchangeTokenData
                    // }

                    let pdfData = {
                        name: req.file.originalname,
                        size: file.size,
                        sharedUrl: file?.shared_link?.url,
                        downloadUrl: file?.shared_link?.download_url,
                        boxFileId: file?.id,
                        parentFolder: file?.parent?.id
                    }
            
                    let pdfSavedData = await PdfService.create(pdfData);

                    await PdfController.processPdfSocket(pdfData?.downloadUrl,pdfData?.boxFileId);
    
                    return res.status(200).json({message: "success", data: pdfSavedData})
                })
    
            }
        });
    }

}


export const BoxService = new boxService();