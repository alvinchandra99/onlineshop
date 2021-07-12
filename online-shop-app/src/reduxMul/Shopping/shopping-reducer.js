import * as actionTypes from "./shopping-types";
import Service from "../../service/Service";

const INITIAL_STATE = {
  products: [],
  cart: [],
  currentItem: null,
  pagination: {},
};

Service.getData("products/14/0").then((response) => {
  response.data.content.map((data) => {
    return INITIAL_STATE.products.push(data);
  });
  INITIAL_STATE.pagination = response.data;
});

const shopReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.ADD_TO_CART:
      // Great Item data from products array
      const item = state.products.find(
        (product) => product.id === action.payload.id
      );
      // Check if Item is in cart already
      const inCart = state.cart.find((item) =>
        item.id === action.payload.id ? true : false
      );

      return {
        ...state,
        cart: inCart
          ? state.cart.map((item) =>
              item.id === action.payload.id
                ? {
                    ...item,
                    qty: item.qty < item.stock ? item.qty + 1 : item.qty,
                  }
                : item
            )
          : [...state.cart, { ...item, qty: item.qty < item.stock ? 1 : 0 }],
      };

    case actionTypes.REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload.id),
      };
    case actionTypes.ADJUST_ITEM_QTY:
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload.id
            ? { ...item, qty: +action.payload.qty }
            : item
        ),
      };
    case actionTypes.LOAD_CURRENT_ITEM:
      return {
        ...state,
        currentItem: action.payload,
      };
    default:
      // localStorage.setItem("cart", JSON.stringify(state.cart));
      return state;
  }
};

export default shopReducer;
