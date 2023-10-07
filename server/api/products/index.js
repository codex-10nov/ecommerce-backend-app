import { Router } from "express";
import { middleware as body } from "bodymen";
import { middleware as query } from "querymen";

export { Products } from "./model.js";

const router = Router();

router.post(
    "/",
    body({
        name: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            default: 1
        },
        rate: {
            type: Number,
            default: 0
        },
        status: {
            type: String,
            enum: ['active', 'inactive', 'sold-out'],
            default: "active"
        }
    }),
    create
)

export default router;