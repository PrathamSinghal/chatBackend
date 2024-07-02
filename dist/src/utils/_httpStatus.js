'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports._httpStatusService = void 0;
class httpStatus {
    constructor() {
        this.successResError = {};
        this.status = {
            success: 200,
            serverError: 500,
            created: 201,
            updated: 201,
            Unauthorized: 401,
            Forbidden: 403,
            NotFound: 404,
            Proxy: 407,
            UnprocessableEntity: 422,
            badRequest: 400,
            OK: 200,
            LargePayload: 413
        };
    }
    badRequest(badRequest) {
        throw new Error('Method not implemented.');
    }
}
;
exports._httpStatusService = new httpStatus();
//# sourceMappingURL=_httpStatus.js.map