import React from "react";
import { CartItemProps } from "../../types/Cart";
import { formatPrice } from "../../utils/utils";

const CartItem = ({ item, count, onRemoveItem }: CartItemProps) => {
  const { id, name, price, imageURL, quantity, currency, gender } = item;

  const handleRemoveItem = () => {
    onRemoveItem(id);
  };

  return (
    <div className="flex flex-col md:flex-row items-center py-4 border-b">
      <img
        className="w-32 h-32 object-cover rounded mb-2 md:mb-0 md:mr-4"
        src={imageURL}
        alt={name}
      />
      <div className="flex flex-col md:flex-row justify-between w-full">
        <div>
          <h2 className="text-lg font-semibold">{name}</h2>
          <h4 className="mt-1">{gender}</h4>
          <p className="mt-2 text-gray-600">{`${formatPrice(
            price,
            currency
          )} x ${quantity}`}</p>
        </div>
        <div className="flex items-center mt-2 md:mt-0">
          <label htmlFor={`quantity_${id}`} className="mr-2">
            Quantity:
          </label>
          <input
            id={`quantity_${id}`}
            type="number"
            min="1"
            max={quantity}
            value={count <= quantity ? count : quantity}
            className="w-16 px-2 py-1 text-center border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={handleRemoveItem}
            className="ml-4 text-sm text-red-500 focus:outline-none hover:text-red-600"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
