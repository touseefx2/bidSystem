import   React from 'react';
import { Dimensions} from "react-native";
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from "../Comon_Screen/Home"
import logout from "../Comon_Screen/logout";
import Vendors  from "../Admin_Stack_Screen/Vendors"
import Bidders  from "../Admin_Stack_Screen/Bidders"
import ViewVendors from "../Admin_Stack_Screen/ViewVendors"
import CustomDrawerContent from "../Comon_Screen/CustomDrawerContent";
import allOther from "../other/allOther";
import Active_Product from "../Admin_Stack_Screen/Active_Product";
import History_Product from "../Admin_Stack_Screen/History_Product";
import Request  from "../Admin_Stack_Screen/Request"
import View_Request from "../Admin_Stack_Screen/View_Request"
import Auction from "../Admin_Stack_Screen/Auction"
import View_Products from "../Admin_Stack_Screen/View_Products";
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View } from 'native-base';
import Profile from "../Comon_Screen/Profile"

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
         <Drawer.Screen name="Profile" component={Profile}  options={profileIcon}  />
         <Drawer.Screen name="Auction" component={Auction}  options={auctionIcon}  />
         <Drawer.Screen name="Vendors" component={Vendor_Stack}  options={vendor_icon} />
         <Drawer.Screen name="Bidders" component={Bidder_Stack}  options={bidder_icon} />
         <Drawer.Screen name="Request" component={Request_Stack}  options={request_icon} />
         <Drawer.Screen name="Auction Status" component={ProducStatus_Stack}  options={productStatus_icon} />
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

const Bidder_Stack = ()=> 
{
    return(
   <Stack.Navigator 
       initialRouteName="Bidders"
       screenOptions={{
         animationEnabled: true
       }}
       headerMode='none'
   >

       <Stack.Screen name="Bidders" component={Bidders} />
       <Stack.Screen name="ViewVendors" component={ViewVendors}  />
        
  
   </Stack.Navigator>
    )
}


const ActiveProducts_Stack = ()=> 
{
    return(
   <Stack.Navigator 
       initialRouteName="Active_Products"
       screenOptions={{
         animationEnabled: true
       }}
       headerMode='none'
   >

       <Stack.Screen name="Active_Products" component={Active_Product} />
       <Stack.Screen name="View_Products"   component={View_Products}  />
        
  
   </Stack.Navigator>
    )
}


const HistoryProducts_Stack = ()=> 
{
    return(
   <Stack.Navigator 
       initialRouteName="History_Products"
       screenOptions={{
         animationEnabled: true
       }}
       headerMode='none'
   >

       <Stack.Screen name="History_Products" component={History_Product} />
       <Stack.Screen name="View_Products"   component={View_Products}  />
        
  
   </Stack.Navigator>
    )
}

const Tab =  createMaterialTopTabNavigator();

const ProducStatus_Stack = ()=> 
{
  
    return (
      <Tab.Navigator initialRouteName="Active_Product">
        <Tab.Screen name="Active" component={ActiveProducts_Stack} />
        <Tab.Screen name="History" component={HistoryProducts_Stack} />
      </Tab.Navigator>
    )
  
}

 

const Request_Stack = ()=> 
{
  return(
 <Stack.Navigator 
     initialRouteName="Request"
     screenOptions={{
       animationEnabled: true
     }}
     headerMode='none'
 >

     <Stack.Screen name="Request" component={Request} />
     <Stack.Screen name="View_Request" component={View_Request}  />
      

 </Stack.Navigator>
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

const profileIcon = {
  headerShown: false,
  drawerIcon: ({ focused, size}) => (
    <allOther.vectorIcon.Fontisto
      name="person"   
      size={iconSize}
      color={focused ? iconfocuscolor : iconunfocuscolor}  
    />
  )
}

const auctionIcon = {
  headerShown: false,
  drawerIcon: ({ focused, size}) => (
    <allOther.vectorIcon.Fontisto
      name="user-secret"   
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

const bidder_icon = {
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

const request_icon = {
  headerStyle: {
    backgroundColor: headerColor, //Set Header color
},
headerTintColor: headerTextColor, //Set Header text color
headerTitleStyle: {
    fontWeight: 'bold', //Set Header text style
},
 
  drawerIcon: ({ focused, size }) => (
    <allOther.vectorIcon.Ionicons
      name="add-circle-outline"
      size={iconSize}
      color={focused ? iconfocuscolor : iconunfocuscolor}
     
    />
  )
}
