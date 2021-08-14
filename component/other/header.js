import React  from "react";
import { View,StyleSheet,Image, TouchableOpacity,Text} from "react-native";
import allOther from "./allOther";
 
 

export   function Header (props) {

  let headerTitle=props.title || "";
  let st=props.st || ""
 
 

    return(

<View style={{backgroundColor:null,marginTop:10,marginLeft:5,flexDirection:"row" }}>
<allOther.vectorIcon.Ionicons  name="arrow-back-outline" size={35} color="#15756c" onPress={()=>props.nav.goBack()} /> 
<View>
<Text style={styles.title}>{headerTitle}</Text>
<Text style={styles.stitle}>{st}</Text>
</View>
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
        fontSize:25,
        fontWeight:"bold",
        marginLeft:30,
        color:"black",
        textTransform:"capitalize"
      },
      stitle:{
        fontSize:20,
        marginLeft:30,
        color:"silver",
        textTransform:"capitalize"
      }
  })
  