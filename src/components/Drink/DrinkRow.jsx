import { useState, useEffect } from "react";
import "./DrinkRow.css";

export default function DrinkRow({ drink, quantity, onChange }) {
  const [count, setCount] = useState(quantity);

  // если quantity изменилось извне — обновляем локальный count
  useEffect(() => {
    setCount(quantity);
  }, [quantity]);

  // отправляем изменения наверх
  useEffect(() => {
    if (onChange) onChange(drink.id, count);
  }, [count]);

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
