/**
 * @author Martín Vladimir Alonso Sierra Galvis 
 * @version 1.0.0
 * 
 * @description 
 * Componente encargado de contener todas las áreas del mapa 
 * correspondiente a la estructura narrativa.
 */

import { useState } from 'react';
import styled from 'styled-components';

import RCharacterFigure from './RCharacterFigure';
import RMapZone from './RMapZone';

function RMapZones({ stages }) {
  const [figurePos, setFigurePos] = useState({ left: '6%', top: '58%' });

  const onZoneClicked = (zoneRect) => {
    /**
     * Cuando se clica una zona se debe mover la figura del
     * personaje a la zona seleccionada. Para ello debe cal
     * cularse la nueva posición de la figura.
     */
    const { left, top } = calculateFigurePos(zoneRect);
    setFigurePos({ left, top });
  }

  const calculateFigurePos  = (zoneRect) => {
    /** Obtener información de posición y tamaño del contenedor ZonesContainer */
    const containerRect = document.getElementById('zones-container').getBoundingClientRect();
    
    /** Calcular la posición relativa de zoneRect */
    const zoneLeft = zoneRect.left - containerRect.left;
    const zoneTop = zoneRect.top - containerRect.top;
 
    /** Calcular la nueva posición de la figura */
    let figureLeft = zoneLeft + (zoneRect.width / 2);
    let figureTop = zoneTop + (zoneRect.height / 2);
 
    /** Pasar la posición a porcentajes */
    figureLeft = ((figureLeft * 100) / containerRect.width) - 2.5;
    figureTop = ((figureTop * 100) / containerRect.height) - 7;
    
    return { left: `${figureLeft}%`, top: `${figureTop}%` };
  }

  return <ZonesContainer id='zones-container'>
    <RMapZone 
      onZoneClicked={onZoneClicked}
      stage={stages[0]}/>
    <RCharacterFigure position={figurePos}/>
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