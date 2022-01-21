import React, { useRef, useState } from 'react';
import { FlatList, ViewToken } from 'react-native';

import {
  Container,
  ImageIndexes,
  ImageIndex,
  CarImageWrapper,
  CarImage
} from './styles';

interface ChangeImageProps {
  viewableItems: ViewToken[];
  changed: ViewToken[];
}

interface ImageSlidesProps {
  imagesUrl: string[];
}

export function ImageSlider({imagesUrl}: ImageSlidesProps){
  const [imageIndex, setImageIndex] = useState(0);

  const indexChanged = useRef((info: ChangeImageProps) => {
    const index = info.viewableItems[0].index!;
    setImageIndex(index)
  })

  return (
    <Container>
      <ImageIndexes>
        {imagesUrl.map((_, index) => (
          <ImageIndex 
            key={index}
            active={index === imageIndex}
          />
        ))}
      </ImageIndexes>

      
        <FlatList
          data={imagesUrl}
          keyExtractor={key => key}
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => (
            <CarImageWrapper>
              <CarImage 
                source={{uri: item}}
                resizeMode="contain"
              />
            </CarImageWrapper>
          )}
          horizontal
          onViewableItemsChanged={indexChanged.current}
        />
    </Container>
  );
}