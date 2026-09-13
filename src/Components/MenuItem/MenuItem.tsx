import type { RestaurantMenu } from "../../types/Restaurant";
import useCart from "../../CustomHooks/useCart";
function MenuItem({ item }: RestaurantMenu) {
  const { handleAddItem, increamentCartItem, decreamentCartItem } = useCart();

  return (
    <div>
      <p>
        {item.name} <span> ₹{item.price}</span>{" "}
        <button onClick={() => handleAddItem(item)}>Add</button>
      </p>
      <div>
        <button onClick={() => increamentCartItem(item.id)}> + </button>
        <button onClick={() => decreamentCartItem(item.id)}>-</button>
        {<span>{item.quantity}</span>}{" "}
      </div>
      <div>{item.description}</div>
    </div>
  );
}

export default MenuItem;
