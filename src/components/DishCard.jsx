import { useState, useEffect } from "react";
import "./DishCard.css";

export default function DishCard({ dish, quantity, onChange }) {
  const [count, setCount] = useState(quantity);

  useEffect(() => {
    setCount(quantity);
  }, [quantity]);

  const inc = () => {
    const next = count + 1;
    setCount(next);
    onChange(dish.id, dish.title, dish.price, next);
  };

  const dec = () => {
    const next = Math.max(0, count - 1);
    setCount(next);
    onChange(dish.id, dish.title, dish.price, next);
  };

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
          <button className="price-btn" onClick={inc}>
            {dish.price} ₽
          </button>
        ) : (
          <div className="counter">
            <button onClick={dec}>−</button>
            <span className="count">{count}</span>
            <button onClick={inc}>+</button>
          </div>
        )}
      </div>
    </div>
  );
}
