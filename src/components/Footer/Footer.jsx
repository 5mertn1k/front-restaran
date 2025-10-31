import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-col">
        <h4 className="tof">часы работы</h4>
        <p className="fot">пн-чт 8:00-23:00<br />пт-вс 8:00-2:00</p>
      </div>

      <div className="footer-col">
        <h4 className="tof">контакты</h4>
        <p className="fot">г. Пермь, ул. Петровавловская, 40<br />8(342)-325-55-95</p>
      </div>

      <div className="footer-col">
        <h4 className="tof">социальные сети</h4>
        <p className="fot">
          <a href="https://vk.com/LaVitaItaliana" target="_blank" rel="noopener noreferrer">
            vk.com/LaVitaItaliana
          </a>
          <br />
          <a href="https://t.me/LaVitaItaliana" target="_blank" rel="noopener noreferrer">
            t.me/LaVitaItaliana
          </a>
        </p>
      </div>
    </footer>

  );
}
