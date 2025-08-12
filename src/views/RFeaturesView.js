import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
  setCharacters,
  setPersonalities,
  setRoles,
  setCurrentStage
} from '../redux-store/reducers/storySlice';

function StepOne({ data, setData, formData, setFormData }) {
  const [generos, setGeneros] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5001/rakonti/generos')
      .then(res => setGeneros(res.data))
      .catch(err => console.error('Error al cargar los géneros:', err));
  }, []);

  useEffect(() => {
    if (formData.id_genero && generos.length > 0) {
      const generoSeleccionado = generos.find(g => g.id_genero === formData.id_genero);
      if (generoSeleccionado) {
        setData({
          ...data,
          genero: generoSeleccionado.nombre,
          genero_descripcion: generoSeleccionado.descripcion,
          genero_imagen: generoSeleccionado.imagen
        });
      }
    }
  }, [formData.id_genero, generos]);

  return (
    <>
      <FormContainer>
        <p style={{ color: '#43474f' }}>El <b>Género</b> es la categoría narrativa que define el estilo, tono y tipo de conflicto en la historia. A continuación, encontrarás las opciones de género para tu elección:
        </p>
        <p style={{ color: '#43474f' }}><b>Elige el género que deseas usar para tu historia</b></p>

        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Select
            id="generos"
            value={data.genero}
            onChange={(e) => {
              const selectedGenero = generos.find(g => g.nombre === e.target.value);

              setData({
                ...data,
                genero: selectedGenero ? selectedGenero.nombre : '',
                genero_descripcion: selectedGenero ? selectedGenero.descripcion : '',
                genero_imagen: selectedGenero ? selectedGenero.imagen : ''
              });

              setFormData({
                ...formData,
                id_genero: selectedGenero ? selectedGenero.id_genero : ''
              });
            }}
          >
            <Option value="">Selecciona un género</Option>
            {generos.map(genero => (
              <Option key={genero.id_genero} value={genero.nombre}>
                {genero.nombre}
              </Option>
            ))}
          </Select>

          <RandomButton
            type="button"
            onClick={() => {
              if (generos.length === 0) return;
              const randomGenero = generos[Math.floor(Math.random() * generos.length)];
              setData({
                ...data,
                genero: randomGenero.nombre,
                genero_descripcion: randomGenero.descripcion,
                genero_imagen: randomGenero.imagen
              });

              setFormData({
                ...formData,
                id_genero: randomGenero.id_genero
              });
            }}
          />
        </div>

        <Label>Tu selección</Label>

        <DetailContainer>
          <Row>
          <DetailImage small_width="40%">
            <Image src={data.genero_imagen}></Image>
          </DetailImage>
          <DetailDescription>
            <Subtitle>{data.genero}</Subtitle>
            <div dangerouslySetInnerHTML={{ __html: data.genero_descripcion }} />
          </DetailDescription>
          </Row>
        </DetailContainer>
      </FormContainer>
    </>
  );
}

function StepTwo({ data, setData, formData, setFormData }) {
  const [tramas, setTramas] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5001/rakonti/tramas')
      .then(res => setTramas(res.data))
      .catch(err => console.error('Error al cargar las tramas:', err));
  }, []);

  useEffect(() => {
    if (formData.id_trama && tramas.length > 0) {
      const tramaSeleccionada = tramas.find(t => t.id_trama === formData.id_trama);
      if (tramaSeleccionada) {
        setData({
          ...data,
          trama: tramaSeleccionada.nombre,
          trama_descripcion: tramaSeleccionada.descripcion,
          trama_imagen: tramaSeleccionada.imagen
        });
      }
    }
  }, [formData.id_trama, tramas]);

  return (
    <>
      <FormContainer>
        <p style={{ color: '#43474f' }}>La <b>Trama</b> es la categoría narrativa que organiza los eventos principales de la historia en torno a un conflicto central. A continuación, encontrarás las opciones de trama para tu elección:</p>

        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Select
            id="tramas"
            value={data.trama}
            onChange={(e) => {
              const selectedTrama = tramas.find(g => g.nombre === e.target.value);

              setData({
                ...data,
                trama: selectedTrama ? selectedTrama.nombre : '',
                trama_descripcion: selectedTrama ? selectedTrama.descripcion : '',
                trama_imagen: selectedTrama ? selectedTrama.imagen : ''
              });

              setFormData({
                ...formData,
                id_trama: selectedTrama ? selectedTrama.id_trama : ''
              });
            }}
          >
            <Option value="">Selecciona una trama</Option>
            {tramas.map(trama => (
              <Option key={trama.id_trama} value={trama.nombre}>
                {trama.nombre}
              </Option>
            ))}
          </Select>

          <RandomButton
            type="button"
            onClick={() => {
              if (tramas.length === 0) return;
              const randomTrama = tramas[Math.floor(Math.random() * tramas.length)];
              setData({
                ...data,
                trama: randomTrama.nombre,
                trama_descripcion: randomTrama.descripcion,
                trama_imagen: randomTrama.imagen
              });

              setFormData({
                ...formData,
                id_trama: randomTrama.id_trama
              });
            }}
          />
        </div>

        <Label>Tu selección</Label>

        <DetailContainer>
          <Row>
          <DetailImage small_width="40%">
            <Image src={data.trama_imagen}></Image>
          </DetailImage>
          <DetailDescription>
            <Subtitle>{data.trama}</Subtitle>
            <div dangerouslySetInnerHTML={{ __html: data.trama_descripcion }} />
          </DetailDescription>
          </Row>
        </DetailContainer>
      </FormContainer>
    </>
  );
}

function StepThree({ data, setData, formData, setFormData }) {
  const [objetos, setObjetos] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5001/rakonti/objetos-deseo')
      .then(res => setObjetos(res.data))
      .catch(err => console.error('Error al cargar los objetos del deseo:', err));
  }, []);

  useEffect(() => {
    if (formData.id_objeto && objetos.length > 0) {
      const objetoSeleccionado = objetos.find(o => o.id_objeto === formData.id_objeto);
      if (objetoSeleccionado) {
        setData({
          ...data,
          objeto_deseo: objetoSeleccionado.nombre,
          objeto_deseo_descripcion: objetoSeleccionado.descripcion,
          objeto_deseo_imagen: objetoSeleccionado.imagen
        });
      }
    }
  }, [formData.id_objeto, objetos]);

  return (
    <>
      <FormContainer>
        <p style={{ color: '#43474f' }}>El <b>Objeto del deseo</b> es la categoría narrativa que identifica aquello que motiva al protagonista y moviliza la acción. A continuación, encontrarás las opciones de objeto de deseo para tu elección:</p>

        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Select
            id="objetos"
            value={data.objeto_deseo}
            onChange={(e) => {
              const selectedObjeto = objetos.find(g => g.nombre === e.target.value);

              setData({
                ...data,
                objeto_deseo: selectedObjeto ? selectedObjeto.nombre : '',
                objeto_deseo_imagen: selectedObjeto ? selectedObjeto.imagen : ''
              });

              setFormData({
                ...formData,
                id_objeto: selectedObjeto ? selectedObjeto.id_objeto : ''
              });
            }}
          >
            <Option value="">Selecciona un objeto del deseo</Option>
            {objetos.map(objeto => (
              <Option key={objeto.id_objeto} value={objeto.nombre}>
                {objeto.nombre}
              </Option>
            ))}
          </Select>

          <RandomButton
            type="button"
            onClick={() => {
              if (objetos.length === 0) return;
              const randomObjeto = objetos[Math.floor(Math.random() * objetos.length)];
              setData({
                ...data,
                objeto_deseo: randomObjeto.nombre,
                objeto_deseo_descripcion: randomObjeto.descripcion,
                objeto_deseo_imagen: randomObjeto.imagen
              });

              setFormData({
                ...formData,
                id_objeto: randomObjeto.id_objeto
              });
            }}
          />
        </div>

        <Label>Tu selección</Label>

        <DetailContainer>
          <Row>
          <DetailImage small_width="15%">
            <Image src={data.objeto_deseo_imagen}></Image>
          </DetailImage>
          <DetailDescription>
            <Subtitle>{data.objeto_deseo}</Subtitle>
            <div dangerouslySetInnerHTML={{ __html: data.objeto_deseo_descripcion }} />
          </DetailDescription>
          </Row>
        </DetailContainer>
      </FormContainer>
    </>
  );
}

function StepFour({ data, setData, formData, setFormData }) {
  const [tiemposEspacios, setTiemposEspacios] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5001/rakonti/tiempo-espacio')
      .then(res => setTiemposEspacios(res.data))
      .catch(err => console.error('Error al cargar los tiempos-espacios:', err));
  }, []);

  useEffect(() => {
    if (formData.id_tiempo_espacio && tiemposEspacios.length > 0) {
      const tiempoEspacioSeleccionado = tiemposEspacios.find(t => t.id_tiempo_espacio === formData.id_tiempo_espacio);
      if (tiempoEspacioSeleccionado) {
        setData({
          ...data,
          tiempo_espacio: tiempoEspacioSeleccionado.nombre,
          tiempo_espacio_descripcion: tiempoEspacioSeleccionado.descripcion,
          tiempo_espacio_imagen: tiempoEspacioSeleccionado.imagen
        });
      }
    }
  }, [formData.id_tiempo_espacio, tiemposEspacios]);

  return (
    <>
      <FormContainer>
        <p style={{ color: '#43474f' }}>El <b>Tiempo y Espacio</b> es la categoría narrativa que sitúa la historia en un contexto temporal y geográfico específico, dándole atmósfera y verosimilitud. A continuación, encontrarás las opciones de tiempo y espacio para tu elección:</p>

        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Select
            id="tiemposEspacios"
            value={data.tiempo_espacio}
            onChange={(e) => {
              const selectedTiempoEspacio = tiemposEspacios.find(g => g.nombre === e.target.value);

              setData({
                ...data,
                tiempo_espacio: selectedTiempoEspacio ? selectedTiempoEspacio.nombre : '',
                tiempo_espacio_descripcion: selectedTiempoEspacio ? selectedTiempoEspacio.descripcion : '',
                tiempo_espacio_imagen: selectedTiempoEspacio ? selectedTiempoEspacio.imagen : ''
              });

              setFormData({
                ...formData,
                id_tiempo_espacio: selectedTiempoEspacio ? selectedTiempoEspacio.id_tiempo_espacio : ''
              });
            }}
          >
            <Option value="">Selecciona un tiempo y espacio</Option>
            {tiemposEspacios.map(tiempoEspacio => (
              <Option key={tiempoEspacio.id_tiempo_espacio} value={tiempoEspacio.nombre}>
                {tiempoEspacio.nombre}
              </Option>
            ))}
          </Select>

          <RandomButton
            type="button"
            onClick={() => {
              if (tiemposEspacios.length === 0) return;
              const randomTiempoEspacio = tiemposEspacios[Math.floor(Math.random() * tiemposEspacios.length)];
              setData({
                ...data,
                tiempo_espacio: randomTiempoEspacio.nombre,
                tiempo_espacio_descripcion: randomTiempoEspacio.descripcion,
                tiempo_espacio_imagen: randomTiempoEspacio.imagen
              });

              setFormData({
                ...formData,
                id_tiempo_espacio: randomTiempoEspacio.id_tiempo_espacio
              });
            }}
          />
        </div>

        <Label>Tu selección</Label>

        <DetailContainer>
          <Row>
          <DetailImage small_width="40%">
            <Image src={data.tiempo_espacio_imagen}/>
          </DetailImage>
          <DetailDescription>
            <Subtitle>{data.tiempo_espacio}</Subtitle>
            <div dangerouslySetInnerHTML={{ __html: data.tiempo_espacio_descripcion }} />
          </DetailDescription>
          </Row>
        </DetailContainer>
      </FormContainer>
    </>
  );
}

function StepFive({ data }) {
  return (
    <>
      <Paragraph>¡Buen trabajo! Ya tienes los cuatro pilares de tu historia. A continuación, te mostraremos un resumen de lo que has seleccionado. </Paragraph>
      <CardRow>
        <CardColumn>
          <Card>
            <Title>Género:<br/>{data.genero}</Title>
            <CardImage  src={data.genero_imagen}/>
            <CardDescription>
              <div dangerouslySetInnerHTML={{ __html: data.genero_descripcion }} />
            </CardDescription>
          </Card>
        </CardColumn>

        <CardColumn>
          <Card>
            <Title>Trama:<br/>{data.trama}</Title>
            <CardImage  src={data.trama_imagen}/>
            <CardDescription>
              <div dangerouslySetInnerHTML={{ __html: data.trama_descripcion }} />
            </CardDescription>
          </Card>
        </CardColumn>

        <CardColumn>
          <Card>
            <Title>Objeto del deseo:<br/>{data.objeto_deseo}</Title>
            <CardImage  src={data.objeto_deseo_imagen}/>
            <CardDescription>
              <div dangerouslySetInnerHTML={{ __html: data.objeto_deseo_descripcion }} />
            </CardDescription>
          </Card>
        </CardColumn>

        <CardColumn>
          <Card>
            <Title>Tiempo y Espacio:<br/>{data.tiempo_espacio}</Title>
            <CardImage  src={data.tiempo_espacio_imagen}/>
            <CardDescription>
              <div dangerouslySetInnerHTML={{ __html: data.tiempo_espacio_descripcion }} />
            </CardDescription>
          </Card>
        </CardColumn>
      </CardRow>
    </>
  );
}

function StepSix() {
  return (
    <>
      <FormContainer width="50%" style={{padding: '0px 0px 0px 0px'}}>
        <Title color='#43474f'><h1>¡Felicitaciones!</h1></Title>
        <p style={{color:'#43474f'}}>Has desbloqueado el generador de personajes</p>
      </FormContainer>
      <Image style={{width:'20%', marginTop:'15px'}} src={'images/character-statue.png'}/>
    </>
  );
}

function RFeaturesView() {
  const { id_historia } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { narrative, 
    feature } = useSelector(state => state.story);

  const id_usuario = localStorage.getItem('id_usuario');
  
  const [step, setStep] = useState(1);
  const [showPopup, setShowPopup] = useState(false);
  const [data, setData] = useState({
    genero: '',
    genero_descripcion: '',
    genero_imagen: '',
    trama: '',
    trama_descripcion: '',
    trama_imagen: '',
    objeto_deseo: '',
    objeto_deseo_descripcion: '',
    objeto_deseo_imagen: '',
    tiempo_espacio: '',
    tiempo_espacio_descripcion: '',
    tiempo_espacio_imagen: ''
  });
  const [formData, setFormData] = useState({
    id_usuario: id_usuario,
    titulo: 'Mi primera historia',
    id_genero: '',
    id_trama: '',
    id_objeto: '',
    id_tiempo_espacio: '',
    id_estructura: '',
    fecha_creacion: '',
    fecha_edicion: '',
    paso_actual: 1
  });

  useEffect(() => {
    if (id_historia) {
      // Estamos editando: obtener los datos de la historia
      setFormData(feature);
    }
  }, [id_historia, feature]);

  const handleNextStep = async (e) => {

    e.preventDefault();

    if (step === 1) {
      if (!data.genero) {
        alert('Por favor selecciona un género o de manera aleatoria.');
        return;
      }
    }

    if (step === 2) {
      if (!data.trama) {
        alert('Por favor selecciona una trama o de manera aleatoria.');
        return;
      }
    }

    if (step === 3) {
      if (!data.objeto_deseo) {
        alert('Por favor selecciona un objeto del deseo o de manera aleatoria.');
        return;
      }
    }

    if (step === 4) {
      if (!data.tiempo_espacio) {
        alert('Por favor selecciona un tiempo y espacio o de manera aleatoria.');
        return;
      }

      setFormData({
        ...formData,
        id_estructura: narrative.id_estructura,
        fecha_creacion: new Date(),
        fecha_edicion: new Date()
      });      
    } 

    setStep(step + 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Editar historia
    if(id_historia)
    {
      try {
        const response = await axios.put(`http://localhost:5001/rakonti/historias/${id_historia}`, formData);
        alert('Historia actualizada con éxito');

        dispatch(setFeature(formData))
        dispatch(setGenre({
          nombre: data.genero,
          descripcion: data.genero_descripcion,
          imagen: data.genero_imagen
        }));
        dispatch(setPlot({
          nombre: data.trama,
          descripcion: data.trama_descripcion,
          imagen: data.trama_imagen
        }));
        dispatch(setDesire({
          nombre: data.objeto_deseo,
          descripcion: data.objeto_deseo_descripcion,
          imagen: data.objeto_deseo_imagen
        }));
        dispatch(setTime({
          nombre: data.tiempo_espacio,
          descripcion: data.tiempo_espacio_descripcion,
          imagen: data.tiempo_espacio_imagen
        }));

        window.history.back();
      } catch (error) {
        alert('Ocurrió un error al guardar la historia. '+ error);
      }
    }
    // Crear historia temporalmente
    else{
      dispatch(setFeature(formData));
      dispatch(setGenre({
        nombre: data.genero,
        descripcion: data.genero_descripcion,
        imagen: data.genero_imagen
      }));
      dispatch(setPlot({
        nombre: data.trama,
        descripcion: data.trama_descripcion,
        imagen: data.trama_imagen
      }));
      dispatch(setDesire({
        nombre: data.objeto_deseo,
        descripcion: data.objeto_deseo_descripcion,
        imagen: data.objeto_deseo_imagen
      }));
      dispatch(setTime({
        nombre: data.tiempo_espacio,
        descripcion: data.tiempo_espacio_descripcion,
        imagen: data.tiempo_espacio_imagen
      }));

      setStep(step + 1);
    }
  };

  const handleCancel = () => {
    const confirmar = window.confirm("¿Estás seguro de que quieres salir? Los cambios se perderán.");
    if (!confirmar) return;

    if (id_historia)
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
          <RotatedTitle>LOS 4 PILARES</RotatedTitle>
        </LeftColumn>
        <RightColumn>

          <StepsContainer>
            <Step active={step === 1} step={1} padding="20px 10px 20px 10px">
              <b>Género</b>
              <br />{data.genero === '' ? "Ninguno" : data.genero}
            </Step>
            <Step active={step === 2} step={2} padding="20px 40px 20px 40px">
              <b>Trama</b>
              <br />{data.trama === '' ? "Ninguna" : data.trama}
            </Step>
            <Step active={step === 3} step={3} padding="20px 40px 20px 40px">
              <b>Objeto del deseo</b>
              <br />{data.objeto_deseo === '' ? "Ninguno" : data.objeto_deseo}
            </Step>
            <Step active={step === 4} step={4} padding="20px 40px 20px 40px">
              <b>Tiempo y espacio</b>
              <br />{data.tiempo_espacio ? data.tiempo_espacio.split(':')[1]?.trim() : "Ninguno"}          
            </Step>
            <Step active={step === 5} step={5} padding="20px 10px 20px 10px">
              <br/>
              <b>Resumen</b>
              <br/>
            </Step>
          </StepsContainer>
        </RightColumn>
      </StepsWrapper>
    </Opacity>

    <Container>
      {step === 1 && <StepOne data={data} setData={setData} formData={formData} setFormData={setFormData} />}
      {step === 2 && <StepTwo data={data} setData={setData} formData={formData} setFormData={setFormData} />}
      {step === 3 && <StepThree data={data} setData={setData} formData={formData} setFormData={setFormData}/>}
      {step === 4 && <StepFour data={data} setData={setData} formData={formData} setFormData={setFormData} />}
      {step === 5 && <StepFive data={data} />}
      {step === 6 && <StepSix/>}

      <ButtonsContainer>
        {step >= 1 && step <= 5 && <Button onClick={handleCancel}>Cancelar</Button>}
        {step > 1 && step < 6 && <Button onClick={() => setStep(step - 1)}>Anterior</Button>}
        {step < 5 && <Button onClick={handleNextStep}>Siguiente</Button>}
        {step === 5 && <Button onClick={handleSubmit} type="submit">Enviar</Button>}
        {step === 6 && !id_historia && <Button onClick={() => navigate('/character')}>Crear nuevo personaje</Button>}
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
      setRoles={setRoles}
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
    gap: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Title = styled.h1`
  font-size:15px;
  font-weight: 800;
  color:  ${props => (props.color == null ? 'white' : props.color)};
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
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
  max-width: 100%;
`;

const Subtitle = styled.div`
  font-size: 16px;
  font-weight: 800;
  color: #43474f;
  align-self: flex-start;
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
  margin-top: 20px;
  font-size: 14px;
  font-weight: 600;
  color: #43474f;
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
  min-width: 10%;
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
  height: 100%;
  box-sizing: border-box;
  word-wrap: break-word;
  word-break: break-word;
  white-space: normal;

  @media (max-width: 1024px) {
    padding: 20px 60px 20px 60px;
    width: 50%;
    text-align: center;
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
  width: ${({ width }) => width || '80%'};
  box-sizing: border-box;
  border-radius: 45px;  

  @media (max-width: 768px) {
    width: 90%;
    padding: 35px;
    border-radius: 60px;
  }
`;

const DetailContainer = styled.form`
  flex-direction: column;
  align-items: center;
  background-image: url('images/square-of-lines.png');
  background-color: transparent;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center;
  width: 100%;
`;

const Image = styled.img`
  max-width: 90%;
  max-height: 90%;
  object-fit: contain;
`;

const DetailImage = styled.div`
  flex: 1;
  max-width: 20%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 50px 0px 35px 0px;
  
  @media (max-width: 768px) {
  margin: 50px 0px 10px 0px;
  max-width: ${({ small_width }) => small_width};    
  }
`;
    
const DetailDescription = styled.div`
  flex: 1;
  max-width: 60%;
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 50px 0px 35px 0px;

  @media (max-width: 768px) {
    margin: 10px 30px 40px 0px;
    max-width: 80%;
  }
`;

const Select = styled.select`
  padding: 10px;
  font-size: 16px;
  border-radius: 8px;
  border: 1px solid #ccc;
  background-color: #f9f9f9;
  color: #333;
  width: 250px;
  margin-top: 10px;
  cursor: pointer;
`;

const Option = styled.option`
  color: #333;
  font-size: 15px;
  background-color: #fff;
  padding: 8px;
`;

const RandomButton = styled.button`
  width: 45px;
  height: 45px;
  background-image: url('images/random-button.png');
  background-color: transparent;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border: none;
  cursor: pointer;
  margin-left: 10px;
  margin-top: 10px;
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
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  width: 90%;
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
  text-align: justify;
  width: 100%;
  flex: 1;
`;

const CardImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: contain;
  margin: 10px 0;
`;

export default RFeaturesView;