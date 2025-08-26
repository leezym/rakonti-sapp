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
      .catch(err => console.error('Error al cargar las estructuras narrativas:', err));
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
    <BackgroundImage src='images/narratives-background.jpg' alt='narratives-background'/>
    <Opacity>
        <TopMenu popUp={popUp}/>
        <Title>ESTRUCTURA NARRATIVA</Title>
        <Subtitle>Elige la estructura narativa que deseas usar para la creración de tu historia:</Subtitle>
    </Opacity>
    <Container>
      <CardRow>
        {estructuras.map(estructura => (
          <CardColumn>
            <Card>
              <Title>{estructura.nombre}</Title>
              <Subtitle>{estructura.escritor}</Subtitle>
              <CardImage src={estructura.imagen}/>
              <CardDescription>
                { estructura.descripcion }
              </CardDescription>
              <Button onClick={() => onClicked(estructura)}>Seleccionar</Button>
            </Card>
          </CardColumn>
        ))}
      </CardRow>
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

const Opacity = styled.div`
  width: 100%;
  height: 20%;
  background-image: url('images/opacity.png');
  background-size: fill;
  background-repeat: no-repeat;
  background-position: center;
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

const Title = styled.h1`
  font-size:20px;
  font-weight: 800;
  color: white;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Subtitle = styled.div`
  font-size:15px;
  color: white;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-bottom: 20px;
`;

const Button = styled.button`
  position: relative;
  padding: 10px 30px;
  font-size: 16px;
  color: #43474f;
  border: none;
  border-radius: 10px;
  background-color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color:rgb(212, 218, 231);
  }
`;

const CardRow = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 100px;
  width: 70%;
  margin: 0 auto;
  grid-auto-rows: 1fr; /*Esto fuerza igual altura en TODAS las filas */
`;

const CardColumn = styled.div`
  display: flex;
  align-items: stretch;
  height: 100%;
`;

const CardImage = styled.img`
  width: 400px;
  object-fit: contain;
  margin: 10px 0;
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
  max-height: 250px;
  overflow-y: auto;
  padding-right: 5px;
  margin-bottom:30px;
`;

export default RNarrativesView;