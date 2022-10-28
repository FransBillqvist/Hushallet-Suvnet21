import * as React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { Surface } from 'react-native-paper';
import { Chore } from '../../Data/chore';

const windowWidth = Dimensions.get('window').width;

interface Props {
  children?: React.ReactNode;
  chore?: Chore;
  style?: React.ComponentProps<typeof Surface>['style'];
}

const ChoreCard = (props: Props) => {
  return <Surface style={[styles.surface, props.style]}>{props.children}</Surface>;
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
    marginVertical: 5,
    borderRadius: 10,
  },
});

export default ChoreCard;
