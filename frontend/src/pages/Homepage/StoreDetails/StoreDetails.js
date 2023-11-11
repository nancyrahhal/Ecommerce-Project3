import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./StoreDetails.css";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";

import fruits from "../../../Images/strawberry.png";
import vegetables from "../../../Images/vegetable.png";
import snack from "../../../Images/snack.png";
import canned from "../../../Images/canned-food.png";
import dairy from "../../../Images/dairy-products.png";
import riceandpasta from "../../../Images/rice.png";
import drinks from "../../../Images/drink.png";
import bread from "../../../Images/white-bread.png";

const StoreDetails = () => {
  const [storeDetails, setStoreDetails] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [startIndex, setStartIndex] = useState(0);
  const categoriesToShow = 4;

  const params = useParams();
  console.log("params.storeName:", params.storeName);

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

  const getCategoryImage = (categoryName) => {
    switch (categoryName.toLowerCase()) {
      case "fruits":
        return fruits;
      case "vegetables":
        return vegetables;
      case "snack":
        return snack;
      case "canned":
        return canned;
      case "dairy":
        return dairy;
      case "riceandpasta":
        return riceandpasta;
      case "drinks":
        return drinks;
      case "bread":
        return bread;
      default:
        return null;
    }
  };

  const handleNext = () => {
    if (
      categoriesArray.length &&
      startIndex + categoriesToShow < categoriesArray.length
    ) {
      setStartIndex(startIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  console.log("storeDetails:", storeDetails);

  if (!storeDetails) {
    return <p>Loading...</p>;
  }

  console.log("storeDetails.categories:", storeDetails.categories);

  const categoriesArray = Array.isArray(storeDetails.categories)
    ? storeDetails.categories
    : storeDetails.categories
    ? [storeDetails.categories] // Ensure it's an array
    : [];

  console.log("Categories array:", categoriesArray);

  return (
    <div>
      <div className="storedetails">
        <div className="detailsimage">
          <img
            src={storeDetails.StoreImage}
            className="storeimg2"
            alt="Store"
          />
        </div>
        <div className="details">
          <p>
            <span className="detailsspan">Store Name:</span>
            {storeDetails.StoreName}
          </p>
          <p>
            <span className="detailsspan">Owner Name:</span>
            {storeDetails.OwnerName}
          </p>
          <p>
            <span className="detailsspan">Phone Number:</span>
            {storeDetails.PhoneNumber}
          </p>
          <p>
            <span className="detailsspan">Location:</span>
            {storeDetails.Location}
          </p>
          <p>
            <span className="detailsspan">City:</span>
            {storeDetails.City}
          </p>
          <p>
            <span className="detailsspan">Area:</span>
            {storeDetails.Area}
          </p>
        </div>
      </div>

      <div className="categoriesdiv">
        <div className="arrow-container" onClick={handlePrevious}>
          <FaArrowAltCircleLeft className="arrow" />
        </div>

        {categoriesArray
          .slice(startIndex, startIndex + categoriesToShow)
          .map((category) => (
            <div key={category._id} className="category">
              <img
                className="catimg"
                src={getCategoryImage(category.categoryName)}
                alt={category.categoryName}
                onClick={() => toggleCategory(category)}
              />
            </div>
          ))}

        <div className="arrow-container" onClick={handleNext}>
          <FaArrowAltCircleRight className="arrow" />
        </div>
      </div>

      <div className="products">
        {categoriesArray
          .flatMap((category) => category.products || []) // Ensure products is an array
          .filter((product) =>
            selectedCategory ? product.category === selectedCategory : true
          )
          .map((product) => (
            <div key={product._id} className="product">
              <div className="productcard">
                <img
                  src={product.image}
                  className="productimage"
                  alt={product.productName}
                />
                <div>
                  <h1>{product.productName}</h1>
                  <h4>price: {product.price}</h4>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default StoreDetails;
