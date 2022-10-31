/**
 * @author Martín Vladimir Alonso Sierra Galvis 
 * @version 1.0.1
 */

import { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCharacter } from '../redux-store/reducers/storySlice';

import { personalities } from '../redux-store/data/characters';

function RCharactersView() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const dispatch = useDispatch();

  const onArrowClicked = (e) => {
    const { name } = e.target;
    let newIndex = name === 'up' ? currentIndex - 1 : currentIndex + 1;

    /** Correción del índice para evitar errores */
    const { length } = personalities;
    if (newIndex < 0) {
      newIndex = length - 1;
    }
    else if (newIndex > length - 1) {
      newIndex = 0;
    }

    setCurrentIndex(newIndex);
  }

  const onContinueClicked = () => {
    dispatch(setCharacter(personalities[currentIndex]));
  }

  return <div>
    <CharacterImage src={personalities[currentIndex].url} alt='character-image'/>
    <OverlayContainer>
      <CharacterContainer>
        <ColumnContainer>
          <Button onClick={onArrowClicked} top={true}>
            <ArrowImage src='images/up-arrow.png' alt='up-arrow' name='up'/>
          </Button>
          <Button onClick={onArrowClicked}>
            <ArrowImage src='images/down-arrow.png' alt='down-arrow' name='down'/>
          </Button>
        </ColumnContainer>
        <ColumnContainer right={true}>
          <Subtitle>Personaje</Subtitle>
          <Title>{ personalities[currentIndex].name }</Title>
          <Description>{ personalities[currentIndex].description }</Description>
        </ColumnContainer>
      </CharacterContainer>
      <ContinueLink onClick={onContinueClicked} to='/'>
        <ContinueImage src='images/continue-map.png' alt='continue'/>
      </ContinueLink>
    </OverlayContainer>
  </div>
}

const ArrowImage = styled.img`
  height: 100%;
  width: 100%;
`;

const Button = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  height: 40px;
  margin-bottom: ${({ top }) => top ? '20px' : '0px'};
  padding: 0;
  width: 35px;
`;

const CharacterContainer = styled.div`
  display: flex;
  height: 40vh;
  margin-bottom: 150px;
  margin-right: 180px;
  width: 40%;
`;

const CharacterImage = styled.img`
  max-height: 100vh;
  object-fit: cover;
  max-width: 100%;
  vertical-align: middle;
`;

const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: ${({ right }) => right ? '30px': '0px'};
`;

const ContinueImage = styled.img`
  height: 100px;
  width: 100px;
`;

const ContinueLink = styled(Link)`
  bottom: 4%;
  position: absolute;
  right: 5%;
`;

const Description = styled.div`
  color: gray;
  margin: 20px 0 0 10px;
  text-align: justify;
`;

const OverlayContainer = styled.div`
  align-items: flex-end;
  display: flex;
  height: 100vh;
  justify-content: flex-end;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
`;

const Subtitle = styled.h3`
  color: darkgray;
  font-size: 1.7em;
  font-weight: 500;
  margin: 0;
`;

const Title = styled.h1`
  font-size: 3.5em;
  font-weight: 600;
  margin: 0 0 0 10px;
`;

export default RCharactersView;