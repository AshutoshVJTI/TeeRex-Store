import { useState } from "react";
import { Filter } from "../../types/Filter";
import useCheckMobileScreen from "../../hooks/useCheckMobileScreen";

type Props = {
  handleFilterChange: (filters: Filter) => void;
};

const FilterComponent = ({ handleFilterChange }: Props) => {
  const isMobile = useCheckMobileScreen();
  const [color, setColor] = useState("All");
  const [gender, setGender] = useState("All");
  const [priceRange, setPriceRange] = useState("All");
  const [type, setType] = useState("All");
  const [collapsed, setCollapsed] = useState(isMobile ? true : false);

  const handleColorChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setColor(event.target.value);
  };

  const handleGenderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setGender(event.target.value);
  };

  const handlePriceRangeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setPriceRange(event.target.value);
  };

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setType(event.target.value);
  };

  const handleApplyFilters = () => {
    const filters: Filter = {
      color,
      gender,
      priceRange,
      type,
    };
    handleFilterChange(filters);
  };

  const handleResetFilters = () => {
    handleFilterChange({
      color: "All",
      gender: "All",
      priceRange: "All",
      type: "All",
    });
    setColor("All");
    setGender("All");
    setPriceRange("All");
    setType("All");
  };

  const toggleVisibility = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className="border p-4 m-4 sticky top-0 z-10">
      <button className="text-lg font-bold mb-2" onClick={toggleVisibility}>
        {collapsed ? "Show" : "Hide"} Filter
      </button>
      <div
        className={`transition-all ${
          collapsed ? "h-0 overflow-hidden" : "h-auto"
        }`}
      >
        <div className="mb-4">
          <label className="block font-bold mb-2" htmlFor="color">
            Color
          </label>
          <select
            className="block appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="color"
            value={color}
            onChange={handleColorChange}
          >
            <option value="All">All</option>
            <option value="Red">Red</option>
            <option value="Blue">Blue</option>
            <option value="Green">Green</option>
            <option value="White">White</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block font-bold mb-2" htmlFor="gender">
            Gender
          </label>
          <select
            className="block appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="gender"
            value={gender}
            onChange={handleGenderChange}
          >
            <option value="All">All</option>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block font-bold mb-2" htmlFor="price-range">
            Price Range
          </label>
          <select
            className="block appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="price-range"
            value={priceRange}
            onChange={handlePriceRangeChange}
          >
            <option value="All">All</option>
            <option value="0-250">0-250</option>
            <option value="251-450">251-450</option>
            <option value="More than 450">More than 450</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block font-bold mb-2" htmlFor="type">
            Type
          </label>
          <select
            className="block appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="type"
            value={type}
            onChange={handleTypeChange}
          >
            <option value="All">All</option>
            <option value="Polo">Polo</option>
            <option value="Hoodie">Hoodie</option>
            <option value="Basic">Basic</option>
          </select>
        </div>
        <div className="flex justify-center gap-6">
          <button
            className="bg-green-600 py-1.5 px-3 text-white rounded-lg hover:bg-green-800 transition-all"
            onClick={handleApplyFilters}
          >
            Apply
          </button>
          <button
            className="bg-gray-600 py-1.5 px-3 text-white rounded-lg hover:bg-gray-800 transition-all"
            onClick={handleResetFilters}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};
export default FilterComponent;
