/**
 * @author Martín Vladimir Alonso Sierra Galvis 
 * @version 1.0.0
 * 
 * @description 
 * 
 */

import styled from 'styled-components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { saveAs } from 'file-saver';
import JSZip from 'jszip';
import { base64ToAudioBlob } from '../../utils';

import RModal from './RModal';

const TIMEOUT = 3000;

function RModalExporter({ onClose }) {
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();
  const audios = useSelector(state => state.story.audios);
  const text = useSelector(state => state.story.text);

  const onCloseExporter = () => {
    onClose();
  }

  const onExportAudiosClicked = () => {
    if (message === null) {
      if (audios.length > 0) {
        setMessage('Exportando tus audios...');
        const zip = new JSZip();
        const audioZip = zip.folder('audios');

        audios.forEach((audio64, i)  => {
          const chunks = base64ToAudioBlob(audio64);
          const audioName = `grabación_${i + 1}.wav`;
          const blob = new Blob([ chunks ], { type: 'audio' });
          const file = new File([ blob ], audioName, { type: 'audio/wav' });
          audioZip.file(audioName, file);
        });

        zip.generateAsync({ type: 'blob' }).then(content => {
          saveAs(content, 'audios');
          showMessage('¡Tus audios se han exportado exitosamente!');
        });
      }
      else {
        showMessage('Aún no has grabado ningún audio.');
      }
    }
  }

  const onExportTextClicked = () => {
    if (message === null) {
      if (text.length > 0) {
        let storyText = '';
        text.forEach(subtext => {
          storyText += subtext + '\n\n';
        });

        const blob = new Blob([ storyText ], { type: 'text/plain;charset=utf-8' });
        saveAs(blob, 'historia.txt');
        showMessage('¡Tu historia se ha exportado exitosamente!');
      }
      else {
        showMessage('Aún no has escrito ningún texto.');
      }
    }
  }

  const onGoHomeClicked = () => {
    navigate('/');
  }

  const showMessage = (message) => {
    setMessage(message);
    setTimeout(() => { setMessage(null); }, TIMEOUT);
  }

  return <RModal>
    <ExporterContainer>
      <CloseButton onClick={onCloseExporter}>
        <CloseImage src='images/close-icon.png' alt='close'/>
      </CloseButton>
      <Paragraph>
        ¡Muy bien! Has completado la construcción de tu historia.
        Ahora puedes exportarla o, si lo deseas, puedes continuar 
        editándola cerrando esta ventana de diálogo.
      </Paragraph>
      <ButtonContainer>
        <Button onClick={onExportTextClicked}>
          Exportar texto
        </Button>
        <Button onClick={onExportAudiosClicked}>
          Exportar audios
        </Button>
        <Button onClick={onGoHomeClicked} home={true}>
          Volver al inicio
        </Button>
      </ButtonContainer>
      { message && <Message>{ message }</Message> }
    </ExporterContainer>
  </RModal>
}

const Button = styled.button`
  background-color: ${({ home }) => home ? '#505E76' : '#D2683D'};
  border: none;
  border-radius: 25px;
  color: white;
  cursor: pointer;
  font-size: large;
  padding: 10px 20px;
`;

const ButtonContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
  width: 510px;
`;

const CloseButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  height: 25px;
  padding: 0;
  position: absolute;
  right: 22px;
  top: 10px;
  width: 25px;
`;

const CloseImage = styled.img`
  height: 100%;
  width: 100%;
`;

const ExporterContainer = styled.div`
  align-items: center;
  background-color: rgba(0, 0, 0, 0.75);
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 220px;
  padding: 15px 0px;
  position: relative;
  width: 100%;
`;

const Message = styled.p`
  color: white;
  font-weight: 400;
  margin: 15px 0px 0px 0px;
  padding: 0;
`;

const Paragraph = styled.p`
  color: white;
  font-size: 1.3em;
  font-weight: 400;
  margin: 0;
  padding: 0;
  text-align: justify;
  width: 700px;
`;

export default RModalExporter;