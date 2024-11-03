"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoveProductFromCart = exports.AddItemToCart = exports.GetCartByUserId = void 0;
const mongoose_1 = require("mongoose");
const Cart_1 = __importDefault(require("../models/Cart"));
const Product_1 = __importDefault(require("../models/Product"));
// Corrected function types
const GetCartByUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cart = yield Cart_1.default.findOne({ user: req.params.userId }).populate("items.productId");
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        return res.json(cart);
    }
    catch (error) {
        console.error("Error fetching cart:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.GetCartByUserId = GetCartByUserId;
const AddItemToCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, productId } = req.body;
        const product = yield Product_1.default.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        let cart = yield Cart_1.default.findOne({ user: userId });
        if (!cart) {
            cart = new Cart_1.default({
                user: userId,
                items: [{ productId: new mongoose_1.Types.ObjectId(productId), addedAt: new Date() }],
            });
        }
        else {
            const existingItem = cart.items.find((item) => item.productId.toString() === productId.toString());
            if (existingItem) {
                return res.status(400).json({ message: "Product already exists in cart" });
            }
            cart.items.push({ productId: new mongoose_1.Types.ObjectId(productId), addedAt: new Date() });
        }
        yield cart.save();
        return res.status(201).json({ message: "Product added to cart.", data: cart });
    }
    catch (error) {
        console.error("Error adding item to cart:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.AddItemToCart = AddItemToCart;
const RemoveProductFromCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, productId } = req.body;
        const cart = yield Cart_1.default.findOne({ user: userId });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        cart.items = cart.items.filter((item) => item.productId.toString() !== productId);
        yield cart.save();
        return res.json({ message: "Product removed from cart." });
    }
    catch (error) {
        console.error("Error removing product from cart:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.RemoveProductFromCart = RemoveProductFromCart;
