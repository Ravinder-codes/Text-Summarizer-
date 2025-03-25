import { createContext, useState } from "react";
export const UserContext = createContext();
export const UserProvider = ({ children }) => {
  const [user, setuser] = useState(false);
  const [allquery, setallquery] = useState([])
  const [userid, setuserid] = useState(null)

  return (
    <UserContext.Provider value={{ user, setuser,allquery,setallquery ,userid,setuserid}}>
      {children}
    </UserContext.Provider>
  );
};
