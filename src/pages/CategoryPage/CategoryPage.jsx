import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DishCard from "../../components/DishCard";
import DrinkRow from "../../components/Drink/DrinkRow";
import "./CategoryPage.css";

export default function CategoryPage() {
  const { slug } = useParams();
  const [dishes, setDishes] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const sessionId = user ? user.username : "guest";

  const categoryNames = {
    zakuski: "ЗАКУСКИ",
    pasta: "ПАСТА",
    mains: "ОСНОВНЫЕ БЛЮДА",
    pizza: "ПИЦЦА 32 СМ",
    desserts: "ДЕСЕРТЫ",
    drinks: "НАПИТКИ",
  };

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`/api/menu/${slug}`);
        if (!res.ok) throw new Error(`Ошибка ${res.status}`);
        const data = await res.json();
        setDishes(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error("Ошибка загрузки блюд:", e);
        setDishes([]);
      }
    };
    load();
  }, [slug]);

  const handleQuantityChange = async (dishId, quantity) => {
    try {
      if (quantity <= 0) {
        await fetch(`/api/cart/${sessionId}/remove/${dishId}`, {
          method: "DELETE",
        });
      } else {
        await fetch(
          `/api/cart/${sessionId}/set?dishId=${dishId}&quantity=${quantity}`,
          { method: "POST" }
        );
      }
    } catch (e) {
      console.error("Ошибка добавления в корзину:", e);
    }
  };

  // ----- если напитки -----
  const isDrinks = slug === "drinks";

  // сортируем напитки по категориям
  const teaList = isDrinks ? dishes.filter(d => /чай/i.test(d.title)) : [];
  const coffeeList = isDrinks
    ? dishes.filter(d => /(эспрессо|латте|капучино|американо|раф|мокко)/i.test(d.title))
    : [];
  const otherList = isDrinks
    ? dishes.filter(d => !teaList.includes(d) && !coffeeList.includes(d))
    : [];

  return (
    <div className={`category-page ${isDrinks ? "drinks-layout" : ""}`}>
      <h2 className="category-title">{categoryNames[slug] || "Меню"}</h2>

      {!isDrinks ? (
        dishes.length > 0 ? (
          dishes.map((dish) => (
            <DishCard
              key={dish.id}
              dish={dish}
              onChange={handleQuantityChange}
            />
          ))
        ) : (
          <p>Блюд в этой категории пока нет</p>
        )
      ) : (
        <div className="drinks-columns">
          <div className="drinks-col">
            {teaList.map((d) => (
              <DrinkRow key={d.id} drink={d} onChange={handleQuantityChange} />
            ))}
          </div>

          <div className="drinks-col drinks-col--center">
            {coffeeList.map((d) => (
              <DrinkRow key={d.id} drink={d} onChange={handleQuantityChange} />
            ))}
          </div>

          <div className="drinks-col">
            {otherList.map((d) => (
              <DrinkRow key={d.id} drink={d} onChange={handleQuantityChange} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
