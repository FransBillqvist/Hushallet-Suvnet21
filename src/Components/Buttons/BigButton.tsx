import { Button } from 'native-base';
import { GestureResponderEvent, useWindowDimensions } from 'react-native';
import React, { ReactNode } from 'react';

interface Props {
  children?: ReactNode;
  startIcon?: JSX.Element;
  onPress: (event: GestureResponderEvent) => void;
}

const BigButton = (props: Props) => {
  return (
    <Button
      rounded='full'
      width={useWindowDimensions().width / 2}
      bg='white.300'
      shadow='1'
      _text={{ color: 'black' }}
      _pressed={{ bg: 'gray.200' }}
      flexDir='row'
      justifyContent='space-between'
      startIcon={props.startIcon}
      onPress={props.onPress}
    >
      {props.children}
    </Button>
  );
};
export default BigButton;
