import boxeo from '../../public/activities/boxeo.jpg';
import ciclismo from '../../public/activities/ciclismo.webp';
import crossfit from '../../public/activities/crossfit.jpg';
import funcional from '../../public/activities/funcional.jpg';
import natacion from '../../public/activities/natacion.jpg';
import pilates from '../../public/activities/pilates.webp';
import yoga from '../../public/activities/yoga.jpg';
import zumba from '../../public/activities/zumba.jpg';

export const clasesGym = [
  {
    image: 'https://example.com/image1.jpg',
    title: 'Clase 1',
    content: 'Contenido de la primera clase',
  },
  {
    image: 'https://example.com/image2.jpg',
    title: 'Clase 2',
    content: 'Contenido de la segunda clase',
  },
  {
    image: 'https://example.com/image3.jpg',
    title: 'Clase 3',
    content: 'Contenido de la tercera clase',
  },
  // Añade más objetos si es necesario
];

export const membresias = [
  {
    title: 'Plan Básico',
    price: '50',
    listado: [
      'Acceso a las instalaciones del gimnasio',
      '1 clase grupal por semana',
      'Cancelación flexible',
    ],
  },
  {
    title: 'Plan Avanzado',
    price: '100',
    listado: [
      'Acceso a las instalaciones del gimnasio',
      '3 clases grupales por semana',
      '1 clase individual por MessageChannel',
      'Cancelación flexible',
    ],
  },
  {
    title: 'Plan Premium',
    price: '200',
    listado: [
      'Acceso a las instalaciones del gimnasio',
      '5 clases grupales por semana',
      '3 clases individuales por mes',
      'Sesiones de entrenamiento personal',
      'Cancelación flexible',
    ],
  },
];

export const actividades = [
  {
    image: boxeo,
    title: 'Boxeo',
    info: 'Información de clase',
    disponibilidad: 'Disponibilidad: N',
  },
  {
    image: ciclismo,
    title: 'ciclismo',
    info: 'Información de clase',
    disponibilidad: 'Disponibilidad: N',
  },
  {
    image: crossfit,
    title: 'crossfit',
    info: 'Información de clase',
    disponibilidad: 'Disponibilidad: N',
  },
  {
    image: funcional,
    title: 'funcional',
    info: 'Información de clase',
    disponibilidad: 'Disponibilidad: N',
  },
  {
    image: natacion,
    title: 'natacion',
    info: 'Información de clase',
    disponibilidad: 'Disponibilidad: N',
  },
  {
    image: pilates,
    title: 'pilates',
    info: 'Información de clase',
    disponibilidad: 'Disponibilidad: N',
  },
  {
    image: yoga,
    title: 'yoga',
    info: 'Información de clase',
    disponibilidad: 'Disponibilidad: N',
  },
  {
    image: zumba,
    title: 'zumba',
    info: 'Información de clase',
    disponibilidad: 'Disponibilidad: N',
  },
];

export const users = [
  {
    id: '0001',
    email: 'user1@example.com',
    password: 'password1',
    name: 'User',
    last_name: 'One',
    phone_number: '123456789',
    address: 'Address 1',
    birth_date: '1990-01-01',
    role: 'admin',
    classes: [
      {
        name: 'Yoga',
        date: '2024-08-01',
        startTime: '08:00',
        endTime: '09:00',
      },
      {
        name: 'Pilates',
        date: '2024-08-02',
        startTime: '10:00',
        endTime: '11:00',
      },
    ],
  },
  {
    id: '0002',
    email: 'user2@example.com',
    password: 'password2',
    name: 'User',
    last_name: 'Two',
    phone_number: '987654321',
    address: 'Address 2',
    birth_date: '1985-05-05',
    role: 'member',
    classes: [
      {
        name: 'Crossfit',
        date: '2024-08-03',
        startTime: '12:00',
        endTime: '13:00',
      },
      {
        name: 'Boxing',
        date: '2024-08-04',
        startTime: '14:00',
        endTime: '15:00',
      },
    ],
  },
];
