import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const productsAPI = "https://api-test.adaptable.app/products";

function AddProductPage() {
  const [product, setProduct] = useState({
    description: "",
    price: "",
    inStock: false
  });

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post(`${productsAPI}`, product)
      .then(() => {
        navigate(`/`);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === "checkbox" ? checked : value;
    setProduct({
      ...product,
      [name]: newValue
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Description</label>
      <input
        type="text"
        name="description"
        value={product.description}
        onChange={handleChange}
      /><br />
      <label>Price</label>
      <input
        type="number"
        name="price"
        value={product.price}
        onChange={handleChange}
      /><br />
      <label>
        In Stock:
        <input
          type="checkbox"
          name="inStock"
          checked={product.inStock}
          onChange={handleChange}
        />
      </label><br />

      <button type="submit">Add Product</button>
    </form>
  );
}

export default AddProductPage;
