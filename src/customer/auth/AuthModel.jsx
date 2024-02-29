import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { setToken } from '../components/Store/Jwtslice';
import Axios from '../AxiosModel';
import toast, { Toaster } from 'react-hot-toast'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 520,
    bgcolor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: '10px',
    boxShadow: 890,
    p: 4,
};

const toastStyle = {
    borderRadius: '10px',
    background: '#333',
    color: '#fff',
}

export default function AuthModel({ toggleSignIn }) {
    const [open, setOpen] = React.useState(true);
    const [isRegistered, setIsRegistered] = React.useState(true)
    const dispatch = useDispatch()
    const jwt = useSelector((state) => state.jwtToken)
    const AXIOS = Axios(jwt)
    const handleRegister = async (eve) => {
        eve.preventDefault();

        try {
            const formData = new FormData(eve.currentTarget);
            let formObj = {};
            formData.forEach((value, key) => {
                formObj[key] = value;
            });
            console.log(formObj)
            // const response = await fetch('http://localhost:5050/auth/signup', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify(formObj),
            // });


            const responseData = await AXIOS.post('/auth/signup', formObj)
            console.log('res---', responseData.data)
            const isDone = dispatch(setToken([responseData.data.jwt, formObj.email]))
            toast.success("Sign Up")
            console.log('Response Data:', responseData);
        } catch (error) {
            toast.error("Email already exists!")
        }
    };


    const handleLogin = async (eve) => {
        eve.preventDefault()
        const formData = new FormData(eve.currentTarget)
        let formObj = {};
        formData.forEach((value, key) => {
            formObj[key] = value
        })
        console.log(formObj)
        // const response = await fetch('http://localhost:5050/auth/signin', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',

        //     },
        //     body: JSON.stringify(formObj)
        // });
        try {
            let response = await AXIOS.post('/auth/signin', formObj)
            console.log('data : ', response.data)
            const isDone = dispatch(setToken([response.data.token, formObj.email]))
        } catch (error) {
            toast.error("Login Failed!")
        }

    }

    return (
        <div style={{ position: 'relative' }}>

            <Modal
                open={open}
                onClose={() => {
                    toggleSignIn(false)
                    setOpen(!open)
                }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className='z-100'>  <Toaster
                        position='bottom-center'
                    /></div>
                    {isRegistered ?
                        <form action="" onSubmit={(eve) => { handleLogin(eve) }}>
                            <div className="login w-450 ">
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium leading-6 ">Email address</label>
                                    <div className="mt-2">
                                        <input id="email" name="email" type="email" autoComplete="email" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6 p-2" />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium leading-6">Password</label>
                                    <div className="mt-2">
                                        <input id="password" name="password" type="password" autoComplete="password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-500 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6 p-2" />
                                    </div>
                                </div>
                                <a className=' flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 mt-5 text-base font-medium text-white shadow-sm hover:bg-indigo-700' ><button type='submit'>Sign In</button></a>

                                <div className='mt-4 px-3'>
                                    <a >Don't have account?
                                        <button onClick={() => setIsRegistered(false)} type='submit'> Sign Up</button>
                                    </a>
                                </div>
                            </div>
                        </form> :
                        <form action="" onSubmit={(eve) => { handleRegister(eve) }}>
                            <div className="login">
                                <div>
                                    <div>
                                        <div className="flex items-center space-x-4">
                                            <div className="flex flex-col">
                                                <label htmlFor="email" className="block text-sm font-medium leading-6">First Name</label>
                                                <input type="text" id="firstName" name="firstName" className="rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6 p-2" />
                                            </div>

                                            <div className="flex flex-col">
                                                <label htmlFor="email" className="block text-sm font-medium leading-6">Last Name</label>
                                                <input type="text" id="lastName" name="lastName" className="rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6 p-2" />
                                            </div>
                                        </div>
                                    </div>
                                    <label htmlFor="email" className="block text-sm font-medium leading-6 mt-2.5">Email address</label>
                                    <div className="mt-2">
                                        <input id="email" name="email" type="email" autoComplete="email" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6 p-2" />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium leading-6">Password</label>
                                    <div className="mt-2">
                                        <input id="password" name="password" type="password" autoComplete="password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6 p-2" />
                                    </div>
                                </div>
                                <a className=' flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 mt-5 text-base font-medium text-white shadow-sm hover:bg-indigo-700' ><button type='submit'>Sign Up</button></a>

                                <div className='mt-4 px-3'>
                                    <a >Do have a account?
                                        <button onClick={() => setIsRegistered(true)} type='submit'> Sign In</button>
                                    </a>
                                </div>
                            </div>
                        </form>
                    }
                </Box>
            </Modal>
        </div>
    );
}