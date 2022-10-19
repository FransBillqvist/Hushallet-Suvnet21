import { Button } from 'native-base';
import { useWindowDimensions } from 'react-native';
import React, { ReactNode } from 'react';
import { InterfaceButtonProps } from 'native-base/lib/typescript/components/primitives/Button/types';

interface Props extends InterfaceButtonProps {
  children?: ReactNode;
  onPress: () => void;
}

const BigButton = (props: Props) => {
  return (
    <Button
      disabled={props.disabled}
      rounded='full'
      width={useWindowDimensions().width / 2}
      bg='white.300'
      shadow='1'
      _text={{ color: 'black' }}
      _pressed={{ bg: 'gray.200' }}
      flexDir='row'
      startIcon={props.startIcon}
      onPress={props.onPress}
    >
      {props.children}
    </Button>
  );
};
export default BigButton;
