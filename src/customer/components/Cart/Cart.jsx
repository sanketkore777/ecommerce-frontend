import { Fragment, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useNavigate, useHistory, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AxiosInstance from '../../AxiosModel';
import RemoveCircleOutlineRoundedIcon from '@mui/icons-material/RemoveCircleOutlineRounded';

export default function Cart() {
    const [products, setProducts] = useState([])
    const [open, setOpen] = useState(true);
    const [change, setChanged] = useState(0)
    const navigate = useNavigate()
    const location = useLocation()
    const jwtToken = useSelector((state) => state.jwtToken.jwtToken)
    // const user = useSelector((state) => state.jwtToken.userEmail)
    const [isLoading, setIsLoading] = useState(false)
    const AXIOS = AxiosInstance(jwtToken)
    useEffect(() => {
        const fetch = async () => {
            try {
                setIsLoading(true)
                const res = await AXIOS.get('/api/cart/')
                console.log(res.data, "jijijiijjijiji")
                if (res.status === 200) {
                    setProducts(res.data)
                    setIsLoading(false)
                }
            } catch (error) {
                console.log(error, 'errrrrrrrrror')
                navigate('/')
            }
        }
        fetch()
    }, [change])
    if (!products) {
        return (<div>Product not found</div>)
    }
    const handleRemoveCartItem = async (productId) => {
        try {
            setIsLoading(true)
            let res = await AXIOS.delete('api/cart/remove', {
                data: { productId }
            })
            if (res.status == 202) {
                setChanged(change + 1)
                setIsLoading(false)
            }
            else {
                alert('Something went wrong!')
                navigate('/')
            }
        } catch (error) {
            alert(error)
            navigate('/')
        }
    }
    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="fixed inset-0 z-50 overflow-y-auto bg-white" onClose={() => setOpen(false)}>
                <div className="flex items-center justify-center min-h-screen p-6">
                    <div className="relative bg-white max-w-screen-md w-full">
                        <button
                            type="button"
                            className="absolute top-0 right-0 p-4 text-gray-500"
                            onClick={() => {
                                navigate(-2)
                            }}
                        >
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>

                        <div className="p-6">
                            <Dialog.Title className="text-lg font-medium text-gray-900">Shopping cart</Dialog.Title>

                            <div className="mt-8">
                                <div className="flow-root">
                                    <ul role="list" className="-my-6 divide-y divide-gray-200">
                                        <h1 className="text-3xl font-semibold mb-4">Your Cart</h1>
                                        {products?.cartItems?.map((cartItem) => (
                                            <div key={cartItem._id} className="flex border p-4 mb-7 items-center bg-white relative">
                                                <img
                                                    src={cartItem.product.imageUrl}
                                                    alt={cartItem.product.title}
                                                    className="w-16 h-16 object-cover mr-4"
                                                />
                                                <div>
                                                    <h3 className="text-xl font-semibold mb-2">{cartItem.product.title}</h3>
                                                    <p className="text-gray-600">Size: {cartItem.size}</p>
                                                    <p className="text-gray-600">Quantity: {cartItem.quantity}</p>
                                                    <p className="text-gray-600">Price: ${cartItem.price}</p>
                                                </div>
                                                <button
                                                    onClick={() => handleRemoveCartItem(cartItem.product._id)}
                                                    className="absolute bottom-0 right-0 bg-gray-300 hover:bg-gray-500 color-inidgo-600 text-white font-bold p-1 m-2 rounded text-xs  focus:outline-none focus:shadow-outline-blue "
                                                >
                                                    <RemoveCircleOutlineRoundedIcon />
                                                </button>
                                            </div>
                                        ))}

                                        <div className="bg-gray-100 p-4 rounded">
                                            <h2 className="text-2xl font-semibold mb-2">Cart Summary</h2>
                                            <p className="text-gray-700">Total Items: {products.cartItems ? products.cartItems.length : 0}</p>

                                            <p className="text-gray-700">Total Price: ${products.totalPrice}</p>
                                        </div>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-gray-200 px-6 py-4">

                            <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                            <div className="mt-6 flex justify-end">
                                <button
                                    href="#"
                                    className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                                    onClick={() => navigate('/checkout', { state: products.cartItems })}
                                >
                                    Checkout
                                </button>
                            </div>
                            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                                <p>
                                    or{' '}
                                    <button
                                        type="button"
                                        className="font-medium text-indigo-600 hover:text-indigo-500"
                                        onClick={() => navigate('/')}
                                    >
                                        Continue Shopping<span aria-hidden="true"> &rarr;</span>
                                    </button>
                                </p>
                            </div>
                        </div>
                        {isLoading && (
                            <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
                                <div className="animate-spin rounded-full h-16 w-16 border-t-8 border-indigo-600 border-opacity-75"></div>
                            </div>
                        )}
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
}