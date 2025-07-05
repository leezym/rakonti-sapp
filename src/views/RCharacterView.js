import { useEffect, useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import styled from 'styled-components';
import TopMenu from './TopMenu';
import { setFeature, setCharacters, setCharacter } from '../redux-store/reducers/storySlice';

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
            <Label>Sexo</Label>
            <Select name='sexo'
                  value={formData.sexo}
                  onChange={handleChange}
            >
              <option value=''>Selecciona</option>
              <option value='Masculino'>Masculino</option>
              <option value='Femenino'>Femenino</option>
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

  const primerasDos = (personalidades || []).filter(p => [9, 10, 14, 15].includes(Number(p.id_personalidad))).slice(0, 2);
  const ultimasDos = (personalidades || []).filter(p => [9, 10, 14, 15].includes(Number(p.id_personalidad))).slice(2, 4);

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
                  personalidad_descripcion: personalidad ? personalidad.descripcion : ''
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
                  personalidad_descripcion: personalidad ? personalidad.descripcion : ''
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

function StepThree({ formData, handleChange }) {  

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

function StepFour({ formData, data }) {
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
                <b>Sexo: </b>{formData.sexo}
              </p>
            </CardDescription>
          </Card>
        </CardColumn>

        <CardColumn>
          <Card>
            <Title>Perfil psicológico<br/>{data.personalidad}</Title>
            <CardDescription dangerouslySetInnerHTML={{ __html: data.personalidad_descripcion }} />
          </Card>
        </CardColumn>

        <CardColumn>
          <Card>
            <Title>Notas adicionales</Title>
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

function StepFive({ narrative }) {
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

  const narrative = useSelector(state => state.story.narrative);
  const feature = useSelector(state => state.story.feature);
  const characters = useSelector(state => state.story.characters);
  
  const [step, setStep] = useState(1);

  const [data, setData] = useState({
    personalidad: '',
    personalidad_descripcion: ''
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

    setStep(step + 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Editar personaje existente
    if (id_personaje) {
      try {
        const response = await axios.put(`http://localhost:5001/rakonti/personajes/${id_personaje}`, formData);
        alert('Personaje actualizado con éxito');
        
        dispatch(setFeature(feature))
        dispatch(setCharacter(response.data))

        window.history.back();
      } catch (error) {
        alert('Ocurrió un error al guardar el personaje. '+ error);
      }
    }
    // Crear historia y personaje
    else if(!id_historia){
      try {
        const historiaResponse = await axios.post('http://localhost:5001/rakonti/historias', feature);
        const nuevaIdHistoria = historiaResponse.data.id_historia;
        setFormData(prev => ({ ...prev, id_historia: nuevaIdHistoria }));

        const personajeResponse = await axios.post('http://localhost:5001/rakonti/personajes', {
          ...formData,
          id_historia: nuevaIdHistoria
        });

        dispatch(setFeature(historiaResponse.data))
        dispatch(setCharacters(personajeResponse.data))

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
    }    
  };

  const handleCancel = () => {
    if(id_personaje)
      window.history.back();
    else
      navigate('/home');
  };

  return <>
    <BackgroundImage src='images/narratives-background.jpg' alt='rakonti-background-2'/>
    
    <Opacity>
      <TopMenu feature={feature} />

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
              <b>Notas adicionales</b>
            </Step>
            <Step active={step === 4} step={4} padding="20px 40px 20px 40px">
              <b>Resumen</b>
            </Step>
          </StepsContainer>
        </RightColumn>
      </StepsWrapper>
    </Opacity>

    <Container>
      {step === 1 && <StepOne formData={formData} setFormData={setFormData} handleChange={handleChange} />}
      {step === 2 && <StepTwo formData={formData} setFormData={setFormData} data={data} setData={setData} handleChange={handleChange} />}
      {step === 3 && <StepThree formData={formData} setFormData={setFormData} handleChange={handleChange }/>}
      {step === 4 && <StepFour formData={formData} data={data} />}
      {step === 5 && <StepFive narrative={narrative}/>}

      <ButtonsContainer>
        {step >= 1 && step <= 4 && <Button onClick={handleCancel}>Cancelar</Button>}
        {step > 1 && step < 5 && <Button onClick={() => setStep(step - 1)}>Anterior</Button>}
        {step < 4 && <Button onClick={handleNextStep}>Siguiente</Button>}
        {step === 4 && <Button onClick={handleSubmit} type="submit">Enviar</Button>}
        {step === 5 && <Button onClick={() => navigate(`/characters/${formData.id_historia}`)}>Mis personajes</Button>}
      </ButtonsContainer>

    </Container>
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

export default RCharacterView;