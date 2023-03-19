import React, { useEffect, useState } from "react";
import "./App.css";
import CartList from "./pages/CartList";
import NavBar from "./components/NavBar";
import ProductList from "./pages/ProductList";
import { Product } from "./types/Product";
import { fetchCatalog } from "./utils/api";

function App() {
  const [catalog, setCatalog] = useState<Product[]>([]);
  const [cartIds, setCartIds] = useState<number[]>([]);
  const [showCartPage, setShowCartPage] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    fetchCatalog()
      .then((data) => {
        setCatalog(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="App">
      <NavBar
        cartCount={new Set(cartIds).size}
        showCartPage={showCartPage}
        setShowCartPage={setShowCartPage}
      />
      {showCartPage ? (
        <CartList items={catalog} cartIds={cartIds} setCartIds={setCartIds}/>
      ) : (
        <ProductList
          items={catalog}
          setCartIds={setCartIds}
          cartIds={cartIds}
        />
      )}
    </div>
  );
}

export default App;
