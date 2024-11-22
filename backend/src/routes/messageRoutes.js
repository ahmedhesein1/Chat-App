import express from "express";
import * as authControl from "../controllers/authControl.js";
import * as messageControl from "../controllers/messageControl.js";
const router = express.Router();
router.get("/users", authControl.protect, messageControl.getUserInSidebar);
router.get("/:id", authControl.protect, messageControl.getMessages);
router.post("/send/:id", authControl.protect, messageControl.sendMessage);

export default router;
