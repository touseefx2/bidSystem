import   React from 'react';
import { Dimensions} from "react-native";
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from "../Comon_Screen/Home"
import logout from "../Comon_Screen/logout";
 
import allOther from "../other/allOther";
import CustomDrawerContent from "../Comon_Screen/CustomDrawerContent";
import AntDesign from 'react-native-vector-icons/AntDesign';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Profile from "../Comon_Screen/Profile"
import Active_Product from "../Bidder_Stack_Screen/Active_Product";
import History_Product from "../Bidder_Stack_Screen/History_Product";
import View_Products from "../Bidder_Stack_Screen/View_Products";
import Histroys from "../Bidder_Stack_Screen/Historys" 


import { createStackNavigator } from '@react-navigation/stack';

 
import Auction from "../Bidder_Stack_Screen/Auction"
 
import PurchaseBid from "../Bidder_Stack_Screen/PurchaseBid"

const headerColor="#307ecc"
const headerTextColor="white"
const iconfocuscolor="orange"
const iconSize=25
const iconunfocuscolor="#307ecc"
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
 

const Drawer  = createDrawerNavigator();

   export  const Bidder_Stack =()=> (
    <Drawer.Navigator  
    initialRouteName="Home"
    defaultStatus={"closed"}
    detachInactiveScreens={true}
    drawerContent={props => <CustomDrawerContent {...props}/>}
    >
    
        <Drawer.Screen  name="Home" component={Home} options={homeIcon} />
        <Drawer.Screen name="Profile" component={Profile}  options={profileIcon}  />
        <Drawer.Screen name="Auction" component={Auction_Stack}  options={auctionIcon}  />
         <Drawer.Screen name="History" component={History_Stack}  options={auctionIcon}  />

        <Drawer.Screen name="Purchase Bid" component={PurchaseBid}  options={prchs_icon} />
      
        <Drawer.Screen name="Logout" component={logout}  options={logoutIcon}  />
    </Drawer.Navigator>
 )

 


 const Stack = createStackNavigator();

 

 

 
const Auction_Stack = ()=> 
{
    return(
   <Stack.Navigator 
       initialRouteName="Auctions"
       screenOptions={{
         animationEnabled: true
       }}
       headerMode='none'
   >

       <Stack.Screen name="Auctions" component={Auction} />
       <Stack.Screen name="Active_Products"   component={Active_Product}  />
       <Stack.Screen name="View_Products"   component={View_Products}  />
       
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
 
 const homeIcon = {
  headerStyle: {
    backgroundColor: headerColor, //Set Header color
},
headerTintColor: headerTextColor, //Set Header text color
headerTitleStyle: {
    fontWeight: 'bold', //Set Header text style
},
 
  drawerIcon: ({ focused, size }) => (
    <AntDesign
      name="home"
      size={iconSize}
      color={focused ? iconfocuscolor : iconunfocuscolor}
     
    />
  )
}

const logoutIcon = {
  headerShown: false,
  drawerIcon: ({ focused, size}) => (
    <SimpleLineIcons
      name="logout"
      size={iconSize}
      color={focused ? iconfocuscolor : iconunfocuscolor}  
    />
  )
}

const  product_icon = {
  headerStyle: {
    backgroundColor: headerColor, //Set Header color
},
headerTintColor: headerTextColor, //Set Header text color
headerTitleStyle: {
    fontWeight: 'bold', //Set Header text style
},
 
  drawerIcon: ({ focused, size }) => (
    <Ionicons
      name="add-circle-outline"
      size={iconSize}
      color={focused ? iconfocuscolor : iconunfocuscolor}
     
    />
  )
}

const  prchs_icon = {
  unmountOnBlur:true,
  headerStyle: {
    backgroundColor: headerColor, //Set Header color
},
headerTintColor: headerTextColor, //Set Header text color
headerTitleStyle: {
    fontWeight: 'bold', //Set Header text style
},
 
  drawerIcon: ({ focused, size }) => (
    <AntDesign
      name="shoppingcart"
      size={iconSize}
      color={focused ? iconfocuscolor : iconunfocuscolor}
     
    />
  )
}

const  history_icon = {
  headerStyle: {
    backgroundColor: headerColor, //Set Header color
},
headerTintColor: headerTextColor, //Set Header text color
headerTitleStyle: {
    fontWeight: 'bold', //Set Header text style
},
 
  drawerIcon: ({ focused, size }) => (
    <Ionicons
      name="add-circle-outline"
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