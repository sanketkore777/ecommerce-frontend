import { Fragment, useEffect, useState } from 'react'
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import HomeSectionCard from '../HomeSectionCard/HomeSectionCard'
import AxiosInstance from '../../AxiosModel'
import { Category } from '@mui/icons-material'
const sortOptions = [
    { name: 'Price: Low to High', href: '#', current: false, value: 'price_height' },
    { name: 'Price: High to Low', href: '#', current: false, value: 'price_width' },
]
const filters = [
    {
        id: 'color',
        name: 'Color',
        type: 'checkbox',
        options: [
            { value: 'white', label: 'White', checked: false },
            { value: 'beige', label: 'Beige', checked: false },
            { value: 'blue', label: 'Blue', checked: false },
            { value: 'brown', label: 'Brown', checked: false },
            { value: 'green', label: 'Green', checked: false },
            { value: 'purple', label: 'Purple', checked: false },
            { value: 'black', label: 'Black', checked: false },
        ],
    },
    {
        id: 'size',
        name: 'Size',
        type: 'checkbox',
        options: [
            { value: 'S', label: 'Smallsssss', checked: false },
            { value: 'M', label: 'Medium', checked: false },
            { value: 'L', label: 'Largge', checked: false },
        ],
    },
    {
        id: 'price',
        name: 'price',
        type: 'radio',
        options: [
            { value: '159-399', label: '$159-$399', checked: false },
            { value: '399-999', label: '$399-$999', checked: false },
            { value: '999-1999', label: '$999-$1999', checked: false },
            { value: '1999-2999', label: '$1999-$2999', checked: false },
            { value: '3999-4999', label: '$3999-$4999', checked: false }
        ],
    }
]


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Example() {
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
    const location = useLocation()
    const navigate = useNavigate()
    const [products, setProducts] = useState(location.state || []);
    const AXIOS = AxiosInstance()
    const { lavelOne, lavelTwo, lavelThree } = useParams()
    const [pageNo, setPageNo] = useState(1)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            if (window.location.search) {
                window.location.replace(window.location.origin + window.location.pathname);
            }
            console.log(lavelOne, lavelTwo, lavelThree, "]]]]]]]]]]]");
            let category = { lavelOne, lavelTwo, lavelThree }
            setIsLoading(true)
            try {
                const response = await AXIOS.get(`/api/products`, {
                    params: { category, pageNo }
                });
                setIsLoading(false)
                // Handle the response data as needed
                console.log('Response:', response.data.content);
                setProducts(response.data.content)
            } catch (error) {
                // Handle errors
                console.error('Error fetching data:', error);
            }
        };

        fetchData(); // Call the function immediately

    }, [lavelOne, lavelTwo, lavelThree, pageNo]);


    const handleFilter = async (sectionId, value, type) => {
        if (type === 'radio') {
            const searchParams = new URLSearchParams(location.search)
            searchParams.set(sectionId, value)
            let query = searchParams.toString()
            navigate({ search: `?${query}` })
            let category = { lavelOne, lavelTwo, lavelThree }
            const color = searchParams.get('color') ? searchParams.get('color').split(',') : null
            let minPrice = searchParams.get('price') ? searchParams.get('price').split('-') : null
            let maxPrice = minPrice ? minPrice[1] : null
            minPrice = minPrice ? minPrice[0] : null

            try {
                setIsLoading(true)
                console.log(minPrice, "--", maxPrice)
                let res = await AXIOS.get(`/api/products`, {
                    params: { category, minPrice, maxPrice, color, pageNo }
                });
                setIsLoading(false)
                console.log('handle Filter', res.data.content.data);
                setProducts(res.data.content);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        } else {
            const searchParams = new URLSearchParams(location.search)
            let filterVal = searchParams.getAll(sectionId);
            if (filterVal.length > 0) {
                filterVal = filterVal[0].split(',')
                if (filterVal.includes(value)) {
                    filterVal = filterVal.filter((ele) => ele !== value)
                } else {
                    filterVal.push(value)
                }
            } else {
                filterVal.push(value)
            }
            if (filterVal.length > 0) {
                searchParams.set(sectionId, filterVal);
            } else {
                searchParams.delete(sectionId)
            }

            let query = searchParams.toString()
            navigate({ search: `?${query}` })
            // { category, color, sizes, minPrice, maxPrice, minDiscount, sort, stock, pageNumber, pageSize }
            let category = { lavelOne, lavelTwo, lavelThree }
            const color = searchParams.get('color') ? searchParams.get('color').split(',') : null
            let minPrice = searchParams.get('price') ? searchParams.get('price').split('-') : null
            let maxPrice = minPrice ? minPrice[1] : null
            minPrice = minPrice ? minPrice[0] : null
            try {
                console.log(minPrice, "--", maxPrice)
                setIsLoading(true)
                let res = await AXIOS.get(`/api/products`, {
                    params: { category, minPrice, maxPrice, color, pageNo }
                });
                setIsLoading(false)
                console.log('handle Filter', res.data.content);
                setProducts(res.data.content);
            } catch (error) {
                console.error('Error fetching data:', error);
            }

        }
    }
    return (
        <div className="bg-white">
            <div>
                <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex items-baseline justify-between border-b border-gray-200 pl-5 pr-10">
                        <div className="flex items-center">
                            <Menu as="div" className="relative inline-block text-left">
                                <div>
                                    <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900 p-[8px]">
                                        Sort
                                        <ChevronDownIcon
                                            className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                            aria-hidden="true"
                                        />
                                    </Menu.Button>
                                </div>

                                <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                >
                                    <Menu.Items className="absolute left-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <div className="py-1">
                                            {sortOptions.map((option) => (
                                                <Menu.Item key={option.name}>
                                                    {({ active }) => (
                                                        <a
                                                            href={option.href}
                                                            className={classNames(
                                                                option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                                                                active ? 'bg-gray-100' : '',
                                                                'block px-4 py-2 text-sm'
                                                            )}
                                                        >
                                                            {option.name}
                                                        </a>
                                                    )}
                                                </Menu.Item>
                                            ))}
                                        </div>
                                    </Menu.Items>
                                </Transition>
                            </Menu>

                        </div>
                    </div>

                    <section aria-labelledby="products-heading" className="pb-24 pt-6 grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
                        {/* Filters */}
                        <form className="hidden lg:block ">
                            {filters.map((section) => (
                                <Disclosure as="div" key={section.id} className="border-b border-gray-200 py-6">
                                    {({ open }) => (
                                        <>
                                            <h3 className="-my-3 flow-root">
                                                <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                                                    <span className="font-medium text-gray-900">{section.name}</span>
                                                    <span className="ml-6 flex items-center">
                                                        {open ? (
                                                            <MinusIcon className="h-5 w-5" aria-hidden="true" onClick={() => {
                                                                let searchParams = new URLSearchParams(location.search)
                                                                searchParams.delete(section.name.toLocaleLowerCase())
                                                                let query = searchParams.toString()
                                                                navigate({ search: `?${query}` })
                                                            }} />
                                                        ) : (
                                                            <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                                        )}
                                                    </span>
                                                </Disclosure.Button>
                                            </h3>
                                            <Disclosure.Panel className="pt-6">
                                                <div className="space-y-4">
                                                    {section.options.map((option, optionIdx) => (
                                                        <div key={option.value} className="flex items-center float">
                                                            <input
                                                                id={`filter-${section.id}-${optionIdx}`}
                                                                name={`${section.id}[]`}
                                                                defaultValue={option.value}
                                                                type={section.type}
                                                                defaultChecked={option.checked}
                                                                onChange={() => handleFilter(section.id, option.value, section.type)}
                                                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                            />
                                                            <label
                                                                htmlFor={`filter-${section.id}-${optionIdx}`}
                                                                className="ml-3 text-sm text-gray-600"
                                                            >
                                                                {option.label}
                                                            </label>
                                                        </div>
                                                    ))}
                                                </div>
                                            </Disclosure.Panel>
                                        </>
                                    )}
                                </Disclosure>
                            ))}
                        </form>


                        {Array.isArray(products) ? products.length > 0 ? products.map((product_) => (
                            <div key={product_.id} className="w-full  p-0">
                                {/* Adjust max-w-xs to set the maximum width of each card */}
                                <HomeSectionCard product={product_} />
                            </div>
                        )) : <span className="text-lg text-gray-500 font-semibold align-center w-full">
                            No products found / You may have reached End.
                        </span> : null}
                    </section>
                </main>
                <div class="flex items-center justify-around pb-10">
                    <button class="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded-l" onClick={() => {
                        if (pageNo !== 0) setPageNo(pageNo - 1)
                    }}>
                        Prev Page
                    </button>
                    <span class="text-gray-800 font-bold py-2 px-4">
                        Page {pageNo}
                        {isLoading && (
                            <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
                                <div className="animate-spin rounded-full h-16 w-16 border-t-8 border-indigo-600 border-opacity-75"></div>
                            </div>
                        )}
                    </span>
                    <button class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r" onClick={() => setPageNo(pageNo + 1)}>
                        Next Page
                    </button>
                </div>


            </div>
        </div>
    )
}