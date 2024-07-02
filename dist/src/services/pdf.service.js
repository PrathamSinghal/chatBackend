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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PdfService = void 0;
const db = __importStar(require("../model/_index"));
class pdfService {
    constructor() {
    }
    create(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield db.pdfModel.create(payload);
            }
            catch (error) {
                throw error;
            }
        });
    }
    update(query, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield db.pdfModel.findOneAndUpdate(query, payload, { new: true });
            }
            catch (error) {
                throw error;
            }
        });
    }
    findOne(query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield db.pdfModel.findOne(query);
            }
            catch (error) {
                throw error;
            }
        });
    }
    aggregatePaginate(aggregate, option) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    var myAggregate = db.pdfModel.aggregate(aggregate);
                    var data = yield db.pdfModel.aggregatePaginate(myAggregate, option);
                    resolve(data);
                }
                catch (error) {
                    reject(error);
                }
            }));
        });
    }
    list(query, options) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let filter = [
                    { $sort: { _id: -1 } },
                ];
                return yield this.aggregatePaginate(filter, options);
            }
            catch (error) {
            }
        });
    }
    delete(query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return db.pdfModel.deleteOne(query, { isDelete: true });
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.PdfService = new pdfService();
//# sourceMappingURL=pdf.service.js.map