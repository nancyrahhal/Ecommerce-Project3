// Home.js
import { useEffect, useState } from "react";
// import GroceryDetail from "../../components/Navbar/GroceryDetails/GroceryDetails";
import "./Home.css";
import GroceryDetail from "../../components/Navbar/GroceryDetails/GroceryDetails";
import Search from "../../components/Navbar/SearchBar/SearchBar";
import Carousel from "../../components/Navbar/Carousel/Carousel"

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
      
<Carousel />

<p className="findgrocery">Find Your Grocery</p>

<Search/>
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
