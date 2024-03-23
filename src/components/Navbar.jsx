import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-dark bg-primary mb-3">
      <Link className="navbar-brand" to={`/`}>
        Product-a-Rama
      </Link>
      <Link className="navbar-brand" to={`/new`}>
        Add a new Product
      </Link>
    </nav>
  );
}

export default Navbar;
