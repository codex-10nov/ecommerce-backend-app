import _ from "lodash";
// import bodymen from "bodymen";

import { 
    signup as signupFactory,
    login as loginFactory
} from "./index.js";

export const signup = async({ bodymen: { body = {} } }, res, next) =>  
    signupFactory(body)
        .then((data) => res.status(201).json(data))
        .catch((err) => next(err));

export const login = async({ bodymen: { body = {} } }, res, next) => {

    const { email = "", mobile = NaN, countryCode = "" } = body;

    if(_.isEmpty(email) && (_.isNaN(mobile) || _.isEmpty(countryCode)))
        throw new Error("Login details missing");

    return loginFactory({ loginVia: _.isEmpty(email) ? "mobile": "email", ...body})
        .then((data) => res.status(200).json(data))
        .catch((err) => next(err));
} 