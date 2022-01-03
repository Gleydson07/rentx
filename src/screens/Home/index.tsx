import React from 'react';
import { useNavigation } from '@react-navigation/native';
import {StatusBar} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import Logo from '../../assets/logo.svg'
import { Car, CarProps } from '../../components/Car';

import {
  Container, 
  Header,
  HeaderContent,
  TotalCars,
  CarList,
} from './styles';

export function Home(){
  const navigation = useNavigation<any>();

  function handleConfirmRental(){
    navigation.navigate("CarDetails")
  }

  const carMock:CarProps = {
    brand: "AUDI",
    name: "RS 5 Coupé",
    rent: {
      period: "Ao dia",
      price: 120,
    },
    thumbnail: "https://freepngimg.com/thumb/audi/35227-5-audi-rs5-red.png"
  } 

  const arrayCar = [
    carMock,
    carMock,
  ]



  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent" // SETA O STATUSBAR COMO TRANSPARENT
        translucent // STATUSBAR SOBREPOE O HEADER
      />
      <Header>
        <HeaderContent>
          <Logo width={RFValue(108)} height={RFValue(12)}/>
          <TotalCars>Total de 12 carros</TotalCars>
        </HeaderContent>
      </Header>

      <CarList
        data={arrayCar}
        keyExtractor={item => String(item)}
        renderItem={({item}) => <Car
          brand={carMock.brand}
          name={carMock.name}
          rent={carMock.rent}
          thumbnail={carMock.thumbnail}
          onPress={handleConfirmRental}
        />}
      />
      
      
    </Container>
  );
}