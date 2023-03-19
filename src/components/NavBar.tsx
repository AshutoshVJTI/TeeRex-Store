import { GiShoppingCart } from "react-icons/gi";
import { useState } from "react";

interface NavBarProps {
  cartCount: number;
  showCartPage: boolean;
  setShowCartPage: React.Dispatch<React.SetStateAction<boolean>>;
}

const NavBar = ({ cartCount, showCartPage, setShowCartPage }: NavBarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleCartClick = () => {
    setShowCartPage(!showCartPage);
    setIsMenuOpen(false);
  };
  const handleProductsClick = () => {
    setShowCartPage(false);
    setIsMenuOpen(false);
  };
  const handleMenuClick = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="bg-gray-600 py-4 mb-6">
      <div className="container flex justify-between items-center">
        <div className="text-2xl font-bold text-white">TeeRex Store</div>
        <div className="flex items-center">
          <button
            className="block md:hidden mr-4 text-white"
            onClick={handleMenuClick}
          >
            <svg
              className="w-6 h-6 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isMenuOpen ? (
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4 6h16v2H4V6zm0 6h16v2H4v-2zm16 4H4v-2h16v2z"
                />
              ) : (
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M3 6h18v2H3V6zm0 6h18v2H3v-2zm0 6h18v2H3v-2z"
                />
              )}
            </svg>
          </button>
          <div
            className={`${isMenuOpen ? "" : "hidden"} md:flex md:items-center`}
          >
            <button
              className="px-2 py-1 text-lg font-medium text-white rounded-lg hover:bg-white hover:text-black transition-all underline md:mx-4"
              onClick={handleProductsClick}
            >
              Products
            </button>
            <button
              className="relative px-3 py-2 text-lg font-medium text-white rounded-md bg-gray-900 hover:bg-white hover:text-black transition-all md:mx-4"
              onClick={handleCartClick}
            >
              <GiShoppingCart className="text-xl" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 px-2 text-xs text-white bg-red-500 rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
