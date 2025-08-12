/**
 * @author Martín Vladimir Alonso Sierra Galvis 
 * @version 1.0.0
 * 
 * @description
 * Este componente representa la figura del personaje que se mo-
 * verá por las diferentes zonas que tiene mapa de la estructura 
 * narrativa.
 */

import styled from 'styled-components';

function RCharacterFigure({ position: { left, top }}) {
  return <FigureContainer 
    left={left}
    top={top}>
    <FigureImage 
      src='images/mini-character.png' 
      alt='character-figure'/>
  </FigureContainer>
}

const FigureContainer = styled.div`
  height: 10%;
  left: ${({ left }) => left};
  position: absolute;
  top: ${({ top }) => top};
`;

const FigureImage = styled.img`
  height: 100%;
  object-fit: contain;
  width: auto;
`;

export default RCharacterFigure;