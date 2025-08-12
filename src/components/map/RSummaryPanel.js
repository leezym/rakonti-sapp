/**
 * @author Martín Vladimir Alonso Sierra Galvis 
 * @version 1.0.0
 */

import { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import RFeatureCard from '../feature/RFeatureCard';

function RSummaryPanel({ onCloseClicked }) {
  const [description, setDescription] = useState(null);

  const character = useSelector(state => state.story.character);
  const genre = useSelector(state => state.story.genre);
  const plot = useSelector(state => state.story.plot);
  const desire = useSelector(state => state.story.desire);
  const time = useSelector(state => state.story.time);

  const onFeatureSelected = (description) => {
    setDescription(description);
  }

  return <SummaryContainer>
    <CloseButton onClick={onCloseClicked}>
      <CloseImage src='images/close-cross.PNG' alt='close-panel'/>
    </CloseButton>
    <AvatarImage src={character.avatarUrl} alt='avatar'/>
    <CharacterContainer>
      <Subtitle>Personaje</Subtitle>
      <Title>{ character.name }</Title>
    </CharacterContainer>
    <FeaturesContainer>
      <RFeatureCard 
        onSelected={onFeatureSelected}
        code='genre' 
        feature={genre} 
        name='Género'/>
      <RFeatureCard 
        onSelected={onFeatureSelected}
        code='plot' 
        feature={plot} 
        name='Trama'/>
      <RFeatureCard 
        onSelected={onFeatureSelected}
        code='desire' 
        feature={desire} 
        name='Objeto de deseo'/>
      <RFeatureCard 
        onSelected={onFeatureSelected}
        code='time' 
        feature={time} 
        name='Tiempo y Espacio'/>
    </FeaturesContainer>
    { description && <Description>{description}</Description> }
  </SummaryContainer>
}

const AvatarImage = styled.img`
  height: 200px; 
  margin-top: 40px;
  width: 200px;
`;

const CharacterContainer = styled.div`
  align-items: center;
  border-bottom: 2px solid darkgray;
  display: flex;
  flex-direction: column;
  padding-bottom: 15px;
  width: 325px;
`;

const CloseButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  height: 20px;
  position: absolute;
  right: 20px;
  top: 20px;
  min-width: 20px;
`;

const CloseImage = styled.img`
  height: 100%;
  width: 100%;
`;

const Description = styled.p`
  color: gray;
  font-size: 0.8em;
  font-weight: 500px;
  padding: 0px 20px;
  text-align: justify;
  width: 325px;
`;

const FeaturesContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
  width: 325px;
`;

const Subtitle = styled.h3`
  color: gray;
  font-size: 1.2em;
  font-weight: 400;
  margin: 10px 0 0 0;
`;

const SummaryContainer = styled.div`
  align-items: center;
  background-color: white;
  display: flex;
  flex-direction: column;
  min-height: 500px;
  position: relative;
  width: 420px;
`;

const Title = styled.h1`
  font-size: 2em;
  font-weight: 500;
  margin: -5px 0 0 0;
`;

export default RSummaryPanel;