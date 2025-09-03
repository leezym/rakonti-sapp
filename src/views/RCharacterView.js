import api from "../api/axiosConfig";
import { useEffect, useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import TopMenu from './TopMenu';
import PopUp from './PopUp';
import {
  setNarrative, 
  setFeature,
  setGenre,
  setPlot,
  setDesire,
  setTime,
  setCharacter,
  setCharacters,
  setPersonality,
  setPersonalities,
  setRolesAtIndex,
  setRoles,
  setCurrentStage
} from '../redux-store/reducers/storySlice';

function StepOne({ formData, handleChange }) {
  return (
    <>
      <br/>
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
      <br/>
      <FormContainer>
        <Subtitle style={{marginBottom:'8px'}}>Perfil psicológico</Subtitle>
        <Label>¿El personaje prefiere seguir un plan detallado y organizado o improvisar y adaptarse según las circunstancias?</Label>
        <Row>
          <Column style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
            <InputRadio type="radio"
                  id="organizado"
                  name="plan"
                  value="organizado"
                  checked={formData.plan === 'organizado'}
                  onChange={handleChange}
              />
            <LabelRadioButton htmlFor="organizado">Seguir un plan detallado y organizado</LabelRadioButton>
          </Column>
          <Column style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
            <InputRadio type="radio"
                  id="improvisado"
                  name="plan"
                  value="improvisado"
                  checked={formData.plan === 'improvisado'}
                  onChange={handleChange}
            />
            <LabelRadioButton htmlFor="improvisado">Improvisar y adaptarse según las circunstancias</LabelRadioButton>
          </Column>
        </Row>

        <Label>¿El personaje toma decisiones basadas en hechos y lógica o se guía por sus ideas, intuiciones y emociones?</Label>
        <Row>
          <Column style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
            <InputRadio type="radio"
                  id="logica"
                  name="decision"
                  value="logica"
                  checked={formData.decision === 'logica'}
                  onChange={handleChange}
              />
            <LabelRadioButton htmlFor="logica">Toma decisiones basadas en hechos y lógica</LabelRadioButton>
          </Column>
          <Column style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
            <InputRadio type="radio"
                  id="intuicion"
                  name="decision"
                  value="intuicion"
                  checked={formData.decision === 'intuicion'}
                  onChange={handleChange}
            />
            <LabelRadioButton htmlFor="intuicion">Se guía por sus ideas, intuiciones y emociones</LabelRadioButton>
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
      .catch(err => console.error('Error al cargar las personalidades:', err));
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

  const primerasDos = personalidadesFiltradas.slice(0, 2);
  const ultimasDos = personalidadesFiltradas.slice(2, 4);

  return (
    <>
      <Paragraph>De acuerdo al perfil psicológico elegido te proponemos usar una de las siguientes personalidades:</Paragraph>
      <Row>
        {primerasDos.map(personalidad => (
          <Column key={personalidad.id_personalidad}>
            <CardHorizontal
              image={personalidad.imagen}
              id={personalidad.id_personalidad}
              selected={formData.id_personalidad === personalidad.id_personalidad}
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
          </Column>
        ))}
      </Row>

      <Row>
        {ultimasDos.map(personalidad => (
          <Column key={personalidad.id_personalidad}>
            <CardHorizontal
              image={personalidad.imagen}
              key={personalidad.id_personalidad}
              selected={formData.id_personalidad === personalidad.id_personalidad}
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
          </Column>
        ))}
      </Row>
    </>
  );
}


function StepThree({ data, setData }) {
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    api.get('/roles')
      .then(res => setRoles(res.data))
      .catch(err => console.error('Error al cargar los roles:', err));
  }, []);

  return (
    <>
      <br/>
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
          {dividirEnColumnas(roles, 2).map((columna, i) => (
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
              <p style={{color:'white'}}>
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
              </p>
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
              <p style={{color:'white'}}>
                <b>Apariencia: </b>{formData.apariencia}<br/><br/>
                <b>Ocupación/profesión: </b>{formData.ocupacion}<br/><br/>
                <b>Intereses: </b>{formData.intereses}<br/><br/>
                <b>Estatus social: </b>{formData.estatus_social}<br/><br/>
                <b>Creencia(s): </b>{formData.creencias}<br/><br/>
                <b>Antecedentes: </b>{formData.antecedentes}
              </p>
            </CardDescription>
          </Card>
        </CardColumn>
      </CardRow>
    </>
  );
}

function StepSix({ narrative }) {
  return (
    <>
      <br/>
      <FormContainer width="50%">
        <Title color='#43474f'><h1>¡Felicitaciones!</h1></Title>
        <p>Has desbloqueado tu primera estructura narrativa</p>
      </FormContainer>
      <Image style={{width:'30%', marginTop:'15px'}} src={narrative.imagen} loading='lazy'/>
    </>
  );
}

function RCharacterView() {
  const { id_personaje } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const id_historia = location.state?.id_historia;
  const index = location.state?.index;

  const { narrative, 
    feature,
    characters,
    personalities,
    roles } = useSelector(state => state.story);
  
  const [step, setStep] = useState(1);
  const [showPopup, setShowPopup] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
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
    if (id_personaje) {
      setFormData(characters[index]);

      setData({
        personalidad: personalities[index]?.nombre,
        personalidad_descripcion: personalities[index]?.descripcion ,
        personalidad_imagen: personalities[index]?.imagen,
        roles: roles[index]
      });
    }
  }, [id_personaje, characters, personalities, roles, index]);

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
    const rolesOriginales = roles[index] || [];
    const rolesNuevos = data.roles || [];

    // Detectar cambios en roles para enviar a DB
    const rolesOriginalesIds = rolesOriginales.map(r => r.id_rol);
    const rolesNuevosIds = rolesNuevos.map(r => r.id_rol);

    const rolesParaAgregar = rolesNuevos.filter(r => !rolesOriginalesIds.includes(r.id_rol));
    const rolesParaEliminar = rolesOriginales.filter(r => !rolesNuevosIds.includes(r.id_rol));

    try {
      let mensajesExito = [];

      // Caso 1: Editar personaje existente en historia existente
      if (id_personaje && id_historia) {
        // Actualizar personaje
        const personajeResponse = await api.put(
          `/personajes/${id_personaje}`,
          formData
        );
        mensajesExito.push("Personaje actualizado con éxito.");

        // Actualizar historia
        const historiaResponse = await api.put(
          `/historias/${id_historia}`,
          feature
        );
        mensajesExito.push("Historia actualizada con éxito.");

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

        dispatch(setFeature(historiaResponse.data));
        dispatch(setCharacter(personajeResponse.data));
        dispatch(setPersonality({
          id_personalidad: formData.id_personalidad,
          nombre: data.personalidad,
          descripcion: data.personalidad_descripcion,
          imagen: data.personalidad_imagen
        }));
        dispatch(setRolesAtIndex({
          index,
          roles: rolesFinales
        }));

        alert(mensajesExito.join("\n"));
        window.history.back();

      }
      // Caso 2: Crear historia y primer personaje (cuando no existe historia)
      else if (!id_personaje && !id_historia) {
        const id_usuario = localStorage.getItem('id_usuario');
    
        api.get(`/historias/${id_usuario}`)
        .then(res => {
          setShowTutorial(res.data.length === 0);
        })
        .catch(err => console.error('Error al cargar las historias del usuario:', err));

        // Crear historia
        const historiaResponse = await api.post(
          '/historias',
          feature
        );
        const nuevaIdHistoria = historiaResponse.data.id_historia;
        mensajesExito.push("Historia creada con éxito.");

        // Crear personaje vinculado a la historia
        const personajeResponse = await api.post(
          '/personajes',
          { ...formData, id_historia: nuevaIdHistoria }
        );
        const nuevoIdPersonaje = personajeResponse.data.id_personaje;
        mensajesExito.push("Personaje creado con éxito.");

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

        dispatch(setFeature(historiaResponse.data));
        dispatch(setCharacters(personajeResponse.data));
        dispatch(setPersonalities({
          id_personalidad: formData.id_personalidad,
          nombre: data.personalidad,
          descripcion: data.personalidad_descripcion,
          imagen: data.personalidad_imagen
        }));
        dispatch(setRoles([rolesFinales])); 

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
        const nuevoIdPersonaje = personajeResponse.data.id_personaje;
        mensajesExito.push("Personaje creado con éxito.");

        // Actualizar historia existente
        const historiaResponse = await api.put(
          `/historias/${id_historia}`,
          feature
        );
        mensajesExito.push("Historia actualizada con éxito.");

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
        
        dispatch(setFeature(historiaResponse.data));
        dispatch(setCharacters(personajeResponse.data));
        dispatch(setPersonalities({
          id_personalidad: formData.id_personalidad,
          nombre: data.personalidad,
          descripcion: data.personalidad_descripcion,
          imagen: data.personalidad_imagen
        }));
        dispatch(setRoles([...roles, rolesFinales]));

        // Mostrar mensajes juntos
        alert(mensajesExito.join("\n"));
        window.history.back();
      }
    } catch (error) {
      if (error.response?.status === 409) {
        const mensaje = error.response.data?.error || '';
        if (mensaje.includes('historia')) {
          alert('Ya existe una historia con ese título. Por favor elige otro.');
        } else if (mensaje.includes('personaje')) {
          alert('Ya existe un personaje con ese nombre y apellido. Por favor elige otro.');
        } else {
          alert(`Conflicto: ${mensaje}`);
        }
      } else {
        alert(`Error inesperado: ${error.message}`);
      }
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
    
    <Opacity>
      <TopMenu feature={feature} popUp={popUp}/>

      <StepsWrapper>
        <LeftColumn>
          <RotatedTitle>CREADOR DE<br/>PERSONAJES</RotatedTitle>
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

    <Container>
      {step === 1 && <StepOne formData={formData} handleChange={handleChange} />}
      {step === 2 && <StepTwo formData={formData} setFormData={setFormData} data={data} setData={setData} />}
      {step === 3 && <StepThree data={data} setData={setData} />}
      {step === 4 && <StepFour formData={formData} handleChange={handleChange }/>}
      {step === 5 && <StepFive formData={formData} data={data} />}
      {step === 6 && <StepSix narrative={narrative}/>}

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

    </Container>

    <PopUp
      setNarrative={setNarrative}
      setFeature={setFeature}
      setGenre={setGenre}
      setPlot={setPlot}
      setDesire={setDesire}
      setTime={setTime}
      setCharacters={setCharacters}
      setPersonalities={setPersonalities}
      setCurrentStage={setCurrentStage}
      showPopup={showPopup}
      setShowPopup={setShowPopup}
    />
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
  align-items: center;
  display: flex;
  justify-content: flex-start;
  position: relative;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 40px;
  width: 100%;
  padding: 8px 0px 8px 0px;
`;

const Column = styled.div`
  flex: 1;
  max-width: 48%;
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
  font-size: 16px;
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
`;

const LabelRadioButton = styled.label`
  font-size: 14px;
  color: #43474f;
  display: inline-block;
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
`;

const Opacity = styled.div`
  width: 100%;
  height: 20%;
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
  min-height: 135px;  
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
  padding: 20px 40px 20px 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: url('images/section.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  width: 70%;
  box-sizing: border-box;
  border-radius: 45px;
`;

const Image = styled.img`
  max-width: 90%;
  max-height: 90%;
  object-fit: contain;
`;

const ButtonsContainer = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  gap: 20px;
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
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  width: 70%;
  margin: 0 auto;
  grid-auto-rows: 1fr; /*Esto fuerza igual altura en TODAS las filas */
`;

const CardColumn = styled.div`
  display: flex;
  align-items: stretch;
  height: 100%;
`;

const Card = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px 30px 40px;
  background-image: url('images/card-dark.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
`;

const CardDescription = styled.div`
  color: white;
  font-size: 12px;
  text-align: left;
  width: 100%;
  flex: 1;
  max-height: 250px;
  overflow-y: auto;
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

  /* WebKit (Chrome, Safari, Edge) */
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.3); /* blanco translúcido */
    border-radius: 3px;
  }

  /* Firefox */
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
  width: 80%;
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
  font-size: 14px;
  color: #43474f;
`;

const InputCheckbox = styled.input`
  margin-right: 10px;
`;

export default RCharacterView;