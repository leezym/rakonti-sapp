/**
 * @author Martín Vladimir Alonso Sierra Galvis 
 * @version 1.0.0 
 * 
 * @description 
 * Componente que implementa el contenido del patrón de diseño 
 * de interfaz gráfica Ventana Modal para mostrar la informa-
 * ción general de una etapa de la estructura narrativa.
 */

import styled from 'styled-components';

import RModal from './RModal';

function RModalStage({ onClose, item }) {
  const onCloseClicked = () => {
    onClose(false);
  }

  return <RModal>
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
  padding: 0;
  position: absolute;
  right: -14px;
  top: -14px;
  width: 30px;
`; 

const CloseImage = styled.img`
  height: 100%;
  width: 100%;
`;

const Description = styled.p`
  color: white; 
  margin: 0px 0px 0px 50px;
  text-align: justify;
  width: 50%;
`;

const Title = styled.h1`
  color: white; 
  font-size: 2.5em;
  font-weight: 600;
  margin: 0px 0px 30px 50px;
  width: 50%;
`;

const Window = styled.div`
  background-color: rgba(72, 83, 77, 0.85); 
  display: flex;
  flex-direction: column;
  height: 82vh;
  justify-content: center;
  position: relative;
  width: 85%;
`;

export default RModalStage;