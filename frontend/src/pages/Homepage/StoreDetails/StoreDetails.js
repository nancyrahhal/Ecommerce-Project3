import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./StoreDetails.css"

const StoreDetails = (props) => {
  const [storeDetails, setStoreDetails] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  let params = useParams();
  console.log(params.storeName);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/groceries/${params.storeName}`);
        setStoreDetails(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [params.storeName]);

  const toggleCategory = (category) => {
    if (selectedCategory === category) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(category);
    }
  };


  

  return (
    <div>
      {storeDetails && (
        <div className="storedetails">
        <div className="detailsimage">
          <img src={storeDetails.StoreImage}/>
          </div>
                    <div className="details">
                    <p><span className="detailsspan">Store Name:</span>{storeDetails.StoreName}</p>
                    <p><span className="detailsspan">Owner Name:</span>{storeDetails.OwnerName}</p>
                    <p><span className="detailsspan">Phone Number:</span>{storeDetails.PhoneNumber}</p>
                    <p><span className="detailsspan">Location:</span>{storeDetails.Location}</p>
                    <p><span className="detailsspan">City:</span>{storeDetails.City}</p>
                    <p><span className="detailsspan">Area:</span>{storeDetails.Area}</p>
                  </div>
</div>
      )}


  <div className="categoriesdiv">
        {storeDetails &&
          storeDetails.categories.map((category) => (
            <div key={category._id} className="category">
              
              <img src="https://bhimavaram.online/image/cache/catalog/banners/fruits_category_banner-200x200.jpg" onClick={() => toggleCategory(category)}>
                
              </img>
            </div>
          ))}
      </div>




      <div className="products">
        {storeDetails &&
          storeDetails.categories.map((category) =>
            selectedCategory === category
              ? category.products.map((product) => (
                  <div key={product._id} className="product">
                    <div className="productcard">
                 <img src=   {product.image} className="productimage"/>
                 <div>
                  <h1>{product.productName}</h1>
                  <h4>price:{product.price}</h4>
                 </div>
                 </div>
                  </div>
                ))
              : null
          )}
      </div>
    </div>
  );
};

export default StoreDetails;