/**
 * @author Martín Vladimir Alonso Sierra Galvis 
 * @version 1.0.1
 * 
 * @description 
 * 
 */

import { useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import BackgroundImage from '../styled/BackgroundImage';
import RModalStage from '../components/other/RModalStage';
import RTip from '../components/stage/RTip';

function RStageView() {
  const [showStageInfo, setShowStageInfo] = useState(false);
  const currentStage = useSelector(state => state.story.currentStage); 

  const onStageInfoClicked = (show = true) => {
    setShowStageInfo(show);
  }

  return <div>
    <BackgroundImage 
      src={currentStage.backgroundUrl} 
      alt='stage-background'/>
    <TitleButton 
      onClick={onStageInfoClicked}
      left={currentStage.title.left}
      top={currentStage.title.top}
      width={currentStage.title.width}>
      <Title 
        color={currentStage.title.color}
        size={currentStage.title.size}>
        { currentStage.name }
      </Title>
    </TitleButton>
    {
      currentStage.tips.map(tip => (
        <RTip key={tip.id} tip={tip}/> 
      ))
    }

    { showStageInfo && <RModalStage 
        onClose={onStageInfoClicked} 
        item={currentStage}/> }
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