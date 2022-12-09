/**
 * @author Martín Vladimir Alonso Sierra Galvis
 * @version 1.0.0
 */

import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import BackgroundImage from '../../styled/BackgroundImage';
import REditorCell from './REditorCell';
import RPagination from '../other/RPagination';

function REditor({ onClose }) {
  const currentStageIndex = useSelector(state => state.story.currentStageIndex);
  const narrative = useSelector(state => state.story.narrative);
  const text = useSelector(state => state.story.text);
  const navigate = useNavigate();

  const onChevronClicked = () => {
    onClose();
  }

  const onTextSaved = () => {
    if (text.length === narrative.stages.length) {
      navigate('/');
    }
    else {
      navigate(-1);
    }
  }

  return <EditorContainer>
    <EditorBackground 
      src='images/editor-background.png' 
      alt='editor-background'/>
    <InnerContainer>
      <ChevronButton onClick={onChevronClicked}>
        <ChevronImage src='images/up-chevron2.png' alt='chevron'/>
      </ChevronButton>
      <ScrollableContainer>
        <Pagination>
          <RPagination
            items={narrative.stages}
            label={false}
            stage={currentStageIndex}
            vertical={false}/>
        </Pagination>
        {
          text.map((subtext, i) => (
            <REditorCell 
              key={i}
              onSaved={onTextSaved}
              index={i + 1} 
              isEditing={currentStageIndex === i} 
              text={subtext}/>
          ))
        }
        { text.length < narrative.stages.length && <REditorCell 
            onSaved={onTextSaved} 
            index={text.length + 1}
            isEditing={currentStageIndex === text.length}/> }
      </ScrollableContainer>
    </InnerContainer>
  </EditorContainer>
}

const ChevronButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  height: 20px;
  left: calc(50% - 15px);
  position: absolute;
  top: 20px;
  transform: rotate(180deg);
  width: 40px;
  z-index: 1;
`;

const ChevronImage = styled.img`
  height: 100%;
  width: 100%;
`;

const EditorBackground = styled(BackgroundImage)`
  object-fit: contain;
  width: fit-content;
`;

const EditorContainer = styled.div`
  background-color: white;
  height: 100vh;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 1000;
`;

const InnerContainer = styled.div`
  height: 100vh;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
`;

const Pagination = styled.div`
  margin-left: 5px;
  margin-top: 30px;
  width: calc(100% - 5px);
`;

const ScrollableContainer = styled.div`
  height: calc(100vh - 50px);
  overflow-y: auto;
  padding-top: 50px;
  position: relative;
  width: 100%;

  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export default REditor;