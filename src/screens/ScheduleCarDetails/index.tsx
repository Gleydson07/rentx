import React, { useState } from 'react';
import {Feather} from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation, useRoute } from '@react-navigation/native';

import { Accessory } from '../../components/Accessory';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Button } from '../../components/Button';

import { useTheme } from 'styled-components';

import {
  Container,
  CarImages,
  Header,
  Content,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  Accessories,
  Footer,
  RentalPeriod,
  CalendarIcon,
  DateInfo,
  DateTitle,
  DateValue,
  RentalPrice,
  RentalPriceLabel,
  RentalPriceDetails,
  RentalPriceQuote,
  RentalPriceTotal
} from './styles';
import { CarDTO } from '../../dtos/CarDTO';
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';
import format from 'date-fns/format';
import { getPlatformDate } from '../../utils/getPlatformDate';
import api from '../../services/api';
import { Alert } from 'react-native';

interface RouteParams {
  car: CarDTO,
  dates: any
}

export function ScheduleCarDetails(){
  const theme = useTheme();
  const route = useRoute();
  const [lockRequestCar, setLockRequestCar] = useState(false)
  const {navigate, goBack} = useNavigation<any>();
  const {car, dates} = route.params as RouteParams;

  const datesFormatted = {
    start: format(getPlatformDate(new Date(dates[0])), 'dd/MM/yyyy'),
    end: format(getPlatformDate(new Date(dates[dates.length - 1])), 'dd/MM/yyyy'),
    count: dates.length
  }

  async function handleConfirmRental(){
    setLockRequestCar(true)
    try {
      const response = await api.get(`/schedules_bycars/${car.id}`);
      const unavailable_dates = [
        ...response.data.unavailable_dates,
        ...dates
      ]

      await api.post(`/schedules_byuser`, {
        user_id: 1,
        car,
        startDate: format(getPlatformDate(new Date(dates[0])), 'dd/MM/yyyy'),
        endDate: format(getPlatformDate(new Date(dates[dates.length - 1])), 'dd/MM/yyyy')
      });

      await api.put(`/schedules_bycars/${car.id}`, {
        id: car.id,
        unavailable_dates
      });
  
      navigate('ScheduleCompleted');
    } catch (error) {
      console.log(error)
      setLockRequestCar(false)
      Alert.alert("Não foi possível efetuar o agendamento.")
    }

  }

  return (
    <Container>
      <Header>
        <BackButton 
          onPress={() => goBack()}
        />
      </Header>

      <CarImages>
        <ImageSlider imagesUrl={car.photos}/>
      </CarImages>

      <Content>
        <Details>          
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>

          <Rent>
            <Period>{car.rent.period}</Period>
            <Price>R$ {car.rent.price}</Price>
          </Rent>
        </Details>

        <Accessories>
          {car.accessories.map(item => 
            <Accessory 
              key={item.type} 
              name={item.name} 
              icon={getAccessoryIcon(item.type)}
            />
          )}
        </Accessories>

        <RentalPeriod>
          <CalendarIcon>
            <Feather
              name="calendar"
              size={RFValue(24)}
              color={theme.colors.shape}
            />
          </CalendarIcon>

          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue>{datesFormatted.start}</DateValue>
          </DateInfo>

          <Feather
            name="chevron-right"
            size={RFValue(10)}
            color={theme.colors.text}
          />

          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue>{datesFormatted.end}</DateValue>
          </DateInfo>
        </RentalPeriod>

        <RentalPrice>
          <RentalPriceLabel>Total</RentalPriceLabel>
          <RentalPriceDetails>
            <RentalPriceQuote>
              R$ {car.rent.price} x {datesFormatted.count} diárias
            </RentalPriceQuote>
            <RentalPriceTotal>
              R$ {car.rent.price * datesFormatted.count}
            </RentalPriceTotal>
          </RentalPriceDetails>
        </RentalPrice>
      </Content>

      <Footer>
        <Button 
          title="Alugar agora" 
          color={theme.colors.success} 
          onPress={handleConfirmRental}
          enabled={!lockRequestCar}
          loading={lockRequestCar}
          colorLoading={theme.colors.background_secondary}
        />
      </Footer>
    </Container>
  );
}