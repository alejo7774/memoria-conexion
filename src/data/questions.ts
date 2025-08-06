import type { Question } from '../types';

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
  },
  { 
    id: 11, 
    text: "¿Cuál es la herramienta de trabajo que más te ha sorprendido?" 
  },
  { 
    id: 12, 
    text: "¿Qué canción te da energía para un día productivo?" 
  },
  { 
    id: 13, 
    text: "Si tuvieras que describir tu trabajo con una película, ¿cuál sería?" 
  },
  { 
    id: 14, 
    text: "¿Cuál es el proyecto más interesante en el que has trabajado?" 
  },
  { 
    id: 15, 
    text: "¿Qué es lo que más valoras en un equipo de trabajo?" 
  },
  { 
    id: 16, 
    text: "¿Cuál es tu ‘snack’ de oficina preferido?" 
  },
  { 
    id: 17, 
    text: "¿Qué es lo primero que haces al empezar tu jornada laboral?" 
  },
  { 
    id: 18, 
    text: "¿Qué lección importante has aprendido de un error en el trabajo?" 
  },
  { 
    id: 19, 
    text: "Si pudieras cambiar algo de tu rutina de trabajo, ¿qué sería?" 
  },
  { 
    id: 20, 
    text: "¿Cuál es tu objetivo principal para esta semana?" 
  },
  {
    id: 21,
    text: "Si pudieras tener una banda sonora para tu día de trabajo, ¿qué canciones incluiría?"
  },
  {
    id: 22,
    text: "¿Cuál es el hábito más productivo que has desarrollado?"
  },
  {
    id: 23,
    text: "Describe tu espacio de trabajo ideal en tres palabras."
  },
  {
    id: 24,
    text: "¿Qué es algo que tus compañeros de equipo no saben sobre ti?"
  },
  {
    id: 25,
    text: "Si tuvieras que enseñar algo en 5 minutos, ¿qué enseñarías?"
  },
  {
    id: 26,
    text: "¿Cuál es tu forma favorita de celebrar un logro en el trabajo?"
  },
  {
    id: 27,
    text: "¿Qué libro o podcast ha influido más en tu vida profesional?"
  },
  {
    id: 28,
    text: "Si pudieras automatizar una tarea de tu trabajo, ¿cuál sería?"
  }
];

export const getRandomQuestion = (): Question | null => {
  if (icebreakers.length === 0) {
    return null;
  }
  const randomIndex = Math.floor(Math.random() * icebreakers.length);
  return icebreakers[randomIndex];
};