import _ from "lodash";
import jwt from "jsonwebtoken";

import { Users } from "../api/users/index.js";
import { notFoundError } from "../services/common/index.js";

const __generateToken = async(userId) => {
    const secretKey = process.env.JWT_SECRETKEY;
    return jwt.sign({ user: userId }, secretKey, { expiresIn: '90d' });
}

export const validatePassword = async(user, password) => {
    const validate = await user.validatePassword(password) 
    if(!validate) throw new Error("Password doesn't match");
    return JSON.parse(JSON.stringify(user));
}

export const signup = async(body = {}) => {
    
    const { email = "", username = "" } = body;

    const existingUser = await Users.findOne({ email })

    if ( !_.isEmpty(existingUser) ) throw new Error("User already present");

    if ( _.isEmpty(username) ) body.username = email.split("@")[0];

    const user = await Users.create(body).then(data => JSON.parse(JSON.stringify(data)));

    const token = await __generateToken(user._id);

    return { token, ...user };
}

export const login = async(body = {}) => {

    const { loginVia = "", password = "" } = body;
    const user = await Users.findOne(loginVia==='email'? {email: body.email}: {mobile: body.mobile, countryCode: body.countryCode})
                    .then(data => notFoundError(data))
                    .then(data => validatePassword(data, password));

    const token = await __generateToken(user._id);

    return { token, ...user };
}