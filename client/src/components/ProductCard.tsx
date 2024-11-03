import React from "react";
import { useUser } from "../context/UserContext";
import "./ProductCard.css";

interface IProduct {
  _id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  images: string[];
}

interface ProductCardProps {
  product: IProduct;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { user, loading, error } = useUser();
  const addToCart = async () => {
    console.log("user ------>", user);
    try {
      const response = await fetch("http://localhost:8000/api/cart", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId: product._id, userId: user?._id }),
      });
      if (!response.ok) {
        throw new Error("Failed to add product to cart");
      }
      alert("Product added to cart!");
    } catch (error) {
      console.error("Error adding product to cart:", error);
      alert("Error adding product to cart. Please try again.");
    }
  };

  const addToWishlist = async () => {
    console.log("user ------>", user);
    try {
      const response = await fetch("http://localhost:8000/api/wishlist", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId: product._id, userId: user?._id }),
      });
      if (!response.ok) {
        throw new Error("Failed to add product to wishlist");
      }
      alert("Product added to wishlist!");
    } catch (error) {
      console.error("Error adding product to wishlist:", error);
      alert("Error adding product to wishlist. Please try again.");
    }
  };

  return (
    <div className="product-card">
      {product.images.length > 0 && (
        <img
          className="prodImg"
          src={`http://localhost:8000${product.images[0]}`}
          alt={product.name}
        />
      )}
      <h2 className="prodName">{product.name}</h2>
      <p className="prodDescription">{product.description}</p>
      <p className="prodPrice">Price: ${product.price.toFixed(2)}</p>
      <p className="stock">Stock: {product.stock}</p>
      <div className="button-group">
        <button onClick={addToWishlist}>Add to Wishlist</button>
        <button onClick={addToCart}>Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductCard;
