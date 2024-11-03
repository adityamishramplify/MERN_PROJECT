import { Request, Response } from "express";
import Product from "../models/Product";

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error: unknown) {
    console.error("Error fetching products:", error);
    res.status(500).json({
      message: "Error fetching products",
      error: (error as Error).message,
    });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error: unknown) {
    console.error("Error fetching product:", error);
    res.status(500).json({
      message: "Error fetching product",
      error: (error as Error).message,
    });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const imagePaths = req.files
      ? (req.files as Express.Multer.File[]).map(
          (file) => `/uploads/${file.filename}`
        ) 
      : []; 

    const productData = {
      ...req.body,
      images: imagePaths,
    };

    const product = new Product(productData);
    await product.save();
    res
      .status(201)
      .json({ message: "Product created successfully", data: product }); 
  } catch (error: unknown) {
    console.error("Error creating product:", error);
    res.status(500).json({
      message: "Error creating product",
      error: (error as Error).message,
    });
  }
};

export const updateProductById = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const imagePaths = req.files
      ? (req.files as Express.Multer.File[]).map(
          (file) => `/uploads/${file.filename}`
        )
      : [];

    const updatedData = {
      ...req.body,
      ...(imagePaths.length > 0 && { images: imagePaths }),
    };

    const product = await Product.findByIdAndUpdate(id, updatedData, {
      new: true, 
      runValidators: true, 
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" }); 
    }

    res
      .status(200)
      .json({ message: "Product updated successfully", data: product }); 
  } catch (error: unknown) {
    console.error("Error updating product:", error);
    res.status(500).json({
      message: "Error updating product",
      error: (error as Error).message,
    });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(204).send(); 
  } catch (error: unknown) {
    console.error("Error deleting product:", error);
    res.status(500).json({
      message: "Error deleting product",
      error: (error as Error).message,
    });
  }
};
