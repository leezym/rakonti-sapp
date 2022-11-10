/**
 * @author Martín Vladimir Alonso Sierra Galvis 
 * @version 1.0.1
 */

const modes = { 
  classic: {
    id: 1,
    backgroundUrl: 'images/classic-background.jpg', 
    description: `
      En este modo serás guiado en el proceso de construcción de tu
      historia y podrás crearla a partir de las estructuras del Viaje
      del Héroe, por Christopher Vogler, o El Círculo, por Dan Harmon
      Podrás jugar con las condiciones generales de la hitoria y escoger 
      una de las opciones para construirla usando los ocho pasos de 
      Harmon o los doce pasos de Campbell.
    `,
    title: 'MODO CLÁSICO', 
    url: 'images/classic-button.png'
  }, 
  creative: {
    id: 2, 
    backgroundUrl: 'images/classic-background.jpg', 
    description: `
      En este modo podrás jugar con las condiciones generales de la
      historia y dejar tu imaginación volar para construir tu relato 
      a partir de la mezcla y fusión de las estructuras del Viaje
      del Héroe, por hristopher Vogler, y el Círculo, por Dan Harmon. 
      Estudia los ocho pasos de Harmon o los doce pasos de Campbell 
      para poder mezclar, fusionar y construir tu historia a tu gusto, 
      creando nuevos tipos de estructuras narrativas.
    `,
    title: 'MODO CREATIVO', 
    url: 'images/creative-button.png'
  }
};

export default modes;