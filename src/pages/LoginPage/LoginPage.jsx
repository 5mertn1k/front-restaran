import { useState } from "react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:8080/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      const user = await res.json();
      localStorage.setItem("user", JSON.stringify(user));
      alert("Вход выполнен!");
      window.location.href = "/";
    } else {
      alert("Ошибка входа");
    }
  };

  return (
    <div style={{ color: "white", display: "flex", justifyContent: "center" }}>
      <form
        onSubmit={handleLogin}
        style={{
          background: "#222",
          padding: "20px",
          borderRadius: "8px",
          width: "300px",
        }}
      >
        <h3>Вход в систему</h3>
        <input
          placeholder="Логин"
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
          Нет аккаунта?{" "}
          <a href="/register" style={{ color: "orange" }}>
            Зарегистрироваться
          </a>
        </p>
      </form>
    </div>
  );
}
