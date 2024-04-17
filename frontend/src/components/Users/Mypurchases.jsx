import { useState, useEffect } from 'react';
import getPurchasefilterUsers from '../../utils/getPurchases.js';
import axios from '../../config/axios.js';

export const MyPurchases = () => {
    const [purchases, setPurchases] = useState([]);
    const [comments, setComments] = useState({});
    const [ratings, setRatings] = useState({});
    const userInfo = JSON.parse(window.localStorage.getItem("userData"));
    const userId = userInfo ? userInfo.id : null;

    useEffect(() => {
        if (userId) {
            getPurchasefilterUsers({ userId }, setPurchases);
        }
    }, [userId]);

    const calculateTotalPrice = (products) => {
        return products.reduce((total, product) => {
            return total + (product.price * product.cantidad);
        }, 0);
    };

    const handleCommentChange = (purchaseId, event) => {
        const { value } = event.target;
        setComments({ ...comments, [purchaseId]: value });
    };

    const handleRatingClick = (purchaseId, value) => {
        setRatings({ ...ratings, [purchaseId]: value });
    };

    const handleSubmitReview = (purchaseId) => {
        // Aquí puedes enviar la revisión y el rating a tu backend
        console.log("Purchase ID:", purchaseId);
        console.log("Comment:", comments[purchaseId]);
        console.log("Rating:", ratings[purchaseId]);

        const productImages = purchases
            .find(purchase => purchase.id === purchaseId)
            .Orders.flatMap(order =>
                order.products.map(product => product.img)
            );

        // Aquí puedes enviar los datos al backend a través de Axios
        axios.post("/mail/review", {
            userEmail: userInfo.email,
            userName: userInfo.name,
            userReview: comments[purchaseId],
            userRating: ratings[purchaseId],
            productId: productImages
        })
            .then(response => {
                console.log(response.data);
                // Maneja la respuesta del backend si es necesario
            })
            .catch(error => {
                console.error('Error submitting review:', error);
                // Maneja el error si es necesario
            });
    };

    return (
        <div>
            {purchases.length === 0 ? (
                <div className="flex items-center justify-center h-screen">
                    <p className="text-gray-500 text-lg">No purchases found</p>
                </div>
            ) : (
                <ul className="divide-gray-200 mt-12  mx-auto">
                    {purchases.map((purchase) => (
                        <div className="flex items-center mt-10" key={purchase.id}>
                            <div className="items-center w-2/4">
                                <div className="text-gray-600 text-lg font-semibold">
                                    <p>Payment Status: <span className="text-green-600 capitalize">{purchase.stripe_payment_status}</span></p>
                                </div>
                                <div className="text-gray-600 text-small font-semibold mr-4">
                                    <p>Purchase ID: {purchase.stripe_payment_id}</p>
                                </div>
                            </div>

                            <ul className="flex overflow-hidden">
                                {purchase.Orders[0].products.slice(0, 4).map((product, index) => (
                                    <div className="relative" key={index}>
                                        <div className='truncate'>
                                            <div key={index} className="relative mr-4 ml-4">
                                                <img className="h-16 object-cover rounded w-30 h-30 mr-4 " src={product.img} alt={product.name} />
                                                <span className="absolute top-0 right-0 bg-black bg-opacity-50 text-white text-xs px-1 rounded">
                                                    X{product.cantidad}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {purchase.Orders[0].products.length > 4 && (
                                    <div className="relative mt-8  mr-5">
                                        <span className="text-gray-600 text-lg font-semibold">...</span>
                                    </div>
                                )}
                            </ul>
                            <p className="text-gray-600 text-lg font-semibold ml-30 mr-10">Total: ${calculateTotalPrice(purchase.Orders[0].products).toFixed(2)}</p>
                            <div className="mt-4 w-1/4">
                                <input
                                    type="text"
                                    placeholder="Leave your review!"
                                    value={comments[purchase.id] || ''}
                                    onChange={(event) => handleCommentChange(purchase.id, event)}
                                    className="border border-gray-300 rounded-md p-2 mr-2"
                                />
                                <div>
                                    {[1, 2, 3, 4, 5].map((value) => (
                                        <label
                                            key={value}
                                            className={`text-3xl cursor-pointer ${value <= ratings[purchase.id] ? 'text-yellow-500' : 'text-gray-300'} hover:text-yellow-500`}
                                            onClick={() => handleRatingClick(purchase.id, value)}
                                        >
                                            ★
                                        </label>
                                    ))}
                                </div>
                                <button onClick={() => handleSubmitReview(purchase.id)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">SUBMIT</button>
                            </div>
                        </div >
                    ))
                    }
                </ul >
            )}
        </div >
    );
};
