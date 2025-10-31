import { useEffect, useState } from "react";

export default function CartPage() {
  const [items, setItems] = useState([]);

  let user = JSON.parse(localStorage.getItem("user"));
  let sessionId;

  if (user) {
    // Авторизованный пользователь
    sessionId = user.username;
  } else {
    // Неавторизованный — генерируем (или берём уже созданный) гостевой ID
    const guestId = localStorage.getItem("guestId");
    if (guestId) {
      sessionId = guestId;
    } else {
      const newGuestId = "guest-" + Math.random().toString(36).substring(2, 9);
      localStorage.setItem("guestId", newGuestId);
      sessionId = newGuestId;
    }
  }


  // загрузка корзины с бэка
  const loadCart = async () => {
    try {
      const res = await fetch(`http://localhost:8080/api/cart/${sessionId}`);
      if (!res.ok) throw new Error("Ошибка загрузки корзины");
      const data = await res.json();
      console.log("Корзина с сервера:", data);
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
    if (newQty < 1) {
      await fetch(`http://localhost:8080/api/cart/${sessionId}/remove/${dishId}`, {
        method: "DELETE",
      });
      // 🧹 удаляем из localStorage
      const savedCart = JSON.parse(localStorage.getItem("cart") || "{}");
      delete savedCart[dishId];
      localStorage.setItem("cart", JSON.stringify(savedCart));
    } else {
      await fetch(`http://localhost:8080/api/cart/${sessionId}/set?dishId=${dishId}&quantity=${newQty}`, {
        method: "POST",
      });
      // ✏️ обновляем localStorage
      const savedCart = JSON.parse(localStorage.getItem("cart") || "{}");
      savedCart[dishId] = newQty;
      localStorage.setItem("cart", JSON.stringify(savedCart));
    }
    loadCart();
  } catch (e) {
    console.error("Ошибка обновления корзины:", e);
  }
};

  // очистить корзину
  const clearCart = async () => {
    try {
      await fetch(`http://localhost:8080/api/cart/${sessionId}/clear`, {
        method: "DELETE",
      });

      localStorage.removeItem("cart"); // чистим localStorage
      setItems([]); // очищаем фронтовый стейт
    } catch (e) {
      console.error("Ошибка очистки корзины:", e);
    }
  };

  return (
    <div className="cart-page" style={{ padding: "20px", color: "white" }}>
      <h1>Корзина</h1>

      {items.length === 0 ? (
        <p>Корзина пуста</p>
      ) : (
        <>
          <button
            onClick={clearCart}
            style={{
              marginBottom: "15px",
              padding: "8px 15px",
              backgroundColor: "red",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Очистить корзину
          </button>

          <ul>
            {items.map((item) => (
              <li
                key={item.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "10px",
                  padding: "10px",
                  border: "1px solid gray",
                  borderRadius: "8px",
                }}
              >
                <div>
                  <strong>{item.title}</strong> – {item.price} ₽ <br />
                  Кол-во: {item.quantity}
                </div>
                <div>
                  <button onClick={() => updateQuantity(item.dishId, item.quantity - 1)}>
                    -
                  </button>
                  <button
                    onClick={() => updateQuantity(item.dishId, item.quantity + 1)}
                    style={{ marginLeft: "5px" }}
                  >
                    +
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
