import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt"

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    userType: {
        type: String,
        enum: ["customer", "owner", "admin"],
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mobile: {
        type: Number
    },
    countryCode: {
        type: String
    },
    password: {
        type: String
    },
    currency: {
        type: String,
        enum: ["USD", "INR"],
        default: "INR"
    }
}, {
    timestamps: {
        createdAt: "createdAt",
        updatedAt: "updatedAt"
    }
})

userSchema.pre("save", async function (next){
    try {
        if(!this.isModified("password")) return next();
        const saltRounds = 10;
        const hash = await bcrypt.hash(this.password, saltRounds);
        this.password = hash;
        return next();
    } catch (error) {
        return next(error)
    }
})

userSchema.methods.validatePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

const model = mongoose.model("users", userSchema);

export const schema = model.schema;
export const Users = model;