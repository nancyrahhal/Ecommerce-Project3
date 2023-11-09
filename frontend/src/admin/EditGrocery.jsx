import React, { useState } from 'react';
import axios from 'axios';

const EditGrocery = ({grocery}) => {
  const [editedGrocery, setEditedGrocery] = useState(grocery);

  const handleChange = (event) => {
    setEditedGrocery({
      ...editedGrocery,
      [event.target.name]: event.target.value
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    axios.patch(`/groceries/${editedGrocery._id}`, editedGrocery)
      .then(response => {
        console.log(response.data);
        
      })
      .catch(error => {
        console.error('There was an error in editing', error);
      });
  };
  

  return (
    <div className="view-container">
      <h1 className="view-title">{editedGrocery.StoreName}</h1>
      <form className="view-form" onSubmit={handleSubmit}>
        <label htmlFor="Name">Owner Name</label>
        <input value={editedGrocery.OwnerName} type="text" id="Name" name="OwnerName" onChange={handleChange} />

        <label htmlFor="Number">Number</label>
        <input value={editedGrocery.PhoneNumber} type="text" id="Number" name="PhoneNumber" onChange={handleChange} />

        <label htmlFor="Location">Location</label>
        <input value={editedGrocery.Location} type="text" id="Location" name="Location" onChange={handleChange} />

        <label htmlFor="City">City</label>
        <input value={editedGrocery.City} type="text" id="City" name="City" onChange={handleChange} />

        <label htmlFor="Area">Area</label>
        <input value={editedGrocery.Area} type="text" id="Area" name="Area" onChange={handleChange} />

        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default EditGrocery;
