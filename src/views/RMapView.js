import { useEffect, useState, useMemo, useRef  } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import TopMenu from './TopMenu';
import { setCurrentStage } from '../redux-store/reducers/storySlice';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function Edit({ stages, currentStage, quillRef, value, handleChange, modules }) {
  console.log(currentStage)
  return (
    <>
      <Paragraph>
        <Title>{stages[currentStage - 1]?.nombre_paso}</Title>
        <h5 dangerouslySetInnerHTML={{ __html: stages[currentStage - 1]?.descripcion }} />
      </Paragraph>
      <FormContainer>
        <StyledEditor
          ref={quillRef}
          value={value}
          onChange={handleChange}
          modules={modules}
          placeholder={'Escribe aquí...'}
        />
      </FormContainer>
    </>
  );
}

function Finish() {
  return (
    <>
      <FormContainer width="50%" style={{padding: '0px 0px 0px 0px'}}>
        <Title color='#43474f'><h1>¡Felicitaciones!</h1></Title>
        <Subtitle style={{color:'#43474f'}}>Has completado tu historia.<br/><br/>Has recorrido un largo camino para llegar hasta acá y debes sentir orgullo por lo que has logrado. Ya tienes las bases fundamentales para comenzar a crear tus historias.</Subtitle>
      </FormContainer>
    </>
  );
}

function RMapView() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [stages, setStages] = useState([]);
  const [value, setValue] = useState('');
  const [stepContents, setStepContents] = useState({});
  
  const narrative = useSelector(state => state.story.narrative);
  const feature = useSelector(state => state.story.feature);
  const currentStage = useSelector(state => state.story.currentStage);
  
  const totalSteps = narrative.hitos_cantidad.reduce((a, b) => a + b, 0);

  const quillRef = useRef();
  
  useEffect(() => {
    axios.get(`http://localhost:5001/rakonti/pasos-estructura-narrativa/estructura/${feature.id_estructura}`)
    .then(res => {
      const pasosOrdenados = res.data.sort((a, b) => a.numero_paso - b.numero_paso);
      setStages(pasosOrdenados);
    })
    .catch(err => console.error('Error al cargar los pasos de la estructura:', err));
  }, []);
  
  useEffect(() => {
    const undoButton = document.querySelector('.ql-undo');
    const redoButton = document.querySelector('.ql-redo');
    const customButton = document.querySelector('.ql-next');
    
    if (undoButton) undoButton.innerHTML = '↩'; // o cualquier icono
    if (redoButton) redoButton.innerHTML = '↪';
    if (customButton && !customButton.innerHTML.includes('Siguiente')) {
      customButton.innerHTML = 'Siguiente paso';
    }
  }, [value]);

  useEffect(() => {
    setValue(stepContents[currentStage] || '');
  }, [currentStage]);

  useEffect(() => {
    const currentStage = localStorage.getItem("currentStage");
    if (currentStage) {
      dispatch(setCurrentStage(parseInt(currentStage)));
    }
  }, [narrative]); //pdte añadir narrative

  const handleChange = (content) => {
    setValue(content);
    setStepContents(prev => ({
      ...prev,
      [currentStage]: content
    }));
  };

  const handleSave = () => {
    axios.post('http://localhost:5001/rakonti/pasos-estructura-narrativa-historia', {
      id_historia: narrative.id,
      id_paso_estructura: stages[currentStage - 1].id_paso_estructura,
      contenido: stepContents[currentStage],
      paso_actual: currentStage
    })
    .then(res => {
      console.log('Contenido guardado correctamente:', res.data);
    })
    .catch(err => {
      console.error('Error al guardar contenido:', err);
    });
  };

  const handleNext = () => {
    if (currentStage < totalSteps) {
      dispatch(setCurrentStage(currentStage + 1));
      localStorage.setItem("currentStage", currentStage + 1);
    }
  }

  const handleStep = (stepNumber) => {
    dispatch(setCurrentStage(stepNumber));
    localStorage.setItem("currentStage", stepNumber);
  }
  
  const modules = useMemo(() => ({
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['clean']
    ],
    history: {
      delay: 500,
      maxStack: 100,
      userOnly: true
    }
  }), []);

  return (
    <>
      <BackgroundImage src='images/modes-background.jpg' alt='narratives-background' />
      <TopMenu handleSave={handleSave} />
      <StepsWrapper>
        <LeftColumn>
          <RotatedTitle>{narrative.nombre}</RotatedTitle>
        </LeftColumn>
        <RightColumn>
          <StepsContainer>
            {narrative.hitos_nombre.map((hito, index) => {
              const cantidadPasos = narrative.hitos_cantidad[index];
              const widthPercent = (cantidadPasos / totalSteps) * 100;

              return (
                <Step
                  key={index}
                  step={index + 1}
                  padding="20px 40px 20px 50px"
                  style={{ flexBasis: `${widthPercent}%` }}
                >
                  <b>Hito {index + 1}: {hito}</b>
                </Step>
              );
            })}
          </StepsContainer>

          <MapsContainer>
            {Array.from({ length: totalSteps }, (_, index) => {
              const stepNumber = index + 1;

              return (
                <MapWrapper
                  key={stepNumber}
                  style={{ flexBasis: `${100 / totalSteps}%` }}
                >
                  <Map
                    active={stepNumber <= currentStage}
                    step={stepNumber}
                    narrative={narrative}
                  >
                    <PointButton
                      onClick={()=> {handleStep(stepNumber)}}
                      active={stepNumber <= currentStage}
                    />
                  </Map>

                  <StepLabel>{stages[stepNumber - 1]?.nombre_paso}</StepLabel>
                </MapWrapper>
              );
            })}
          </MapsContainer>
        </RightColumn>
      </StepsWrapper>
      <Container>
        {
          currentStage <= totalSteps ? 
          <Edit stages={stages} currentStage={currentStage} quillRef={quillRef} value={value} handleChange={handleChange} modules={modules}/>
          :
          <Finish/>
        }
        <ButtonsWrapper>
          { <Button type="button" onClick={handleNext}>{currentStage < totalSteps ? "Siguiente paso" : "Finalizar"}</Button> }
        </ButtonsWrapper>
      </Container>
    </>
  );
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

  const Paragraph = styled.div`
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
  
  const Title = styled.h1`
  font-size: 16px;
  font-weight: 800;
  color: #43474f;
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  `;
  
  const RotatedTitle = styled.div`
  display: inline-block;
  transform: rotate(-90deg);
  transform-origin: center center;
  white-space: normal;
  text-align: center;
  color: white;
  font-size: 25px;
  word-wrap: break-word;
  word-break: break-word;
  white-space: normal;
  max-width: 100%;
  margin-left:-30px;
  `;
  
  const Subtitle = styled.div`
  font-size: 16px;
  font-weight: 800;
  color: #43474f;
  align-self: flex-start;
  margin-bottom: 10px;
  `;
  
const StepsWrapper = styled.div`
display: flex;
  width: 100%;
  `;
  
  const MapWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  `;
  
  const LeftColumn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  width: 10%;
  `;
  
  const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  `;
  
  const StepsContainer = styled.div`
  display: flex;
  width: 95%;
  `;
  
  const MapsContainer = styled.div`
  display: flex;
  width: 95%;
`;

const Step = styled.div`
  flex: 1;
  text-align: center;
  font-size: 12px;
  color: white;
  background-color: transparent;
  padding: ${({ padding }) => padding};
  transition: all 0.3s ease;
  background-image: ${({ step }) => {
    if (step === 1) 
      return "url('images/first-selected-progress-bar.png')";
    else
      return "url('images/middle-selected-progress-bar.png')";
  }};
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  word-wrap: break-word;
  word-break: break-word;
  white-space: normal;

  @media (max-width: 1024px) {
    padding: 20px 60px 20px 60px;
    width: 100%;
  }
`;

const StepLabel = styled.div`
  margin-top: 5px;
  font-size: 8px;
  color: white;
  text-align: center;
  max-width: 70px;
  word-wrap: break-word;
`;

const Map = styled.div`
  position: relative;
  width: 100%;
  height: 100px;
  background-image: ${({ narrative, active, step }) => {
    if (active) {
      return `url('${narrative.imagen.substring(0, narrative.imagen.lastIndexOf("."))}-map-step-${step}.png')`;
    } else {
      return `url('${narrative.imagen.substring(0, narrative.imagen.lastIndexOf("."))}-map-opacity-step-${step}.png')`;
    }
  }};
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center;

  display: flex;
  flex-direction: column;
  justify-content: center;
  box-sizing: border-box;
  transition: all 0.3s ease;

  transform: scaleX(1.8);
  transform-origin: center;
`;

const PointButton = styled.button`
  position: absolute;
  left: 40%;
  width: 10px;
  height: 16px;
  border: none;
  padding: 0;
  cursor: pointer;
  background: ${({ active }) =>
    active
      ? "url('images/point-white.png')"
      : "url('images/point-gray.png')"};
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center;
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
  width: 95%;
  box-sizing: border-box;
  border-radius: 45px;

  @media (max-width: 768px) {
    width: 90%;
    padding: 35px;
    border-radius: 60px;
  }
`;

const StyledEditor = styled(ReactQuill)`
  width: 100%;

  .ql-toolbar {
    border: none !important;
    display: flex;
    justify-content: center;
    border-radius: 0;
  }

  .ql-container {
    border: none !important;
    border-radius: 0;
    background-color: transparent;
    color: black;
  }

  .ql-editor {
    height: 200px;
    overflow-y: auto;
    text-align: left;
    border: none !important;
  }
`;


const ButtonsWrapper = styled.div`
    margin-top: 10px;
    display: flex;
    gap: 10px;
  
    button {
      padding: 5px 12px;
      cursor: pointer;
    }
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

export default RMapView;