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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./src/app"));
const http = __importStar(require("http"));
const db_1 = require("./config/db");
const Logger_1 = require("./src/utils/Logger");
require("module-alias/register");
console.time("Starting");
const PORT = process.env.PORT || 3000;
const server = http.createServer(app_1.default.instance);
console.timeEnd("Starting");
console.time("db connect");
(0, db_1.connection)();
console.timeEnd("db connect");
console.time("server start");
server.listen(PORT, () => {
    ////console.log(`Server is listening on :${PORT}`);
    Logger_1.logger.info(`Server started and running on http://localhost:${process.env.PORT}}`);
    console.timeEnd("server start");
});
//# sourceMappingURL=server.js.map