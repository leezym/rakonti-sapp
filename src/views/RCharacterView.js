import { useEffect, useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
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
  setRol,
  setRoles,
  setCurrentStage
} from '../redux-store/reducers/storySlice';

function StepOne({ formData, handleChange }) {
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
        <Subtitle>Perfil psicológico</Subtitle>

        <Label>¿El personaje prefiere seguir un plan detallado y organizado o improvisar y adaptarse según ñas circunstancias?</Label>
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
    axios.get('http://localhost:5001/rakonti/personalidades')
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
      <Paragraph>De acuerdo al perfil psicológico elegido te proponemos usar una de las siguientes personalidades</Paragraph>
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
              <Title align="right">{personalidad.nombre}</Title>
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
              <Title align="right">{personalidad.nombre}</Title>
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
    axios.get('http://localhost:5001/rakonti/roles')
      .then(res => setRoles(res.data))
      .catch(err => console.error('Error al cargar los roles:', err));
  }, []);

  return (
      <FormContainer>
        <p style={{ color: '#43474f' }}>Los <b>Roles actanciales</b> son elementos clave en la estructura narrativa de una historia. Ayudan a definir las relaciones entre los personajes y las fuerzas que impulsan la trama. Al identificar estos roles, se puede comprender mejor la motivación de los personajes y el significado de sus acciones. Para definir los roles actanciales ten en cuenta estos tres puntos:
          <ul>
            <li>El objeto es el único rol actancial que puede ocupar o no un personaje, el resto de los roles siempre son ocupados por personajes.</li>
            <li>Un rol actancial puede ser ocupado por uno o más personajes.</li>
            <li>Un personaje puede ocupar uno o varios roles actanciales.</li>
          </ul>
          Selecciona qué rol(es) actancial(es) ocupa este personaje que estás creando:
        </p>
      <Row>
        {dividirEnColumnas(roles, 2).map((columna, i) => (
          <Column key={i}>
            {columna.map(rol => (
              <>
                <LabelCheckbox key={rol.id_rol}>
                  <InputCheckbox type="checkbox"
                        value={rol.id_rol}
                        checked={data.roles.includes(rol.id_rol)}
                        onChange={(e) => {
                          const id = parseInt(e.target.value);
                          const seleccionados = data.roles;
                          
                          if (e.target.checked) {
                            setData({ ...data, roles: [...seleccionados, id] });
                          } else {
                            setData({
                              ...data,
                              roles: seleccionados.filter(g => g !== id)
                            });
                          }
                        }}
                        />
                  <b>{rol.nombre}</b>
                </LabelCheckbox>
                <div dangerouslySetInnerHTML={{ __html: rol.descripcion }} />
              </>
            ))}
          </Column>
        ))}
      </Row>
    </FormContainer>
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
              <p>
                <b>Nombre(s): </b>{formData.nombre}<br/><br/>
                <b>Apellido(s): </b>{formData.apellido}<br/><br/>
                <b>Edad: </b>{formData.edad}<br/><br/>
                <b>Género: </b>{formData.sexo}
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
              <p>
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
      <FormContainer width="50%" style={{padding: '0px 0px 0px 0px'}}>
        <Title color='#43474f'><h1>¡Felicitaciones!</h1></Title>
        <p style={{color:'#43474f'}}>Has desbloqueado tu primera estructura narrativa</p>
      </FormContainer>
      <Image style={{width:'20%', marginTop:'15px'}} src={narrative.imagen}/>
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
    personalities } = useSelector(state => state.story);
  
  const [step, setStep] = useState(1);
  const [showPopup, setShowPopup] = useState(false);
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
      // Estamos editando: obtener los datos del personaje
      setFormData(characters[index]);
      setData({
        ...data,
        personalidad: personalities[index].nombre,
        personalidad_descripcion: personalities[index].descripcion,
        personalidad_imagen: personalities[index].imagen
      })

      axios.get(`http://localhost:5001/rakonti/personaje-roles/${id_personaje}`)
      .then(res => {
        const rolesArray = Array.isArray(res.data) ? res.data : [];
        
        setData({
          ...data,
          roles: rolesArray.map(r => r.id_rol)
        });
      })
      .catch(err => console.error('Error al cargar los roles por personaje:', err));

    }
  }, [id_personaje]);

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

    // Caso 1: Editar personaje existente en historia existente
    if (id_personaje && id_historia) {
      try {
        let mensajesExito = [];

        // Actualizar personaje
        const personajeResponse = await axios.put(
          `http://localhost:5001/rakonti/personajes/${id_personaje}`,
          formData
        );
        mensajesExito.push("Personaje actualizado con éxito");

        // Actualizar historia
        const historiaResponse = await axios.put(
          `http://localhost:5001/rakonti/historias/${id_historia}`,
          feature
        );
        mensajesExito.push("Historia actualizada con éxito");

        // Actualizar roles
        const rolesActualesResponse = await axios.get(
          `http://localhost:5001/rakonti/personaje-roles/${id_personaje}`
        );
        const rolesActuales = rolesActualesResponse.data.map(r => r.id_rol);
        // Roles a agregar y eliminar
        const rolesParaAgregar = data.roles.filter(id => !rolesActuales.includes(id));
        const rolesParaEliminar = rolesActuales.filter(id => !data.roles.includes(id));
        
        // Eliminar roles que el usuario quitó
        for (const id_rol of rolesParaEliminar) {
          await axios.delete(
            `http://localhost:5001/rakonti/personaje-roles/${id_personaje}/${id_rol}`
          );
        }
        
        //  Agregar roles nuevos
        for (const id_rol of rolesParaAgregar) {
          const rolResponse = await axios.post(
            'http://localhost:5001/rakonti/personaje-roles',
            { id_personaje, id_rol }
          );
          dispatch(setRol({
            id_personaje,
            ...rolResponse.data
          }));
        }

        dispatch(setFeature(historiaResponse.data));
        dispatch(setCharacter(personajeResponse.data));
        dispatch(setPersonality({
          id_personalidad: formData.id_personalidad,
          nombre: data.personalidad,
          descripcion: data.personalidad_descripcion,
          imagen: data.personalidad_imagen
        }));

        // Mostrar todos los mensajes juntos
        alert(mensajesExito.join("\n"));

        // Volver atrás
        window.history.back();

      } catch (error) {
        console.error(error);
        alert(`Ocurrió un error al guardar el personaje: ${error.message}`);
      }
    }
    /*if (id_personaje && id_historia) {
      try {
        const personajeResponse = await axios.put(`http://localhost:5001/rakonti/personajes/${id_personaje}`, formData);
        alert('Personaje actualizado con éxito');

        const historiaResponse = await axios.put(`http://localhost:5001/rakonti/historias/${id_historia}`, feature);
        alert('Título actualizado con éxito');
        
        let rolResponse;
        for (const id_rol of data.roles) {
          rolResponse = axios.put(`http://localhost:5001/rakonti/personaje-roles/${id_personaje}/${id_rol}`, {
            id_personaje,
            id_rol
          });
        }

        console.log("rolResponse: "+rolResponse.data)

        dispatch(setFeature(historiaResponse.data));
        dispatch(setCharacter(personajeResponse.data));
        dispatch(setPersonality({
          id_personalidad: formData.id_personalidad,
          nombre: data.personalidad,
          descripcion: data.personalidad_descripcion
        }));
        dispatch(setRol(rolResponse.data));

        window.history.back();
      } catch (error) {
        alert('Ocurrió un error al guardar el personaje. ' + error);
      }
    } */

    // Caso 2: Crear historia y primer personaje (cuando no existe historia)
    else if (!id_personaje && !id_historia) {
      try {
        let mensajesExito = [];

        // Crear historia
        const historiaResponse = await axios.post(
          'http://localhost:5001/rakonti/historias',
          feature
        );
        const nuevaIdHistoria = historiaResponse.data.id_historia;
        mensajesExito.push("Historia creada con éxito");

        // Crear personaje vinculado a la historia
        const personajeResponse = await axios.post(
          'http://localhost:5001/rakonti/personajes',
          { ...formData, id_historia: nuevaIdHistoria }
        );
        mensajesExito.push("Personaje creado con éxito");

        // Crear roles del personaje
        const rolesResponses = [];
        for (const id_rol of data.roles) {
          const rolResponse = await axios.post(
            'http://localhost:5001/rakonti/personaje-roles',
            { id_personaje: personajeResponse.data.id_personaje, id_rol }
          );
          rolesResponses.push(rolResponse.data);
        }

        dispatch(setFeature(historiaResponse.data));
        dispatch(setCharacters(personajeResponse.data));
        dispatch(setPersonalities({
          id_personalidad: formData.id_personalidad,
          nombre: data.personalidad,
          descripcion: data.personalidad_descripcion,
          imagen: data.personalidad_imagen
        }));
        if (rolesResponses.length > 0) {
        dispatch(setRoles(rolesResponses));
      }

        // Mostrar mensajes de éxito juntos
        alert(mensajesExito.join("\n"));

        setStep(step + 1);

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
    }

      /*if (!id_personaje && !id_historia) {
      try {
        // Crear historia
        const historiaResponse = await axios.post('http://localhost:5001/rakonti/historias', feature);
        const nuevaIdHistoria = historiaResponse.data.id_historia;

        // Crear personaje con nueva historia
        const personajeResponse = await axios.post('http://localhost:5001/rakonti/personajes', {
          ...formData,
          id_historia: nuevaIdHistoria
        });
        
        let rolResponse;
        for (const id_rol of data.roles) {
          rolResponse = axios.post('http://localhost:5001/rakonti/personaje-roles', {
            id_personaje: personajeResponse.data.id_personaje,
            id_rol
          });
        }

        dispatch(setFeature(historiaResponse.data));
        dispatch(setCharacters(personajeResponse.data));
        dispatch(setPersonalities({
          id_personalidad: formData.id_personalidad,
          nombre: data.personalidad,
          descripcion: data.personalidad_descripcion
        }));
        dispatch(setRoles(rolResponse.data));

        console.log("personalities: "+personalities)

        setStep(step + 1);
      } catch (error) {
        if (error.response?.status === 409) {
          const mensaje = error.response.data?.error || '';
          if (mensaje.includes('historia')) {
            alert('Ya existe una historia con ese título. Por favor elige otro.');
          } else if (mensaje.includes('personaje')) {
            alert('Ya existe un personaje con ese nombre y apellido. Por favor elige otro.');
          } else {
            alert(mensaje);
          }
        } else {
          alert('Error inesperado: ' + error.message);
        }
      }
    } */

    // Caso 3: Crear nuevo personaje en historia existente
    else if (!id_personaje && id_historia) {
      try {
        let mensajesExito = [];

        // Crear personaje vinculado a la historia
        const personajeResponse = await axios.post(
          'http://localhost:5001/rakonti/personajes',
          { ...formData, id_historia }
        );
        mensajesExito.push("Personaje creado con éxito");

        // Actualizar historia existente
        const historiaResponse = await axios.put(
          `http://localhost:5001/rakonti/historias/${id_historia}`,
          feature
        );
        mensajesExito.push("Historia actualizada con éxito");

        // Asignar roles al personaje
        const rolesResponses = [];
        for (const id_rol of data.roles) {
          const rolResponse = await axios.post(
            'http://localhost:5001/rakonti/personaje-roles',
            { id_personaje: personajeResponse.data.id_personaje, id_rol }
          );
          rolesResponses.push(rolResponse.data);
        }

        dispatch(setFeature(historiaResponse.data));
        dispatch(setCharacters(personajeResponse.data));
        dispatch(setPersonalities({
          id_personalidad: formData.id_personalidad,
          nombre: data.personalidad,
          descripcion: data.personalidad_descripcion,
          imagen: data.personalidad_imagen
        }));
        if (rolesResponses.length > 0) {
          dispatch(setRoles(rolesResponses));
        }

        // Mostrar mensajes juntos
        alert(mensajesExito.join("\n"));

        window.history.back();

      } catch (error) {
        if (error.response?.status === 409) {
          alert('Ya existe un personaje con ese nombre y apellido. Por favor elige otro.');
        } else {
          alert(`Error inesperado: ${error.message}`);
        }
      }
    }

      /*if (!id_personaje && id_historia) {
      try {
        const personajeResponse = await axios.post('http://localhost:5001/rakonti/personajes', {
          ...formData,
          id_historia
        });

        const historiaResponse = await axios.put(`http://localhost:5001/rakonti/historias/${id_historia}`, feature);
        
        let rolResponse;
        for (const id_rol of data.roles) {
          await axios.post('http://localhost:5001/rakonti/personaje-roles', {
            id_personaje: personajeResponse.data.id_personaje,
            id_rol
          });
        }

        dispatch(setFeature(historiaResponse.data));
        dispatch(setCharacters(personajeResponse.data));
        dispatch(setPersonalities({
          id_personalidad: formData.id_personalidad,
          nombre: data.personalidad,
          descripcion: data.personalidad_descripcion
        }));
        dispatch(setRoles(rolResponse.data));

        window.history.back();
      } catch (error) {
        if (error.response?.status === 409) {
          alert('Ya existe un personaje con ese nombre y apellido. Por favor elige otro.');
        } else {
          alert('Error inesperado: ' + error.message);
        }
      }
    }*/
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
    <BackgroundImage src='images/narratives-background.jpg' alt='rakonti-background-2'/>
    
    <Opacity>
      <TopMenu feature={feature} popUp={popUp}/>

      <StepsWrapper>
        <LeftColumn>
          <RotatedTitle>CREADOR DE PERSONAJES</RotatedTitle>
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
        {step >= 1 && step <= 5 && <Button onClick={handleCancel}>Cancelar</Button>}
        {step > 1 && step < 6 && <Button onClick={() => setStep(step - 1)}>Anterior</Button>}
        {step < 5 && <Button onClick={handleNextStep}>Siguiente</Button>}
        {step === 5 && <Button onClick={handleSubmit} type="submit">Enviar</Button>} 
        {step === 6 && <Button onClick={() => navigate(`/characters/${feature.id_historia}`)}>Mis personajes</Button>}
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
  width: 100%;
  height: 100%;
  background-repeat: repeat-y;
  background-size: cover;
  z-index: -1;
`;

const Container = styled.div`
  margin-top:10px;
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
  margin:15px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
  }
`;

const Column = styled.div`
  flex: 1;
  max-width: 45%;
  box-sizing: border-box;

  @media (max-width: 768px) {
    max-width: 95%;
    margin: 0 auto;
  }
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
  display: flex;
  justify-content: center;
  align-items: center;
  transform: rotate(-90deg);
  transform-origin: center center;
  text-align: center;
  color: white;
  font-size: 20px;
  word-break: break-word;
  white-space: normal;
  max-width: 50%;
`;

const Subtitle = styled.div`
  font-size: 16px;
  font-weight: 800;
  color: #43474f;
  align-self: flex-start;
  margin-bottom: 10px;
`;

const Paragraph = styled.div`
  font-size: 16px;
  font-weight: 800;
  color: #43474f;
  align-self: center;
  margin: 20px;
  padding: 20px;
  background-image: url('images/top-bar.png');
  background-color: transparent;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center;
  box-sizing: border-box;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
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
  padding: 10px;
  background-color: transparent;
  font-size: 14px;
  color: black;
  box-sizing: border-box;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 80px;
  padding: 10px;
  background-color: transparent;
  font-size: 14px;
  color: black;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 5px;
  resize: vertical; /* Permite que el usuario lo redimensione */
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
  padding: 10px;
  font-size: 14px;
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
  width: 100%;
  align-items: stretch;
`;

const LeftColumn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  height: 170px;
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

  @media (max-width: 1024px) {
    padding: 20px 60px 20px 60px;
    width: 100%;
  }
`;

const FormContainer = styled.form`
  padding: 20px 40px 30px 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: url('images/section.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  width: 60%;
  box-sizing: border-box;
  border-radius: 45px;

  @media (max-width: 768px) {
    width: 90%;
    padding: 35px;
    border-radius: 60px;
  }
`;

const Image = styled.img`
  max-width: 90%;
  max-height: 90%;
  object-fit: contain;
`;

const ButtonsContainer = styled.div`
  padding: 20px 0px 20px 0px;
  display: flex;
  justify-content: space-between;
  gap: 20px;
`;

const Button = styled.button`
  padding: 10px 30px;
  font-size: 15px;
  border: none;
  border-radius: 6px;
  background-color: #43474f;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #5c5f66;
  }
`;

const CardRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  width: 70%;
  margin: 0 auto;
  grid-auto-rows: 1fr; /*Esto fuerza igual altura en TODAS las filas */

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
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
  padding: 20px 40px 30px 0px;
  background-image: ${({ image }) => `url(${image})`};
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  text-align: right;
  box-shadow: ${({ selected }) =>
    selected
      ? '0 0 10px 4px rgba(255, 255, 255, 0.6)'  // efecto de "resplandor"
      : '0 4px 12px rgba(0, 0, 0, 0.1)'};
  border: ${({ selected }) =>
    selected ? '2px solid rgba(255, 255, 255, 0.6)' : 'none'};
  transition: box-shadow 0.2s ease, border 0.2s ease;
`;

const CardHorizontalDescription = styled.div`
  color: white;
  font-size: 12px;
  text-align: justify;
  width: 60%;
  height: 150px;
  overflow-y: auto;
  padding-right: 5px;

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

const LabelCheckbox = styled.label`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  font-size: 16px;
  color: #43474f;
`;

const InputCheckbox = styled.input`
  margin-right: 10px;
`;

export default RCharacterView;