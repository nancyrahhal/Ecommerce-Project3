import { toast } from "react-toastify";
import React, { useState } from "react";

const AddCategoryForm = () => {
  const [categoryName, setCategoryName] = useState("");
  const [storeID, setStoreID] = useState(""); // Assuming you have a way to select the store

  // Form Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (categoryName.trim() === "") return toast.error("Category Name is required");

    // Send the form data to the server
    fetch("/category", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        categoryName,
        storeID,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          // Reset the form
          setCategoryName("");
          setStoreID("");
          toast.success("Category added successfully");
        } else {
          toast.error("Failed to add category: " + data.error);
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to add category");
      });
  };

  return (
    <div className="add-category">
      <h6 className="add-category-title">Add New Category</h6>
      <form onSubmit={formSubmitHandler} className="add-category-form">
        <div className="add-category-form-group">
          <label htmlFor="categoryName">Category Name</label>
          <input
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            type="text"
            id="categoryName"
            placeholder="Enter Category Name"
          />
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
        </div>
        <button type="submit" className="add-category-btn">
          Add
        </button>
      </form>
    </div>
  );
};

export default AddCategoryForm;
