import React, { useEffect, useState } from "react";
import { Product } from "../types/Product";
import CartItem from "../components/Cart/CartItem";
import { formatPrice } from "../utils/utils";

interface CartListProps {
  items: Product[];
  cartIds: number[];
  setCartIds: React.Dispatch<React.SetStateAction<number[]>>;
}

const CartList: React.FC<CartListProps> = ({ items, cartIds, setCartIds }) => {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [idCount, setIdCount] = useState<{ id: number; count: number }[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);

  useEffect(() => {
    const filteredItems = items.filter((item) => cartIds.includes(item.id));
    setCartItems(filteredItems);

    const countIdValues = cartIds.reduce<{ id: number; count: number }[]>(
      (acc, id) => {
        const existingIndex = acc.findIndex((item) => item.id === id);
        if (existingIndex !== -1) {
          acc[existingIndex].count++;
        } else {
          acc.push({ id, count: 1 });
        }
        return acc;
      },
      []
    );
    setIdCount(countIdValues);
  }, [cartIds, items]);

  useEffect(() => {
    const amount = cartItems.reduce(
      (total, item) =>
        total +
        item.price *
          (idCount.find((count) => count.id === item.id)?.count || 1),
      0
    );
    setTotalAmount(amount);
  }, [cartItems, idCount]);

  const onRemoveItem = (id: number) => {
    setCartItems((prevCartItems) =>
      prevCartItems.filter((item) => item.id !== id)
    );
    setCartIds((prevCartIds) => prevCartIds.filter((cartId) => cartId !== id));
  };

  return (
    <div className="flex container flex-col justify-start px-4 py-6 sm:px-6 lg:px-8">
      {cartItems.length === 0 ? (
        <p className="text-gray-600 text-lg">Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              count={idCount.find((count) => count.id === item.id)?.count || 1}
              onRemoveItem={onRemoveItem}
            />
          ))}
          <div className="flex justify-end mt-4 font-bold text-xl">
            Total Amount: {formatPrice(totalAmount, items[0].currency)}
          </div>
        </>
      )}
    </div>
  );
};

export default CartList;
