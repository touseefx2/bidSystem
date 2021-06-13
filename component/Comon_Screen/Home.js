import React, { Component } from "react";
import { View,TouchableOpacity,Text} from "react-native";
 import { connect} from 'react-redux'
 
 
 class  Home extends Component  {
  
  
render(){
 const {userData}= this.props;
return(
      <View style={{flex:1,justifyContent:"center",alignItems:"center",backgroundColor:"white"}}>  
 
<TouchableOpacity >


<View style={{alignSelf:"center",alignItems:"center"}}>
<Text style={{fontSize:45,textTransform:"capitalize"}}>welcome</Text>
<Text style={{fontSize:45,textTransform:"capitalize"}}>{userData.user.name}</Text>
</View>


</TouchableOpacity>

      </View>
)
     }

  }
 
  const mapStateToProps = state => ({
      userData: state.userReducer
    });
  
    export default connect(
      mapStateToProps,
   null
    )(Home);
 