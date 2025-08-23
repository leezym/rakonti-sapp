import api from "../api/axiosConfig";
import { useEffect, useState  } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import TopMenu from './TopMenu';
import RFilesView from './RFilesView';
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';
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
import downloadWordDocument from './downloadWordDocument';

function Edit({ stages, currentStage, value, handleChange, showSteps, stepContents }) {
  const { quill, quillRef } = useQuill({
    modules: {
      toolbar: [
        ["bold", "italic", "underline", "strike"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["clean"],
      ],
      history: {
        delay: 500,
        maxStack: 100,
        userOnly: true,
      },
    },
    placeholder: "Escribe aquí...",
    theme: "snow",
  });

  const orderedStepContents = Object.entries(stepContents)
    .sort(([a], [b]) => Number(a) - Number(b))
    .map(([_, value]) => value);

  useEffect(() => {
    if (quill) {
      quill.on("text-change", () => {
        handleChange(quill.root.innerHTML);
      });
    }
  }, [quill, handleChange]);

  useEffect(() => {
    if (quill && value !== quill.root.innerHTML) {
      quill.root.innerHTML = value || "";
    }
  }, [quill, value]);

  return (
    <>
      {showSteps && (
        <Paragraph>
          <Title>{stages[currentStage - 1]?.nombre_paso.toUpperCase()}</Title>
          <div style={{fontSize:'13px'}} dangerouslySetInnerHTML={{ __html: stages[currentStage - 1]?.descripcion }} />
        </Paragraph>
      )}

      <FormContainer>
        <StepContextContainer showSteps={showSteps}>
          {orderedStepContents.slice(0, currentStage - 1).map((content, index) => (
            <>
              <Separator opacity={'0.6'} color={'#ccc'}/>
              <ReadOnlyBlock>
                <StepTitle>{stages[index]?.nombre_paso}</StepTitle>
                <StepText dangerouslySetInnerHTML={{ __html: content }} />
              </ReadOnlyBlock>
            </>
          ))}
          <Separator opacity={'1'} color={'black'}/>
          <div
            ref={quillRef}
            style={{
              width: "100%",
              height: showSteps ? "300px" : "500px",
              backgroundColor: "white",
              borderRadius: "10px",
              border: 'none',
              padding: "10px",
            }}
            
          />
          <Separator  opacity={'1'} color={'black'}/>

          {orderedStepContents.slice(currentStage).map((content, index) => (
            <>
              <ReadOnlyBlock>
                <StepTitle>{stages[index + currentStage]?.nombre_paso}</StepTitle>
                <StepText dangerouslySetInnerHTML={{ __html: content }} />
              </ReadOnlyBlock>
              <Separator opacity={'0.6'} color={'#ccc'}/>
            </>
          ))}

        </StepContextContainer>
      </FormContainer>
    </>
  );
}

function Features({ genre, plot, desire, time }){
  return (
    <StepsWrapper>
      <LeftColumn>
        <RotatedTitle>4 PILARES</RotatedTitle>
      </LeftColumn>
      <RightColumn>
        <StepsContainer>
          <Card>
            <CardTitle>GÉNERO:<br/>{genre.nombre}</CardTitle>
            <CardImage  src={genre.imagen}/>
            <CardDescription dangerouslySetInnerHTML={{ __html: genre.descripcion }} />
          </Card>

          <Card>
            <CardTitle>TRAMA:<br/>{plot.nombre}</CardTitle>
            <CardImage  src={plot.imagen}/>
            <CardDescription dangerouslySetInnerHTML={{ __html: plot.descripcion }} />
          </Card>

          <Card>
            <CardTitle>OBJETO DEL DESEO:<br/>{desire.nombre}</CardTitle>
            <CardImage  src={desire.imagen}/>
            <CardDescription dangerouslySetInnerHTML={{ __html: desire.descripcion }} />
          </Card>

          <Card>
            <CardTitle>TIEMPO Y ESPACIO:<br/>{time.nombre}</CardTitle>
            <CardImage  src={time.imagen}/>
            <CardDescription dangerouslySetInnerHTML={{ __html: time.descripcion }} />
          </Card>
        </StepsContainer>
      </RightColumn>
  </StepsWrapper>
  );
}

function Characters({ characters, personalities, roles, handleEditCharacters }){
  const [currentCharacter, setCurrentCharacter] = useState(characters[0]);
  const [currentPersonality, setCurrentPersonality] = useState(personalities[0]);
  const [currentRol, setCurrentRol] = useState(roles[0]);

  return (
    <>
      <LeftColumn>
        <RotatedTitle>PERSONAJES</RotatedTitle>
      </LeftColumn>
      <RightColumn>
        <StepsContainer>
          <Card className="card-hover" style={{ width: '50%' }}>
            <CardTitle>SELECCIONE UN PERSONAJE:</CardTitle>

            <ScrollContainer>
              {characters.map((character, index) => (
                <CardSelect
                  key={character.id_personaje}
                  selected={currentCharacter.id_personaje === character.id_personaje}
                  onClick={() => {
                    setCurrentCharacter(character);
                    setCurrentPersonality(personalities[index]);
                    setCurrentRol(roles[index]);
                  }}
                >
                  {character.nombre + " " + character.apellido}
                </CardSelect>
              ))}
            </ScrollContainer>
          </Card>
          
          <div style={{ width:'80%', height: '100%', display: 'flex', flexDirection: 'column'}}>
            <Card>
              <CardTitle>PERFIL DEMOGRÁFICO:</CardTitle>
              <CardDescription>Edad: {currentCharacter.edad}</CardDescription>
              <CardDescription>Género: {currentCharacter.sexo}</CardDescription>
            </Card>

            <Card>
              <CardTitle>ROL:</CardTitle>
              {currentRol.map((rol) => (
                <CardDescription>{rol.nombre}</CardDescription>
              ))}              
            </Card>
          </div>

          <CardHorizontal 
            style={{marginLeft:'-15px', display:'flex'}}
            image={currentPersonality.imagen}
          >
            <CardTitle
              style={{
                alignSelf: 'flex-end',
                textAlign: 'right',
                width: 'auto',
              }}
            >
              PERSONALIDAD: {currentPersonality.nombre}
            </CardTitle>


            <CardHorizontalDescription style={{fontSize:'10px'}} dangerouslySetInnerHTML={{ __html: currentPersonality.descripcion }} />
          </CardHorizontal>

          <FormContainer style={{'margin':'0px 5px', display:'flex'}}>
            <CardTitle style={{'color': '#43474f'}}>CARACTERÍSTICAS:</CardTitle>
            <CardDescription style={{'color': '#43474f'}}>
              <p>
                <b>Apariencia: </b>{currentCharacter.apariencia}<br/><br/>
                <b>Ocupación/profesión: </b>{currentCharacter.ocupacion}<br/><br/>
                <b>Intereses: </b>{currentCharacter.intereses}<br/><br/>
                <b>Estatus social: </b>{currentCharacter.estatus_social}<br/><br/>
                <b>Creencia(s): </b>{currentCharacter.creencias}<br/><br/>
                <b>Antecedentes: </b>{currentCharacter.antecedentes}
              </p>
            </CardDescription>
          </FormContainer>

          <CenteredButtonContainer>
            <Button onClick={handleEditCharacters}>Editar</Button>
          </CenteredButtonContainer>
        </StepsContainer>
      </RightColumn>
    </>
  );
}

function Tips({ feature, stages, currentStage }) {
  const [tips, setTips] = useState([]);
  const [currentTipIndex, setCurrentTipIndex] = useState(0);

  useEffect(() => {
    if (!stages[currentStage - 1]) return;

    axios
      .get(`http://localhost:5001/rakonti/tips-consejos/${feature.id_estructura}/${stages[currentStage - 1]?.id_paso_estructura}`)
      .then(res => {
        setTips(res.data);
        setCurrentTipIndex(0);
      })
      .catch(err => console.error('Error al cargar los tips del paso:', err));
  }, [feature.id_estructura, stages, currentStage]);

  const handlePrevious = () => {
    setCurrentTipIndex(prev => (prev === 0 ? tips.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentTipIndex(prev => (prev === tips.length - 1 ? 0 : prev + 1));
  };

  const currentTip = tips[currentTipIndex];  

  return (
    <>
      <LeftColumn>
        <RotatedTitle>TIPS</RotatedTitle>
      </LeftColumn>

      <RightColumn>
        <StepsContainer>
          <LargeCard>
            <TipButtonContainer>
              <TipButton onClick={handlePrevious}>
                <IconImage src="images/left-arrow.png" />
              </TipButton>
            </TipButtonContainer>

            <TipContent>
              <CardTitle style={{fontSize:'15px'}}>{stages[currentStage - 1]?.nombre_paso.toUpperCase()}</CardTitle>
              <br />
              <CardDescription style={{textAlign:'center', fontSize:'13px'}}>
                {currentTip ? currentTip.descripcion : 'No hay tips disponibles.'}
              </CardDescription>
              <br />
              <CardTitle>{currentTipIndex + 1} / {tips.length}</CardTitle>
            </TipContent>

            <TipButtonContainer>
              <TipButton onClick={handleNext}>
                <IconImage src="images/right-arrow.png" />
              </TipButton>
            </TipButtonContainer>
          </LargeCard>

        </StepsContainer>
      </RightColumn>
    </>
  );
}

function RMapView() {
  const { id_historia } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const narrative = useSelector(state => state.story.narrative);
  const feature = useSelector(state => state.story.feature);
  const genre = useSelector(state => state.story.genre);
  const plot = useSelector(state => state.story.plot);
  const desire = useSelector(state => state.story.desire);
  const time = useSelector(state => state.story.time);
  const characters = useSelector(state => state.story.characters);
  const personalities = useSelector(state => state.story.personalities);
  const roles = useSelector(state => state.story.roles);
  const currentStage = useSelector(state => state.story.currentStage);
  
  const [stages, setStages] = useState([]);
  const [value, setValue] = useState('');
  const [stepContents, setStepContents] = useState({});
  const [showSteps, setShowSteps] = useState(true);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [editedSteps, setEditedSteps] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [showFinalPopup, setShowFinalPopup] = useState(false);
  const [showFeatures, setShowFeatures] = useState(false);
  const [showCharacters, setShowCharacters] = useState(false);
  const [showTips, setShowTips] = useState(false);
  const [originalFeature, setOriginalFeature] = useState(feature);  

  const totalSteps = narrative.hitos_cantidad.reduce((a, b) => a + b, 0);

  useEffect(() => {
    setOriginalFeature(feature);
  }, []);
  
  useEffect(() => {
    if (feature?.id_estructura) {
      api.get(`/pasos-estructura-narrativa/estructura/${feature.id_estructura}`)
      .then(res => {
        const pasosOrdenados = res.data.sort((a, b) => a.numero_paso - b.numero_paso);
        setStages(pasosOrdenados);
      })
      .catch(err => console.error('Error al cargar los pasos de la estructura:', err));
    }
    
    axios
      .get(`http://localhost:5001/rakonti/pasos-estructura-narrativa-historia/historia/${id_historia}`)
      .then((res) => {
        const contents = {};
        res.data.forEach((paso) => {
          contents[paso.id_paso_estructura] = paso.contenido;
        });
        setStepContents(contents);
      })
      .catch((err) => console.error('Error al cargar contenidos previos:', err));
  }, [feature, id_historia]);

  useEffect(() => {
    const idPasoActual = stages[currentStage - 1]?.id_paso_estructura;
    if (idPasoActual && stepContents[idPasoActual]) {
      setValue(stepContents[idPasoActual]);
    } else {
      setValue('');
    }
  }, [currentStage, stages, stepContents]);
  
  useEffect(() => {
    const undoButton = document.querySelector('.ql-undo');
    const redoButton = document.querySelector('.ql-redo');
    const customButton = document.querySelector('.ql-next');
    
    if (undoButton) undoButton.innerHTML = '↩';
    if (redoButton) redoButton.innerHTML = '↪';
    if (customButton && !customButton.innerHTML.includes('Siguiente')) {
      customButton.innerHTML = 'Siguiente paso';
    }
  }, [value]);

  useEffect(() => {
    const featureChanged = JSON.stringify(feature) !== JSON.stringify(originalFeature);
    if (featureChanged) {
      setHasUnsavedChanges(true);
    }
  }, [feature, originalFeature]);

  const handleChange = (content) => {
    setValue(content);
    const idPasoActual = stages[currentStage - 1]?.id_paso_estructura;
    
    if (idPasoActual) {
      setStepContents((prev) => ({
        ...prev,
        [idPasoActual]: content,
      }));

      const original = stepContents[idPasoActual] || '';
      const changed = original !== content;
      setHasUnsavedChanges(changed);

      if (changed) {
        setEditedSteps(prev => ({
          ...prev,
          [idPasoActual]: content,
        }));
      } else {
        // Si lo dejó igual que antes, lo quitamos de editedSteps
        setEditedSteps(prev => {
          const newSteps = { ...prev };
          delete newSteps[idPasoActual];
          return newSteps;
        });
      }
    }
  };
  
  const handleSave = async () => {
    if(!hasUnsavedChanges) return;
    setHasUnsavedChanges(false);
    
    try {
      const saveRequests = Object.entries(editedSteps).map(([id_paso_estructura, contenido]) =>
        api.post('/pasos-estructura-narrativa-historia', {
          id_historia,
          id_paso_estructura: Number(id_paso_estructura),
          contenido
        })
      );
      
      await Promise.all(saveRequests);
      
      await api.put(`/historias/${id_historia}`, {
        titulo: feature.titulo,
        paso_actual: currentStage,
        fecha_edicion: new Date()
      });
      
      alert('Progreso guardado correctamente.');
      setEditedSteps({});
    } catch (err) {
      console.error(err);
      alert('Error al guardar los pasos.');
    }
  };

  const handleEditFeature = () => {
    if (hasUnsavedChanges) {
      const confirm = window.confirm("Tienes cambios sin guardar. ¿Estás seguro de continuar?");
      if (!confirm) return;
    }

    navigate(`/features/${feature.id_historia}`);
  }

  const handleEditCharacters = () => {
    if (hasUnsavedChanges) {
      const confirm = window.confirm("Tienes cambios sin guardar. ¿Estás seguro de continuar?");
      if (!confirm) return;
    }

    navigate(`/characters/${feature.id_historia}`);
  }

  const handleNext = () => {
    const content = value?.replace(/<(.|\n)*?>/g, '').trim(); // Elimina etiquetas HTML y espacios

    if (!content) {
      alert('Debes completar este paso antes de continuar.');
      return;
    }

    if (currentStage < totalSteps) {
      dispatch(setCurrentStage(currentStage + 1));
    } else if (currentStage === totalSteps) {
      handleSave();
      setShowFinalPopup(true);
    }
  };

  const handleStep = (stepNumber) => {
    const content = value?.replace(/<(.|\n)*?>/g, '').trim(); // Elimina etiquetas HTML y espacios

    if (!content && stepNumber >= currentStage) {
      alert('Debes completar este paso antes de continuar.');
      return;
    }

    dispatch(setCurrentStage(stepNumber));
  }

  const popUp = () => {
    if (hasUnsavedChanges) {
      const confirm = window.confirm("Tienes cambios sin guardar. ¿Estás seguro de continuar?");
      if (!confirm) return;
    }
    
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <>
      <BackgroundImage src='images/modes-background.jpg' alt='narratives-background' />
      <TopMenu 
        feature={feature}
        handleSave={handleSave} 
        handleFeature={() => {
          setShowFeatures(prev => !prev);
          setShowCharacters(false);
          setShowTips(false);
        }}
        handleCharacters={() => {
          setShowCharacters(prev => !prev);
          setShowFeatures(false);
          setShowTips(false);
        }}
        handleTips={() => {
          setShowTips(prev => !prev);
          setShowFeatures(false);
          setShowCharacters(false);
        }}
        handleToggleSteps={() => setShowSteps(prev => !prev)}
        hasUnsavedChanges={hasUnsavedChanges}
        popUp={popUp}
        showSteps={!showSteps}
      />

      {showSteps && (
        <>
          {showFeatures && (
            <Features
              genre={genre}
              plot={plot}
              desire={desire}
              time={time}
            />
          )}

          {showCharacters && (
            <StepsWrapper>
              <Characters
                characters={characters}
                personalities={personalities}
                roles={roles}
                handleEditCharacters={handleEditCharacters}
              />
            </StepsWrapper>
          )}

          {showTips && (
            <StepsWrapper>
              <Tips
                feature={feature}
                stages={stages}
                currentStage={currentStage}
              />
            </StepsWrapper>
          )}

          {!showFeatures && !showCharacters && !showTips && (
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
                        <b>Acto {index + 1}: {hito}</b>
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
                            onClick={() => handleStep(stepNumber)}
                            active={stepNumber <= currentStage}
                            disabled={stepNumber > currentStage + 1}
                          />
                        </Map>
                        <StepLabel>{stages[stepNumber - 1]?.nombre_paso}</StepLabel>
                      </MapWrapper>
                    );
                  })}
                </MapsContainer>
              </RightColumn>
            </StepsWrapper>
          )}
        </>
      )}

      <Container>
        <Edit 
          stages={stages} 
          currentStage={currentStage}
          value={value}
          handleChange={handleChange}
          showSteps={showSteps} 
          stepContents={stepContents} />
        <ButtonsWrapper>
          { <Button type="button" onClick={handleNext}>{currentStage < totalSteps ? "Siguiente paso" : "Finalizar"}</Button> }
        </ButtonsWrapper>
      </Container>

      {showPopup && (
        <PopupOverlay>
          <PopupContent>
            <CloseButton onClick={closePopup}>X</CloseButton>
            <RFilesView 
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
              closePopup={closePopup}
            />
          </PopupContent>
        </PopupOverlay>
      )}

      {showFinalPopup && (
        <PopupOverlay>
          <FinalPopupContent>
            <FinalButtonsWrapper>
              <Button style={{fontSize:'13px'}} onClick={()=> setShowFinalPopup(false)}>VOLVER A TU HISTORIA</Button>
              <Button style={{fontSize:'13px'}} onClick={() => downloadWordDocument(feature.titulo, stages, stepContents)}>DESCARGAR EN ARCHIVO DE TEXTO</Button>
              <Button style={{fontSize:'13px'}} onClick={()=> navigate('/home')}>VOLVER AL INICIO</Button>
            </FinalButtonsWrapper>
          </FinalPopupContent>
        </PopupOverlay>
      )}
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
  margin: 0px 20px;
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
  text-align: center;
  color: white;
  font-size: 20px;
  line-height: 1.2;
  width: 200px;
  white-space: normal;
  word-break: break-word;
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
  height: 35vh;
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
  height: 100%;
  gap:5px;
`;

const CenteredButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  margin-left: 20px;
  width:5%;
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

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6; /* opcional */
  }
`;

const FormContainer = styled.form`
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px 30px 40px;
  background-image: url('images/section.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  width: 95%;
  height: 100%;
  box-sizing: border-box;
  border-radius: 40px;
`;

const ButtonsWrapper = styled.div`
  margin: 10px;
  display: flex;
  gap: 10px;
  margin-top: auto;

  button {
    padding: 5px 12px;
    cursor: pointer;
  }
`;
  
const Button = styled.button`
  height: 40px;
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

const TipButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  margin: 0;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    opacity: 0.5;
  }
`;
  
const IconImage = styled.img`
  width: 50px;
  height: 50px;
  object-fit: contain;
`;

const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const PopupContent = styled.div`
  background: white;
  padding: 30px;
  border-radius: 12px;
  width: 60%;
  height: 40%;
  overflow: auto;
  position: relative;
`;

const FinalPopupContent = styled(PopupContent)`
  background-image: url('/images/pop-up-final.png');
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  background-color: transparent;
  height: 70%;
  width: 100vh;
  padding: 30px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
`;

const FinalButtonsWrapper = styled(ButtonsWrapper)`
  margin-top: 400px;
  margin-bottom: 20px;
  width: 70%;

  display: flex;
  justify-content: center;  /* centra los botones dentro del wrapper */
  gap: 10px;

  margin-left: auto;
  margin-right: auto;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 15px;
  background: transparent;
  border: none;
  font-size: 18px;
  cursor: pointer;
`;

const Card = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 20px 20px 20px 25px;
  background-image: url('images/card-dark.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center;
  width: 95%;
  height: 100%;
  box-sizing: border-box;
`;

const LargeCard = styled.form`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0px 40px 0px 40px;
  background-image: url('images/card-dark-large.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
`;

const TipContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0px 20px;
  text-align: center;
`;

const TipButtonContainer = styled.div`
  width: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ScrollContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;

  width: 100%;
  max-height: 250px;
  overflow-y: auto;
  padding-right: 5px;
  word-break: break-word;
  overflow-wrap: break-word;

  height: 160px; /* o el valor que necesites */
  overflow-y: auto;

  scrollbar-width: thin;
  scrollbar-color: #888 transparent;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 4px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }

  /* Asegura que los items se alineen arriba, incluso si hay pocos */
  justify-content: flex-start;
`;

const CardSelect = styled.div`
  font-size: 12px;
  color: ${({ selected }) => (selected ? '#43474f' : 'white')};
  text-align: center;
  cursor: pointer;
  width: 100%;
  padding: 8px 12px;
  margin: 2px 0;
  box-sizing: border-box;
  background-color: ${({ selected }) => (selected ? 'white' : 'transparent')};
  transition: background-color 0.2s ease, color 0.2s ease;

  &:hover {
    background-color: white;
    color: #43474f;
  }
`;

const CardTitle = styled.h1`
  font-size: 11px;
  font-weight: 800;
  color: white;
  display: flex;
  justify-content: center;
  text-align: center;
  width: 100%;
`;

const CardDescription = styled.div`
  color: white;
  font-size: 11px;
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
    background-color: rgba(0, 0, 0, 0.3); /* blanco translúcido */
    border-radius: 3px;
  }

  /* Firefox */
  scrollbar-width: thin;
  scrollbar-color: rgba(0, 0, 0, 0.3) transparent;
`;

const CardImage = styled.img`
  width: 100%;
  height: 80px;
  object-fit: contain;
  margin: 10px 0;
`;

const StepContextContainer = styled.div`
  margin: 20px 0px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  height: ${({ showSteps }) => showSteps ? '400px' : '680px'};      
  overflow-y: auto;       
  padding-right: 8px;
`;


const ReadOnlyBlock = styled.div`
  color: #555;
  font-size: 10px;
`;

const StepTitle = styled.h4`
  font-weight: bold;
  margin-bottom: 8px;
  color: #888;
`;

const StepText = styled.div`
  white-space: normal;
  word-break: break-word;
  overflow-wrap: break-word;
  width: 100%;
  line-height: 1.5;
`;

const Separator = styled.div`
  border-top: 2px solid ${({ color }) => color };
  width: 100%;
  opacity: ${({ opacity }) => opacity };
`;

const CardHorizontal = styled.form`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 30px 20px 0px 0px;
  background-image: ${({ image }) => `url(${image})`};
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center;
  width: 150%;
  height: 100%;
  box-sizing: border-box;
  text-align: right;
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

export default RMapView;