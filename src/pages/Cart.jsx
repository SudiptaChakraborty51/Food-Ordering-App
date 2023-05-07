import { useContext } from "react";
import { FoodCard } from "../components/FoodCard";
import { CartContext } from "../contexts/CartContext";

export const Cart = () => {
  const {
    cart,
    totalDeliveryTime,
    totalPrice,
    isAppliedCoupon,
    setIsAppliedCoupon
  } = useContext(CartContext);

  return (
    <div className="cart">
      <h2>Cart</h2>
      <h3>Total Delivery Time: {totalDeliveryTime} minutes</h3>
      <h3>Total Price: Rs. {totalPrice}</h3>
      <button
        disabled={totalPrice === 0}
        style={{
          backgroundColor: totalPrice === 0 ? "transparent" : "#fde047",
          border: totalPrice === 0 ? "2px solid #fde047" : "none",
          color: totalPrice === 0 ? "#fde047" : "#450a0a",
          cursor: totalPrice === 0 ? "not-allowed" : "pointer"
        }}
        onClick={() => {
          setIsAppliedCoupon((isAppliedCoupon) => !isAppliedCoupon);
        }}
      >
        {isAppliedCoupon && totalPrice !== 0 ? "Remove Coupon" : "Apply Coupon"}
      </button>
      {cart.length === 0 && <p>Your Cart is empty!</p>}
      <ul>
        {cart.map((item) => (
          <FoodCard foodData={item} addCart key={item.id} />
        ))}
      </ul>
    </div>
  );
};
