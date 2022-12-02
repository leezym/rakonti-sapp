/**
 * @author Martín Vladimir Alonso Sierra Galvis
 * @version 1.0.0 
 * 
 * @description 
 * Componente que implementa el patrón de diseño de interfaz de 
 * usuario Ventana Modal para mostrar determinado consejo para 
 * la etapa seleccionada.
 */

import styled from 'styled-components';

import RModal from './RModal';

function RModalTip({ onClose, item }) {
  const onCloseClicked = () => {
    onClose(null);
  }

  return <RModal>
    <WindowBackground src='images/tip-modal.png' alt='background'/>
    <Window>      
      <CloseButton onClick={onCloseClicked}>
        <CloseImage src='images/close-icon.png' alt='close-image'/>
      </CloseButton>
      <Title>
        { item.name }
      </Title>
      <Description>
        { item.description }
      </Description>
    </Window>
  </RModal>
}

const CloseButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  height: 30px;
  left: calc(50% - 14px);
  padding: 0;
  position: absolute;
  top: -8px;
  width: 30px;
`;

const CloseImage = styled.img`
  height: 100%;
  width: 100%;
`;

const Description = styled.p`
  color: white;
  margin: 0px 0px 30px 0px;
  text-align: justify;
  width: 80%;
`; 

const Title = styled.h1`
  border-bottom: 1px solid white;
  color: white;
  font-size: 1.8em;
  font-weight: 400;
  margin: 0px 0px 55px 0px; 
  padding-bottom: 20px;
  text-align: center;
  width: 85%;
`; 

const Window = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 530px;
  justify-content: center;
  position: absolute;
  width: 410px;
`;

const WindowBackground = styled.img`
  height: 530px;
  width: 410px;
`;

export default RModalTip;