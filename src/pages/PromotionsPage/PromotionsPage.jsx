import "./PromotionsPage.css";
import promo1 from "../../assets/promo1.svg";
import promo2 from "../../assets/promo2.svg";
import promo3 from "../../assets/promo3.svg";

export default function PromotionsPage() {
  const promotions = [
    {
      title: "Комплимент от шефа в день рождения",
      img: promo1,
    },
    {
      title: "Бокал вина к пасте по понедельникам",
      img: promo2,
    },
    {
      title: "Скидка 10% по будням с 11:00 до 14:00",
      img: promo3,
    },
  ];

  return (
    <div className="promotions-page fullscreen-page">
      <div className="promotions-grid">
        {promotions.map((promo) => (
          <div key={promo.title} className="promo-card">
            <h3 className="promo-title">{promo.title}</h3>
            <img src={promo.img} alt={promo.title} />
          </div>
        ))}
      </div>
    </div>
  );
}