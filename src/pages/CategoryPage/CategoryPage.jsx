import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import DishCard from "../../components/DishCard";
import DrinkRow from "../../components/Drink/DrinkRow";
import "./CategoryPage.css";
import { getSessionId } from "../../utils/session";

export default function CategoryPage() {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const bookingId = searchParams.get("bookingId"); // ✅ ВАЖНО
  const isAdminMode = !!bookingId;

  const [dishes, setDishes] = useState([]);
  const [cart, setCart] = useState({});
  const sessionId = getSessionId();

  

  const loadMenu = async () => {
    const res = await fetch(`http://localhost:8081/api/menu/${slug}`);
    const data = await res.json();
    setDishes(Array.isArray(data) ? data : []);
  };

  const loadCart = async () => {
    
    if (isAdminMode) {
      const res = await fetch(`http://localhost:8084/api/admin/bookings/${bookingId}`);
      const data = await res.json();

      const map = {};
      data.items.forEach(i => {
        map[i.dishId] = i.quantity;
      });

      setCart(map);
      return;
    }

    
    const res = await fetch(`http://localhost:8083/api/cart/${sessionId}`);
    const data = await res.json();

    const map = {};
    data.forEach(item => {
      map[item.dishId] = item.quantity;
    });

    setCart(map);
  };


  useEffect(() => {
    loadMenu();
    loadCart();
  }, [slug]);

  

  const handleQuantityChange = async (dishId, title, price, quantity) => {

    
    if (isAdminMode) {

      
      const res = await fetch(`http://localhost:8084/api/admin/bookings/${bookingId}`);
      const booking = await res.json();

      const items = booking.items
        .map(i =>
          i.dishId === dishId
            ? { dishId, quantity }
            : { dishId: i.dishId, quantity: i.quantity }
        )
        .filter(i => i.quantity > 0);

      
      if (!items.find(i => i.dishId === dishId) && quantity > 0) {
        items.push({ dishId, quantity });
      }

      await fetch(`http://localhost:8084/api/admin/bookings/${bookingId}/items`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items })
      });

      loadCart();
      return;
    }

    
    if (quantity <= 0) {
      await fetch(`http://localhost:8083/api/cart/${sessionId}/remove/${dishId}`, {
        method: "DELETE"
      });
    } else {
      await fetch(
        `http://localhost:8083/api/cart/${sessionId}/set?dishId=${dishId}&title=${encodeURIComponent(
          title
        )}&price=${price}&quantity=${quantity}`,
        { method: "POST" }
      );
    }

    loadCart();
  };



  

  const isDrinks = slug === "drinks";

  const teaList = isDrinks ? dishes.filter((d) => /чай/i.test(d.title)) : [];
  const coffeeList = isDrinks
    ? dishes.filter((d) =>
        /(эспрессо|латте|капучино|американо|раф|мокко)/i.test(d.title)
      )
    : [];
  const otherList = isDrinks
    ? dishes.filter((d) => !teaList.includes(d) && !coffeeList.includes(d))
    : [];



  return (
    <div className={`category-page ${isDrinks ? "drinks-layout" : ""}`}>
      <h2 className="category-title">
        {isAdminMode ? "Добавить блюдо в заказ" : "Меню"}
      </h2>

      {!isDrinks ? (
        dishes.map((dish) => (
          <DishCard
            key={dish.id}
            dish={dish}
            quantity={cart[dish.id] || 0}
            onChange={handleQuantityChange}
            
          />
        ))
      ) : (
        <div className="drinks-columns">
          <div className="drinks-col">
            {teaList.map((d) => (
              <DrinkRow
                key={d.id}
                drink={d}
                quantity={cart[d.id] || 0}
                onChange={handleQuantityChange}
                
              />
            ))}
          </div>

          <div className="drinks-col drinks-col--center">
            {coffeeList.map((d) => (
              <DrinkRow
                key={d.id}
                drink={d}
                quantity={cart[d.id] || 0}
                onChange={handleQuantityChange}
                
              />
            ))}
          </div>

          <div className="drinks-col">
            {otherList.map((d) => (
              <DrinkRow
                key={d.id}
                drink={d}
                quantity={cart[d.id] || 0}
                onChange={handleQuantityChange}
                
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
