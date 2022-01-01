import React from 'react';
import {StatusBar} from 'react-native';

import Logo from '../../assets/logo.svg'

import {
  Container, 
  Header,
} from './styles';

export function Home(){
  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent" // SETA O STATUSBAR COMO TRANSPARENT
        translucent // STATUSBAR SOBREPOE O HEADER
      />
      <Header>
        <Logo/>
      </Header>
    </Container>
  );
}