import React, { useEffect, useState } from "react";
import { Product } from "../types/Product";
import Filter from "../components/Filter/Filter";
import Search from "../components/Search/Search";
import ProductItem from "../components/Product/ProductItem";
import { Filter as FilterType } from "../types/Filter";

interface ProductListProps {
  items: Product[];
  setCartIds: React.Dispatch<React.SetStateAction<number[]>>;
  cartIds: number[];
}

const ProductList: React.FC<ProductListProps> = ({
  items,
  setCartIds,
  cartIds
}) => {
  const [searchResults, setSearchResults] = useState<Product[]>(items);
  const [filteredSearchResults, setFilteredSearchResults] = useState<Product[]>(
    items
  );
  const [selectedFilters, setSelectedFilters] = useState<FilterType>({
    color: "All",
    gender: "All",
    priceRange: "All",
    type: "All",
  });

  useEffect(() => {
    const filteredProducts = searchResults.filter((item) => {
      const { color, gender, priceRange, type } = selectedFilters;
      if (
        (color === "All" || item.color === color) &&
        (gender === "All" || item.gender === gender) &&
        (priceRange === "All" ||
          (priceRange === "0-250" && item.price <= 250) ||
          (priceRange === "251-450" && item.price > 250 && item.price <= 450) ||
          (priceRange === "More than 450" && item.price > 450)) &&
        (type === "All" || item.type === type)
      ) {
        return true;
      }
      return false;
    });
    setFilteredSearchResults(filteredProducts);
  }, [searchResults, selectedFilters]);

  const handleFilterChange = (filters: FilterType) => {
    setSelectedFilters(filters);
  };

  const handleAddToCartClick = (id: number) => {
    const selectedItem = items.find(item => item.id === id);
    if (!selectedItem) {
      console.error(`Item with ID ${id} not found.`);
      return;
    }
    const count = cartIds.filter((cartId) => cartId === id).length;
    if (count >= selectedItem.quantity) {
      alert("Maximum quantity reached for this item.");
      return;
    }
    setCartIds([...cartIds, id]);
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="md:w-1/4">
        <Filter handleFilterChange={handleFilterChange} />
      </div>
      <div className="md:w-3/4">
        <div className="sticky top-0 bg-white py-5 z-10">
          <Search setSearchResults={setSearchResults} products={items} />
        </div>
        <div className="flex flex-col md:flex-row md:flex-wrap">
          {filteredSearchResults.map((item, index) => {
            return (
              <div className="w-full md:w-1/3 px-2 mb-6" key={index}>
                <ProductItem
                  item={item}
                  onAddToCartClick={handleAddToCartClick}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
