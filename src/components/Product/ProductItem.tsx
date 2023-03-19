import React from "react";
import { Product } from "../../types/Product";
import { formatPrice } from "../../utils/utils";

interface ProductItemProps {
  item: Product;
  onAddToCartClick: (id: number) => void;
}

const ProductItem: React.FC<ProductItemProps> = ({
  item,
  onAddToCartClick,
}) => {
  return (
    <div className="flex flex-col p-4 shadow-lg m-4 md:w-96 md:m-0">
      <img src={item.imageURL} alt="product" className="w-full md:border" />
      <div className="flex justify-between px-2 mt-2">
        <h3 className="font-bold text-xl">{item.name}</h3>
        <div className="font-semibold text-lg">{item.gender}</div>
      </div>
      <hr className="mt-2" />
      <div className="flex justify-between items-center my-2">
        <div className="font-semibold">
          {formatPrice(item.price, item.currency)}
        </div>
        <button
          className="bg-gray-600 text-white p-2 rounded-lg hover:bg-gray-800 transition-all"
          onClick={() => onAddToCartClick(item.id)}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default ProductItem;
