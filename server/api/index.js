import { Router } from "express";

import { verifyAuthentication, rbac } from "../services/auth/index.js"; 
import user from "./users/index.js";

const router = Router();

router.use(verifyAuthentication);

router.use(rbac);
router.use("/users", user);

export default router;