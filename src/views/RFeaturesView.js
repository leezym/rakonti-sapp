import api from "../api/axiosConfig";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  setCharacters,
  setPersonalities,
  setRoles,
  setCurrentStage
} from '../redux-store/reducers/storySlice';

function StepOne({ data, setData, formData, setFormData }) {
  const [generos, setGeneros] = useState([]);

  useEffect(() => {
    api.get('/generos')
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
    <FormContainer>
      <p>El <b>Género</b> es la categoría narrativa que define el estilo, tono y tipo de conflicto en la historia. A continuación, encontrarás las opciones de género para tu elección:</p>

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
        <DetailImage>
          <Image src={data.genero_imagen} loading='lazy'/>
        </DetailImage>
        <DetailDescription>
          <Subtitle>{data.genero}</Subtitle>
          <p style={{fontSize:'12px'}} dangerouslySetInnerHTML={{ __html: data.genero_descripcion }} />
        </DetailDescription>
        </Row>
      </DetailContainer>
    </FormContainer>
  );
}

function StepTwo({ data, setData, formData, setFormData }) {
  const [tramas, setTramas] = useState([]);

  useEffect(() => {
    api.get('/tramas')
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
    <FormContainer>
      <p>La <b>Trama</b> es la categoría narrativa que organiza los eventos principales de la historia en torno a un conflicto central. A continuación, encontrarás las opciones de trama para tu elección:</p>

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
        <DetailImage>
          <Image src={data.trama_imagen} loading='lazy'/>
        </DetailImage>
        <DetailDescription>
          <Subtitle>{data.trama}</Subtitle>
          <p style={{fontSize:'12px'}} dangerouslySetInnerHTML={{ __html: data.trama_descripcion }} />
        </DetailDescription>
        </Row>
      </DetailContainer>
    </FormContainer>
  );
}

function StepThree({ data, setData, formData, setFormData }) {
  const [objetos, setObjetos] = useState([]);

  useEffect(() => {
    api.get('/objetos-deseo')
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
    <FormContainer>
      <p>El <b>Objeto del deseo</b> es la categoría narrativa que identifica aquello que motiva al protagonista y moviliza la acción. A continuación, encontrarás las opciones de objeto de deseo para tu elección:</p>

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
        <DetailImage>
          <Image src={data.objeto_deseo_imagen} loading='lazy'/>
        </DetailImage>
        <DetailDescription>
          <Subtitle>{data.objeto_deseo}</Subtitle>
          <p style={{fontSize:'12px'}} dangerouslySetInnerHTML={{ __html: data.objeto_deseo_descripcion }} />
        </DetailDescription>
        </Row>
      </DetailContainer>
    </FormContainer>
  );
}

function StepFour({ data, setData, formData, setFormData }) {
  const [tiemposEspacios, setTiemposEspacios] = useState([]);

  useEffect(() => {
    api.get('/tiempo-espacio')
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
    <FormContainer>
      <p>El <b>Tiempo y Espacio</b> es la categoría narrativa que sitúa la historia en un contexto temporal y geográfico específico, dándole atmósfera y verosimilitud. A continuación, encontrarás las opciones de tiempo y espacio para tu elección:</p>

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
        <DetailImage>
          <Image src={data.tiempo_espacio_imagen} loading='lazy'/>
        </DetailImage>
        <DetailDescription>
          <Subtitle>{data.tiempo_espacio}</Subtitle>
          <p style={{fontSize:'12px'}} dangerouslySetInnerHTML={{ __html: data.tiempo_espacio_descripcion }} />
        </DetailDescription>
        </Row>
      </DetailContainer>
    </FormContainer>
  );
}

function StepFive({ data }) {
  return (
    <>
      <Paragraph>¡Buen trabajo! Ya tienes los cuatro pilares de tu historia. A continuación, te mostraremos un resumen de lo que has seleccionado. </Paragraph>
      <CardRow>
        <CardColumn>
          <Card>
            <Title style={{fontSize:'12px'}}>Género:<br/>{data.genero}</Title>
            <CardImage  src={data.genero_imagen} loading='lazy'/>
            <CardDescription dangerouslySetInnerHTML={{ __html: data.genero_descripcion }}/>
          </Card>
        </CardColumn>

        <CardColumn>
          <Card>
            <Title style={{fontSize:'12px'}}>Trama:<br/>{data.trama}</Title>
            <CardImage  src={data.trama_imagen} loading='lazy'/>
            <CardDescription dangerouslySetInnerHTML={{ __html: data.trama_descripcion }}/>
          </Card>
        </CardColumn>

        <CardColumn>
          <Card>
            <Title style={{fontSize:'12px'}}>Objeto del deseo:<br/>{data.objeto_deseo}</Title>
            <CardImage  src={data.objeto_deseo_imagen} loading='lazy'/>
            <CardDescription dangerouslySetInnerHTML={{ __html: data.objeto_deseo_descripcion }}/>
          </Card>
        </CardColumn>

        <CardColumn>
          <Card>
            <Title style={{fontSize:'12px'}}>Tiempo y Espacio:<br/>{data.tiempo_espacio}</Title>
            <CardImage  src={data.tiempo_espacio_imagen} loading='lazy'/>
            <CardDescription dangerouslySetInnerHTML={{ __html: data.tiempo_espacio_descripcion }}/>
          </Card>
        </CardColumn>
      </CardRow>
    </>
  );
}

function StepSix() {
  return (
    <>
      <FormContainer image={'images/congrats-narrative.png'} width="50%">
        <Title color='#43474f'><h1>¡Felicitaciones!</h1></Title>
        <p>Has desbloqueado el generador de personajes</p>
      </FormContainer>
      <Image style={{height:'300px', margin:'0 auto', paddingBottom:'30px'}} src={'images/character-statue.png'} loading='lazy'/>
    </>
  );
}

function RFeaturesView() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { narrative, feature} = useSelector(state => state.story);

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
    // Se crea por primera vez
    dispatch(setFeature(formData));
  }, []);

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
    
    // Crear historia temporalmente
    dispatch(setFeature({
      ...formData,
      titulo: feature.titulo
    }));
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
  };

  const handleCancel = () => {
    const confirmar = window.confirm("¿Estás seguro de que quieres salir? Los cambios se perderán.");
    if (!confirmar) return;

    navigate('/home');
  };

  const popUp = () => {
    setShowPopup(true);
  };

  return <>
    <BackgroundImage src='images/narratives-background.jpg' loading='lazy'/>
    <Container>    
      <Opacity>
        <TopMenu 
          feature={feature} 
          popUp={popUp}        
        />

        <StepsWrapper>
          <LeftColumn>
            <RotatedTitle>LOS 4<br/>PILARES</RotatedTitle>
          </LeftColumn>
          
          <RightColumn>
            <StepsContainer>
              <Step active={step === 1} step={1} padding="20px 10px 20px 10px">
                <b>Género</b>
                {data.genero === '' ? "Ninguno" : data.genero}
              </Step>
              <Step active={step === 2} step={2} padding="20px 40px 20px 40px">
                <b>Trama</b>
                {data.trama === '' ? "Ninguna" : data.trama}
              </Step>
              <Step active={step === 3} step={3} padding="20px 40px 20px 50px">
                <b>Objeto del deseo</b>
                {data.objeto_deseo === '' ? "Ninguno" : data.objeto_deseo}
              </Step>
              <Step active={step === 4} step={4} padding="20px 40px 20px 75px">
                <b>Tiempo y espacio</b>
                {data.tiempo_espacio ? data.tiempo_espacio.split(':')[1]?.trim() : "Ninguno"}          
              </Step>
              <Step active={step === 5} step={5} padding="20px 10px 20px 10px">
                <b>Resumen</b>
              </Step>
            </StepsContainer>
          </RightColumn>
        </StepsWrapper>
      </Opacity>

      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, width: '100%' }}>
        {step === 1 && <StepOne data={data} setData={setData} formData={formData} setFormData={setFormData} />}
        {step === 2 && <StepTwo data={data} setData={setData} formData={formData} setFormData={setFormData} />}
        {step === 3 && <StepThree data={data} setData={setData} formData={formData} setFormData={setFormData}/>}
        {step === 4 && <StepFour data={data} setData={setData} formData={formData} setFormData={setFormData} />}
        {step === 5 && <StepFive data={data} />}
        {step === 6 && <StepSix/>}
      </div>

      <ButtonsContainer>
        {step >= 1 && step <= 5 && <ButtonSecondary onClick={handleCancel}>Cancelar</ButtonSecondary>}
        {step > 1 && step < 6 && <ButtonSecondary onClick={() => setStep(step - 1)}>Anterior</ButtonSecondary>}
        {step < 5 && <ButtonPrimary onClick={handleNextStep}>Siguiente</ButtonPrimary>}
        {step === 5 && <ButtonPrimary onClick={handleSubmit} type="submit">Enviar</ButtonPrimary>}
        {step === 6 && <ButtonPrimary onClick={() => navigate('/character')}>Crear nuevo personaje</ButtonPrimary>}
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
  align-items: center;
  gap: 40px;
  width: 100%;
  margin: 15px;
`;

const Title = styled.h1`
  font-size:15px;
  font-weight: 600;
  color:  ${props => (props.color == null ? 'white' : props.color)};
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
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
  margin-top: 20px;
  font-size: 14px;
  font-weight: 600;
  color: #43474f;
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
  min-height: 90px;  
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
`;

const FormContainer = styled.form` 
  padding: 25px 40px;
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

const DetailContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: url('images/rectangle-of-lines.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center;
  width: 100%;
  flex: 1;
`;

const Image = styled.img`
  display: block;       /* hace que margin auto funcione */
  margin: 0 auto;       /* centra horizontalmente */
  max-width: 90%;
  max-height: 90%;
  object-fit: contain;
`;

const DetailImage = styled.div`
  height: 150px;
  width: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0px 20px 50px;
`;
    
const DetailDescription = styled.div`
  flex: 1;
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 40px 100px 20px 0px;
`;

const Select = styled.select`
  padding: 10px;
  font-size: 14px;
  border-radius: 8px;
  border: 1px solid #ccc;
  background-color: #f9f9f9;
  color: #333;
  width: 250px;
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

const CardImage = styled.img`
  height: 60px;
  width: auto;
  object-fit: contain;
  margin: 10px 0;
`;

export default RFeaturesView;