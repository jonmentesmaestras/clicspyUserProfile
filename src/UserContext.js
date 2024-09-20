// UserContext.js
import React, { createContext, useState, useEffect } from 'react';
import RequestSvc from "./services/RequestSvc";
import { BASE_URL_API } from "./utils/Constants";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [imageVersion, setImageVersion] = useState(0);

  const fetchUserData = async () => {
    let svc = new RequestSvc();
    let result = await svc.get(`${BASE_URL_API}userProfile`).catch((err) => console.log(err));
    if (result?.error) {
      console.log("Failed to fetch user data");
    } else {
      setUser(result?.data);
      // Increment imageVersion whenever user data is fetched
      
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, fetchUserData, imageVersion, setImageVersion }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
