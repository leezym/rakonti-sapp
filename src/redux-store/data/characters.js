/**
 * @author Martín Vladimir Alonso Sierra Galvis 
 * @version 1.0.1
 */

export const personalities = [{
  id: 1,
  name: 'Abogado', 
  description: `Tranquilo, inspirador e idealista. Visión más humana: talento 
    para el lenguaje cálido y sensible, más que lógica pura y hechos; gusto por 
    ayudar a los otros con su propósito de vida y toman mendidas concretas para 
    lograr sus objetivos. Guían su actuar a partir de sus principios, con 
    creatividad, imaginación, convicción y sensibilidad para crear un 
    equilibrio.`, 
  url: 'images/lawyer.png', 
  strengths: [
    'Creativos para resolver desafíos humanos', 
    'Excelentes consejeros y asesores', 
    'Oradores cálidos y apasionados', 
    'Decisivos', 
    'Llevan la idea a la realidad'
  ], 
  weaknesses: [
    'Responden fuerte ante la crítica de los demás', 
    'Reserva extrema de su vida privada', 
    'Desgaste personal al no equilibrar ideales con la realidad cotidiana', 
    'Demasiado perfeccionistas', 
    'Abandonan rápidamente al creer que existe algo mejor'
  ]
}, {
  id: 2, 
  name: 'Activista', 
  description: `Encantador, independiente, enérgico y compasivo. Son de 
    espíritu libre, entusiastas, empáticos, creativos, sociables y se guían 
    por sus principios; siempre encuentran una razón para sonreír. Moldeados 
    por su intuición. Creen que todos deberían tomarse el tiempo para reconocer 
    y expresar sus sentimientos.`, 
  strengths: [
    'Dispuestos a salir de sus zona de confort para explorar', 
    'Observadores en detalle', 
    'Enérgico y entusiasta', 
    'Excelentes habilidades de comunicación'
  ], 
  weaknesses: [
    'Dificultad para hacer seguimiento a sus proyectos', 
    'Poco interés ante tareas rutinarias y administrativas', 
    'Se estresan facílmente cuando no pueden ayudar', 
    'Explosión emocional cuando están bajo estrés, crítica o conflicto'
  ]
}, {
  id: 3, 
  name: 'Animador', 
  description: `Personas espontáneas, curiosas, enérgicas y entusiastas: la 
    vida nunca es aburrida a su alrededor. Disfrutan de las cosas más simples, 
    y no hay una mayor alegría para ellos que eimplemente divertirse con un 
    buen grupo de amigos. No tienen miedo de cambiar su entorno para reflejar 
    su estilo personal. Son observadores y muy sensibles a las emociones de 
    los demás.`, 
  url: 'images/entertainer.png',  
  strengths: [
    'Audaces', 
    'Gusto por experimentar nuevos estilos', 
    'Prácticos', 
    'Viven el presente, observadores', 
    'Poseen excelentes habilidades de comunicación'
  ], 
  weaknesses: [
    'Aversión al conflicto', 
    'Se les dificulta gestionar las críticas que los demás les manifiestan', 
    'Tienden a aburrirse con facilidad', 
    'Dificultad para planificar a largo plazo'
  ]
}, {
  id: 4, 
  name: 'Arquitecto', 
  description: `Pensadores curiosos y estratégicos, con un plan para todo. 
    Se guían por la lógica y los hechos. Les gusta su privacidad, son serios 
    y prefieren diseñar y llevar a cabo planes efectivos. No les gustan las 
    reglas, restricciones y tradiciones. Para ellos, todo debe estar sujeto 
    a preguntas y revisiones "¿Tienes sentido?" "¿Esto va a funcionar?".`, 
  url: 'images/architech.png', 
  strengths: [
    'Alta confianza en sí mismos', 
    'Independientes', 
    'Dedicados a su trabajo', 
    'Excelentes planificando', 
    'Abiertos a nuevas ideas que se discutan bien'
  ],
  weaknesses: [
    'Arrogantes',
    'Descalifican opiniones poco racionales',
    'Reaccionan a obedecer reglas y normal sin comprender el por qué de estas',
    'Demasiado analíticos'
  ]
}, {
  id: 5, 
  name: 'Aventurero', 
  description: `Flexible y encantador, siempre listo para explorar y experimentar 
    algo nuevo. Disfrutan salirse de lo convencional. Viven en un mundo colorido y 
    sensual, inspirado en las conexiones con personas e ideas. Predomina el gusto 
    por los deportes extremos y los comportamientos de riesgo. Son sensibles a los 
    sentimientos de los demás y valoran la armonía.`, 
  url: 'images/adventurer.png', 
  strengths: [
    'Sensibilidad frente a los demás', 
    'Actitud relajada y cálida', 
    'Apasionadas por lo que hacen', 
    'Artísticos, creativos y perspicaces'
  ], 
  weaknesses: [
    'Ferozmente independientes', 
    'Rechazan tradiciones y estrictas reglas', 
    'No se comprometen con planes a largo plazo', 
    'Demasiado competitivos', 
    'Provocan frustración cuando pierden', 
    'Tienden a estresarse con facilidad'
  ]
}, {
  id: 6, 
  name: 'Comandante', 
  description: `Líderes audaces, imaginativos y decididos, que siempre encuentran el 
    camino o hacen uno. Disfrutan el desafío. Encarnan los dones del carisma, la confianza, 
    autoridad y reúne a las multitudes detrás de un objetivo común. Alto nivel de lógica 
    y racionalidad. Habilidad particular para señalar las fallas de los demás con un 
    grado de insensibilidad.`, 
  url: 'images/commander.png', 
  strengths: [
    'Carismáticos e inspiradores', 
    'No se rinden cuando la situación se torna difícil', 
    'Buscan la máxima eficiencia', 
    'Confían plenamente en sus habilidades', 
    'Tienen una visión estratégica', 
    'Excelencia a largo plazo'
  ], 
  weaknesses: [
    'Tercos y dominantes', 
    'Intolerantes ante cualquier idea que los distraiga del objetivo', 
    'Arrogantes e impacientes', 
    'Dificultad para gestionar sus emociones'
  ]
}, {
  id: 7, 
  name: 'Cónsul', 
  description: `Personas muy cariñosas, sociables y populares, siempre dispuestas 
    a ayudar. Disfrutan escuchando sobre las relaciones y actividades de los demás, 
    recordando pequeños detalles y siempre listos para hablar con calidez y sensibilidad.
    Si hay tensión en el grupo, tratan de restaurar la armonía y la estabilidad.`, 
  url: 'images/consul.png', 
  strengths: [
    'Fuerte sentido del deber', 
    'Excelentes destrezas para gestionar tareas y mantener rutinas', 
    'Mediadores y buscan armonía', 
    'Facilidad para conectarse con los demás'
  ], 
  weaknesses: [
    'Alta preocupación por lo que los otros esperan y aceptan', 
    'Reacios a innovar', 
    'Descuidan necesidades propias con tal de ayudar a los demás', 
    'Buscan constantemente ser reconocidos para asegurar su valía'
  ]
}, {
  id: 8, 
  name: 'Defensor', 
  description: `Protectores, dedicados y cálidos, siempre dispuestos a defender 
    a sus seres queridos. Sensibles, tienen excelentes habilidades analíticas e 
    inter personales, son receptivos al cambio y a las nuevas ideas. Procuran ir 
    más allá haciendo lo posible por superar expectativas y satisfacer a los demás.`, 
  url: 'images/defender.png', 
  strengths: [
    'Confiables y pacientes', 
    'Apoyo incondicional a otros', 
    'Prácticos y entusiastas', 
    'Leales y dedicados al trabajo'
  ], 
  weaknesses: [
    'Asumen personalmente críticas y conflictos', 
    'Sobrecarga personal a fin de cumplir las expectativas de los demás', 
    'Se privan la expresión de sus sentimientos y emociones', 
    'Reacios al cambio'
  ]
}, {
  id: 9, 
  name: 'Ejecutivo', 
  description: `Excelentes administradores, insuperables en la gestión de cosas 
    o personas. Son valoradas por sus claros consejos y orientación. Procuran 
    trabajar por reunir a las personas, entorno familiar y comunidades. Lideran 
    con el ejemplo, demostrando dedicación y honestidad decidida y un rechazo 
    total de la deshonestidad, la pereza y la trampa.`, 
  url: 'images/executive.png', 
  strengths: [
    'Dedicados y disciplinados', 
    'Facilidad para construir reglas, normas y roles claros', 
    'Directos y honestos', 
    'Distribuyen con facilidad tareas y responsabilidades a los demás'
  ], 
  weaknesses: [
    'Se incomodan en situaciones poco convencionales', 
    'Demasiado críticos', 
    'Alta preocupación por la opinión pública', 
    'Dificultad para expresar y gestionar emociones'
  ]
}, {
  id: 10, 
  name: 'Emprendedor', 
  description: `Personas enérgicas y muy perceptivas, realmente disfrutab de vivir 
    al límite. Están llenos de pasión, complementados por una mente racional, aunque 
    a veces distraída. Inspiradores, convincentes y coloridos, son líderes de grupos 
    naturales, empujando a todos por el camino menos transitado, trayendo vida y 
    emoción a donde quiera que vayan.`, 
  strengths: [
    'Pensadores rápidos, originales, enérgicos y carismáticos', 
    'Analizan problemas desde todos los ángulos', 
    'Descartan con facilidad métodos y sistemas preexistentes', 
    'Sin reparos para dedicar día y noche a encontrar una solución'
  ], 
  weaknesses: [
    'Impacientes', 
    'Tiene dificultad para convivir en entornos muy estructurados', 
    'Dificultad para expresar y gestionar sus sentimientos', 
    'No piensan en consecuencias a largo plazo'
  ]
}, {
  id: 11, 
  name: 'Innovador', 
  description: `Pensador, lógico, curioso, no se resiste a los desafíos 
    intelectuales. Su amplia base de conocimiento acumulado y la capacidad de 
    conectar ideas dispares para probar sus puntos, les permite triunfar en los 
    debates intelectuales. Buscan conocimiento atacando y defendiendo una idea 
    desde todos los puntos de vista.`, 
  url: 'images/innovator.png', 
  strengths: [
    'Pensadores rápidos, originales, enérgicos y carismáticos', 
    'Analizan problemas desde todos los ángulos', 
    'Descartan con facilidad métodos y sistemas preexistentes', 
    'Sin reparos para dedicar día y noche a encontrar una solución'
  ], 
  weaknesses: [
    'Demasiado argumentativos', 
    'Insensibles e intolerantes', 
    'Puntos emocionales no son válidos en los debates', 
    'No gustan de asuntos prácticos', 
    'Dificultad para concentrarse por alta frecuencia de pensamientos'
  ]
}, {
  id: 12, 
  name: 'Lógico', 
  description: `Orientados por la lógica, son inventores con una sed insaciable 
    de conocimiento. Entusiastas y capaces de detectar un problema, profundizar 
    en los infinitos factores y detalles que lo constituyen y desarrolar una 
    solución única y viable. Se preocupan por la originalidad y los resultados 
    eficientes.`, 
  url: 'images/logician.png', 
  strengths: [
    'Innovadores', 
    'Excelentes pensadores abstractos', 
    'Receptivos a teorías alternativas cuando están respaldas por lógica y hechos', 
    'Honestos y directos', 
    'La verdad es el factor primordial'
  ], 
  weaknesses: [
    'Tímidos, reservados e insensibles', 
    'No atienden a lo emocional por ser irracional', 
    'Dificultad para que sus ideas, demasiado abstractas, sean entendidas', 
    'Tienden a eludir las reglas'
  ]
}, {
  id: 13, 
  name: 'Logista', 
  description: `Individuos autónomos, prácticos y orientados a los hechos. No hacen 
    suposiciones, prefieren analizar su entorno, verificar hechos y llegar a cursos 
    prácticos de acción. Pierden la paciencia cuando olvidan detalles claves. Cumplen 
    con sus obligaciones a toda costa y tienen poca tolerancia cuando las otras 
    personas no cumplen lo que dicen.`, 
  url: 'images/logistician.png', 
  strengths: [
    'Honestos y directos', 
    'Carácter fuerte y obediente', 
    'Eficaces en sus actividades', 
    'Prácticos y responsables'
  ], 
  weaknesses: [
    'Tercos, se resisten a cualquier idea si no se respalda por hechos', 
    'Muy críticos con las opiniones de los demás', 
    'Siguen al pie de la letra las reglas', 
    'Dificultad para percibir otras opciones', 
    'Sentimiento de culpa constante cuando  no cumplen con su palabra'
  ]
}, {
  id: 14, 
  name: 'Mediador', 
  description: `Personas amables y altruistas que se orientan a través de sus 
    principios. Están dispuestos a ayudar a una buena causa. Siempre buscan el 
    bien incluso en las peores personas y/o eventos, procuran encontrar diversas 
    formas para mejorar las cosas.`, 
  url: 'images/mediator.png', 
  strengths: [
    'Idealistas y optimistas por excelencia', 
    'Armonía y democracia', 
    'Observan situaciones desde perspectivas poco convencionales', 
    'Apasionados y enérgicos', 
    'Visión de largo alcance para ayudar a superar obstáculos'
  ], 
  weaknesses: [
    'Poco prácticos', 
    'Demasiado idealistas', 
    'Deseosos por querer aportar mucho más de lo que pueden', 
    'Asumen las críticas personalmente en lugar de reevaluar su posición',
    'Reservados y privados con su vida personal'
  ]
}, {
  id: 15, 
  name: 'Protagonista', 
  description: `Son personas altruistas, líderes carismáticos e inspiradores. 
    Se enorgullecen al guiar a otros a trabajar juntos para mejorar a sí mismos 
    y a su comunidad. Les resuta natural y fácil comunicarse con los demás. 
    Excelente capacidad autorreflexiva.`, 
  url: 'images/protagonist.png', 
  strengths: [
    'Tolerantes frente a opiniones dispares', 
    'Confiables y carismáticos', 
    'Afectuosos y desinteresados, siempre buscan el bien común', 
    'Líderes naturales'
  ],
  weaknesses: [
    'Demasiado sensibles', 
    'Desean reparar situaciones que no se pueden solucionar', 
    'Su autoestima fluctúa en función del cumplimiento de sus ideales', 
    'Dificultad para tomar decisiones difíciles'
  ]
}, {
  id: 16, 
  name: 'Virtuoso', 
  description: `Experimentadores audaces y prácticos, maestros de todo tipo de 
    herrramientas. Creadores naturales, se mueven de un proyecto a otro. Exploran 
    sus ideas a través de la creación. Solucionan problemas mediante ensayo y error 
    y la experiencia de primera mano. Las decisiones se enmarcan desde el realismo 
    práctico.`, 
  url: 'images/virtuoso.png', 
  strengths: [
    'Excelentes en la gestión de dificultades o momentos de crisis', 
    'Se relajan fácilmente', 
    'Prefieren no preocuparse por el futuro', 
    'Saben identificar prioridades', 
    'Flexibilidad al cambio'
  ], 
  weaknesses: [
    'Privados y reservados', 
    'Tienden a aburrirse fácilmente cuando comprenden la situación y no despierta interés', 
    'Son obtinados', 
    'Se disgustan por los compromisos a largo plazo'
  ]
}];