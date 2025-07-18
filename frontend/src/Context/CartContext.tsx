import { createContext, useContext, useReducer, useEffect } from "react";
import type { ReactNode } from "react";

export interface CartItem {
  id: number;
  name: string;
  price: string; // e.g., "$49.99"
  image: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

type CartAction =
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "REMOVE_ITEM"; payload: number }
  | { type: "UPDATE_QTY"; payload: { id: number; delta: number } }
  | { type: "CLEAR_CART" };

const CartContext = createContext<{
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: number) => void;
  updateQty: (id: number, delta: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
}>({
  items: [],
  addItem: () => {},
  removeItem: () => {},
  updateQty: () => {},
  clearCart: () => {},
  cartTotal: 0,
  cartCount: 0,
});

const parsePrice = (price: string): number =>
  parseFloat(price.replace("$", ""));

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_ITEM": {
      const exists = state.items.find((item) => item.id === action.payload.id);
      if (exists) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          ),
        };
      }
      return { ...state, items: [...state.items, action.payload] };
    }
    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((i) => i.id !== action.payload),
      };
    case "UPDATE_QTY":
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id
            ? {
                ...item,
                quantity: Math.max(1, item.quantity + action.payload.delta),
              }
            : item
        ),
      };
    case "CLEAR_CART":
      return { ...state, items: [] };
    default:
      return state;
  }
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [] }, () => {
    const saved = localStorage.getItem("cart");
    return saved ? { items: JSON.parse(saved) } : { items: [] };
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.items));
  }, [state.items]);

  const addItem = (item: CartItem) =>
    dispatch({ type: "ADD_ITEM", payload: item });
  const removeItem = (id: number) =>
    dispatch({ type: "REMOVE_ITEM", payload: id });
  const updateQty = (id: number, delta: number) =>
    dispatch({ type: "UPDATE_QTY", payload: { id, delta } });
  const clearCart = () => dispatch({ type: "CLEAR_CART" });

  const cartTotal = state.items.reduce((total: number, item: CartItem) => {
    return total + parsePrice(item.price) * item.quantity;
  }, 0);

  const cartCount = state.items.reduce((count: number, item: CartItem) => {
    return count + item.quantity;
  }, 0);

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        addItem,
        removeItem,
        updateQty,
        clearCart,
        cartTotal,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
