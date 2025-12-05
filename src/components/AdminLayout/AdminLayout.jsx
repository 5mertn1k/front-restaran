import { Outlet, NavLink } from "react-router-dom";
import "./AdminLayout.css";

export default function AdminLayout() {

  return (
    
    <div className="admin-layout">
      
      <header className="admin-header">

        <nav className="admin-nav">
          <NavLink to="/admin/bookings">Заявки</NavLink>
          <NavLink to="/admin/users">Пользователи</NavLink>
        </nav>
      </header>

      <div className="admin-content">
        <Outlet />
      </div>
    </div>
  );
}
