import React, { useState } from 'react';
import { Surface, Text } from 'react-native-paper';
import { StyleSheet } from 'react-native';

interface Props {
  children?: React.ReactNode;
}

const AvatarCard = (props: Props) => {
  const [isActive, setIsActive] = useState(false);
  const checkActive = () => {
    setIsActive(!isActive);
  };
  return (
    <Surface
      style={[styles.surface, { backgroundColor: isActive ? 'pink' : '#EDF3F3' }]}
      elevation={4}
      onTouchEnd={checkActive}
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
