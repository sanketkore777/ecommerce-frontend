import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon, MinusIcon, PlusIcon } from '@heroicons/react/20/solid'
import { mens_kurta } from '../../../Product data/Men/men_kurta'
import HomeSectionCard from '../HomeSectionCard/HomeSectionCard'
import { useLocation, useNavigate } from 'react-router-dom'

const sortOptions = [
  { name: 'Price: Low to High', href: '#', current: false },
  { name: 'Price: High to Low', href: '#', current: false },
]
const filters = [
  {
    id: 'color',
    name: 'Color',
    options: [
      { value: 'white', label: 'White', checked: false },
      { value: 'beige', label: 'Beige', checked: false },
      { value: 'blue', label: 'Blue', checked: false },
      { value: 'brown', label: 'Brown', checked: false },
      { value: 'green', label: 'Green', checked: false },
      { value: 'purple', label: 'Purple', checked: false },
    ],
  },
  {
    id: 'size',
    name: 'Size',
    options: [
      { value: 'S', label: 'Small', checked: false },
      { value: 'M', label: 'Medium', checked: false },
      { value: 'L', label: 'Largge', checked: false },
    ],
  },
]

const filtersRadio = [
  {
    id: 'price',
    name: 'price',
    options: [
      { value: '159-399', label: '$159-$399', checked: false },
      { value: '399-999', label: '$399-$999', checked: false },
      { value: '999-1999', label: '$999-$1999', checked: false },
      { value: '1999-2999', label: '$1999-$2999', checked: false },
      { value: '3999-4999', label: '$3999-$4999', checked: false }
    ],
  },
  {
    id: 'discount',
    name: 'discount range',
    options: [
      { value: '20', label: '20% and above', checked: false },
      { value: '30', label: '30% and above', checked: false },
      { value: '40', label: '40% and above', checked: false },
      { value: '50', label: '50% and above', checked: false },
      { value: '60', label: '60% and above', checked: false },
      { value: '70', label: '70% and above', checked: false },
      { value: '80', label: '80% and above', checked: false },
      { value: '90', label: '90% and above', checked: false },
    ],
  },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Products() {
  const location = useLocation()
  const navigate = useNavigate()

  const handleFilter = (value, sectionId) => {
    const searchParams = new URLSearchParams(location.search)
    let filterVal = searchParams.getAll(sectionId)
    if (filterVal.length > 0) {
      filterVal = filterVal[0].split(',')
      console.log(filterVal)
      if (filterVal.includes(value)) {
        filterVal = filterVal.filter((ele) => ele !== value)
      }
      else {
        filterVal.push(value)
      }
    }
    else {
      filterVal.push(value)
    }

    if (filterVal.length === 0) searchParams.delete(sectionId)
    else {
      searchParams.set(sectionId, filterVal.join(","))
    }

    const query = searchParams.toString()
    navigate({ search: `?${query}` })

  }
  function handleRadioFilter(value, sectionId) {
    let searchParams = new URLSearchParams(location.search)
    searchParams.set(sectionId, value)
    const query = searchParams.toString()
    navigate({ search: `?${query}` })
  }
  return (
    <div className="bg-white">
      <div>

        <main className="mx-auto  px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">New Arrivals</h1>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
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
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-40 bg-black origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
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

          <section aria-labelledby="products-heading" className="pb-24 pt-6">


            <div className="">
              <form className=" ">

                {filters.map((section) => (
                  <Disclosure as="div" key={section.id} className="border-b border-gray-200 py-6">
                    {({ open }) => (
                      <>
                        <h3 className="-my-3 flow-root">
                          <Disclosure.Button className="flex w-[200px] items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">{section.name}</span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusIcon className="h-5 w-5" aria-hidden="true" />
                              ) : (
                                <PlusIcon className="h-5 w-5" aria-hidden="true" />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                          <div className="space-y-5">
                            {section.options.map((option, optionIdx) => (
                              <div key={option.value} className="flex items-center">
                                <input
                                  onChange={() => handleFilter(option.value, section.id)}
                                  id={`filter-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  defaultValue={option.value}
                                  type="checkbox"
                                  defaultChecked={option.checked}
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
                {filtersRadio.map((section) => (
                  <Disclosure as="div" key={section.id} className="border-b border-gray-200 py-6">
                    {({ open }) => (
                      <>
                        <h3 className="-my-3 flow-root">
                          <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">{section.name}</span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusIcon className="h-5 w-5" aria-hidden="true" />
                              ) : (
                                <PlusIcon className="h-5 w-5" aria-hidden="true" />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                          <div className="space-y-5">
                            {section.options.map((option, optionIdx) => (
                              <div key={option.value} className="flex items-center">
                                <input
                                  onChange={() => handleRadioFilter(option.value, section.id)}
                                  id={`filter-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  defaultValue={option.value}
                                  type="radio"
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

              {/* Product grid */}
              <div className="lg:col-span-6">
                <div className="flex flex-wrap bg-white">
                  {mens_kurta.map((product_) => (
                    <div key={product_.id} className="p-5">
                      <HomeSectionCard product={product_} />
                    </div>
                  ))}
                </div>

              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
