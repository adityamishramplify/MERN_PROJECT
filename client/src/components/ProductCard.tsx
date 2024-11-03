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
      
    </div>
  );
};

export default ProductCard;
