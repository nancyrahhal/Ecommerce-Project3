import "./GroceryDetails.css";
import { Link } from "react-router-dom";

const GroceryDetail = ({ grocery }) => {
  const { StoreImage, StoreName, Location } = grocery;

  return (
    <div>
      <div className="GroceryCard">
        <img src={StoreImage} alt={StoreName} className="GroceryImages" />
        <div className="CardSecond">
          <div className="GroceryInformation">
            <h2>{StoreName}</h2>
            <p>
              <strong>{Location}</strong>
            </p>
          </div>

          <div>
            <Link
              to={{
                pathname: `/StoreDetails/${StoreName}`,
              }}
              className=" button"
            >
              {/* <button className="button"></button> */}
              View
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroceryDetail;
