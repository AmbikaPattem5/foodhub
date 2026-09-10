import Header from "../Header/Header";
import { Outlet } from "react-router-dom";
function MainLayout(){
    return(
        <div>
            <Header/>
        </div>
    )
}
export default MainLayout;