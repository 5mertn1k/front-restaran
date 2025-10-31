import { useState, useEffect } from "react";
import "./DishCard.css";

export default function DishCard({ dish, onChange }) {
  const [count, setCount] = useState(0);

  // подтягиваем сохранённое количество из localStorage
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart") || "{}");
    if (savedCart[dish.id]) {
      setCount(savedCart[dish.id]);
    }
  }, [dish.id]);

  // сохраняем в localStorage при каждом изменении
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart") || "{}");
    if (count > 0) {
      savedCart[dish.id] = count;
    } else {
      delete savedCart[dish.id];
    }
    localStorage.setItem("cart", JSON.stringify(savedCart));

    // уведомляем родителя (CategoryPage)
    if (onChange) {
      onChange(dish.id, count);
    }
  }, [count, dish.id, onChange]);

  const handleAdd = () => setCount(count + 1);
  const handleRemove = () => count > 0 && setCount(count - 1);

  return (
    <div className="dish-card">
      <div className="dish-info">
        <h3>{dish.title}</h3>
        <p>Состав: {dish.description}</p>
        <small className="call">
          КБЖУ: {dish.kcal}/{dish.proteins}/{dish.fats}/{dish.carbs}
        </small>
      </div>
      <div className="dish-actions">
        {count === 0 ? (
          <button className="price-btn" onClick={handleAdd}>
            {dish.price} ₽
          </button>
        ) : (
          <div className="counter">
            <button onClick={handleRemove} >-</button>
            <span className="count">{count}</span>
            <button onClick={handleAdd} >+</button>
          </div>
          )}
      </div>

    </div>
  );
}
