// Import necessary dependencies and AxiosInstance
import { createSlice } from "@reduxjs/toolkit";
import AxiosInstance from "../../AxiosModel";

// Initial state
const initialState = {};

// Create a slice
const ProductSlice = createSlice({
    name: 'Products',
    initialState,
    reducers: {
        setProducts(state, action) {
            return action.payload;
        }
    }
});

// Async thunk action creator
export const fetchProducts = (search) => async (dispatch, getState) => {
    const jwt = getState().jwtToken;
    const Axios = AxiosInstance(jwt);

    try {
        let _products = await Axios.get('/home', {
            params: { search }
        });
        console.log("====", search)
        console.log('Products---', _products.data)
        dispatch(setProducts(_products.data));
    } catch (error) {
        console.log(error.message)
    }
};

// Export action creators and reducer
export const { setProducts } = ProductSlice.actions;
export default ProductSlice.reducer;

// Usage in component:
// dispatch(fetchProducts());
