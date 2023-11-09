import { toast } from "react-toastify";
import React, { useState } from "react";

const AddProducts = () => {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState(0);
  const [productImage, setProductImage] = useState(null);
  const [categoryID, setCategoryID] = useState(""); // Assuming you have a way to select the category
  const [storeID, setStoreID] = useState(""); // Assuming you have a way to select the store
  const [newprice, setNewPrice] = useState(0);
  const [itsnew, setItsNew] = useState(false);

  // Form Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (productName.trim() === "") return toast.error("Product Name is required");
    if (price <= 0) return toast.error("Price must be greater than 0");

    // Send the form data to the server
    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("price", price);
    formData.append("image", productImage);
    formData.append("categoryID", categoryID);
    formData.append("storeID", storeID);
    formData.append("newprice", newprice);
    formData.append("itsnew", itsnew);

    fetch("/product", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          // Reset the form
          setProductName("");
          setPrice(0);
          setProductImage(null);
          setCategoryID("");
          setStoreID("");
          setNewPrice(0);
          setItsNew(false);
          toast.success("Product added successfully");
        } else {
          toast.error("Failed to add product: " + data.error);
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to add product");
      });
  };

  return (
    <div className="add-category">
      <h6 className="add-category-title">Add New Product</h6>
      <form onSubmit={formSubmitHandler} className="add-category-form">
        <div className="add-category-form-group">
          <label htmlFor="productName">Product Name</label>
          <input
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            type="text"
            id="productName"
            placeholder="Enter Product Name"
          />
          <label htmlFor="price">Price</label>
          <input
            value={price}
            onChange={(e) => setPrice(parseFloat(e.target.value) || 0)}
            type="number"
            id="price"
            placeholder="Enter Price"
          />
          <label htmlFor="categoryID">Category</label>
          <select
            value={categoryID}
            onChange={(e) => setCategoryID(e.target.value)}
            id="categoryID"
          >
            {/* Populate options based on available categories */}
            <option value="">Select Category</option>
            {/* Add category options here */}
          </select>
          <label htmlFor="storeID">Store</label>
          <select
            value={storeID}
            onChange={(e) => setStoreID(e.target.value)}
            id="storeID"
          >
            {/* Populate options based on available stores */}
            <option value="">Select Store</option>
            {/* Add store options here */}
          </select>
          <label htmlFor="productImage">Product Image</label>
          <input
            onChange={(e) => setProductImage(e.target.files[0])}
            type="file"
            id="productImage"
            name="productImage"
          />
          <label htmlFor="newprice">New Price</label>
          <input
            value={newprice}
            onChange={(e) => setNewPrice(parseFloat(e.target.value) || 0)}
            type="number"
            id="newprice"
            placeholder="Enter New Price"
          />
          <label htmlFor="itsnew">Is it new?</label>
          <input
            type="checkbox"
            checked={itsnew}
            onChange={(e) => setItsNew(e.target.checked)}
            id="itsnew"
          />
        </div>
        <button type="submit" className="add-category-btn">
          Add
        </button>
      </form>
    </div>
  );
};

export default AddProducts;
