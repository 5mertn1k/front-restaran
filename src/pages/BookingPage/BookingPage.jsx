import "./BookingPage.css";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getSessionId } from "../../utils/session";

export default function BookingPage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const total = state?.total || 0;

  const sessionId = getSessionId();

  const user = JSON.parse(localStorage.getItem("user"));

  const [form, setForm] = useState({
    lastName: user?.lastName || "",
    firstName: user?.firstName || "",
    guests: "",
    date: "",
    time: "",
    duration: "",
    phone: user?.username || "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `http://localhost:8080/api/bookings?sessionId=${sessionId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            lastName: form.lastName,
            firstName: form.firstName,
            guests: String(form.guests),
            date: form.date,
            time: form.time,
            duration: String(form.duration),
            phone: form.phone,
          }),
        }
      );

      if (!res.ok) {
        throw new Error("Ошибка бронирования");
      }

      

      alert("Бронирование успешно создано!");
      navigate("/"); // или, например, на страницу профиля
    } catch (err) {
      console.error(err);
      alert("Не удалось создать бронирование");
    }
  };

  return (
    <div className="booking-page">
      <div className="booking-container">
        <h2 className="booking-total">Итог: {total} ₽</h2>

        <form className="booking-form" onSubmit={handleSubmit}>
          <input
            name="lastName"
            placeholder="Фамилия"
            value={form.lastName}
            onChange={handleChange}
          />
          <input
            name="firstName"
            placeholder="Имя"
            value={form.firstName}
            onChange={handleChange}
          />
          <input
            name="guests"
            placeholder="Количество гостей"
            value={form.guests}
            onChange={handleChange}
          />
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
          />
          <input
            type="time"
            name="time"
            value={form.time}
            onChange={handleChange}
          />
          <input
            name="duration"
            placeholder="Продолжительность, часов"
            value={form.duration}
            onChange={handleChange}
          />
          <input
            name="phone"
            placeholder="Телефон"
            value={form.phone}
            onChange={handleChange}
          />

          <div className="btn-wrapper">
            <button
              type="button"
              className="back-to-cart"
              onClick={() => navigate("/cart")}
            >
              Вернуться в корзину
            </button>
            <button className="booking-btn" type="submit">
              Забронировать столик
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
