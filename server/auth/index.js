import { Router } from "express";
import { middleware as body } from "bodymen";
// import { middleware as query } from "querymen";

import { signup, login } from "./controller.js";

export { validatePassword, signup, login } from "./factory.js";

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
            required: true
        },
        username: {
            type: String
        },
        mobile: {
            type: Number
        },
        dob: {
            type: Date,
            required: true
        },
        countryCode: {
            type: String
        },
        userType: {
            type: String,
            default: "customer",
            enum: ["customer", "seller", "admin"],
        },
        password: {
            type: String,
            required: true,
        },
    }),
    signup
)

router.post(
    "/login",
    body({
        email: {
            type: String
        },
        mobile: {
            type: Number
        },
        countryCode: {
            type: String
        },
        password: {
            type: String,
            required: true,
            match: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
            message: 'Password must contain at least one digit, one lowercase and one uppercase letter, and be at least 8 characters long.'
        }
    }),
    login
)

export default router;