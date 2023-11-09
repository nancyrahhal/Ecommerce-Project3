import React, { useEffect, useState } from "react";
import axios from 'axios';
import AdminSidbar from "./AdminSidbar";

const ProductTabel = () => {
  const [products, setProducts] = useState([]);
  const [selectedProductEdit, setSelectedProductEdit] = useState(null);

  useEffect(() => {
    axios.get('/product')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('There was an error in retrieving product data', error);
      });
  }, []);

  const deleteProduct = (id) => {
    axios.delete(`/product/${id}`)
      .then(response => {
        console.log(response.data);
        setProducts(products.filter(product => product._id !== id));
      })
      .catch(error => {
        console.error('There was an error in deleting the product', error);
      });
  };

  const editProduct = (id) => {
    axios.get(`/product/${id}`)
      .then(response => {
        setSelectedProductEdit(response.data);
      })
      .catch(error => {
        console.error('There was an error in editing the product', error);
      });
  };

  return (
    <section className="table-container">
      <AdminSidbar/>
      <div className="table-wrapper">
        <h1 className="table-title">Products</h1>
        <table className="table">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Store</th>
              <th>Image</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index}>
                <td>{product.productName}</td>
                <td>{product.price}</td>
                <td>{/* we should add product.categoryID */}category id </td>
                <td>{/* we should add  product.storeID */}product store id</td>
                <td>
                  <div className="table-image">
                    <img className="table-product-image" src={product.image} alt="" />
                  </div>
                </td>
                <td>
                  <div className="table-button-group">
                    <button onClick={() => editProduct(product._id)}>Edit Product</button>
                    <button onClick={() => deleteProduct(product._id)}>Delete Product</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ProductTabel;
