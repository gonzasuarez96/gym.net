import whatsapp from '../../../public/WhatsApp.svg';
import style from './WhaspBtn.module.css';

const WhaspBtn = () => {
  return (
    <div className={style.btnWhasp}>
      <a href="#">
        <img src={whatsapp} alt="whatspap boton" />
      </a>
    </div>
  );
};

export default WhaspBtn;
