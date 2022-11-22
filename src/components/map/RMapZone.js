/**
 * @author Martín Vladimir Alonso Sierra Galvis 
 * @version 1.0.0
 * 
 * @description 
 * Componente que representa una zona desbloqueable del mapa 
 * correspondiente a la estructura narrativa.
 */

import styled from 'styled-components';
import journeyMask1 from '../../images/journey-stage1.png';

const masks = {
  journeyStage1: journeyMask1,
};

function RMapZone({ onZoneClicked, stage: { zone } }) {

  const onZoneButtonClicked = (e) => {
    /** 
     * Obtener información de ubicación y tamaño de ZoneButton
     * con respecto al Viewport.
     */
    const zoneRect = e.target.getBoundingClientRect();     
    onZoneClicked(zoneRect);
  }

  return <ZoneButton onClick={onZoneButtonClicked}
    height={zone.height}
    marginLeft={zone.marginLeft}
    marginTop={zone.marginTop}>
    <ZoneShadow 
      src='images/shadow.png' 
      alt='shadow'
      mask={zone.mask}/>
  </ZoneButton>
}

const ZoneButton = styled.button` 
  background-color: transparent;
  border: none;
  cursor: pointer;
  height: ${({ height }) => height};
  margin-left: ${({ marginLeft }) => marginLeft};
  margin-top: ${({ marginTop }) => marginTop};
  width: fit-content;

  @media (min-width: 1524px) {
    height: calc(${({ height }) => height} + 1.8%);
    margin-left: calc(${({ marginLeft }) => marginLeft} + 0.7%);
    margin-top: calc(${({ marginTop }) => marginTop} - 2%);
  }
`;

const ZoneShadow = styled.img`
  height: 100%;
  mask: url(${({ mask }) => masks[mask]});
  mask-position: center;
  mask-repeat: no-repeat;
  mask-size: contain;
  object-fit: contain;
  width: auto;
`;

export default RMapZone;