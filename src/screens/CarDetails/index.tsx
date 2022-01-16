import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { CarDTO } from '../../dtos/CarDTO';

import { Button } from '../../components/Button';
import { Accessory } from '../../components/Accessory';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';

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
  About,
  Accessories,
  Footer
} from './styles';
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';

interface RouteParams {
  car: CarDTO
}

const imagesUrlList = [
  "https://www.webmotors.com.br/imagens/prod/348415/AUDI_RS5_2.9_V6_TFSI_GASOLINA_SPORTBACK_QUATTRO_STRONIC_34841515593745747.png?s=fill&w=440&h=330&q=80&t=true"
]

export function CarDetails(){
  const navigation = useNavigation<any>();
  const route = useRoute();
  const {car} = route.params as RouteParams;

  function handleConfirmRental(){
    navigation.navigate('Schedule', {car});
  }

  function handleBack(){
    navigation.goBack();
  }

  return (
    <Container>
      <Header>
        <BackButton 
          onPress={handleBack}
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

        <About>
          {car.about}
        </About>

      </Content>

      <Footer>
        <Button title="Escolher período do aluguel" onPress={handleConfirmRental}/>
      </Footer>
    </Container>
  );
}