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
exports.MasterService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
class masterService {
    aggregatePaginate(model, aggregate, option) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    var myAggregate = model.aggregate(aggregate);
                    var data = yield model.aggregatePaginate(myAggregate, option);
                    resolve(data);
                }
                catch (error) {
                    reject(error);
                }
            }));
        });
    }
    aggregate(model, filter) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                model.aggregate(filter).exec(function (err, invites) {
                    if (err) {
                        reject(err);
                    }
                    resolve(invites);
                });
            });
        });
    }
    genrateObjectId(value) {
        return __awaiter(this, void 0, void 0, function* () {
            return new mongoose_1.default.Types.ObjectId(value);
        });
    }
}
exports.MasterService = new masterService();
//# sourceMappingURL=master.service.js.map