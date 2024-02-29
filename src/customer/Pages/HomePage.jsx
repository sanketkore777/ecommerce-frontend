import React, { useEffect, useState } from 'react';
import HomeSectionCardCarousel from '../components/HomeSectionCard/HomeSectionCardCarousel';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const HomePage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const products = useSelector((state) => state.products);
    const [isLoading, setIsLoading] = useState(true)
    const [search, setSearch] = useSelector((state) => state.searchVal.val)

    useEffect(() => {
        setIsLoading(true)
        if (products) {
            setIsLoading(false)
        }
    }, [search])

    return (
        <div className="m-5 "> {/* Added margin to the container */}
            {/* <MainCarousel /> */}
            {isLoading && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-8 border-indigo-600 border-opacity-75"></div>
                </div>
            )}
            {Object.entries(products).map(([gender, genderCategories]) => (
                <div key={gender} className="mt-[20px]">


                    {Object.entries(genderCategories).map(([category, subCategories]) => (
                        <div key={category} className="mb-4 flex-inline">
                            {Object.entries(subCategories).map(([subCategory, productsInSubCategory]) => (
                                <div key={subCategory}>
                                    <div className='m-3  text-indigo-600'>
                                        <div className="flex items-center justify-between mb-2">
                                            <div>
                                                <label className="text-2xl m-2 uppercase">{gender}</label>
                                                <label className="text-sm font-semibold m-2 uppercase">{category}</label>
                                                <label className="text-l m-2 uppercase">{subCategory}</label>
                                            </div>
                                            <button
                                                href="#"
                                                className="flex items-center justify-center rounded-md border border-transparent underline"
                                                onClick={() => navigate(`allproducts/${gender}/${category}/${subCategory}`, { state: products.cartItems })}
                                            >
                                                view more
                                            </button>
                                        </div>
                                        <hr class=" border-gray-350" />

                                    </div>

                                    {/* Check if productsInSubCategory is an array before mapping */}
                                    {(Array.isArray(productsInSubCategory) && productsInSubCategory.length != 0) ? (
                                        <HomeSectionCardCarousel products={productsInSubCategory} />
                                    ) : (
                                        <p className='text-gray-500'>No products in this category</p>
                                    )}
                                </div>

                            ))}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default HomePage;
