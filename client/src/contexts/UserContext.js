import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const currUser = JSON.parse(localStorage.getItem("user"));
    return currUser || null;
  });
  const [formIsVisible, setFormIsVisible] = useState(false);
  const [modalIsVisible, setModalIsVisble] = useState(false);

  const registerUser = async (e, data) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/register", data);
      setUser(res.data);
      localStorage.setItem("user", JSON.stringify(user));
    } catch (error) {
      console.log(error);
    }
  };

  const loginUser = async (e, data) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/login", data);
      setUser(res.data);
      localStorage.setItem("user", JSON.stringify(user));
    } catch (error) {
      console.log(error);
    }
  };

  const logoutUser = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  return (
    <UserContext.Provider
      value={{
        user,
        registerUser,
        loginUser,
        logoutUser,
        formIsVisible,
        setFormIsVisible,
        modalIsVisible,
        setModalIsVisble,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
