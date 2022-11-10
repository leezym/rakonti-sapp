/**
 * @author Martín Vladimir Alonso Sierra Galvis 
 * @version 1.0.1
 */

import { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { setNarrativeInfo } from '../../redux-store/reducers/storySlice';
import { setBackIcon, setMenuIcon } from '../../redux-store/reducers/uiSlice';

function RNarrativeInfo({ narrative }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setBackIcon(null));
    /** Dependiendo de la narrativa se configura el ícono del menú. */
    const iconColor = narrative.id === 2 ? '-dark' : '';
    dispatch(setMenuIcon(`menu-icon${iconColor}.png`));
  });

  const onCloseClicked = () => {
    dispatch(setNarrativeInfo(null));
  }

  return <NarrativeContainer>
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
  </NarrativeContainer>
}

const CloseButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
`;

const CloseContainer = styled.div`
  align-items: center;
  display: flex;
  height: 60px;
  justify-content: center;
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
  text-align: justify;
  top: 33%;
`;

const NarrativeContainer = styled.div`
  height: 100vh;
  overflow-y: auto;
  width: 100%;

  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const NarrativeImage = styled.img`
  min-height: 100vh;
  object-position: 0 0;
  vertical-align: middle;
  width: 100%;
`;

export default RNarrativeInfo;