import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./BookingDetailsPage.css";

export default function BookingDetailsPage() {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const res = await fetch(`http://localhost:8084/api/admin/bookings/${id}`);
    const data = await res.json();
    setBooking(data);
  };

  if (!booking) return <p>Загрузка...</p>;

  return (
    <div className="booking-details">
      <h2>{booking.lastName} {booking.firstName}</h2>
      <h3>{booking.date} {booking.timeStart}-{booking.timeEnd}</h3>

      <p>{booking.phone}</p>

      <h3>Состав заказа:</h3>
      {booking.items.map(i => (
        <div key={i.dishId}>
          {i.title} — {i.quantity} шт.
        </div>
      ))}

      <h2>Итого: <strong>{booking.total} ₽</strong></h2>
    </div>
  );
}
