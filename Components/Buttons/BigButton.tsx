import React, { FunctionComponent, ReactNode } from "react";

import {
  Pressable,
  Text,
  GestureResponderEvent,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";

interface ButtonProps {
  children: ReactNode;
  onPress: (event: GestureResponderEvent) => void;
}

const BigButton: FunctionComponent<ButtonProps> = (props) => {
  const { styles } = useStyle();
  return (
    <Pressable style={styles.pressable} onPress={props.onPress}>
      <View style={{ alignItems: "center", flexDirection: "row" }}>
        <Text style={{ textAlign: "center" }}>{props.children}</Text>
      </View>
    </Pressable>
  );
};

const useStyle = () => {
  const dimensions = useWindowDimensions();
  const styles = StyleSheet.create({
    pressable: {
      borderRadius: 25,
      backgroundColor: "#F3F8F8",
      padding: 10,
      shadowColor: "rgba(0, 0, 0, 0.1)",
      shadowOpacity: 0.8,
      elevation: 6,
      shadowRadius: 15,
      shadowOffset: { width: 1, height: 5 },
      textAlignVertical: "center",
      width: dimensions.width / 2,
      paddingBottom: 10,
    },
  });
  return { styles };
};

export default BigButton;
