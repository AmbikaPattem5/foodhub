import { AuthContext } from "./AuthContext";
import { useState } from "react";
function ContextProvider({children}){
    
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