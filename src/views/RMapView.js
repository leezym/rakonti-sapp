/**
 * @author Martín Vladimir Alonso Sierra Galvis 
 * @version 1.0.0
 */

import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setBackIcon, setEditingMode } from '../redux-store/reducers/uiSlice';

import RMapZones from '../components/map/RMapZones';
import RModalExporter from '../components/other/RModalExporter';
import RPagination from '../components/other/RPagination';
import RSummary from '../components/map/RSummary';

function RMapView() {
  const [showExport, setShowExport] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const narrative = useSelector(state => state.story.narrative);
  const currentStage = useSelector(state => state.story.currentStage);
  const currentStageIndex = useSelector(state => state.story.currentStageIndex);
  const text = useSelector(state => state.story.text);
  const editingMode = useSelector(state => state.ui.editingMode);

  useEffect(() => {
    console.log(editingMode);
    setShowExport(!editingMode && text.length === narrative.stages.length);
  }, [editingMode, text.length, narrative.stages.length]);

  useEffect(() => {
    dispatch(setBackIcon('back-icon-dark.png'));
  });

  const onContinueClicked = () => {
    if (currentStage != null) {
      navigate('/stage');
    }
  }

  const onCloseExport = () => {
    setShowExport(false);
    if (!editingMode) {
      dispatch(setEditingMode(true));
    }
  }

  const onFinishClicked = () => {
    setShowExport(true);
  }

  return <MapContainer>
    <MapImageContainer>
      <MapImage src={narrative.mapUrl} alt='map'/>
      <RMapZones stages={narrative.stages}/>
    </MapImageContainer>
    <Title>
      <Narrative>{narrative.title}</Narrative>
      <Author>{narrative.author}</Author>
    </Title>
    <RSummary/>
    <Pagination>
      <RPagination 
        items={narrative.stages} 
        label={true} 
        stage={currentStageIndex}
        vertical={true}/>
    </Pagination>
    <ButtonContainer>
      <ContinueButton onClick={onContinueClicked}>
        <ContinueImage 
          src={`images/continue${currentStage ? '' : '-block'}.png`} 
          alt='continue-button'/>
      </ContinueButton>
      { text.length === narrative.stages.length && 
        <FinishButton onClick={onFinishClicked}>
          &#10003;
        </FinishButton> }
    </ButtonContainer>
    { showExport && <RModalExporter onClose={onCloseExport}/> }
  </MapContainer>
}

const Author = styled.h1`
  font-size: 1.5em;
  font-style: italic;
  font-weight: 400;
  margin: 0 0 0 10px;
`;

const ButtonContainer = styled.div`
  bottom: 4%;
  height: 100px;
  position: absolute;
  right: 4.5%;
  width: 100px;
`;

const ContinueButton = styled.button`
  background-color: transparent;
  border: none; 
  cursor: pointer; 
  height: 100px;
  padding: 0;
  position: absolute;
  width: 100px;
`;

const ContinueImage = styled.img`
  height: 100%;
  width: 100%;
`;

const FinishButton = styled.button`
  background-color: #4EA487;
  border: none;
  border-radius: 50%;
  bottom: 0;
  color: white;
  cursor: pointer;
  font-size: x-large;
  height: 40px;
  padding: 0;
  position: absolute;
  right: -20px;
  width: 40px;
`;

const MapContainer = styled.div`
  align-items: center;
  display: flex;
  height: 100vh;
  justify-content: center;
  width: 100%;
`;

const MapImage = styled.img`
  height: 100%;
  object-fit: contain;
  width: 100%;
`;

const MapImageContainer = styled.div`
  align-items: center; 
  display: flex;
  height: 85vh;
  justify-content: center;
  margin-right: 70px;
  position: relative;
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