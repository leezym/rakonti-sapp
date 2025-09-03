import api from "../api/axiosConfig";
import { useEffect, useState, useMemo, useRef  } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import TopMenu from './TopMenu';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
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
import Tutorial from "./Tutorial";
import PopUp from './PopUp';

function Edit({ stages, currentStage, quillRef, value, handleChange, modules, showSteps, stepContents, stepContextRef }) {
  useEffect(() => {
    if (quillRef.current && stepContextRef.current) {
      const editorContainer = quillRef.current.editor.container;

      const containerTop = stepContextRef.current.getBoundingClientRect().top;
      const editorTop = editorContainer.getBoundingClientRect().top;

      stepContextRef.current.scrollTo({
        top: stepContextRef.current.scrollTop + (editorTop - containerTop) - 50,
        behavior: "smooth",
      });
    }
  }, [currentStage]);

  const orderedStepContents = Object.entries(stepContents)
    .sort(([a], [b]) => Number(a) - Number(b))
    .map(([_, value]) => value);

  return (
    <>
      {showSteps && (
        <Paragraph>
          <Title>{stages[currentStage - 1]?.nombre_paso.toUpperCase()}</Title>
          <p style={{fontSize:'12px'}} dangerouslySetInnerHTML={{ __html: stages[currentStage - 1]?.descripcion }} />
        </Paragraph>
      )}

      <FormContainer>
        <StepContextContainer ref={stepContextRef} showSteps={showSteps}>
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
          <StyledEditor
            ref={quillRef}
            showSteps={showSteps}
            value={value}
            onChange={handleChange}
            modules={modules}
            placeholder={'Escribe aquí...'}
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
            <CardImage src={genre.imagen} loading='lazy'/>
            <CardDescription dangerouslySetInnerHTML={{ __html: genre.descripcion }} />
          </Card>

          <Card>
            <CardTitle>TRAMA:<br/>{plot.nombre}</CardTitle>
            <CardImage src={plot.imagen} loading='lazy'/>
            <CardDescription dangerouslySetInnerHTML={{ __html: plot.descripcion }} />
          </Card>

          <Card>
            <CardTitle>OBJETO DEL DESEO:<br/>{desire.nombre}</CardTitle>
            <CardImage src={desire.imagen} loading='lazy'/>
            <CardDescription dangerouslySetInnerHTML={{ __html: desire.descripcion }} />
          </Card>

          <Card>
            <CardTitle>TIEMPO Y ESPACIO:<br/>{time.nombre}</CardTitle>
            <CardImage src={time.imagen} loading='lazy'/>
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
          <Card className="card-hover" style={{ width: '60%' }}>
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
          
          <div style={{ width:'60%', height: '100%', display: 'flex', flexDirection: 'column'}}>
            <Card>
              <CardTitle>PERFIL DEMOGRÁFICO:</CardTitle>
              <CardDescription><b>Edad:</b> {currentCharacter.edad}</CardDescription>
              <CardDescription><b>Género:</b> {currentCharacter.sexo}</CardDescription>
            </Card>

            <Card>
              <CardTitle>ROL:</CardTitle>
              {currentRol.map((rol) => (
                <CardDescription>{rol.nombre}</CardDescription>
              ))}              
            </Card>
          </div>

          <CardHorizontal 
            style={{marginLeft:'-10px', display:'flex'}}
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
              <p style={{fontSize:'12px'}}>
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

    api.get(`/tips-consejos/${feature.id_estructura}/${stages[currentStage - 1]?.id_paso_estructura}`)
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
                <IconImage src="images/left-arrow.png" loading='lazy'/>
              </TipButton>
            </TipButtonContainer>

            <TipContent>
              <CardTitle style={{fontSize:'18px'}}>TIP: {stages[currentStage - 1]?.nombre_paso.toUpperCase()}</CardTitle>
              <br />
              <CardDescription style={{textAlign:'center', fontSize:'16px'}}>
                {currentTip ? currentTip.descripcion : 'No hay tips disponibles.'}
              </CardDescription>
              <br />
              <CardTitle>{currentTipIndex + 1} / {tips.length}</CardTitle>
            </TipContent>

            <TipButtonContainer>
              <TipButton onClick={handleNext}>
                <IconImage src="images/right-arrow.png" loading='lazy'/>
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
  const location = useLocation();

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
  const [tutorialStep, setTutorialStep] = useState(0);
  const [showTutorial, setShowTutorial] = useState(location.state?.showTutorial);
  const [rect, setRect] = useState(null);
  
  const menu_left = useRef(null);
  const title = useRef(null);
  const menu_right = useRef(null);
  const writing = useRef(null);
  const quillRef = useRef();
  const stepContextRef = useRef(null);
  const characterRef = useRef(null);
  const mapsContainerRef = useRef(null);

  const totalSteps = narrative.hitos_cantidad.reduce((a, b) => a + b, 0);
  const tutorialSteps = [
    { ref: null, text: "<h2><b>¡Te damos la bienvenida a Rakonti!</b></h2><br/><p>Para comenzar a crear tu primera historia, debes familiarizarte con el espacio de trabajo. Vamos a dar un tour rápido.</p><br/>" },
    { ref: menu_left, text: "<h2><b>Comandos generales</b></h2><br/><p>En la esquina superior izquierda encuentras las siguientes funcionalidades generales:<ul><li>Volver al inicio</li><li>Guardar</li><li>Mis historias</li></ul><br/>" },
    { ref: title, text: "<h2><b>Nombre de tu historia</b></h2><br/><p>En la parte superior encuentras el nombre de tu historia. ¡Puedes editarlo en cualquier momento con solo hacer doble click!</p><br/>" },
    { ref: menu_right, text: "<h2><b>Herramientas disponibles</b></h2><br/><p>En la esquina superior derecha encuentras un grupo de botones muy útiles con los que puedes activar o desactivar las siguientes funcionalidades:<ul><li>Resumen de los 4 pilares</li><li>Resumen de los personajes</li><li>Tips y consejos</li><li>Modo concentración. ¡Úsalo para ocultar todo menos el editor de texto!</li></ul><br/>" },
    { ref: writing, text: "<h2><b>Zona de escritura</b></h2><br/><p>En esta sección encuentras la zona para escribir en cada paso tu historia. Podrás avanzar en ella con el botón <b>Siguiente paso<b/>.<br/>" },
    { ref: null, text: "<h2><b>¡Muy bien! Ya conoces tu espacio de trabajo</b></h2><br/><p>Ahora que ya conoces cómo se organiza tu espacio de trabajo, puedes sacar el mayor provecho de todas las funcionalidades y herramientas a tu disposición. Ahora si...</p><br/>" }
  ];

  useEffect(() => {
    if (showTutorial) {
      const currentStep = tutorialSteps[tutorialStep];
      if (currentStep.ref?.current) {
        setRect(currentStep.ref.current.getBoundingClientRect());
      } else {
        setRect(null); // paso sin elemento
      }
    }
  }, [tutorialStep, showTutorial]);

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
    
    api.get(`/pasos-estructura-narrativa-historia/historia/${id_historia}`)
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

  useEffect(() => {
    if (!showFeatures && !showCharacters && !showTips && showSteps) {
      moveSpriteTo(currentStage);
    }
  }, [showFeatures, showCharacters, showTips, showSteps, currentStage]);


  const moveSpriteTo = (stepNumber) => {
    if (!mapsContainerRef.current || !characterRef.current) return;

    const button = document.querySelector(`[data-step='${stepNumber}']`);
    if (!button) return;

    const buttonRect = button.getBoundingClientRect();
    const containerRect = mapsContainerRef.current.getBoundingClientRect();

    const top = buttonRect.top - containerRect.top - characterRef.current.offsetHeight / 2;
    const left = (buttonRect.left - containerRect.left - characterRef.current.offsetWidth / 2) + 10;

    characterRef.current.style.top = `${top}px`;
    characterRef.current.style.left = `${left}px`;
  };

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
      const nextStage = currentStage + 1;
      dispatch(setCurrentStage(nextStage));
      moveSpriteTo(nextStage);
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
    moveSpriteTo(stepNumber);
  }

  const popUp = () => {
    if (hasUnsavedChanges) {
      const confirm = window.confirm("Tienes cambios sin guardar. ¿Estás seguro de continuar?");
      if (!confirm) return;
    }
    
    setShowPopup(true);
  };
  
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
      <BackgroundImage src='images/modes-background.jpg' loading='lazy'/>
      <TopMenu 
        showTutorial={showTutorial}
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
        onStartTutorial={() => {
          setShowTutorial(true);
          setTutorialStep(0);
        }}
        refsTutorial={{ menu_left, title, menu_right }}
      />

      {showTutorial && (
        <Tutorial
          step={tutorialStep}
          steps={tutorialSteps}
          rect={rect}
          onNext={() => setTutorialStep(tutorialStep + 1)}
          onPrev={() => setTutorialStep(tutorialStep - 1)}
          onClose={() => setShowTutorial(false)}
        />
      )}

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

                <MapsContainer ref={mapsContainerRef} className="maps-container">
                  {Array.from({ length: totalSteps }, (_, index) => {
                    const stepNumber = index + 1;

                    return (
                      <MapWrapper key={stepNumber} totalSteps={totalSteps}>
                        <Map
                          index={index}
                          totalSteps={totalSteps}
                          active={stepNumber <= currentStage}
                          step={stepNumber}
                          narrative={narrative}
                        >
                          <PointButton
                            data-step={stepNumber}
                            onClick={() => handleStep(stepNumber)}
                            active={stepNumber <= currentStage}
                            disabled={stepNumber > currentStage + 1}
                          />
                        </Map>
                        <StepLabel>{stages[stepNumber - 1]?.nombre_paso}</StepLabel>
                      </MapWrapper>
                    );
                  })}

                  <img
                    ref={characterRef}
                    src="images/character-statue.png"
                    loading='lazy'
                    style={{
                      position: "absolute",
                      width: "auto",
                      height: "50px",
                      transition: "top 0.5s ease, left 0.5s ease",
                      pointerEvents: "none",
                      zIndex: 999,
                      display: !showFeatures && !showCharacters && !showTips && showSteps ? "block" : "none"
                    }}
                  />
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
          quillRef={quillRef} 
          value={value} 
          handleChange={handleChange} 
          modules={modules} 
          showSteps={showSteps} 
          stepContents={stepContents} 
          stepContextRef={stepContextRef} />
        <ButtonsContainer>
          { <Button type="button" onClick={handleNext}>{currentStage < totalSteps ? "Siguiente paso" : "Finalizar"}</Button> }
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

const Paragraph = styled.div`
  color: #43474f;
  align-self: center;
  margin: 0px 20px;
  padding: 25px 20px 20px 25px;
  background-image: url('images/top-bar.png');
  background-color: transparent;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center;
  box-sizing: border-box;
`;
  
const Title = styled.h1`
  font-size: 14px;
  font-weight: 800;
  color: #43474f;
  display: flex;
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

const StepsWrapper = styled.div`
  display: flex;
  width: 100%;
  height: auto;
`;

const MapWrapper = styled.div`
  flex: 0 0 calc(100% / ${({ totalSteps }) => totalSteps});
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
  margin-right: 30px;
`;
  
const StepsContainer = styled.div`
  display: flex;
  width: 95%;
  align-items: stretch;
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
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  position: relative;
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
  max-height: 50px;
`;

const StepLabel = styled.div`
  margin-top: 5px;
  font-size: 10px;
  color: white;
  text-align: center;
  max-width: 70px;
  word-wrap: break-word;
`;

const Map = styled.div`
  width: 100%;
  aspect-ratio: 1 / 1;
  background-image: ${({ narrative, active, step }) =>
    active
      ? `url('${narrative.imagen.substring(0, narrative.imagen.lastIndexOf("."))}-map-step-${step}.png')`
      : `url('${narrative.imagen.substring(0, narrative.imagen.lastIndexOf("."))}-map-opacity-step-${step}.png')`};
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;

  /* solapamiento */
  margin-left: ${({ index }) => (index > 0 ? "-20%" : "0")};

  transition: all 0.3s ease;
  transform: scaleX(1.3);
  transform-origin: right;
`;

const PointButton = styled.button`
  position: absolute;
  top: 50%;
  left: 40%;
  width: 12px;
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
    opacity: 0.6;
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
    height: ${({ showSteps }) => showSteps ? '200px' : '400px'};
    overflow-y: auto;
    text-align: left;
    border: none !important;
  }
`;

const ButtonsContainer = styled.div`
  margin: 10px;
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
    background-color: gray;
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

const FinalPopupContent = styled.div`
  background: white;
  padding: 30px;
  border-radius: 12px;
  width: 60%;
  height: 40%;
  overflow: auto;
  position: relative;
  background-image: url('images/pop-up-final.png');
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  background-color: transparent;
  height: 100vw;
  width: 110vh;
  padding: 30px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
`;

const FinalButtonsWrapper = styled(ButtonsContainer)`
  margin-top: 120vh;
  width: 70%;
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-left: auto;
  margin-right: auto;
`;

const Card = styled.form`
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
  padding: 30px;
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
  max-height: 200px;
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
  border-radius: 10px;

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
  max-height: 200px;
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
  margin: 8px 0px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  height: ${({ showSteps }) => showSteps ? '50vh' : '73vh'};      
  overflow-y: auto;       
  padding-right: 8px;
`;


const ReadOnlyBlock = styled.div`
  color: #555;
`;
  
const StepTitle = styled.h4`
  font-size: 12px;
  font-weight: bold;
  margin-bottom: 8px;
  color: #888;
`;
  
const StepText = styled.div`
  p {
    font-size: 11px;
  }
  
  ul {
    font-size: 11px;
    padding-left: 22px;
    margin: 0 0 1em 0;
    list-style-type: disc;
  }
  
  ol {
    font-size: 11px;
    padding-left: 22px;
    margin: 0 0 1em 0;
    list-style-type: number;
  }

  li {
    font-size: 11px;
    margin-bottom: 0.5em;
    list-style-position: outside;
  }

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
  font-size: 11px;
  text-align: justify;
  width: 60%;
  overflow-y: auto;
  padding-right: 5px;
  flex: 1;
  max-height: 190px;

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

export default RMapView;