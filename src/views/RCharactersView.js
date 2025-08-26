import api from "../api/axiosConfig";
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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

function RCharactersView() {
  const { id_historia } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showPopup, setShowPopup] = useState(false);

  const characters = useSelector(state => state.story.characters) || [];
  const personalities = useSelector(state => state.story.personalities) || [];


  const onClicked = (character, index) => {
    navigate(`/character/${character.id_personaje}`, { state: { index, id_historia } });
  }

  const handleFinish = () => {
    dispatch(setCurrentStage(1));
    const id_usuario = localStorage.getItem('id_usuario');
    
    api.get(`/historias/${id_usuario}`)
      .then(res => {
        const isNewStory = res.data.length === 1; // la primera historia que acaba de crear
        
        if(isNewStory)
          navigate(`/map/${id_historia}`, { state: { isNewStory } })
        else
          navigate(`/map/${id_historia}`)
      })
      .catch(err => console.error('Error al cargar las historias del usuario:', err));    
  }

  const popUp = () => {
    setShowPopup(true);
  };
  
  return (
    <>
      <BackgroundImage src='images/narratives-background.jpg' alt='narratives-background'/>
      <Opacity>
          <TopMenu popUp={popUp}/>
          <Title>CREADOR DE PERSONAJES</Title>
          <Subtitle>Conoce tus personajes creados, crea un nuevo personaje o avanza en la elección de la estructura narrativa de tu historia.</Subtitle>
      </Opacity>
      <Container>
        <CardRow>
          <CardColumn>
            <Card style={{ position: 'relative' }}>
              <Title style={{ textAlign: 'center' }}>Crear nuevo personaje</Title>

              <CardImage
                src={'images/plus-icon.png'}
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
              <Card>
                <Title style={{fontSize:'18px'}}>{character.nombre + " " + character.apellido}</Title>
                <Subtitle>{personalities[index].nombre}</Subtitle>
                <CardImage src={`${personalities[index].imagen.replace('square', 'avatar')}`} />
                <Button 
                  onClick={() => onClicked(character, index)}
                  style={{ marginTop: 'auto', display: 'flex', justifyContent: 'center' }}
                >Ver más</Button>
              </Card>
            </CardColumn>
          ))}
        </CardRow>

        <Button onClick={handleFinish}>Finalizar</Button>
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
  margin-top: 20px;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color:rgb(212, 218, 231);
  }
`;

const CardRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
  justify-content: center;
`;

const CardColumn = styled.div`
  display: flex;
  justify-content: center;
  align-items: stretch;
  height: 100%;
`;

const Card = styled.form`
  padding: 20px 40px 30px 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: url('images/card-dark.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center;
  width: 300px;
  height: 100%;
  box-sizing: border-box;
  margin-bottom: 10px;
`;

const CardImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: contain;
  margin: 10px 0;
`;

export default RCharactersView;