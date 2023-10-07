import _ from "lodash";
import mongoose from "mongoose";

import { Users } from "./index.js";
import { validatePassword } from "../../auth/index.js";
import { notFoundError } from "../../services/common/index.js";

export const update = async(body) => {

    const { id = undefined } = body;

    if (!id || id === undefined) throw new Error("Id is missing!");

    const user = await Users.findOne({ _id: new mongoose.Types.ObjectId(id) }).then(data => notFoundError(data));

    const updatedUser = await Object.assign(user, body).save();

    delete updatedUser.password;
    return updatedUser;

}

export const changePassword = async(body) => {

    const { id = undefined, oldPassword = "", newPassword = "" } = body;

    if (!id || id === undefined) throw new Error("Id is missing!");

    const user = await Users.findOne({ _id: new mongoose.Types.ObjectId(id) }).then(data => notFoundError(data));

    await validatePassword(user, oldPassword);

    return Object.assign(user, { password: newPassword }).save();
}