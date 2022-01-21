import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';
import {StyleSheet}from 'react-native';
import { useTheme } from 'styled-components';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  Extrapolate
} from 'react-native-reanimated';

import { CarDTO } from '../../dtos/CarDTO';

import { Button } from '../../components/Button';
import { Accessory } from '../../components/Accessory';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';

import {
  Container,
  CarImages,
  Header,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  About,
  Accessories,
  Footer
} from './styles';
import { StatusBar } from 'react-native';

interface RouteParams {
  car: CarDTO
}

export function CarDetails(){
  const navigation = useNavigation<any>();
  const route = useRoute();
  const {car} = route.params as RouteParams;

  const theme = useTheme();

  const scrollY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.y;
  })

  const headerStyleAnimation = useAnimatedStyle(() => {
    return {
      height: interpolate(
        scrollY.value,
        [0, 200],
        [200, 100],
        Extrapolate.CLAMP
      )
    }
  })

  const sliderCarStyleAnimation = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollY.value,
        [0, 150],
        [1, 0],
        Extrapolate.CLAMP
      )
    }
  })

  function handleConfirmRental(){
    navigation.navigate('Schedule', {car});
  }

  function handleBack(){
    navigation.goBack();
  }

  return (
    <Container>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent" // SETA O STATUSBAR COMO TRANSPARENT
        translucent // STATUSBAR SOBREPOE O HEADER
      />

      <Animated.View style={[
        headerStyleAnimation, 
        styles.header,
        {backgroundColor: theme.colors.background_secondary}
      ]}>
        <Header>
          <BackButton 
            onPress={handleBack}
          />
        </Header>

          <CarImages>
        <Animated.View style={[sliderCarStyleAnimation]}>
            <ImageSlider imagesUrl={car.photos}/>
        </Animated.View>
          </CarImages>
      </Animated.View>

      <Animated.ScrollView
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingTop: 0 //getStatusBarHeight()
        }}
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
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

        <About>
          {car.about}
        </About>

      </Animated.ScrollView>

      <Footer>
        <Button title="Escolher período do aluguel" onPress={handleConfirmRental}/>
      </Footer>
    </Container>
  );
}

const styles = StyleSheet.create({
  header: {
    position: 'relative',
    overflow: 'hidden',
    zIndex: 1
  }
})