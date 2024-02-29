import { Fragment, useEffect, useState } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { Bars3Icon, MagnifyingGlassIcon, ShoppingBagIcon } from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom'
import AuthModel from '../../auth/AuthModel'
import { useDispatch, useSelector } from 'react-redux'
import { removeToken } from '../Store/Jwtslice'
import AxiosInstance from '../../AxiosModel'
import toast, { Toaster } from 'react-hot-toast'
import HomeIcon from '@mui/icons-material/Home';
import { setSearch } from '../Store/SearchSlice'
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function NavigationBar() {
    const dispatch = useDispatch()
    const [isSigned, setIsSigned] = useState(false)
    const [authModel, setAuthModel] = useState(true)
    const navigate = useNavigate();
    const jwtToken = useSelector((state) => state.jwtToken)
    const user = useSelector((state) => state.jwtToken.userEmail)
    const Axios = AxiosInstance(jwtToken)
    const products = useSelector((state) => state.products)
    const [searchText, setSearchText] = useState("")

    function handleSignOut() {
        toast.custom((t) => (
            <div
                className={`${t.visible ? 'animate-enter' : 'animate-leave'
                    } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
            >
                <div className="flex-1 w-0">
                    <p className="mt-2 mb-1 text-lg p-2 pl-3 pr-5">
                        Signing Out?
                    </p>
                </div>
                <div className="flex border-l border-gray-200">
                    <button
                        onClick={() => {
                            dispatch(removeToken())
                            setIsSigned(false)
                            toast.dismiss(t.id)
                        }}
                        className="w-full border border-transparent rounded-none rounded-r-lg p-2 flex items-center justify-center font-large text-green-600 hover:text-green-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        Yes
                    </button>
                    <button
                        onClick={() => toast.dismiss(t.id)}
                        className="w-full border border-transparent rounded-none rounded-r-lg p-2 flex items-center justify-center font-large text-red-600 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        No
                    </button>
                </div>
            </div>


        ))

    }

    useEffect(() => {
        function getReduxToken() {
            console.log('Productssss', products)
            if (jwtToken.jwtToken) {
                toast.success("Signed In!")
                setIsSigned(true)
                setAuthModel(false)
            }
            console.log(products)
        }
        getReduxToken();
    }, [jwtToken])

    function toggleSignIn(val) {
        setAuthModel(val)
    }

    function handleSearch() {
        try {
            dispatch(setSearch(searchText))
        } catch (error) {
            alert(error.message)
        }
    }

    return (
        <div className="bg-indigo-600 z-20">
            <header className="relative bg-indigo font-medium uppercase text-white uppercase">
                <div className="flex h-16 items-center transition-transform ">
                    <HomeIcon className='ml-3 hover:scale-[110%]' onClick={() => navigate('/')} />
                    <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
                        <div className="flex h-full space-x-8 ">

                            {Object.entries(products).map(([mainCategory, subCategories]) => (
                                <Popover key={mainCategory + "hello"} className="flex">
                                    {({ open }) => (
                                        <>
                                            <div className="relative flex uppercase">
                                                <Popover.Button
                                                    className={classNames(
                                                        open
                                                            ? 'border-indigo-600 uppercase text-white-600 hover:scale-110 transition-transform'
                                                            : 'border-transparent uppercase text-white-700 hover:uppercase text-white-800 hover:scale-110 transition-transform',
                                                        'relative z-10 -mb-px flex items-center border-b-2 pt-px uppercase text-sm font-medium transition-colors duration-200 ease-out'
                                                    )}
                                                >
                                                    {mainCategory}
                                                </Popover.Button>
                                            </div>

                                            <Transition
                                                as={Fragment}
                                                enter="transition ease-out duration-200"
                                                enterFrom="opacity-0"
                                                enterTo="opacity-100"
                                                leave="transition ease-in duration-150"
                                                leaveFrom="opacity-100"
                                                leaveTo="opacity-0"
                                            >
                                                <Popover.Panel className="absolute inset-x-0 top-full uppercase text-sm uppercase text-gray-500">
                                                    {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                                                    <div className="absolute inset-0 top-1/2 bg-white shadow" aria-hidden="true" />

                                                    <div className="relative bg-white">
                                                        <div className="mx-auto max-w-7xl px-8">
                                                            <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-16">
                                                                <div className="row-start-1 grid grid-cols-3 gap-x-8 gap-y-10 uppercase text-sm">
                                                                    {Object.entries(subCategories).map(([mainSubCategory, nestedCategories]) => (
                                                                        <div key={mainSubCategory}>
                                                                            <p id={`${mainSubCategory}-heading`} className="font-medium uppercase text-gray-900">
                                                                                {mainSubCategory}
                                                                            </p>
                                                                            <ul
                                                                                role="list"
                                                                                aria-labelledby={`${mainSubCategory}-heading`}
                                                                                className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                                                            >
                                                                                {Object.entries(nestedCategories).map(([nestedCategory, products]) => (
                                                                                    <li key={nestedCategory} className="flex" onClick={() => {
                                                                                        navigate(`/allProducts/${mainCategory}/${mainSubCategory}/${nestedCategory}`, { state: products })
                                                                                    }}>
                                                                                        {nestedCategory}
                                                                                    </li>
                                                                                ))}
                                                                            </ul>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Popover.Panel>
                                            </Transition>
                                        </>
                                    )}
                                </Popover>
                            ))}
                        </div>
                    </Popover.Group>

                    <input
                        value={searchText}
                        onChange={(eve) => setSearchText(eve.target.value)}
                        type="text"
                        className="border border-gray-300 ml-[10%] w-[30%] pl-5 mr-10 py-1 rounded focus:outline-none focus:border-indigo-500 text-gray-600"
                        placeholder="products.."
                    />

                    <button
                        type='submit'
                        href="#"
                        className="bg-white hover:scale-105 transition-transform text-indigo-600 border text-l border-indigo-600 rounded ml-[-15] px-2 pb-[3px]"
                        onClick={handleSearch}
                    >
                        search
                    </button>
                    <div className="ml-auto flex items-center">
                        <div className="lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                            <div className="auth">
                                {isSigned ? <span href="#" className="-m-2 block p-2 font-medium uppercase text-gray-900" >
                                    <span className="user" style={{ color: "white", background: "rgb(79, 70, 229)", padding: '14px', borderRadius: '5px' }}>{user}</span>
                                    <button
                                        onClick={() => handleSignOut()}
                                        type="button"
                                        className="relative m-4 inline-flex items-center justify-center rounded-md p-2 uppercase text-gray-400 group-hover:text-gray-500"
                                    > Sign Out</button>
                                </span> : <span href="#" className="text-sm -m-2 block p-2 font-medium uppercase text-white-900 uppercase group-hover:text-gray-500 hover:scale-110  transition-transform cursor-pointer" onClick={() => setAuthModel(!authModel)}>
                                    Sign In / Sign Up
                                </span>}
                                {authModel ? <AuthModel toggleSignIn={toggleSignIn} /> : null}
                            </div>
                        </div>

                        {/* Cart */}
                        <div className="ml-4 flow-root lg:ml-6">
                            <a href="#" className="group -m-2 flex items-center p-2">
                                <ShoppingBagIcon
                                    className="h-6 w-6 flex-shrink-0  text-white-400 group-hover:scale-[110%] transition-transform"
                                    aria-hidden="false"
                                    onClick={() => navigate('/cart')}
                                />
                            </a>
                        </div>
                    </div>
                </div>
            </header>

        </div>
    )
} 
