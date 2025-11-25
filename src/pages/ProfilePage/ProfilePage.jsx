import { useEffect, useState } from "react";
import "./ProfilePage.css";

export default function ProfilePage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    setUser(savedUser);
  }, []);

  if (!user) {
    return <p className="profile-loading">Загрузка...</p>;
  }

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <div className="profile-wrapper">
      <div className="profile-card">
        <h3 className="profile-title">Личные данные</h3>

        <input value={user.lastName} readOnly />
        <input value={user.firstName} readOnly />
        <input value={user.middleName || ""} readOnly />
        <input value={user.birthDate} readOnly />
        <input value={user.username} readOnly />
        <input type="password" value={user.password} readOnly />
        <div className="pravoknopka">
          <button className="profile-logout" onClick={handleLogout}>
            Выйти из профиля
          </button>
        </div>
      </div>
    </div>
  );
}
