import React, { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import { StatusBar } from 'react-native';
import { format } from 'date-fns';
import { getPlatformDate } from '../../utils/getPlatformDate'

import { BackButton } from '../../components/BackButton';
import { Calendar, DayProps, generateInterval, MarkedDateProps } from '../../components/Calendar';
import { Button } from '../../components/Button';

import ArrowSvg from '../../assets/arrow.svg'

import {
  Container, 
  Header,
  Title,
  RentalPeriod,
  DateInfo,
  DateTitle,
  DateValue,
  Content,
  Footer
} from './styles';
import { CarDTO } from '../../dtos/CarDTO';

interface RouteParams {
  car: CarDTO
}

interface RentalPeriodProps {
  startFormatted: string;
  endFormatted: string;
}

export function Schedule(){
  const [lastSelectedDate, setLastSelectedDate] = useState<DayProps>({} as DayProps);
  const [markedDates, setMarkedDate] = useState<MarkedDateProps>({} as MarkedDateProps);
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriodProps>({} as RentalPeriodProps);
  const route = useRoute();
  const {car} = route.params as RouteParams;
  const theme = useTheme();
  const navigation = useNavigation<any>();

  function handleBack(){
    navigation.goBack();
  }

  function handleConfirmRental(){
    // if(!rentalPeriod.startFormatted || !rentalPeriod.endFormatted){
    //   return Alert.alert("Selecione o intervalo para alugar");''
    // }

    navigation.navigate('ScheduleCarDetails', {
      car,
      dates: Object.keys(markedDates)
    });
  }

  function handleChangeDate(date: DayProps){
    let start = !lastSelectedDate.timestamp ? date : lastSelectedDate;
    let end = date;

    if(start.timestamp > end.timestamp){
      const newStart = start;
      start = end;
      end = newStart;
    }

    setLastSelectedDate(end);
    const interval = generateInterval(start, end);
    setMarkedDate(interval);

    const firstDate = Object.keys(interval)[0];
    const endDate = Object.keys(interval)[Object.keys(interval).length-1];

    setRentalPeriod({
      startFormatted: format(getPlatformDate(new Date(firstDate)), 'dd/MM/yyyy'),
      endFormatted: format(getPlatformDate(new Date(endDate)), 'dd/MM/yyyy'),
    })
  }
  
  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Header>
        <BackButton 
          onPress={handleBack}
          color={theme.colors.shape}
        />
        <Title>
          Escolha uma {'\n'}
          data de início e {'\n'}
          fim do aluguel
        </Title>

        <RentalPeriod>
          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue 
              selected={!!rentalPeriod.startFormatted}
            >
              {rentalPeriod.startFormatted}
            </DateValue>
          </DateInfo>

          <ArrowSvg/>

          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue 
              selected={!!rentalPeriod.endFormatted}
            >
              {rentalPeriod.endFormatted}
            </DateValue>
          </DateInfo>
        </RentalPeriod>
      </Header>

      <Content>
        <Calendar 
          markedDates={markedDates} 
          onDayPress={handleChangeDate}
        />
      </Content>

      <Footer>
        <Button 
          title="Confirmar" 
          onPress={handleConfirmRental}
          enabled={!!rentalPeriod.endFormatted}
        />
      </Footer>
    </Container>
  );
}