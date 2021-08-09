import React  from "react"
import { View,Text,Image,StyleSheet,TouchableOpacity, LogBox} from "react-native";
import { ScrollView } from 'react-native-gesture-handler';
import { DrawerContentScrollView,DrawerItemList,  DrawerItem, } from '@react-navigation/drawer';
import { connect } from "react-redux";
import Fontisto from 'react-native-vector-icons/Fontisto';
import {Spinner} from 'native-base';
 
 function CustomDrawerContent (props) { 
  const [is,setis] = React.useState("");
  let name = props.userData.user.name || ""
  let photo = props.userData.user.photo  ? {uri:props.userData.user.photo } : require("../../assets/dp.png")

    return(  
        <DrawerContentScrollView style={{backgroundColor:"white"}} >
            <View style={{ backgroundColor:"#307ecc",marginTop:-5}}>

<View style={{ justifyContent:"center",alignItems:"center"}}>

<Image  onLoadStart={()=>{setis("loading")}} onLoad={()=>{setis("loaded")}} style={styles.avatar} source={photo}/>
            {is == "loading" ?( <Spinner style={{position:"absolute",marginTop:10}} size="large" color="#307ecc"/>) : null}
<View style={{margin:5,flexShrink:1}}>

{name.length > 30
              ? ( <Text style={styles.name}>{`${name.substring(0,30)}..`}</Text>   ) 
              : <Text style={styles.name}>{name}</Text>}
</View>
</View>
 
            </View>

            <View style={{marginTop:50,backgroundColor:"white"}}>
            <DrawerItemList   {...props}  />
             </View>
        </DrawerContentScrollView>
                                   );
                               

}
const styles = StyleSheet.create({
                                  
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  //  borderWidth: 2,
  //  borderColor: "black",
    marginTop:5
  },
  name:{fontSize:15.5,fontWeight:"bold",color:"white",textTransform:"capitalize"}
})


const mapStateToProps = state => ({
  userData: state.userReducer
});

export default connect(
  mapStateToProps,
null
)(CustomDrawerContent);

