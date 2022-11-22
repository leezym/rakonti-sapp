/**
 * @author Martín Vladimir Alonso Sierra Galvis 
 * @version 1.0.0
 */

import { useState } from 'react';
import styled from 'styled-components';

import RCharacterTraits from './RCharacterTraits';

function RCharacter({ personality }) {
  const [traitName, setTraitName] = useState(null);

  const onCloseClicked = () => {
    setTraitName(null);
  }

  const onTraitsClicked = (e) => {
    setTraitName(e.target.name);
  }

  return <CharacterContainer>
    <Subtitle>Personaje</Subtitle>
    <Title>{ personality.name }</Title>
    {
      traitName ? 
      <RCharacterTraits 
        onClose={onCloseClicked}
        traitName={traitName}
        traits={personality[traitName]}/>
      :
      <div>
        <Description>{ personality.description }</Description>
        <ButtonsContainer>
          <Button 
            onClick={onTraitsClicked} 
            bgColor='#8496B2' 
            name='strengths'>
            FORTALEZAS
          </Button>
          <Button 
            onClick={onTraitsClicked} 
            bgColor='#825657' 
            name='weaknesses'>
            DEBILIDADES
          </Button>
        </ButtonsContainer>
      </div>
    }
  </CharacterContainer>
}

const Button = styled.button` 
  background-color: ${({ bgColor }) => bgColor};
  border: none;
  border-radius: 20px;
  color: white;
  cursor: pointer;
  padding: 10px 20px;
`;

const ButtonsContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding: 25px 0 0 10px;
  width: 270px;
`;

const CharacterContainer = styled.div`
  width: 100%;
`;

const Description = styled.p`
  color: gray;
  margin: 20px 0 0 10px;
  text-align: justify;
  width: 100%;
`;

const Subtitle = styled.h3`
  color: darkgray;
  font-size: 1.7em;
  font-weight: 500;
  margin: 0;
  width: 100%;
`;

const Title = styled.h1`
  font-size: 3.5em;
  font-weight: 600;
  margin: 0 0 0 10px;
  width: 100%;
`;

export default RCharacter;