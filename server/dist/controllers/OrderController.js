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
exports.UpdateOrder = exports.PlaceOrder = exports.GetOrder = void 0;
const Order_1 = __importDefault(require("../models/Order"));
const GetOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield Order_1.default.find({ userId: req.params.userId });
        res.json(orders);
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.GetOrder = GetOrder;
const PlaceOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = new Order_1.default(req.body);
        yield orders.save();
        res.status(201).json(orders);
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.PlaceOrder = PlaceOrder;
const UpdateOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield Order_1.default.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.json(order);
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.UpdateOrder = UpdateOrder;
