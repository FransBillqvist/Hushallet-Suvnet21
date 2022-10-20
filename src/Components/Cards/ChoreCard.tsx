import * as React from 'react';
import { Surface } from 'react-native-paper';
import { StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;

interface Props {
  children?: React.ReactNode;
}

const ChoreCard = (props: Props) => {
  return <Surface style={styles.surface}>{props.children}</Surface>;
};

const styles = StyleSheet.create({
  surface: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    minHeight: 50,
    width: windowWidth - 20,
    padding: 10,
  },
});

export default ChoreCard;
