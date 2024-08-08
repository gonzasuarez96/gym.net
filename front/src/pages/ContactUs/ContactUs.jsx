import style from './ContactUs.module.css';
import FormContact from './formContact/FormContact';
import womanPoster from '../../../public/contactUs/womanPoster.svg';
import horario from '../../../public/contactUs/horario.svg';

const ContactUs = () => {
  return (
    <div className={style.container}>
      <div className={style.title}>
        <h1>Contáctanos</h1>
      </div>

      <section className={style.sectionInfo}>
        <div className={style.imageContainer}>
          <picture>
            <img src={womanPoster} alt="person" className={style.image} />
          </picture>
        </div>
        <div>
          <FormContact />
          <div className={style.horario}>
            <h4>
              Nuestros <span>horarios</span>
            </h4>
            <h5>LUNES A VIERNES</h5>
            <p>5:00 a.m. a 10:00 p.m.</p>
            <h5>SABADOS:</h5>
            <p>7:00 a.m. a 9:00 p.m.</p>
            <h5>DOMINGOS Y FESTIVOS:</h5>
            <p>8:00 a.m. a 5:00 p.m.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
