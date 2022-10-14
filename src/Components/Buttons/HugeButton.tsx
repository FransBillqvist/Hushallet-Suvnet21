import { Button } from 'native-base';
import { GestureResponderEvent } from 'react-native';
import React, { ReactNode } from 'react';

interface Props {
  children?: ReactNode;
  startIcon?: JSX.Element;
  onPress: (event: GestureResponderEvent) => void;
}

const HugeButton = (props: Props) => {
  return (
    <Button
      rounded='full'
      w='80'
      bg='white.300'
      shadow='1'
      _text={{ color: 'black' }}
      _pressed={{ bg: 'gray.200' }}
      flexDir='row'
      justifyContent='space-around'
      startIcon={props.startIcon}
      onPress={props.onPress}
    >
      {props.children}
    </Button>
  );
};
export default HugeButton;
