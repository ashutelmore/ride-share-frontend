import React, { useEffect, useState } from "react";
import { getUser } from "../App/Api";

export const AuthContext = React.createContext({});

export const AuthProvider = (props) => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const userStorage = localStorage.getItem("_id");

    async function fetchData() {
      // setLoading(true)
      const res = await getUser(userStorage);
      if (res.error) {
        setUser({})
        setLoading(false)

      } else if (res.payload) {
        setUser(res.payload)
        setLoading(false)
      }
    }
    if (userStorage) {
      fetchData();
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading, setLoading }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
