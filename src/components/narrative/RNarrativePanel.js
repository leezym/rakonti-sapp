/**
 * @author Martín Vladimir Alonso Sierra Galvis 
 * @version 1.0.0
 */

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { setBackIcon, setMenuIcon } from '../../redux-store/reducers/uiSlice';
import RNarrative from './RNarrative';

function NarrativesSelected() {
  const [estructuras, setEstructuras] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5001/rakonti/estructuras-narrativas')
      .then(res => setEstructuras(res.data))
      .catch(err => console.error('Error al cargar las estructuras narrativas:', err));
  }, []);

  return (
    <Wrapper>
      {estructuras.map(estructura => (
        <ItemContainer key={estructura.id_estructura}>
          <RNarrative estructura={estructura} />
        </ItemContainer>
      ))}
    </Wrapper>
  );
}

function RNarrativePanel() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setBackIcon('back-icon.png'));
    dispatch(setMenuIcon('menu-icon.png'));
  }, []);

  return (
    <div>
      <BackgroundImage 
        src='images/narratives-background.jpg' 
        alt='narratives-background'
      />
      
      <NarrativesSelected />
    </div>
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

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  width: 100%;
  margin: 50px 0;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const ItemContainer = styled.div`
  width: 48%; /* para dejar espacio entre dos columnas */

  @media (max-width: 768px) {
    width: 90%; /* se ensancha al hacer fila */
    margin-bottom: 20px;
  }
`;


const Container = styled.div`
  width: 48%;
  display: flex;
  justify-content: center;

  @media (max-width: 768px) {
    width: 100%;
  }
`;



export default RNarrativePanel;