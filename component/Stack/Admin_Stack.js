import   React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from "../Comon_Screen/Home"
import logout from "../Comon_Screen/logout";

const Drawer  = createDrawerNavigator();

     export  const Admin_Stack =()=> (
    <Drawer.Navigator  initialRouteName="Home" >
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="logout" component={logout} options={{headerShown: false}} />
    </Drawer.Navigator>
 )
