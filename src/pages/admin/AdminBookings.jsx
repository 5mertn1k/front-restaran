import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    const res = await fetch("http://localhost:8080/api/admin/bookings");
    const data = await res.json();
    setBookings(data);
  };

  return (
    <div>
      <h2>Заявки</h2>

      <table className="admin-table">
        <thead>
          <tr>
            <th>ФИО</th>
            <th>Дата</th>
            <th>Начало</th>
            <th>Конец</th>
            <th>Гостей</th>
            <th>Телефон</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {bookings.map(b => (
            <tr key={b.id}>
              <td>{b.lastName} {b.firstName}</td>
              <td>{b.date}</td>
              <td>{b.timeStart}</td>
              <td>{b.timeEnd}</td>
              <td>{b.guests}</td>
              <td>{b.phone}</td>

              <td>
                <Link to={`/admin/bookings/${b.id}`}>Детали</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}
