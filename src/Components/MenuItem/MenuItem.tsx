import useCart from "../../CustomHooks/useCart";
import type { RestaurantMenu } from "../../types/Restaurant";
function MenuItem({ item }: RestaurantMenu) {
  const { handleAddItem,addItemsToCart} = useCart();

  return (
    <div>
      <p>
        {item.name} <span> ₹{item.price}</span>{" "}
        <button onClick={() => handleAddItem(item)}>Add</button>
      </p>
      <div>{item.description}</div>
    </div>
  );
}

export default MenuItem;
