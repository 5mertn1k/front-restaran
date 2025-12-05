import { useState } from "react";
import { Link } from "react-router-dom";
import "./LoginPage.css";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:8082/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    if (!res.ok) {
      alert("Ошибка входа");
      return;
    }

    const data = await res.json();

    // ✔ сохраняем токен
    localStorage.setItem("token", data.token);

    // ✔ сохраняем роль
    localStorage.setItem("role", data.role);

    // ✔ сохраняем пользователя
    localStorage.setItem("user", JSON.stringify(data.user));

    alert("Вход выполнен!");
    window.location.href = "/";
  };

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleLogin}>
        <h3>Вход в систему</h3>

        <input
          placeholder="Логин (номер телефона)"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          placeholder="Пароль"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Войти</button>

        <p>
          Нет аккаунта? <Link to="/register">Зарегистрироваться</Link>
        </p>
      </form>
    </div>
  );
}
  