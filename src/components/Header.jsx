import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";

export const Header = () => {
  const { cart } = useContext(CartContext);

  const getActiveStyle = ({ isActive }) => ({
    color: isActive ? "#fde047" : "",
    borderBottom: isActive ? "2px solid #fde047" : ""
  });

  return (
    <nav>
      <NavLink to="/" className="navlink" style={getActiveStyle}>
        Home
      </NavLink>
      <NavLink to="/menu" className="navlink" style={getActiveStyle}>
        Menu
      </NavLink>
      <NavLink to="/cart" className="navlink" style={getActiveStyle}>
        Cart({cart.length})
      </NavLink>
    </nav>
  );
};
