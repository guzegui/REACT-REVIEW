import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const productsAPI = "https://api-test.adaptable.app/products";

function ProductDetailsPage() {
  const [product, setProduct] = useState(null);
  const { productId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${productsAPI}/${productId}`).then((res) => {
      setProduct(res.data);
    });
  }, []);

  const deleteProduct = () => {
    axios
      .delete(`${productsAPI}/${productId}`)
      .then(() => {
        navigate(`/`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container">
      {product && (
        <div>
          <h4>{product.description}</h4>
          <span>{product.price}</span>
        </div>
      )}
      <Link to={`/edit/${productId}`}>Edit Product</Link>
      <button onClick={deleteProduct}>Delete Product</button>
    </div>
  );
}

export default ProductDetailsPage;
