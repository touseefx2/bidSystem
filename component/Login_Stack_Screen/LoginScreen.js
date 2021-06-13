import React   from "react";
import {Button,Switch} from 'react-native-paper';
import { View,TouchableOpacity,Dimensions,Image,StyleSheet,Keyboard} from "react-native";
import AsyncStorage from '@react-native-community/async-storage';
import { Container, Content, Item, Input ,Text } from 'native-base';
import NetInfo from "@react-native-community/netinfo";
import  MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AwesomeAlert from 'react-native-awesome-alerts';
import allOther from "../other/allOther"
import { connect} from 'react-redux'
 

//text
const title= "Bidding System"
const logo=  "../../assets/signupLogo.png"
const button1Title="LOG IN"
const button2Title="Sign up"
//fontSize
const InputFieldIconSize=20
const InputFieldFontSize=18
const button1FontSize=18
const button2FontSize=16
const titleFontSize=36
//colors
const containerBackgroundColor=  "#e6e6e6"  
const dmcontainerBackgroundColor=   "#1f1f1f"
 
const inputItemBackgroundColor= "white" 
const dminputItemBackgroundColor= "black"
 
const InputFieldTextColor= "black" 
const dmInputFieldTextColor= "white"
 

const InputFieldborderColor= "white" 
const dmInputFieldborderColor= "black";

const InputFieldborderErrorColor= "red" 
const dmInputFieldborderErrorColor= "#b81d1d"

const button2TextColor="#307ecc"
const dmbutton2TextColor="#307ecc"

const button2LeftTextColor=  "black" 
const dmbutton2LeftTextColor= "white"

const errorTextColor="red"
const dmerrorTextColor="#b81d1d"

const InputFieldborderFocusColor="#307ecc"
const titleTextColor="#307ecc"
const InputFieldIconColor="#307ecc"
const inputPlaceholderTextColor="silver"
const button1BackgroundColor="#307ecc"
const button1TextColor="white"
//Validation 
let emailValidate=true
let passwordValidate=true
 

 
//main Component

 class LoginScreen extends React.Component {
  
 
  constructor(props)
{
super(props);
this.state=
{
darkMode:null,
email : "",
password : "",
isInternetConnected:null,
emailF:false,
emailV:false,
isHidePassword:true,
passwordV:false,
passwordF:false,
showAlert:false,
setUserData:false,
uid:null,
//out focus color of input field
emailInputFieldborderColor:null,
passwordInputFieldborderColor:null,
loader:false
};
 
}

 
async __logIn(email,password){   
  this.setState({loader:true}) 
   try {
    let resp =  await  allOther.firebase.__doSingIn(email,password)
     console.log("user resp --> ",resp)  
       if(resp){
    this.setState({uid:resp.user.uid,setUserData:true,}) //for pass value in userdata function
  }else{
       this.setState({loader:false})
      }
 
   } catch (error) {
    console.log("error from lgn screen : ",error)
    this.setState({loader:false})
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

  storeDarkModeData = async () => {
    const {darkMode}=this.state;
    try {
      await AsyncStorage.setItem('darkMode',JSON.stringify(darkMode))
    } catch (e) {
      console.log(e)
    }
  }
 
goToNextScreen(screenName){
  this.props.navigation.navigate(screenName)
  this.clearFields(); 
} 
 
checkEmptyFields= ( email,password)=>
{
 

  //validation
  {email !="" && ( emailValidate     =  allOther.Validation.EmailValidate(email) )}  
  {password!="" && ( passwordValidate =   allOther.Validation.PasswordValidate(password) )}

  
    this.setState({
      emailV: emailValidate ? false : true ,
      passwordV: passwordValidate ? false : true ,
    })
 
 

    if(email=="" || password=="" ){
      this.setState({
        emailF:email=="" ? true : false,
        passwordF:password=="" ? true : false, 
      })
      return false;
    } else{
      return true;
    }

 
 


 
}

clearFields = () =>
{
  this.state=
{
email : "",
password : "",
emailF:false,
emailV:false,
passwordV:false,
passwordF:false,
setUserData:false,
showAlert:false,
//out focus color of input field
emailInputFieldborderColor:null,
passwordInputFieldborderColor:null,
};
}
 
 handleInternetConnectivityChange = state => {
  if (state.isConnected) {
    this.setState({isInternetConnected:true})
  } else {
    this.setState({isInternetConnected:false})
  }
};

  LoginClick(email,password,isInternetConnected)
{
  const {darkMode} = this.state;
  Keyboard.dismiss();
  emailValidate=true
  passwordValidate=true

  let  color= !darkMode?InputFieldborderColor:dmInputFieldborderColor
  this.setState({ 
  emailInputFieldborderColor:color,
  passwordInputFieldborderColor:color,
      })

//CheckEmptyField  
var checkEmptyFields = this.checkEmptyFields( email,password)
if(checkEmptyFields)
{
  if( emailValidate && passwordValidate ) 
  { 
    

 if(isInternetConnected)
    {
      this.__logIn(email,password);
    }
    else{
     this.setState({showAlert:true})
    }    
  

  } 

}
 

}
 
   
ForgottenPaswwordClick(){
this.goToNextScreen("ForgotPassword")
}

focusField(field){
 const{darkMode}=this.state;
 let  color= !darkMode?InputFieldborderColor:dmInputFieldborderColor

  if(field == "email")
  {

    this.setState({
      emailInputFieldborderColor:InputFieldborderFocusColor,
      passwordInputFieldborderColor:color,
      
          })
 
  } 
  else if(field == "password"){
    this.setState({
      emailInputFieldborderColor:color,
      passwordInputFieldborderColor:InputFieldborderFocusColor,
          })
  }
 
  }

componentDidMount()
{
  const {darkMode}= this.state;
  this.getDarkModeData()
  let  color= !darkMode?InputFieldborderColor:dmInputFieldborderColor
  this.setState({
  emailInputFieldborderColor:color,
  passwordInputFieldborderColor:color,
      })

  this.unsubscribe = NetInfo.addEventListener(this.handleInternetConnectivityChange)
}
 
componentDidUpdate(pp,ps){
const {darkMode}=this.state;
  
if(ps.darkMode!=darkMode){

  this.storeDarkModeData() 
 let  color= !darkMode?InputFieldborderColor:dmInputFieldborderColor
this.setState({
emailInputFieldborderColor:color,
passwordInputFieldborderColor:color,
    })
  }
}

componentWillUnmount() {
  if (this.unsubscribe){this.unsubscribe()}
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

renderLogin()
{
  const { email,password,isHidePassword,emailF,passwordF,emailV,passwordV,emailInputFieldborderColor,
  passwordInputFieldborderColor,darkMode,isInternetConnected} = this.state;
 

  return(
    <Container style={{backgroundColor:!darkMode ? containerBackgroundColor:dmcontainerBackgroundColor}}>
   
        <Content>

<View style={{position:"absolute",marginTop:"2%",right:0,marginRight:10,flexDirection:"row",alignItems:"center"}}>
 
 <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={darkMode ? "white" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={()=> {this.setState({darkMode:!darkMode});Keyboard.dismiss()}}
        value={darkMode}
      />

<Ionicons   name= {"moon-outline"} color={"#16aed9"} size={24}/>

</View>
      

        <View style={{alignSelf:"center",marginTop:"14%"} }>
<View style={{flexDirection:"row",alignSelf:"center",alignItems:"center",marginLeft:5} }>
<Text style={{fontSize:44,color:"#16aed9" ,fontWeight:"bold",fontStyle:"italic"}} >O</Text>      
<Text style={{fontSize:27,color:"#307ecc" ,fontWeight:"bold",fontStyle:"italic",marginTop:9}} >nline</Text> 
<Image source={require(logo)} style={{width:70,height:50}} />
  </View>
      <Text style={{fontSize:28,color:"#307ecc" ,fontWeight:"bold",fontStyle:"italic"}} >
       {title} 
    </Text>      
  </View>


 {/* Input Fields */}
 
   <View  style={{margin:25,padding:5,marginTop:"15%"}}>

          
           <Item style={[styles.Item,{marginTop:35,borderColor: (emailF || emailV ) ? (!darkMode?InputFieldborderErrorColor:dmInputFieldborderErrorColor) : emailInputFieldborderColor,backgroundColor:!darkMode ? inputItemBackgroundColor : dminputItemBackgroundColor}]} rounded>
            <MaterialCommunityIcons   name= {"email"} color={InputFieldIconColor} size={InputFieldIconSize}/>
            <Input  style={[styles.Input,{color:!darkMode?InputFieldTextColor:dmInputFieldTextColor}]}
            placeholder='E-mail' placeholderTextColor={inputPlaceholderTextColor} value={email}   onFocus={() => this.focusField("email") } 
             onChangeText={(txt)=>this.setState({email:txt,emailF:false,emailV:false})} />
            </Item>
            <allOther.CheckError emailF={emailF} emailV={emailV} textColor={!darkMode?errorTextColor:dmerrorTextColor}/>           

            <Item style={[styles.Item,{marginTop:50,borderColor: (passwordF || passwordV ) ? (!darkMode?InputFieldborderErrorColor:dmInputFieldborderErrorColor): passwordInputFieldborderColor,backgroundColor:!darkMode ? inputItemBackgroundColor : dminputItemBackgroundColor}]} rounded>
            <MaterialCommunityIcons   name= {"lock"}  color={InputFieldIconColor} size={InputFieldIconSize} />
            <Input style={[styles.Input,{color:!darkMode?InputFieldTextColor:dmInputFieldTextColor}]}
             placeholder='Password'  value={password}  secureTextEntry={isHidePassword} defaultValue={password}   onFocus={() => this.focusField("password") } 
            placeholderTextColor={inputPlaceholderTextColor}  onChangeText={(txt)=>this.setState({password:txt,passwordF:false,passwordV:false})} />
           {password.length >0 && ( <MaterialCommunityIcons style={{marginRight:6}}
           name= {isHidePassword ? "eye-off-outline" : "eye-outline" } 
           onPress={()=>this.setState({isHidePassword:!isHidePassword})} color="silver" size={InputFieldIconSize}/>)}
            </Item>
            <allOther.CheckError passwordF={passwordF} passwordV={passwordV} textColor={!darkMode?errorTextColor:dmerrorTextColor} />
  
            <TouchableOpacity style={{marginTop:40,marginLeft:"55%"}} onPress={()=>this.goToNextScreen("ForgotPassword")}>
             <Text style={{fontSize:button2FontSize,color:!darkMode?button2LeftTextColor:dmbutton2LeftTextColor}}>Forgot Password?</Text>
            </TouchableOpacity>

</View>
   
 
<Button style={styles.button1}
 onPress={()=>{this.LoginClick(email,password,isInternetConnected)
}}>
  <Text style={styles.button1Text}>{button1Title}</Text>
</Button>
 
<View style={{flexDirection:"row",alignItems:"center",marginTop:"7%",alignSelf:"center",marginBottom:10}}>
<Text style={{fontSize:button2FontSize,color:!darkMode?button2LeftTextColor:dmbutton2LeftTextColor}}>Don't have an account? </Text>
<TouchableOpacity     onPress={()=>this.goToNextScreen("SignupScreen")}>
<Text style={{fontSize:button2FontSize,color:darkMode?button2TextColor:dmbutton2TextColor,fontWeight:"bold"}}>{button2Title}</Text>
</TouchableOpacity>
</View>
 
</Content>
 
      </Container>
  )
}

    render() {
      const  {isInternetConnected,darkMode,loader,uid,setUserData} = this.state;
      const{userData}=this.props;
      return (
        <View style={{ flex: 1,backgroundColor:!darkMode ? containerBackgroundColor:dmcontainerBackgroundColor}}>
          {setUserData         && <allOther.firebase.FireBaseFunction type={"set-user-data"} uid={uid} /> }     
          {(userData.length<=0 || userData.user.length<=0   ) && <allOther.Loader loader={loader} /> }
          {this.renderLogin()}
          {!isInternetConnected && this.renderShowInternetErrorAlert("No internet connection","Please connect internet.")}
       </View>

       );
     }
    }
  
  const styles = StyleSheet.create({
   title:{fontSize:titleFontSize,color:titleTextColor ,fontWeight:"bold",fontStyle:"italic"},
    button1: {
       backgroundColor:button1BackgroundColor,borderWidth:0.7,borderRadius:20,width:Dimensions.get('window').width/1.5,marginTop:"20%",alignSelf:"center"
    },
     button1Text:{fontSize:button1FontSize,color:button1TextColor,fontWeight:"bold",alignSelf:"center"},
     Item:{padding:2},
     Input:{fontSize:InputFieldFontSize}
  });
 
 
  const mapStateToProps = state => ({
    userData: state.userReducer
  });

  export default connect(
    mapStateToProps,
 null
  )(LoginScreen);