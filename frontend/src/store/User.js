

export function logInStatus(status) {
  return {
    type: "Log_In",
    payload: status,
  };
}

export function addUserDetail(userDetails) {
  return {
    type: "Add_User_Details",
    payload: userDetails,
  };
}

export function logout() {
  return {
    type: "Log-Out",
  };
}

export function logInError(error) {
  return {
    type: "Log_In_Error",
    payload: error,
  };
}

export function setMyOrders(myOrders) {
  return {
    type: "Get_My_Orders",
    payload: myOrders,
  };
}

export function logIn(creds) {
  return async (dispatch, getState) => {
    try {
      console.log(creds);
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      const response = await fetch(
        process.env.REACT_APP_SERVER_URL + "/login",
        {
          method: "POST",
          body: JSON.stringify({
            email: creds.email,
            password: creds.password,
          }),
          headers: myHeaders,
        }
      );

      if (response.ok) {
        dispatch(logInStatus(true));
        const result = await response.json();
        console.log(result.user._id);
        const userDetails = {
          name: result.user.name,
          email: result.user.email,
          userId: result.user._id,
          token: result.token,
        };
        dispatch(addUserDetail(userDetails));
        dispatch(getMyOrders());
        console.log(getState());
      } else {
        dispatch(logInError("Enter Valid Credentials"));
      }
    } catch (error) {
      dispatch(logInError(error));
    }
  };
}

export function signUp(creds) {
  return async (dispatch, getState) => {
    try {
      console.log(creds);
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      const response = await fetch(
        process.env.REACT_APP_SERVER_URL + "/signup",
        {
          method: "POST",
          body: JSON.stringify({
            name: creds.name,
            email: creds.email,
            password: creds.password,
          }),
          headers: myHeaders,
        }
      );

      if (response.ok) {
        dispatch(logInStatus(true));
        const result = await response.json();
        console.log(result);
        const userDetails = {
          name: result.user.name,
          email: result.user.email,
          userId: result.user._id,
          token: result.token,
        };
        dispatch(addUserDetail(userDetails));
        console.log(getState());
      }
    } catch (error) {
      dispatch(logInError(error));
    }
  };
}

export function getMyOrders() {
  return async (dispatch, getState) => {
    try {
      const user = getState().userReducer;
      const myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer " + user.token)
      const response = await fetch(
        process.env.REACT_APP_SERVER_URL + "/myOrders?userId=" + user.userId,
        {
          method: "GET",
          headers: myHeaders
        }
      );
      if (response.ok) {
        const result = await response.json();
        const myOrders = result.orders;
        dispatch(setMyOrders(myOrders));
      } else {
        dispatch(logInError("Something wrong with orders"));
      }
    } catch (e) {
      dispatch(logInError(e));
    }
  };
}

function userReducer(
  state = {
    isLoggedIn: false,
    userId: null,
    name: null,
    email: null,
    token: null,
    myOrders: [],
    error: null,
  },
  action
) {
  switch (action.type) {
    case "Log_In":
      return { ...state, isLoggedIn: true };
    case "Add_User_Details":
      return {
        ...state,
        userId: action.payload.userId,
        name: action.payload.name,
        email: action.payload.email,
        token: action.payload.token,
      };
    case "Get_My_Orders":
      return {
        ...state,
        myOrders: action.payload,
      };
    case "Log-Out":
      return {
        ...state,
        isLoggedIn: false,
        name: null,
        email: null,
      };
    case "Log_In_Error":
      return { ...state, error: action.payload };
    default:
      return state;
  }
}

export default userReducer;
