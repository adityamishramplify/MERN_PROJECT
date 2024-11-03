import express from "express";
import { getUserById, createUser } from "../controllers/UserController";
import { asyncHandler } from "../utils/reusableFunctions";
const router = express.Router();

router.get("/:id", asyncHandler(getUserById));
router.get("/create", asyncHandler(createUser));
export default router;
