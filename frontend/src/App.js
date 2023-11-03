import { BrowserRouter, Routes, Route } from "react-router-dom";
//pages and components
import Home from "./pages/Homepage/Home";
import Navbar from "./components/Navbar/navbar";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Offers" element={<Offers />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
