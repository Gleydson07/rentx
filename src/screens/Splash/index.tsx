import React, { useEffect } from 'react';
import BrandSvg from '../../assets/brand.svg';
import LogoSvg from '../../assets/logo.svg';
import { useNavigation } from '@react-navigation/core';

import Animated, {
  useSharedValue, 
  useAnimatedStyle,
  withTiming,
  interpolate,
  Extrapolate,
  runOnJS
} from 'react-native-reanimated'

import {
  Container
} from './styles';
import { StatusBar } from 'react-native';

export function Splash(){
  const navigation = useNavigation<any>();
  const splashAnimation = useSharedValue(0);

  function startApp(){
    navigation.navigate("Home")
  }

  const brandStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(splashAnimation.value, [0, 50], [1, 0]),
      transform: [
        {
          translateX: interpolate(
            splashAnimation.value, 
            [0, 50], 
            [0, -50],
            Extrapolate.CLAMP
          )
        }
      ],
    }
  })

  const logoStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(splashAnimation.value, [0, 25, 50], [0, .3, 1]),
      transform: [
        {
          translateX: interpolate(
            splashAnimation.value, 
            [0, 50], 
            [-50, 0],
            Extrapolate.CLAMP
          )
        }
      ],
    }
  })

  useEffect(() => {
    splashAnimation.value = withTiming(
      50,
      {duration: 1000},
      () => {
        'worklet'
        runOnJS(startApp)()
      }
    )
  }, [])

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent" // SETA O STATUSBAR COMO TRANSPARENT
        translucent // STATUSBAR SOBREPOE O HEADER
      />

      <Animated.View style={[brandStyle, {position: "absolute"}]}>
        <BrandSvg width={80} height={50}/>
      </Animated.View>

      <Animated.View style={[logoStyle, {position: "absolute"}]}>
        <LogoSvg width={180} height={20}/>
      </Animated.View>
    </Container>
  );
}