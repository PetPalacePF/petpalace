import { useState } from 'react';
import { Link } from 'react-router-dom';

export const UserSideBar = () => {
    const [selectedLink, setSelectedLink] = useState('/profile');

    return (
        <aside className="w-48 bg-gray-800 p-4 mt-12">
            <div className="text-white mb-4">
                <h2 className="text-lg font-semibold mb-2">PROFILE</h2>
                <ul>
                    <li className="mb-2">
                        <Link
                            to="/profile"
                            className={`block py-2 px-4 rounded hover:bg-gray-700 ${selectedLink === '/profile' ? 'bg-gray-700' : ''}`}
                            onClick={() => setSelectedLink('/profile')}
                        >
                            Personal information
                        </Link>
                    </li>
                    <li className="mb-2">
                        <Link
                            to="/purchases"
                            className={`block py-2 px-4 rounded hover:bg-gray-700 ${selectedLink === '/purchases' ? 'bg-gray-700' : ''}`}
                            onClick={() => setSelectedLink('/purchases')}
                        >
                            My Purchases
                        </Link>
                    </li>
                </ul>
            </div>
        </aside>
    )
}
