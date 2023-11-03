import "./GroceryDetails.css";
const GroceryDetail = ({ grocery }) => {
  return (
    <div className="Groceries">
      <div className="GroceryCard">
        <img
          src={grocery.StoreImage}
          alt={grocery.StoreName}
          className="GroceryImages  "
        />

        <div className="CardSecond">
          <div className="GroceryInformation">
            <h4>{grocery.StoreName}</h4>
            <p>
              <strong>{grocery.Location}</strong>
            </p>
          </div>

          <div>
            <button class="button">View</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroceryDetail;
