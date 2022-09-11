/**
 * @author Martín Vladimir Alonso Sierra Galvis 
 * @version 1.0.1
 */

import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { setNarrative } from '../../redux-store/reducers/storySlice';

import BackgroundImage from '../../styled/BackgroundImage';

function RNarrativeInfo({ narrative }) {
  const dispatch = useDispatch();

  const onCloseClicked = () => {
    dispatch(setNarrative(null));
  }

  return <div>
    <NarrativeImage 
      src={narrative.backgroundUrl} 
      alt='narrative-info-background'/>
    <CloseContainer>
      <CloseButton onClick={onCloseClicked}>
        <CloseImage
          src='images/close-icon.png' 
          alt='close-icon'/>
      </CloseButton>
    </CloseContainer>
    <Description color={narrative.color}>
      { narrative.description }
    </Description>
  </div>
}

const CloseButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  margin: 20px 50px 0px 0px;
`;

const CloseContainer = styled.div`
  align-items: center;
  display: flex;
  height: 70px;
  justify-content: flex-end;
  position: absolute;
  top: 0;
  width: 100%;
`;

const CloseImage = styled.img`
  height: 30px;
  width: 30px;
`;

const Description = styled.p`
  color: ${({ color }) => color};
  padding: 0px 15%;
  position: absolute;
  text-align: center;
  top: 40%;
`;

const NarrativeImage = styled(BackgroundImage)`
  object-position: 0 0;
`;

export default RNarrativeInfo;