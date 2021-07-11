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
 

  export default  function  History_Product(props)  {

    const [loader, setloader] = useState(false)

   
return(
  <View style={{flex:1}}>
  <allOther.Loader loader={loader}/>

 <ScrollView  >
         
        
           {/* RenderProducts() */}
               

 

</ScrollView>    

 
  
 
</View>   
)
 
     }
 
      
  const styles = StyleSheet.create({  
  
  
  
  });  