
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './Routes/AppRoutes'
import ContextProvider from './Context/ContextProvider'
import CartProvider from './Context/Cart/CartProvider'
import CoupenProvider from './Context/Coupen/CoupenProvider'
function App() {

  return (
    <div>
      
      <BrowserRouter>
      <ContextProvider>
        <CartProvider>
          <CoupenProvider>
                  <AppRoutes/>
          </CoupenProvider>
      </CartProvider>
      </ContextProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
