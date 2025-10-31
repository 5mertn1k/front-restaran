import { Link } from "react-router-dom";
import "./HeroSection.css";
import main from "../../../assets/main.svg";

export default function HeroSection() {
  return (
    <section className="hero">
      <div className="hero-left">
        <img src={main} alt="Интерьер ресторана" className="hero-bg" />
      </div>

      <div className="hero-overlay">
        <h2 className="hero-title">La Vita Italiana</h2>
        <p className="hero-subtitle">РЕСТОРАН ИТАЛЬЯНСКОЙ КУХНИ</p>

        <div className="hero-actions">
          <Link to="/menu" className="btn btn-dark ">
            Меню
          </Link>

          
          <Link to="/booking" className="btn btn-light ">
            Забронировать стол
          </Link>
        </div>
      </div>
    </section>
  );
}
