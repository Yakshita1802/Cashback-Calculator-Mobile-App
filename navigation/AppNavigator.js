// AppNavigator.js
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import WelcomeScreen from '../components/Welcome';
import SignupScreen from '../components/Signup';
import LoginScreen from '../components/Login';
import WalletScreen from '../components/Wallet';
import Profile from '../components/Profile';
import UserWallet from '../components/UserWallet';
import AddCard from '../components/AddCard';
import CardIssuerSelector from '../components/CardIssuerSelector'; 
import CardDetails from '../components/CardDetails';
import CategoryScreen from '../components/Category';
import RewardsCalculationScreen from '../components/RewardsCalculation';
const Stack = createStackNavigator();


const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Wallet" component={WalletScreen} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="UserWallet" component={UserWallet} />
        <Stack.Screen name="AddCard" component={AddCard} />
        <Stack.Screen name="CardIssuerSelector" component={CardIssuerSelector} />
        <Stack.Screen name="CardDetails" component={CardDetails} />
        <Stack.Screen name="Category" component={CategoryScreen} />
        <Stack.Screen name="RewardsCalculation" component={RewardsCalculationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};



export default AppNavigator;
