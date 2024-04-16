import { useState, useEffect } from 'react';
import getPurchasefilterUsers from '../../utils/getPurchases.js';

export const MyPurchases = () => {
    const [purchases, setPurchases] = useState([]);
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(0); // Valoración inicial
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

    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };

    const handleRatingClick = (value) => {
        setRating(value);
    };

    const handleSubmitReview = (purchaseId) => {
        // Aquí puedes enviar el comentario y la valoración a tu backend
        console.log("Purchase ID:", purchaseId);
        console.log("Comment:", comment);
        console.log("Rating:", rating);
        // Aquí puedes limpiar el input de comentario y reiniciar la valoración
        setComment('');
        setRating(0);
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
                                    <p>Order ID: {purchase.stripe_payment_id}</p>
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
                                    value={comment}
                                    onChange={handleCommentChange}
                                    className="border border-gray-300 rounded-md p-2 mr-2"
                                />
                                <div>
                                    {[1, 2, 3, 4, 5].map((value) => (
                                        <label
                                            key={value}
                                            className={`text-3xl cursor-pointer ${value <= rating ? 'text-yellow-500' : 'text-gray-300'} hover:text-yellow-500`}
                                            onClick={() => handleRatingClick(value)}
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
