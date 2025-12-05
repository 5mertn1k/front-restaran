import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

import Main from "./pages/main/Main";
import MenuPage from "./pages/MenuPage/MenuPage";
import PromotionsPage from "./pages/PromotionsPage/PromotionsPage";
import ContactsPage from "./pages/ContactsPage/ContactsPage";
import CategoryPage from "./pages/CategoryPage/CategoryPage";
import CartPage from "./pages/CartPage/CartPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import BookingPage from "./pages/BookingPage/BookingPage";

import AdminLayout from "./components/AdminLayout/AdminLayout";
import UsersPage from "./pages/admin/UsersPage";
import Bookings from "./pages/admin/AdminBookings";
import AdminBookingDetails from "./pages/admin/BookingDetailsPage";
import AdminRoute from "./utils/AdminRoute";

export default function App() {
  return (
    <Router>
      <div className="app"> 
        <Routes>

          
          <Route path="/*"
            element={
              <>
                <Header />
                <main className="content">
                  <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/menu" element={<MenuPage />} />
                    <Route path="/promotions" element={<PromotionsPage />} />
                    <Route path="/contacts" element={<ContactsPage />} />
                    <Route path="/menu/:slug" element={<CategoryPage />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/booking" element={<BookingPage />} />
                  </Routes>
                </main>
                <Footer />
              </>
            }
          />

          
          <Route path="/admin/*" element={
                    <AdminRoute>
                      <AdminLayout />
                    </AdminRoute>
                  }>
            <Route path="users" element={<UsersPage />} />
            <Route path="bookings" element={<Bookings />} />
            <Route path="bookings/:id" element={<AdminBookingDetails />} />
          </Route>
        </Routes>
      </div>  
    </Router>
  );
}
