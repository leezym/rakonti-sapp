/**
 * @author Martín Vladimir Alonso Sierra Galvis 
 * @version 1.0.1
 */

const narratives = {
  journey: {
    id: 1, 
    author: 'Christopher Vogler', 
    backgroundUrl: 'images/the-journey-info.jpg', 
    color: 'white', 
    description: `
      Este método de creación narrativa, creado por Christopher Vogler, 
      puede ser adaptado y enriquecido según los aspectos particulares 
      de la historia que esté contando el autor. Además, no es necesario 
      seguir su estructura con excesiva rigurosidad pues los pasos pueden 
      alterarse o llegar a cuprimirse. La estructura general se compone de 
      doce pasos: 1. El mundo ordinario. 2. La llamada de la aventura. 3. 
      El rechazo de la llamada. 4. El encuentro con el mentor. 5. La 
      travesía del primer umbral. 6. Las pruebas, los aliados, los enemigos. 
      7. La aproximación a la caverna más profunda. 8. La odisea. 9. La 
      recompensa. 10. El camino de regreso. 11. La resurrección. 12. El 
      retorno con el elixir.
    `,
    summary: `
      Esta estructura narrativa se compone de doce pasos repartidos en 
      tres actos y es de las más famosas para escribir historias. Es un 
      modelo de alcance universal pues puede adaptarse a cualquier 
      cultura o época; el cual comienza sacando al héroe de su mundo 
      ordinario y termina con este regresando a su hogar, trayendo consigo 
      algún tesoro o enseñanza.
    `,
    title: 'VIAJE DEL HÉROE', 
    url: 'images/the-journey.png', 
    mapUrl: 'images/the-journey-map.png', 
    figurePos: {
      left: '-6%', 
      top: '49%', 
    },
    stages: [{
      id: 1, 
      name: 'EL MUNDO ORDINARIO', 
      backgroundUrl: 'images/common-world.jpg', 
      description: `
        Es la presentación del protagonista y su vida cotidiana. Aquí se 
        introduce al personaje principal, su día a día, las situaciones y 
        los personajes que lo rodean, su estado del momento y la forma como 
        afronta su diario vivir. Para poder mostrar al protagonista en una 
        situación poco convencional que el curso de todo, hay que mostrar su 
        mundo habitual para generar un constraste con ese mundo nuevo y extraño.
      `, 
      tips: [
        `Se debe presentar una cotidianidad que dé la sensación de una rutina
        habitual para el protagonista.`, 
        `Se debe atrapar al espectador a través de la introducción de los 
        personajes y sus situaciones cotidianas, que pueden generar una 
        sensación de familiaridad o ser poco convencionales.`, 
        `Se debe sugerir hacia dónde se dirige la historia.`, 
        `Se debe mostrar el tono y el estado de ánimo que se va a experimentar.`, 
        `Debe contener una gran cantidad de información, una descripción  de la 
        vida cotidiana del protagonista y de su personalidad.`
      ], 
      zone: {
        height: '31.5%',  
        marginLeft: '-1.3%',  
        marginTop: '42%',  
        mask: 'journeyStage1' 
      }
    }, {
      id: 2, 
      name: 'LA LLAMADA A LA AVENTURA', 
      backgroundUrl: 'images/adventure-call.jpg', 
      description: `
        Aquí el héroe se enfrenta a un problema, un desafío o una aventura que 
        debe superar y que no le permitirá permanecer con tranquilidad en su 
        mundo ordinario. Este llamado establece las condiciones del cambio, 
        plantea el reto y define el objetivo del héroe. Todo esto suele expresarse 
        en la forma de una pregunta que formula dicho llamado.
      `, 
      tips: [
        `La situación que provoque el cambio debe ser creíble y clara.`, 
        `La situación que provoque el cambio debe implicar un sacrificio y un reto 
        real para el protagonista.`,
        `La situación que provoque el cambio no puede permitir que se vuelva a la 
        normalidad con tranquilidad porque, a pesar de que el protagonista no lo 
        crea, no hay vuelta atrás.`, 
        `Pasar por el reto debe implicar una ganancia para el protagonista. Debe 
        haber unos objetivos y unas metas que motiven al personaje principal a pasar 
        por todos los problemas a pesar de sus limitaciones.` 
      ], 
      zone: {
        height: '55%', 
        marginLeft: '-24.5%', 
        marginTop: '3%', 
        mask: 'journeyStage2'
      }
    }, {
      id: 3, 
      name: 'EL RECHAZO DE LA LLAMADA', 
      backgroundUrl: 'images/call-rejection.jpg', 
      description: `
        En este punto el héroe aún no se ha comprometido con el viaje y está 
        pensando en negarse. El protagonista tiene miedo a lo desconocido y 
        en un principio no quiere correr el riesgo que implica la aventura. Es 
        necesario que una influencia exterior (un cambio en las circunstancias, 
        una ofensa mayor contra el orden natural o el encuentro con un mentor) lo 
        convenza de empezar el viaje. 
      `, 
      tips: [
        `Se debe recalcar de nuevo que la aventura es peligrosa.`, 
        `Deben plantearse más claramente las limitaciones del protagonista, que 
        deben ser creíbles y proporcionales con el nivel del reto.`, 
        `Deben plantearse más claramente las razones del protagonista para no 
        hacer el viaje, que deben ser creíbles y ser proporcionales con el nivel 
        del reto.`, 
        `Las emociones del héroe sobre la aventura deben ser claras. El espectador 
        debe poder entender qué está sintiendo el peronaje principal frente al 
        conflicto y cómo afronta el miedo.`
      ], 
      zone: {
        height: '38%', 
        marginLeft: '9.8%', 
        marginTop: '5%', 
        mask: 'journeyStage3'
      }
    }, {
      id: 4, 
      name: 'EL ENCUENTRO CON EL MENTOR', 
      backgroundUrl: 'images/master-meeting.jpg', 
      description: `
        Se introduce a la figura del mentor, el cual cumple la función de preparar 
        al héroe para que este pueda enfrentarse a lo desconocido. Para esto el 
        mentor puede darle consejos, guiarlo a ciertos lugares o proporcionarle 
        objetos o pociones que le serán de utilidad para su viaje. Sin embargo, el 
        mentor no podrá quedarse con el protagonista durante toda la historia pues, 
        en algún momento, este último deberá enfrentarse a los desconocido solo.
      `, 
      tips: [
        `El mentor puede ser quien anime al héroe a comenzar su aventura.`, 
        `El vínculo entre el mentor y el protagonista puede ser el de padre e hijo, 
        maestro y pupilo, doctor y paciente o hasta dios y hombre.`, 
        `El mentor puede decidir voluntariamente alejarse del lado del protagonista 
        o ser obligado a separarse de este.`, 
        `La figura del mentor suele estar dotada de gran conocimiento o ecperiencia 
        de la cual el protagonista carece.`, 
        `Un mago poderoso y sabio, un guerrero experimentado o un entrenador retirado, 
        son algunos ejemplos de figuras que suelen ser mentores.`
      ], 
      zone: {
        height: '27%', 
        marginLeft: '41%', 
        marginTop: '3.3%', 
        mask: 'journeyStage4'
      }
    }, {
      id: 5, 
      name: 'LA TRAVESÍA DEL PRIMER UMBRAL', 
      backgroundUrl: 'images/threshold-cross.jpg', 
      description: `
        Este es el momento en el que el héroe accede a interesarse por la aventura y 
        entrar a ese nuevo mundo desconocido. A esto se le conoce como atravesar el 
        primer umbral y se refiere a un punto de no retorno donde el protagonista 
        acepta las consecuencias de lo que está por venir, dando inicio a la historia 
        sin poder dar marcha atrás.
      `, 
      tips: [
        `Este es el momento donde empieza a suceder la aventura.`, 
        `Una de las razones de la decisión del héroe puede ser que este es capaz de 
        superar sus miedos iniciales para así comprometerse con la aventura.`, 
        `Otra razón para que el héroe tome esta decisión puede ser que se vea 
        arrinconado a iniciar el viaje al no poseer otra opción  o qué decir que no 
        traiga graves consecuencias.`, 
        `El primer umbral es el paso que conecta el acto del héroe de decidir actuar 
        con las consecuencias que derivan de esta acción.`
      ], 
      zone: {
        height: '32.2%', 
        marginLeft: '30.3%', 
        marginTop: '23.5%', 
        mask: 'journeyStage5'
      }
    }, {
      id: 6, 
      name: 'LAS PRUEBAS, LOS ALIADOS, LOS ENEMIGOS', 
      backgroundUrl: 'images/allies-enemies.jpg', 
      description: `
        Una vez el héroe ya emprendió su aventura, se irá encontrando progresivamente 
        con nuevas pruebas, a la vez que, poco a poco, irá asimilando las normas que 
        rigen  ese nuevo mundo al que ha entrado. Además, es en este trayecto que 
        conocerá tanto a aliados como enemigos, siendo estos personajes parte 
        importante del desarrollo del protagonista. En particular, los primeros 
        pueden llegar a convertirse en acompañantes que seguirán con el protagonista 
        durante gran parte del viaje. 
      `, 
      tips: [
        `Establecimientos sociales como bares o cafés suelen ser los lugares donde el 
        protagonista podrá conocer a sus aliados.`, 
        `El protagonista suele generar una gran impresión, ya sea por su agresividad, 
        honestidad o dominio de alguna técnica, lo cual llamara la atención de posibles 
        aliados o enemigos sobre él.`, 
        `El lugar donde se conoce el protagonista con sus aliados puede ser el escenario 
        donde suceda el primer gran reto que ayudará a formar su vínculo. De igual 
        manera, este momento puede llegar más adelante.`, 
        `Los aliados pueden compartir objetivos similares al héroe, o puede que ayudando 
        a este puedan alcanzar sus propios objetivos.`, 
        `Las enemistades que consiga el protagonista pueden estar relacionadas o ser el 
        antagonista principal, pueden ser rivales que el héroe superará en algún 
        momento o pueden ser enemistades que evolucionarán a alianzas.`
      ], 
      zone: {
        height: '36%', 
        marginLeft: '51.5%', 
        marginTop: '31.5%', 
        mask: 'journeyStage6'
      }
    }, {
      id: 7, 
      name: 'LA APROXIMACIÓN A LA CUEVA MÁS PROFUNDA', 
      backgroundUrl: 'images/darkest-cave.jpg', 
      description: `
        Aquí el héroe se aproxima al lugar con el máximo peligro, que es generalmente el 
        cuartel donde se esconde el villano y donde se encuentra el objeto de búsqueda. 
        Una vez el protagonista haya superado sus miedos y vaya hacia el peligro, cruzará 
        el segundo grna umbral. Generalmente, el héroe se detiene a sus puertas, en 
        preparación para el gran reto. 
      `, 
      tips: [
        `El héroe puede dedicar un tiempo a hacer planes y relajarse.`, 
        `Debe ser un momento emotivo para el héroe ya que se siente descorazonado o 
        contrariado. Estas emociones deben ser creíbles.`, 
        `Deben ponerse en evidencia, más claramente, los cambios que el protagonista 
        ha tenido hasta el momento.`, 
        `La preparación debe ser entretenida y mantener al espectador a la espera de 
        la gran batalla, tal vez con un encuentro amoroso.`
      ], 
      zone: {
        height: '39%', 
        marginLeft: '17%', 
        marginTop: '39.5%', 
        mask: 'journeyStage7'
      }
    }, {
      id: 8, 
      name: 'LA ODISEA', 
      backgroundUrl: 'images/odissey.jpg', 
      description: `
        Es el momento del gran enfrentamiento. El héroe se enfrenta directamente con
        quién más teme. Se enfrenta a una posible muerte y da inicio a la batalla. 
        Aquí la audiencia se mantiene en tensión y con la duda de no saber si el 
        protagonista perderá o sobrevivirá. Es un momento de alta tensión psicológica, 
        una cuestión de vida o muerte, y las posibilidades de que el héroe alcance el 
        objeto de deseo parecen estar en su punto más bajo y sombrío. El protagonista 
        sobrevive a esta odisea, negándose a abandonar, y el sufrimiento lo cambia.
      `, 
      tips: [
        `El héroe debe enfrentarse a una complicación, que debe ser creíble y estar 
        a un nivel mucho mayor que él.`, 
        `La audiencia debe estar tensionada y considerar la posibilidad de que el 
        héroe pierda.`, 
        `El héroe debe estar al borde de perderlo todo y en su punto más bajo.`, 
        `El héroe debe vencer de una forma creíble pero inesperada.`
      ], 
      zone: {
        height: '38%', 
        marginLeft: '34%', 
        marginTop: '48%', 
        mask: 'journeyStage8' 
      }
    }, {
      id: 9, 
      name: 'LA RECOMPENSA', 
      backgroundUrl: 'images/reward.jpg', 
      description: `
        Después de sobrevivir a la muerte, el héroe toma posesión de tesoro y, 
        finalmente, obtiene su recompensa. En este momento el protagonista 
        también puede resolver un conflicto del pasado. Es una persona mucho más 
        humana, más completa, con más experiencia y entendimiento. Es el momento 
        de la celebración y el amor.
      `, 
      tips: [
        `El cambio del héroe, para bien o para mal, debe ser evidente.`, 
        `Puede volver a introducirse la idea del amor como parte de la nueva vida 
        del protagonista.`, 
        `En ocasiones, el héroe no consigue lo que buscaba pero sí lo que 
        necesitaba. La transformación es evidente.`, 
        `Las demás personas que rodean al héroe también se tienen que dar cuenta 
        que este ha cambiado.`
      ], 
      zone: {
        height: '36.5%', 
        marginLeft: '68%', 
        marginTop: '35.2%', 
        mask: 'journeyStage9'
      }
    }, {
      id: 10, 
      name: 'EL CAMINO DE REGRESO', 
      backgroundUrl: 'images/return-path.jpg', 
      description: `
        Aquí nos encontramos a principios del tercer acto y es donde el protagonista 
        comienza a enfrentar las consecuencias de su enfrentamiento. Puede ser que 
        logre alcanzar la reconciliación con aquelas fuerzas antagónicas o, en 
        caso contrario, estás enfurecerán y darán inicio a una persecución contra 
        el héroe mientras este busca volver a casa.
      `, 
      tips: [
        `Aquí se pone énfasis en la decisión o necesidad de regresar a aquel mundo 
        al que pertenecía el protagonista al inicio de la historia.`, 
        `Este viaje de regreso aún contiene pruebas y tentaciones para el héroe.`, 
        `En medio de la persecución o enfrentamiento puede suceder la caída 
        definitiva del villano o antagonista.`, 
        `Se nota en las acciones del héroe el cambio que ha tenido.`
      ], 
      zone: {
        height: '59.5%', 
        marginLeft: '78%', 
        marginTop: '-1%', 
        mask: 'journeyStage10'
      }
    }, {
      id: 11, 
      name: 'LA RESURRECCIÓN', 
      backgroundUrl: 'images/resurrection.jpg', 
      description: `
        Este es el último desafío que debe enfrentar el héroe para poder volver a 
        su mundo, donde deberá sacar a relucir todas las lecciones que aprendió 
        durante su viaje. De esta manera, el protagonista se transforma y regresa 
        a su vida anterior con una nueva mentalidad.
      `, 
      tips: [
        `Se genera una analogía con la muerte y el renacimiento, siendo, en este 
        caso, el protagonista dejando atrás su antiguo yo para dar paso al nuevo.`, 
        `Según el tipo de historia, la muerte y resurrección puede suceder de 
        manera literal.`, 
        `Esto marca el fin de la aventura.`, 
        `Los aliados pueden acompañar al protagonista o separarse y volver a sus 
        propios mundos ordinarios.`
      ], 
      zone: {
        height: '43.5%', 
        marginLeft: '58.8%', 
        marginTop: '11.5%', 
        mask: 'journeyStage11' 
      }
    }, {
      id: 12, 
      name: 'EL REGRESO CON EL ELIXIR', 
      backgroundUrl: 'images/elixir.jpg', 
      description: `
        El héroe regresa a su mundo ordinario, pero trayendo consigo un tesoro o 
        enseñanza que adquirió durante su viaje, dándole así un sentido a la 
        aventura que acaba de realizar. En caso de que el protagonista no regrese 
        con dicho "elixir", estará condenado a embarcarse en una nueva aventura  
        para cumplir con este propósito.
      `, 
      tips: [
        `Hacer que el protagonista regrese sin aquel tesoro y aprendizaje es un 
        recurso que algunas historias utilizan, dejando abierto el final o 
        proporcionando una historia cíclica.`, 
        `Este "elixir" con el que regresa el protagonista genera cambios en su 
        mundo ordinario.`, 
        `El "elixir" puede ser desde un objeto mágico hasta una historia que el 
        héroe pueda contar`, 
        `Al ser el cierre de la historia, el ritmo de esta puede ir en descenso.`
      ], 
      zone: {
        height: '42%', 
        marginLeft: '61.5%', 
        marginTop: '-1%', 
        mask: 'journeyStage12' 
      }
    }]
  }, 
  circle: {
    id: 2, 
    author: 'Dan Harmon', 
    backgroundUrl: 'images/the-circle-info.jpg', 
    color: 'black', 
    description: `
      Este método para estructurar historias, creado por Dan Harmon, pone el 
      énfasis en el punto de vista del personaje protagonista y se construye 
      a partir de ocho pasos: 1. El personaje está en su zona de confort. 2. 
      El personaje quiere algo. 3. El personaje entra en una situación poco 
      habitual. 4. El personaje se adapta a la situación. 5. El personaje 
      obtiene lo que desea. 6. El personaje debe pagar un precio muy alto. 
      7. El personaje vuelve a esa situación confortable del principio. 8. 
      El personaje ha cambiado. Este tipo de estructura se presta mejor para 
      historias fraccionadas o episódicas, por lo que puede aplicarse no solo 
      a nivel de macrohistorias, sino también de microhistorias. En otras 
      palabras, puede servir para resolver problemas concretos o minitramas, 
      aplicando incluso a nivel de escena. 
    `, 
    summary: `
      Estructura narrativa de ocho pasos en donde el personaje protagonista 
      parte de una zona de confort y sale de esta por una necesidad que lo 
      pone en una situación poco habitual para, eventualmente, adaptarse a 
      esta y, finalmente, volver al mismo punto de inicio, cambiado y habiendo 
      pagado un precio muy alto por aquello que quería.
    `, 
    title: 'EL CÍRCULO', 
    url: 'images/the-circle.png', 
    mapUrl: 'images/the-circle-map.png', 
    figurePos: {
      left: '4%', 
      top: '63%', 
    }, 
    stages: [{
      id: 1, 
      name: 'TÚ', 
      backgroundUrl: 'images/common-world.jpg', 
      description: `
        Es la presentación del protagonista y su vida cotidiana. Aquí se 
        introduce al personaje principal, su día a día, las situaciones y 
        los personajes que lo rodean, su estado del momento y la forma como 
        afronta su diario vivir. Para poder mostrar al protagonista en una 
        situación poco convencional que el curso de todo, hay que mostrar su 
        mundo habitual para generar un constraste con ese mundo nuevo y extraño.
      `, 
      tips: [
        `Se debe presentar una cotidianidad que dé la sensación de una rutina
        habitual para el protagonista.`, 
        `Se debe atrapar al espectador a través de la introducción de los 
        personajes y sus situaciones cotidianas, que pueden generar una 
        sensación de familiaridad o ser poco convencionales.`, 
        `Se debe sugerir hacia dónde se dirige la historia.`, 
        `Se debe mostrar el tono y el estado de ánimo que se va a experimentar.`, 
        `Debe contener una gran cantidad de información, una descripción  de la 
        vida cotidiana del protagonista y de su personalidad.`
      ]
    }, {
      id: 2, 
      name: 'NECESITAR', 
      backgroundUrl: 'images/adventure-call.jpg', 
      description: `
        Aquí el héroe se enfrenta a un problema, un desafío o una aventura que 
        debe superar y que no le permitirá permanecer con tranquilidad en su 
        mundo ordinario. Este llamado establece las condiciones del cambio, 
        plantea el reto y define el objetivo del héroe. Todo esto suele expresarse 
        en la forma de una pregunta que formula dicho llamado.
      `, 
      tips: [
        `La situación que provoque el cambio debe ser creíble y clara.`, 
        `La situación que provoque el cambio debe implicar un sacrificio y un reto 
        real para el protagonista.`,
        `La situación que provoque el cambio no puede permitir que se vuelva a la 
        normalidad con tranquilidad porque, a pesar de que el protagonista no lo 
        crea, no hay vuelta atrás.`, 
        `Pasar por el reto debe implicar una ganancia para el protagonista. Debe 
        haber unos objetivos y unas metas que motiven al personaje principal a pasar 
        por todos los problemas a pesar de sus limitaciones.` 
      ]
    }, {
      id: 3, 
      name: 'IR', 
      backgroundUrl: 'images/threshold-call.jpg', 
      description: `
        Este es el momento en el que el héroe accede a interesarse por la aventura y 
        entrar a ese nuevo mundo desconocido. A esto se le conoce como atravesar el 
        primer umbral y se refiere a un punto de no retorno donde el protagonista 
        acepta las consecuencias de lo que está por venir, dando inicio a la historia 
        sin poder dar marcha atrás.
      `, 
      tips: [
        `Este es el momento donde empieza a suceder la aventura.`, 
        `Una de las razones de la decisión del héroe puede ser que este es capaz de 
        superar sus miedos iniciales para así comprometerse con la aventura.`, 
        `Otra razón para que el héroe tome esta decisión puede ser que se vea 
        arrinconado a iniciar el viaje al no poseer otra opción  o qué decir que no 
        traiga graves consecuencias.`, 
        `El primer umbral es el paso que conecta el acto del héroe de decidir actuar 
        con las consecuencias que derivan de esta acción.`
      ]
    }, {
      id: 4, 
      name: 'BUSCAR', 
      backgroundUrl: 'images/allies-images.jpg', 
      description: `
        Una vez el héroe ya emprendió su aventura, se irá encontrando progresivamente 
        con nuevas pruebas, a la vez que, poco a poco, irá asimilando las normas que 
        rigen  ese nuevo mundo al que ha entrado. Además, es en este trayecto que 
        conocerá tanto a aliados como enemigos, siendo estos personajes parte 
        importante del desarrollo del protagonista. En particular, los primeros 
        pueden llegar a convertirse en acompañantes que seguirán con el protagonista 
        durante gran parte del viaje. 
      `, 
      tips: [
        `Establecimientos sociales como bares o cafés suelen ser los lugares donde el 
        protagonista podrá conocer a sus aliados.`, 
        `El protagonista suele generar una gran impresión, ya sea por su agresividad, 
        honestidad o dominio de alguna técnica, lo cual llamara la atención de posibles 
        aliados o enemigos sobre él.`, 
        `El lugar donde se conoce el protagonista con sus aliados puede ser el escenario 
        donde suceda el primer gran reto que ayudará a formar su vínculo. De igual 
        manera, este momento puede llegar más adelante.`, 
        `Los aliados pueden compartir objetivos similares al héroe, o puede que ayudando 
        a este puedan alcanzar sus propios objetivos.`, 
        `Las enemistades que consiga el protagonista pueden estar relacionadas o ser el 
        antagonista principal, pueden ser rivales que el héroe superará en algún 
        momento o pueden ser enemistades que evolucionarán a alianzas.`
      ]
    }, {
      id: 5, 
      name: 'ENCONTRAR', 
      backgroundUrl: 'images/odissey.jpg', 
      description: `
        Es el momento del gran enfrentamiento. El héroe se enfrenta directamente con
        quién más teme. Se enfrenta a una posible muerte y da inicio a la batalla. 
        Aquí la audiencia se mantiene en tensión y con la duda de no saber si el 
        protagonista perderá o sobrevivirá. Es un momento de alta tensión psicológica, 
        una cuestión de vida o muerte, y las posibilidades de que el héroe alcance el 
        objeto de deseo parecen estar en su punto más bajo y sombrío. El protagonista 
        sobrevive a esta odisea, negándose a abandonar, y el sufrimiento lo cambia.
      `, 
      tips: [
        `El héroe debe enfrentarse a una complicación, que debe ser creíble y estar 
        a un nivel mucho mayor que él.`, 
        `La audiencia debe estar tensionada y considerar la posibilidad de que el 
        héroe pierda.`, 
        `El héroe debe estar al borde de perderlo todo y en su punto más bajo.`, 
        `El héroe debe vencer de una forma creíble pero inesperada.`
      ]
    }, {
      id: 6, 
      name: 'TOMAR', 
      backgroundUrl: 'images/reward.jpg', 
      description: `
        Después de sobrevivir a la muerte, el héroe toma posesión de tesoro y, 
        finalmente, obtiene su recompensa. En este momento el protagonista 
        también puede resolver un conflicto del pasado. Es una persona mucho más 
        humana, más completa, con más experiencia y entendimiento. Es el momento 
        de la celebración y el amor.
      `, 
      tips: [
        `El cambio del héroe, para bien o para mal, debe ser evidente.`, 
        `Puede volver a introducirse la idea del amor como parte de la nueva vida 
        del protagonista.`, 
        `En ocasiones, el héroe no consigue lo que buscaba pero sí lo que 
        necesitaba. La transformación es evidente.`, 
        `Las demás personas que rodean al héroe también se tienen que dar cuenta 
        que este ha cambiado.`
      ]
    }, {
      id: 7, 
      name: 'REGRESAR', 
      backgroundUrl: 'images/return-path.jpg', 
      description: `
        Aquí nos encontramos a principios del tercer acto y es donde el protagonista 
        comienza a enfrentar las consecuencias de su enfrentamiento. Puede ser que 
        logre alcanzar la reconciliación con aquelas fuerzas antagónicas o, en 
        caso contrario, estás enfurecerán y darán inicio a una persecución contra 
        el héroe mientras este busca volver a casa.
      `, 
      tips: [
        `Aquí se pone énfasis en la decisión o necesidad de regresar a aquel mundo 
        al que pertenecía el protagonista al inicio de la historia.`, 
        `Este viaje de regreso aún contiene pruebas y tentaciones para el héroe.`, 
        `En medio de la persecución o enfrentamiento puede suceder la caída 
        definitiva del villano o antagonista.`, 
        `Se nota en las acciones del héroe el cambio que ha tenido.`
      ]
    }, {
      id: 8, 
      name: 'CAMBIAR', 
      backgroundUrl: 'images/elixir.jpg', 
      description: `
        El héroe regresa a su mundo ordinario, pero trayendo consigo un tesoro o 
        enseñanza que adquirió durante su viaje, dándole así un sentido a la 
        aventura que acaba de realizar. En caso de que el protagonista no regrese 
        con dicho "elixir", estará condenado a embarcarse en una nueva aventura  
        para cumplir con este propósito.
      `, 
      tips: [
        `Hacer que el protagonista regrese sin aquel tesoro y aprendizaje es un 
        recurso que algunas historias utilizan, dejando abierto el final o 
        proporcionando una historia cíclica.`, 
        `Este "elixir" con el que regresa el protagonista genera cambios en su 
        mundo ordinario.`, 
        `El "elixir" puede ser desde un objeto mágico hasta una historia que el 
        héroe pueda contar`, 
        `Al ser el cierre de la historia, el ritmo de esta puede ir en descenso.`
      ]
    }]
  }
};

export default narratives;