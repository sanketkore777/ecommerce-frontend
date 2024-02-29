import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from '../customer/Pages/HomePage';
import Footer from '../customer/components/Footer/Footer';
import Navigation from '../customer/components/Navigation/Navigation';
import AllProducts from '../customer/components/Products/AllProducts';
import ProductDetails from '../customer/components/ProductDetail/ProductDetails'
import Cart from '../customer/components/Cart/Cart';
import Checkout from '../customer/components/Checkout/Checkout';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../customer/components/Store/ProductSlice';

function CustomerRoutes() {
    const search = useSelector((state) => state.searchVal)
    const dispatch = useDispatch()
    useEffect(() => {
        console.log(search.val, "./././././././.")
        dispatch(fetchProducts(search.val)); // Dispatch the action using useDispatch
    }, [search]);


    return (
        <div className='flex flex-col min-h-screen'>
            <Navigation />

            <div className='z-10 flex-grow'>
                <Routes>
                    <Route path='/*' element={<HomePage />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path='/products/' element={<ProductDetails />} />
                    <Route path='allProducts/:lavelOne/:lavelTwo/:lavelThree' element={<AllProducts />} />
                    <Route path='/checkout' element={<Checkout />} />
                </Routes>
            </div>
            <Footer />
        </div>
    );
}

export default CustomerRoutes;
