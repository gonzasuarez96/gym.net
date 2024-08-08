import style from './CardClase.module.css';

const CardClase = ({ image, title, content }) => {
  return (
    <div className={style.cardClase}>
      <picture>
        <img src={image} alt={title} />
      </picture>
      <div>
        <h3>{title}</h3>
        <p>{content}</p>
      </div>
    </div>
  );
};

export default CardClase;
