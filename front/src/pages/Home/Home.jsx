import { Link } from 'react-router-dom';
import ejercicio from '../../../public/Home/imagen5.png';
import personInfo from '../../../public/Home/personInfo.svg';
import team from '../../../public/Home/team.svg';
import aliado1 from '../../../public/Home/aliado1.svg';
import aliado2 from '../../../public/Home/aliado2.svg';
import aliado3 from '../../../public/Home/aliado3.svg';
import aliado4 from '../../../public/Home/aliado4.svg';
import aliado5 from '../../../public/Home/aliado5.svg';

//STLYE
import style from './Home.module.css';
import CardClase from '../../components/cardsClases/CardClase';
import { actividades } from '../../utils/const';

const Home = () => {
  const firstThreeActividades = actividades.slice(0, 3);
  return (
    <div className={style.container}>
      <section className={style.heroSection}>
        <img src={ejercicio} alt="ejercicio" className={style.image} />
        <div className={style.title}>
          <Link to="/membresia" className={style.item}>
            Únete a Nosotros
          </Link>
          <p>Explora Nuestros Planes</p>
        </div>
      </section>

      <section className={style.sectionInfo}>
        <div className={style.imageContainer}>
          <picture>
            <img src={personInfo} alt="person" className={style.image} />
          </picture>
        </div>
        <div className={style.content}>
          <div className={style.contentTitle}>
            <h3>
              ¡Transforma tu vida con <span>GYMFit!</span>
            </h3>
          </div>

          <p>
            En nuestro gimnasio, encontrarás un espacio diseñado para ayudarte a
            alcanzar tus metas de salud y fitness. Con instalaciones modernas,
            equipos de última generación y un equipo de entrenadores
            certificados, te ofrecemos un ambiente motivador y profesional. Ya
            sea que estés comenzando tu viaje de fitness o seas un atleta
            experimentado, tenemos programas y clases que se adaptan a tus
            necesidades. Únete a nuestra comunidad y descubre cómo podemos
            apoyarte para lograr una vida más saludable y activa. ¡Ven y forma
            parte de la familia GYMFit hoy mismo!
          </p>
          <div className={style.contentButton}>
            <button>INICIAR AHORA</button>
          </div>
        </div>
      </section>

      <section className={style.sectionClase}>
        <h3 className={style.titleClase}>Conoce nuestras clases</h3>
        <div className={style.cardContainer}>
          {firstThreeActividades.map((card, index) => (
            <Link to="/actividades" key={index}>
              <CardClase
                image={card.image}
                title={card.title}
                content={card.info}
              />
            </Link>
          ))}
        </div>
      </section>

      <section className={style.sectionTeam}>
        <h3>Nuestro Team</h3>
        <picture className={style.pictureTeam}>
          <img className={style.imageTeam} src={team} alt="team" />
        </picture>

        <div className={style.descripTeam}>
          <p>
            En Gymfit, contamos con un equipo de coaches altamente cualificados
            y comprometidos con tu éxito. Cada entrenador aporta una experiencia
            sólida y un enfoque personalizado para ayudarte a alcanzar tus metas
            de manera efectiva y segura. Con un profundo conocimiento en
            fitness, nutrición y bienestar, nuestros coaches están dedicados a
            ofrecerte una orientación experta y motivadora. Únete a nosotros y
            descubre cómo nuestro equipo puede optimizar tu entrenamiento y
            maximizar tus resultados.
          </p>
        </div>
      </section>

      <section className={style.sectionAliados}>
        <h3>Nuestros Aliados</h3>
        <div className={style.contAliados}>
          <img src={aliado1} alt="empresas aliadas" />
          <img src={aliado2} alt="empresas aliadas" />
          <img src={aliado3} alt="empresas aliadas" />
          <img src={aliado4} alt="empresas aliadas" />
          <img src={aliado5} alt="empresas aliadas" />
        </div>
      </section>
    </div>
  );
};

export default Home;
