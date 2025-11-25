import { useState, useEffect } from "react";
import "./DishCard.css";

export default function DishCard({ dish,quantity, onChange }) {
  const [count, setCount] = useState(quantity);

  useEffect(() => {
    setCount(quantity);
  }, [quantity]);

  useEffect(() => {
    onChange(dish.id, count);
  }, [count]);

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
          <button className="price-btn" onClick={() => setCount(1)}>
            {dish.price} ₽
          </button>
        ) : (
          <div className="counter">
            <button onClick={() => setCount(Math.max(0, count - 1))} >-</button>
            <span className="count">{count}</span>
            <button onClick={() => setCount(count + 1)} >+</button>
          </div>
          )}
      </div>

    </div>
  );
}
