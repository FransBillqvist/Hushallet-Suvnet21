import React, { ReactNode } from 'react';
import { Box } from 'native-base';

interface Props {
  children?: ReactNode;
}

const ChoreCard = (props: Props) => {
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
        {props.children}
      </Box>
    </Box>
  );
};

export default ChoreCard;
