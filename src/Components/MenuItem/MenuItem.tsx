import useCart from "../../CustomHooks/useCart";
import type { RestaurantMenu } from "../../types/Restaurant";
function MenuItem({ item }: RestaurantMenu) {
  const { handleAddItem,isItemExist,incrementCartItem,decrementCartItem} = useCart();
  const itemAdded = isItemExist(item);

  return (
    <div >
      <div className="flex justify-between border border-gray-200 rounded-2xl shadow h-25 w-220 px-10 m-2">
        <div>
        <h4 className="text-[25px] lg:text-lg font-semibold">{item.name} </h4>
        <p className="text-gray-600">{item.description}</p>
        </div>
        <div className="flex flex-col gap-2">
        <span className="  " > ₹{item.price}</span>
        {!itemAdded?
        <button className="border border-gray-200 rounded-2xl shadow-lg bg-red-600 text-white h-10 w-15 cursor-pointer" onClick={() => handleAddItem(item)}> + Add</button>
        : <div>
          <button onClick={()=>decrementCartItem(item.id)} className="border border-gray-200 rounded-2xl shadow-lg bg-red-600 text-white h-8 w-12 cursor-pointer">-  </button>
          <span className="px-2">{itemAdded.quantity}</span>
          <button onClick={()=>incrementCartItem(item.id)} className="border border-gray-200 rounded-2xl shadow-lg bg-red-600 text-white h-8 w-12 cursor-pointer"> +</button>
        </div>
}</div>
      </div>
    </div>
  );
}

export default MenuItem;
