import { useEffect, useState } from "react";

export default function ProfilePage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    setUser(savedUser);
  }, []);

  if (!user) {
    return <p style={{ color: "white", textAlign: "center" }}>Загрузка...</p>;
  }

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("cart");
    window.location.href = "/login";
  };

  return (
    <div
      style={{
        color: "white",
        display: "flex",
        justifyContent: "center",
        marginTop: "50px",
      }}
    >
      <div
        style={{
          background: "#222",
          padding: "20px",
          borderRadius: "8px",
          width: "300px",
          textAlign: "center",
        }}
      >
        <h3>Личные данные</h3>
        <input value={user.lastName} readOnly />
        <input value={user.firstName} readOnly />
        <input value={user.middleName || ""} readOnly />
        <input value={user.birthDate} readOnly />
        <input value={user.username} readOnly />
        <input type="password" value={user.password} readOnly />
        <button onClick={handleLogout}>Выйти из профиля</button>
      </div>
    </div>
  );
}
