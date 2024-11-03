"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const OrderController_1 = require("../controllers/OrderController");
const reusableFunctions_1 = require("../utils/reusableFunctions");
const router = express_1.default.Router();
router.get("/:id", (0, reusableFunctions_1.asyncHandler)(OrderController_1.GetOrder));
router.post("/", (0, reusableFunctions_1.asyncHandler)(OrderController_1.PlaceOrder));
router.put("/:id", (0, reusableFunctions_1.asyncHandler)(OrderController_1.UpdateOrder));
exports.default = router;
