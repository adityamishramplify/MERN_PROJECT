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
exports.deleteProduct = exports.updateProductById = exports.createProduct = exports.getProductById = exports.getAllProducts = void 0;
const Product_1 = __importDefault(require("../models/Product"));
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield Product_1.default.find();
        res.status(200).json(products);
    }
    catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({
            message: "Error fetching products",
            error: error.message,
        });
    }
});
exports.getAllProducts = getAllProducts;
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const product = yield Product_1.default.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(product);
    }
    catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).json({
            message: "Error fetching product",
            error: error.message,
        });
    }
});
exports.getProductById = getProductById;
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const imagePaths = req.files
            ? req.files.map((file) => `/uploads/${file.filename}`)
            : [];
        const productData = Object.assign(Object.assign({}, req.body), { images: imagePaths });
        const product = new Product_1.default(productData);
        yield product.save();
        res
            .status(201)
            .json({ message: "Product created successfully", data: product });
    }
    catch (error) {
        console.error("Error creating product:", error);
        res.status(500).json({
            message: "Error creating product",
            error: error.message,
        });
    }
});
exports.createProduct = createProduct;
const updateProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const imagePaths = req.files
            ? req.files.map((file) => `/uploads/${file.filename}`)
            : [];
        const updatedData = Object.assign(Object.assign({}, req.body), (imagePaths.length > 0 && { images: imagePaths }));
        const product = yield Product_1.default.findByIdAndUpdate(id, updatedData, {
            new: true,
            runValidators: true,
        });
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res
            .status(200)
            .json({ message: "Product updated successfully", data: product });
    }
    catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({
            message: "Error updating product",
            error: error.message,
        });
    }
});
exports.updateProductById = updateProductById;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const product = yield Product_1.default.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(204).send();
    }
    catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({
            message: "Error deleting product",
            error: error.message,
        });
    }
});
exports.deleteProduct = deleteProduct;
