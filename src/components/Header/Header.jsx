import { NavLink, Link, useNavigate } from "react-router-dom";
import "./Header.css";
import userprofile from "../../assets/User.svg"; 
import userprofile1 from "../../assets/User1.svg"; 

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
            <NavLink 
              to="/profile"
              className={({ isActive }) => 
                isActive ? "profile-link active" : "profile-link"
              }
            >
              <span className="profile-icon"></span>
              {user.firstName}
            </NavLink>
          ) : (
            <NavLink 
              to="/login"
              className={({ isActive }) => 
                isActive ? "profile-link active" : "profile-link"
              }
            >
              <span className="profile-icon"></span>
              Профиль
            </NavLink>
          )}
        </div>

      </nav>
    </header>
  );
}
