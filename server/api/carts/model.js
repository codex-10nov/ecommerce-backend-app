import mongoose, { Schema } from "mongoose";

const cartSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: "products",
        required: true
    },
    noOfItems: {
        type: Number,
        default: 1,
        min: 1
    }
}, {
    timestamps: {
        createdAt: "createdAt",
        updatedAt: "updatedAt"
    }
})

const model = mongoose.model("carts", cartSchema);

export const schema = model.schema;
export const Carts = model;