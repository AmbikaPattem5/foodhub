import { useContext } from "react";
import { CouponContext } from "../Context/Coupen/CoupenContext";

function useCoupen(){
    const Coupen= useContext(CouponContext);
    if(Coupen === null){
        throw new Error("useCoupen must be used in context Provider")

    }
    return Coupen;
}
export default useCoupen;