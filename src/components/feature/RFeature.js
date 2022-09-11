/**
 * @author Martín Vladimir Alonso Sierra Galvis 
 * @version 1.0.1
 */

import styled from 'styled-components';

function RFeature({ feature }) {
  return <FeatureButton>
    { feature.name }
    <CheckIcon 
      src='images/check-icon.png'
      alt='check-icon'/>
  </FeatureButton>
}

const CheckIcon = styled.img`
  height: 24px;
  left: 10px;
  position: absolute;
  top: calc(50% - 12px);
  width: 24px;
`;

const FeatureButton = styled.button`
  background-color: transparent;
  border: none;
  border-bottom: 1px solid white;
  color: white;
  cursor: pointer;
  font-size: x-large;
  font-weight: 600;
  height: 70px;
  margin-bottom: 10px;
  position: relative;
  text-align: end;
  padding: 0px;
  width: 85%;
`;

export default RFeature;