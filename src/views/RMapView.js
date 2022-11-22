/**
 * @author Martín Vladimir Alonso Sierra Galvis 
 * @version 1.0.0
 */

import { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { setBackIcon } from '../redux-store/reducers/uiSlice';

import RMapZones from '../components/map/RMapZones';
import RPagination from '../components/other/RPagination';
import RSummary from '../components/map/RSummary';

function RMapView() {
  const dispatch = useDispatch();
  const narrative = useSelector(state => state.story.narrative);

  useEffect(() => {
    dispatch(setBackIcon('back-icon-dark.png'));
  });

  return <MapContainer>
    <MapImage src={narrative.mapUrl} alt='map'/>
    <Title>
      <Narrative>{narrative.title}</Narrative>
      <Author>{narrative.author}</Author>
    </Title>
    <RSummary/>
    <Pagination>
      <RPagination 
        items={narrative.stages} 
        label={true} 
        stage={0}
        vertical={true}/>
    </Pagination>
    <RMapZones stages={narrative.stages}/>

    <ContinueButton>
      <ContinueImage 
        src={`images/continue-block.png`} 
        alt='continue-button'/>
    </ContinueButton>
  </MapContainer>
}

const Author = styled.h1`
  font-size: 1.5em;
  font-style: italic;
  font-weight: 400;
  margin: 0 0 0 10px;
`;

const ContinueButton = styled.button`
  background-color: transparent;
  border: none; 
  bottom: 4%;
  cursor: pointer; 
  position: absolute;
  right: 4.5%;
`;

const ContinueImage = styled.img`
  height: 100px;
  width: 100px;
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

const Pagination = styled.div`
  height: calc(100vh - 95px);
  position: absolute; 
  right: 26px;
  top: 0;
`;

const Title = styled.div`
  align-items: flex-end;
  display: flex;
  position: absolute;
  top: 11px;
`;

export default RMapView;