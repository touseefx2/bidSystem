import React, { useEffect, useState,useRef} from 'react';
import { View,TouchableOpacity,Text,Dimensions,StyleSheet,ScrollView,Animated,TextInput,Platform,Alert,Image} from "react-native";
import  allOther from "../other/allOther"
import Dialog, { DialogContent,DialogFooter,DialogButton,SlideAnimation,DialogTitle} from 'react-native-popup-dialog';
import ImagePicker from 'react-native-image-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import permissions from "../permissions/permissions"
import {productCategory} from "./Category"
import {useSelector  } from 'react-redux'
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import RNFetchBlob from 'rn-fetch-blob'
 
  export default  function  Home(props)  {

 
  const [setProductData, setsetProductData]         = useState(false)
  const [setAllVendorstData, setsetAllVendorstData] = useState(false)
  const [setAllProductstData, setsetAllProductstData] = useState(false)

  const userData = useSelector(state => state.userReducer)
  
  useEffect(()=>{
   if(userData.user.type=="vendor"){
        setsetProductData(true)
   }

   if(userData.user.type=="admin"){
      setsetAllVendorstData(true)
      setsetAllProductstData(true)
}

  },[])
 
     
return(
  <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
 
 {setProductData  && <allOther.firebase.FireBaseFunction type={"set-products-data"} uid={userData.user.uid} /> }   
 {setAllVendorstData && <allOther.firebase.FireBaseFunction type={"set-all-vendors-data"}  /> }   
 {setAllProductstData && <allOther.firebase.FireBaseFunction type={"set-all-products-data"}   /> } 

</View>   
)
     }
 
      
  const styles = StyleSheet.create({  
 
  
  });  