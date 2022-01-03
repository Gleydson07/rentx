import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import {
  Container,
  Title
} from './styles';

interface ButtonConfirmProps extends RectButtonProps {
  title: string
}

export function ButtonConfirm({title, ...rest}: ButtonConfirmProps){
  return (
    <Container {...rest}>
      <Title>{title}</Title>
    </Container>
  );
}