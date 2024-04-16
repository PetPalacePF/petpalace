import { Link } from 'react-router-dom';

export const UserSideBar = ({ selectedLink, handleLinkClick }) => {
    return (
        <aside className="w-48 bg-violetamain p-4 mt-12 h-screen">
            <div className="text-white mb-4">
                <h2 className="text-lg font-semibold mb-2">PROFILE</h2>
                <ul>
                    <li className="mb-2">
                        <Link
                            to="/profile/personalInfo"
                            className={`block py-2 px-4 rounded hover:bg-blackprofileHover ${selectedLink === '/profile/personalInfo' ? 'bg-blackprofileHover' : ''}`}
                            onClick={() => handleLinkClick('/profile/personalInfo')}
                        >
                            Personal information
                        </Link>
                    </li>
                    <li className="mb-2">
                        <Link
                            to="/profile/purchases"
                            className={`block py-2 px-4 rounded hover:bg-blackprofileHover ${selectedLink === '/profile/purchases' ? 'bg-blackprofileHover' : ''}`}
                            onClick={() => handleLinkClick('/profile/purchases')}
                        >
                            My Orders
                        </Link>
                    </li>
                </ul>
            </div>
        </aside>
    );
};
