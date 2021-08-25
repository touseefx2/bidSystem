import   React from 'react';
import { Dimensions} from "react-native";
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from "../Comon_Screen/Home"
import logout from "../Comon_Screen/logout";
import Products  from "../Vendor_Stack_Screen/Add_Products"
import Auction from "../Vendor_Stack_Screen/Auction"
import UpdateProduct from "../Vendor_Stack_Screen/Update_Product"
import CustomDrawerContent from "../Comon_Screen/CustomDrawerContent";
import allOther from "../other/allOther";
import History_Product from "../Vendor_Stack_Screen/History_Product";
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import View_Products from "../Vendor_Stack_Screen/View_Products"
import Profile from "../Comon_Screen/Profile"
import Histroys from "../Vendor_Stack_Screen/Historys"

const headerColor="#307ecc"
const headerTextColor="white"
const iconfocuscolor="orange"
const iconSize=25
const iconunfocuscolor="#307ecc"
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
 

const Drawer  = createDrawerNavigator();

   export  const Vendor_Stack =()=> (
    <Drawer.Navigator  
    initialRouteName="Home"
    defaultStatus={"closed"}
    detachInactiveScreens={true}
    drawerContent={props => <CustomDrawerContent {...props}/>}
    >
    
        <Drawer.Screen  name="Home" component={Home} options={homeIcon} />
         <Drawer.Screen name="Profile" component={Profile}  options={profileIcon}  />
         <Drawer.Screen name="Auctions" component={Auction_Stack}  options={add_product_icon} />
         {/* <Drawer.Screen name="Status" component={ProducStatus_Stack}  options={productStatus_icon} /> */}
         <Drawer.Screen name="History" component={History_Stack}  options={auctionIcon}  />
        <Drawer.Screen name="Logout" component={logout}  options={logoutIcon}  />
    </Drawer.Navigator>
 )

 


 const Stack = createStackNavigator();

  const Auction_Stack = ()=> 
{
    return(
   <Stack.Navigator 
       initialRouteName="Auction"
       screenOptions={{
         animationEnabled: true
       }}
       headerMode='none'
   >

      <Stack.Screen name="Auctiion" component={Auction} />
       <Stack.Screen name="Add_Products" component={Products} />
       <Stack.Screen name="Update_Product" component={UpdateProduct}  />
        
  
   </Stack.Navigator>
    )
}

const History_Stack = ()=> 
{
    return(
   <Stack.Navigator 
       initialRouteName="Historys"
       screenOptions={{
         animationEnabled: true
       }}
       headerMode='none'
   >

       <Stack.Screen name="Histroys" component={Histroys} />
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

const add_product_icon = {
  headerStyle: {
    backgroundColor: headerColor, //Set Header color
},
headerTintColor: headerTextColor, //Set Header text color
headerTitleStyle: {
    fontWeight: 'bold', //Set Header text style
},
 
  drawerIcon: ({ focused, size }) => (
    <allOther.vectorIcon.MaterialCommunityIcons
      name="sale"
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

const auctionIcon = {
  headerStyle: {
    backgroundColor: headerColor, //Set Header color
},
headerTintColor: headerTextColor, //Set Header text color
headerTitleStyle: {
    fontWeight: 'bold', //Set Header text style
},
  drawerIcon: ({ focused, size}) => (
    <allOther.vectorIcon.Fontisto
      name="user-secret"   
      size={iconSize}
      color={focused ? iconfocuscolor : iconunfocuscolor}  
    />
  )
}
