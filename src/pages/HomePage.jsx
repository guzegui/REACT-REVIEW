import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const productsAPI = "https://api-test.adaptable.app/products";

function HomePage() {
  const [products, setProducts] = useState(null);
  const [showInStock, setShowInStock] = useState(false);
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
  }, [searchProducts, showInStock]);

  const filterProducts = () => {
    let filteredProducts = productsFromAPI.filter((product) => {
      return product.description
        .toLowerCase()
        .includes(searchProducts.toLowerCase());
    });

    if (showInStock) {
      filteredProducts = filteredProducts.filter((product) => {
        return product.inStock === showInStock;
      });
    }

    setProducts(filteredProducts);
  };

  const handleChange = (e) => {
    const newProduct = e.target.value.toLowerCase();
    setSearchProducts(newProduct);
  };

  const toggleInStock = () => {
    setShowInStock(!showInStock);
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
