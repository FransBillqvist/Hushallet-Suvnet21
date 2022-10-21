import React, { ReactNode } from 'react';
import { Button, Props } from 'react-native-paper';
import { StyleSheet, Dimensions } from 'react-native';

interface ButtonProps extends Props {
  children?: ReactNode;
  onPress: () => void;
}

const windowWidth = Dimensions.get('window').width;

const SmallButton = (props: ButtonProps) => {
  return (
    <Button {...props} style={[props.style, styles.button]} mode='outlined' theme={undefined}>
      {props.children}
    </Button>
  );
};
const styles = StyleSheet.create({
  button: {
    width: windowWidth / 3,
  },
});
export default SmallButton;
