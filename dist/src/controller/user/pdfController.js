"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.PdfController = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const axios_1 = __importDefault(require("axios"));
const responseMessage_1 = require("../../utils/responseMessage");
const _httpStatus_1 = require("../../utils/_httpStatus");
const pdf_service_1 = require("../../services/pdf.service");
const box_service_1 = require("../../services/box.service");
class pdfController {
    constructor() {
    }
    pdfList(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let querys = req.query;
                let query = {
                    page: parseInt(querys.page) || 1,
                    limit: parseInt(querys.limit) || 10,
                };
                let result = yield pdf_service_1.PdfService.list({}, query);
                return res.status(_httpStatus_1._httpStatusService.status.OK)
                    .json({
                    status: _httpStatus_1._httpStatusService.status.OK,
                    message: "Pdf Details fetched successfully",
                    data: result
                });
            }
            catch (error) {
                return res.status(_httpStatus_1._httpStatusService.status.serverError)
                    .json(responseMessage_1.resObj.error(error));
            }
        });
    }
    getPdfDetails(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let _id = req.params;
                let thisId = new mongoose_1.default.Types.ObjectId(_id);
                let result = yield pdf_service_1.PdfService.findOne({ _id: thisId });
                let tokenData = yield box_service_1.BoxService.getFileFolderToken(result === null || result === void 0 ? void 0 : result.boxFileId, result === null || result === void 0 ? void 0 : result.parentFolder);
                return res.status(_httpStatus_1._httpStatusService.status.OK)
                    .json({
                    message: "Details Fetched Succesfully",
                    data: Object.assign(Object.assign({}, result._doc), tokenData)
                });
            }
            catch (error) {
                return res.status(_httpStatus_1._httpStatusService.status.serverError)
                    .json(responseMessage_1.resObj.error(error));
            }
        });
    }
    pdfDelete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { ids } = req.body;
                ids.map((id) => __awaiter(this, void 0, void 0, function* () {
                    yield pdf_service_1.PdfService.delete({ _id: id });
                }));
                let obj = {
                    "status": 200,
                    "message": "Pdf delete successfully !",
                };
                return res.status(_httpStatus_1._httpStatusService.status.OK)
                    .json(obj);
            }
            catch (error) {
                return res.status(_httpStatus_1._httpStatusService.status.serverError)
                    .json(responseMessage_1.resObj.error(error));
            }
        });
    }
    processPdf(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // "url": "https://app.box.com/shared/static/xb03u32krysahuilj0kdf4yho4cn0ca6.pdf"
                let data = JSON.stringify({
                    "url": req.body.url
                });
                let config = {
                    method: 'post',
                    maxBodyLength: Infinity,
                    url: 'http://127.0.0.1:4002/process_pdf',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: data
                };
                yield axios_1.default.request(config)
                    .then((response) => {
                    return res.status(200).json(response.data);
                })
                    .catch((error) => {
                    console.log(error);
                    return res.status(400).json({ error });
                });
            }
            catch (error) {
                return res.status(_httpStatus_1._httpStatusService.status.serverError)
                    .json(responseMessage_1.resObj.error(error));
            }
        });
    }
    askQuestion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // "url": "https://app.box.com/shared/static/xb03u32krysahuilj0kdf4yho4cn0ca6.pdf"
                let data = JSON.stringify({
                    "question": req.body.question
                });
                let config = {
                    method: 'post',
                    maxBodyLength: Infinity,
                    url: 'http://127.0.0.1:4002/ask_question',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: data
                };
                yield axios_1.default.request(config)
                    .then((response) => {
                    console.log(response.data);
                    return res.status(200).json(response.data);
                })
                    .catch((error) => {
                    console.log(error);
                    return res.status(400).json({ error });
                });
            }
            catch (error) {
                return res.status(_httpStatus_1._httpStatusService.status.serverError)
                    .json(responseMessage_1.resObj.error(error));
            }
        });
    }
}
exports.PdfController = new pdfController();
//# sourceMappingURL=pdfController.js.map