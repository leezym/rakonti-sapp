/**
 * @author Martín Vladimir Alonso Sierra Galvis 
 * @version 1.0.1
 */

const features = {
  genre: {
    id: 1, 
    code: 'genre', 
    name: 'Género', 
    options: [{
      id: 0, 
      name: 'Aleatorio', 
      description: 'Género aleatorio.', 
      url: 'images/genre-random.png'
    }, {
      id: 1, 
      name: 'Aventuras', 
      description: `En este género las historias reflejan un mundo heroíco de 
        combates y aventuras, y en el que suele predominar la acción y valores 
        caballerescos. Se caracteriza por héroes que recorren el mundo y salvan 
        a desvalidos de villanos.`, 
      url: 'images/genre-adventure.png'
    }, {
      id: 2, 
      name: 'Comedia', 
      description: `Son historias cercanas al género drama porque encarna situaciones 
        o conflictos de personajes pero siempre opuestas a la tragedia. Relacionado 
        casi siempre con historias con final feliz. Sátiras, situaciones cotidianas 
        se pueden representar en este género.`, 
      url: 'images/genre-comedy.png'
    }, {
      id: 3, 
      name: 'Drama', 
      description: `Se trata de historias en las que se representan episodios o 
        conflictos de la vida de los seres humanos por medio del diálogo de los 
        personajes.`, 
      url: 'images/genre-drama.png'
    }, {
      id: 4, 
      name: 'Fantasía', 
      description: `Se trata de historias llenas de elementos imaginarios y 
        poco realistas. Los eventos en una fantasía operan fuera de las leyes
        del universo real y típicamenteinvolucran elementos sobrenaturales, como 
        criaturas mágicas, extraterrestres, robots, etc.`, 
      url: 'images/genre-fantasy.png'
    }, {
      id: 5, 
      name: 'Suspenso', 
      description: `Son historias cuyo principal objetivo es mantener al espectador 
        en un estado de tensión, de lo que pueda ocurrirle a los personajes, y por 
        lo tanto atento al desarrollo del conflicto. El suspenso se puede generar 
        como resultado de un secreto que desconoce el protagonista y mantiene la 
        tensión en el espectador.`, 
      url: 'images/genre-suspense.png'
    }, {
      id: 6, 
      name: 'Terror', 
      description: `Se tratan de historias que causan miedo. En el terror se incluyen 
        criaturas que trasgreden de cierta manera las reglas o convenciones del mundo 
        diegético en que es situado. Puede también tratarse de un humano responsable 
        de los hechos que aterrorizan a la audiencia.`, 
      url: 'images/genre-terror.png'
    }]
  }, 
  plot: {
    id: 2, 
    code: 'plot', 
    name: 'Trama', 
    options: [{
      id: 0, 
      name: 'Aleatorio', 
      description: 'Trama aleatoria.', 
      url: 'images/plot-random.png' 
    }, {
      id: 1, 
      name: 'Amor',
      description: `A menudo, la historia del amor es la historia de la frustración, 
        porque alguien o algo siempre se interpone en el camino. En el caso del amor 
        prohibido, esas barreras son sociales, pero en otras historias de amor, las 
        barreras pueden venir de calquier parte del universo.`, 
      url: 'images/plot-love.png'
    }, {
      id: 2, 
      name: 'Amor Prohibido',
      description: `El amor es ciego. Creemos en el poder y la fuerza del amor para 
        superar todos los obstáculos. Es el logro supremo de la emoción humana.`, 
      url: 'images/plot-forbbiden.png'
    }, {
      id: 3, 
      name: 'Asc. & Desc.', 
      description: `Estas dos tramas ocupan diferentes posiciones en el mismo ciclo de 
        éxito y fracaso. Una trama trata sobre el ascenso del protagonista y la otra 
        trata sobre su caída. Algunas historias capturan el ciclo completo. Por lo 
        general, los rasgos de personalidad que permitieron que el personaje alcanzara 
        la prominencia (ambición, agresividad, etc.) son los mismos rasgos que causan 
        su caída.`, 
      url: 'images/plot-ascdesc.png'
    }, {
      id: 4, 
      name: 'Aventura', 
      description: `La trama de aventura es una trama de acción; es una trama del cuerpo.`, 
      url: 'images/plot-aventure.png'
    }, {
      id: 5, 
      name: 'Búsqueda', 
      description: `Búsqueda del protagonista de una persona, lugar o cosa, tangible o 
        intangible. La trama de búsqueda es una trama de personaje; es una trama de la 
        mente.`, 
      url: 'images/plot-search.png'
    }, {
      id: 6, 
      name: 'Descubrimiento', 
      description: `El descubrimiento no se trata solo de personajes. Se trata de personajes 
        en busca de comprender algo fundamental sobre ellos mismos. En el curso normal de los 
        acontecimientos, se necesitan setenta u ochenta años para que la vida se presente 
        completamente ante nosotros y, si tenemos mucha suerte, tenemos idea sobre el valor 
        de nuestra vida en algún momento del camino.`, 
      url: 'images/plot-discovery.png'
    }, {
      id: 7, 
      name: 'Desdicha Exc.', 
      description: `La verdadera tensión inherente a esta trama proviene de convencer a los 
        lectores de que, sea cual sea el exceso, también podría sucederles. ¿Quién de nosotros 
        sabe qué maldad acecha en los corazones de quienes nos rodean? ¿Quién de nosotros 
        puede ver las fallas fatales en el comportamiento propio o ajeno? El verdadero horror, 
        autores como Stephen King han señalado, se encuentra en el lugar común.`,
      url: 'images/plot-misery.png'
    }, {
      id: 8, 
      name: 'Desvalido', 
      description: `La trama de perdedores es una forma de trama de rivalidad, pero es lo 
        suficientemente distinta como para ser una categoría separada. La premisa para la 
        rivalidad es la paridad: las fuerzas combinadas de protagonista y antagonista. 
        Pero en la trama desvalida, las fortalezas no son iguales. El protagonista está 
        en desventaja y se enfrenta a probabilidades abrumadoras.`, 
      url: 'images/plot-helpless.png'
    }, {
      id: 9, 
      name: 'Enigma', 
      description: `Un acertijo es una pregunta deliberadamente enigmática o ambigua. La 
        respuesta requiere comprender las sutilezas del significado dentro de las propias 
        palabras, que son pistas de otro significado.`, 
      url: 'images/plot-enigma.png'
    }, {
      id: 10, 
      name: 'Escape', 
      description: `La trama de escape es física y, como tal, concentra su energía en la 
        mecánica de captura y escape. Eso eliminaría historias sobre personajes que intentan 
        escapar de un demonio personal (como adicciones, fobias y dependencias). Esas son 
        tramas de personajes (tramas de la mente). La fuga en esta trama es literal: el 
        protagonista se limita a su voluntad y quiere escapar.`, 
      url: 'images/plot-escape.png'
    }, {
      id: 11, 
      name: 'Maduración', 
      description: `La maduración, la gráfica sobre el crecimiento, es una de esas tramas 
        fuertemente optimistas. Hay lecciones qué aprender, y esas lecciones pueden ser 
        difíciles, pero al final el personaje se convierte (o se convertirá) en una mejor 
        persona para ello.`, 
      url: 'images/plot-mellowing.png'
    }, {
      id: 12, 
      name: 'Metamorfosis', 
      description: `Si alguna trama es realmente mágica, la metamorfosis lo es. La mayoría 
        de las tramas maestras se basan en la realidad: abordan situaciones y personas a las 
        que reconocemos fácilmente porque se basan en nuestra experiencia. La trama de la 
        metamorfosis trata sobre el cambio. Eso cubre mucho territorio.`, 
      url: 'images/plot-metamorph.png'
    }, {
      id: 13, 
      name: 'Persecución', 
      description: `La trama de búsqueda es la versión literaria de las escondidas. La 
        premisa básica de la trama es simple: una persona persigue a otra. Todo lo que 
        necesitas es un reparto de dos: el perseguidor y el perseguido. Como se trata de 
        una trama física, la persecución es más importante que las personas que participan 
        en ella.`, 
      url: 'images/plot-pursuit.png'
    }, {
      id: 14, 
      name: 'Rescate', 
      description: `La trama de rescate es una trama física: depende más de la acción que de 
        los aspectos psicológicos del personaje. Pero las similitudes terminan ahí. La trama 
        de rescate depende en gran medida del antagonista.`, 
      url: 'images/plot-rescue.png'
    }, {
      id: 15, 
      name: 'Rivalidad',
      description: `Un rival es una persona que compite por el mismo objeto u objetivo que 
        otro. Un rival es una persona que disputa la prominencia o superioridad de otro. En 
        ningún otro lugar es más evidente el concepto de estructura profunda que en una 
        rivalidad. Dos personas tienen el mismo objetivo, ya sea ganar la mano de otro o 
        conquistar los ejércitos del otro o ganar un juego de ajedrez, y cada una tiene su 
        propia motivación.`, 
      url: 'images/plot-rivalry.png'
    }, {
      id: 16, 
      name: 'Sacrificio', 
      description: `Originalmente, el concepto de sacrificio significaba ofrecer un objeto a 
        un dios para establecer una relación entre usted y ese dios. Los días de las ofrendas 
        de sangre ya pasaron. Pero los días de las ofrendas divinas todavía están con nosotros, 
        en formas como la Eucaristía, en la que el pan y vino se transubstancian en el cuerpo 
        y la sangre de Cristo.`, 
      url: 'images/plot-sacrifice.png'
    }, {
      id: 17, 
      name: 'Tentación', 
      description: `La historia de la tentación es la historia de la fragilidad de la 
        naturaleza humana. Si pecar es humano, es humano ceder a la tentación.`, 
      url: 'images/plot-temptation.png'
    }, {
      id: 18, 
      name: 'Transformación', 
      description: `La trama de transformación aborda el proceso de cambio de protagonista 
        mientras viaja a través de una de las muchas etapas de la vida.`, 
      url: 'images/plot-transform.png'
    }, {
      id: 19, 
      name: 'Venganza', 
      description: `El motivo dominante para esta trama es alto y claro: represalias del 
        protagonista contra el antagonista por una lesión real o imaginaria. Es una trama 
        visceral, lo que significa que nos alcanza a un nivel emocional profundo.`, 
      url: 'images/plot-revenge.png'
    }]
  },
  desire: {
    id: 3, 
    code: 'desire', 
    name: 'Objeto de deseo', 
    options: [{
      id: 0, 
      name: 'Aleatorio', 
      description: 'Objeto de deseo aleatorio.', 
      url: 'images/desire-random.png'
    }, {
      id: 1, 
      name: 'Bebé', 
      url: 'images/desire-baby.png'
    }, {
      id: 2, 
      name: 'Brújula', 
      url: 'images/desire-compass.png'
    }, {
      id: 3, 
      name: 'Casa', 
      url: 'images/desire-house.png'
    }, {
      id: 4, 
      name: 'Dinero', 
      url: 'images/desire-money.png'
    }, {
      id: 5, 
      name: 'Familia', 
      url: 'images/desire-family.png'
    }, {
      id: 6, 
      name: 'Graduación', 
      url: 'images/desire-graduation.png'
    }, {
      id: 7, 
      name: 'Hombre', 
      url: 'images/desire-man.png'
    }, {
      id: 8, 
      name: 'Lupa', 
      url: 'images/desire-lens.png'
    }, {
      id: 9, 
      name: 'Muerte', 
      url: 'images/desire-death.png'
    }, {
      id: 10, 
      name: 'Mujer', 
      url: 'images/desire-woman.png'
    }, {
      id: 11, 
      name: 'Mundo', 
      url: 'images/desire-world.png'
    }, {
      id: 12, 
      name: 'Secuestro', 
      url: 'images/desire-kidnapping.png'
    }, {
      id: 13, 
      name: 'Tesoro', 
      url: 'images/desire-treasure.png'
    }, {
      id: 14,
      name: 'Trofeo', 
      url: 'images/desire-trophy.png'
    }]
  }, 
  timeSpace: {
    id: 4, 
    code: 'timeSpace', 
    name: 'Tiempo y Espacio', 
    options: [{
      id: 0, 
      name: 'Aleatorio', 
      description: 'Tiempo y Espacio aleatorio.', 
      url: 'images/ts-random.png' 
    }, {
      id: 1, 
      name: 'Antigua', 
      period: '3000 A.C - 500 A.C', 
      description: 'CIVILIZACIÓN EGIPCIA', 
      url: 'images/ts-egipt.png'
    }, {
      id: 2, 
      name: 'Antigua', 
      period: '3000 A.C - 500 A.C', 
      description: 'CIVILIZACIÓN PREHISPÁNICA', 
      url: 'images/ts-prehispanic.png' 
    }, {
      id: 3, 
      name: 'Antigua', 
      period: '3000 A.C - 500 A.C', 
      description: 'CIVILIZACIÓN GRIEGA', 
      url: 'images/ts-greece.png' 
    }, {
      id: 4, 
      name: 'Antigua', 
      period: '3000 A.C - 500 A.C', 
      description: 'CIVILIZACIÓN ROMANA', 
      url: 'images/ts-rome.png' 
    }, {
      id: 5, 
      name: 'Medieval', 
      period: '500 A.C - 1453', 
      description: 'VIKINGOS', 
      url: 'images/ts-vikings.png'
    }, {
      id: 6, 
      name: 'Medieval', 
      period: '500 A.C - 1453', 
      description: 'CRUZADAS', 
      url: 'images/ts-crusades.png'
    }, {
      id: 7, 
      name: 'Medieval', 
      period: '500 A.C - 1453', 
      description: 'INQUISICIÓN', 
      url: 'images/ts-inquisition.png'
    }, {
      id: 8, 
      name: 'Medieval', 
      period: '500 A.C - 1453', 
      description: 'PESTE NEGRA', 
      url: 'images/ts-blackdeath.png'
    }, {
      id: 9, 
      name: 'Moderna', 
      period: '1453 - 1789', 
      description: 'ESCLAVITUD', 
      url: 'images/ts-slavery.png'
    }, {
      id: 10,
      name: 'Moderna', 
      period: '1453 - 1789', 
      description: 'COLONIZACIÓN SUDAMERICANA', 
      url: 'images/ts-colonization.png'
    }, {
      id: 11, 
      name: 'Moderna', 
      period: '1453 - 1789', 
      description: 'LA ILUSTRACIÓN', 
      url: 'images/ts-illustration.png'
    }, {
      id: 12, 
      name: 'Moderna', 
      period: '1453 - 1789', 
      description: 'REVOLUCIÓN FRANCESA', 
      url: 'images/ts-revolution.png'
    }, {
      id: 13, 
      name: 'Contemp.', 
      period: '1789 - ACTUALIDAD', 
      description: 'PANDEMIAS', 
      url: 'images/ts-pandemic.png'
    }, {
      id: 14, 
      name: 'Contemp.', 
      period: '1789 - ACTUALIDAD', 
      description: 'REVOLUCIÓN INDUSTRIAL', 
      url: 'images/ts-industrial.png'
    }, {
      id: 15, 
      name: 'Contemp.', 
      period: '1789 - ACTUALIDAD', 
      description: 'GUERRAS MUNDIALES', 
      url: 'images/ts-ww.png'
    }, {
      id: 16, 
      name: 'Contemp.', 
      period: '1789 - ACTUALIDAD', 
      description: 'EVOLUCIÓN DE DERECHOS SOCIALES', 
      url: 'images/ts-hhrr.png'
    }, {
      id: 17, 
      name: 'Futurista', 
      period: '2021 EN ADELANTE', 
      description: 'AGOTAMIENTO RECURSOS NATURALES', 
      url: 'images/ts-resources.png'
    }, {
      id: 18, 
      name: 'Futurista', 
      period: '2021 EN ADELANTE', 
      description: 'NUEVAS ECONOMÍAS', 
      url: 'images/ts-economy.png'
    }, {
      id: 19, 
      name: 'Futurista', 
      period: '2021 EN ADELANTE', 
      description: 'TECNOLOGÍA HIPERAVANZADA', 
      url: 'images/ts-technology.png'
    }, {
      id: 20, 
      name: 'Futurista', 
      period: '2021 EN ADELANTE', 
      description: 'EXPANSIÓN A OTROS PLANETAS', 
      url: 'images/ts-expansion.png'
    }]
  }
};

export default features;