import { Router } from "express";
import { middleware as body } from "bodymen";
// import { middleware as query } from "querymen";

import { signup } from "./controller.js";

export { signup } from "./factory.js";

const router = Router();

router.post(
    "/sign-up",
    body({
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
        },
        mobile: {
            type: Number
        },
        countryCode: {
            type: String
        },
        type: {
            type: String,
            enum: ["customer", "seller", "admin"],
            default: "customer"
        }
    }),
    signup
)

export default router;