import express from "express";
import {
  GetOrder,
  PlaceOrder,
  UpdateOrder,
} from "../controllers/OrderController";
import { asyncHandler } from "../utils/reusableFunctions";
const router = express.Router();

router.get("/:id", asyncHandler(GetOrder));
router.post("/", asyncHandler(PlaceOrder));
router.put("/:id", asyncHandler(UpdateOrder));
export default router;
