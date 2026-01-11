import { register } from "../controllers/user.controller.js";
import express from "express";
import { login , logout} from "../controllers/user.controller.js";


const router = express.Router();

router.post("/register", register)

router.post("/login", login)

router.get("/logout", logout)

export default router;