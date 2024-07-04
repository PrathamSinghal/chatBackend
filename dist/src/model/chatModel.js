"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatModel = void 0;
const mongoose_1 = require("mongoose");
require("dotenv/config");
let schema = new mongoose_1.Schema({
    question: {
        type: String,
        default: null
    },
    answer: {
        type: String,
        default: null
    },
    pdfId: {
        type: String,
        default: null
    },
}, { timestamps: true });
exports.chatModel = (0, mongoose_1.model)('chat', schema);
//# sourceMappingURL=chatModel.js.map