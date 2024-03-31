import { getMyOrders } from "./User";

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

export function placeOrder(shippingInfo) {
  return async function (dispatch, getState) {
    const items = getState().cart.items;
    const itemsList = Object.values(items);
    let orderItems = []
    for (let i = 0; i < itemsList.length; i++) {
      const item = itemsList[i];
      const orderItem = {
        name: item.name,
        quantity: item.quantity,
        image: item.photos[0].secure_url,
        price: item.price,
        product: item._id
      }
      orderItems.push(orderItem);
    }
    const subTotal = itemsList.reduce((total, currentItem) => {
      const newTotal = total + currentItem.quantity * currentItem.price;
      return newTotal;
    }, 0);
    const tax = subTotal * 0.18;
    const shippingAmount = 10;
    const total = subTotal + tax + shippingAmount;

    dispatch({ type: Checkout_Init });
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      const response = await fetch(process.env.REACT_APP_SERVER_URL + "/order/create" , {
        method: "POST",
        body: JSON.stringify({
          shippingInfo: shippingInfo,
          orderItems: orderItems,
          shippingAmount: shippingAmount,
          taxAmount: tax,
          totalAmount: total,
          paymentInfo: {
            id: "testString",
          },
          user: getState().userReducer.userId,
          token: getState().userReducer.token
        }),
        headers: myHeaders,
      });

      console.log("ok in cart.js");
      if (response.ok) {
        dispatch({ type: Checkout_Done });
        dispatch(getMyOrders());
      } else {
        dispatch({
          type: Checkout_Error,
          payload: new Error(response.statusText),
        });
      }
    } catch (error) {
      dispatch({ type: Checkout_Error, payload: error });
    }
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
      console.log("In add to cart", state);
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
