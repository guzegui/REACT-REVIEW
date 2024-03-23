import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const productsAPI = "https://api-test.adaptable.app/products";

function EditProductPage() {
  const [product, setProduct] = useState({});
  const [previousProduct, setPreviousProduct] = useState(null);
  const navigate = useNavigate();
  const { productId } = useParams();

  useEffect(() => {
    axios.get(`${productsAPI}/${productId}`).then((res) => {
      console.log(res.data);
      setPreviousProduct(res.data);
      setProduct(res.data);
    });
  }, [productId]);

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .put(`${productsAPI}/${productId}`, product)
      .then(() => {
        navigate(`/${productId}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === "checkbox" ? checked : value;
    setProduct({
      ...product,
      [name]: newValue,
    });
  };

  return (
    <div className="container">
      {previousProduct && product ? (
        <form onSubmit={handleSubmit}>
          <label>Description</label>
          <input
            type="text"
            name="description"
            value={product.description}
            defaultValue={previousProduct.description}
            onChange={handleChange}
          />
          <br />
          <label>Price</label>
          <input
            type="number"
            name="price"
            value={product.price}
            defaultValue={previousProduct.price}
            onChange={handleChange}
          />
          <br />
          <label>
            In Stock:
            <input
              type="checkbox"
              name="inStock"
              checked={product.inStock}
              defaultChecked={previousProduct.inStock}
              onChange={handleChange}
            />
          </label>
          <br />

          <button type="submit">Save Changes</button>
        </form>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default EditProductPage;
