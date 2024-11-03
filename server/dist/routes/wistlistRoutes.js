"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const WishlistController_1 = require("../controllers/WishlistController");
const reusableFunctions_1 = require("../utils/reusableFunctions");
const router = express_1.default.Router();
router.get("/:userId", (0, reusableFunctions_1.asyncHandler)(WishlistController_1.getWishlistByUserId));
router.post("/add", (0, reusableFunctions_1.asyncHandler)(WishlistController_1.AddItemToWishlist));
router.delete("/remove", (0, reusableFunctions_1.asyncHandler)(WishlistController_1.RemoveProductFromWishlist));
exports.default = router;
