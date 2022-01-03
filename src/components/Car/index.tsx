import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import GasolineSvg from '../../assets/gasoline.svg'

export interface CarProps extends RectButtonProps{
  brand: string,
  name: string,
  rent: {
    period: string,
    price: number,
  },
  thumbnail: string
}

import {
  Container,
  Details,
  Brand,
  Name,
  About,
  Rent,
  Period,
  Price,
  Type,
  CarImage,
} from './styles';

export function Car({
  brand,
  name,
  rent,
  thumbnail,
  onPress,
  ...rest
}: CarProps){

  return (
    <Container {...rest} onPress={onPress}>
      <Details>
        <Brand>{brand}</Brand>
        <Name>{name}</Name>

        <About>
          <Rent>
            <Period>{rent.period}</Period>
            <Price>R$ {rent.price}</Price>
          </Rent>

          <Type>
            <GasolineSvg/>
          </Type>
        </About>
      </Details>

      <CarImage source={{uri: thumbnail}} resizeMode='contain'/>
    </Container>
  );
}