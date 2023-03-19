import { Product } from "./Product";

export interface CartItemProps {
  item: Product;
  count: number;
  onRemoveItem: (id: number) => void;
}
