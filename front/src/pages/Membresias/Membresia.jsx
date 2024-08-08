import style from './Membresia.module.css';
import CardMembresia from '../../components/cardsMembresias/CardMembresia';
import { membresias } from '../../utils/const';

const Membresia = () => {
  return (
    <div className={style.containermemb}>
      {membresias.map((membresia, index) => (
        <CardMembresia
          key={index}
          title={membresia.title}
          price={membresia.price}
          listado={membresia.listado}
        />
      ))}
    </div>
  );
};

export default Membresia;
