import _ from "lodash";

import { signup as signupFactory } from "./index.js";

export const signup = ({ body = {} }, res, next) => {

    const { email = "", mobile = NaN, countryCode = "" } = body;

    if ( _.isEmpty(email) && _.isNaN(mobile) && _.isEmpty(countryCode) )
        throw new Error("Email or phone number must be present");

    return signupFactory(body)
        .then((data) => res.status(201).json(data))
        .catch((err) => {
            console.log("Error here: ",err);
            next(err);
        });
} 