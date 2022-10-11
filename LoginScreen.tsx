import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button, StyleSheet, Text, View } from 'react-native';
import { RootStackParamList } from './RootNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'LoginScreen'>;

function LoginScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text>Login and register page</Text>
      <Button title='Log in' onPress={() => navigation.navigate('HomeScreen')}></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default LoginScreen;
