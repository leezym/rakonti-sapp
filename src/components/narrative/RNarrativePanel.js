/**
 * @author Martín Vladimir Alonso Sierra Galvis 
 * @version 1.0.0
 */

import styled from 'styled-components';

import BackgroundImage from '../../styled/BackgroundImage';
import RNarrative from './RNarrative';
import narratives from '../../redux-store/data/narratives';

function RNarrativePanel() {
  return <div>
    <BackgroundImage 
      src='images/narratives-background.jpg' 
      alt='narratives-background'/>
    <ColumnContainer>
      <RNarrative narrative={narratives.journey}/>
    </ColumnContainer>
    <ColumnContainer right>
      <RNarrative narrative={narratives.circle} right/>
    </ColumnContainer>
  </div>
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

export default RNarrativePanel;