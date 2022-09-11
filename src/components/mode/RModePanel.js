/**
 * @author Martín Vladimir Alonso Sierra Galvis 
 * @version 1.0.0
 */

import styled from 'styled-components';

import BackgroundImage from '../../styled/BackgroundImage';
import RMode from './RMode';
import modes from '../../redux-store/data/modes';

function RModePanel() {
  return <div>
    <BackgroundImage src='images/modes-background.jpg' alt='modes-background'/>
    <RowContainer>
      <RMode mode={modes.classic}/>
    </RowContainer>
    <RowContainer bottom>
      <RMode mode={modes.creative} bottom/>
    </RowContainer>
  </div>
}

const RowContainer = styled.div`
  align-items: center;
  display: flex;
  height: 50vh;
  justify-content: ${({ bottom }) => bottom ? 'flex-end' : 'flex-start'};
  left: 0;
  position: absolute;
  top: ${({ bottom }) => bottom ? '50%': '0'};
  width: 100%;
`;

export default RModePanel;