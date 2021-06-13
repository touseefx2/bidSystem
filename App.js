import 'react-native-gesture-handler';
import React from "react";
import SplashScreen from "./component/Comon_Screen/SplashScreen";
import NetInfo from "@react-native-community/netinfo";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { connect} from 'react-redux'
import allStack from "./component/Stack/allStack"
import allOther from "./component/other/allOther";
// import auth from '@react-native-firebase/auth';
// import database from '@react-native-firebase/database';
// import firestore from '@react-native-firebase/firestore';
 
 

 
const RootStack = createStackNavigator();

 class App extends React.Component {
 
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

handleConnectivityChange = state => {
  if (state.isConnected) {
  } else {
   allOther.AlertMessage( "No internet connection","Please connect internet.")
  }
};

componentDidMount() {
  NetInfo.addEventListener(this.handleConnectivityChange);
  
  setTimeout(() => {
    this.setState({loading:false})
  }, 2000);


}
 
render()
{
  const {loading} = this.state;
  const{userData}=this.props;
  
  console.log("user data :::: ",userData)
 
  if (loading) 
  {
    return  <SplashScreen />
  }

  else if (!loading) 
  {

   return (  
   <NavigationContainer>
 <RootStack.Navigator  screenOptions={{
    headerShown: false
  }}>

     {(userData.length<=0 || userData.user.length<=0 ) && (
      <RootStack.Screen name='Login_Stack' component={allStack.Login_Stack}/> 
      )} 

    {(userData.user && userData.user.type=="user") && (
    <RootStack.Screen name='User_Stack' component={allStack.User_Stack}/>
     )}   
 
    {(userData.user && userData.user.type=="admin") && (
        <RootStack.Screen name='Admin_Stack' component={allStack.Admin_Stack}/>
        )}


</RootStack.Navigator>
    </NavigationContainer>

   )
  }

}}


const mapStateToProps = state => ({
  userData: state.userReducer
});


export default connect(
  mapStateToProps,
 null
)(App);
