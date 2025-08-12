/**
 * @author Martín Vladimir Alonso Sierra Galvis 
 * @version 1.0.0
 * 
 * @description 
 * Componente encargado de contener todas las áreas del mapa 
 * correspondiente a la estructura narrativa.
 */

import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { setFigurePos } from '../../redux-store/reducers/uiSlice';

import RCharacterFigure from './RCharacterFigure';
import RMapZone from './RMapZone';

function RMapZones({ stages }) {
  const dispatch = useDispatch();
  const figurePos = useSelector(state => state.ui.figurePos);
  const text = useSelector(state => state.story.text);

  const onZoneClicked = (zoneRect) => {
    /**
     * Cuando se clica una zona se debe mover la figura del
     * personaje a la zona seleccionada. Para ello debe cal
     * cularse la nueva posición de la figura.
     */
    const { left, top } = calculateFigurePos(zoneRect);
    dispatch(setFigurePos({ left, top }));
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
    {
      stages.map((stage, i) => (
        <RMapZone
          key={stage.id}
          onZoneClicked={onZoneClicked} 
          enabled={i <= text.length}
          stage={stage}
          stageIndex={i}/>
      ))
    }
    <RCharacterFigure position={figurePos}/>
  </ZonesContainer>
}

const ZonesContainer = styled.div`
  height: 85vh;
  position: absolute;
  top: 0;
  width: 85vh;
`;

export default RMapZones;