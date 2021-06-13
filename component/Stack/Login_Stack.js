import React  from 'react';
import  LoginScreen from "../Login_Stack_Screen/LoginScreen";
import  SignupScreen from '../Login_Stack_Screen/SignupScreen';
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
        <Stack.Screen name="SignupScreen" component={SignupScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
    </Stack.Navigator>
 )


 


