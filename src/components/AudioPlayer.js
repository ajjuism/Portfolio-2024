import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { FaVolumeUp, FaVolumeMute } from 'react-icons/fa';

const AudioControl = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
  margin-top: 30px;
  margin-right: 20px;

    @media (max-width: 768px) {
      margin-top: 5px;
      margin-right: 0px;    
  }
`;

function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(new Audio('/bg.wav'));

  useEffect(() => {
    audioRef.current.loop = true;
    return () => {
      audioRef.current.pause();
    };
  }, []);

  const toggleAudio = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <AudioControl onClick={toggleAudio}>
      {isPlaying ? <FaVolumeMute /> : <FaVolumeUp />}
    </AudioControl>
  );
}

export default AudioPlayer;