/**
 * @author Martín Vladimir Alonso Sierra Galvis 
 * @version 1.0.0
 */

import { useSelector } from 'react-redux';
import styled from 'styled-components';

import RSummary from '../components/map/RSummary';

function RMapView() {
  const narrative = useSelector(state => state.story.narrative);

  return <MapContainer>
    <MapImage src={narrative.mapUrl} alt='map'/>
    <Title>
      <Narrative>{narrative.title}</Narrative>
      <Author>{narrative.author}</Author>
    </Title>
    <RSummary/>
  </MapContainer>
}

const Author = styled.h1`
  font-size: 1.5em;
  font-style: italic;
  font-weight: 400;
  margin: 0 0 0 10px;
`;

const MapContainer = styled.div`
  align-items: center;
  display: flex;
  height: 100vh;
  justify-content: center;
  width: 100%;
`;

const MapImage = styled.img`
  height: 85vh;
  margin-right: 70px;
  width: 62%;
`;

const Narrative = styled.h1`
  font-size: 1.5em;
  margin: 0;
`;

const Title = styled.div`
  align-items: flex-end;
  display: flex;
  position: absolute;
  top: 11px;
`;

export default RMapView;