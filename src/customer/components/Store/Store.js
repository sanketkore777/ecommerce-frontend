import { configureStore } from "@reduxjs/toolkit";
import JwtReducer from "./Jwtslice";
import Products from './ProductSlice'
import SearchVal from "./SearchSlice";
const store = configureStore({
    reducer: {
        jwtToken: JwtReducer,
        products: Products,
        searchVal: SearchVal
    }
})

export default store;