import { NavLink } from "react-router-dom";

export const Home = () => {
  return (
    <div className="home">
      <h1>Welcome to neoG Food Ordering App</h1>
      <button className="menu-btn">
        <NavLink to="/menu" className="menu-navlink">
          Menu
        </NavLink>
      </button>
    </div>
  );
};
