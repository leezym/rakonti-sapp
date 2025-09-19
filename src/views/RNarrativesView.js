import api from "../api/axiosConfig";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
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
import TopMenu from './TopMenu';
import PopUp from './PopUp';

function RNarrativesView() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [estructuras, setEstructuras] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    api.get('/estructuras-narrativas')
      .then(res => setEstructuras(res.data))
      .catch (error => {
        const errorMsg = error.response?.data?.error || error.response?.data?.detalle || 'Error al cargar las estructuras narrativas';
        console.error(errorMsg, error);
      });
  }, []);

  const onClicked = (estructura) => {
    // Crear narrativa temporalmente
    dispatch(setNarrative(estructura));

    navigate('/features');
  }
  
  const popUp = () => {
    setShowPopup(true);
  };

  return <>
    <BackgroundImage src='images/narratives-background.jpg' loading='lazy'/>
    <Container>
      <Opacity>
          <TopMenu popUp={popUp}/>
          <Title>ESTRUCTURA NARRATIVA</Title>
          <Subtitle>Elige la estructura narativa que deseas usar para la creración de tu historia:</Subtitle>
      </Opacity>

      <CardRow>
        {estructuras.map(estructura => (
          <CardColumn>
            <Card>
              <Title>{estructura.nombre}</Title>
              <Subtitle>{estructura.escritor}</Subtitle>
              <CardImage src={estructura.imagen} loading='lazy'/>
              <CardDescription>
                { estructura.descripcion }
              </CardDescription>
              <ButtonSecondary onClick={() => onClicked(estructura)}>Seleccionar</ButtonSecondary>
            </Card>
          </CardColumn>
        ))}
      </CardRow>

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
  font-size:16px;
  font-weight: 800;
  color: white;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Subtitle = styled.div`
  font-size:14px;
  color: white;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-bottom: 20px;
`;

const CardRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); 
  gap: 50px;
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
  justify-content: flex-start;
  align-items: stretch;

  padding: 30px 50px;
  background-image: url('images/card-dark.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center;

  width: 100%;
  height: 500px;     
  box-sizing: border-box;
  overflow: hidden;
`;

const CardImage = styled.img`
  max-height: 200px;
  object-fit: contain;
`;

const CardDescription = styled.div`
  color: white;
  font-size: 12px;
  text-align: left;
  width: 100%;
  margin: 20px 10px 15px 0px;

  flex: 1;          
  min-height: 0;    
  overflow-y: auto;
  word-break: break-word;
  overflow-wrap: break-word;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 3px;
  }
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.3) transparent;
`;

const ButtonSecondary = styled.button`
  align-self: center;     /* 🔑 centra el botón dentro de la card */
  margin-top: auto;       /* 🔑 lo empuja al fondo de la card */

  padding: 6px 16px;      /* 🔑 más compacto */
  font-size: 13px;
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

export default RNarrativesView;