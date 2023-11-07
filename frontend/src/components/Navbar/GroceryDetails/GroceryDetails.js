import "./GroceryDetails.css";
import { Link } from "react-router-dom";

const GroceryDetail = ({ grocery }) => {
  const handleViewClick = () => {

  };

  return (
    <div>
      <div className="GroceryCard">
        <img src={grocery.StoreImage} alt={grocery.StoreName} className="GroceryImages" />

        <div className="CardSecond">
          <div className="GroceryInformation">
            <h2>{grocery.StoreName}</h2>
            <p>
              <strong>{grocery.Location}</strong>
            </p>
          </div>

          <div>
          <Link to="/StoreDetails" className="link">
            <button className="button" >
            View
            </button>
     </Link>
       
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroceryDetail;
