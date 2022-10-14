import React, { FunctionComponent, ReactNode } from 'react';

import {
  Pressable,
  Text,
  GestureResponderEvent,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';

interface ButtonProps {
  children: ReactNode;
  onPress: (event: GestureResponderEvent) => void;
}

const SmallButton: FunctionComponent<ButtonProps> = (props) => {
  const { styles } = useStyle();
  return (
    <Pressable style={styles.pressable} onPress={props.onPress}>
      <Text>{props.children}</Text>
    </Pressable>
  );
};

const useStyle = () => {
  const dimensions = useWindowDimensions();
  const styles = StyleSheet.create({
    pressable: {
      borderRadius: 25,
      backgroundColor: '#F3F8F8',
      padding: 10,
      shadowColor: 'rgba(0, 0, 0, 0.1)',
      shadowOpacity: 0.8,
      elevation: 6,
      shadowRadius: 15,
      shadowOffset: { width: 1, height: 5 },
      alignItems: 'center',
      alignContent: 'space-between',
      width: dimensions.width / 3,
    },
  });
  return { styles };
};

export default SmallButton;
