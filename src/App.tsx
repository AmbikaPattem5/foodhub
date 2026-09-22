
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './Routes/AppRoutes'
import ContextProvider from './Context/ContextProvider'
import CartProvider from './Context/Cart/CartProvider'
import CoupenProvider from './Context/Coupen/CoupenProvider'
import FavoriteProvider from './Context/Favourites/FavoriteProvider'
function App() {

  return (
    <div>
      
      <BrowserRouter>
      <ContextProvider>
        <FavoriteProvider>
        <CartProvider>
          <CoupenProvider>
                  <AppRoutes/>
          </CoupenProvider>
      </CartProvider>
      </FavoriteProvider>
      </ContextProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
