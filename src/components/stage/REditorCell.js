/**
 * @author Martín Vladimir Alonso Sierra Galvis
 * @version 1.0.0
 */

import { useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { addText } from '../../redux-store/reducers/storySlice';

import REditorAudio from './REditorAudio';

function REditorCell({ onSaved, index, isEditing, text }) {
  const [newText, setNewText] = useState(text ? text : '');
  const [showAudioRecorder, setShowAudioRecorder] = useState(false);
  const dispatch = useDispatch();

  const onTextChange = (e) => {
    setNewText(e.target.value);
  }

  const onRecordClicked = () => {
    setShowAudioRecorder(true);
  }

  const onCloseRecorder = () => {
    setShowAudioRecorder(false);
  }

  const onSaveClicked = (e) => {
    e.preventDefault();
    if (newText !== '') {
      dispatch(addText({ index: index - 1, newText }));
      onSaved();
    }
  }

  return <CellContainer>
    <NumberImage src={`images/E${index}.png`} alt='number'/>
    <ScriptContainer>
      {
        isEditing ?
        <TextAreaForm>
          <TextArea 
            onChange={onTextChange}
            cols='40' 
            rows='10' 
            placeholder='Ingresa tu historia aquí'
            value={newText}/>
          <SaveButton onClick={onSaveClicked}>
            Guardar
          </SaveButton>
        </TextAreaForm>
        :
        <Paragraph>{ 
          text ? 
          text 
          : 
          'Aún no has escrito nada para esta etapa. Si deseas adicionar texto ' + 
          'ingresa a la etapa correspondiente.' }
        </Paragraph>
      }
      { isEditing && <RecordButton onClick={onRecordClicked}>
          <RecordImage src='images/record-button.png' alt='record-button'/>
        </RecordButton> }
      { showAudioRecorder && <REditorAudio onClose={onCloseRecorder}/> }
    </ScriptContainer>
  </CellContainer>
}

const CellContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 10px 0px 15px 15px;
  position: relative;
  width: calc(100% - 15px);
`;

const NumberImage = styled.img`
  height: 170px;
  width: 170px;
`;

const Paragraph = styled.p`
  color: darkgray;
  font-size: x-large;
  margin-left: 35px;
  text-align: justify;
  width: 680px;
`;

const RecordButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  height: 90px;
  margin-bottom: 80px;
  margin-left: 30px;
  width: 95px;
`;

const RecordImage = styled.img`
  height: 100%;
  width: 100%;
`;

const SaveButton = styled.button`
  background-color: #505E79;
  border-radius: 40px;
  color: white;
  cursor: pointer;
  border: none;
  font-size: large;
  margin-top: 15px;
  padding: 15px 30px;
  width: 170px;
`;

const ScriptContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
`;

const TextArea = styled.textarea`
  border: none;
  border-bottom: 1px solid darkgray;
  font-size: xx-large;
  margin-top: -5px;
  outline: none;
  resize: none;
`;

const TextAreaForm = styled.form`
  align-items: flex-end;
  display: flex;
  flex-direction: column;
  margin-left: 155px;
`;

export default REditorCell;