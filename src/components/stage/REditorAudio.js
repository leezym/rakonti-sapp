/**
 * @author Martín Vladimir Alonso Sierra Galvis 
 * @version 1.0.0
 */

import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addAudio } from '../../redux-store/reducers/storySlice';
import { audioBlobToBase64 } from '../../utils';

import RAudioCard from './RAudioCard';

function REditorAudio({ onClose }) {
  const [recorder, setRecorder] = useState(null);
  const audios = useSelector(state => state.story.audios);
  const dispatch = useDispatch();

  useEffect(() => {
    /** Verificar que el navegador soporte Media API */
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      let chunks = [];
      navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
        /** Se crea el objeto MediaRecorder */
        let mediaRecorder = new MediaRecorder(stream);

        /** Cuando los datos están disponibles se añaden los chunks */
        mediaRecorder.ondataavailable = e => {
          chunks.push(e.data);
        }

        /** Cuando MediRecorder para, se crea el blob del audio */
        mediaRecorder.onstop = e => {
          const blob = new Blob(chunks, { type: 'audio/webm' });
          /** Se transforma el blob a base64 para poderlo almacenar en Redux */
          audioBlobToBase64(blob, (base64) => {
            dispatch(addAudio(base64));
          });
          chunks = [];
        }

        setRecorder(mediaRecorder);
      });
    }
  }, [dispatch]);

  const onCloseClicked = () => {
    onClose();
  }

  const onPauseClicked = () => {
    recorder.pause();
  }

  const onRecordClicked = () => {
    recorder.start();
  }

  const onStopClicked = () => {
    recorder.stop();
  }

  return <AudioContainer>
    <Button onClick={onCloseClicked} top={true}>
      <ButtonImage src='images/close-icon.png' alt='close-btn'/>
    </Button>
    <RecorderContainer>
      <MusicImage src='images/music-wave.png' alt='music-wave'/>
      <ButtonContainer>
        <Button onClick={onPauseClicked}>
          <ButtonImage src='images/pause-record.png' alt='pause'/>
        </Button>
        <Button onClick={onRecordClicked}>
          <ButtonImage src='images/play-record.png' alt='play'/>
        </Button>
        <Button onClick={onStopClicked}>
          <ButtonImage src='images/stop-record.png' alt='stop'/>
        </Button>
      </ButtonContainer>
    </RecorderContainer>
    <ScrollerContainer>
      {
        audios.length > 0 ?
        audios.map((audio64, i) => (
          <RAudioCard key={i} audioURL={audio64} index={i}/>
        ))
        :
        <Message>
          Aún no has grabado ningún audio.
        </Message>
      }
    </ScrollerContainer>
  </AudioContainer>
}

const AudioContainer = styled.div`
  background-color: white;
  border: 1px solid darkgray;
  border-radius: 10px;
  bottom: 80px;
  height: 415px;
  position: absolute;
  right: 4%;
  width: 350px;

  @media (min-width: 1524px) {
    right: 20.5%;
  }
`;

const Button = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  height: 20px;
  margin-left: ${({ top }) => top ? 'calc(100% - 25px)' : 0};
  margin-top: ${({ top }) => top ? '5px' : 0};
  padding: 0;
  width: 20px;
`;

const ButtonImage = styled.img`
  height: 100%;
  width: 100%;
`;

const ButtonContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  width: 30%;
`;

const Message = styled.p`
  color: gray;
  padding: 0;
  margin: 0;
  text-align: center;
  width: 100%;
`;

const MusicImage = styled.img`
  height: 80px;
  width: 160px;
`;

const RecorderContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
`;

const ScrollerContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 220px;
  justify-content: flex-start;
  margin-top: 30px;
  overflow-y: auto;
  width: 100%;

  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export default REditorAudio;