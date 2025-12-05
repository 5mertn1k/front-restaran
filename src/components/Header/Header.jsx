import { NavLink, Link } from "react-router-dom";
import "./Header.css";

export default function Header() {
  const user = JSON.parse(localStorage.getItem("user"));
  const role = localStorage.getItem("role");


  const bookingId = new URLSearchParams(window.location.search).get("bookingId");
  const menuLink = bookingId ? `/menu?bookingId=${bookingId}` : "/menu";

  const isAdmin = role === "ROLE_ADMIN";

  return (
    <header className="header">

      
      {isAdmin && (
        <div className="admin-link">
          <NavLink to="/admin/bookings">Админ</NavLink>
        </div>
      )}

      <nav className="nav">
        <h1 className="logo">
          <Link to="/">La Vita Italiana</Link>
        </h1>

        <ul className="menu">
          <li>
            <NavLink to={menuLink} className={({ isActive }) => (isActive ? "active" : "")}>
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

          
          {!isAdmin && (
            <>
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
            </>
          )}
        </ul>

        <div className="profile-section">
          {user ? (
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                isActive ? "profile-link active" : "profile-link"
              }
            >
              <span className="profile-icon"/>
              {user.firstName}
            </NavLink>
          ) : (
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive ? "profile-link active" : "profile-link"
              }
            >
              <span className="profile-icon"/>
              Профиль
            </NavLink>
          )}
        </div>
      </nav>
    </header>
  );
}
