import React, { FunctionComponent, ReactNode } from "react";

import {
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";

interface ButtonProps {
  children?: ReactNode;
  onPress?: (event: GestureResponderEvent) => void;
}

const ChoreCard: FunctionComponent<ButtonProps> = (props) => {
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
      borderRadius: 10,
      backgroundColor: "#F3F8F8",
      padding: 10,
      shadowColor: "1px 2px 4px rgba(0, 0, 0, 0.15)",
      shadowOpacity: 0.8,
      elevation: 6,
      shadowRadius: 15,
      shadowOffset: { width: 1, height: 5 },
      width: dimensions.width - 20,
      paddingBottom: 10,
      minHeight: 50,
    },
  });
  return { styles };
};

export default ChoreCard;
