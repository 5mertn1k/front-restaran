import "./AboutSection.css";
import aboutImg from "../../../assets/about.svg"; 

export default function AboutSection() {
  return (
    <section className="about">
      <div className="about-text">
        <h3>О РЕСТОРАНЕ</h3>
        <p>
          "La Vita Italiana" — это аутентичный итальянский ресторан, где
          классические рецепты сочетаются с современным подходом к подаче. Мы
          используем только свежие продукты: пасту собственного приготовления,
          сыры и колбасы от локальных фермеров, оливковое масло прямого отжима
          из Тосканы и ароматные травы.
        </p>
      </div>
      <div className="about-image">
        <img src={aboutImg} alt="Интерьер ресторана" />
      </div>
    </section>
  );
}
