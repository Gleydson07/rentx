import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {StatusBar} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import api from '../../services/api';
import { Ionicons } from '@expo/vector-icons'

import Logo from '../../assets/logo.svg'
import { Car } from '../../components/Car';
import { CarDTO } from '../../dtos/CarDTO';

import {
  Container, 
  Header,
  HeaderContent,
  TotalCars,
  CarList,
  MyCarsButton
} from './styles';
import { Load } from '../../components/Load';
import {useTheme} from 'styled-components';

export function Home(){
  const navigation = useNavigation<any>();
  const [cars, setCars] = useState<CarDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const theme = useTheme();

  function handleConfirmRental(car: CarDTO){
    navigation.navigate("CarDetails", {car})
  }

  function handleOpenMyCars(){
    navigation.navigate("MyCars")
  }

  async function loadCars(){
    setIsLoading(true);
    try {
      const response = await api.get("/cars");
      response.data ? setCars(response.data) : setCars([])      
    } catch (error) {
     console.log(error) 
    }finally{
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadCars()
  }, [])

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
          <TotalCars>Total de {cars.length} carros</TotalCars>
        </HeaderContent>
      </Header>

      {isLoading ? <Load/> : 
        <CarList
          data={cars}
          keyExtractor={item => item.id}
          renderItem={({item}) => <Car
            data={item}
            onPress={() => handleConfirmRental(item)}
          />}
        />
      }

      <MyCarsButton onPress={handleOpenMyCars}>
        <Ionicons 
          name="ios-car-sport"
          size={32}
          color={theme.colors.shape}
        />
      </MyCarsButton>
      
    </Container>
  );
}