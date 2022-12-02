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
      tips: [{
        id: 1,
        description: `Se debe presentar una cotidianidad que dé la sensación de 
          una rutina habitual para el protagonista.`, 
        iconUrl: 'images/common-world-tip.png', 
        height: '32%', 
        left: '25%', 
        top: '9%', 
        rotate: '0deg'
      }, {
        id: 2,
        description: `Se debe atrapar al espectador a través de la introducción 
          de los personajes y sus situaciones cotidianas, que pueden generar una 
          sensación de familiaridad o ser poco convencionales.`, 
        iconUrl: 'images/common-world-tip.png', 
        height: '32%', 
        left: '70%', 
        top: '8%', 
        rotate: '0deg' 
      }, { 
        id: 3,
        description: `Se debe sugerir hacia dónde se dirige la historia.`, 
        iconUrl: 'images/common-world-tip.png', 
        height: '32%', 
        left: '26%', 
        top: '67.5%', 
        rotate: '0deg' 
      }, {
        id: 4,
        description: `Se debe mostrar el tono y el estado de ánimo que se va a 
          experimentar.`, 
        iconUrl: 'images/common-world-tip.png', 
        height: '32%', 
        left: '68%', 
        top: '67.5%', 
        rotate: '0deg' 
      }, {
        id: 5,
        description: `Debe contener una gran cantidad de información, una descripción 
          de la vida cotidiana del protagonista y de su personalidad.`, 
        iconUrl: 'images/common-world-tip.png', 
        height: '32%', 
        left: '47.5%', 
        top: '61%', 
        rotate: '0deg'
      }], 
      title: {
        color: '#728275', 
        left: '41%', 
        top: '6%', 
        width: '20%'
      }, 
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
      tips: [{
        id: 1,
        description: `La situación que provoque el cambio debe ser creíble y clara.`, 
        iconUrl: 'images/adventure-call-tip.png', 
        height: '20%', 
        left: '8%', 
        top: '-4.5%', 
        rotate: '0deg'
      }, { 
        id: 2,
        description: `La situación que provoque el cambio debe implicar un sacrificio 
          y un reto real para el protagonista.`, 
        iconUrl: 'images/adventure-call-tip.png', 
        height: '20%', 
        left: '11%', 
        top: '17%', 
        rotate: '0deg'
      }, {
        id: 3,
        description: `La situación que provoque el cambio no puede permitir que se 
          vuelva a la normalidad con tranquilidad porque, a pesar de que el 
          protagonista no lo crea, no hay vuelta atrás.`, 
        iconUrl: 'images/adventure-call-tip.png', 
        height: '20%', 
        left: '86%', 
        top: '10%', 
        rotate: '0deg'
      }, { 
        id: 4,
        description: `Pasar por el reto debe implicar una ganancia para el protagonista. 
          Debe haber unos objetivos y unas metas que motiven al personaje principal a 
          pasar por todos los problemas a pesar de sus limitaciones.`, 
        iconUrl: 'images/adventure-call-tip.png', 
        height: '20%', 
        left: '49%', 
        top: '54%', 
        rotate: '0deg'
      }], 
      title: {
        color: '#7C838B', 
        left: '35%', 
        top: '14%', 
        width: '32%' 
      }, 
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
      tips: [{
        id: 1,
        description: `Se debe recalcar de nuevo que la aventura es peligrosa.`, 
        iconUrl: 'images/call-rejection-tip.png', 
        height: '20%', 
        left: '40%', 
        top: '0%', 
        rotate: '0deg'
      }, {
        id: 2,
        description: `Deben plantearse más claramente las limitaciones del 
          protagonista, que deben ser creíbles y proporcionales con el nivel del reto.`, 
        iconUrl: 'images/call-rejection-tip.png', 
        height: '15%', 
        left: '45%', 
        top: '26%', 
        rotate: '0deg'
      }, {
        id: 3,
        description: `Deben plantearse más claramente las razones del protagonista 
          para no hacer el viaje, que deben ser creíbles y ser proporcionales con el 
          nivel del reto.`, 
        iconUrl: 'images/call-rejection-tip.png', 
        height: '15%', 
        left: '57%', 
        top: '36%', 
        rotate: '0deg'
      }, {
        id: 4,
        description: `Las emociones del héroe sobre la aventura deben ser claras. El 
          espectador debe poder entender qué está sintiendo el peronaje principal 
          frente al conflicto y cómo afronta el miedo.`, 
        iconUrl: 'images/call-rejection-tip.png', 
        height: '28%', 
        left: '48%', 
        top: '45%', 
        rotate: '0deg'
      }], 
      title: {
        color: '#444E4F', 
        left: '35%', 
        top: '78%', 
        width: '32%', 
      }, 
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
      tips: [{
        id: 1, 
        description: `El mentor puede ser quien anime al héroe a comenzar su aventura.`,
        iconUrl: 'images/master-meeting-tip.png', 
        height: '27%', 
        left: '63%', 
        top: '0%', 
        rotate: '180deg' 
      }, {
        id: 2, 
        description: `El vínculo entre el mentor y el protagonista puede ser el de padre 
          e hijo, maestro y pupilo, doctor y paciente o hasta dios y hombre.`,
        iconUrl: 'images/master-meeting-tip.png', 
        height: '18%', 
        left: '26.5%', 
        top: '42%', 
        rotate: '0deg' 
      }, {
        id: 3, 
        description: `El mentor puede decidir voluntariamente alejarse del lado del 
          protagonista o ser obligado a separarse de este.`,
        iconUrl: 'images/master-meeting-tip.png', 
        height: '18%', 
        left: '32.5%', 
        top: '45.5%', 
        rotate: '0deg' 
      }, {
        id: 4, 
        description: `La figura del mentor suele estar dotada de gran conocimiento o 
          experiencia de la cual el protagonista carece.`,
        iconUrl: 'images/master-meeting-tip.png', 
        height: '18%', 
        left: '68.8%', 
        top: '40%', 
        rotate: '0deg' 
      }, {
        id: 5, 
        description: `Un mago poderoso y sabio, un guerrero experimentado o un entrenador 
          retirado, son algunos ejemplos de figuras que suelen ser mentores.`, 
        iconUrl: 'images/master-meeting-tip.png', 
        height: '18%', 
        left: '80.3%', 
        top: '35%', 
        rotate: '0deg'
      }], 
      title: {
        color: '#595D66', 
        left: '6%', 
        top: '5%', 
        width: '25%' 
      }, 
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
      tips: [{
        id: 1,
        description: `Este es el momento donde empieza a suceder la aventura.`,
        iconUrl: 'images/threshold-cross-tip.png', 
        height: '33%', 
        left: '4%', 
        top: '-9%', 
        rotate: '0deg' 
      }, {
        id: 2,
        description: `Una de las razones de la decisión del héroe puede ser que este es 
          capaz de superar sus miedos iniciales para así comprometerse con la aventura.`,
        iconUrl: 'images/threshold-cross-tip.png', 
        height: '33%', 
        left: '27%', 
        top: '16%', 
        rotate: '0deg' 
      }, {
        id: 3,
        description: `Otra razón para que el héroe tome esta decisión puede ser que se vea 
          arrinconado a iniciar el viaje al no poseer otra opción  o qué decir que no 
          traiga graves consecuencias.`,
        iconUrl: 'images/threshold-cross-tip.png', 
        height: '33%', 
        left: '24%', 
        top: '50%', 
        rotate: '0deg' 
      }, {
        id: 4,
        description: `El primer umbral es el paso que conecta el acto del héroe de decidir 
          actuar con las consecuencias que derivan de esta acción.`,
        iconUrl: 'images/threshold-cross-tip.png', 
        height: '33%', 
        left: '61%', 
        top: '56%', 
        rotate: '0deg'
      }], 
      title: {
        color: '#545254', 
        left: '60%', 
        top: '15%', 
        width: '30%'
      }, 
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
      tips: [{
        id: 1, 
        description: `Establecimientos sociales como bares o cafés suelen ser los lugares 
          donde el protagonista podrá conocer a sus aliados.`,
        iconUrl: 'images/allies-enemies-tip.png', 
        height: '24%', 
        left: '0%', 
        top: '0.5%', 
        rotate: '0deg' 
      }, {
        id: 2, 
        description: `El protagonista suele generar una gran impresión, ya sea por su agresividad, 
          honestidad o dominio de alguna técnica, lo cual llamara la atención de posibles 
          aliados o enemigos sobre él.`,
        iconUrl: 'images/allies-enemies-tip.png', 
        height: '24%', 
        left: '20%', 
        top: '60%', 
        rotate: '0deg' 
      }, {
        id: 3, 
        description: `El lugar donde se conoce el protagonista con sus aliados puede ser el 
          escenario donde suceda el primer gran reto que ayudará a formar su vínculo. De igual 
          manera, este momento puede llegar más adelante.`,
        iconUrl: 'images/allies-enemies-tip.png', 
        height: '30%', 
        left: '42%', 
        top: '32%', 
        rotate: '0deg' 
      }, {
        id: 4, 
        description: `Los aliados pueden compartir objetivos similares al héroe, o puede que 
          ayudando a este puedan alcanzar sus propios objetivos.`,
        iconUrl: 'images/allies-enemies-tip.png', 
        height: '24%', 
        left: '70%', 
        top: '58%', 
        rotate: '0deg' 
      }, {
        id: 5, 
        description: `Las enemistades que consiga el protagonista pueden estar relacionadas o 
          ser el antagonista principal, pueden ser rivales que el héroe superará en algún 
          momento o pueden ser enemistades que evolucionarán a alianzas.`, 
        iconUrl: 'images/allies-enemies-tip.png', 
        height: '24%', 
        left: '82%', 
        top: '75%', 
        rotate: '0deg'
      }], 
      title: {
        color: '#898991', 
        left: '40%', 
        top: '7%', 
        width: '40%'
      }, 
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
      tips: [{
        id: 1, 
        description: `El héroe puede dedicar un tiempo a hacer planes y relajarse.`, 
        iconUrl: 'images/darkest-cave-tip.png', 
        height: '20%', 
        left: '28%', 
        top: '-2%', 
        rotate: '0deg'
      }, {
        id: 2, 
        description: `Debe ser un momento emotivo para el héroe ya que se siente descorazonado 
          o contrariado. Estas emociones deben ser creíbles.`, 
        iconUrl: 'images/darkest-cave-tip.png', 
        height: '20%', 
        left: '15%', 
        top: '31%', 
        rotate: '0deg'
      }, {
        id: 3, 
        description: `Deben ponerse en evidencia, más claramente, los cambios que el protagonista 
          ha tenido hasta el momento.`, 
        iconUrl: 'images/darkest-cave-tip.png', 
        height: '20%', 
        left: '65%', 
        top: '27%', 
        rotate: '0deg'
      }, {
        id: 4, 
        description: `La preparación debe ser entretenida y mantener al espectador a la espera de 
          la gran batalla, tal vez con un encuentro amoroso.`, 
        iconUrl: 'images/darkest-cave-tip.png', 
        height: '20%', 
        left: '55%', 
        top: '74%', 
        rotate: '0deg'
      }], 
      title: {
        color: '#FFFFFF', 
        left: '56%', 
        top: '9%', 
        width: '40%'
      }, 
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
      tips: [{
        id: 1, 
        description: `El héroe debe enfrentarse a una complicación, que debe ser creíble y 
          estar a un nivel mucho mayor que él.`,
        iconUrl: 'images/odissey-tip.png', 
        height: '28%', 
        left: '63%', 
        top: '30%', 
        rotate: '0deg'
      }, {
        id: 2,  
        description: `La audiencia debe estar tensionada y considerar la posibilidad de que el 
          héroe pierda.`,
        iconUrl: 'images/odissey-tip.png', 
        height: '28%', 
        left: '70%', 
        top: '17%', 
        rotate: '0deg' 
      }, {
        id: 3,  
        description: `El héroe debe estar al borde de perderlo todo y en su punto más bajo.`,
        iconUrl: 'images/odissey-tip.png', 
        height: '28%', 
        left: '79%', 
        top: '31%', 
        rotate: '0deg' 
      }, {
        id: 4,  
        description: `El héroe debe vencer de una forma creíble pero inesperada.`, 
        iconUrl: 'images/odissey-tip.png', 
        height: '22%', 
        left: '71%', 
        top: '48%', 
        rotate: '0deg'
      }], 
      title: {
        color: '#6B7576', 
        left: '10%', 
        top: '45%', 
        width: '18%'
      }, 
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
      tips: [{
        id: 1, 
        description: `El cambio del héroe, para bien o para mal, debe ser evidente.`, 
        iconUrl: 'images/reward-tip.png', 
        height: '32%', 
        left: '32%', 
        top: '-8%', 
        rotate: '0deg' 
      }, {
        id: 2,  
        description: `Puede volver a introducirse la idea del amor como parte de la nueva 
          vida del protagonista.`, 
        iconUrl: 'images/reward-tip.png', 
        height: '32%', 
        left: '42%', 
        top: '0%', 
        rotate: '0deg' 
      }, {
        id: 3, 
        description: `En ocasiones, el héroe no consigue lo que buscaba pero sí lo que 
          necesitaba. La transformación es evidente.`, 
        iconUrl: 'images/reward-tip.png', 
        height: '32%', 
        left: '52%', 
        top: '-8%', 
        rotate: '0deg' 
      }, {
        id: 4, 
        description: `Las demás personas que rodean al héroe también se tienen que dar 
          cuenta que este ha cambiado.`, 
        iconUrl: 'images/reward-tip.png', 
        height: '32%', 
        left: '44%', 
        top: '68%', 
        rotate: '180deg' 
      }], 
      title: {
        color: '#8A7C7B', 
        left: '34%', 
        top: '42%', 
        width: '28%'
      }, 
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
      tips: [{
        id: 1, 
        description: `Aquí se pone énfasis en la decisión o necesidad de regresar a aquel 
          mundo al que pertenecía el protagonista al inicio de la historia.`, 
        iconUrl: 'images/return-path-tip.png', 
        height: '18%' ,
        left: '26%', 
        top: '2%', 
        rotate: '0deg'
      }, {
        id: 2, 
        description: `Este viaje de regreso aún contiene pruebas y tentaciones para el héroe.`, 
        iconUrl: 'images/return-path-tip.png', 
        height: '18%' ,
        left: '63%', 
        top: '3%', 
        rotate: '0deg'
      }, {
        id: 3, 
        description: `En medio de la persecución o enfrentamiento puede suceder la caída 
          definitiva del villano o antagonista.`, 
        iconUrl: 'images/return-path-tip.png', 
        height: '18%' ,
        left: '24%', 
        top: '26%', 
        rotate: '0deg'
      }, {
        id: 4, 
        description: `Se nota en las acciones del héroe el cambio que ha tenido.`, 
        iconUrl: 'images/return-path-tip.png', 
        height: '18%' ,
        left: '65%', 
        top: '25%', 
        rotate: '0deg'
      }], 
      title: {
        color: '#FFFFFF', 
        left: '37%', 
        top: '80%', 
        width: '25%'
      }, 
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
      tips: [{
        id: 1, 
        description: `Se genera una analogía con la muerte y el renacimiento, siendo, 
          en este caso, el protagonista dejando atrás su antiguo yo para dar paso al nuevo.`, 
        iconUrl: 'images/resurrection-tip.png', 
        height: '15%', 
        left: '72%', 
        top: '-6%', 
        rotate: '0deg'
      }, {
        id: 2, 
        description: `Según el tipo de historia, la muerte y resurrección puede suceder 
          de manera literal.`, 
        iconUrl: 'images/resurrection-tip.png', 
        height: '25%', 
        left: '82%', 
        top: '0%', 
        rotate: '0deg'
      }, {
        id: 3, 
        description: `Esto marca el fin de la aventura.`, 
        iconUrl: 'images/resurrection-tip.png', 
        height: '25%', 
        left: '75%', 
        top: '20%', 
        rotate: '0deg'
      }, {
        id: 4, 
        description: `Los aliados pueden acompañar al protagonista o separarse y volver 
          a sus propios mundos ordinarios.`, 
        iconUrl: 'images/resurrection-tip.png', 
        height: '25%', 
        left: '63%', 
        top: '44%', 
        rotate: '0deg'
      }], 
      title: {
        color: '#FFFFFF', 
        left: '15%', 
        top: '18%', 
        width: '25%'
      }, 
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
      tips: [{
        id: 1, 
        description: `Hacer que el protagonista regrese sin aquel tesoro y aprendizaje 
          es un recurso que algunas historias utilizan, dejando abierto el final o 
          proporcionando una historia cíclica.`, 
        iconUrl: 'images/elixir-tip.png', 
        height: '45%', 
        left: '43%', 
        top: '11%', 
        rotate: '0deg'
      }, {
        id: 2, 
        description: `Este "elixir" con el que regresa el protagonista genera cambios 
          en su mundo ordinario.`, 
        iconUrl: 'images/elixir-tip.png', 
        height: '40%', 
        left: '60%', 
        top: '58%', 
        rotate: '0deg'
      }, {
        id: 3, 
        description: `El "elixir" puede ser desde un objeto mágico hasta una historia 
          que el héroe pueda contar`, 
        iconUrl: 'images/elixir-tip.png', 
        height: '45%', 
        left: '0%', 
        top: '54%', 
        rotate: '0deg'
      }, {
        id: 4,  
        description: `Al ser el cierre de la historia, el ritmo de esta puede ir en descenso.`, 
        iconUrl: 'images/elixir-tip2.png', 
        height: '40%', 
        left: '23%', 
        top: '27%', 
        rotate: '0deg'
      }], 
      title: {
        color: '#677075', 
        left: '66%', 
        top: '10%', 
        width: '30%'
      }, 
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
      left: '-10%', 
      top: '53%', 
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
      tips: [{
        id: 1,
        description: `Se debe presentar una cotidianidad que dé la sensación de 
          una rutina habitual para el protagonista.`, 
        iconUrl: 'images/common-world-tip.png', 
        height: '32%', 
        left: '25%', 
        top: '9%', 
        rotate: '0deg'
      }, {
        id: 2,
        description: `Se debe atrapar al espectador a través de la introducción 
          de los personajes y sus situaciones cotidianas, que pueden generar una 
          sensación de familiaridad o ser poco convencionales.`, 
        iconUrl: 'images/common-world-tip.png', 
        height: '32%', 
        left: '70%', 
        top: '8%', 
        rotate: '0deg' 
      }, { 
        id: 3,
        description: `Se debe sugerir hacia dónde se dirige la historia.`, 
        iconUrl: 'images/common-world-tip.png', 
        height: '32%', 
        left: '26%', 
        top: '67.5%', 
        rotate: '0deg' 
      }, {
        id: 4,
        description: `Se debe mostrar el tono y el estado de ánimo que se va a 
          experimentar.`, 
        iconUrl: 'images/common-world-tip.png', 
        height: '32%', 
        left: '68%', 
        top: '67.5%', 
        rotate: '0deg' 
      }, {
        id: 5,
        description: `Debe contener una gran cantidad de información, una descripción 
          de la vida cotidiana del protagonista y de su personalidad.`, 
        iconUrl: 'images/common-world-tip.png', 
        height: '32%', 
        left: '47.5%', 
        top: '61%', 
        rotate: '0deg'
      }], 
      title: {
        color: '#728275', 
        left: '41%', 
        top: '6%', 
        width: '20%'
      }, 
      zone: {
        height: '34%', 
        marginLeft: '-4%', 
        marginTop: '44%', 
        mask: 'circleStage1'
      }
    }, {
      id: 2, 
      name: 'NECESITAR', 
      backgroundUrl: 'images/darkest-cave.jpg', 
      description: `
        Aquí el héroe se enfrenta a un problema, un desafío o una aventura que 
        debe superar y que no le permitirá permanecer con tranquilidad en su 
        mundo ordinario. Este llamado establece las condiciones del cambio, 
        plantea el reto y define el objetivo del héroe. Todo esto suele expresarse 
        en la forma de una pregunta que formula dicho llamado.
      `, 
      tips: [{
        id: 1,
        description: `La situación que provoque el cambio debe ser creíble y clara.`, 
        iconUrl: 'images/darkest-cave-tip.png', 
        height: '20%', 
        left: '28%', 
        top: '-2%', 
        rotate: '0deg'
      }, { 
        id: 2,
        description: `La situación que provoque el cambio debe implicar un sacrificio 
          y un reto real para el protagonista.`, 
        iconUrl: 'images/darkest-cave-tip.png', 
        height: '20%', 
        left: '15%', 
        top: '31%', 
        rotate: '0deg'
      }, {
        id: 3,
        description: `La situación que provoque el cambio no puede permitir que se 
          vuelva a la normalidad con tranquilidad porque, a pesar de que el 
          protagonista no lo crea, no hay vuelta atrás.`, 
        iconUrl: 'images/darkest-cave-tip.png', 
        height: '20%', 
        left: '65%', 
        top: '27%', 
        rotate: '0deg'
      }, { 
        id: 4,
        description: `Pasar por el reto debe implicar una ganancia para el protagonista. 
          Debe haber unos objetivos y unas metas que motiven al personaje principal a 
          pasar por todos los problemas a pesar de sus limitaciones.`, 
        iconUrl: 'images/darkest-cave-tip.png', 
        height: '20%', 
        left: '55%', 
        top: '74%', 
        rotate: '0deg'
      }], 
      title: {
        color: '#FFFFFF', 
        left: '56%', 
        top: '9%', 
        width: '40%' 
      }, 
      zone: {
        height: '42%', 
        marginLeft: '17%', 
        marginTop: '40%', 
        mask: 'circleStage2'
      }
    }, {
      id: 3, 
      name: 'IR', 
      backgroundUrl: 'images/call-rejection.jpg', 
      description: `
        Este es el momento en el que el héroe accede a interesarse por la aventura y 
        entrar a ese nuevo mundo desconocido. A esto se le conoce como atravesar el 
        primer umbral y se refiere a un punto de no retorno donde el protagonista 
        acepta las consecuencias de lo que está por venir, dando inicio a la historia 
        sin poder dar marcha atrás.
      `, 
      tips: [{
        id: 1,
        description: `Este es el momento donde empieza a suceder la aventura.`,
        iconUrl: 'images/call-rejection-tip.png', 
        height: '20%', 
        left: '40%', 
        top: '0%', 
        rotate: '0deg' 
      }, {
        id: 2,
        description: `Una de las razones de la decisión del héroe puede ser que este es 
          capaz de superar sus miedos iniciales para así comprometerse con la aventura.`,
        iconUrl: 'images/call-rejection-tip.png', 
        height: '15%', 
        left: '45%', 
        top: '26%', 
        rotate: '0deg' 
      }, {
        id: 3,
        description: `Otra razón para que el héroe tome esta decisión puede ser que se vea 
          arrinconado a iniciar el viaje al no poseer otra opción  o qué decir que no 
          traiga graves consecuencias.`,
        iconUrl: 'images/call-rejection-tip.png', 
        height: '15%', 
        left: '57%', 
        top: '36%', 
        rotate: '0deg' 
      }, {
        id: 4,
        description: `El primer umbral es el paso que conecta el acto del héroe de decidir 
          actuar con las consecuencias que derivan de esta acción.`,
        iconUrl: 'images/call-rejection-tip.png', 
        height: '28%', 
        left: '48%', 
        top: '45%', 
        rotate: '0deg'
      }], 
      title: {
        color: '#444E4F', 
        left: '35%', 
        top: '78%', 
        width: '32%'
      }, 
      zone: {
        height: '42%', 
        marginLeft: '3.2%', 
        marginTop: '6.5%', 
        mask: 'circleStage3'
      }
    }, {
      id: 4, 
      name: 'BUSCAR', 
      backgroundUrl: 'images/master-meeting.jpg', 
      description: `
        Una vez el héroe ya emprendió su aventura, se irá encontrando progresivamente 
        con nuevas pruebas, a la vez que, poco a poco, irá asimilando las normas que 
        rigen  ese nuevo mundo al que ha entrado. Además, es en este trayecto que 
        conocerá tanto a aliados como enemigos, siendo estos personajes parte 
        importante del desarrollo del protagonista. En particular, los primeros 
        pueden llegar a convertirse en acompañantes que seguirán con el protagonista 
        durante gran parte del viaje. 
      `, 
      tips: [{
        id: 1, 
        description: `Establecimientos sociales como bares o cafés suelen ser los lugares 
          donde el protagonista podrá conocer a sus aliados.`,
        iconUrl: 'images/master-meeting-tip.png', 
        height: '27%', 
        left: '63%', 
        top: '0%', 
        rotate: '180deg' 
      }, {
        id: 2, 
        description: `El protagonista suele generar una gran impresión, ya sea por su agresividad, 
          honestidad o dominio de alguna técnica, lo cual llamara la atención de posibles 
          aliados o enemigos sobre él.`,
        iconUrl: 'images/master-meeting-tip.png', 
        height: '18%', 
        left: '26.5%', 
        top: '42%', 
        rotate: '0deg' 
      }, {
        id: 3, 
        description: `El lugar donde se conoce el protagonista con sus aliados puede ser el 
          escenario donde suceda el primer gran reto que ayudará a formar su vínculo. De igual 
          manera, este momento puede llegar más adelante.`,
        iconUrl: 'images/master-meeting-tip.png', 
        height: '18%', 
        left: '32.5%', 
        top: '45.5%', 
        rotate: '0deg' 
      }, {
        id: 4, 
        description: `Los aliados pueden compartir objetivos similares al héroe, o puede que 
          ayudando a este puedan alcanzar sus propios objetivos.`,
        iconUrl: 'images/master-meeting-tip.png', 
        height: '18%', 
        left: '68.8%', 
        top: '40%', 
        rotate: '0deg' 
      }, {
        id: 5, 
        description: `Las enemistades que consiga el protagonista pueden estar relacionadas o 
          ser el antagonista principal, pueden ser rivales que el héroe superará en algún 
          momento o pueden ser enemistades que evolucionarán a alianzas.`, 
        iconUrl: 'images/master-meeting-tip.png', 
        height: '18%', 
        left: '80.3%', 
        top: '35%', 
        rotate: '0deg'
      }], 
      title: {
        color: '#595D66', 
        left: '6%', 
        top: '5%', 
        width: '25%'
      }, 
      zone: {
        height: '27.4%', 
        marginLeft: '42%', 
        marginTop: '5%', 
        mask: 'circleStage4'
      }
    }, {
      id: 5, 
      name: 'ENCONTRAR', 
      backgroundUrl: 'images/threshold-cross.jpg', 
      description: `
        Es el momento del gran enfrentamiento. El héroe se enfrenta directamente con
        quién más teme. Se enfrenta a una posible muerte y da inicio a la batalla. 
        Aquí la audiencia se mantiene en tensión y con la duda de no saber si el 
        protagonista perderá o sobrevivirá. Es un momento de alta tensión psicológica, 
        una cuestión de vida o muerte, y las posibilidades de que el héroe alcance el 
        objeto de deseo parecen estar en su punto más bajo y sombrío. El protagonista 
        sobrevive a esta odisea, negándose a abandonar, y el sufrimiento lo cambia.
      `, 
      tips: [{
        id: 1, 
        description: `El héroe debe enfrentarse a una complicación, que debe ser creíble y 
          estar a un nivel mucho mayor que él.`,
        iconUrl: 'images/threshold-cross-tip.png', 
        height: '33%', 
        left: '4%', 
        top: '-9%', 
        rotate: '0deg'
      }, {
        id: 2,  
        description: `La audiencia debe estar tensionada y considerar la posibilidad de que el 
          héroe pierda.`,
        iconUrl: 'images/threshold-cross-tip.png', 
        height: '33%', 
        left: '27%', 
        top: '16%', 
        rotate: '0deg' 
      }, {
        id: 3,  
        description: `El héroe debe estar al borde de perderlo todo y en su punto más bajo.`,
        iconUrl: 'images/threshold-cross-tip.png', 
        height: '33%', 
        left: '24%', 
        top: '50%', 
        rotate: '0deg' 
      }, {
        id: 4,  
        description: `El héroe debe vencer de una forma creíble pero inesperada.`, 
        iconUrl: 'images/threshold-cross-tip.png', 
        height: '33%', 
        left: '61%', 
        top: '56%', 
        rotate: '0deg'
      }], 
      title: {
        color: '#545254', 
        left: '60%', 
        top: '15%', 
        width: '30%'
      }, 
      zone: {
        height: '35.8%', 
        marginLeft: '29.7%', 
        marginTop: '25.8%', 
        mask: 'circleStage5'
      }
    }, {
      id: 6, 
      name: 'TOMAR', 
      backgroundUrl: 'images/allies-enemies.jpg', 
      description: `
        Después de sobrevivir a la muerte, el héroe toma posesión de tesoro y, 
        finalmente, obtiene su recompensa. En este momento el protagonista 
        también puede resolver un conflicto del pasado. Es una persona mucho más 
        humana, más completa, con más experiencia y entendimiento. Es el momento 
        de la celebración y el amor.
      `, 
      tips: [{
        id: 1, 
        description: `El cambio del héroe, para bien o para mal, debe ser evidente.`, 
        iconUrl: 'images/allies-enemies-tip.png', 
        height: '24%', 
        left: '20%', 
        top: '60%', 
        rotate: '0deg' 
      }, {
        id: 2,  
        description: `Puede volver a introducirse la idea del amor como parte de la nueva 
          vida del protagonista.`, 
        iconUrl: 'images/allies-enemies-tip.png', 
        height: '30%', 
        left: '42%', 
        top: '32%', 
        rotate: '0deg' 
      }, {
        id: 3, 
        description: `En ocasiones, el héroe no consigue lo que buscaba pero sí lo que 
          necesitaba. La transformación es evidente.`, 
        iconUrl: 'images/allies-enemies-tip.png', 
        height: '24%', 
        left: '70%', 
        top: '58%', 
        rotate: '0deg' 
      }, {
        id: 4, 
        description: `Las demás personas que rodean al héroe también se tienen que dar 
          cuenta que este ha cambiado.`, 
        iconUrl: 'images/allies-enemies-tip.png', 
        height: '24%', 
        left: '82%', 
        top: '75%', 
        rotate: '0deg' 
      }], 
      title: {
        color: '#898991', 
        left: '40%', 
        top: '7%', 
        width: '40%'
      },  
      zone: {
        height: '38%', 
        marginLeft: '55%', 
        marginTop: '36%', 
        mask: 'circleStage6'
      }
    }, {
      id: 7, 
      name: 'REGRESAR', 
      backgroundUrl: 'images/resurrection.jpg', 
      description: `
        Aquí nos encontramos a principios del tercer acto y es donde el protagonista 
        comienza a enfrentar las consecuencias de su enfrentamiento. Puede ser que 
        logre alcanzar la reconciliación con aquelas fuerzas antagónicas o, en 
        caso contrario, estás enfurecerán y darán inicio a una persecución contra 
        el héroe mientras este busca volver a casa.
      `, 
      tips: [{
        id: 1, 
        description: `Aquí se pone énfasis en la decisión o necesidad de regresar a aquel 
          mundo al que pertenecía el protagonista al inicio de la historia.`, 
        iconUrl: 'images/resurrection-tip.png', 
        height: '15%' ,
        left: '72%', 
        top: '-6%', 
        rotate: '0deg'
      }, {
        id: 2, 
        description: `Este viaje de regreso aún contiene pruebas y tentaciones para el héroe.`, 
        iconUrl: 'images/resurrection-tip.png', 
        height: '25%' ,
        left: '82%', 
        top: '0%', 
        rotate: '0deg'
      }, {
        id: 3, 
        description: `En medio de la persecución o enfrentamiento puede suceder la caída 
          definitiva del villano o antagonista.`, 
        iconUrl: 'images/resurrection-tip.png', 
        height: '25%' ,
        left: '75%', 
        top: '20%', 
        rotate: '0deg'
      }, {
        id: 4, 
        description: `Se nota en las acciones del héroe el cambio que ha tenido.`, 
        iconUrl: 'images/resurrection-tip.png', 
        height: '25%' ,
        left: '63%', 
        top: '44%', 
        rotate: '0deg'
      }], 
      title: {
        color: '#FFFFFF', 
        left: '15%', 
        top: '18%', 
        width: '25%'
      }, 
      zone: {
        height: '34%', 
        marginLeft: '62%', 
        marginTop: '16%', 
        mask: 'circleStage7'
      }
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
      tips: [{
        id: 1, 
        description: `Hacer que el protagonista regrese sin aquel tesoro y aprendizaje 
          es un recurso que algunas historias utilizan, dejando abierto el final o 
          proporcionando una historia cíclica.`, 
        iconUrl: 'images/elixir-tip.png', 
        height: '45%', 
        left: '43%', 
        top: '11%', 
        rotate: '0deg'
      }, {
        id: 2, 
        description: `Este "elixir" con el que regresa el protagonista genera cambios 
          en su mundo ordinario.`, 
        iconUrl: 'images/elixir-tip.png', 
        height: '40%', 
        left: '60%', 
        top: '58%', 
        rotate: '0deg'
      }, {
        id: 3, 
        description: `El "elixir" puede ser desde un objeto mágico hasta una historia 
          que el héroe pueda contar`, 
        iconUrl: 'images/elixir-tip.png', 
        height: '45%', 
        left: '0%', 
        top: '54%', 
        rotate: '0deg'
      }, {
        id: 4,  
        description: `Al ser el cierre de la historia, el ritmo de esta puede ir en descenso.`, 
        iconUrl: 'images/elixir-tip2.png', 
        height: '40%', 
        left: '23%', 
        top: '27%', 
        rotate: '0deg'
      }], 
      title: {
        color: '#677075', 
        left: '66%', 
        top: '10%', 
        width: '30%'
      }, 
      zone: {
        height: '54%', 
        marginLeft: '62%', 
        marginTop: '0%', 
        mask: 'circleStage8'
      }
    }]
  }
};

export default narratives;