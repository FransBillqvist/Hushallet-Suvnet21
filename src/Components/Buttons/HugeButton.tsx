import React from 'react';
import { Button } from 'react-native-paper';
import { Props } from 'react-native-paper/lib/typescript/components/Button/Button';
import { StyleSheet, Dimensions } from 'react-native';

interface ButtonProps extends Props {}

const windowWidth = Dimensions.get('window').width;

const HugeButton = (props: ButtonProps) => {
  return (
    <Button
      {...props}
      style={[props.style, styles.button]}
      mode='outlined'
      theme={undefined}
    ></Button>
  );
};
const styles = StyleSheet.create({
  button: {
    width: windowWidth - 20,
  },
});
export default HugeButton;
