import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const productsAPI = "https://api-test.adaptable.app/products";

function HomePage() {
  const [products, setProducts] = useState(null);
  const [productsFromAPI, setProductsFromAPI] = useState([]);
  const [searchProducts, setSearchProducts] = useState("");

  useEffect(() => {
    axios.get(productsAPI).then((res) => {
      setProducts(res.data);
      setProductsFromAPI(res.data);
    });
  }, []);

  useEffect(() => {
    filterProducts();
  }, [searchProducts]);

  const filterProducts = () => {
    const filteredProducts = productsFromAPI.filter((product) => {
      return product.description
        .toLowerCase()
        .includes(searchProducts.toLowerCase());
    });
    setProducts(filteredProducts);
  };

  const handleChange = (e) => {
    const newProduct = e.target.value.toLowerCase();
    setSearchProducts(newProduct);
  };

  const toggleInStock = () => {
    // If the products on page are the full list, toggle to show only in-stock products
    if (products.length === productsFromAPI.length) {
      setProducts(
        productsFromAPI.filter((product) => {
          return product.inStock;
        })
      );
    } else {
      // Otherwise, toggle to show all
      setProducts(productsFromAPI);
    }
  };
  return (
    <div className="container">
      <h1 style={{ fontSize: "24px" }}>Many products to choose from!</h1>

      <input
        onChange={handleChange}
        value={searchProducts}
        placeholder="Search Products"
      />
      <input type="checkbox" onChange={toggleInStock} />
      <label htmlFor="stockCheckbox">Only show products in stock</label>

      {products && (
        <div className="list-group">
          {products.map((product) => (
            <Link
              className="list-group-item list-group-item-action"
              key={product.id}
              to={`/${product.id}`}
            >
              <h3>{product.description}</h3>
              <h4>{product.price}</h4>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default HomePage;
