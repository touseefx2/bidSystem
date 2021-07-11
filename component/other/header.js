import React  from "react";
import { View,StyleSheet,Image, TouchableOpacity,Text} from "react-native";
import allOther from "./allOther";
 
 

export   function Header (props) {

  let headerTitle=props.title || "";
 
 

    return(

<View style={{backgroundColor:null,marginTop:5,marginLeft:5,flexDirection:"row",alignItems:"center"}}>
<allOther.vectorIcon.Ionicons  name="arrow-back-outline" size={35} color="#15756c" onPress={()=>props.nav.goBack()} /> 
<Text style={styles.title}>{headerTitle}</Text>

</View>

    )
 
 

}



const styles = StyleSheet.create({
                                  
    avatar: {
      right:0,
      marginRight:10,    
      position:"absolute",
 
    } ,
   image: {
        width: 40,
        height: 40,
        borderRadius: 20,
      //  borderWidth: 2,
      //  borderColor: "black",
      } ,
      title:{
        fontSize:18,
        fontWeight:"bold",
        marginLeft:30,
        color:"#15756c",
        textTransform:"capitalize"
      }
  })
  