import React, { useState } from 'react';
import { GestureResponderEvent, StyleSheet } from 'react-native';
import { Surface, Text } from 'react-native-paper';
import { Profile } from '../../Data/profile';

interface Props {
  children?: React.ReactNode;
  onTouchedEnd?: (event: GestureResponderEvent) => void;
  isActive: boolean;
}

const AvatarCard = (props: Props) => {
  const [isActive, setIsActive] = useState(false);
  const checkActive = () => {
    setIsActive(!isActive);
  };
  return (
    <Surface
      style={[styles.surface, { backgroundColor: props.isActive ? 'pink' : '#EDF3F3' }]}
      elevation={4}
      onTouchEnd={props.onTouchedEnd}
    >
      <Text style={styles.text}>{props.children}</Text>
    </Surface>
  );
};

export default AvatarCard;

const styles = StyleSheet.create({
  surface: {
    padding: 8,
    height: 70,
    width: 70,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    elevation: 9,
    marginTop: 20,
    margin: 10,
  },
  text: {
    fontSize: 40,
  },
});
