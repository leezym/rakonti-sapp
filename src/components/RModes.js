/**
 * @author Martín Vladimir Alonso Sierra Galvis
 * @version 1.0.0
 */

import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { setMode } from '../redux-store/reducers/storySlice';

import BackgroundImage from '../styled/BackgroundImage';
import modes from '../redux-store/data/modes';

function RModes() {
  const dispatch = useDispatch();

  const onModeClicked = (e) => {
    dispatch(setMode(modes[e.target.name]));
  }

  return <ModesContainer>
    <BackgroundImage src='images/modes-background.jpg' alt='modes-background'/>
    <ButtonContainer>
      <ModeButton onClick={onModeClicked}>
        <ButtonImage 
          name='classic'
          src={modes.classic.url} 
          alt='classic-button'/>
      </ModeButton>
    </ButtonContainer>
    <ButtonContainer bottom>
      <ModeButton onClick={onModeClicked} bottom>
        <ButtonImage 
          name='creative'
          src={modes.creative.url} 
          alt='creative-button'/>
      </ModeButton>
    </ButtonContainer>
  </ModesContainer>
}

const ButtonContainer = styled.div`
  align-items: center;
  display: flex;
  height: 50vh;
  justify-content: ${({ bottom }) => bottom ? 'flex-end' : 'flex-start'};
  left: 0;
  position: absolute;
  top: ${({ bottom }) => bottom ? '50%': '0'};
  width: 100%;
`;

const ButtonImage = styled.img`
  max-height: 100%;
  max-width: 100%;
  object-fit: cover;
`;

const ModeButton = styled.button`
  background-color: transparent;
  cursor: pointer;
  height: 95%;
  padding: 0;
  margin: ${({ bottom }) => bottom ? '0px 50px 20px 0px' : '20px 0px 0px 50px'};
  max-width: 85%;
`;

const ModesContainer = styled.div`
  height: 100vh;
  position: relative;
  width: 100%;
`;

export default RModes;