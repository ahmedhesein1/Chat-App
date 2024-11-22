import express from "express";
import * as authControl from "../controllers/authControl.js";
const router = express.Router();
router.post("/signup", authControl.signup);
router.post("/login", authControl.login);
router.get("/logout", authControl.protect, authControl.logout);
router.put('/update-profile', authControl.protect, authControl.updateProfile);
router.get('/check', authControl.protect, authControl.checkAuth);
export default router;
