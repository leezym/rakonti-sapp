/**
 * @author Martín Vladimir Alonso Sierra Galvis 
 * @version 1.0.0
 */

import { useState } from 'react';
import styled from 'styled-components';

import RSummaryPanel from './RSummaryPanel';

function RSummary() {
  const [showSummary, setShowSummary] = useState(false);

  const onShowClicked = () => {
    setShowSummary(!showSummary);
  }

  return <FloatingContainer>
    {
      showSummary ?
      <RSummaryPanel onCloseClicked={onShowClicked}/>
      :
      <Button onClick={onShowClicked}>
        <SummaryImage src='images/summary.png' alt='summary'/>
      </Button>
    }
  </FloatingContainer>
}

const Button = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  height: 135px;
  margin: 11px 0px 0px 25px;
  width: 145px;
`;

const FloatingContainer = styled.div`
  left: 0;
  position: absolute;
  top: 0;
  z-index: 999;
`;

const SummaryImage = styled.img`
  height: 100%;
  width: 100%;
`;

export default RSummary;