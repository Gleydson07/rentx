import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  background: ${({theme}) => theme.colors.background_primary};
`;

export const Header = styled.View`
  width: 100%;
  height: 325px;

  background: ${({theme}) => theme.colors.header};

  justify-content: center;
  padding: 24px;
  padding-top: ${getStatusBarHeight() + 30}px;
`;

export const Title = styled.Text`
  color: ${({theme}) => theme.colors.shape};
  font-family: ${({theme}) => theme.fonts.secondary_600};
  font-size: ${RFValue(28)}px;

  margin: 24px 0;
`

export const Subtitle = styled.Text`
  color: ${({theme}) => theme.colors.shape};
  font-family: ${({theme}) => theme.fonts.secondary_400};
  font-size: ${RFValue(14)}px;

  margin: 24px 0;
`

export const Content = styled.View`
  flex: 1;
  width: 100%;
  padding: 0 16px;
`;

export const Appointments = styled.View`
  width: 100%;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  padding: 24px 0;
`;

export const AppointmentsTitle = styled.Text`
  color: ${({theme}) => theme.colors.text};
  font-family: ${({theme}) => theme.fonts.primary_400};
  font-size: ${RFValue(14)}px;
`;

export const AppointmentsQuantity = styled.Text`
  color: ${({theme}) => theme.colors.title};
  font-family: ${({theme}) => theme.fonts.primary_500};
  font-size: ${RFValue(14)}px;
`;

export const CarWrapper = styled.View`
  margin-bottom: 16px;
`;

export const CarFooter = styled.View`
  flex-direction: row;
  
  justify-content: space-between;
  align-items: center;

  margin-top: -14px;
  padding: 12px 24px;
  background: ${({theme}) => theme.colors.background_secondary};
`;

export const CarFooterTitle = styled.Text`
  color: ${({theme}) => theme.colors.text_detail};
  font-family: ${({theme}) => theme.fonts.secondary_500};
  font-size: ${RFValue(10)}px;
`;

export const CarFooterPeriod = styled.View`
  flex-direction: row;
`;

export const CarFooterDate = styled.Text`
color: ${({theme}) => theme.colors.title};
  font-family: ${({theme}) => theme.fonts.primary_400};
  font-size: ${RFValue(12)}px;
`;

