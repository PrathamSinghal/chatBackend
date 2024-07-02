"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._infoMessaage = exports.resObj = exports.enumType = void 0;
const _httpStatus_1 = require("./_httpStatus");
;
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
exports.enumType = {
    language: {
        English: "en",
        Korean: "ko",
        Spanish: "es",
        Chinese: "zh"
    },
};
exports.resObj = {
    success: (value, data) => {
        let resObj = {
            status: _httpStatus_1._httpStatusService.status.OK,
            message: `${value}  list successfully !`,
            data: data
        };
        return resObj;
    },
    create: (value, data) => {
        let resObj = {
            status: _httpStatus_1._httpStatusService.status.OK,
            message: `${value} create successfully !`,
            data: data
        };
        return resObj;
    },
    error: (value) => {
        let resObj = {
            status: _httpStatus_1._httpStatusService.status.serverError,
            message: `${value === null || value === void 0 ? void 0 : value.message}` || 'Server error !',
        };
        return resObj;
    },
    list: (value, data) => {
        let resObj = {
            status: _httpStatus_1._httpStatusService.status.success,
            message: `${value} list successfully !`,
            data,
        };
        return resObj;
    },
    details: (value, data) => {
        let resObj = {
            status: _httpStatus_1._httpStatusService.status.success,
            message: `${value} Details successfully !`,
            data
        };
        return resObj;
    },
    deleteObj: (data) => {
        let resObj = {
            status: _httpStatus_1._httpStatusService.status.success,
            message: `delete successfully !`,
            data
        };
        return resObj;
    },
    blockObj: (data) => {
        let resObj = {
            status: _httpStatus_1._httpStatusService.status.success,
            message: `block successfully !`,
            data
        };
        return resObj;
    },
    pageNotFound: (url) => {
        return {
            status: _httpStatus_1._httpStatusService.status.NotFound,
            message: "Page not found",
            url: url
        };
    },
    InvalidJson: (message) => {
        return {
            status: _httpStatus_1._httpStatusService.status.badRequest,
            message: message || "Invalid Payload JSON "
        };
    },
    documentUpload: (data) => {
        return {
            status: _httpStatus_1._httpStatusService.status.success,
            message: "Successfully Document upload",
            data: data
        };
    }
};
exports._infoMessaage = {
    required: (value) => {
        return `This field is required`;
    },
    unique: (value) => {
        return `${value} already exists`;
    },
    minLength: (min) => {
        return `minimum ${min} characters`;
    },
    Invalid: (value) => {
        return `${value} is invalid`;
    },
    emailNotRegex: (value) => {
        return `${value} is not exist`;
    },
    passwordMatch: "Invalid user credentials",
    lowercase: 'one latter must be lowercase',
    uppercase: 'one latter must be uppercase',
    number: 'one latter must be number',
    alphanumeric: 'one latter must be alphanumeric',
    confirmPassword: 'Password and confirmPassword not match',
    blockedUser: 'Your account has been blocked,   contact admin',
    NotFoundUser: 'User is not found',
    invalidId: (value) => {
        return "  enter a valid " + value;
    }
};
//# sourceMappingURL=responseMessage.js.map