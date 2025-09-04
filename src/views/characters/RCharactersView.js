import { useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
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
  setCharacters,
  setPersonalities,
  setRoles,
  setCurrentStage
} from '../../redux-store/reducers/storySlice';

function RCharactersView() {
  const { id_historia } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const [showPopup, setShowPopup] = useState(false);

  const characters = useSelector(state => state.story.characters) || [];
  const personalities = useSelector(state => state.story.personalities) || [];

  const onClicked = (character, index) => {
    navigate(`/character/${character.id_personaje}`, { state: { index, id_historia } });
  }

  const handleFinish = () => {
    dispatch(setCurrentStage(1));    
      
    const showTutorial = location.state?.showTutorial;
    if(showTutorial)
      navigate(`/map/${id_historia}`, { state: { showTutorial } })
    else
      navigate(`/map/${id_historia}`)
  }

  const popUp = () => {
    setShowPopup(true);
  };
  
  return (
    <>
      <BackgroundImage src='images/narratives-background.jpg' loading='lazy'/>
      <Container>
        <Opacity>
            <TopMenu popUp={popUp}/>
            <Title style={{paddingTop:'10px'}}>CREADOR DE PERSONAJES</Title>
            <Subtitle style={{padding:'10px'}}>Conoce tus personajes creados, crea un nuevo personaje o avanza en la elección de la estructura narrativa de tu historia.</Subtitle>
        </Opacity>

        <CardRowWrapper>
          <CardRow>
            <CardColumn>
              <Card style={{ backgroundImage:'url("images/card-dark.png")'}}>
              <CardHeader>
                <Title style={{ textAlign: 'center' }}>Crear nuevo personaje</Title>
              </CardHeader>

                <CardImage
                  src={'images/plus-icon.png'}
                  loading='lazy'
                  onClick={() => navigate('/character', { state: { id_historia } })}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    cursor: 'pointer'
                  }}
                />
              </Card>
            </CardColumn>     

            { (id_historia 
                ? characters.filter(c => String(c.id_historia) === String(id_historia))
                : characters
              ).map((character, index) => (
              <CardColumn key={character.id_personaje}>
                <Card image={`${personalities[index].imagen.replace('rectangle', 'square')}`}> {/*falta executive*/}
                  <CardHeader>
                    <Title>{character.nombre + " " + character.apellido}</Title>
                    <Subtitle>{personalities[index].nombre}</Subtitle>
                  </CardHeader>

                  <ButtonSecondary onClick={() => onClicked(character, index)}>Ver más</ButtonSecondary>
                </Card>
              </CardColumn>
            ))}
          </CardRow>
        </CardRowWrapper>

        <ButtonsContainer>
          <ButtonPrimary onClick={handleFinish}>Finalizar</ButtonPrimary>
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

const Opacity = styled.div`
  width: 100%;
  flex-shrink: 0;
  background-image: url('images/opacity.png');
  background-size: fill;
  background-repeat: no-repeat;
  background-position: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  box-sizing: border-box;
`;

const Title = styled.h1`
  font-size: 14px;
  font-weight: 800;
  color: white;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Subtitle = styled.div`
  font-size:12px;
  color: white;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
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
  margin-top: 10px;
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
  position: absolute; 
  top: 60%;           
  right: 30px;        
  transform: translateY(-50%); /* 👈 centrado vertical */
  
  padding: 10px 15px;
  font-size: 12px;
  border: none;
  border-radius: 6px;
  background-color: white;
  color: #43474f;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: gray;
    color: white;
  }
`;

const CardRowWrapper = styled.div`
  width: 100%;
  max-width: 90vw;
  overflow-x: auto;
  overflow-y: hidden;

  display: flex;
  justify-content: flex-start;
  align-items: center;   /* 👈 centra verticalmente el contenido dentro */
  
  margin: auto;          /* 👈 mantiene el bloque centrado en su padre */
  box-sizing: border-box;
  scroll-behavior: smooth;
  flex-shrink: 0;        /* 👈 evita que se colapse con zoom out */

  &::-webkit-scrollbar {
    height: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 1);
    border-radius: 3px;
  }
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 1) transparent;
`;

const CardRow = styled.div`
  display: flex;
  flex-wrap: nowrap;
  width: max-content;   /* 👈 permite crecer horizontalmente */
  box-sizing: border-box;
  /* 👈 eliminado margin: 0 auto para alinear contenido a la izquierda */
`;

const CardColumn = styled.div`
  flex: 0 0 300px;  /* 👈 todas las tarjetas mismo ancho */
  display: flex;
`;

const Card = styled.form`
  position: relative;  /* 👈 necesario para el botón absoluto */
  display: flex;
  flex-direction: column;
  justify-content: flex-start; /* 👈 títulos arriba */
  align-items: stretch;

  padding: 20px;
  background-image: ${({ image }) => `url(${image})`};
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center;

  width: 100%;
  height: 380px;     
  box-sizing: border-box;
`;

const CardHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin: 10px;
`;

const CardImage = styled.img`
  width: auto;
  height: 110px;
  object-fit: contain;
`;

export default RCharactersView;