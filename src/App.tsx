
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './Routes/AppRoutes'
import ContextProvider from './Context/ContextProvider'
import CartProvider from './Context/Cart/CartProvider'
function App() {

  return (
    <div>
      
      <BrowserRouter>
      <ContextProvider>
        <CartProvider>
      <AppRoutes/>
      </CartProvider>
      </ContextProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
