import React from 'react';
import {TypingAnimation} from 'react-native-typing-animation';
const Typing = () => {
  return (
    <TypingAnimation
      dotColor="black"
      dotMargin={3}
      dotAmplitude={3}
      dotSpeed={0.15}
      dotRadius={2.5}
      dotX={12}
      dotY={6}
    />
  );
};
export default Typing;
