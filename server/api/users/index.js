import { Router } from "express";
import { middleware as query } from "querymen";
import { middleware as body } from "bodymen";

import { getById, update, changePassword } from "./controller.js";
import { checkSameUser as checkSameUserMiddleware } from "../../services/auth/index.js";

export { update, changePassword } from "./factory.js";
export { Users } from "./model.js";

const router = Router();

router.get(
    "/:id",
    query(),
    checkSameUserMiddleware,
    getById
)

router.put(
    "/:id",
    body({
        name: {
            type: String
        },
        dob: {
            type: Date
        },
        email: {
            type: String
        },
        mobile: {
            type: Number
        },
        countryCode: {
            type: String
        }
    }),
    update
)

router.put(
    "/:id/change-password",
    body({
        oldPassword: {
            type: String,
            required: true
        },
        newPassword: {
            type: String,
            required: true
        }
    }),
    changePassword
)

export default router;