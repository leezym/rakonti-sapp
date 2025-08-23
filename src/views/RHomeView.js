import api from "../api/axiosConfig";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { persistor } from '../redux-store';
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
import styled from 'styled-components';
import PopUp from './PopUp';

function RHomeView() {  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPopup, setShowPopup] = useState(false);
  const [isNewStory, setIsNewStory] = useState(false);

  useEffect(() => {
    dispatch(setNarrative(null));
    dispatch(setFeature(null));
    dispatch(setGenre(null));
    dispatch(setPlot(null));
    dispatch(setDesire(null));
    dispatch(setTime(null));
    dispatch(setCharacters([]));
    dispatch(setPersonalities([]));
    dispatch(setRoles([]));
    dispatch(setCurrentStage(0));
  }, [dispatch]);

  const popUp = () => {
    setShowPopup(true);
  };

  const newStory = () => {
    const id_usuario = localStorage.getItem('id_usuario');

    api.get(`/historias/${id_usuario}`)
      .then(res => setIsNewStory(res.data.length === 0 ? true : false))
      .catch(err => console.error('Error al cargar las historias del usuario:', err));

    if(isNewStory)
      navigate('/narratives', { state: { isNewStory } })
    else
      navigate('/narratives')
  };

  const handleLogout = () => {
    persistor.purge();
    localStorage.clear();
    sessionStorage.clear();
    dispatch({ type: "LOGOUT" });
    navigate('/');
  };

  return <>
    <BackgroundImage src='images/rakonti-background.jpg' alt='rakonti-background'/>

    <Container>
        <Button onClick={newStory}>Nueva historia</Button>
        <Button onClick={() => popUp()}>Mis historias</Button>
        <Button onClick={handleLogout}>Cerrar sesión</Button>
        
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
  height: 100vh;
  width: 100vw;
  object-fit: cover;
  z-index: -1;
`;

const Container = styled.div`
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  width: 100%;
`;

const Button = styled.button`
  width: 300px;
  height: 60px;
  font-size: 20px;
  font-weight: bold;
  border: none;
  background-image: url('images/white-button.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 10px;
  background-color: transparent;
  color: #43474f;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    color: gray;
  }

  &:active {
    transform: scale(0.98);
  }
`;

export default RHomeView;