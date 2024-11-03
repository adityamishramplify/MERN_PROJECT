"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ProductController_1 = require("../controllers/ProductController");
const reusableFunctions_1 = require("../utils/reusableFunctions");
const uploadImages_1 = __importDefault(require("../middleware/uploadImages"));
const router = express_1.default.Router();
router.get("/", (0, reusableFunctions_1.asyncHandler)(ProductController_1.getAllProducts));
router.post("/", uploadImages_1.default, (0, reusableFunctions_1.asyncHandler)(ProductController_1.createProduct));
router.get("/:id", (0, reusableFunctions_1.asyncHandler)(ProductController_1.getProductById));
router.put("/:id", uploadImages_1.default, (0, reusableFunctions_1.asyncHandler)(ProductController_1.updateProductById));
router.delete("/:id", (0, reusableFunctions_1.asyncHandler)(ProductController_1.deleteProduct));
exports.default = router;
