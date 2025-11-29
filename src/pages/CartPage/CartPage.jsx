import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CartPage.css";
import { getSessionId } from "../../utils/session";

export default function CartPage() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();
  const sessionId = getSessionId();

  const loadCart = async () => {
    try {
      const res = await fetch(`http://localhost:8083/api/cart/${sessionId}`);
      if (!res.ok) throw new Error("Ошибка загрузки корзины");

      const data = await res.json();
      setItems(data);
    } catch (err) {
      console.error("Ошибка загрузки корзины:", err);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  const updateQuantity = async (dishId, newQty) => {
  try {
    const item = items.find(i => i.dishId === dishId);

    if (!item) {
      console.error("Не найден элемент корзины с dishId =", dishId);
      return;
    }

    if (newQty < 1) {
      await fetch(
        `http://localhost:8083/api/cart/${sessionId}/remove/${dishId}`,
        { method: "DELETE" }
      );
    } else {
      await fetch(
        `http://localhost:8083/api/cart/${sessionId}/set?dishId=${dishId}&title=${encodeURIComponent(
          item.title
        )}&price=${item.price}&quantity=${newQty}`,
        { method: "POST" }
      );
    }

    loadCart();
  } catch (e) {
    console.error("Ошибка обновления корзины:", e);
  }
};



  const clearCart = async () => {
    try {
      await fetch(`http://localhost:8083/api/cart/${sessionId}/clear`, {
        method: "DELETE",
      });

      setItems([]);
    } catch (e) {
      console.error("Ошибка очистки корзины:", e);
    }
  };

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="cart-page">
      {items.length === 0 ? (
        <p className="pusto">Корзина пуста(((</p>
      ) : (
        <div className="cart-content">
          <div className="cart-items">
            {items.map((item) => (
              <div key={item.id} className="cart-item">
                <strong className="title">{item.title}</strong>

                <div className="rightside">
                  <span className="cart-item-price">{item.price * item.quantity} ₽</span>

                  <div className="cart-quantity-controls">
                    <button onClick={() => updateQuantity(item.dishId, item.quantity - 1)}>−</button>
                    <span className="cena">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.dishId, item.quantity + 1)}>+</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-total">
            <div onClick={clearCart} className="cart-clear-btn">
              Очистить корзину
            </div>

            <div className="itog">
              Итог: <strong>{total} ₽</strong>
              
            <button
              className="cart-checkout-btn"
              onClick={() => navigate("/booking", { state: { total } })}
            >
              ПЕРЕЙТИ К ОФОРМЛЕНИЮ
            </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
