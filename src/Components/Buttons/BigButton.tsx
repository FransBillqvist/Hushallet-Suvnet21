import React, { ReactNode } from 'react';
import { Button } from 'react-native-paper';

interface Props {
  children?: ReactNode;
  onPress: () => void;
  icon?: string;
  disabled?: boolean;
}

const BigButton = (props: Props) => {
  return (
    <Button
      // disabled={props.disabled}
      // rounded='full'
      // width={useWindowDimensions().width / 2}
      // bg='white.300'
      // shadow='1'
      // _text={{ color: 'black' }}
      // _pressed={{ bg: 'gray.200' }}
      // flexDir='row'
      icon={props.icon}
      onPress={props.onPress}
      mode='contained-tonal'
      disabled={props.disabled}
    >
      {props.children}
    </Button>
  );
};
export default BigButton;
