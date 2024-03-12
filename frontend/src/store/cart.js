const { omit } = require("lodash");

const addToCart = "Add_To_Cart";
const removeFromCart = "Remove_From_Cart";
const showCart = "Show_Cart";
const hideCart = "Hide_Cart";
const Checkout_Init = "Checkout_Init";
const Checkout_Done = "Checkout_Done";
const Checkout_Error = "Checkout_Error";
const Checkout_Success_Navigation = "Checkout_Success_Navigation";

export function checkoutSuccess() {
  return {
    type: Checkout_Success_Navigation,
  };
}

export function addtocart(product) {
  return {
    type: addToCart,
    payload: product,
  };
}
export function removefromcart(product) {
  return {
    type: removeFromCart,
    payload: product,
  };
}

export function showcart() {
  return {
    type: showCart,
    payload: {},
  };
}
export function hidecart() {
  return {
    type: hideCart,
    payload: {},
  };
}

function cartReducer(
  state = {
    items: JSON.parse(localStorage.getItem("cart") || "{}"),
    isCartOpen: false,
    isSubmitting: false,
    isSubmitSuccess: false,
    submitError: null,
  },
  action
) {
  switch (action.type) {
    case "Show_Cart":
      return { ...state, isCartOpen: true };

    case "Hide_Cart":
      return { ...state, isCartOpen: false };

    case "Add_To_Cart": {
      const product = action.payload;
      console.log("In add to cart", state)
      if (state.items[product.id]) {
        return {
          ...state,
          items: {
            ...state.items,
            [product.id]: {
              ...state.items[product.id],
              quantity: state.items[product.id].quantity + 1,
            },
          },
        };
      } else {
        return {
          ...state,
          items: {
            ...state.items,
            [product.id]: {
              ...product,
              quantity: 1,
            },
          },
          
        };
      }
    }

    case "Remove_From_Cart":
      // Do some changes and return new state
      const product = action.payload;

      if (state.items[product.id].quantity <= 1) {
        return {
          ...state,
          items: omit(state.items, [product.id]),
        };
      } else {
        return {
          ...state,
          items: {
            ...state.items,
            [product.id]: {
              ...state.items[product.id],
              quantity: state.items[product.id].quantity - 1,
            },
          },
        };
      }

    case "Checkout_Init":
      return { ...state, isSubmitting: true };

    case "Checkout_Done":
      return {
        ...state,
        isSubmitting: false,
        isSubmitSuccess: true,
        submitError: null,
      };

    case "Checkout_Error":
      return { ...state, isSubmitting: false, submitError: action.payload };

    case "Checkout_Success_Navigation":
      return { ...state, isSubmitSuccess: false, items: {} };

    default:
      return state;
  }
}

export default cartReducer;
