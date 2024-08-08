import React, { useState, useEffect } from 'react';
import axios from 'axios';
import style from './Activities.module.css';
import CardActivity from '../../components/cardsActivities/CardActivity';
import { urlProduction } from '../../utils/data';

const Activities = () => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await axios.get(`${urlProduction}/classes`);
        setActivities(response.data);
      } catch (error) {
        console.error('Error fetching activities:', error);
      }
    };

    fetchActivities();
  }, []);

  return (
    <div className={style.container}>
      <div className={style.title}>
        <h1>CLASES</h1>
      </div>
      <div className={style.grid}>
        {activities.map((actividad) => (
          <CardActivity
            key={actividad.id}
            title={actividad.name}
            info={actividad.description}
            day={actividad.day}
            capacity={actividad.capacity}
            start_time={actividad.start_time}
            id={actividad.id}
            image={actividad.image} // Cambia esto por la ruta correcta de las imágenes
          />
        ))}
      </div>
    </div>
  );
};

export default Activities;
