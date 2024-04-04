import { useAuth0 } from "@auth0/auth0-react";

export const Profile = () => {
    const { user, isAuthenticated } = useAuth0();

    return (
        <form>
            <h1>Profile</h1>
            {isAuthenticated && user && (
                <>
                    <img src={user.picture} alt={user.name} />
                    <input value={user.email} />
                    <input value={user.name} />
                    <input value={user} />
                    <input value={user} />
                    <input value={user} />
                    <input value={user} />
                    <input value={user} />

                </>
            )}
            <button>SUBMIT</button>
        </form>
    );
};
