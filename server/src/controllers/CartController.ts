import { Request, Response } from "express";
import mongoose, { Types } from "mongoose";
import Cart from "../models/Cart";
import Product from "../models/Product";

interface AddItemRequestBody {
  userId: string;
  productId: string;
}

// Corrected function types
export const GetCartByUserId = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  try {
    const cart = await Cart.findOne({ user: req.params.userId }).populate("items.productId");
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    return res.json(cart);
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const AddItemToCart = async (
  req: Request<{}, {}, AddItemRequestBody>,
  res: Response
): Promise<Response | void> => {
  try {
    const { userId, productId } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = new Cart({
        user: userId,
        items: [{ productId: new Types.ObjectId(productId), addedAt: new Date() }],
      });
    } else {
      const existingItem = cart.items.find(
        (item) => item.productId.toString() === productId.toString()
      );
      if (existingItem) {
        return res.status(400).json({ message: "Product already exists in cart" });
      }
      cart.items.push({ productId: new Types.ObjectId(productId), addedAt: new Date() });
    }

    await cart.save();
    return res.status(201).json({ message: "Product added to cart.", data: cart });
  } catch (error) {
    console.error("Error adding item to cart:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const RemoveProductFromCart = async (
  req: Request<{}, {}, AddItemRequestBody>,
  res: Response
): Promise<Response | void> => {
  try {
    const { userId, productId } = req.body;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId
    );

    await cart.save();
    return res.json({ message: "Product removed from cart." });
  } catch (error) {
    console.error("Error removing product from cart:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
