/**
 * @author Martín Vladimir Alonso Sierra Galvis 
 * @version 1.0.0
 * 
 * @description 
 * Componente encargado de contener todas las áreas del mapa 
 * correspondiente a la estructura narrativa.
 */

import styled from 'styled-components';

import RMapZone from './RMapZone';

function RMapZones({ stages }) {
  return <ZonesContainer>
    <RMapZone stage={stages[0]}/>
  </ZonesContainer>
}

const ZonesContainer = styled.div`
  height: 62vh;
  margin-bottom: 6%;
  margin-right: 70px;
  position: absolute;
  width: 62%;
`;

export default RMapZones;