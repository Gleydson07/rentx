import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled(RectButton)`
  width: 80px;
  height: 56px;

  justify-content: center;
  align-items: center;
  padding: 16px;
  background: ${({theme}) => theme.colors.shape_dark};
  `;

export const Title = styled.Text`
  font-family: ${({theme}) => theme.fonts.primary_500};
  color: ${({theme}) => theme.colors.shape};
  font-size: ${RFValue(15)}px;
`