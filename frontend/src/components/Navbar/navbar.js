import { Link } from "react-router-dom";
import "../Navbar/navbar.css";
const Navbar = () => {
  return (
    <header>
      <div className="Navbar">
   
   <Link to ="/">
          <img src="https://cdn.discordapp.com/attachments/1159745951066497035/1168922949055688795/ShopEZSave__2_-removebg-preview.png?ex=65538754&is=65411254&hm=2e3dce2e367bc01eae562020bceec519f44b079c5712fad4d6ae1d4f06de987d&"></img>
     </Link>
     
     <div className="secondnav">
          <Link to="/" className="link">
            <h1>Home</h1>
        </Link>

        
        <Link to ="/Offers" className="link">
          <h1>Offers</h1>
        </Link>


        <Link to = "/About" className="link">
          <h1>About</h1>
        </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
