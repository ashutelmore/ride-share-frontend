import React, { useEffect, useState } from "react";
import { getUser } from "../App/Api";

export const ProfileContext = React.createContext({});

export const ProfileProvider = (props) => {
    const [userDetails, setUserDetails] = useState({

    });

    useEffect(() => {
        const userStorage = localStorage.getItem("_id");

        async function fetchData() {
            const res = await getUser(userStorage);
            if (res.data.error) {
                setUserDetails({})
            } else if (res.data.payload) {
                setUserDetails(res.data.payload)
            }
        }
        if (userStorage) {
            //   fetchData();
        }
    }, []);

    return (
        <ProfileContext.Provider value={{ userDetails, setUserDetails }}>
            {props.children}
        </ProfileContext.Provider>
    );
};

export const useAuth = () => React.useContext(ProfileContext);
