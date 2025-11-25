import { Outlet, NavLink } from "react-router-dom";
//import "./AdminLayout.css";

export default function AdminLayout() {
  return (
    <div className="admin-layout">
      <header className="admin-header">
        <h2>Панель администратора</h2>

        <nav className="admin-nav">
          <NavLink to="/admin/users">Пользователи</NavLink>
          <NavLink to="/admin/bookings">Заявки</NavLink>
        </nav>
      </header>

      <div className="admin-content">
        <Outlet />
      </div>
    </div>
  );
}
