import { Request, Response } from "express";
import Order from "../models/Order";
export const GetOrder = async (req: Request, res: Response) => {
  try {
    const orders = await Order.find({ userId: req.params.userId });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const PlaceOrder = async (req: Request, res: Response) => {
  try {
    const orders = new Order(req.body);
    await orders.save();
    res.status(201).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const UpdateOrder = async (req: Request, res: Response) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
