import _ from "lodash";

export const notFoundError = (data) => {
    const error = new Error("Entity not found!");
    error.statusCode = 404;
    
    if(_.isEmpty(data)) throw error;

    return data;
}