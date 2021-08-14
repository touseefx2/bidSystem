import React, { Component } from "react";
import {View,Text,Image} from "react-native";
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-community/async-storage';
import auth from '@react-native-firebase/auth';
import allOther from "../other/allOther"


const title= "Bidding System"
const Lottie =  "../../assets/bid_lottie.json"
const image=  "../../assets/signupLogo.png"
//colors
const containerBackgroundColor=  "#e6e6e6"  
const dmcontainerBackgroundColor=   "#1f1f1f"

 export default class SplashScreen extends Component {

  constructor(props)
  {
  super(props);
  this.state=
  {
  darkMode:null,
  setUserData:false,
  uid:null,
  };
   
  }
   

  getDarkModeData = async () => {
    try {
      const value = await AsyncStorage.getItem('darkMode')
      if(value !== null) {
        const v= JSON.parse(value)
       this.setState({darkMode:v})
      }else this.setState({darkMode:false})
    } catch(e) {
      console.log(e)
    }
  }

  chkusr()
    {
        this.unsuscribeAuth =   auth().onAuthStateChanged( async (user)=> {
          if (user) { 
            this.setState({setUserData:true,uid:user.uid})
        }  
     });
    }
  
    componentWillUnmount()
    {
        if(this.unsuscribeAuth) {
          this.unsuscribeAuth();
          }
    }

componentDidMount(){
  this.chkusr();
  this.getDarkModeData()
      }

    
  render() {
     const {darkMode,setUserData,uid} = this.state;

    return (
      <View style={{flex:1,backgroundColor:!darkMode?containerBackgroundColor:dmcontainerBackgroundColor}}>
 
 {setUserData   && <allOther.firebase.FireBaseFunction type={"set-user-data"} uid={uid} /> } 
 
<View style={{alignSelf:"center",marginTop:"8%"} }>

<View style={{flexDirection:"row",alignSelf:"center",alignItems:"center",marginLeft:5} }>
<Text style={{fontSize:44,color:"#16aed9" ,fontWeight:"bold",fontStyle:"italic"}} >O</Text>      
<Text style={{fontSize:27,color:"#307ecc" ,fontWeight:"bold",fontStyle:"italic",marginTop:9}} >nline</Text> 
<Image source={require(image)} style={{width:70,height:50}} />
  </View>
 
      <Text style={{fontSize:28,color:"#307ecc" ,fontWeight:"bold",fontStyle:"italic"}} >
       {title} 
    </Text>      
  </View>


 <LottieView  style={{marginTop:"5%"}} source={require(Lottie)} autoPlay loop />
 
         

        </View>
    );
  }
}


 
 
 
 
  
  