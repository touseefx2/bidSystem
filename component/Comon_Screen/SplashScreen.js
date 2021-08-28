import React, { Component } from "react";
import AsyncStorage from '@react-native-community/async-storage';
import auth from '@react-native-firebase/auth';
import allOther from "../other/allOther"


 
 export default class Loading extends Component {

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
     const {setUserData,uid} = this.state;

     if(setUserData)
     {
       return(
          <allOther.firebase.FireBaseFunction type={"set-user-data"} uid={uid} />
       )
     }else
    return (
    null
    );
  }
}


 
 
 
 
  
  