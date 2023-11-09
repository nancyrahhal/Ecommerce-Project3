import React, { useEffect, useState } from "react";
import axios from 'axios';
import AdminSidbar from "./AdminSidbar";
import { Link } from "react-router-dom";
import ViewGrocery from "./ViewGrocery";
import EditGrocery from "./EditGrocery";

const GroceryTable = () => {
 const [groceries, setGroceries] = useState([]);
 const [selectedGrocery, setSelectedGrocery] = useState(null);
 const [selectedGroceryEdit, setSelectedGroceryEdit] = useState(null);


 useEffect(() => {
  axios.get('/groceries')
    .then(response => {
      setGroceries(response.data);
    })
    .catch(error => {
      console.error('There was an error in view', error);
    });
 }, []);

 const deleteGrocery = (id) => {
  axios.delete(`/groceries/${id}`)
    .then(response => {
      console.log(response.data);
      setGroceries(groceries.filter(grocery => grocery._id !== id));
    })
    .catch(error => {
      console.error('There was an error in deleting', error);
    });
 };

 const editGrocery = (id) => {
  axios.get(`/groceries/${id}`)
    .then(response => {
      setSelectedGroceryEdit(response.data);
    })
    .catch(error => {
      console.error('There was an error in editing', error);
    });
};



 return (
  <section className="table-container">
    <AdminSidbar />
    <div className="table-wrapper">
      <h1 className="table-title">Grocery</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Grocery Name </th>
            <th>Owner</th>
            <th>Phone</th>
            <th>Location</th>
            <th>City</th>
            <th>Area</th>
            <th>Image</th>
            <th>Action </th>
          </tr>
        </thead>
        <tbody>
          {groceries.map((grocery, index) => (
            <tr key={index}>
              <td>{grocery.StoreName}</td>
              <td>{grocery.OwnerName}</td>
              <td>{grocery.PhoneNumber}</td>
              <td>{grocery.Location}</td>
              <td>{grocery.City}</td>
              <td>{grocery.Area}</td>
              <td>
                <div className="table-image">
                 <img className="table-offer-image" src={grocery.StoreImage} alt="" />
                </div>
              </td>
              <td>
                <div className="table-button-group">

                <button onClick={() => setSelectedGrocery(grocery)}>View Grocery</button>

                
                 <button onClick={() => editGrocery(grocery._id)}>Edit Grocery</button>

                 <button onClick={() => deleteGrocery(grocery._id)}>Delete Grocery</button>
                 
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    {selectedGrocery && (
      <ViewGrocery grocery={selectedGrocery} />
    )}
     {selectedGroceryEdit && (
      <EditGrocery grocery={selectedGroceryEdit} />
    )}


  </section>
 );
};

export default GroceryTable;
