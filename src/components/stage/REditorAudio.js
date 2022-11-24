/**
 * @author Martín Vladimir Alonso Sierra Galvis 
 * @version 1.0.0
 */

import { useState, useEffect } from 'react';

function REditorAudio() {
  const [audio, setAudio] = useState(null);
  const [recorder, setRecorder] = useState(null);
  const [recording, setRecording] = useState(false);

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
          setAudio(blob);
          chunks = [];
        }

        setRecorder(mediaRecorder);
      });
    }
  }, []);

  const onRecordClick = () => {
    const recordState = !recording;
    if (recordState) {
      recorder.start();
    }
    else {
      recorder.stop();
    }

    setRecording(recordState);
  }

  return <div>
    {
      audio === null ?
      <button onClick={onRecordClick}>
        { recording ? 'Pausar' : 'Grabar' }
      </button>
      :
      <audio 
        controls
        src={URL.createObjectURL(audio)} 
        type='video.webm'/>
    }
  </div>
}

export default REditorAudio;