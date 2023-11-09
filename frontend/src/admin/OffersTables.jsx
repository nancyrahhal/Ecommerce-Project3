import React from "react";
import "./admin-table.css";
import AdminSidebar from "./AdminSidbar";
import { Link } from "react-router-dom";
import offerpic from "../admin/offerpic.png";
import { useEffect, useState } from "react";
import axios from "axios";
import ViewOffer from "./ViewOffer";

const OffersTables = () => {
  const [offer, setOffer] = useState([]);
  const [selectedOffer, setSelectedOffer] = useState(null);

  useEffect(() => {
    axios
      .get("/offers")
      .then((response) => {
        setOffer(response.data);
      })
      .catch((error) => {
        console.error("There was an error in OFFER view", error);
      });
  }, []);

  const deleteOffer = (id) => {
    axios
      .delete(`/offers/${id}`)
      .then((response) => {
        console.log(response.data);
        setOffer(offer.filter((offer) => offer._id !== id));
      })
      .catch((error) => {
        console.error("There was an error in deleting", error);
      });
  };
  console.log(offer)

  return (
    <section className="table-container">
      <AdminSidebar />
      <div className="table-wrapper">
        <h1 className="table-title">Offers</h1>
        <table className="table">
          <thead>
            <tr>
              <th>Product </th>
              <th>Product Name</th>
              <th>Grocery Name</th>
              <th>Old price</th>
              <th>New Price</th>
              <th>Action </th>
            </tr>
          </thead>
          <tbody>
            {offer.map((offer, index) => (
              <tr key={index + 1}>
                <td>{offer.productID}</td>
                <td>
                  <div className="table-image">
                    <img className="table-offer-image" src={offerpic} alt="" />
                    <span className="table-username">offerstable</span>
                  </div>
                </td>
                <td>Stor Name</td>
                <td>Old Price</td>
                <td>New Price</td>
                <td>
                  <div className="table-button-group">
                  <button onClick={() => setSelectedOffer(offer)}>View Offer</button>

                    <button onClick={() => deleteOffer(offer._id)}>
                      Delete Offer
                    </button>
                  </div>
                </td>
                <div className="table-button-group"></div>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedOffer && (
      <ViewOffer grocery={setSelectedOffer} />
    )}
    </section>
  );
};

export default OffersTables;
