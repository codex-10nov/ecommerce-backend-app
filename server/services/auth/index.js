import _ from "lodash";
import jwt from "jsonwebtoken";

export const rbac = (req, res, next) => {

    next();
}

export const verifyAuthentication = async(req, res, next) => {

    const { headers = {} } = req;

    try {
        
        const token = headers.authorization.split(" ")[1];

        if (!headers.authorization || !token) throw new Error("Authorization key not found!");

        const secretKey = process.env.JWT_SECRETKEY;
        const decode = jwt.verify(token, secretKey);

        if (!decode) {
            throw new Error("Authorization failed! You are not permitted to call this API.");
        }

        req.ACTIVE_USER = decode;

        next();
        
    } catch (error) {

        console.log("Authorization Error: ", error);
        const err = new Error("Authorization failed!");
        // err.statusCode = 401;
        next(err);
        
    }
    
}

export const checkSameUser = async({ ACTIVE_USER, params }, res, next) => {
    const { user: requestedByUserId } = ACTIVE_USER;
    const { id: requestedUserId } = params;

    if( String(requestedByUserId) !== String(requestedUserId) ) {
        const userCheckError = new Error("Requesting details of wrong user");
        userCheckError.statusCode = 401;
        next(userCheckError); 
    }
    next();
}