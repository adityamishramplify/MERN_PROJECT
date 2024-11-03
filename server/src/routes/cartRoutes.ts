import express from "express";
import {
  GetCartByUserId,
  AddItemToCart,
  RemoveProductFromCart,
} from "../controllers/CartController";
import { asyncHandler } from "../utils/reusableFunctions";
const router = express.Router();

router.get("/:userId", asyncHandler(GetCartByUserId));
router.post("/add", asyncHandler(AddItemToCart));
router.delete("/remove", asyncHandler(RemoveProductFromCart));

export default router;
