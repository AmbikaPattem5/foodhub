import { Navigate } from "react-router-dom";
import { useAuth } from "../CustomHooks/useAuth";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
function ProtectedRoutes(){
    const {user} =useAuth();
    const location = useLocation();
    if(!user){
       return (<Navigate to='/login' state={{from : location}} replace/>)
    }
    return <Outlet/>
}
export default ProtectedRoutes