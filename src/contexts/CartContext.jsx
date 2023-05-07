import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isAppliedCoupon, setIsAppliedCoupon] = useState(false);

  useEffect(() => {
    const totalPriceInCart = cart?.reduce(
      (total, { price }) => total + price,
      0
    );

    isAppliedCoupon
      ? setTotalPrice(
          totalPriceInCart >= 5 ? totalPriceInCart - 5 : totalPriceInCart
        )
      : setTotalPrice(totalPriceInCart);
    cart.length === 0 && setIsAppliedCoupon(false);
  }, [cart, isAppliedCoupon]);

  const addToCart = (item) =>
    cart.includes(item) ? null : setCart((cart) => [...cart, item]);

  const removeFromCart = (item) => {
    setCart((cart) => cart.filter(({ id }) => id !== item.id));
  };

  const isItemInCart = (item) => cart?.find(({ id }) => id === item.id);

  const totalDeliveryTime = cart?.reduce(
    (total, { delivery_time }) => total + delivery_time,
    0
  );

  console.log(totalPrice);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        isItemInCart,
        totalDeliveryTime,
        totalPrice,
        isAppliedCoupon,
        setIsAppliedCoupon
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
