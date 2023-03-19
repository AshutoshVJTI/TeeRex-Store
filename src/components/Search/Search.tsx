import { useState } from "react";
import { Product } from "../../types/Product";

interface SearchProps {
  products: Product[];
  setSearchResults: (results: Product[]) => void;
}

const Search: React.FC<SearchProps> = ({ products, setSearchResults }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const term = e.target.value.toLowerCase();
      setSearchTerm(term);

      const results = products.filter((product) =>
        product.name.toLowerCase().includes(term)
      );

      setSearchResults(results);
    } catch (error) {
      console.log("Error occurred while handling search:", error);
    }
  };

  return (
    <div className="relative w-full">
      <input
        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:shadow-outline-blue"
        type="search"
        name="search"
        placeholder="Search for products..."
        value={searchTerm}
        onChange={handleSearch}
      />
    </div>
  );
};

export default Search;
