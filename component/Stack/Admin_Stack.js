import   React from 'react';
import { Dimensions} from "react-native";
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from "../Comon_Screen/Home"
import logout from "../Comon_Screen/logout";
import Vendors  from "../Admin_Stack_Screen/Vendors"
import ViewVendors from "../Admin_Stack_Screen/ViewVendors"
import CustomDrawerContent from "../Comon_Screen/CustomDrawerContent";
import allOther from "../other/allOther";
import Active_Product from "../Admin_Stack_Screen/Active_Product";
import History_Product from "../Admin_Stack_Screen/History_Product";
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View } from 'native-base';


const headerColor="#307ecc"
const headerTextColor="white"
const iconfocuscolor="orange"
const iconSize=25
const iconunfocuscolor="#307ecc"
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
 

const Drawer  = createDrawerNavigator();

   export  const Admin_Stack =()=> (
    <Drawer.Navigator  
    initialRouteName="Home"
    defaultStatus={"closed"}
    detachInactiveScreens={true}
    drawerContent={props => <CustomDrawerContent {...props}/>}
    >
    
        <Drawer.Screen  name="Home" component={Home} options={homeIcon} />
         <Drawer.Screen name="Vendors" component={Vendor_Stack}  options={vendor_icon} />
         <Drawer.Screen name="Status" component={ProducStatus_Stack}  options={productStatus_icon} />
        <Drawer.Screen name="Logout" component={logout}  options={logoutIcon}  />
    </Drawer.Navigator>
 )

 


 const Stack = createStackNavigator();

  const Vendor_Stack = ()=> 
{
    return(
   <Stack.Navigator 
       initialRouteName="Vendors"
       screenOptions={{
         animationEnabled: true
       }}
       headerMode='none'
   >

       <Stack.Screen name="Vendors" component={Vendors} />
       <Stack.Screen name="ViewVendors" component={ViewVendors}  />
        
  
   </Stack.Navigator>
    )
}


const Tab =  createMaterialTopTabNavigator();

const ProducStatus_Stack = ()=> 
{
  
    return (
      <Tab.Navigator initialRouteName="Active_Product">
        <Tab.Screen name="Active" component={Active_Product} />
        <Tab.Screen name="History" component={History_Product} />
      </Tab.Navigator>
    )
  
}

 
 const homeIcon = {
  headerStyle: {
    backgroundColor: headerColor, //Set Header color
},
headerTintColor: headerTextColor, //Set Header text color
headerTitleStyle: {
    fontWeight: 'bold', //Set Header text style
},
 
  drawerIcon: ({ focused, size }) => (
    <allOther.vectorIcon.AntDesign
      name="home"
      size={iconSize}
      color={focused ? iconfocuscolor : iconunfocuscolor}
     
    />
  )
}

const logoutIcon = {
  headerShown: false,
  drawerIcon: ({ focused, size}) => (
    <allOther.vectorIcon.SimpleLineIcons
      name="logout"
      size={iconSize}
      color={focused ? iconfocuscolor : iconunfocuscolor}  
    />
  )
}

const vendor_icon = {
  headerStyle: {
    backgroundColor: headerColor, //Set Header color
},
headerTintColor: headerTextColor, //Set Header text color
headerTitleStyle: {
    fontWeight: 'bold', //Set Header text style
},
 
  drawerIcon: ({ focused, size }) => (
    <allOther.vectorIcon.Ionicons
      name="person-outline"
      size={iconSize}
      color={focused ? iconfocuscolor : iconunfocuscolor}
     
    />
  )
}

const productStatus_icon = {
  headerStyle: {
    backgroundColor: headerColor, //Set Header color
},
headerTintColor: headerTextColor, //Set Header text color
headerTitleStyle: {
    fontWeight: 'bold', //Set Header text style
},
 
  drawerIcon: ({ focused, size }) => (
    <allOther.vectorIcon.Zocial
      name="statusnet"
      size={iconSize}
      color={focused ? iconfocuscolor : iconunfocuscolor}
     
    />
  )
}