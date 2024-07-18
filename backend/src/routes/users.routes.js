import { Router } from "express";
import { createUser, loginUser } from '../controllers/users.controllers.js';
import { fieldValidator } from "../middlewares/fieldValidator.middlewares.js";
import validateUser from "../middlewares/userAuth.middleware.js";

const router = Router();

router.post("/register", fieldValidator(["username", "password"]), createUser);
router.post("/login", fieldValidator(["usernameOrEmail", "password"]), loginUser);





export default router;