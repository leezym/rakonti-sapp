/**
 * @author Martín Vladimir Alonso Sierra Galvis 
 * @version 1.0.0
 */

import styled from 'styled-components';

import BackgroundImage from '../../styled/BackgroundImage';
import RNarrative from './RNarrative';
import narratives from '../../redux-store/data/narratives';

function RNarrativePanel() {
  return <NarrativesContainer>
    <BackgroundImage 
      src='images/narratives-background.jpg' 
      alt='narratives-background'/>
    <ColumnContainer>
      <RNarrative 
        name='journey'
        narrative={narratives.journey}/>
    </ColumnContainer>
    <ColumnContainer right>
      <RNarrative 
        name='circle'
        narrative={narratives.circle} 
        right/>
    </ColumnContainer>
  </NarrativesContainer>
}

const ColumnContainer = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: ${({ right }) => right ? 'flex-start' : 'flex-end'};
  left: ${({ right }) => right ? '50%': '0'};
  position: absolute;
  top: 0;
  width: 50%;
`;

const NarrativesContainer = styled.div`
  height: 100vh;
  width: 100%;
`;

export default RNarrativePanel;