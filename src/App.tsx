
import { BrowserRouter } from 'react-router-dom'
import MainLayout from './Components/Main/MainLayout'
import AppRoutes from './Routes/AppRoutes'
import ContextProvider from './Context/ContextProvider'
function App() {

  return (
    <div>
      
      <BrowserRouter>
      <ContextProvider>
      <AppRoutes/>
      </ContextProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
