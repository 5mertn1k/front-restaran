import { useEffect, useState } from "react";
import "./UsersPage.css";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [showRoleMenu, setShowRoleMenu] = useState(false);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const res = await fetch("http://localhost:8082/api/admin/users");
    const data = await res.json();
    setUsers(data);
  };

  const handleRowClick = (event, user) => {
    setSelectedUser(user);
    setPosition({
      x: event.clientX + 10,
      y: event.clientY + 10
    });
    setShowRoleMenu(false);
  };

  const changeRole = async (role) => {
    if (!selectedUser) return;

    await fetch(`http://localhost:8082/api/admin/users/${selectedUser.id}/role`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role })
    });

    setShowRoleMenu(false);
    setSelectedUser(null);
    loadUsers();
  };

  const deleteUser = async () => {
    if (!selectedUser) return;

    await fetch(`http://localhost:8082/api/admin/users/${selectedUser.id}`, {
      method: "DELETE"
    });

    
    const currentStr = localStorage.getItem("user");
    if (currentStr) {
      try {
        const current = JSON.parse(currentStr);
        if (current.id === selectedUser.id) {
          localStorage.removeItem("user");
          window.location.href = "/";
          return;
        }
      } catch (e) {
        console.error("Ошибка парсинга текущего пользователя", e);
      }
    }

    setSelectedUser(null);
    loadUsers();
  };

  return (
  <div className="users-wrapper">

    
    <div className="admin-table-wrapper">
      <table className="admin-table">
        <thead>
          <tr>
            <th>ФИО</th>
            <th>Дата рождения</th>
            <th>Роль</th>
            <th>Телефон</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr
              key={u.id}
              onClick={(e) => handleRowClick(e, u)}
              
            >
              <td>{u.lastName} {u.firstName} {u.middleName}</td>
              <td>{u.birthDate}</td>
              <td>{u.role}</td>
              <td>{u.username}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {selectedUser && (
      <div
        className="context-menu1"
        style={{ top: position.y, left: position.x }}
      >
        <div
          className="btn-yellow"
          onClick={() => setShowRoleMenu(true)}
        >
          Изменить роль
        </div>

        <div
          className="btn-red"
          onClick={deleteUser}
        >
          Удалить
        </div>

        <div
          className="btn-gray"
          onClick={() => setSelectedUser(null)}
        >
          Закрыть
        </div>
      </div>
    )}

    {showRoleMenu && selectedUser && (
      <div
        className="role-menu"
        style={{ top: position.y, left: position.x + 220 }}
      >
        <div className="role-item" onClick={() => changeRole("ADMIN")}>
          Администратор
        </div>
        <div className="role-item" onClick={() => changeRole("COOK")}>
          Повар
        </div>
        <div className="role-item" onClick={() => changeRole("WAITER")}>
          Официант
        </div>
        <div className="role-item" onClick={() => changeRole("CUSTOMER")}>
          Посетитель
        </div>
      </div>
    )}
  </div>
);

}
