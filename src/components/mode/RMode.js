/**
 * @author Martín Vladimir Alonso Sierra Galvis 
 * @version 1.0.1
 */

import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { setModeInfo } from '../../redux-store/reducers/storySlice';

function RMode({ mode, bottom }) {
  const dispatch = useDispatch();

  const onModeClicked = () => {
    dispatch(setModeInfo(mode));
  }

  return <ModeButton onClick={onModeClicked} bottom={bottom}>
    <ModeImage src={mode.url} alt='mode-image'/>
  </ModeButton>
}

const ModeButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  height: 95%;
  padding: 0;
  margin: ${({ bottom }) => bottom ? '0px 50px 20px 0px' : '20px 0px 0px 50px'};
  max-width: 85%;
`;

const ModeImage = styled.img`
  max-height: 100%;
  max-width: 100%;
`;

export default RMode;