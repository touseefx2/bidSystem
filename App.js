import 'react-native-gesture-handler';
import React from "react";
//  import  Loading from "./component/Comon_Screen/SplashScreen";
import NetInfo from "@react-native-community/netinfo";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { connect} from 'react-redux'
import allStack from "./component/Stack/allStack"
import allOther from "./component/other/allOther";
import CheckVerification from "./component/Comon_Screen/CheckVerification";
 import Block from "./component/Comon_Screen/Block"
 import SplashScreen from 'react-native-splash-screen'
 import auth from '@react-native-firebase/auth';

const RootStack = createStackNavigator();

 class App extends React.Component {
 
  

handleConnectivityChange = state => {
  if (state.isConnected) {
  } else {
   allOther.AlertMessage( "No internet connection","Please connect internet.")
  }
};

componentDidMount() { 
  NetInfo.addEventListener(this.handleConnectivityChange);
}

 

render()
{
 
  const{userData}=this.props;
  
  // console.log("ud : ",userData)

 

   return ( 
    
  <NavigationContainer>
 <RootStack.Navigator  screenOptions={{headerShown: false}} >

     {(userData.length<=0 || userData.user.length<=0 || userData.user==[] ) && (
      <RootStack.Screen name='Login_Stack' component={allStack.Login_Stack}/> 
      )} 

{(userData.user  &&  userData.user.block== true ) && (
    <RootStack.Screen name='Block' component={Block}/>
     )}

 
 {/* {(userData.user  && userData.user.type!="admin"   &&  userData.user.emailVerified==false ) && (
    <RootStack.Screen name='CheckVerification' component={CheckVerification}/>
     )}

  
     {(userData.user && userData.user.type=="vendor" &&  userData.user.block==false && userData.user.emailVerified==true) && (
    <RootStack.Screen name='Vendor_Stack' component={allStack.Vendor_Stack}/>
     )}   

{(userData.user && userData.user.type=="bidder" &&  userData.user.block==false   && userData.user.emailVerified==true ) && (
    <RootStack.Screen name='Bidder_Stack' component={allStack.Bidder_Stack}/>
     )} 
 
    {(userData.user && userData.user.type=="admin"  ) && (
        <RootStack.Screen name='Admin_Stack' component={allStack.Admin_Stack}/>
        )} */}


     {(userData.user && userData.user.type=="vendor" &&  userData.user.block==false ) && (
    <RootStack.Screen name='Vendor_Stack' component={allStack.Vendor_Stack}/>
     )}   

{(userData.user && userData.user.type=="bidder" &&  userData.user.block==false ) && (
    <RootStack.Screen name='Bidder_Stack' component={allStack.Bidder_Stack}/>
     )} 
 
    {(userData.user && userData.user.type=="admin") && (
        <RootStack.Screen name='Admin_Stack' component={allStack.Admin_Stack}/>
        )} 
 


</RootStack.Navigator>
    </NavigationContainer>

   )
 

}}


const mapStateToProps = state => ({
  userData: state.userReducer
});


export default connect(
  mapStateToProps,
 null
)(App);
