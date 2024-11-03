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
exports.RemoveProductFromWishlist = exports.AddItemToWishlist = exports.getWishlistByUserId = void 0;
const Wishlist_1 = __importDefault(require("../models/Wishlist"));
const Product_1 = __importDefault(require("../models/Product"));
const getWishlistByUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const wishlist = yield Wishlist_1.default.find({ user: req.params.userId }).populate("items.productId");
        if (!wishlist)
            return res.status(404).json({ message: "Wishlist not found" });
        res.json(wishlist);
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.getWishlistByUserId = getWishlistByUserId;
const AddItemToWishlist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, productId } = req.body;
        const product = yield Product_1.default.findById(productId);
        if (!product)
            return res.status(404).json({ message: "Product not found" });
        let wishlist = yield Wishlist_1.default.findOne({ userId });
        if (!wishlist) {
            wishlist = new Wishlist_1.default({
                userId,
                items: [{ productId, addedAt: new Date() }],
            });
        }
        else {
            const existingItem = wishlist.items.find((item) => item.productId.toString() === productId.toString());
            if (existingItem)
                return res
                    .status(400)
                    .json({ message: "Product already exists in wishlist" });
            wishlist.items.push({ productId, addedAt: new Date() });
        }
        yield wishlist.save();
        res
            .status(201)
            .json({ message: "Product added to wishist.", data: wishlist });
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.AddItemToWishlist = AddItemToWishlist;
const RemoveProductFromWishlist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, productId } = req.body;
        const wishlist = yield Wishlist_1.default.findOne({ userId });
        if (!wishlist)
            return res.status(404).json({ message: "Wishlist not found" });
        wishlist.items = wishlist.items.filter((item) => item.productId.toString() !== productId);
        yield wishlist.save();
        res.json({ message: "Product removed from wishlist." });
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.RemoveProductFromWishlist = RemoveProductFromWishlist;
