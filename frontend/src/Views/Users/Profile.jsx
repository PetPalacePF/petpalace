// Profile.js
import { useState } from 'react';
import { UserForm } from '../../components/Users/UserForm';
import { UserSideBar } from '../../components/Users/UserSideBar';
import { Mypurchases } from '../../components/Users/Mypurchases';
import { Routes, Route } from "react-router-dom"

export const Profile = () => {
    const [selectedLink, setSelectedLink] = useState('/profile/personalInfo');

    const handleLinkClick = (link) => {
        setSelectedLink(link);
    };

    return (
        <div className="flex">
            <UserSideBar selectedLink={selectedLink} handleLinkClick={handleLinkClick} />

            <div className="w-full">

                <Routes>
                    <Route path="/personalInfo" element={<UserForm />}></Route>
                    <Route path="/purchases" element={<Mypurchases />}></Route>
                </Routes>
            </div>
        </div>
    );
};
