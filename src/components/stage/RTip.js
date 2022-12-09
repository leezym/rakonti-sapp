/**
 * @author Martín Vladimir Alonso Sierra Galvis 
 * @version 1.0.0 
 * 
 * @description 
 * Componente que representa un consejo perteneciente a una etapa 
 * particular de la estructura narrativa.
 */

import styled from 'styled-components';

function RTip({ onClicked, tip }) {
  const onTipClicked = () => {
    onClicked({ description: tip.description });
  }

  return <TipButton 
    onClick={onTipClicked}
    height={tip.height}
    left={tip.left}
    top={tip.top}
    rotate={tip.rotate}>
    <TipImage src={tip.iconUrl} alt='tip-image'/>
  </TipButton>
}

const TipButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer; 
  height: ${({ height }) => height};
  left: ${({ left }) => left}; 
  object-fit: contain;
  padding: 0; 
  position: absolute; 
  top: ${({ top }) => top}; 
  transform: rotate(${({ rotate }) => rotate});
  vertical-align: middle;
  width: fit-content;
`;

const TipImage = styled.img`
  height: 100%;
  width: 100%;
`;

export default RTip;