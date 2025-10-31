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

export default function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <main className="content">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/promotions" element={<PromotionsPage />} />
            <Route path="/contacts" element={<ContactsPage />} />
            <Route path="/menu/:slug" element={<CategoryPage />} />
            <Route path="/cart" element={<CartPage/>} /> 
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
