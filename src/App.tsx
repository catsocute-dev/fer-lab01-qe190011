import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { Home } from "./pages/Home"
import { Login } from "./pages/Login"
import { Register } from "./pages/Register"
import { Cart } from "./pages/Cart"
import { Checkout } from "./pages/Checkout"
import { Orders } from "./pages/Orders"
import { CartProvider } from "./contexts/CartContext"
import { AuthProvider } from "./contexts/AuthContext"
import { ProtectedRoute } from "./components/ProtectedRoute"
import {
  ROUTE_CART,
  ROUTE_CHECKOUT,
  ROUTE_HOME,
  ROUTE_LOGIN,
  ROUTE_ORDERS,
  ROUTE_REGISTER,
  ROUTE_ROOT,
} from "./constants/routes"

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route path={ROUTE_HOME} element={<Home />} />
            <Route path={ROUTE_LOGIN} element={<Login />} />
            <Route path={ROUTE_REGISTER} element={<Register />} />
            <Route path={ROUTE_CART} element={<Cart />} />
            <Route
              path={ROUTE_CHECKOUT}
              element={
                <ProtectedRoute>
                  <Checkout />
                </ProtectedRoute>
              }
            />
            <Route
              path={ROUTE_ORDERS}
              element={
                <ProtectedRoute>
                  <Orders />
                </ProtectedRoute>
              }
            />
            <Route path={ROUTE_ROOT} element={<Navigate to={ROUTE_HOME} replace />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  )
}

export default App
