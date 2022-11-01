/**
 * @author Martín Vladimir Alonso Sierra Galvis 
 * @version 1.0.1
 */

import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { setFeature } from '../../redux-store/reducers/storySlice';

function RFeature({ feature }) {
  /** Obtener el item seleccionado para la característica asociada */
  const item = useSelector(state => state.story[feature.code]);
  const dispatch = useDispatch();

  const onFeatureClicked = () => {
    dispatch(setFeature(feature));
  }

  return <FeatureButton onClick={onFeatureClicked}>
    { feature.name }
    {item && <CheckIcon 
      src='images/check-icon.png'
      alt='check-icon'/>}
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
  border-bottom: 1px solid #484F64;
  color: #484F64;
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