import React, { useEffect, useState,useRef} from 'react';
import { View,TouchableOpacity,Text,Dimensions,StyleSheet,ScrollView,Animated,TextInput ,Alert,Image,StatusBar} from "react-native";
import  allOther from "../other/allOther"
import {useSelector  } from 'react-redux'
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
  
  export default  function  Block(){
 
 
  const [logout, setlogout] = useState(true)
  const userData = useSelector(state => state.userReducer)
 
  useEffect(()=>{
 
  allOther.AlertMessage("","Sorry \n \n You have block/delete from admin")
 
  },[])

 
 
 
return(
  <View style={{flex:1,backgroundColor:"white"}}>
    <StatusBar hidden={true} />    
    {logout && <allOther.firebase.FireBaseFunction type={"logout-user"}  />}   
  </View>   
)
     }
 
  
 
  const styles = StyleSheet.create({  
  
  });  