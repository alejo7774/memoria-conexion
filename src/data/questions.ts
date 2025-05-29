import { Question } from '../types';

export const icebreakers: Question[] = [
  { 
    id: 1, 
    text: "¿Qué emoji describe mejor tu mañana?" 
  },
  { 
    id: 2, 
    text: "¿Cuál fue tu último logro personal?" 
  },
  { 
    id: 3, 
    text: "¿Qué superpoder elegirías en tu trabajo?" 
  },
  { 
    id: 4, 
    text: "¿Qué te motiva a empezar el día?" 
  },
  { 
    id: 5, 
    text: "¿De qué habilidad laboral te enorgulleces?" 
  },
  { 
    id: 6, 
    text: "¿Cuál es tu lugar favorito para trabajar fuera de la oficina?" 
  },
  { 
    id: 7, 
    text: "¿Qué actividad te ayuda a desconectar después del trabajo?" 
  },
  { 
    id: 8, 
    text: "Si pudieras aprender una nueva habilidad instantáneamente, ¿cuál sería?" 
  },
  { 
    id: 9, 
    text: "¿Cuál es el mejor consejo profesional que has recibido?" 
  },
  { 
    id: 10, 
    text: "¿Cuál es tu mayor sueño profesional?" 
  }
];

export const getRandomQuestion = (): Question => {
  const randomIndex = Math.floor(Math.random() * icebreakers.length);
  return icebreakers[randomIndex];
};