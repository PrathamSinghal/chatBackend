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
exports.BoxService = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const pdf_service_1 = require("./pdf.service");
const box_node_sdk_1 = __importDefault(require("box-node-sdk"));
// import { environment } from '../../environment';
const box_json_1 = __importDefault(require("../../box.json"));
let BOX_APP_SETTINGS = {
    "clientID": box_json_1.default.clientID,
    "clientSecret": box_json_1.default.clientSecret,
    "appAuth": box_json_1.default.appAuth
};
var sdk = new box_node_sdk_1.default(BOX_APP_SETTINGS);
var client = sdk.getAppAuthClient('enterprise', process.env.Enterprise_ID_JWT);
const getFileExchangeToken = (fileId) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(fileId, "fileId");
    return yield client.exchangeToken('item_preview', `https://api.box.com/2.0/files/${fileId}`)
        .then(tokenInfo => {
        return tokenInfo;
        // tokenInfo.accessToken contains the new downscoped access token
    }).catch(function (error) {
        return error;
    });
});
class boxService {
    constructor() {
    }
    getFileFolderToken(fileId, folderId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield client.exchangeToken('item_preview', `https://api.box.com/2.0/files/${fileId}`)
                .then((tokenInfo) => __awaiter(this, void 0, void 0, function* () {
                return yield client.exchangeToken([
                    'item_preview',
                    'item_upload', 'item_delete', 'item_download', 'item_rename', 'item_share',
                    'base_explorer',
                    'root_readwrite'
                ], `https://api.box.com/2.0/folders/${folderId}`)
                    .then(tokenInfoFolder => {
                    let dataToReturn = {
                        fileAccessData: Object.assign({}, tokenInfo),
                        folderAccessData: Object.assign({}, tokenInfoFolder)
                    };
                    return dataToReturn;
                }).catch(function (error) {
                    return "";
                });
            })).catch(function (error) {
                return "";
            });
        });
    }
    uploadFileBox(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.file, "req.file");
            var filePath = path_1.default.join(__dirname, '../../temp/', req.file.filename);
            console.log({ filePath });
            var fileData = fs_1.default.createReadStream(filePath);
            // console.log(client)
            client.files.uploadFile(req.body.fileFolder, req.file.filename, fileData, function (err, file) {
                if (err) {
                    console.log(err);
                    fs_1.default.unlinkSync(filePath);
                    return res.status(400).json({ message: err });
                }
                else {
                    client.files.update(file.entries[0].id, {
                        shared_link: {
                            access: "open",
                            permissions: {
                                can_view: true,
                                can_download: true,
                                can_edit: true
                            }
                        }
                    }).then((file) => __awaiter(this, void 0, void 0, function* () {
                        var _a, _b, _c;
                        fs_1.default.unlinkSync(filePath);
                        console.log({ file });
                        console.log(file.id, "fileidd");
                        // let getFileExchangeTokenData = await getFileExchangeToken(file.id);
                        // let datPush = {
                        //     ...file,
                        //     ...getFileExchangeTokenData
                        // }
                        let pdfData = {
                            name: file.name,
                            size: file.size,
                            sharedUrl: (_a = file === null || file === void 0 ? void 0 : file.shared_link) === null || _a === void 0 ? void 0 : _a.url,
                            downloadUrl: (_b = file === null || file === void 0 ? void 0 : file.shared_link) === null || _b === void 0 ? void 0 : _b.download_url,
                            boxFileId: file === null || file === void 0 ? void 0 : file.id,
                            parentFolder: (_c = file === null || file === void 0 ? void 0 : file.parent) === null || _c === void 0 ? void 0 : _c.id
                        };
                        let pdfSavedData = yield pdf_service_1.PdfService.create(pdfData);
                        return res.status(200).json({ message: "success", data: pdfSavedData });
                    }));
                }
            });
        });
    }
}
exports.BoxService = new boxService();
//# sourceMappingURL=box.service.js.map