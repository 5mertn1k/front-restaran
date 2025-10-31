import { useState, useEffect } from "react";
import "./DrinkRow.css";

export default function DrinkRow({ drink, onChange }) {
  const [count, setCount] = useState(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart") || "{}");
    return savedCart[drink.id] || 0;
  });

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart") || "{}");
    if (count > 0) {
      savedCart[drink.id] = count;
    } else {
      delete savedCart[drink.id];
    }
    localStorage.setItem("cart", JSON.stringify(savedCart));

    if (onChange) onChange(drink.id, count);
  }, [count, drink.id, onChange]);

  return (
    <div className="drink-row">
      <span className="drink-title">{drink.title}</span>

      {count === 0 ? (
        <button className="drink-price" onClick={() => setCount(1)}>
          {drink.price} ₽
        </button>
      ) : (
        <div className="drink-counter">
          <button onClick={() => setCount(Math.max(0, count - 1))}>−</button>
          <span>{count}</span>
          <button onClick={() => setCount(count + 1)}>+</button>
        </div>
      )}
    </div>
  );
}
