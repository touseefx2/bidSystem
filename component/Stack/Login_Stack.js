import React  from 'react';
import  LoginScreen from "../Login_Stack_Screen/LoginScreen";
import  SignupScreen_V from '../Login_Stack_Screen/SignupScreen_V';
import  SignupScreen_B from '../Login_Stack_Screen/SignupScreen_B';
import  ForgotPassword from "../Login_Stack_Screen/ForgotPassword"
import { createStackNavigator } from '@react-navigation/stack';

//login flow
const Stack = createStackNavigator();

 export  const Login_Stack =()=> (
    <Stack.Navigator 
        initialRouteName="LoginScreen"
        screenOptions={{
          animationEnabled: false
        }}
        headerMode='none'
    >
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="SignupScreen_V" component={SignupScreen_V} />
        <Stack.Screen name="SignupScreen_B" component={SignupScreen_B} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
    </Stack.Navigator>
 )


 


