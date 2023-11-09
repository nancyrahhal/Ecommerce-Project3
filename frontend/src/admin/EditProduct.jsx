import React, { useState } from 'react';
import axios from 'axios';

const EditProduct = ({ product }) => {
  const [editedProduct, setEditedProduct] = useState(product);

  const handleChange = (event) => {
    setEditedProduct({
      ...editedProduct,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.patch(`/product/${editedProduct._id}`, editedProduct)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error('There was an error in editing', error);
      });
  };

  return (
    <div className="edit-container">
      <h1 className="edit-title">Edit Product</h1>
      <form className="edit-form" onSubmit={handleSubmit}>
        <label htmlFor="productName">Product Name</label>
        <input
          value={editedProduct.productName}
          type="text"
          id="productName"
          name="productName"
          onChange={handleChange}
        />

        <label htmlFor="price">Price</label>
        <input
          value={editedProduct.price}
          type="number"
          id="price"
          name="price"
          onChange={handleChange}
        />

        <label htmlFor="categoryID">Category</label>
        <input
          value={editedProduct.categoryID}
          type="text" 
          id="categoryID"
          name="categoryID"
          onChange={handleChange}
        />

        <label htmlFor="storeID">Store</label>
        <input
          value={editedProduct.storeID}
          type="text" 
          id="storeID"
          name="storeID"
          onChange={handleChange}
        />

        <label htmlFor="newprice">New Price</label>
        <input
          value={editedProduct.newprice}
          type="number"
          id="newprice"
          name="newprice"
          onChange={handleChange}
        />

        <label htmlFor="itsnew">Is New</label>
        <input
          type="checkbox"
          checked={editedProduct.itsnew}
          id="itsnew"
          name="itsnew"
          onChange={(event) =>
            setEditedProduct({
              ...editedProduct,
              itsnew: event.target.checked,
            })
          }
        />

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditProduct;
