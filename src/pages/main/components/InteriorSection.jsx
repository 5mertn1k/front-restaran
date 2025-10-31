import "./InteriorSection.css";
import int1 from "../../../assets/int1.svg";
import int2 from "../../../assets/int2.svg";

export default function InteriorSection() {
  return (
    <section className="interior">
      <h3>ИНТЕРЬЕР</h3>
      <p>
        Интерьер в стиле траттории: тёплое дерево, мягкий свет, живая музыка и
        вина из разных регионов Италии.
      </p>
      <div className="interior-images">
        <img src={int1} alt="Интерьер 1" />
        <img src={int2} alt="Интерьер 2" />
      </div>
    </section>
  );
}
