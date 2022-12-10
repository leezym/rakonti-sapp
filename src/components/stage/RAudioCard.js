/**
 * @author Martín Vladimir Alonso Sierra Galvis 
 * @version 1.0.0
 * 
 * @description 
 * Componente que contiene un audio grabado y que tiene 
 * la capacidad de reproducirlo.
 */

import { useEffect, useState } from 'react';
import styled from 'styled-components';

function RAudioCard({ audioURL }) {
  const [audioBlob, setAudioBlob] = useState(null);

  useEffect(() => {
    const chunks = base64ToAudioBlob(audioURL);
    const blob = new Blob([chunks], { type: 'audio/webm' });
    console.log(blob);
    setAudioBlob(blob);
  }, [audioURL]);

  /** Función encargada de transformar un string base 64 en audio blob */
  const base64ToAudioBlob = (audioURL) => {
    const rawData = window.atob(audioURL);
    const dataLen = rawData.length;
    /** 
     * El arreglo Uint8Array y ArrayBuffer es muy IMPORTANTE para que funcione
     * correctamente la transformación.
     */
    let chunks = new Uint8Array(new ArrayBuffer(dataLen));
    
    for (let i = 0; i < dataLen; i++) {
      chunks[i] = rawData.charCodeAt(i);
    }

    return chunks;
  }

  return <CardContainer>
    {
      audioBlob ? 
      <audio controls>
        <source src={URL.createObjectURL(audioBlob)}/>
      </audio>
      :
      null
    }
  </CardContainer>
}

const CardContainer = styled.div`
  margin: 5px 0px;
`;

export default RAudioCard;