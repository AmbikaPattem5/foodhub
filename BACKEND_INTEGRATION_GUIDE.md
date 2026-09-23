# 📖 FoodHub Frontend to Backend Integration Guide (Axios Edition)

Welcome! This guide is created specifically for you. As a frontend developer integrating this backend for the first time, this document explains **step-by-step** how to use **Axios** to connect every single page in your FoodHub project to the Node.js Express backend.

---

## 📑 Table of Contents
1. [Backend Setup & Running](#1-backend-setup--running)
2. [Step 1: Install Axios & Create API Client](#2-step-1-install-axios--create-api-client)
3. [Axios General Pattern & Error Handling](#3-axios-general-pattern--error-handling)
4. [Page-by-Page API Integration Map (with Axios)](#4-page-by-page-api-integration-map)
   - [Page 1: Restaurants (`src/Pages/Restaurants/Restaurants.tsx`)](#page-1-restaurants)
   - [Page 2: Home (`src/Pages/Home/Home.tsx`)](#page-2-home)
   - [Page 3: Restaurant Details (`src/Components/RestaurantDetails.tsx`)](#page-3-restaurant-details)
   - [Page 4: Offers / Coupons (`src/Pages/Offers/Offers.tsx`)](#page-4-offers--coupons)
   - [Page 5: Coupon Input & Context (`src/Context/Coupen/CoupenProvider.tsx`)](#page-5-coupon-input--context)
   - [Page 6: Checkout / Place Order (`src/Pages/CheckOut/CheckOut.tsx`)](#page-6-checkout--place-order)
   - [Page 7: Order History (`src/Pages/Orders/Orders.tsx`)](#page-7-order-history)
   - [Page 8: Order Details & Status Tracking (`src/Pages/OrderDetails/OrderDetails.tsx`)](#page-8-order-details--status-tracking)
   - [Page 9: Favorites (`src/Context/Favourites/FavoriteProvider.tsx`)](#page-9-favorites)
   - [Page 10: User Registration (`src/Pages/Register/Register.tsx`)](#page-10-user-registration)
   - [Page 11: User Login (`src/Pages/Login/Login.tsx`)](#page-11-user-login)
   - [Page 12: Forgot Password (`src/Pages/ForgotPassword/ForgotPassword.tsx`)](#page-12-forgot-password)
5. [Summary Checklist](#5-summary-checklist)

---

## 1. Backend Setup & Running

Your backend lives in the `backend/` folder.

### Step 1: Open a terminal for the backend
```bash
cd backend
npm run dev
```
> The server will start on **`http://localhost:5000`**.  
> The backend automatically saves data to `backend/data/database.json`.

### Step 2: Keep your frontend running in another terminal
```bash
npm run dev
```
> Your React frontend runs on **`http://localhost:5173`**.

---

## 2. Step 1: Install Axios & Create API Client

### 1. Install Axios in your frontend
In your project root terminal (where your `src/` is):
```bash
npm install axios
```

### 2. Create an Axios Instance (`src/services/api.ts`)
Instead of typing `"http://localhost:5000/api"` in every single file, create a centralized file `src/services/api.ts`:

```typescript
// src/services/api.ts
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 seconds timeout
});

export default api;
```

> **Why this is awesome:**  
> Now in ANY component, you just write `api.get("/restaurants")` or `api.post("/orders", data)`. Axios automatically:
> 1. Adds `http://localhost:5000/api` to the front.
> 2. Parses the JSON response automatically into `response.data` (no need for `await res.json()`).
> 3. Stringifies request bodies for you automatically.

---

## 3. Axios General Pattern & Error Handling

### Basic GET Request:
```typescript
import { useState, useEffect } from "react";
import api from "../../services/api";

function MyComponent() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const response = await api.get("/restaurants");
        setData(response.data.restaurants);
      } catch (err: any) {
        // Axios error message from backend
        setError(err.response?.data?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return <div>{/* Render data */}</div>;
}
```

### Basic POST Request:
```typescript
try {
  const response = await api.post("/auth/login", {
    name: "user@example.com",
    password: "secretPassword",
  });
  console.log(response.data); // result from server
} catch (err: any) {
  console.error(err.response?.data?.message || "Failed to log in");
}
```

---

## 4. Page-by-Page API Integration Map

---

### Page 1: Restaurants
📂 **File**: `src/Pages/Restaurants/Restaurants.tsx`  
🎯 **Purpose**: Fetch and display restaurants with live server-side search, cuisine filtering, and sorting using Axios `params`.

#### Endpoint Details
- **Method**: `GET`
- **Path**: `/restaurants` (Full URL: `http://localhost:5000/api/restaurants`)
- **Query Parameters**:
  - `search` (e.g., `biryani`)
  - `cuisine` (e.g., `south indian`)
  - `sortBy` (`rating` | `deliveryTime` | `priceLow` | `priceHigh`)

#### Backend Response JSON
```json
{
  "success": true,
V  "count": 8,
  "restaurants": [
    {
      "id": 1,
      "restaurantName": "Paradise Biryani",
      "restaurantImage": "https://images.unsplash.com/photo-1589302168068-964664d93dc0",
      "rating": 4.5,
      "cuisine": ["Biryani", "North Indian"],
      "deliveryTime": 35,
      "priceForTwo": "500"
    }
  ]
}
```

#### How to integrate with Axios in `Restaurants.tsx`:
```typescript
import { useState, useEffect } from "react";
import api from "../../services/api";
import type { Restaurant } from "../../types/Restaurant";

function Restaurants() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchInput, setSearchInput] = useState<string>("");
  const [selectedCuisine, setSelectedCuisine] = useState<string>("");
  const [sortBy, setSortBy] = useState<SortOption>("default");

  useEffect(() => {
    async function fetchRestaurants() {
      try {
        setLoading(true);
        // Axios handles query parameters cleanly with 'params'
        const response = await api.get("/restaurants", {
          params: {
            search: searchInput || undefined,
            cuisine: selectedCuisine || undefined,
            sortBy: sortBy !== "default" ? sortBy : undefined,
          },
        });

        if (response.data.success) {
          setRestaurants(response.data.restaurants);
        }
      } catch (err: any) {
        console.error("Error fetching restaurants:", err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchRestaurants();
  }, [searchInput, selectedCuisine, sortBy]);

  // Rest of your JSX rendering
}
```

---

### Page 2: Home
📂 **File**: `src/Pages/Home/Home.tsx`  
🎯 **Purpose**: Load all restaurants and the unique cuisine list for quick filter chips.

#### Endpoints
1. **Restaurants**: `GET /restaurants`
2. **Cuisines**: `GET /restaurants/cuisines`

#### Backend Response JSON (`/restaurants/cuisines`)
```json
{
  "success": true,
  "cuisines": [
    "biryani",
    "north indian",
    "south indian",
    "pizza",
    "italian",
    "burger",
    "fast food",
    "chinese",
    "asian",
    "desserts",
    "ice cream",
    "bbq"
  ]
}
```

#### How to integrate with Axios in `Home.tsx`:
```typescript
import { useState, useEffect } from "react";
import api from "../../services/api";
import type { Restaurant } from "../../types/Restaurant";

function Home() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [cuisines, setCuisines] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadHomeData() {
      try {
        setLoading(true);
        // Using Promise.all with Axios to fetch both in parallel!
        const [restaurantsRes, cuisinesRes] = await Promise.all([
          api.get("/restaurants"),
          api.get("/restaurants/cuisines"),
        ]);

        if (restaurantsRes.data.success) {
          setRestaurants(restaurantsRes.data.restaurants);
        }
        if (cuisinesRes.data.success) {
          setCuisines(cuisinesRes.data.cuisines);
        }
      } catch (err: any) {
        console.error("Failed to load home data:", err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    }

    loadHomeData();
  }, []);

  // Rest of your JSX
}
```

---

### Page 3: Restaurant Details
📂 **File**: `src/Components/RestaurantDetails.tsx`  
🎯 **Purpose**: Fetch restaurant information and its corresponding menu items based on the `:id` parameter.

#### Endpoints
1. **Restaurant Info**: `GET /restaurants/:id`
2. **Restaurant Menu**: `GET /restaurants/:id/menu` (supports optional `?category=Biryani`)

#### Backend Response JSON
- `/restaurants/1`:
  ```json
  {
    "success": true,
    "restaurant": {
      "id": 1,
      "restaurantName": "Paradise Biryani",
      "restaurantImage": "https://images.unsplash.com/photo-1589302168068-964664d93dc0",
      "rating": 4.5,
      "cuisine": ["Biryani", "North Indian"],
      "deliveryTime": 35,
      "priceForTwo": "500"
    }
  }
  ```
- `/restaurants/1/menu`:
  ```json
  {
    "success": true,
    "restaurantId": 1,
    "restaurantName": "Paradise Biryani",
    "categories": ["Biryani", "Starters"],
    "count": 4,
    "menu": [
      {
        "id": 101,
        "restaurantId": 1,
        "name": "Chicken Biryani",
        "description": "Aromatic basmati rice cooked with tender chicken and spices.",
        "price": 280,
        "category": "Biryani",
        "isVeg": false
      }
    ]
  }
  ```

#### How to integrate with Axios in `RestaurantDetails.tsx`:
```typescript
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import type { Restaurant, RestaurantMenu } from "../types/Restaurant";

function RestaurantDetails() {
  const { id } = useParams<{ id: string }>();
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [menuItems, setMenuItems] = useState<RestaurantMenu[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchRestaurantAndMenu() {
      if (!id) return;
      try {
        setLoading(true);
        const [resDetails, resMenu] = await Promise.all([
          api.get(`/restaurants/${id}`),
          api.get(`/restaurants/${id}/menu`),
        ]);

        if (resDetails.data.success) {
          setRestaurant(resDetails.data.restaurant);
        }
        if (resMenu.data.success) {
          setMenuItems(resMenu.data.menu);
          setCategories(resMenu.data.categories);
        }
      } catch (err: any) {
        console.error("Error loading restaurant details:", err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchRestaurantAndMenu();
  }, [id]);

  // Rest of your JSX
}
```

---

### Page 4: Offers / Coupons
📂 **File**: `src/Pages/Offers/Offers.tsx`  
🎯 **Purpose**: Fetch active coupons from backend to display available promotions.

#### Endpoint Details
- **Method**: `GET`
- **Path**: `/coupons`

#### Backend Response JSON
```json
{
  "success": true,
  "count": 4,
  "coupons": [
    {
      "id": 1,
      "code": "WELCOME50",
      "discountType": "FLAT",
      "discountValue": 50,
      "minimumOrderAmount": 299,
      "isActive": true
    },
    {
      "id": 2,
      "code": "FOOD10",
      "discountType": "PERCENTAGE",
      "discountValue": 10,
      "minimumOrderAmount": 499,
      "isActive": true
    }
  ]
}
```

#### How to integrate with Axios in `Offers.tsx`:
```typescript
import { useState, useEffect } from "react";
import api from "../../services/api";
import type { Coupon } from "../../types/Types";

function Offers() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadCoupons() {
      try {
        setLoading(true);
        const response = await api.get("/coupons");
        if (response.data.success) {
          setCoupons(response.data.coupons);
        }
      } catch (err: any) {
        console.error("Error fetching coupons:", err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    }

    loadCoupons();
  }, []);

  // Rest of your JSX
}
```

---

### Page 5: Coupon Input & Context
📂 **File**: `src/Context/Coupen/CoupenProvider.tsx`  
🎯 **Purpose**: Validate promo code and calculate discount on the server.

#### Endpoint Details
- **Method**: `POST`
- **Path**: `/coupons/apply`
- **Request Body**:
  ```json
  {
    "code": "WELCOME50",
    "cartTotal": 450
  }
  ```

#### Backend Response JSON
- **Success (200 OK)**:
  ```json
  {
    "success": true,
    "valid": true,
    "message": "Coupon 'WELCOME50' applied successfully!",
    "coupon": {
      "id": 1,
      "code": "WELCOME50",
      "discountType": "FLAT",
      "discountValue": 50,
      "minimumOrderAmount": 299,
      "isActive": true
    },
    "discount": 50,
    "newTotal": 400
  }
  ```
- **Invalid / Below Minimum (400 Bad Request)**:
  ```json
  {
    "success": false,
    "valid": false,
    "message": "Minimum order amount of ₹299 required for this coupon. Your cart is ₹200."
  }
  ```

#### How to integrate with Axios in `CoupenProvider.tsx`:
```typescript
import api from "../../services/api";

async function applyCoupon(code: string) {
  try {
    const response = await api.post("/coupons/apply", {
      code,
      cartTotal: totalCartPrice(),
    });

    if (response.data.valid) {
      setAppliedCoupen(response.data.coupon);
    }
  } catch (err: any) {
    const errorMsg = err.response?.data?.message || "Invalid coupon code";
    alert(errorMsg);
  }
}
```

---

### Page 6: Checkout / Place Order
📂 **File**: `src/Pages/CheckOut/CheckOut.tsx`  
🎯 **Purpose**: Send order details to the backend so the order is saved permanently.

#### Endpoint Details
- **Method**: `POST`
- **Path**: `/orders`
- **Request Body**:
  ```json
  {
    "user": "Ambika",
    "items": [
      {
        "id": 101,
        "restaurantId": 1,
        "name": "Chicken Biryani",
        "price": 280,
        "quantity": 2
      }
    ],
    "address": "Flat 402, Sunshine Apts, Bengaluru, PIN: 560001 (Ph: 9876543210)",
    "totalAmount": 560,
    "status": "Placed"
  }
  ```

#### Backend Response JSON (201 Created)
```json
{
  "success": true,
  "message": "Order placed successfully!",
  "order": {
    "id": "c76e27cb-c4a0-43be-a83d-fb68bc86657c",
    "user": "Ambika",
    "items": [...],
    "address": "Flat 402, Sunshine Apts, Bengaluru, PIN: 560001 (Ph: 9876543210)",
    "totalAmount": 560,
    "status": "Placed",
    "createdAt": "1742634567890"
  }
}
```

#### How to integrate with Axios in `CheckOut.tsx`:
Inside `handleSubmit`:
```typescript
import api from "../../services/api";

async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();

  // 1. Run your existing validation checks...
  // (if errors, return)

  const grandTotal = Math.max(0, totalCartPrice() + deliveryFee - discount);

  const orderPayload = {
    user: address.name,
    items: cartItem,
    address: `${address.address}, ${address.city}, PIN: ${address.pincode} (Ph: ${address.phone})`,
    totalAmount: grandTotal,
    status: "Placed",
  };

  try {
    const response = await api.post("/orders", orderPayload);

    if (response.data.success) {
      clearCart();
      // Navigate to order confirmation using the new order's ID from backend
      navigate(`/orderConfirmation/${response.data.order.id}`);
    }
  } catch (err: any) {
    console.error("Order submission failed:", err.response?.data?.message || err.message);
    alert(err.response?.data?.message || "Failed to place order.");
  }
}
```

---

### Page 7: Order History
📂 **File**: `src/Pages/Orders/Orders.tsx`  
🎯 **Purpose**: Fetch all orders from backend.

#### Endpoint Details
- **Method**: `GET`
- **Path**: `/orders` (Optionally: `/orders?user=Ambika` to filter by user)

#### Backend Response JSON
```json
{
  "success": true,
  "count": 1,
  "orders": [
    {
      "id": "c76e27cb-c4a0-43be-a83d-fb68bc86657c",
      "user": "Ambika",
      "items": [...],
      "address": "...",
      "totalAmount": 560,
      "status": "Placed",
      "createdAt": "1742634567890"
    }
  ]
}
```

#### How to integrate with Axios in `Orders.tsx`:
```typescript
import { useState, useEffect } from "react";
import api from "../../services/api";
import type { OrderType } from "../../types/Types";

function Orders() {
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchOrders() {
      try {
        setLoading(true);
        const response = await api.get("/orders");
        if (response.data.success) {
          setOrders(response.data.orders);
        }
      } catch (err: any) {
        console.error("Failed to load orders:", err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, []);

  // Rest of your JSX (use 'orders' array)
}
```

---

### Page 8: Order Details & Status Tracking
📂 **File**: `src/Pages/OrderDetails/OrderDetails.tsx`  
🎯 **Purpose**: 
1. Fetch single order by `orderId`.
2. Advance order status (`Placed` ➔ `Preparing` ➔ `OutForDelivery` ➔ `Delivered`) via `PATCH`.

#### Endpoints
1. **Get Order Details**: `GET /orders/:orderId`
2. **Update Order Status**: `PATCH /orders/:orderId/status`
   - **Request Body**: `{ "status": "Preparing" }`

#### How to integrate with Axios in `OrderDetails.tsx`:
```typescript
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";
import type { OrderType, OrderStatus } from "../../types/Types";

function OrderDetails() {
  const { orderId } = useParams<{ orderId: string }>();
  const [orderDetails, setOrderDetails] = useState<OrderType | undefined>();
  const [loading, setLoading] = useState<boolean>(true);

  // 1. Fetch Order by ID
  useEffect(() => {
    async function fetchOrder() {
      if (!orderId) return;
      try {
        setLoading(true);
        const response = await api.get(`/orders/${orderId}`);
        if (response.data.success) {
          setOrderDetails(response.data.order);
        }
      } catch (err: any) {
        console.error("Error fetching order:", err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchOrder();
  }, [orderId]);

  // 2. Advance Status to next stage
  async function handleStatusUpdate(nextStatus: OrderStatus) {
    if (!orderId || !nextStatus) return;
    try {
      const response = await api.patch(`/orders/${orderId}/status`, {
        status: nextStatus,
      });

      if (response.data.success) {
        setOrderDetails(response.data.order);
      }
    } catch (err: any) {
      console.error("Failed to update status:", err.response?.data?.message || err.message);
    }
  }

  // Rest of your JSX
}
```

---

### Page 9: Favorites
📂 **File**: `src/Context/Favourites/FavoriteProvider.tsx`  
🎯 **Purpose**: Fetch and toggle user favorite restaurants.

#### Endpoints
1. **Get Favorites**: `GET /favorites`
   - **Response**:
     ```json
     {
       "success": true,
       "count": 2,
       "favorites": [1, 2],
       "restaurants": [
         {
           "id": 1,
           "restaurantName": "Paradise Biryani",
           "restaurantImage": "https://images.unsplash.com/photo-1589302168068-964664d93dc0",
           "rating": 4.5,
           "cuisine": ["Biryani", "North Indian"],
           "deliveryTime": 35,
           "priceForTwo": "500"
         },
         {
           "id": 2,
           "restaurantName": "Meghana Foods",
           "restaurantImage": "https://images.unsplash.com/photo-1601050690597-df0568f70950",
           "rating": 4.4,
           "cuisine": ["South Indian", "Biryani"],
           "deliveryTime": 30,
           "priceForTwo": "450"
         }
       ]
     }
     ```
2. **Toggle Favorite**: `POST /favorites/toggle`
   - **Request Body**: `{ "restaurantId": 1 }`
   - **Response**: `{ "success": true, "isFavorite": true, "favorites": [1, 2], "restaurants": [...] }`

#### How to integrate with Axios in `FavoriteProvider.tsx`:
```typescript
import { useState, useEffect } from "react";
import api from "../../services/api";

function FavoriteProvider({ children }: ChildrenProp) {
  const [favorites, setFavorites] = useState<number[]>([]);

  // 1. Load initial favorites from backend
  useEffect(() => {
    async function loadFavorites() {
      try {
        const response = await api.get("/favorites");
        if (response.data.success) {
          setFavorites(response.data.favorites);
        }
      } catch (err: any) {
        console.error("Failed to load favorites:", err.message);
      }
    }

    loadFavorites();
  }, []);

  // 2. Toggle Favorite on backend
  async function addFavorites(id: number) {
    try {
      const response = await api.post("/favorites/toggle", {
        restaurantId: id,
      });

      if (response.data.success) {
        setFavorites(response.data.favorites);
      }
    } catch (err: any) {
      console.error("Failed to toggle favorite:", err.message);
    }
  }

  // Rest of context provider
}
```

---

### Page 10: User Registration
📂 **File**: `src/Pages/Register/Register.tsx`  
🎯 **Purpose**: Register new user account with validation.

#### Endpoint Details
- **Method**: `POST`
- **Path**: `/auth/register`
- **Request Body**:
  ```json
  {
    "name": "Jane Doe",
    "email": "jane@example.com",
    "phone": "9876543210",
    "password": "Password123",
    "confirmPassword": "Password123",
    "terms": true
  }
  ```

#### Backend Response JSON
- **Success (201 Created)**:
  ```json
  {
    "success": true,
    "message": "Account created successfully! You can now log in.",
    "user": {
      "name": "Jane Doe",
      "email": "jane@example.com"
    }
  }
  ```
- **Error (400 Bad Request)**:
  ```json
  {
    "success": false,
    "message": "A user with this username or email already exists."
  }
  ```

#### How to integrate with Axios in `Register.tsx`:
In `handleSubmit`:
```typescript
import api from "../../services/api";

async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();

  // 1. Frontend validation (errors check)
  const errors = validateForm();
  setFormErrors(errors);
  if (Object.values(errors).some((msg) => msg !== "")) return;

  // 2. Call backend register API
  try {
    const response = await api.post("/auth/register", formData);

    if (response.data.success) {
      setSuccessMessage(response.data.message);
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    }
  } catch (err: any) {
    const serverMessage = err.response?.data?.message || "Registration failed. Please try again.";
    setFormErrors((prev) => ({ ...prev, email: serverMessage }));
  }
}
```

---

### Page 11: User Login
📂 **File**: `src/Pages/Login/Login.tsx`  
🎯 **Purpose**: Verify username/email and password against backend database.

#### Endpoint Details
- **Method**: `POST`
- **Path**: `/auth/login`
- **Request Body**:
  ```json
  {
    "name": "jane@example.com",
    "password": "Password123"
  }
  ```

#### Backend Response JSON
- **Success (200 OK)**:
  ```json
  {
    "success": true,
    "message": "Login successful!",
    "user": {
      "name": "Jane Doe",
      "email": "jane@example.com"
    }
  }
  ```
- **Error (401 Unauthorized)**:
  ```json
  {
    "success": false,
    "message": "Invalid username/email or password. Please try again."
  }
  ```

#### How to integrate with Axios in `Login.tsx`:
In `handleSubmit`:
```typescript
import api from "../../services/api";

async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();

  try {
    const response = await api.post("/auth/login", {
      name: formData.name,
      password: formData.password,
    });

    if (response.data.success) {
      login(response.data.user.name);
      navigate(from);
    }
  } catch (err: any) {
    const errorMsg = err.response?.data?.message || "Unable to sign in. Please verify your credentials.";
    setError(errorMsg);
  }
}
```

---

### Page 12: Forgot Password
📂 **File**: `src/Pages/ForgotPassword/ForgotPassword.tsx`  
🎯 **Purpose**: Send password recovery instructions to email.

#### Endpoint Details
- **Method**: `POST`
- **Path**: `/auth/forgot-password`
- **Request Body**:
  ```json
  {
    "email": "jane@example.com"
  }
  ```

#### How to integrate with Axios in `ForgotPassword.tsx`:
In `handleSubmit`:
```typescript
import api from "../../services/api";

async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  if (!email.trim()) return;

  try {
    const response = await api.post("/auth/forgot-password", {
      email: email.trim(),
    });

    if (response.data.success) {
      setSubmitted(true);
    }
  } catch (err: any) {
    console.error("Forgot password request failed:", err.response?.data?.message || err.message);
  }
}
```

---

## 5. Summary Checklist

| Page / Component | File | Axios Method & Path |
| :--- | :--- | :--- |
| **All Restaurants** | `src/Pages/Restaurants/Restaurants.tsx` | `api.get("/restaurants", { params: { search, cuisine, sortBy } })` |
| **Cuisine Chips** | `src/Pages/Home/Home.tsx` | `api.get("/restaurants/cuisines")` |
| **Restaurant Details** | `src/Components/RestaurantDetails.tsx` | `api.get(`/restaurants/${id}`)` |
| **Restaurant Menu** | `src/Components/RestaurantDetails.tsx` | `api.get(`/restaurants/${id}/menu`)` |
| **Offers & Coupons** | `src/Pages/Offers/Offers.tsx` | `api.get("/coupons")` |
| **Apply Coupon** | `src/Context/Coupen/CoupenProvider.tsx` | `api.post("/coupons/apply", { code, cartTotal })` |
| **Place Order** | `src/Pages/CheckOut/CheckOut.tsx` | `api.post("/orders", orderPayload)` |
| **Order History** | `src/Pages/Orders/Orders.tsx` | `api.get("/orders")` |
| **Order Status Update**| `src/Pages/OrderDetails/OrderDetails.tsx` | `api.patch(`/orders/${orderId}/status`, { status })` |
| **Favorites** | `src/Context/Favourites/FavoriteProvider.tsx` | `api.get("/favorites")`<br>`api.post("/favorites/toggle", { restaurantId })` |
| **Register** | `src/Pages/Register/Register.tsx` | `api.post("/auth/register", formData)` |
| **Login** | `src/Pages/Login/Login.tsx` | `api.post("/auth/login", { name, password })` |
| **Forgot Password** | `src/Pages/ForgotPassword/ForgotPassword.tsx` | `api.post("/auth/forgot-password", { email })` |

Happy integrating with Axios! 🚀
