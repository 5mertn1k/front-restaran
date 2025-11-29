import { useState } from "react";
import "./RegisterPage.css";

export default function RegisterPage() {
  const [form, setForm] = useState({
    lastName: "",
    firstName: "",
    middleName: "",
    birthDate: "",
    username: "",
    password: "",
    repeatPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.repeatPassword) {
      alert("Пароли не совпадают");
      return;
    }

    const res = await fetch("http://localhost:8082/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      alert("Регистрация успешна!");
      window.location.href = "/login";
    } else {
      alert("Ошибка регистрации");
    }
  };

  return (
    <div className="register-page">
      <form className="register-form" onSubmit={handleSubmit}>
        <h3>Регистрация пользователя</h3>
        <input name="lastName" placeholder="Фамилия*" onChange={handleChange} required />
        <input name="firstName" placeholder="Имя*" onChange={handleChange} required />
        <input name="middleName" placeholder="Отчество" onChange={handleChange} />
        <input name="birthDate" type="date" placeholder="Дата рождения*" onChange={handleChange} required />
        <input name="username" placeholder="Логин (номер телефона)*" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Пароль*" onChange={handleChange} required />
        <input name="repeatPassword" type="password" placeholder="Повтор пароля*" onChange={handleChange} required />
        <div className="btn-wrapper">
          <button type="submit">Зарегистрироваться</button>
        </div>
      </form>
    </div>
  );
}
