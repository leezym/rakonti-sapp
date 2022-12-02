/**
 * @author Martín Vladimir Alonso Sierra Galvis 
 * @version 1.0.1
 * 
 * @description 
 * 
 */

import styled from 'styled-components';
import { useSelector } from 'react-redux';

import BackgroundImage from '../styled/BackgroundImage';
import RTip from '../components/stage/RTip';

function RStageView() {
  const currentStage = useSelector(state => state.story.currentStage);

  return <div>
    <BackgroundImage 
      src={currentStage.backgroundUrl} 
      alt='stage-background'/>
    <TitleButton
      left={currentStage.title.left}
      top={currentStage.title.top}
      width={currentStage.title.width}>
      <Title color={currentStage.title.color}>
        { currentStage.name }
      </Title>
    </TitleButton>
    {
      currentStage.tips.map(tip => (
        <RTip key={tip.id} tip={tip}/> 
      ))
    }
  </div>
}

const Title = styled.h1` 
  color: ${({ color }) => color}; 
  font-size: 2.8em; 
  font-weight: 450; 
  height: 100%;
  margin: 0;
  text-align: center; 
  width: 100%; 

  @media (min-width: 1524px) {
    font-size: 4em;
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