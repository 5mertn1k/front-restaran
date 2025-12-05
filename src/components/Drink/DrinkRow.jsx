import { useState, useEffect } from "react";
import "./DrinkRow.css";

export default function DrinkRow({ drink, quantity, onChange }) {
  const [count, setCount] = useState(quantity);

  useEffect(() => {
    setCount(quantity);
  }, [quantity]);

  const inc = () => {
    const next = count + 1;
    setCount(next);
    onChange(drink.id, drink.title, drink.price, next);
  };

  const dec = () => {
    const next = Math.max(0, count - 1);
    setCount(next);
    onChange(drink.id, drink.title, drink.price, next);
  };

  return (
    <div className="drink-row">
      <span>{drink.title}</span>

      {count === 0 ? (
        <button className="drink-price" onClick={inc}>
          {drink.price} ₽
        </button>
      ) : (
        <div className="drink-counter">
          <button onClick={dec}>−</button>
          <span>{count}</span>
          <button onClick={inc}>+</button>
        </div>
      )}
    </div>
  );
}
