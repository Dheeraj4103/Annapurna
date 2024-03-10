const Load_Products_Start = "Load_Products_Start";
const Load_Products_Done = "Load_Products_Done";
const Load_Product_Error = "Load_Product_Error";

export function productsLoading() {
    return {
        type: Load_Products_Start
    };
};

export function productsLoaded(products) {
    return {
        type: Load_Products_Done,
        payload: products
    };
};

export function productsError(error) {
    return {
        type: Load_Product_Error,
        payload: error
    };
};

export function loadingProducts() {
    return async (dispatch, getstate) => {
        dispatch(productsLoading());

        try {
            const response = await fetch(process.env.REACT_APP_SERVER_URL + "/products");
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                dispatch(productsLoaded(data.products));
            } else {
                dispatch(productsError(new Error(response.statusText)));
            }
        } catch (error) {
            dispatch(productsError(error));
        }
    };
};

function productsReducer(
    state = {
        isLoading: false,
        error: null,
        products: []
    },
    action
) {
    switch (action.type) {
        case "Load_Products_Start":
            return { ...state, isLoading: true };
        case "Load_Products_Done":
            return { ...state, isLoading: false, products: action.payload };
        case "Load_Products_Error":
            return { ...state, isLoading: true, error: action.payload };
        default:
            return state
    }
}

export default productsReducer;