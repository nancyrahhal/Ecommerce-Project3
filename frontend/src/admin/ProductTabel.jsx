import React, { useEffect, useState } from "react";
import axios from 'axios';
import AdminSidbar from "./AdminSidbar";
import './ProductTable.css';

const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [selectedProductEdit, setSelectedProductEdit] = useState(null);
  const [storeDetails, setStoreDetails] = useState({});
  const [categoryDetails, setCategoryDetails] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/product');
        setProducts(response.data);
      } catch (error) {
        console.error('There was an error in retrieving product data', error);
      }
    };

    const fetchStoreDetails = async (storeId) => {
      try {
        const response = await axios.get(`/store/${storeId}`);
        setStoreDetails((prevDetails) => ({
          ...prevDetails,
          [storeId]: response.data,
        }));
      } catch (error) {
        console.error('Error fetching store details:', error);
      }
    };

    const fetchCategoryDetails = async (categoryId) => {
      try {
        const response = await axios.get(`/category/${categoryId}`);
        setCategoryDetails((prevDetails) => ({
          ...prevDetails,
          [categoryId]: response.data,
        }));
      } catch (error) {
        console.error('Error fetching category details:', error);
      }
    };

    fetchProducts();

    // Fetch store details and category details for each product
    products.forEach((product) => {
      fetchStoreDetails(product.storeID);
      fetchCategoryDetails(product.categoryID);
    });
  }, []); // Empty dependency array to run the effect only once when the component mounts

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`/product/${id}`);
      setProducts(products.filter(product => product._id !== id));
    } catch (error) {
      console.error('There was an error in deleting the product', error);
    }
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

  const renderStoreDetails = (storeId) => {
    const store = storeDetails[storeId];
    if (store) {
      return (
        <>
          <p>Store Name: {store.StoreName}</p>
          <p>Store ID: {store._id}</p>
        </>
      );
    } else {
      return <p>Store details not available</p>;
    }
  };

  const renderCategoryDetails = (categoryId) => {
    const category = categoryDetails[categoryId];
    if (category) {
      return (
        <>
          <p>Category Name: {category.CategoryName}</p>
          <p>Category ID: {category._id}</p>
        </>
      );
    } else {
      return <p>Category details not available</p>;
    }
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
                <td>{renderCategoryDetails(product.categoryID)}</td>
                <td>{renderStoreDetails(product.storeID)}</td>
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

export default ProductTable;
