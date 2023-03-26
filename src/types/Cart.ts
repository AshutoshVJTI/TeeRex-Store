import { Product } from "./Product";

export interface CartItemProps {
  item: Product;
  count: number;
  onRemoveItem: (id: number) => void;
  idCount: {
    id: number;
    count: number;
  }[];
  setIdCount: React.Dispatch<
    React.SetStateAction<
      {
        id: number;
        count: number;
      }[]
    >
  >;
}
