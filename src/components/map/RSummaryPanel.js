/**
 * @author Martín Vladimir Alonso Sierra Galvis 
 * @version 1.0.0
 */

import styled from 'styled-components';

function RSummaryPanel({ onCloseClicked }) {
  return <SummaryContainer>
    <CloseButton onClick={onCloseClicked}>
      Cerrar
    </CloseButton>
  </SummaryContainer>
}

const CloseButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  height: 20px;
  position: absolute;
  right: 20px;
  top: 20px;
  min-width: 20px;
`;

const SummaryContainer = styled.div`
  background-color: white;
  height: 500px;
  position: relative;
  width: 400px;
`;

export default RSummaryPanel;