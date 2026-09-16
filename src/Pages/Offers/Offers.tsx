import Coupen from "../../Components/Coupen/Coupen";
import { coupons } from "../../services/coupens";
import type { Coupon } from "../../types/Types";
import useCoupen from "../../CustomHooks/useCoupen";
function Offers(){
    
const updatedCoupons : Coupon[] = coupons.filter((coupon)=>(coupon.isActive === true))
    return(
        <div>
           {
            updatedCoupons.map((coupon : Coupon)=>(
                
                <Coupen key={coupon.id} coupon={coupon}/>
            ))
           }
        </div>
    )
}
export default Offers;