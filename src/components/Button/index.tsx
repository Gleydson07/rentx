import React from 'react';
import { Load } from '../Load';

import {
  Container,
  Content,
  Title
} from './styles';

interface ButtonProps {
  title: string;
  color?: string;
  colorLoading?: string;
  enabled?: boolean;
  loading?: boolean;
  onPress: () => void;
}

export function Button({
  title, 
  onPress, 
  color, 
  colorLoading = '', 
  enabled = true,
  loading = false,
  ...rest
}: ButtonProps){

  return (
    <Container 
      {...rest} 
      color={color} 
      onPress={onPress}
      enabled={enabled}
      style={{opacity: enabled ? 1 : 0.5}}
    >
      <Content>
        {loading ? <Load color={colorLoading}/> : <Title>{title}</Title>}
      </Content>
    </Container>
  );
}