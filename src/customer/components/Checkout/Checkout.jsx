import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Form, useLocation, useNavigate } from 'react-router-dom';
import DeliveryAddForm from './DeliveryAddForm';
import "./styles.css"
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import AxiosInstance from '../../AxiosModel';
import toast, { Toaster } from 'react-hot-toast';

const steps = ['Login', 'Delivery Address', 'Confirm order', 'Done!'];
export default function Checkout() {
    const user = useSelector((state) => state.jwtToken.userEmail)
    const [activeStep, setActiveStep] = React.useState(1);
    const [addressData, setAddressData] = React.useState({})
    const jwtToken = useSelector((state) => state.jwtToken.jwtToken)
    const [isLoading, setIsLoading] = useState(false)
    const AXIOS = AxiosInstance(jwtToken)
    const [cart, setCart] = useState({})
    const navigate = useNavigate()
    const [change, setChange] = useState()
    const handleNext = () => {
        if (user) setActiveStep(activeStep + 1);
        if (activeStep === 2) {
            addressData.email ? setActiveStep(activeStep + 1) : setActiveStep(2)
            if (activeStep === 2) toast.error("Fill the address from!")
        }
        if (activeStep === 3) {

        }
    };

    const handleBack = () => {
        activeStep !== 1 ? setActiveStep(activeStep - 1) : setActiveStep(activeStep)
    };

    const handleReset = () => {
        setActiveStep(1);
    };

    useEffect(() => {
        if (user) {
            if (addressData.pincode) {
                setActiveStep(3)
            } else setActiveStep(2)
        }
    }, [])
    useEffect(() => {
        const fetch = async () => {
            try {
                setIsLoading(true)
                const res = await AXIOS.get('/api/cart/')
                console.log(res.data, "jijijiijjijiji")
                if (res.status === 200) {
                    setCart(res.data)
                    setIsLoading(false)
                }
            } catch (error) {
                console.log(error, 'errrrrrrrrror')
                navigate('/')
            }
        }
        fetch()
    }, [change])

    const handleSubmit = (eve) => {
        eve.preventDefault();
        const formData = new FormData(eve.target);
        let data = {}
        formData.forEach((value, key) => {
            data[key] = value
        });
        console.log(data)
        setAddressData(data)
        setActiveStep(activeStep + 1)
    };
    const handleRemoveCartItem = async (productId) => {
        try {
            navigate('/cart')
        }
        catch (error) {
            alert(error)
        }
    }

    const handlePlaceOrder = async () => {
        if (addressData) {
            const res = await AXIOS.post('api/order', { addressData })
            console.log(res.status)
        }
    }

    return (
        < div className='checkout-comp'>
            <Toaster position='top-center' />
            <Box sx={{ width: '100%' }}>
                <Stepper activeStep={activeStep - 1} >
                    {steps.map((label, index) => {
                        const stepProps = {};
                        const labelProps = {};


                        return (
                            <Step key={label} {...stepProps}>
                                <StepLabel {...labelProps}>{label}</StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>
                {activeStep > steps.length ? (
                    <React.Fragment>
                        <Typography sx={{ mt: 2, mb: 1 }}>
                            All steps completed - you&apos;re finished
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Box sx={{ flex: '1 1 auto' }} />
                            <Button onClick={handleReset}>Reset</Button>
                        </Box>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep}</Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            {
                                activeStep === 1 ? <Button
                                    color="inherit"
                                    disabled="true"
                                    onClick={handleBack}
                                    sx={{ mr: 1 }}
                                >
                                    Back
                                </Button> : <Button
                                    color="inherit"
                                    disabled={activeStep === 1}
                                    onClick={handleBack}
                                    sx={{ mr: 1 }}
                                    className='back-btn'
                                    style={{
                                        color: "white",
                                        backgroundColor: "#1976d2"
                                    }}
                                >
                                    Back
                                </Button>
                            }
                            <Box sx={{ flex: '1 1 auto' }} />

                            <Button onClick={handleNext} className='next-btn' style={{
                                color: "white",
                                backgroundColor: "#1976d2"
                            }}>
                                {activeStep === steps.length ? 'Finish' : 'Next'}
                            </Button>
                        </Box>
                    </React.Fragment>
                )}

            </Box>
            {activeStep === 2 ? <form className="sign-up-box" onSubmit={handleSubmit}>
                <div className="outer-box" >
                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail</p>

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                                <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                    First name
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="firstName"
                                        id="first-name"
                                        required
                                        autoComplete="given-name"
                                        className=" p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                                    Last name
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="lastName"
                                        required
                                        id="last-name"
                                        autoComplete="family-name"
                                        className=" p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-4">
                                <label htmlFor="number" className="block text-sm font-medium leading-6 text-gray-900">
                                    Phone No
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="number"
                                        name="mobile"
                                        type="number"
                                        required
                                        autoComplete="number"
                                        className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div className="col-span-full">
                                <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                                    Street address
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="streetAddress"
                                        id="street-address"
                                        required
                                        autoComplete="street-address"
                                        className="block p-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-2 sm:col-start-1">
                                <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                                    City
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="city"
                                        id="city"
                                        autoComplete="address-level2"
                                        required
                                        className="block p-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-2">
                                <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
                                    State / Province
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="state"
                                        id="region"
                                        required
                                        autoComplete="address-level1"
                                        className="block p-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-2">
                                <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                                    ZIP / Postal code
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="pincode"
                                        id="postal-code"
                                        required
                                        autoComplete="postal-code"
                                        className="block p-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>


                        </div>
                        {isLoading && (
                            <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
                                <div className="animate-spin rounded-full h-16 w-16 border-t-8 border-indigo-600 border-opacity-75"></div>
                            </div>
                        )}
                    </div>


                </div>

                <div className="flex item-center justify-center pt-7 h-full">
                    {/* Other content */}

                    <button
                        type='submit'
                        href="#"
                        className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 w-[25%] mt-4"
                    // onClick={() => navigate('/checkout', { state: products.cartItems })}
                    >
                        Submit
                    </button>
                </div>
            </form> : null}
            {activeStep === 3 ? <div className="flow-root pt-20 s">
                <ul role="list" className="-my-6 divide-y divide-gray-200">
                    <h1 className="text-3xl font-semibold mb-4">Your Cart</h1>
                    {cart?.cartItems?.map((cartItem) => (
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

                        </div>
                    ))}
                    <div className="flex item-center justify-between py-3 h-full">
                        {/* Other content */}
                        <button
                            type='submit'
                            href="#"
                            onClick={handlePlaceOrder}
                            className="flex items-center justify-center rounded-md border border-transparent px-6 py-3 text-base font-medium scale-[135%] text-indigo-600 hover:underline shadow-sm  w-[20] mt-4"

                        >
                            place order
                        </button>
                        <button
                            type='submit'
                            href="#"
                            className="flex items-center justify-center rounded-md border border-transparent px-6 py-3 text-base font-medium text-indigo-600 hover:underline shadow-sm  w-[20] mt-4"
                            onClick={() => navigate('/cart')}
                        >
                            Edit Cart
                        </button>
                    </div>
                    <div className="bg-gray-100 p-4 rounded">
                        <h2 className="text-2xl font-semibold mb-2">Cart Summary</h2>
                        <p className="text-gray-700">Total Items: {cart.cartItems ? cart.cartItems.length : 0}</p>

                        <p className="text-gray-700">Total Price: ${cart.totalPrice}</p>
                    </div>
                </ul>

            </div> : null}
        </div>
    );
}
