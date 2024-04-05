import { UserForm } from '../../components/Users/UserForm';
import { UserSideBar } from '../../components/Users/UserSideBar';
import { Mypurchases } from '../../components/Users/Mypurchases';

export const Profile = () => {
    return (
        <div className="flex">
            <UserSideBar />
            <Mypurchases />
            <UserForm />
        </div>
    );
};
