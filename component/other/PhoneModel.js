import React   from "react";
import { View,Image,Text} from "react-native";
import {phoneModelOptionTextColor} from "../Login_Stack_Screen/SignupScreen"
 
export function  PhoneModalComponent(props){
    return(
                <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
                <View style={{flexDirection:"row",alignItems:"center"}}>
                 <Image source={props.image} style={{width:28,height:28}} /> 
                 <Text style={{color:phoneModelOptionTextColor,fontSize:22,marginLeft:7}}>{props.countryCode}</Text>
                 </View>
                 <Text style={{color:phoneModelOptionTextColor,fontSize:18,textTransform:"capitalize" }}>({props.country})</Text>
                </View>
               
    )
  }

  
   