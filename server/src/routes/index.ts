import express from "express";
import UserRoute from "./userRoutes";
import ProductRoute from "./productRoutes";
import CartRoute from "./cartRoutes";
import OrderRoute from "./orderRoutes";
import WishlistRoute from "./wistlistRoutes";
import { isAuthenticated } from "../middleware/authMiddleware";
const router = express.Router();

router.use("/users", isAuthenticated, UserRoute);
router.use("/products", isAuthenticated, ProductRoute);
router.use("/cart", isAuthenticated, CartRoute);
router.use("/orders", isAuthenticated, OrderRoute);
router.use("/wishlist", isAuthenticated, WishlistRoute);

export default router;
