import React  from 'react';
import { View,StyleSheet,Keyboard} from "react-native";
import {Button, Appbar} from 'react-native-paper';
import { Item, Input ,Text } from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-community/async-storage';
import allOther from "../other/allOther"
import AwesomeAlert from 'react-native-awesome-alerts';
import NetInfo from "@react-native-community/netinfo";
import  MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


//fontSize
const InputFieldIconSize=20
const InputFieldFontSize=18
const headerFontSize=18
//color
const containerBackgroundColor=  "#e6e6e6"  
const dmcontainerBackgroundColor=   "#1f1f1f"

const headerColor="#307ecc"
const dmheaderColor="black"

const inputItemBackgroundColor= "white" 
const dminputItemBackgroundColor= "black"

const InputFieldTextColor= "black" 
const dmInputFieldTextColor= "white"

const InputFieldborderColor= "white" 
const dmInputFieldborderColor= "black";

const InputFieldborderErrorColor= "red" 
const dmInputFieldborderErrorColor= "#b81d1d"

const errorTextColor="red"
const dmerrorTextColor="#b81d1d"

const searchErrorTextColor="#307ecc"
const dmsearchErrorTextColor="#307ecc"

const InputFieldborderFocusColor="#307ecc"
const InputFieldIconColor="#307ecc"
const inputPlaceholderTextColor="silver"
//validation
let emailValidate=true


 export default class  ForgotPassword extends React.Component  {
  constructor(props)
  {
    super(props);
    
    this.state = {
        em:"",
        load:false,
        errmsg:"",
        rl:"F",
        darkMode:null,
        isInternetConnected:null,
        emailF:false,
        emailV:false,
        emailInputFieldborderColor:null,
    }
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

  focusField(field){
   
     if(field == "email")
     {
   
       this.setState({
         emailInputFieldborderColor:InputFieldborderFocusColor,
             })
      }
     }

     clearFields = () =>
{
  this.state = {
    em:"",
    load:false,
    errmsg:"",
    rl:"F",
    darkMode:null,
    isInternetConnected:null,
    emailF:false,
    emailV:false,
    emailInputFieldborderColor:null,
}
}
 
  handleInternetConnectivityChange = state => {
    if (state.isConnected) {
      this.setState({isInternetConnected:true})
    } else {
      this.setState({isInternetConnected:false})
    }
  };

  componentDidMount(){
    const {darkMode}=this.state;
    this.getDarkModeData()
    let  color= !darkMode?InputFieldborderColor:dmInputFieldborderColor
  
    this.setState({
  emailInputFieldborderColor:color,
      })

    this.unsubscribe = NetInfo.addEventListener(this.handleInternetConnectivityChange)
  }

  componentDidUpdate(pp,ps){
    const {darkMode}=this.state;
      
    if(ps.darkMode!=darkMode){
    
     let  color= !darkMode?InputFieldborderColor:dmInputFieldborderColor
    this.setState({
    emailInputFieldborderColor:color,
        })
      }
    }

  componentWillUnmount() {
    if (this.unsubscribe){this.unsubscribe()}
    this.clearFields()
    }

    renderShowInternetErrorAlert(title,message){
      const {showAlert}= this.state;
      return(
        <AwesomeAlert
        show={showAlert}
        showProgress={false}
        title={title}
        message={message}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showConfirmButton={true}
        confirmText="OK"
        confirmButtonColor="#DD6B55"
        onConfirmPressed={() => {
          this.setState({showAlert:false})
        }}
      />
      )
      }
  
 
chkacnt(e)
{
    auth().signInWithEmailAndPassword(e,"..")
    .catch((error)=>{
        var d =JSON.stringify(error.message);
        var s = JSON.parse(d);
        this.setState({errmsg:s}),
        console.log(s);
        //alert(s);
})

}

checkEmptyFields= ( email )=>
{
  //validation
  {email !="" && ( emailValidate     = allOther.Validation.EmailValidate(email) )}  
    
    this.setState({
      emailV: emailValidate ? false : true ,
    })
  
    if(email=="" ){
      this.setState({
        emailF:email=="" ? true : false,
      })
      return false;
    } else{
      return true;
    }

 
 


 
}

click(e,isInternetConnected)
  {
   const {darkMode} = this.state;
  emailValidate=true

  let  color= !darkMode?InputFieldborderColor:dmInputFieldborderColor
  this.setState({ 
  emailInputFieldborderColor:color,
      })


      var checkEmptyFields = this.checkEmptyFields(e)

      if(checkEmptyFields)
{
  if( emailValidate   ) 
  { 
 if(isInternetConnected)
    {
      this.setState({load:true,errmsg:"",rl:"F"})
      setTimeout(() => {
        this.setState({load:false}),
        this.chkacnt(e);
      },1200)   ;
    }
    else{
     this.setState({showAlert:true})
    }    
  } 
}
  

}
 

sendresetlink(e)
{
  auth().sendPasswordResetEmail(e)
 .then((user)=>{
  this.setState({rl:'T',load:false});
 }).catch((error)=>{
  this.setState({load:true});
  var errorMessage = error.message;
  var si  = errorMessage.indexOf("]")+1
  var  ei  = errorMessage.length -1
  const msg = errorMessage.substr(si,ei)
  alert(msg);
  });
}

resetpwd(e)
{
this.setState({load:true});
setTimeout(() => {
  this.sendresetlink(e);
  },400)   ;
}
 

render(){
  const {darkMode,isInternetConnected,em,emailF,emailV,emailInputFieldborderColor,load} = this.state;
return(
      <View style={{flex:1,backgroundColor:!darkMode ? containerBackgroundColor:dmcontainerBackgroundColor}}>

  {!isInternetConnected && this.renderShowInternetErrorAlert("No internet connection","Please connect internet.")}
    
    
        <Appbar.Header style={{backgroundColor:!darkMode?headerColor:dmheaderColor}}>
      <Appbar.BackAction onPress={()=>this.props.navigation.goBack()} />
      <Appbar.Content title="Find Your Account" titleStyle={{fontSize:headerFontSize}} />
    </Appbar.Header>


    <View style={{marginTop:"10%",padding:10,margin:10}}>

           <Item style={[styles.Item,{borderColor: (emailF || emailV ) ? (!darkMode?InputFieldborderErrorColor:dmInputFieldborderErrorColor) : emailInputFieldborderColor,backgroundColor:!darkMode ? inputItemBackgroundColor : dminputItemBackgroundColor}]} rounded>
            <MaterialCommunityIcons   name= {"email"} color={InputFieldIconColor} size={InputFieldIconSize}/>
            <Input  style={[styles.Input,{color:!darkMode?InputFieldTextColor:dmInputFieldTextColor}]}
            placeholder='E-mail' placeholderTextColor={inputPlaceholderTextColor} value={em}   onFocus={() => this.focusField("email") } 
             onChangeText={(txt)=>this.setState({em:txt,emailF:false,emailV:false})} />
            </Item>
            <allOther.CheckError  emailF={emailF} emailV={emailV} textColor={!darkMode?errorTextColor:dmerrorTextColor}/>           


            <Button  mode="contained" style={{backgroundColor:"#307ecc",marginTop:27,borderRadius:17,margin:5}}  onPress={()=>{this.click(em,isInternetConnected),Keyboard.dismiss()}}>
                <Text style={{color:"white",fontSize:17,fontWeight:"bold"}}>Find Your ACCOUNT</Text>
                </Button>
            
     </View>
        
              <allOther.Loader loader={load} />        
                {/* {this.state.load == "T" ? (<View style={{justifyContent:"center",alignItems:"center",marginTop:50}}>
                  <ActivityIndicator size="large" color="#307ecc"></ActivityIndicator>
        </View>) : null } */}



        {this.state.errmsg == "[auth/wrong-password] The password is invalid or the user does not have a password." ? (<View style={{justifyContent:"center",alignItems:"center",marginTop:130}}>
        <Text style={{fontSize:23,fontWeight:"bold",color:!darkMode?searchErrorTextColor:dmsearchErrorTextColor}}>Record Found </Text>
        <Text style={{color:!darkMode?searchErrorTextColor:dmsearchErrorTextColor,fontSize:15,fontWeight:"bold"}}>Reset via Email : {this.state.em}</Text>
          <Button  style={{backgroundColor:"#307ecc",borderRadius:17,marginTop:23}} onPress={()=>this.resetpwd(this.state.em)}  >
                <Text style={{color:"white",fontSize:14,fontWeight:"bold"}}>Reset Password</Text>
                </Button>
        </View>) : null }

        {this.state.errmsg == "[auth/user-not-found] There is no user record corresponding to this identifier. The user may have been deleted." ? 
        (<View style={{justifyContent:"center",alignItems:"center",marginTop:130}}>
        <Text style={{fontSize:23,fontWeight:"bold",color:!darkMode?searchErrorTextColor:dmsearchErrorTextColor}}>NO Record Found</Text>
        <Text style={{color:!darkMode?searchErrorTextColor:dmsearchErrorTextColor,fontSize:17,fontWeight:"bold"}}>Search again with correct email</Text>
        </View>)
        : null }

{this.state.errmsg == "[auth/too-many-requests] Too many unsuccessful login attempts. Please try again later." ? 
        (<View style={{justifyContent:"center",alignItems:"center",marginTop:130}}>
        <Text style={{color:!darkMode?searchErrorTextColor:dmsearchErrorTextColor,fontSize:23,fontWeight:"bold"}}>Too many unsuccessful login attempts.</Text>
        <Text style={{color:!darkMode?searchErrorTextColor:dmsearchErrorTextColor,fontSize:17,fontWeight:"bold"}}>Please try again later.</Text>
        </View>)
        : null }

{this.state.errmsg == "[auth/network-request-failed] A network error (such as timeout, interrupted connection or unreachable host) has occurred." ? 
        (<View style={{justifyContent:"center",alignItems:"center",marginTop:130}}>
        <Text style={{color:!darkMode?searchErrorTextColor:dmsearchErrorTextColor,fontSize:23,fontWeight:"bold"}}>A network error</Text>
        <Text style={{color:!darkMode?searchErrorTextColor:dmsearchErrorTextColor,fontSize:17,fontWeight:"bold"}}>(such as timeout,interrupted connection ,no internet connection)</Text>
        </View>)
        :  null
        }

        
{this.state.rl == "T" ? 
        (<View style={{justifyContent:"center",alignItems:"center",flexDirection:"row",marginTop:70}}>
        <Feather name="check" size={23} color="green" />
        <Text style={{color:!darkMode?searchErrorTextColor:dmsearchErrorTextColor,fontSize:17,fontWeight:"bold"}}> Reset Link Send (please check your email)</Text>
        </View>)
        :  null
        }



      </View>
)

    }

     }

  
     const styles = StyleSheet.create({
        Item:{padding:2},
        Input:{fontSize:InputFieldFontSize}
     });

