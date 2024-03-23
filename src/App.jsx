import "./App.css";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import ProductDetails from "./pages/ProductDetailsPage";
import AddProductPage from "./pages/AddProductPage";
import EditProductPage from "./pages/EditProductPage";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:productId" element={<ProductDetails/>} />
        <Route path="/new" element={<AddProductPage/>} />
        <Route path="/edit/:productId" element={<EditProductPage/>} />
      </Routes>
    </div>
  );
}

export default App;