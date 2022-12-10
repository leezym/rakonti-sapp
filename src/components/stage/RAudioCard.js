/**
 * @author Martín Vladimir Alonso Sierra Galvis 
 * @version 1.0.0
 * 
 * @description 
 * Componente que contiene un audio grabado y que tiene 
 * la capacidad de reproducirlo.
 */

import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { base64ToAudioBlob } from '../../utils';

function RAudioCard({ audioURL, index }) {
  const [audioBlob, setAudioBlob] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef();

  useEffect(() => {
    const chunks = base64ToAudioBlob(audioURL);
    const blob = new Blob([chunks], { type: 'audio/webm' });
    setAudioBlob(blob);
  }, [audioURL]);

  const onAudioEnded = () => {
    setIsPlaying(false);
  }

  const onPlayClicked = () => {
    if (isPlaying) {
      audioRef.current.pause();
    }
    else {
      audioRef.current.play();
    }

    setIsPlaying(!isPlaying);
  }

  return <CardContainer>
    { audioBlob && <audio ref={audioRef} onEnded={onAudioEnded}>
        <source src={URL.createObjectURL(audioBlob)}/>
      </audio> }
    <BodyContainer>
      <Title>
        Grabación { index + 1 }
      </Title>
      <PlayButton onClick={onPlayClicked}>
        <PlayImage 
          src={`images/${isPlaying ? 'pause' : 'play'}-record.png`} 
          alt='play'/>
      </PlayButton>
    </BodyContainer>
  </CardContainer>
}

const BodyContainer = styled.div`
  align-items: center;
  background-color: white;
  border-left: 5px solid #505E79;
  display: flex;
  height: 50px;
  justify-content: space-between;
  width: 100%;
`;

const CardContainer = styled.div`
  margin: 5px 2px 5px 0px;
  width: 95%;
`;

const PlayButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  height: 15px;
  margin-right: 15px;
  padding: 0;
  width: 15px;
`;

const PlayImage = styled.img`
  height: 100%;
  width: 100%;
`;

const Title = styled.h3`
  font-size: large;
  font-weight: bold;
  padding: 0;
  margin: 0px 0px 0px 10px;
`;

export default RAudioCard;