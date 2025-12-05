  import { useParams, useNavigate } from "react-router-dom";
  import { useEffect, useState } from "react";
  import "./BookingDetailsPage.css";

  export default function BookingDetailsPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [booking, setBooking] = useState(null);

    useEffect(() => {
      load();
    }, []);

    const load = async () => {
      const res = await fetch(`http://localhost:8084/api/admin/bookings/${id}`);
      const data = await res.json();
      setBooking(data);
    };

    const changeQty = async (dishId, delta) => {
      const updated = { ...booking };

      updated.items = updated.items
        .map(i =>
          i.dishId === dishId
            ? { ...i, quantity: Math.max(i.quantity + delta, 0) }
            : i
        )
        .filter(i => i.quantity > 0);

      updated.total = updated.items.reduce(
        (acc, i) => acc + i.price * i.quantity,
        0
      );

      setBooking(updated);

      const body = {
        items: updated.items.map(i => ({
          dishId: i.dishId,
          quantity: i.quantity,
        })),
      };

      // ✅ ВАЖНО: ТУТ ДОЛЖЕН БЫТЬ PUT, А НЕ POST
      await fetch(`http://localhost:8084/api/admin/bookings/${id}/items`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      });
    };


    if (!booking) return <p>Загрузка...</p>;

    return (
      <div className="details-wrapper">

        <h1 className="details-name">
          {booking.lastName} {booking.firstName} {booking.middleName}
        </h1>

        <div className="details-sub">
          {booking.date} {booking.timeStart}-{booking.timeEnd} · {booking.guests} места
        </div>

        <div className="details-phone">{booking.phone}</div>

        <h2 className="details-title">Состав заказа</h2>

        <div className="details-items">
          {booking.items.map(i => (
            <div key={i.dishId} className="details-item">
              <span>{i.title}</span>
              <span className="item-price">{i.price} ₽</span>

              <div className="item-controls">
                <button className="count-btn" onClick={() => changeQty(i.dishId, -1)}>
                  −
                </button>

                <span className="item-qty">{i.quantity}</span>

                <button className="count-btn" onClick={() => changeQty(i.dishId, +1)}>
                  +
                </button>
              </div>
            </div>
          ))}
        </div>

        <button className="add-dish-btn" onClick={() => navigate(`/menu?bookingId=${id}`)}>
          Добавить блюдо
        </button>


        <div className="details-total">
          Итого: <span>{booking.total} ₽</span>
        </div>
      </div>
    );
  }
