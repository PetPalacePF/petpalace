import { Link } from 'react-router-dom';

export const UserSideBar = ({ selectedLink, handleLinkClick }) => {
    return (
        <aside className="w-48 bg-gray-800 p-4 mt-12">
            <div className="text-white mb-4">
                <h2 className="text-lg font-semibold mb-2">PROFILE</h2>
                <ul>
                    <li className="mb-2">
                        <Link
                            to="/profile/personalInfo"
                            className={`block py-2 px-4 rounded hover:bg-gray-700 ${selectedLink === '/profile/personalInfo' ? 'bg-gray-700' : ''}`}
                            onClick={() => handleLinkClick('/profile/personalInfo')}
                        >
                            Personal information
                        </Link>
                    </li>
                    <li className="mb-2">
                        <Link
                            to="/profile/purchases"
                            className={`block py-2 px-4 rounded hover:bg-gray-700 ${selectedLink === '/profile/purchases' ? 'bg-gray-700' : ''}`}
                            onClick={() => handleLinkClick('/profile/purchases')}
                        >
                            My Purchases
                        </Link>
                    </li>
                </ul>
            </div>
        </aside>
    );
};
