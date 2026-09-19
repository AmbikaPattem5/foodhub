import useCart from "../../CustomHooks/useCart";
import type { RestaurantMenu } from "../../types/Restaurant";
function MenuItem({ item }: RestaurantMenu) {
  const { handleAddItem,addItemsToCart} = useCart();

  return (
    <div >
      <div className="flex justify-between border border-gray-200 rounded-2xl shadow h-25 w-220 px-10 m-2">
        <div>
        <h4 className="text-[25px] lg:text-lg font-semibold">{item.name} </h4>
        <p className="text-gray-600">{item.description}</p>
        </div>
        <div className="flex flex-col gap-2">
        <span className="  " > ₹{item.price}</span>
        <button className="border border-gray-200 rounded-2xl shadow-lg bg-red-600 text-white h-10 w-15 cursor-pointer" onClick={() => handleAddItem(item)}> + Add</button>
        </div>
      </div>
    </div>
  );
}

export default MenuItem;
