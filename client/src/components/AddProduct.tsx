import React, { useState } from "react";
import "./AddProduct.css"; // Import the CSS file

const AddProduct: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<number | "">(""); // Can be number or empty
  const [stock, setStock] = useState<number | "">(""); // Can be number or empty
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setImages((prevImages) => [...prevImages, ...files]);
      const newImagePreviews = files.map((file) => URL.createObjectURL(file));
      setImagePreviews((prevPreviews) => [
        ...prevPreviews,
        ...newImagePreviews,
      ]);
    }
  };

  const removeImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    setImagePreviews((prevPreviews) =>
      prevPreviews.filter((_, i) => i !== index)
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price !== "" ? String(price) : "0"); // Convert to string
    formData.append("stock", stock !== "" ? String(stock) : "0"); // Convert to string

    // Append each selected file to formData
    images.forEach((image) => {
      formData.append("images[]", image);
    });

    try {
      const response = await fetch("http://localhost:8000/api/products", {
        method: "POST",
        body: formData,
        credentials: "include", // Include credentials for authentication
      });

      if (!response.ok) {
        throw new Error("Failed to add product");
      }

      console.log("Product added successfully");
      // Reset form fields
      setName("");
      setDescription("");
      setPrice(""); // Reset price
      setStock(""); // Reset stock
      setImages([]); // Reset images
      setImagePreviews([]); // Reset previews
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <div>
      <h1>Add Product</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value) || "")} // Set as number or empty
            required
          />
        </div>
        <div>
          <label>Stock:</label>
          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(Number(e.target.value) || "")} // Set as number or empty
            required
          />
        </div>
        <div>
          <label>Images:</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
          />
          <div className="image-preview-container">
            {imagePreviews.map((preview, index) => (
              <div key={index} className="image-preview">
                <img src={preview} alt={`Preview ${index}`} />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="remove-button"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
