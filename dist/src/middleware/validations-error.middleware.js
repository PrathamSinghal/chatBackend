"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorResponse = void 0;
const express_validator_1 = require("express-validator");
const errorResponse = (req, res, next) => {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        // console.log(req.body,"???????????????? response")
        if (!errors.isEmpty()) {
            return res.status(422).json({
                status: 422,
                message: "  validate all fields ",
                errors: errors.array({ onlyFirstError: true })
            });
        }
        else {
            next();
        }
    }
    catch (error) {
        return res.status(500).json({
            status: 500,
            message: error.message
        });
    }
};
exports.errorResponse = errorResponse;
//# sourceMappingURL=validations-error.middleware.js.map