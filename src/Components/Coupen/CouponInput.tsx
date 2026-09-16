import useCoupen from "../../CustomHooks/useCoupen";
import { useState } from "react";
import { DiscountType } from "../../types/Types";
function CouponInput() {
    const [input,setInput] = useState("")
    const {applyCoupon, appliedCoupen} = useCoupen()
    function handleCoupon(e ){
        setInput(e.target.value)
    }
    return(
        <div>
            <input type="text" name="coupon" value={input} onChange={handleCoupon}/>
            <button onClick={()=>applyCoupon(input)}>Apply</button>
            <div>
                {appliedCoupen &&
                <div>
                <p>Coupon applied :{appliedCoupen.code}</p>
                <p>You saved {appliedCoupen.discountType === DiscountType.FLAT? "Rs" + appliedCoupen.discountValue : appliedCoupen.discountValue +"%"}</p>
                </div>
                }
            </div>
        </div>
    )
}
export default CouponInput;