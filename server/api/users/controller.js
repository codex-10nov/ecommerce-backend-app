import _ from "lodash";
import mongoose from "mongoose";

import { Users, update as updateFactory, changePassword as changePasswordFactory } from "./index.js";
import { notFoundError } from "../../services/common/index.js";

export const getById = async ({ querymen: { query = {} }, params }, res, next) => {
    
    const { id = "" } = params;

    return Users.findOne({ _id: new mongoose.Types.ObjectId(id) }, { password: 0, __v: 0 })
        .then((data) => notFoundError(data))
        .then((data) => res.status(200).json(data))
        .catch((err) => next(err));
}

export const update = async ({ bodymen: { body = {} }, params }, res, next) => {
    
    const { id = "" } = params;

    return updateFactory({ id,...body})
        .then((data) => res.status(200).json(data))
        .catch((err) => next(err));
}

export const changePassword = async ({ bodymen: { body = {} }, params }, res, next) => {
    
    const { id = "" } = params;

    return changePasswordFactory({ id,...body})
        .then((data) => res.status(200).json(data))
        .catch((err) => next(err));
}