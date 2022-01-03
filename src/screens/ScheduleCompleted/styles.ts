import { RectButton } from 'react-native-gesture-handler';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background: ${({theme}) => theme.colors.header};

  padding-top: ${getStatusBarHeight() + 24}px;
`;

export const Content = styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.Text`
  margin: 24px 0;
  
  color: ${({theme}) => theme.colors.main_light};
  font-family: ${({theme}) => theme.fonts.secondary_600};
  font-size: ${RFValue(32)}px;
`;

export const Message = styled.Text`  
  text-align: center;

  color: ${({theme}) => theme.colors.text_detail};
  font-family: ${({theme}) => theme.fonts.primary_400};
  font-size: ${RFValue(14)}px;
  line-height: 25px;
`;

export const Footer = styled.View`
  width: 100%;
  align-items: center;

  margin: 80px 0;
`
