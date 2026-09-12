export type Restaurant = {
  restaurantName: string;
  restaurantImage: string;
  id: number;
  rating: number;
  cuisine: Array<string>;
  deliveryTime: number;
  priceForTwo: string;
};
export type RestaurantMenu = {
    id: number;
    restaurantId: number;
    name: string;
    description: string;
    price: number;
    category: string;
    isVeg: boolean;
};
