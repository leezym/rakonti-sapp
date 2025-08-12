/**
 * @author Martín Vladimir Alonso Sierra Galvis 
 * @version 1.0.1
 * 
 * @description 
 * Componente que representa el patrón de diseño de interfaz 
 * gráfica de usuario Ventana Modal.
 */

import styled from 'styled-components';

function RModal({ children }) {
  return <ModalContainer>
    { children }
  </ModalContainer>
} 

const ModalContainer = styled.div` 
  align-items: center;
  background-color: transparent; 
  display: flex;
  height: 100vh;
  justify-content: center;
  position: absolute;
  left: 0;
  top: 0; 
  width: 100%;
  z-index: 1000;
`;

export default RModal;