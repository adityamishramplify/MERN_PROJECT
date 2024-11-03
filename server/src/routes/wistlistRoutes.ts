import express from "express";
import {
  getWishlistByUserId,
  AddItemToWishlist,
  RemoveProductFromWishlist,
} from "../controllers/WishlistController";
import { asyncHandler } from "../utils/reusableFunctions";
const router = express.Router();

router.get("/:userId", asyncHandler(getWishlistByUserId));
router.post("/add", asyncHandler(AddItemToWishlist));
router.delete("/remove", asyncHandler(RemoveProductFromWishlist));
export default router;
