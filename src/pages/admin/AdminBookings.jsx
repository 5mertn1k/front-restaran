import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./AdminBookingsPage.css";

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [menuPos, setMenuPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    const res = await fetch("http://localhost:8084/api/admin/bookings");
    const data = await res.json();
    setBookings(data);
  };

  const deleteBooking = async () => {
    if (!selectedBooking) return;

    await fetch(`http://localhost:8084/api/admin/bookings/${selectedBooking.id}`, {
      method: "DELETE"
    });

    setSelectedBooking(null);
    loadBookings();
  };

  const handleRowClick = (event, booking) => {
    setSelectedBooking(booking);
    setMenuPos({
      x: event.clientX + 10,
      y: event.clientY + 10
    });
  };

  return (
    <div className="bookings-wrapper">

      <div className="bookings-table-wrapper">
        <table className="bookings-table">
          <thead>
            <tr>
              <th>ФИО</th>
              <th>Дата</th>
              <th>Начало</th>
              <th>Конец</th>
              <th>Гостей</th>
              <th>Телефон</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map(b => (
              <tr
                key={b.id}
                onClick={(e) => handleRowClick(e, b)}
                
              >
                <td>{b.lastName} {b.firstName} {b.middleName} </td>
                <td>{b.date}</td>
                <td>{b.timeStart}</td>
                <td>{b.timeEnd}</td>
                <td>{b.guests}</td>
                <td>{b.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedBooking && (
        <div
          className="context-menu"
          style={{ top: menuPos.y, left: menuPos.x }}
        >
          <Link
            to={`/admin/bookings/${selectedBooking.id}`}
            className="btn-yellow"
          >
            Детали
          </Link>

          <div className="btn-red" onClick={deleteBooking}>
            Удалить
          </div>

          <div
            className="btn-gray"
            onClick={() => setSelectedBooking(null)}
          >
            Закрыть
          </div>
        </div>
      )}
    </div>
  );
}
