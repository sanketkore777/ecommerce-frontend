import React, { useEffect } from 'react';
import './styles.css';
import { useNavigate } from 'react-router-dom';

const HomeSectionCard = ({ product }) => {
    const navigate = useNavigate();
    useEffect(() => {
    })
    return (
        <div className="p-4 h-auto HomeSectionCard" style={{ borderRadius: "5px", cursor: "pointer", margin: "1px" }} onClick={() => { navigate(`/products`, { state: product }) }}>
            <div className="relative overflow-hidden bg-white" style={{ borderRadius: "5px", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}>
                <img
                    src={product.imageUrl}
                    alt={product.title}
                    className="w-full object-cover h-48"
                />
            </div>

            <div className="mt-4">
                <label className="text-base font-medium text-gray-900">
                    <a href={product.href} className="hover:underline">{product.title}</a>
                </label>
                <p className="mt-1 text-sm text-gray-500">{product.color}</p>
            </div>

            <div className="flex justify-between items-center mt-2">
                <div>
                    <p className="text-base font-medium text-green-600">${product.discountedPrice}</p>



                </div>
                <p className="text-sm text-gray-500 line-through">${product.price}</p>

            </div>
        </div>
    );
};

export default HomeSectionCard;
