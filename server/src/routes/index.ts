import express from "express";
import UserRoute from "./userRoutes";
import ProductRoute from "./productRoutes";
import { isAuthenticated } from "../middleware/authMiddleware";
const router = express.Router();

router.use("/users", isAuthenticated, UserRoute);
router.use("/products", isAuthenticated, ProductRoute);

export default router;
