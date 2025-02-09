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
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = require("express");
const validations = __importStar(require("../validations/_index"));
const controllers = __importStar(require("../controller/_index"));
const validations_error_middleware_1 = require("../middleware/validations-error.middleware");
const router = (0, express_1.Router)();
// all books routes 
exports.userRoutes = [
    router.get('/pdfList', controllers.user.PdfController.pdfList),
    router.get('/getpdfDetails/:id', validations.user.getPdfData, validations_error_middleware_1.errorResponse, controllers.user.PdfController.getPdfDetails),
    router.post('/pdfDelete', controllers.user.PdfController.pdfDelete),
    router.post('/processPdf', controllers.user.PdfController.processPdf),
    router.post('/askQuestion', controllers.user.PdfController.askQuestion),
];
//# sourceMappingURL=user.routes.js.map