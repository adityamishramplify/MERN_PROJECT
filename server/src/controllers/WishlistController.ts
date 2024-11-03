import { Request, Response } from "express";
import Wishlist from "../models/Wishlist";
import Product from "../models/Product";
import { messaging } from "firebase-admin";

export const getWishlistByUserId = async (req: Request, res: Response) => {
  try {
    const wishlist = await Wishlist.find({ user: req.params.userId }).populate(
      "items.productId"
    );
    if (!wishlist)
      return res.status(404).json({ message: "Wishlist not found" });
    res.json(wishlist);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const AddItemToWishlist = async (req: Request, res: Response) => {
  try {
    const { userId, productId } = req.body;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    let wishlist = await Wishlist.findOne({ userId });
    if (!wishlist) {
      wishlist = new Wishlist({
        userId,
        items: [{ productId, addedAt: new Date() }],
      });
    } else {
      const existingItem = wishlist.items.find(
        (item) => item.productId.toString() === productId.toString()
      );
      if (existingItem)
        return res
          .status(400)
          .json({ message: "Product already exists in wishlist" });
      wishlist.items.push({ productId, addedAt: new Date() });
    }
    await wishlist.save();
    res
      .status(201)
      .json({ message: "Product added to wishist.", data: wishlist });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const RemoveProductFromWishlist = async (
  req: Request,
  res: Response
) => {
  try {
    const { userId, productId } = req.body;
    const wishlist = await Wishlist.findOne({ userId });
    if (!wishlist)
      return res.status(404).json({ message: "Wishlist not found" });

    wishlist.items = wishlist.items.filter(
      (item) => item.productId.toString() !== productId
    );
    await wishlist.save();
    res.json({ message: "Product removed from wishlist." });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
