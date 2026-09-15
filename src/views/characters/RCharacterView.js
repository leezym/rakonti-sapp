import api from "../../api/axiosConfig";
import { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import TopMenu from '../TopMenu';
import PopUp from '../PopUp';
import {
  setNarrative,
  setFeature,
  setGenre,
  setPlot,
  setDesire,
  setTime,
  setCharacter,
  setCharacters,
  setPersonalities,
  setRolesForCharacter,
  setPersonalityForCharacter,
  setRoles,
  setCurrentStage
} from '../../redux-store/reducers/storySlice';

function StepOne({ data, setData, formData, setFormData, handleChange }) {
  return (
    <>
      <FormContainer>
        <Subtitle>Perfil demográfico</Subtitle>

        <Row>
          <Column>
            <Label>Nombre(s)</Label>
            <Input type='text'
                  name='nombre'
                  value={formData.nombre}
                  onChange={handleChange}
            />
          </Column>
          <Column>
            <Label>Apellidos</Label>
            <Input type='text' 
                  name='apellido'
                  value={formData.apellido}
                  onChange={handleChange}
            />
          </Column>
        </Row>

        <Row>
          <Column>
            <Label>Edad</Label>
            <Input type='number'
                  name='edad'
                  value={formData.edad}
                  onChange={handleChange}
            />
          </Column>
          <Column>
            <Label>Género</Label>
            <Select name='sexo'
                  value={formData.sexo}
                  onChange={handleChange}
            >
              <option value=''>Selecciona</option>
              <option value='Femenino'>Femenino</option>
              <option value='Masculino'>Masculino</option>
              <option value='No binario'>No binario</option>
              <option value='Transgénero'>Transgénero</option>
              <option value='Transexual'>Transexual</option>
              <option value='Queer'>Queer</option>
            </Select>
          </Column>
        </Row>
      </FormContainer>

      <FormContainer>
        <Subtitle style={{marginBottom:'8px'}}>Perfil psicológico</Subtitle>
        <Row>
          <Column style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
            <Label>¿El personaje prefiere seguir un plan detallado y organizado o improvisar y adaptarse según las circunstancias?</Label>
          </Column>
          <Column style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
            <InputRadio type="radio"
                id="organizado"
                name="plan"
                value="organizado"
                checked={formData.plan === 'organizado'}
                onChange={(e) => {
                  const { name, value } = e.target;
                  setFormData(prev => ({ ...prev, [name]: value, id_personalidad: '' }));

                  setData({
                    ...data,
                    personalidad: '',
                    personalidad_descripcion: '',
                    personalidad_imagen: ''
                  });
                }}
              />
            <LabelRadioButton htmlFor="organizado">Seguir un plan detallado y organizado</LabelRadioButton>
            <Image style={{width:'70px'}} src={'images/executive-avatar.png'}/>
          </Column>
          <Column style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
            <InputRadio type="radio"
              id="improvisado"
              name="plan"
              value="improvisado"
              checked={formData.plan === 'improvisado'}
              onChange={(e) => {
                const { name, value } = e.target;
                setFormData(prev => ({ ...prev, [name]: value, id_personalidad: '' }));

                setData({
                  ...data,
                  personalidad: '',
                  personalidad_descripcion: '',
                  personalidad_imagen: ''
                });
              }}
            />
            <LabelRadioButton htmlFor="improvisado">Improvisar y adaptarse según las circunstancias</LabelRadioButton>
            <Image style={{width:'70px'}} src={'images/entertainer-avatar.png'}/>
          </Column>
        </Row>

        <Row>
          <Column style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
            <Label>¿El personaje toma decisiones basadas en hechos y lógica o se guía por sus ideas, intuiciones y emociones?</Label>
          </Column>
          <Column style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
            <InputRadio type="radio"
                id="logica"
                name="decision"
                value="logica"
                checked={formData.decision === 'logica'}
                onChange={(e) => {
                  const { name, value } = e.target;
                  setFormData(prev => ({ ...prev, [name]: value, id_personalidad: '' }));

                  setData({
                    ...data,
                    personalidad: '',
                    personalidad_descripcion: '',
                    personalidad_imagen: ''
                  });
                }}
              />
            <LabelRadioButton htmlFor="logica">Toma decisiones basadas en hechos y lógica</LabelRadioButton>
            <Image style={{width:'70px'}} src={'images/logician-avatar.png'}/>
          </Column>
          <Column style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
            <InputRadio type="radio"
              id="intuicion"
              name="decision"
              value="intuicion"
              checked={formData.decision === 'intuicion'}
              onChange={(e) => {
                const { name, value } = e.target;
                setFormData(prev => ({ ...prev, [name]: value, id_personalidad: '' }));

                setData({
                  ...data,
                  personalidad: '',
                  personalidad_descripcion: '',
                  personalidad_imagen: ''
                });
              }}
            />
            <LabelRadioButton htmlFor="intuicion">Se guía por sus ideas, intuiciones y emociones</LabelRadioButton>
            <Image style={{width:'70px'}} src={'images/protagonist-avatar.png'}/>
          </Column>
        </Row>
      </FormContainer>
    </>
  );
}

function StepTwo({ formData, setFormData, data, setData }) {
  const [personalidades, setPersonalidades] = useState([]);

  useEffect(() => {
    api.get('/personalidades')
      .then(res => setPersonalidades(res.data))
      .catch (error => {
        const errorMsg = error.response?.data?.error || error.response?.data?.detalle || 'Error al cargar las personalidades';
        alert(errorMsg);
      });
  }, []);

  let nombresFiltrados = [];

  if (formData.plan === 'organizado' && formData.decision === 'logica') {
    nombresFiltrados = ['Logista', 'Ejecutivo', 'Cónsul', 'Defensor'];
  } else if (formData.plan === 'organizado' && formData.decision === 'intuicion') {
    nombresFiltrados = ['Arquitecto', 'Lógico', 'Comandante', 'Innovador'];
  } else if (formData.plan === 'improvisado' && formData.decision === 'logica') {
    nombresFiltrados = ['Virtuoso', 'Aventurero', 'Emprendedor', 'Animador'];
  } else if (formData.plan === 'improvisado' && formData.decision === 'intuicion') {
    nombresFiltrados = ['Abogado', 'Mediador', 'Activista', 'Protagonista'];
  }

  const personalidadesFiltradas = (personalidades || []).filter(p =>
    nombresFiltrados.includes(p.nombre)
  );

  return (
    <>
      <Paragraph>De acuerdo al perfil psicológico elegido te proponemos usar una de las siguientes personalidades:</Paragraph>
      <div style={{ margin: 'auto', width: '100%', maxWidth: '1200px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '40px' }}>
          {personalidadesFiltradas.map(personalidad => (
            <CardHorizontal
              key={personalidad.id_personalidad}
              image={personalidad.imagen}
              selected={formData.id_personalidad === personalidad.id_personalidad}
              style={{ margin: 0, width: '100%' }}
              onClick={() => {
                setData({
                  ...data,
                  personalidad: personalidad ? personalidad.nombre : '',
                  personalidad_descripcion: personalidad ? personalidad.descripcion : '',
                  personalidad_imagen: personalidad ? personalidad.imagen : ''
                });
                
                setFormData({
                  ...formData,
                  id_personalidad: personalidad ? personalidad.id_personalidad : ''
                });
              }}>
              <Title style={{fontSize:'13px'}} align="right">{personalidad.nombre}</Title>
              <CardHorizontalDescription dangerouslySetInnerHTML={{ __html: personalidad.descripcion }} />
            </CardHorizontal>
          ))}
        </div>
      </div>
    </>
  );
}

function StepThree({ data, setData }) {
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    api.get('/roles')
      .then(res => setRoles(res.data))
      .catch (error => {
        const errorMsg = error.response?.data?.error || error.response?.data?.detalle || 'Error al cargar los roles';
        alert(errorMsg);
      });
  }, []);

  return (
    <>
      <FormContainer>
        <p>Los <b>Roles actanciales</b> son elementos clave en la estructura narrativa de una historia. Ayudan a definir las relaciones entre los personajes y las fuerzas que impulsan la trama. Al identificar estos roles, se puede comprender mejor la motivación de los personajes y el significado de sus acciones. Para definir los roles actanciales ten en cuenta estos tres puntos:
          <ul>
            <li>El objeto es el único rol actancial que puede ocupar o no un personaje, el resto de los roles siempre son ocupados por personajes.</li>
            <li>Un rol actancial puede ser ocupado por uno o más personajes.</li>
            <li>Un personaje puede ocupar uno o varios roles actanciales.</li>
          </ul>
          <b>Selecciona qué rol(es) actancial(es) ocupa este personaje que estás creando:</b>
        </p>
        <Row>
          {dividirEnColumnas(roles, 3).map((columna, i) => (
            <Column key={i}>
              {columna.map(rol => (
                <div key={rol.id_rol}>
                  <LabelCheckbox>
                    <InputCheckbox
                      type="checkbox"
                      value={rol.id_rol}
                      checked={data.roles.some(r => r.id_rol === rol.id_rol)}
                      
                      onChange={(e) => {
                        const seleccionados = data.roles;
                        
                        if (e.target.checked) {
                          setData({
                            ...data,
                            roles: [...seleccionados, { id_rol: rol.id_rol, nombre: rol.nombre }]
                          });
                        } else {
                          setData({
                            ...data,
                            roles: seleccionados.filter(g => g.id_rol !== rol.id_rol)
                          });
                        }
                      }}
                      />
                    <b>{rol.nombre}</b>
                  </LabelCheckbox>
                  <p style={{fontSize:'12px'}} dangerouslySetInnerHTML={{ __html: rol.descripcion }} />
                </div>
              ))}
            </Column>
          ))}
        </Row>
      </FormContainer>
    </>
  );
}

function dividirEnColumnas(items, columnas){
  const resultado = Array.from({ length: columnas }, () => []);
  items.forEach((item, index) => {
    resultado[index % columnas].push(item);
  });
  return resultado;
}

function StepFour({ formData, handleChange }) {
  return (
    <>
      <Paragraph>Agrega cualquier otra información que consideres relevante de tu personaje. Este paso es opcional.</Paragraph>

      <FormContainer>
        <Row>
          <Column>
            <Label>Apariencia</Label>
            <TextArea type='textarea' 
              name='apariencia'
              value={formData.apariencia}
              onChange={handleChange}
            />
          </Column>
          <Column>
            <Label>Ocupación/profesión</Label>
            <TextArea type='text' 
              name='ocupacion'
              value={formData.ocupacion}
              onChange={handleChange}
            />
          </Column>
        </Row>

        <Row>
          <Column>
            <Label>Intereses</Label>
            <TextArea type='text' 
              name='intereses'
              value={formData.intereses}
              onChange={handleChange}
            />
          </Column>
          <Column>
            <Label>Estatus social</Label>
            <TextArea type='text' 
              name='estatus_social'
              value={formData.estatus_social}
              onChange={handleChange}
            />
          </Column>
        </Row>

        <Row>
          <Column>
            <Label>Creencia(s)</Label>
            <TextArea type='text' 
              name='creencias'
              value={formData.creencias}
              onChange={handleChange}
            />
          </Column>
          <Column>
            <Label>Antecedentes</Label>
            <TextArea type='text' 
              name='antecedentes'
              value={formData.antecedentes}
              onChange={handleChange}
            />
          </Column>
        </Row>
      </FormContainer>
    </>
  );
}

function StepFive({ formData, data }) {
  return (
    <>
      <Paragraph>¡Buen trabajo! Ya tienes las características del personaje de tu historia. A continuación, te mostraremos un resumen de lo que has seleccionado. </Paragraph>
      <CardRow>
        <CardColumn>
          <Card>
            <Title>Perfil demográfico</Title>
            <CardDescription>
              <b>Nombre(s): </b>{formData.nombre}<br/><br/>
              <b>Apellido(s): </b>{formData.apellido}<br/><br/>
              <b>Edad: </b>{formData.edad}<br/><br/>
              <b>Género: </b>{formData.sexo}<br/><br/>
              <b>Roles:</b>
              <ul>
                {data.roles.map((rol) => (
                  <li>
                    {rol.nombre}
                  </li>
                ))}
              </ul>
            </CardDescription>
          </Card>
        </CardColumn>

        <CardColumn>
          <Card>
            <Title>Perfil psicológico: {data.personalidad}</Title>
            <CardDescription dangerouslySetInnerHTML={{ __html: data.personalidad_descripcion }} />
          </Card>
        </CardColumn>

        <CardColumn>
          <Card>
            <Title>Características</Title>
            <CardDescription>
              <b>Apariencia: </b>{formData.apariencia}<br/><br/>
              <b>Ocupación/profesión: </b>{formData.ocupacion}<br/><br/>
              <b>Intereses: </b>{formData.intereses}<br/><br/>
              <b>Estatus social: </b>{formData.estatus_social}<br/><br/>
              <b>Creencia(s): </b>{formData.creencias}<br/><br/>
              <b>Antecedentes: </b>{formData.antecedentes}
            </CardDescription>
          </Card>
        </CardColumn>
      </CardRow>
    </>
  );
}

function StepSix({ narrative, esPrimerPersonaje = true }) {
  // El mensaje de "desbloqueaste tu primera estructura narrativa" +
  // imagen de la narrativa solo tiene sentido para el primer personaje
  // que se crea en toda la cuenta (Caso 2 de handleSubmit, historia +
  // personaje juntos desde cero). Para agregar un personaje adicional a
  // una historia que ya tenía otros (Caso 3), se muestra un mensaje
  // neutral en su lugar.
  if (!esPrimerPersonaje) {
    return (
      <FormContainer width="50%">
        <Title color='#43474f'><h1>¡Personaje creado con éxito!</h1></Title>
      </FormContainer>
    );
  }

  return (
    <>
      <FormContainer image={'images/congrats-characters.png'} width="50%">
        <Title color='#43474f'><h1>¡Felicitaciones!</h1></Title>
        <p>Has desbloqueado tu primera estructura narrativa</p>
      </FormContainer>
      <Image style={{height:'300px', margin:'auto', paddingBottom:'30px'}} src={narrative.imagen} loading='lazy'/>
    </>
  );
}

function RCharacterView() {
  const { id_personaje } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const id_historia = location.state?.id_historia;

  const { narrative,
    feature,
    characters,
    personalities,
    roles } = useSelector(state => state.story);

  // personalities/roles son mapas { [id_personaje]: valor } (ver
  // storySlice.js) — se leen por id_personaje, nunca por posición, para no
  // depender de en qué orden/subconjunto venga "characters".
  const character = id_personaje
    ? characters.find(c => String(c.id_personaje) === String(id_personaje))
    : null;
  const personalidadActual = id_personaje ? personalities[id_personaje] : null;
  const rolesActuales = id_personaje ? roles[id_personaje] : null;
  
  const [step, setStep] = useState(1);
  const [showPopup, setShowPopup] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  // Capturado UNA sola vez al montar (antes de crear nada): si al llegar a
  // esta pantalla la historia ya tenía personajes, este NO es el primer
  // personaje. Se congela con useRef (no se recalcula desde "characters" en
  // cada render) porque handleSubmit hace dispatch(setCharacters(...)) al
  // crear el personaje, y eso agregaría el nuevo personaje a "characters"
  // antes de que StepSix se renderice — dando un falso "sí es el primero".
  const esPrimerPersonajeDeLaHistoriaRef = useRef(
    !id_historia || characters.filter(c => String(c.id_historia) === String(id_historia)).length === 0
  );
  const [data, setData] = useState({
    personalidad: '',
    personalidad_descripcion: '',
    personalidad_imagen: '',
    roles: []
  });
  const [formData, setFormData] = useState({
    id_historia: '',
    nombre: '',
    apellido: '',
    edad: '',
    sexo: '',
    plan: '',
    decision: '',
    id_personalidad: '',
    apariencia: '',
    intereses: '',
    creencias: '',
    ocupacion: '',
    estatus_social: '',
    antecedentes: ''
  });

  useEffect(() => {
    if (id_personaje && character) {
      setFormData(character);

      setData({
        personalidad: personalidadActual?.nombre,
        personalidad_descripcion: personalidadActual?.descripcion,
        personalidad_imagen: personalidadActual?.imagen,
        roles: rolesActuales
      });
    }
  }, [id_personaje, character, personalidadActual, rolesActuales]);

  // Al crear un personaje NUEVO en una historia YA EXISTENTE (Caso 3 de
  // handleSubmit), el envío también hace un PUT a /historias/:id_historia
  // con el objeto "feature" tal como esté en Redux en ese momento. Pero
  // Redux solo se actualiza cuando se guarda una historia (dispatch(setFeature)
  // ocurre dentro del propio handleSubmit) — así que si la última historia
  // que se editó/guardó en esta sesión fue OTRA distinta a la actual,
  // "feature" seguía trayendo esos datos viejos. Al mandarlos en el PUT,
  // el backend comparaba el título de esa otra historia contra las
  // historias del usuario, encontraba la propia (con un id_historia
  // distinto al que se estaba excluyendo) y respondía "Ya tienes una
  // historia con ese título" — aunque la historia que se veía en pantalla
  // tuviera un título distinto. Para evitarlo, si vamos a crear un
  // personaje en una historia existente y "feature" no es esa historia,
  // la recargamos desde el backend antes de que el usuario pueda enviar.
  useEffect(() => {
    if (!id_personaje && id_historia && String(feature?.id_historia) !== String(id_historia)) {
      api.get(`/historias/detalle/${id_historia}`)
        .then(res => dispatch(setFeature(res.data)))
        .catch(error => {
          const errorMsg = error.response?.data?.error || error.response?.data?.detalle || 'Error al cargar la historia actual';
          alert(errorMsg);
        });
    }
  }, [id_personaje, id_historia, feature, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNextStep = async (e) => {
    e.preventDefault();

    if (step === 1) {
      if (
        !formData.nombre ||
        !formData.apellido ||
        !formData.edad ||
        !formData.sexo ||
        !formData.plan ||
        !formData.decision
      ) {
        alert('Por favor completa todos los campos.');
        return;
      }
    }

    if (step === 2) {
      if (!formData.id_personalidad) {
        alert('Por favor seleccione una personalidad.');
        return;
      }
    }

    if(step === 3){
      if(data.roles.length === 0){
        alert('Por favor seleccione al menos un rol actancial.');
        return;
      }
    }

    setStep(step + 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Obtenemos el array de roles del personaje actual
    const rolesOriginales = rolesActuales || [];
    const rolesNuevos = data.roles || [];

    // Detectar cambios en roles para enviar a DB
    const rolesOriginalesIds = rolesOriginales.map(r => r.id_rol);
    const rolesNuevosIds = rolesNuevos.map(r => r.id_rol);

    const rolesParaAgregar = rolesNuevos.filter(r => !rolesOriginalesIds.includes(r.id_rol));
    const rolesParaEliminar = rolesOriginales.filter(r => !rolesNuevosIds.includes(r.id_rol));

    let mensajesExito = [];
    try {
      // Caso 1: Editar personaje existente en historia existente
      if (id_personaje && id_historia) {
        // Actualizar personaje
        const personajeResponse = await api.put(
          `/personajes/${id_personaje}`,
          formData
        );
        mensajesExito.push(personajeResponse.data?.message || "Personaje actualizado con éxito.");

        // Actualizar historia
        const historiaResponse = await api.put(
          `/historias/${id_historia}`,
          feature
        );
        mensajesExito.push(historiaResponse.data?.message || "Historia actualizada con éxito.");

        // Actualizar roles en DB
        for (const rol of rolesParaAgregar) {
          await api.post(`/personaje-roles`, {
            id_personaje, id_rol: rol.id_rol
          });
        }
        for (const rol of rolesParaEliminar) {
          await api.delete(`/personaje-roles/${id_personaje}/${rol.id_rol}`);
        }

        // Refrescar lista final de roles desde DB (para asegurar consistencia)
        const rolesFinalResponse = await api.get(`/personaje-roles/${id_personaje}`);
        const rolesFinales = rolesFinalResponse.data;

        // personajeResponse.data e historiaResponse.data son ambos
        // { message, data: <objeto> } (ver controllers/personajes.js y
        // controllers/historias.js) — el objeto real está en ".data".
        const personajeActualizado = personajeResponse.data?.data;

        dispatch(setFeature(historiaResponse.data?.data));
        dispatch(setCharacter(personajeActualizado));
        dispatch(setPersonalityForCharacter({
          id_personaje,
          personality: {
            id_personalidad: formData.id_personalidad,
            nombre: data.personalidad,
            descripcion: data.personalidad_descripcion,
            imagen: data.personalidad_imagen
          }
        }));
        dispatch(setRolesForCharacter({
          id_personaje,
          roles: rolesFinales
        }));

        alert(mensajesExito.join("\n"));
        window.history.back();

      }
      // Caso 2 (fallback): crear historia y primer personaje juntos, para
      // cuando se llega aquí sin id_historia. En el flujo normal esto ya NO
      // debería pasar: desde la corrección del punto "pérdida de progreso
      // en los 4 pilares", RFeaturesView.js crea la historia en el backend
      // apenas se confirman los 4 pilares (antes de llegar aquí) y siempre
      // navega pasando su id_historia — así que si el usuario cierra la app
      // antes de crear un personaje, la historia ya queda guardada. Se deja
      // este caso como red de seguridad por si se navega directo a
      // /character sin ese state.
      else if (!id_personaje && !id_historia) {
        const id_usuario = localStorage.getItem('id_usuario');

        api.get(`/historias/${id_usuario}`)
        .then(res => {
          setShowTutorial(res.data.length === 0);
        })
        .catch (error => {
          const errorMsg = error.response?.data?.error || error.response?.data?.detalle || 'Error al cargar las historias del usuario';
          alert(errorMsg);
        });

        // Crear historia
        const historiaResponse = await api.post(
          '/historias',
          feature
        );
        // historiaResponse.data es { message, data: <historia> } (ver
        // controllers/historias.js) — antes se leía historiaResponse.data.id_historia
        // directamente, que siempre era undefined, así que el personaje se
        // creaba con id_historia: undefined.
        const historiaCreada = historiaResponse.data?.data;
        const nuevaIdHistoria = historiaCreada?.id_historia;
        mensajesExito.push(historiaResponse.data?.message || "Historia creada con éxito.");

        // Crear personaje vinculado a la historia
        const personajeResponse = await api.post(
          '/personajes',
          { ...formData, id_historia: nuevaIdHistoria }
        );
        // Igual que con historiaResponse: el personaje real está en ".data".
        const personajeCreado = personajeResponse.data?.data;
        const nuevoIdPersonaje = personajeCreado?.id_personaje;
        mensajesExito.push(personajeResponse.data?.message || "Personaje creado con éxito.");

         // Crear roles
        for (const rol of rolesNuevos) {
          await api.post(`/personaje-roles`, {
            id_personaje: nuevoIdPersonaje, id_rol: rol.id_rol
          });
        }

        const rolesFinalResponse = await api.get(
          `/personaje-roles/${nuevoIdPersonaje}`
        );
        const rolesFinales = rolesFinalResponse.data;

        dispatch(setFeature(historiaCreada));
        dispatch(setCharacters(personajeCreado));
        dispatch(setPersonalityForCharacter({
          id_personaje: nuevoIdPersonaje,
          personality: {
            id_personalidad: formData.id_personalidad,
            nombre: data.personalidad,
            descripcion: data.personalidad_descripcion,
            imagen: data.personalidad_imagen
          }
        }));
        dispatch(setRolesForCharacter({
          id_personaje: nuevoIdPersonaje,
          roles: rolesFinales
        }));

        alert(mensajesExito.join("\n"));
        setStep(step + 1);
      }
      // Caso 3: Crear nuevo personaje en historia existente
      else if (!id_personaje && id_historia) {
        // Crear personaje vinculado a la historia
        const personajeResponse = await api.post(
          '/personajes',
          { ...formData, id_historia }
        );
        // personajeResponse.data es { message, data: <personaje> } (ver
        // controllers/personajes.js) — igual que en los otros dos casos de
        // este mismo handleSubmit. Aquí faltaba aplicar el mismo fix: antes
        // se leía personajeResponse.data.id_personaje directamente, que
        // siempre era undefined, así que los roles se creaban/consultaban
        // con id_personaje: undefined y la personalidad/roles del personaje
        // recién creado quedaban guardados bajo la llave "undefined" del
        // mapa en vez de la del personaje real (no se veían en
        // RCharactersView.js).
        const personajeCreado = personajeResponse.data?.data;
        const nuevoIdPersonaje = personajeCreado?.id_personaje;
        mensajesExito.push(personajeResponse.data?.message || "Personaje creado con éxito.");

        // Actualizar historia existente
        const historiaResponse = await api.put(
          `/historias/${id_historia}`,
          feature
        );
        mensajesExito.push(historiaResponse.data?.message || "Historia actualizada con éxito.");

        // Crear roles
        for (const rol of rolesNuevos) {
          await api.post(`/personaje-roles`, {
            id_personaje: nuevoIdPersonaje, id_rol: rol.id_rol
          });
        }

        const rolesFinalResponse = await api.get(
          `/personaje-roles/${nuevoIdPersonaje}`
        );
        const rolesFinales = rolesFinalResponse.data;

        // Igual que arriba: la historia real está en .data.data.
        dispatch(setFeature(historiaResponse.data?.data));
        dispatch(setCharacters(personajeCreado));
        dispatch(setPersonalityForCharacter({
          id_personaje: nuevoIdPersonaje,
          personality: {
            id_personalidad: formData.id_personalidad,
            nombre: data.personalidad,
            descripcion: data.personalidad_descripcion,
            imagen: data.personalidad_imagen
          }
        }));
        dispatch(setRolesForCharacter({
          id_personaje: nuevoIdPersonaje,
          roles: rolesFinales
        }));

        // Mostrar mensajes juntos
        alert(mensajesExito.join("\n"));

        // Antes esto hacía window.history.back(), que asumía que se había
        // llegado aquí navegando desde el listado de personajes (RCharactersView).
        // Pero también se llega a este mismo Caso 3 al crear el primer
        // personaje justo después del wizard de "4 pilares" (RFeaturesView.js),
        // donde toda la secuencia previa (los 4 pilares) es un solo cambio de
        // "step" interno, sin navegación real de router — la única entrada de
        // historial antes de esta pantalla es la que llevó a /features. En ese
        // caso, history.back() devolvía al wizard reiniciado (step 1 de la
        // creación de la historia) en vez de llevar al listado de personajes.
        // Ahora, en vez de depender del historial del navegador, se avanza al
        // paso 6 de este mismo componente (como en el Caso 2), que muestra un
        // mensaje de éxito y un botón "Mis personajes" que navega explícitamente
        // a /characters/:id_historia — funciona igual sin importar desde dónde
        // se haya llegado a crear el personaje.
        setStep(step + 1);
      }
    } catch (error) {
      const errorMsg = error.response?.data?.error || error.response?.data?.detalle || 'Error al guardar';
      alert(errorMsg);
    }
  };
  
  const handleCancel = () => {
    const confirmar = window.confirm("¿Estás seguro de que quieres salir? Los cambios se perderán.");
    if (!confirmar) return;

    if(id_personaje || id_historia)
      window.history.back();
    else
      navigate('/home');
  };

  const popUp = () => {
    setShowPopup(true);
  };

  return <>
    <BackgroundImage src='images/narratives-background.jpg' loading='lazy'/>
    
    <Container>
      <Opacity>
        <TopMenu feature={feature} popUp={popUp}/>

        <StepsWrapper>
          <LeftColumn>
            <RotatedTitle>CREA TU<br/>PERSONAJE</RotatedTitle>
          </LeftColumn>
          <RightColumn>
            <StepsContainer>
              <Step active={step === 1} step={1} padding="20px 10px 20px 10px">
                <b>Perfil</b>
              </Step>
              <Step active={step === 2} step={2} padding="20px 40px 20px 40px">
                <b>Personalidad</b>
              </Step>
              <Step active={step === 3} step={3} padding="20px 40px 20px 40px">
                <b>Rol</b>
              </Step>
              <Step active={step === 4} step={4} padding="20px 40px 20px 40px">
                <b>Características</b>
              </Step>
              <Step active={step === 5} step={5} padding="20px 40px 20px 40px">
                <b>Resumen</b>
              </Step>
            </StepsContainer>
          </RightColumn>
        </StepsWrapper>
      </Opacity>

      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, width: '100%' }}>
        {step === 1 && <StepOne data={data} setData={setData} formData={formData} setFormData={setFormData} handleChange={handleChange} />}
        {step === 2 && <StepTwo formData={formData} setFormData={setFormData} data={data} setData={setData} />}
        {step === 3 && <StepThree data={data} setData={setData} />}
        {step === 4 && <StepFour formData={formData} handleChange={handleChange }/>}
        {step === 5 && <StepFive formData={formData} data={data} />}
        {step === 6 && <StepSix narrative={narrative} esPrimerPersonaje={esPrimerPersonajeDeLaHistoriaRef.current}/>}
      </div>

      <ButtonsContainer>
        {step >= 1 && step <= 5 && <ButtonSecondary onClick={handleCancel}>Cancelar</ButtonSecondary>}
        {step > 1 && step < 6 && <ButtonSecondary onClick={() => setStep(step - 1)}>Anterior</ButtonSecondary>}
        {step < 5 && <ButtonPrimary onClick={handleNextStep}>Siguiente</ButtonPrimary>}
        {step === 5 && <ButtonPrimary onClick={handleSubmit} type="submit">Enviar</ButtonPrimary>} 
        {step === 6 && <ButtonPrimary onClick={() => {
          if(showTutorial)
              navigate(`/characters/${feature.id_historia}`, { state: { showTutorial } })
            else
              navigate(`/characters/${feature.id_historia}`)

        }}>Mis personajes</ButtonPrimary>}
      </ButtonsContainer>

      <PopUp
        setNarrative={setNarrative}
        setFeature={setFeature}
        setGenre={setGenre}
        setPlot={setPlot}
        setDesire={setDesire}
        setTime={setTime}
        setCharacters={setCharacters}
        setPersonalities={setPersonalities}
        setRoles={setRoles}
        setCurrentStage={setCurrentStage}
        showPopup={showPopup}
        setShowPopup={setShowPopup}
      />
    </Container>
  </>
}

const BackgroundImage = styled.img`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  object-fit: cover;
  z-index: -1;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  box-sizing: border-box;
`;

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 40px;
  width: 100%;
`;

const Column = styled.div`
  flex: 1;
  box-sizing: border-box;
`;

const Title = styled.h1`
  font-size: 15px;
  font-weight: 800;
  color: ${props => (props.color == null ? 'white' : props.color)};
  display: flex;
  justify-content: ${props =>
    props.align === 'left' ? 'flex-start' :
    props.align === 'right' ? 'flex-end' :
    'center'};
  box-sizing: border-box;
`;

const RotatedTitle = styled.div`
  font-weight: 900;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: rotate(-90deg);
  transform-origin: center center;
  text-align: center;
  color: white;
  font-size: 18px;
  word-break: break-word;
  white-space: normal;
  max-width: 100%;
`;

const Subtitle = styled.div`
  font-size: 14px;
  font-weight: 800;
  color: #43474f;
  align-self: flex-start;
`;

const Paragraph = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #43474f;
  align-self: center;
  margin: 10px;
  padding: 15px;
  background-image: url('images/top-bar.png');
  background-color: transparent;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center;
  box-sizing: border-box;
`;

const Label = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: #43474f;
  margin: 5px;
`;

const LabelRadioButton = styled.label`
  font-size: 12px;
  color: #43474f;
  margin-left: 10px;
  cursor: pointer;
`;

const Input = styled.input`
  width: 100%;
  padding: 5px;
  background-color: transparent;
  font-size: 12px;
  color: black;
  box-sizing: border-box;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 60px;
  padding: 10px;
  background-color: transparent;
  font-size: 14px;
  color: black;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 5px;
  resize: none;
  overflow-y: auto;

  white-space: pre-wrap;
  word-wrap: break-word;

  /* Scroll personalizado */
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 3px;
  }

  scrollbar-width: thin;
  scrollbar-color: rgba(0, 0, 0, 0.3) transparent;
`;

const Select = styled.select`
  width: 100%;
  padding: 5px;
  font-size: 12px;
  color: black;
  box-sizing: border-box;
`;

const InputRadio = styled.input`
  width: 18px;
  height: 18px;
  cursor:pointer;
`;

const Opacity = styled.div`
  width: 100%;
  flex-shrink: 0;
  background-image: url('images/opacity.png');
  background-size: fill;
  background-repeat: no-repeat;
  background-position: center;
`;

const StepsWrapper = styled.div`
  display: flex;
  align-items: stretch;
  width: 98%;
  margin: 0 auto;
  height: auto; 
  min-height: 125px;  
`;

const LeftColumn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
`;

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: center;
`;

const StepsContainer = styled.div`
  display: flex;
  width: 98%;
`;

const Step = styled.div`
  flex: 1;
  text-align: center;
  font-size: 12px;
  color: ${props => (props.active ? '#fff' : '#43474f')};
  background-color: transparent;
  padding: ${({ padding }) => padding};
  transition: all 0.3s ease;
  background-image: ${({ active, step }) => {
    if (active) {
      if (step === 1) 
        return "url('images/first-selected-progress-bar.png')";
      else
        return "url('images/middle-selected-progress-bar.png')";
    }
    else {
      if (step === 1)
        return "url('images/first-progress-bar.png')";
      else
        return "url('images/middle-progress-bar.png')";
    }
  }};
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-sizing: border-box;
  word-wrap: break-word;
  word-break: break-word;
  white-space: normal;
`;

const FormContainer = styled.form` 
  padding: 20px 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: ${({ image }) => image ? `url(${image})` : 'url("images/section.png")'};
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  width: ${({ width }) => width || '80%'};
  max-width: 1200px; /* limita ancho máximo en pantallas grandes */
  box-sizing: border-box;
  border-radius: 40px;
  margin: auto; /* esto centra vertical y horizontalmente */
  flex: 0; /* no estira todo el espacio disponible */
`;

const Image = styled.img`
  display: block;       /* hace que margin auto funcione */
  margin: 0 auto;       /* centra horizontalmente */
  max-width: 90%;
  max-height: 90%;
  object-fit: contain;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center; /* centra los botones horizontalmente */
  flex-wrap: wrap;         /* permite que los botones se acomoden en varias filas si no caben */
  gap: 20px;
  margin: 0px auto 10px auto; /* centra el contenedor horizontalmente y separa arriba */
  padding: 0;
  width: ${({ width }) => width || '80%'}; /* mismo ancho que FormContainer */
  max-width: 1200px; /* opcional: mismo máximo que FormContainer */
  box-sizing: border-box;
`;

const ButtonPrimary = styled.button`
  padding: 10px 30px;
  font-size: 15px;
  border: none;
  border-radius: 6px;
  background-color: #43474f;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: gray;
  }
`;

const ButtonSecondary = styled.button`
  padding: 10px 30px;
  font-size: 15px;
  border: none;
  border-radius: 6px;
  background-color: white;
  color: #43474f;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #43474f;
    color: white;
  }
`;

const CardRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); 
  gap: 20px;
  align-items: stretch;
  justify-items: center;

  width: 100%;
  max-width: 1200px;
  margin: auto;
  box-sizing: border-box;
`;

const CardColumn = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const Card = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;   /* 👈 importante: el contenido arranca arriba */
  align-items: stretch;

  padding: 20px 40px 30px 40px;
  background-image: url('images/card-dark.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center;

  width: 100%;
  height: 400px;     /* 🔑 altura controlada de la tarjeta */
  box-sizing: border-box;
  overflow: hidden;  /* evita que se desborde */
`;

const CardDescription = styled.div`
  color: white;
  font-size: 12px;
  text-align: left;
  width: 100%;

  flex: 1;          /* ocupa el espacio sobrante dentro del Card */
  min-height: 0;    /* 👈 truco para que funcione bien el scroll en flexbox */
  overflow-y: auto; /* ahora sí el scroll aparece */
  padding-right: 5px;

  word-break: break-word;
  overflow-wrap: break-word;

  ul {
    padding-left: 18px;
    margin: 0 0 1em 0;
    list-style-type: disc;
  }

  li {
    margin-bottom: 0.5em;
    list-style-position: outside;
  }

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 3px;
  }

  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.3) transparent;
`;

const CardHorizontal = styled.form`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  padding: 20px 30px 20px 0px;
  background-image: ${({ image }) => `url(${image})`};
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center;
  height: 175px;
  width: 100%;
  margin: 0 auto;
  box-sizing: border-box;
  text-align: right;
  box-shadow: ${({ selected }) =>
    selected
      ? '0 0 10px 4px rgba(255, 255, 255, 0.8)'
      : '0 4px 12px rgba(0, 0, 0, 0.1)'};
  border: ${({ selected }) =>
    selected ? '2px solid rgba(255, 255, 255, 0.8)' : 'none'};
  transition: box-shadow 0.2s ease, border 0.2s ease;

`;

const CardHorizontalDescription = styled.div`
  color: white;
  font-size: 11px;
  text-align: justify;
  width: 60%;
  height: 150px;
  overflow-y: auto;
  padding-right: 5px;

  ul {
    padding-left: 18px;
    margin: 0 0 1em 0;
    list-style-type: disc;
  }

  li {
    margin-bottom: 0.5em;
    list-style-position: outside;
  }

  /* Scroll personalizado */
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 3px;
  }

  /* Firefox */
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.3) transparent;
`;

const LabelCheckbox = styled.label`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  font-size: 12px;
  color: #43474f;
`;

const InputCheckbox = styled.input`
  margin-right: 10px;
`;

export default RCharacterView;