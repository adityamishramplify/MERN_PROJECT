import express from "express";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProductById,
  deleteProduct,
} from "../controllers/ProductController";
import { asyncHandler } from "../utils/reusableFunctions";
import upload from "../middleware/uploadImages";
const router = express.Router();

router.get("/", asyncHandler(getAllProducts));
router.post("/", upload, asyncHandler(createProduct));
router.get("/:id", asyncHandler(getProductById));
router.put("/:id", upload, asyncHandler(updateProductById));
router.delete("/:id", asyncHandler(deleteProduct));

export default router;
