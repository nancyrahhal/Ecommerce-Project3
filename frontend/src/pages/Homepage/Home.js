// Home.js
import { useEffect, useState } from "react";
// import GroceryDetail from "../../components/Navbar/GroceryDetails/GroceryDetails";
import "./Home.css";
import GroceryDetail from "../../components/Navbar/GroceryDetails/GroceryDetails";

const Home = () => {
  const [groceries, setGroceries] = useState([]);

  useEffect(() => {
    const fetchGroceries = async () => {
      try {
        const response = await fetch("/groceries");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const json = await response.json();
        console.log(json);
        setGroceries(json);
      } catch (error) {
        console.error("Error fetching groceries:", error);
      }
    };
    fetchGroceries();
  }, []);

  return (
    <div className="home">
      <div className="backgroundimg"></div>

      <div className="Groceries">
        {groceries &&
          groceries.map((grocery, index) => (
            <GroceryDetail grocery={grocery} key={grocery._id} />
          ))}
      </div>
    </div>
  );
};

export default Home;
