import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {StatusBar, StyleSheet, BackHandler} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { RectButton, PanGestureHandler } from 'react-native-gesture-handler';

import api from '../../services/api';
import { Ionicons } from '@expo/vector-icons'

import Logo from '../../assets/logo.svg'
import { Car } from '../../components/Car';
import { CarDTO } from '../../dtos/CarDTO';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withSpring
} from 'react-native-reanimated';

import { LoadAnimation } from '../../components/LoadAnimation';
import {useTheme} from 'styled-components';

import {
  Container, 
  Header,
  HeaderContent,
  TotalCars,
  CarList,
} from './styles';

const ButtonAnimated = Animated.createAnimatedComponent(RectButton);

export function Home(){
  const navigation = useNavigation<any>();
  const [cars, setCars] = useState<CarDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const theme = useTheme();

  const positionY = useSharedValue(0);
  const positionX = useSharedValue(0);

  const myCarsButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: positionX.value},
        {translateY: positionY.value},
      ]
    }
  })

  const onGestureEvent = useAnimatedGestureHandler({
    onStart(_, ctx:any){
      ctx.positionY = positionY.value;
      ctx.positionX = positionX.value;
    },

    onActive(event, ctx:any){
      positionX.value = ctx.positionX + event.translationX;
      positionY.value = ctx.positionY + event.translationY;
    },

    onEnd(){
      positionX.value = withSpring(0);
      positionY.value = withSpring(0);
    }
  })

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

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      return true;
    })
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
          <TotalCars>{!isLoading ? `Total de ${cars.length} carros` : ''}</TotalCars>
        </HeaderContent>
      </Header>

      {isLoading ? <LoadAnimation/> : 
        <CarList
          data={cars}
          keyExtractor={item => item.id}
          renderItem={({item}) => <Car
            data={item}
            onPress={() => handleConfirmRental(item)}
          />}
        />
      }

      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View
          style={[
            myCarsButtonStyle,
            {
              position: 'absolute',
              bottom: 12,
              right: 22,
            }
          ]}
        >
          <ButtonAnimated 
            onPress={handleOpenMyCars}
            style={[styles.button, {backgroundColor: theme.colors.main}]}
          >
            <Ionicons 
              name="ios-car-sport"
              size={32}
              color={theme.colors.shape}
            />
          </ButtonAnimated>
        </Animated.View>
      </PanGestureHandler>
      
    </Container>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center'
  }
})