import mongoose, { Schema } from "mongoose";

const productSchema = new Schema({
    postedBy: {
        type: Schema.Types.ObjectId,
        ref: "users"
    },
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        default: 0
    },
    rate: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'sold-out']
    },
    category: {
        type: String,
        default: "others"
    },
    subCategory: {
        type: String,
        default: "others"
    }
}, {
    timestamps: {
        createdAt: "createdAt",
        updatedAt: "updatedAt"
    }
})

productSchema.pre('save', async function (next) {
    try {
        if((!this.quantity || this.quantity === 0) && this.status === "active"){
            this.quantity = 0;
            this.status = "sold-out";
        }
        return next();
    } catch (error) {
        return next(error)
    }
})

const model = mongoose.model("products", productSchema);

export const schema = model.schema;
export const Products = model;