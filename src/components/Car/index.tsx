import React from 'react';
import { CarDTO } from '../../dtos/CarDTO';
import { RectButtonProps } from 'react-native-gesture-handler';

import GasolineSvg from '../../assets/gasoline.svg'

export interface CarProps extends RectButtonProps{
  data: CarDTO
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
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';

export function Car({
  data,
  onPress,
  ...rest
}: CarProps){
  const MotorIcon = getAccessoryIcon(data.fuel_type);

  return (
    <Container {...rest} onPress={onPress}>
      <Details>
        <Brand>{data.brand}</Brand>
        <Name>{data.name}</Name>

        <About>
          <Rent>
            <Period>{data.rent.period}</Period>
            <Price>R$ {data.rent.price}</Price>
          </Rent>

          <Type>
            <MotorIcon/>
          </Type>
        </About>
      </Details>

      <CarImage source={{uri: data.thumbnail}} resizeMode='contain'/>
    </Container>
  );
}