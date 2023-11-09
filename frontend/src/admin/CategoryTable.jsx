import AdminSidbar from "./AdminSidbar";
import offerpic from "../admin/offerpic.png";
import { Link } from "react-router-dom";

import React from 'react'

const CategoryTable = () => {
  return (
    <section className="table-container">
    <AdminSidbar />
    <div className="table-wrapper">
      <h1 className="table-title">Category</h1>
      <table className="table">
        <thead>
          <tr>
            <th>number</th>
            <th>category name  </th>
            <th>Image</th>
            <th>Action </th>
          </tr>
        </thead>
        <tbody>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
            <tr key={item}>
              <td>{item} </td>
              <td>category name</td>
              
              <td>
                <div className="table-image">
                  <img className="table-offer-image" src={offerpic} alt="" />
                </div>
              </td>
             
              <td>
                <div className="table-button-group">
                  <button>
                    <Link to={"/profile/1"}>View Grocery</Link>
                  </button>
                  <button>Delete Grocery</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </section>
  )
}

export default CategoryTable
