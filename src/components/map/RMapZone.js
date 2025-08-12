/**
 * @author Martín Vladimir Alonso Sierra Galvis 
 * @version 1.0.0
 * 
 * @description 
 * Componente que representa una zona desbloqueable del mapa 
 * correspondiente a la estructura narrativa.
 */

import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { setCurrentStage, setCurrentStageIndex } from '../../redux-store/reducers/storySlice';

import circleMask1 from '../../images/circle-stage1.png';
import circleMask2 from '../../images/circle-stage2.png';
import circleMask3 from '../../images/circle-stage3.png';
import circleMask4 from '../../images/circle-stage4.png';
import circleMask5 from '../../images/circle-stage5.png';
import circleMask6 from '../../images/circle-stage6.png';
import circleMask7 from '../../images/circle-stage7.png';
import circleMask8 from '../../images/circle-stage8.png';
import journeyMask1 from '../../images/journey-stage1.png';
import journeyMask2 from '../../images/journey-stage2.png';
import journeyMask3 from '../../images/journey-stage3.png'; 
import journeyMask4 from '../../images/journey-stage4.png'; 
import journeyMask5 from '../../images/journey-stage5.png';
import journeyMask6 from '../../images/journey-stage6.png';
import journeyMask7 from '../../images/journey-stage7.png';
import journeyMask8 from '../../images/journey-stage8.png';
import journeyMask9 from '../../images/journey-stage9.png';
import journeyMask10 from '../../images/journey-stage10.png';
import journeyMask11 from '../../images/journey-stage11.png';
import journeyMask12 from '../../images/journey-stage12.png';

const masks = { 
  circleStage1: circleMask1, 
  circleStage2: circleMask2, 
  circleStage3: circleMask3, 
  circleStage4: circleMask4, 
  circleStage5: circleMask5, 
  circleStage6: circleMask6, 
  circleStage7: circleMask7, 
  circleStage8: circleMask8,  
  journeyStage1: journeyMask1, 
  journeyStage2: journeyMask2, 
  journeyStage3: journeyMask3, 
  journeyStage4: journeyMask4, 
  journeyStage5: journeyMask5, 
  journeyStage6: journeyMask6, 
  journeyStage7: journeyMask7, 
  journeyStage8: journeyMask8, 
  journeyStage9: journeyMask9, 
  journeyStage10: journeyMask10, 
  journeyStage11: journeyMask11, 
  journeyStage12: journeyMask12, 
};

function RMapZone({ onZoneClicked, enabled, stage, stageIndex }) {
  const dispatch = useDispatch();

  const onZoneButtonClicked = (e) => {
    /** 
     * Obtener información de ubicación y tamaño de ZoneButton
     * con respecto al Viewport.
     */
    const zoneRect = e.target.getBoundingClientRect();     
    onZoneClicked(zoneRect);
    dispatch(setCurrentStage(stage));
    dispatch(setCurrentStageIndex(stageIndex));
  }

  return <ZoneContainer
    height={stage.zone.height} 
    marginLeft={stage.zone.marginLeft} 
    marginTop={stage.zone.marginTop}>
    <ZoneShadow
      src={`images/${enabled ? 'transparency' : 'shadow'}.png`} 
      alt='shadow'
      mask={stage.zone.mask}/>
    <ZoneButton enabled={enabled} onClick={onZoneButtonClicked}/>
  </ZoneContainer>
}

const ZoneButton = styled.button` 
  background-color: transparent;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  height: 90px;
  left: calc(50% - 45px); 
  pointer-events: ${({ enabled }) => enabled ? 'auto' : 'none'};
  position: absolute;
  top: calc(50% - 45px);
  width: 90px;
  z-index: 99;
`;

const ZoneContainer = styled.div`
  background-color: transparent;
  height: ${({ height }) => height};
  margin-left: ${({ marginLeft }) => marginLeft};
  margin-top: ${({ marginTop }) => marginTop};
  padding: 0;
  position: absolute;
  width: fit-content;

  @media (min-width: 1524px) {
    height: calc(${({ height }) => height});
    margin-left: calc(${({ marginLeft }) => marginLeft});
    margin-top: calc(${({ marginTop }) => marginTop});
  }
`;

const ZoneShadow = styled.img`
  background-color: transparent;
  height: 100%;
  mask: url(${({ mask }) => masks[mask]});
  mask-position: center;
  mask-repeat: no-repeat;
  mask-size: contain;
  object-fit: contain;
  position: relative;
  width: fit-content;
`;

export default RMapZone;