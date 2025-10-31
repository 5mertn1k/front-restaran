import "./ContactsPage.css";

export default function ContactsPage() {
  return (
    <section className="contacts-page">
      <div className="contacts-map">
        <iframe
          src="https://yandex.ru/map-widget/v1/?indoorLevel=1&ll=56.239765%2C58.013222&mode=whatshere&whatshere%5Bpoint%5D=56.239617%2C58.013071&whatshere%5Bzoom%5D=17&z=17.09"
          allowFullScreen={true}
        ></iframe>
      </div>

      <div className="contacts-info">
        <div className="contacts-block">
          <h3 className="contacts-title">Адрес:</h3>
          <p className="contacts-text">г. Пермь, ул. Петропавловская, 40</p>
        </div>

        <div className="contacts-block">
          <h3 className="contacts-title">Телефон:</h3>
          <p className="contacts-text">8(342)-325-55-95</p>
        </div>

        <div className="contacts-block">
          <h3 className="contacts-title">Часы работы:</h3>
          <p className="contacts-text">пн-чт 8:00–23:00</p>
          <p className="contacts-text">пт-вс 8:00–2:00</p>
        </div>

        <div className="contacts-block">
          <h3 className="contacts-title">Социальные сети:</h3>
          <a href="https://vk.com/LaVitalitaliana" className="contacts-link">
            vk.com/LaVitalitaliana
          </a>
          <a href="https://t.me/LaVitalitaliana" className="contacts-link">
            t.me/LaVitalitaliana
          </a>
        </div>
      </div>
    </section>
  );
}
