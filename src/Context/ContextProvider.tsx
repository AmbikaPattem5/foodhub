import { AuthContext } from "./AuthContext";
import { useState } from "react";
function ContextProvider({children}){
    
const [user,setUser]=useState<string>("");


function login(userName:{userName:string}){
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