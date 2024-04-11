import { useState, useEffect } from 'react';
import getPurchasefilterUsers from '../../utils/getPurchases.js';

export const Mypurchases = () => {
    const [purchases, setPurchases] = useState([]);
    const userInfo = JSON.parse(window.localStorage.getItem("userData"));
    const userId = userInfo ? userInfo.id : null;

    useEffect(() => {
        getPurchasefilterUsers({ userId }, setPurchases);
    }, [userId]);


    return (
        <>
            {purchases.length === 0 && (
                <div className="flex justify-center items-center h-64">
                    <p className="text-gray-500 text-lg">No purchases found</p>
                </div>
            )}
            {purchases.length > 0 && (
                <ul className="divide-y divide-gray-200 mt-10">
                    {purchases.map((purchase, index) => (
                        <div className="p-4" key={index}>
                            <p className="font-semibold">Purchase ID: {purchase.id}</p>
                            <p className="text-gray-600">Stripe Payment ID: {purchase.stripe_payment_id}</p>
                        </div>
                    ))}
                </ul>

            )}
        </>
    );
};
