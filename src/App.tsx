import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './Routes/AppRoutes'
import ContextProvider from './Context/ContextProvider'
import CartProvider from './Context/Cart/CartProvider'
import CoupenProvider from './Context/Coupen/CoupenProvider'
import FavoriteProvider from './Context/Favourites/FavoriteProvider'
import RestaurantProvider from './Context/Restaurant/RestaurantProvider'
import LoadingProvider from './Context/Loading/LoadingProvider'
import GlobalLoader from './Components/Loading/GlobalLoader'
import { Toaster } from 'react-hot-toast'
function App() {
  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      <LoadingProvider>
        <GlobalLoader />
        <BrowserRouter basename="/foodhub">
          <ContextProvider>
            <RestaurantProvider>
              <FavoriteProvider>
                <CartProvider>
                  <CoupenProvider>
                    <AppRoutes />
                  </CoupenProvider>
                </CartProvider>
              </FavoriteProvider>
            </RestaurantProvider>
          </ContextProvider>
        </BrowserRouter>
      </LoadingProvider>
    </div>
  )
}

export default App
