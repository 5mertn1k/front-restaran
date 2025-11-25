import { useEffect, useState } from "react";

export default function UsersPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const res = await fetch("http://localhost:8080/api/admin/users");
    const data = await res.json();
    setUsers(data);
  };

  return (
    <div>
      <h2>Пользователи</h2>

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
          {users.map(u => (
            <tr key={u.id}>
              <td>{u.lastName} {u.firstName}</td>
              <td>{u.birthDate}</td>
              <td>{u.role}</td>
              <td>{u.username}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
