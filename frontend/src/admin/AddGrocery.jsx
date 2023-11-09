import { toast } from "react-toastify";
import React, { useState } from "react";

const AddGrocery = () => {
  const [groceryName, setGroceryName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [city, setCity] = useState("");
  const [area, setArea] = useState("");
  const [groceryImage, setGroceryImage] = useState(null);

  // Form Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (groceryName.trim() === "") return toast.error("Grocery Name is required");
    if (ownerName.trim() === "") return toast.error("Owner Name is required");
    if (phoneNumber.trim() === "") return toast.error("Phone Number is required");
    if (city.trim() === "") return toast.error("City is required");

    // Send the form data to the server
    const formData = new FormData();
    formData.append("StoreName", groceryName);
    formData.append("OwnerName", ownerName);
    formData.append("PhoneNumber", phoneNumber);
    formData.append("City", city);
    formData.append("Area", area);
    formData.append("groceryImage", groceryImage);

    fetch("/groceries", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          // Reset the form
          setGroceryName("");
          setOwnerName("");
          setPhoneNumber("");
          setCity("");
          setArea("");
          setGroceryImage(null);
          toast.success("Grocery added successfully");
        } else {
          toast.error("Failed to add grocery: " + data.error);
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to add grocery");
      });
  };

  return (
    <div className="add-category">
      <h6 className="add-category-title">Add New Grocery</h6>
      <form onSubmit={formSubmitHandler} className="add-category-form">
        <div className="add-category-form-group">
          <label htmlFor="groceryName">Grocery Name</label>
          <input
            value={groceryName}
            onChange={(e) => setGroceryName(e.target.value)}
            type="text"
            id="groceryName"
            placeholder="Enter Grocery Name"
          />
          <label htmlFor="ownerName">Owner Name</label>
          <input
            value={ownerName}
            onChange={(e) => setOwnerName(e.target.value)}
            type="text"
            id="ownerName"
            placeholder="Enter Owner Name"
          />
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            type="number"
            id="phoneNumber"
            placeholder="Enter Phone Number"
          />
          <label htmlFor="city">City</label>
          <input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            type="text"
            id="city"
            placeholder="Enter City"
          />
          <label htmlFor="area">Area</label>
          <input
            value={area}
            onChange={(e) => setArea(e.target.value)}
            type="text"
            id="area"
            placeholder="Enter Area"
          />
          <label htmlFor="groceryImage">Grocery Image</label>
          <input
            onChange={(e) => setGroceryImage(e.target.files[0])}
            type="file"
            id="groceryImage"
            name="groceryImage"
          />
        </div>
        <button type="submit" className="add-category-btn">
          Add
        </button>
      </form>
    </div>
  );
};

export default AddGrocery;
