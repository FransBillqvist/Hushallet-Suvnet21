import React, { useState } from 'react';
import { Box, Slider } from 'native-base';

const DemandingCard = () => {
  const [onChangeValue, setOnChangeValue] = useState(1);
  return (
    <Box flex='1'>
      <Box
        shadow='1'
        rounded='lg'
        overflow='hidden'
        bg='white.300'
        w='80'
        p='4'
        borderColor='white.300'
        flexDir='row'
        justifyContent='space-between'
      >
        <Box>Energivärde:</Box>
        <Box>{onChangeValue}</Box>
        <Slider
          w='3/4'
          maxW='180'
          defaultValue={1}
          minValue={1}
          maxValue={8}
          accessibilityLabel='hello world'
          step={1}
          onChange={(value) => setOnChangeValue(Math.floor(value))}
        >
          <Slider.Track>
            <Slider.FilledTrack />
          </Slider.Track>
          <Slider.Thumb />
        </Slider>
      </Box>
    </Box>
  );
};

export default DemandingCard;
