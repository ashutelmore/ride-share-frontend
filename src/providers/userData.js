import React, { useEffect, useState } from "react";
import { getUser } from "../App/Api";

export const UserDataContext = React.createContext({});

export const UserDataProvider = (props) => {
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
        <UserDataContext.Provider value={{ userDetails, setUserDetails }}>
            {props.children}
        </UserDataContext.Provider>
    );
};

export const useUserData = () => React.useContext(UserDataContext);
