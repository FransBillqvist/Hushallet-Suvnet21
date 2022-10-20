import React, { ReactNode } from 'react';
import { Button } from 'react-native-paper';
import { StyleSheet, Dimensions } from 'react-native';

interface Props {
  children?: ReactNode;
  onPress: () => void;
  icon?: string;
  disabled?: boolean;
}

const windowWidth = Dimensions.get('window').width;

const HugeButton = (props: Props) => {
  return (
    <Button
      icon={props.icon}
      onPress={props.onPress}
      mode='outlined'
      disabled={props.disabled}
      style={styles.button}
    >
      {props.children}
    </Button>
  );
};
const styles = StyleSheet.create({
  button: {
    width: windowWidth - 20,
  },
});
export default HugeButton;
