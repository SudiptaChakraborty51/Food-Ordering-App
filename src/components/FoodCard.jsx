import { useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import { NavLink } from "react-router-dom";

export const FoodCard = ({ foodData, addCart }) => {
  const { addToCart, isItemInCart, removeFromCart } = useContext(CartContext);

  const { id, name, description, price, image, delivery_time } = foodData;
  return (
    <>
      <li key={id}>
        <img src={image} alt={name} />
        <p>Name: {name}</p>
        <p>
          <strong>Description: </strong>
          {description}
        </p>
        <p>Price: {price}</p>
        <p>Delivery Time: {delivery_time}</p>
        {!addCart && (
          <button onClick={() => addToCart(foodData)} className="cart-btn">
            {isItemInCart(foodData) ? (
              <NavLink to="/cart">Go to Cart</NavLink>
            ) : (
              "Add To Cart"
            )}
          </button>
        )}
        {addCart && (
          <button onClick={() => removeFromCart(foodData)}>
            Remove from Cart
          </button>
        )}
      </li>
    </>
  );
};
