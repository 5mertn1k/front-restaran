import { Link, useSearchParams } from "react-router-dom";
import "./MenuPage.css";

import zakuski from "../../assets/zakuski.svg";
import pasta from "../../assets/pasta.svg";
import mains from "../../assets/mains.svg";
import pizza from "../../assets/pizza.svg";
import desserts from "../../assets/desserts.svg";
import drinks from "../../assets/drinks.svg";

export default function MenuPage() {
  const [searchParams] = useSearchParams();
  const bookingId = searchParams.get("bookingId");

  const suffix = bookingId ? `?bookingId=${bookingId}` : "";

  const categories = [
    { img: zakuski, alt: "Закуски", slug: "zakuski" },
    { img: pasta, alt: "Паста", slug: "pasta" },
    { img: mains, alt: "Основные блюда", slug: "mains" },
    { img: pizza, alt: "Пицца", slug: "pizza" },
    { img: desserts, alt: "Десерты", slug: "desserts" },
    { img: drinks, alt: "Напитки", slug: "drinks" },
  ];

  return (
    <div className="menu-page">
      <div className="menu-grid">
        {categories.map((cat, index) => (
          <Link
            key={index}
            to={`/menu/${cat.slug}${suffix}`}   // ✅ ВАЖНО
            className="menu-card"
          >
            <img src={cat.img} alt={cat.alt} />
            <p>{cat.alt}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
