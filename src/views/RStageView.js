/**
 * @author Martín Vladimir Alonso Sierra Galvis 
 * @version 1.0.1
 * 
 * @description 
 * Componente que representa la vista de la etapa actual 
 * en la estructura narrativa seleccionada.
 */

import { useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import BackgroundImage from '../styled/BackgroundImage';
import RModalStage from '../components/other/RModalStage';
import RModalTip from '../components/other/RModalTip';
import RTip from '../components/stage/RTip';

function RStageView() {
  const [tipSelected, setTipSelected] = useState(null);
  const [showStageInfo, setShowStageInfo] = useState(false);
  const { 
    backgroundUrl, 
    description, 
    name, 
    title, 
    tips 
  } = useSelector(state => state.story.currentStage); 

  const onStageInfoClicked = (show = true) => {
    setShowStageInfo(show);
  }

  const onTipClicked = (tip) => {
    if (tip !== null) {
      tip.name = name;
    }

    setTipSelected(tip);
  }

  return <div>
    <BackgroundImage src={backgroundUrl} alt='stage-background'/>
    <TitleButton 
      onClick={onStageInfoClicked}
      left={title.left}
      top={title.top}
      width={title.width}>
      <Title color={title.color} size={title.size}>
        { name }
      </Title>
    </TitleButton>
    {
      tips.map(tip => (
        <RTip 
          onClicked={onTipClicked} 
          key={tip.id} 
          tip={tip}/> 
      ))
    }

    { showStageInfo && <RModalStage 
        onClose={onStageInfoClicked} 
        item={{ name, description }}/> }
    
    { tipSelected && <RModalTip
        onClose={onTipClicked}
        item={tipSelected}/> }
  </div>
}

const Title = styled.h1` 
  color: ${({ color }) => color}; 
  font-size: ${({ size }) => size}; 
  font-weight: 450; 
  height: 100%;
  margin: 0;
  text-align: center; 
  width: 100%; 

  @media (min-width: 1524px) {
    font-size: ${({ size }) => `calc(${size} + 1.2em)`};
  }
`;

const TitleButton = styled.button`
  background-color: transparent; 
  border: none; 
  cursor: pointer; 
  left: ${({ left }) => left}; 
  padding: 0; 
  position: absolute; 
  top: ${({ top }) => top}; 
  width: ${({ width }) => width}; 
`;

export default RStageView;