import React from 'react';

import {
  Container,
  Title
} from './styles';

interface ButtonProps {
  title: string;
  onPress: () => void;
  color?: string;
}

export function Button({title, onPress, color, ...rest}: ButtonProps){

  return (
    <Container {...rest} color={color} onPress={onPress}>
      <Title>{title}</Title>
    </Container>
  );
}