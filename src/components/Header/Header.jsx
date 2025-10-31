import { NavLink, Link, useNavigate } from "react-router-dom";
import "./Header.css";

export default function Header() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <header className="header">
      <nav className="nav">
        <h1 className="logo">
          <Link to="/">La Vita Italiana</Link>
        </h1>
        <ul className="menu">
          <li>
            <NavLink to="/menu" className={({ isActive }) => (isActive ? "active" : "")}>
              Меню
            </NavLink>
          </li>
          <li>
            <NavLink to="/promotions" className={({ isActive }) => (isActive ? "active" : "")}>
              Акции
            </NavLink>
          </li>
          <li>
            <NavLink to="/contacts" className={({ isActive }) => (isActive ? "active" : "")}>
              Контакты
            </NavLink>
          </li>
          <li>
            <NavLink to="/booking" className={({ isActive }) => (isActive ? "active" : "")}>
              Бронь
            </NavLink>
          </li>
          <li>
            <NavLink to="/cart" className={({ isActive }) => (isActive ? "active" : "")}>
              Корзина
            </NavLink>
          </li>
        </ul>

        <div className="profile-section">
          {user ? (
            <div className="profile-info">
              <NavLink to="/profile" className="profile-link">
                <span role="img" aria-label="user">👤</span> {user.firstName}
              </NavLink>
            </div>
          ) : (
            <NavLink to="/login" className={({ isActive }) => (isActive ? "active" : "")}>
              <span role="img" aria-label="user">👤</span> Профиль
            </NavLink>
          )}
        </div>
      </nav>
    </header>
  );
}
