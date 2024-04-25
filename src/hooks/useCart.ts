import { useState, useEffect, useMemo } from "react";
import { db } from "../data/db";
import { Guitarra, CartItem, GuitarID } from "../types/Guitarra";

export const useCart = () => {
  const initialCart = (): CartItem[] => {
    const localStorageCart = localStorage.getItem("cart");
    return localStorageCart ? JSON.parse(localStorageCart) : [];
  };

  const [data] = useState(db);
  const [cart, setCart] = useState(initialCart);

  const MAX_ITEMS = 5;
  const MIN_ITEMS = 1;

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const handleAddCart = (item: Guitarra) => {
    const itemExist = cart.findIndex((guitar) => guitar.id === item.id);

    if (itemExist >= 0) {
      if (cart[itemExist].cantidad >= MAX_ITEMS) return;

      const updateCart = [...cart];
      updateCart[itemExist].cantidad++;
      setCart(updateCart);
    } else {
      const newItem: CartItem = { ...item, cantidad: 1 };
      item.cantidad = 1;
      setCart([...cart, newItem]);
    }
  };

  const handleRemoveItemCart = (id: GuitarID) => {
    setCart((prevCart) => prevCart.filter((guitar) => guitar.id !== id));
  };

  const handleAddCantidad = (id: GuitarID) => {
    const updateCart = cart.map((item) => {
      if (item.id === id && item.cantidad < MAX_ITEMS) {
        return { ...item, cantidad: item.cantidad + 1 };
      }

      return item;
    });

    setCart(updateCart);
  };

  const handleRemoveCantidad = (id: GuitarID) => {
    const updateCart = cart.map((item) => {
      if (item.id === id && item.cantidad > MIN_ITEMS) {
        return { ...item, cantidad: item.cantidad - 1 };
      }

      return item;
    });

    setCart(updateCart);
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const isEmpty = useMemo(() => cart.length === 0, [cart]);
  const cartTotal = useMemo(
    () => cart.reduce((total, item) => total + item.cantidad * item.price, 0),
    [cart]
  );

  return {
    data,
    cart,
    handleAddCart,
    handleRemoveItemCart,
    handleAddCantidad,
    handleRemoveCantidad,
    handleClearCart,
    isEmpty,
    cartTotal,
  };
};
