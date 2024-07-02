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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPdfData = void 0;
const express_validator_1 = require("express-validator");
const responseMessage_1 = require("../utils/responseMessage");
const pdf_service_1 = require("../services/pdf.service");
const regexImage = /^data:image\/(?:gif|png|jpeg|bmp|webp|svg\+xml)(?:;charset=utf-8)?;base64,(?:[A-Za-z0-9]|[+/])+={0,2}/;
const urlPattern = new RegExp('^(https?:\\/\\/)?' + // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR IP (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
    '(\\#[-a-z\\d_]*)?$', // fragment locator
'i');
exports.getPdfData = [
    (0, express_validator_1.param)('id').notEmpty().withMessage(responseMessage_1._infoMessaage.required()).custom((value) => __awaiter(void 0, void 0, void 0, function* () {
        return pdf_service_1.PdfService.findOne({ _id: value }).then((data) => {
            if (!data)
                throw new Error(responseMessage_1._infoMessaage.invalidId(value));
        }).catch((err) => {
            throw new Error(responseMessage_1._infoMessaage.invalidId(value));
        });
    })),
];
//# sourceMappingURL=pdf.js.map