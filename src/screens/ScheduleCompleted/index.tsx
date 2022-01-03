import React from 'react';
import { useWindowDimensions, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { ButtonConfirm } from '../../components/ButtonConfirm';
import LogoSvg from '../../assets/logo_background_gray.svg'
import DoneSvg from '../../assets/done.svg'
import { useTheme } from 'styled-components';

import {
  Container,
  Content,
  Title,
  Message,
  Footer
} from './styles';

export function ScheduleCompleted(){
  const theme = useTheme();
  const {width} = useWindowDimensions();

  const navigation = useNavigation<any>();

  function handleConfirm(){
    navigation.navigate('Home');
  }

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor={theme.colors.header}
        translucent
      />
      <LogoSvg width={width}/>

      <Content>
        <DoneSvg color={theme.colors.success} width={80} height={80}/>

        <Title>Carro alugado!</Title>
        <Message>
          Agora você só precisa ir {'\n'}
          até a concessionária da RENTX {'\n'}
          pegar o seu automóvel.
        </Message>        
      </Content>

      <Footer>
        <ButtonConfirm
          title="OK"
          onPress={handleConfirm}
        />
      </Footer>
    </Container>
  );
}