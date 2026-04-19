import React from 'react';
import { IconButton, CircularProgress } from '@mui/material';
import Mic from '@mui/icons-material/Mic';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const VoiceInputButton = ({ onTranscript }) => {
  const { transcript, listening, resetTranscript } = useSpeechRecognition();

  const handleToggle = () => {
    if (listening) {
      SpeechRecognition.stopListening();
      onTranscript(transcript);
      resetTranscript();
    } else {
      SpeechRecognition.startListening({ continuous: true });
    }
  };

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null;
  }

  return (
    <IconButton onClick={handleToggle} color={listening ? 'secondary' : 'default'}>
      {listening ? <CircularProgress size={24} /> : <Mic />}
    </IconButton>
  );
};

export default VoiceInputButton;