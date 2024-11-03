"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRoutes_1 = __importDefault(require("./userRoutes"));
const productRoutes_1 = __importDefault(require("./productRoutes"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.use("/users", authMiddleware_1.isAuthenticated, userRoutes_1.default);
router.use("/products", authMiddleware_1.isAuthenticated, productRoutes_1.default);
exports.default = router;
