import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AxiosInstance from '../../AxiosModel';
import { useSelector } from 'react-redux';
function ProductDetails() {
    const navigate = useNavigate()
    const location = useLocation();
    const [product, setProduct] = useState({});
    const jwtToken = useSelector((state) => state.jwtToken.jwtToken)
    const user = useSelector((state) => state.jwtToken.userEmail)
    const AXIOS = AxiosInstance(jwtToken)
    const [quantity, setQuantity] = useState(1)
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
        setProduct(location.state || {});
        if (!product) setIsLoading(true)
        console.log('---', product)
    }, [location.state]);

    if (!product || !product.title) {
        return <div>Product not found</div>;
    }

    async function handleAddToCart(id) {
        try {
            console.log(jwtToken, '././/./')
            setIsLoading(true)
            const res = await AXIOS.post('/api/cart/add', {
                quantity, productId: id
            });
            if (res.status == 200) {
                navigate('/cart')
                setIsLoading(false)
            } else {
                setIsLoading(true)
                alert(res)
                console.log(res, "hhhhhhhhhh")
            }
        } catch (error) {
            alert(error)
            navigate("/")
        }
    }

    return (
        <div className="bg-white p-8">
            {isLoading && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-8 border-indigo-600 border-opacity-75"></div>
                </div>
            )}
            <div className="lg:flex lg:items-center lg:justify-between">
                {/* Image gallery */}
                <div className="max-w-lg mb-8 lg:mb-0">
                    <img
                        src={product.imageUrl}
                        alt={product.title}
                        className="w-full h-full object-cover object-center rounded-lg"
                    />
                </div>

                {/* Product information */}
                <div className="max-w-2xl mx-auto lg:ml-10">
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                        {product.title}
                    </h1>
                    <p className="text-3xl tracking-tight text-gray-900">
                        {product.discountedPrice ? (
                            <>
                                <span className="text-green-500 font-bold">${product.discountedPrice}</span>
                                <span className="text-gray-500 line-through ml-2">${product.price}</span>
                            </>
                        ) : (
                            `$${product.price}`
                        )}
                    </p>

                    {/* Ratings */}
                    <div className="flex items-center mt-4">
                        {/* Add your star icons for ratings here */}
                        <p className="text-gray-500 ml-2">{product.numRatings} reviews</p>
                    </div>

                    {/* Color */}
                    <div className="mt-4 flex items-center">
                        <h3 className="text-lg font-semibold text-gray-900">Color:</h3>
                        <p className="ml-2 text-base text-gray-600">{product.color}</p>
                    </div>

                    {/* Size options */}
                    <div className="mt-4">
                        <h3 className="text-lg font-semibold text-gray-900">Sizes:</h3>
                        <div className="flex space-x-2">
                            {product.sizes.map((size) => (
                                <span key={size._id} className="text-base text-gray-600">
                                    {size.name} ({size.quantity} available)
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Description */}
                    <div className="mt-6">
                        <h3 className="text-lg font-semibold text-gray-900">Description:</h3>
                        <p className="mt-2 text-base text-gray-600">{product.description}</p>
                    </div>
                    <div className="p-5 pt-10">
                        <button
                            onClick={() => {
                                if (quantity !== 1) setQuantity(quantity - 1)
                            }}
                            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-2 rounded-l focus:outline-none m-3 "
                        >
                            -
                        </button>
                        <span className="bg-gray-100 text-gray-800 py-1 px-2">{quantity}</span>
                        <button
                            onClick={() => {
                                setQuantity(quantity + 1)
                            }}
                            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-2 rounded-r focus:outline-none m-3"
                        >
                            +
                        </button>
                    </div>
                    {/* Add to Cart button */}
                    <button
                        className="mt-8 bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none"
                        onClick={() => handleAddToCart(product._id)}
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProductDetails;
