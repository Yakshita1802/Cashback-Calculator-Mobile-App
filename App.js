import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import WelcomeScreen from './components/WelcomeScreen';
//import Cards from './components/Cards';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Wallet from './components/Wallet';

/*export default function App() {
  return (
    <View style={styles.container}>
      <WelcomeScreen/>
      {/* <Text style={styles.titleText}>Cashback Calculator</Text> */
     /* <StatusBar style="auto" />
    </View>
  );
}*/


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    //justifyContent: 'center',
  },
  titleText: {
    fontSize:25,
    fontWeight:'bold',
  }
});

const navigator = createStackNavigator(
  {
  Home : WelcomeScreen,
  SignUp : SignUp,
  Login : Login,
  Wallet : Wallet
  },
  {
      initialRouteName: 'Home',
      defaultNavigationOptions:{
          title : 'App'
      }
  }
);
export default createAppContainer(navigator);