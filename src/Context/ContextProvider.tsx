import { AuthContext } from "./AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function ContextProvider({children}){
    const response=localStorage.getItem("users");
    const navigate=useNavigate();
const [user,setUser]=useState("");


function login(userName){
    setUser(userName);
}
function logout(){
    setUser("")
}
return(
   <AuthContext.Provider value={{user,login,logout}}>
    {children}
   </AuthContext.Provider>
)
}
export default ContextProvider