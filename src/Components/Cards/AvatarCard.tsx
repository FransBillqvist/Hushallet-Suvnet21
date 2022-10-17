import { InterfacePressableProps } from 'native-base/lib/typescript/components/primitives/Pressable/types';
import { ReactNode, useState } from 'react';
import { Text, StyleSheet } from 'react-native';
import { Pressable } from 'native-base';
import React from 'react';

interface Props extends InterfacePressableProps {
  children?: ReactNode;
}

const AvatarCard = (props: Props) => {
  const [isActive, setIsActive] = useState(false);
  const checkActive = () => {
    setIsActive(!isActive);
  };

  return (
    <Pressable
      onPressIn={checkActive}
      style={[styles.card, { backgroundColor: isActive ? 'pink' : '#EDF3F3' }]}
    >
      <Text style={styles.text}>{props.children}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    width: 60,
    height: 60,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
    margin: 10,
  },

  text: { fontSize: 40 },
});

export default AvatarCard;
