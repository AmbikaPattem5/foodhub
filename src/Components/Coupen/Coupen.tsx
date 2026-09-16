import type { Coupon } from "../../types/Types";
import useCoupen from "../../CustomHooks/useCoupen";
function Coupen({coupon}:Coupon){
    const {applyCoupon} =useCoupen();
    return(
        <div>
            <h5>{coupon.code}</h5>
            <p>Get discpunt :{coupon.discountValue}</p>
            <p>Minimum Order Amount : {coupon.minimumOrderAmount}</p>
            <button onClick={()=>applyCoupon(coupon.code)}>Apply</button>
        </div>
    )
}
export default Coupen;