import { AuthContext } from "./AuthContext";
import { useState } from "react";
import type { ChildrenProp } from "../types/Types";
function ContextProvider({children} : ChildrenProp){
    
const [user,setUser]=useState<string|null>(null);


function login(userName:string){
    setUser(userName);
}
function logout(){
    setUser(null)
}
return(
   <AuthContext.Provider value={{user,login,logout}}>
    {children}
   </AuthContext.Provider>
)
}
export default ContextProvider