import React   from "react";
import {Button} from 'react-native-paper';
import { View,TouchableOpacity,Dimensions,Image,StyleSheet,Keyboard,TextInput} from "react-native";
import AsyncStorage from '@react-native-community/async-storage';
import { Container, Content, Item, Input ,Text, Title} from 'native-base';
import auth from '@react-native-firebase/auth';
import Dialog, { DialogContent,DialogFooter,DialogButton,SlideAnimation,DialogTitle} from 'react-native-popup-dialog';
import NetInfo from "@react-native-community/netinfo";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AwesomeAlert from 'react-native-awesome-alerts';
import ModalSelector from 'react-native-modal-selector'
import firestore from '@react-native-firebase/firestore';
import allOther from "../other/allOther"

//text
const title= "Sign Up"
const button1Title="Sign up"
const logo=  "../../assets/signupLogo.png"
//fontSize
const InputFieldIconSize=20
const InputFieldFontSize=18
const button1FontSize=18
const button2FontSize=16
const titleFontSize=36
const phoneInputFieldBorderRadius=20
const phoneInputFieldWidth=65
const phoneInputFontSize=18
//colors
const containerBackgroundColor=  "#e6e6e6"  
const dmcontainerBackgroundColor=   "#1f1f1f"
 
const inputItemBackgroundColor= "white" 
const dminputItemBackgroundColor= "black"

const phoneInputFieldBackgroundColor="white"
const dmphoneInputFieldBackgroundColor= "black"

const InputFieldTextColor= "black" 
const dmInputFieldTextColor= "white"

const phoneInputFieldTextColor= "black"
const dmphoneInputFieldTextColor= "white"

const phoneInputFieldBorderColor= "white" 
const dmphoneInputFieldBorderColor= "black"

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
const phoneModelSectionTextColor="white"
const phoneModelCancelButtonTextColor="white"
export const phoneModelOptionTextColor="white"
const button1BackgroundColor="#307ecc"
const button1TextColor="white"
const modelOptionTextColor="#307ecc"
//Validation 
let nameValidate=true
let emailValidate=true
let passwordValidate=true
let matchPassword=true
let phoneValidate=true




 //Custom Phone Modal Data
      let index=0;
      export  const data = [
            { key:index++, section: true, label: 'Country Code',},
            { key:index++, label: '+92',component:<allOther.PhoneModalComponent countryCode="+92" country="pakistan"  image={require('../../assets/flag/pk.png')}/>},
            { key:index++, label: '+91',component:<allOther.PhoneModalComponent countryCode="+91" country="india"     image={require('../../assets/flag/ind.png')}/>},
            { key:index++, label: '+84',component:<allOther.PhoneModalComponent countryCode="+84" country="vietnam"   image={require('../../assets/flag/vtn.png')}/>},
            { key:index++, label: '+374',component:<allOther.PhoneModalComponent countryCode="+374" country="armenia" image={require('../../assets/flag/armn.png')}/>},
          ];




//main Component

export default class SignupScreen_V extends React.Component {
 
  constructor(props)
{

super(props);
this.state=
{
setUserData:false,
uid:null,
loader:false,
darkMode:null,
type:"vendor",
name:"",
email : "",
password : "",
cpassword:"",
phoneNum:"",
photo:"data:image/png;base64,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",
phone1:"",
phone2:"",
phone3:"",
phn1MaxLength:3,
phn2MaxLength:4,
phn3MaxLength:3,
phn1PlaceHolder:"300",
phn2PlaceHolder:"1122",
phn3PlaceHolder:"234",
phoneFields:3,
selectedCountryCode: '+92',
isInternetConnected:null,
isHidePassword: true,
isHidecPassword:true,
nameV:false,
nameF:false,
emailF:false,
emailV:false,
passwordV:false,
passwordF:false,
phoneV:false,
phoneF:false,
cpasswordF:false,
matchpasswordV:false,
showAlert:false,
//out focus color of input field
nameInputFieldborderColor: null,
emailInputFieldborderColor:null,
passwordInputFieldborderColor:null,
cPasswordInputFieldborderColor:null,
phoneInputFieldborderColor1:null,
phoneInputFieldborderColor2:null,
phoneInputFieldborderColor3:null,
};

//ref
 this.phoneInput_1 = null;
 this.phoneInput_2=null;
 this.phoneInput_3=null;
 this.Phone=null;
}

async __signUp(email,password,name){

  const {photo,type}= this.state;

  this.setState({loader:true})

  if(this.Phone!=null){
    
  let resp =  await allOther.firebase.__doSingUp(email,password) 
 

 if(resp){
  let user=resp.user;  

  try {
    let phone=this.Phone;

        let obj={name,email:user.email,phone,type,photo,emailVerified:user.emailVerified,
         uid:user.uid,createdAt:new Date(),token:null,updatedAt:new Date(),block:false}

firestore().collection('users').doc(user.uid).set(obj).
then(
  this.setState({loader:false}),
  allOther.ToastAndroid.ToastAndroid_SB("Add Success") ,
  this.setState({setUserData:true,uid:user.uid})
).catch((error)=> {
   user.delete().then(()=> {
    console.log("beacuse no user add inn data base so user is delete in firebase auth try again")
    })
  var errorMessage = error.message;
  var si  = errorMessage.indexOf("]")+1
  var  ei  = errorMessage.length -1
  const msg = errorMessage.substr(si,ei)
  this.setState({loader:false,setUserData:false})
  allOther.AlertMessage("",msg);

})
 
  
  } catch (error) {
     this.setState({loader:false,setUserData:false})
      user.delete().then(()=> {
      console.log("beacuse no user add inn data base so user is delete in firebase auth try again")
      })
       console.log("signup resp error try cath --> ", error)
       allOther.AlertMessage("",error)
  }
 
  }else
  {
    this.setState({loader:false,setUserData:false})
  }

}else
{
  this.setState({loader:false,setUserData:false})
  allOther.AlertMessage("","Please Enter Phone Number")
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

goToNextScreen(screenName){
  this.props.navigation.navigate(screenName)
  this.clearFields(); 
} 
 
checkEmptyFields= (name,email,password,cpassword,selectedCountryCode,phone1,phone2,phone3,phoneFields)=>
{
  this.Phone =   null;
  if(phoneFields==3){this.Phone= selectedCountryCode+phone1+phone2+phone3}
  if(phoneFields==2){this.Phone= selectedCountryCode+phone1+phone2}

  
 
  //validation
  {name !="" && (  nameValidate       = allOther.Validation.NameValidate(name))} 
  {email !="" && ( emailValidate      = allOther.Validation.EmailValidate(email) )}  
  {password!="" && ( passwordValidate = allOther.Validation.PasswordValidate(password) )}
 


  if(phoneFields==3 )
  {
    if(phone1!="" && phone2!="" && phone3!="" && selectedCountryCode!="")
  phoneValidate =  allOther.Validation.PhoneValidate(this.Phone,selectedCountryCode)

  }else if (phoneFields==2 ){
    
    if (phone1!="" && phone2!=""  && selectedCountryCode!="")
    phoneValidate =  allOther.Validation.PhoneValidate(this.Phone,selectedCountryCode)
    }

    console.log("phone : ",this.Phone)
    console.log("phone v : ",phoneValidate)
    

 
    
    this.setState({
      nameV: nameValidate ? false : true ,
      emailV: emailValidate ? false : true ,
      passwordV: passwordValidate ? false : true ,
      phoneV: phoneValidate ? false : true ,
    })
 
  //check empty fields
  if(phoneFields==3){

    if(name=="" || email=="" || password=="" || cpassword=="" ||  selectedCountryCode=="" || phone1=="" || phone2=="" || phone3=="" ){
      this.setState({
        nameF:name=="" ? true : false,
        emailF:email=="" ? true : false,
        passwordF:password=="" ? true : false,
        cpasswordF:cpassword=="" ? true : false,
        phoneF:(phone1=="" || phone2=="" || phone3=="" || selectedCountryCode=="") ? true : false,
      })
      return false;
    } else{
      return true;
    
    }

  }else if (phoneFields==2){

    if(name=="" || email=="" || password=="" || cpassword=="" ||  selectedCountryCode=="" || phone1=="" || phone2==""   ){
      this.setState({
        nameF:name=="" ? true : false,
        emailF:email=="" ? true : false,
        passwordF:password=="" ? true : false,
        cpasswordF:cpassword=="" ? true : false,
        phoneF:(phone1=="" || phone2==""  || selectedCountryCode=="") ? true : false,
      })
      return false;
    } else{
      return true;
      
    }

  }
 


 
}

clearFields = () =>
{
  this.state=
  {
    setUserData:false,
    uid:null,
    loader:false,
    darkMode:null,
    type:"user",
    name:"",
    email : "",
    password : "",
    cpassword:"",
    phoneNum:"",
    photo:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQmwhpgFNYWplnRky7pig1D8zshLmEjRIIzHg&usqp=CAU",
    phone1:"",
    phone2:"",
    phone3:"",
    phn1MaxLength:3,
    phn2MaxLength:4,
    phn3MaxLength:3,
    phn1PlaceHolder:"300",
    phn2PlaceHolder:"1122",
    phn3PlaceHolder:"234",
    phoneFields:3,
    selectedCountryCode: '+92',
    isInternetConnected:null,
    isHidePassword: true,
    isHidecPassword:true,
    nameV:false,
    nameF:false,
    emailF:false,
    emailV:false,
    passwordV:false,
    passwordF:false,
    phoneV:false,
    phoneF:false,
    cpasswordF:false,
    matchpasswordV:false,
    showAlert:false,
    //out focus color of input field
    nameInputFieldborderColor: null,
    emailInputFieldborderColor:null,
    passwordInputFieldborderColor:null,
    cPasswordInputFieldborderColor:null,
    phoneInputFieldborderColor1:null,
    phoneInputFieldborderColor2:null,
    phoneInputFieldborderColor3:null,
    };
}
 
 handleInternetConnectivityChange = state => {
  if (state.isConnected) {
    this.setState({isInternetConnected:true})
  } else {
    this.setState({isInternetConnected:false})
  }
};

 SignupClick(name,email,password,cpassword,selectedCountryCode,phone1,phone2,phone3,isInternetConnected,phoneFields )
{
  const {darkMode}= this.state;
  Keyboard.dismiss();
  nameValidate=true
  emailValidate=true
  passwordValidate=true
  phoneValidate=true
  matchPassword=true
  this.Phone=null
 
  let  color= !darkMode?InputFieldborderColor:dmInputFieldborderColor
  this.setState({
  nameInputFieldborderColor: color,
  emailInputFieldborderColor:color,
  passwordInputFieldborderColor:color,
  cPasswordInputFieldborderColor:color,
  phoneInputFieldborderColor1:color,
  phoneInputFieldborderColor2:color,
  phoneInputFieldborderColor3:color,
      })
 
//CheckEmptyField  
var checkEmptyFields = this.checkEmptyFields(name,email,password,cpassword,selectedCountryCode,phone1,phone2,phone3,phoneFields)
if(checkEmptyFields)
{
  if(nameValidate && emailValidate && passwordValidate  && phoneValidate) 
  { 
    matchPassword = allOther.Validation.MatchPassword(password,cpassword);
    if(matchPassword){
     this.setState({matchpasswordV:false})
 if(isInternetConnected)
    {     
       
      this.__signUp(email,password,name,);
    }
    else{
     this.setState({showAlert:true})
    }    
    }else{
      this.setState({matchpasswordV:true})
    }

  } 

}
 

}
 
LoginHereClick(){
  this.goToNextScreen("LoginScreen")
  }
 
focusField(field){
 const{darkMode}=this.state;
 let  color= !darkMode?InputFieldborderColor:dmInputFieldborderColor

  if(field == "name")
  {

    this.setState({
      nameInputFieldborderColor: InputFieldborderFocusColor,
      emailInputFieldborderColor:color,
      passwordInputFieldborderColor:color,
      cPasswordInputFieldborderColor:color,
      phoneInputFieldborderColor1:color,
      phoneInputFieldborderColor2:color,
      phoneInputFieldborderColor3:color,
          })
 
  }else if(field == "email"){
   
    this.setState({
      nameInputFieldborderColor: color,
      emailInputFieldborderColor:InputFieldborderFocusColor,
      passwordInputFieldborderColor:color,
      cPasswordInputFieldborderColor:color,
      phoneInputFieldborderColor1:color,
      phoneInputFieldborderColor2:color,
      phoneInputFieldborderColor3:color,
          })
 

  }
  else if(field == "password"){
    this.setState({
      nameInputFieldborderColor: color,
      emailInputFieldborderColor:color,
      passwordInputFieldborderColor:InputFieldborderFocusColor,
      cPasswordInputFieldborderColor:color,
      phoneInputFieldborderColor1:color,
      phoneInputFieldborderColor2:color,
      phoneInputFieldborderColor3:color,
          })
  }
  else if(field == "cpassword"){
    this.setState({
      nameInputFieldborderColor:color,
      emailInputFieldborderColor:color,
      passwordInputFieldborderColor:color,
      cPasswordInputFieldborderColor:InputFieldborderFocusColor,
      phoneInputFieldborderColor1:color,
      phoneInputFieldborderColor2:color,
      phoneInputFieldborderColor3:color,
          })
  }
  else if(field == "phone1"){
    this.setState({
      nameInputFieldborderColor:color,
      emailInputFieldborderColor:color,
      passwordInputFieldborderColor:color,
      cPasswordInputFieldborderColor:color,
      phoneInputFieldborderColor1:InputFieldborderFocusColor,
      phoneInputFieldborderColor2:color,
      phoneInputFieldborderColor3:color,
          })
  }
  else if(field == "phone2"){
    this.setState({
      nameInputFieldborderColor:color,
      emailInputFieldborderColor:color,
      passwordInputFieldborderColor:color,
      cPasswordInputFieldborderColor:color,
      phoneInputFieldborderColor1:color,
      phoneInputFieldborderColor2:InputFieldborderFocusColor,
      phoneInputFieldborderColor3:color,
          })
  }
  else if(field == "phone3"){
    this.setState({
      nameInputFieldborderColor:color,
      emailInputFieldborderColor:color,
      passwordInputFieldborderColor:color,
      cPasswordInputFieldborderColor:color,
      phoneInputFieldborderColor1:color,
      phoneInputFieldborderColor2:color,
      phoneInputFieldborderColor3:InputFieldborderFocusColor,
          })
  }
  }

componentDidMount()
{
  const {darkMode}= this.state;
  this.getDarkModeData()
  let  color= !darkMode?InputFieldborderColor:dmInputFieldborderColor
  this.setState({
  nameInputFieldborderColor: color,
  emailInputFieldborderColor:color,
  passwordInputFieldborderColor:color,
  cPasswordInputFieldborderColor:color,
  phoneInputFieldborderColor1:color,
  phoneInputFieldborderColor2:color,
  phoneInputFieldborderColor3:color,
      })

  this.unsubscribe = NetInfo.addEventListener(this.handleInternetConnectivityChange)
}

  phoneNumFormate(selectedCountryCode){
 //pak/india
 if(selectedCountryCode=="+92"|| selectedCountryCode=="+91"){
  this.setState({phn1MaxLength:3,phn2MaxLength:4,phn3MaxLength:3,
    phn1PlaceHolder:"300",
    phn2PlaceHolder:"1122",
    phn3PlaceHolder:"234",
    phoneFields:3,
  })
  }
//vietnam
  if(selectedCountryCode=="+84"){
    this.setState({phn1MaxLength:3,phn2MaxLength:4,phn3MaxLength:2,
    phn1PlaceHolder:"355",
    phn2PlaceHolder:"5528",
    phn3PlaceHolder:"71",
    phoneFields:3})
  }
  //armenia
  if(selectedCountryCode=="+374"){
    this.setState({phn1MaxLength:3,phn2MaxLength:3,phn3MaxLength:null,
      phn1PlaceHolder:"355",
      phn2PlaceHolder:"552",
      phn3PlaceHolder:null,
      phoneFields:2})
  }
  }

componentDidUpdate(pp,ps){
const {selectedCountryCode,darkMode}=this.state;
if(selectedCountryCode != ps.selectedCountryCode) {
  this.setState({phone1:"",phone2:"",phone3:"",phoneF:false,phoneV:false})
  this.phoneNumFormate(selectedCountryCode)}


if(ps.darkMode!=darkMode){
 let  color= !darkMode?InputFieldborderColor:dmInputFieldborderColor
this.setState({
nameInputFieldborderColor: color,
emailInputFieldborderColor:color,
passwordInputFieldborderColor:color,
cPasswordInputFieldborderColor:color,
phoneInputFieldborderColor1:color,
phoneInputFieldborderColor2:color,
phoneInputFieldborderColor3:color,
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

renderSignup()
{
  const
  {name,email,password,cpassword,selectedCountryCode,phone1,phone2,phone3,isInternetConnected
  ,isHidePassword,emailF,passwordF,emailV,passwordV,cpasswordF,cpasswordV,nameV,nameF,phoneF,
  phoneV,isHidecPassword,matchpasswordV,nameInputFieldborderColor,emailInputFieldborderColor,
  passwordInputFieldborderColor,cPasswordInputFieldborderColor,phn1MaxLength,phn2MaxLength
  ,phn3MaxLength,phn1PlaceHolder,phn2PlaceHolder ,phn3PlaceHolder,phoneInputFieldborderColor1,
  phoneInputFieldborderColor2,phoneInputFieldborderColor3,phoneFields,darkMode} = this.state;
 

  return(
    <Container style={{backgroundColor:!darkMode ? containerBackgroundColor:dmcontainerBackgroundColor}}>
   
        <Content>

 <View style={{marginTop:"10%",flexDirection:"row",alignSelf:"center",alignItems:"center"} }>
<Text style={styles.title} >
 {title} 
</Text> 
<Image source={require(logo)} style={{width:70,height:50}} />
</View>


 {/* Input Fields */}
 
   <View  style={{margin:25,padding:5,marginTop:"15%"}}>

           <Item style={[styles.Item,{borderColor: (nameF || nameV ) ? (!darkMode?InputFieldborderErrorColor:dmInputFieldborderErrorColor):nameInputFieldborderColor,backgroundColor:!darkMode ? inputItemBackgroundColor : dminputItemBackgroundColor}]} rounded>
            <Ionicons   name= "person" color={InputFieldIconColor} size={InputFieldIconSize} />
            <Input style={[styles.Input,{color:!darkMode?InputFieldTextColor:dmInputFieldTextColor}]}
            placeholder='Name'  value={name}    defaultValue={name}   onFocus={() => this.focusField("name") } 
            placeholderTextColor={inputPlaceholderTextColor}  onChangeText={(txt)=>this.setState({name:txt,nameF:false,nameV:false})} />
            </Item>
           <allOther.CheckError nameF={nameF} nameV={nameV} textColor={!darkMode?errorTextColor:dmerrorTextColor} />
           
           <Item style={[styles.Item,{marginTop:35,borderColor: (emailF || emailV ) ? (!darkMode?InputFieldborderErrorColor:dmInputFieldborderErrorColor) : emailInputFieldborderColor,backgroundColor:!darkMode ? inputItemBackgroundColor : dminputItemBackgroundColor}]} rounded>
            <MaterialCommunityIcons   name= {"email"} color={InputFieldIconColor} size={InputFieldIconSize}/>
            <Input  style={[styles.Input,{color:!darkMode?InputFieldTextColor:dmInputFieldTextColor}]}
            placeholder='E-mail' placeholderTextColor={inputPlaceholderTextColor} value={email}   onFocus={() => this.focusField("email") } 
             onChangeText={(txt)=>this.setState({email:txt,emailF:false,emailV:false})} />
            </Item>
            <allOther.CheckError emailF={emailF} emailV={emailV} textColor={!darkMode?errorTextColor:dmerrorTextColor}/>           

            <Item style={[styles.Item,{marginTop:35,borderColor: (passwordF || passwordV ) ? (!darkMode?InputFieldborderErrorColor:dmInputFieldborderErrorColor): passwordInputFieldborderColor,backgroundColor:!darkMode ? inputItemBackgroundColor : dminputItemBackgroundColor}]} rounded>
            <MaterialCommunityIcons   name= {"lock"}  color={InputFieldIconColor} size={InputFieldIconSize} />
            <Input style={[styles.Input,{color:!darkMode?InputFieldTextColor:dmInputFieldTextColor}]}
             placeholder='Password'  value={password}  secureTextEntry={isHidePassword} defaultValue={password}   onFocus={() => this.focusField("password") } 
            placeholderTextColor={inputPlaceholderTextColor}  onChangeText={(txt)=>this.setState({password:txt,passwordF:false,passwordV:false})} />
           {password.length >0 && ( <MaterialCommunityIcons style={{marginRight:6}}
           name= {isHidePassword ? "eye-off-outline" : "eye-outline" } 
           onPress={()=>this.setState({isHidePassword:!isHidePassword})} color="silver" size={InputFieldIconSize}/>)}
            </Item>
            <allOther.CheckError passwordF={passwordF} passwordV={passwordV} textColor={!darkMode?errorTextColor:dmerrorTextColor} />
              
            <Item style={[styles.Item,{marginTop:35,borderColor: (cpasswordF || matchpasswordV) ? (!darkMode?InputFieldborderErrorColor:dmInputFieldborderErrorColor) : cPasswordInputFieldborderColor,backgroundColor:!darkMode ? inputItemBackgroundColor : dminputItemBackgroundColor}]} rounded>
            <MaterialCommunityIcons   name= {"lock"} color={InputFieldIconColor} size={InputFieldIconSize} />
            <Input style={[styles.Input,{color:!darkMode?InputFieldTextColor:dmInputFieldTextColor}]} disabled={password.length<=0 ? true : false}
            placeholder='Confirm Password'  value={cpassword}  secureTextEntry={isHidecPassword} defaultValue={cpassword}   onFocus={() => this.focusField("cpassword") } 
            placeholderTextColor={inputPlaceholderTextColor}  onChangeText={(txt)=>this.setState({cpassword:txt,cpasswordF:false,cpasswordV:false,matchpasswordV:false})} />
           {cpassword.length >0 && ( <MaterialCommunityIcons style={{marginRight:6}}
           name= {isHidecPassword ? "eye-off-outline" : "eye-outline" } 
           onPress={()=>this.setState({isHidecPassword:!isHidecPassword})} color="silver" size={InputFieldIconSize}/>)}
            </Item>
            <allOther.CheckError cpasswordF={cpasswordF}   matchpasswordV ={matchpasswordV } textColor={!darkMode?errorTextColor:dmerrorTextColor}/>       
  
 {/* phone field */}
          <View style={{ marginTop:35,padding:2,alignItems:"center",flexDirection:"row",borderRadius:25}} >
          <MaterialIcons   name= "phone-android" color={InputFieldIconColor} size={InputFieldIconSize} />      
                   <ModalSelector
                    animationType="slide"
                    data={data}
                    ref={this.modalPicker}
                    scrollViewAccessible={true}
                    sectionTextStyle={{fontSize:26,color:phoneModelSectionTextColor,fontWeight:"bold"}} 
                    cancelTextStyle={{fontSize:22,color:phoneModelCancelButtonTextColor}}
                    initValue={selectedCountryCode} 
                    selectStyle={{borderColor: !darkMode?phoneInputFieldBorderColor:dmphoneInputFieldBorderColor,backgroundColor:!darkMode?phoneInputFieldBackgroundColor:dmphoneInputFieldBackgroundColor
                      ,padding:5,borderRadius:phoneInputFieldBorderRadius,width:phoneInputFieldWidth}}
                    optionContainerStyle={{backgroundColor:"#1f1f1f",borderRadius:20,width:300,alignSelf:"center"}}
                    initValueTextStyle={{color:modelOptionTextColor,fontSize:phoneInputFontSize}}
                    backdropPressToClose={true}
                    cancelStyle={{backgroundColor:modelOptionTextColor,borderRadius:20,width:280,alignSelf:"center"}}
                    onChange={(option)=>{this.setState({selectedCountryCode:option.label})}} />

            
            <TextInput
            ref={input => {this.phoneInput_1 = input; }}
            keyboardType="number-pad"   placeholder={phn1PlaceHolder}  value={phone1} maxLength={phn1MaxLength}     defaultValue={phone1} onFocus={() => this.focusField("phone1") } 
            placeholderTextColor={inputPlaceholderTextColor} style={[styles.phoneinput,{borderColor: (phoneF || phoneV ) ? (!darkMode?InputFieldborderErrorColor:dmInputFieldborderErrorColor) :  phoneInputFieldborderColor1 ,backgroundColor: !darkMode?phoneInputFieldBackgroundColor:dmphoneInputFieldBackgroundColor ,color:!darkMode?phoneInputFieldTextColor:dmphoneInputFieldTextColor }]} 
            onChangeText={(txt)=>{
              this.setState({phone1:txt,phoneF:false,phoneV:false})
               if (txt.length == phn1MaxLength) this.phoneInput_2.focus();  
            }}/>
            
           <TextInput
           ref={input => {this.phoneInput_2 = input; }}
           keyboardType="number-pad" placeholder={phn2PlaceHolder}  value={phone2} maxLength={phn2MaxLength}     defaultValue={phone2} onFocus={() => this.focusField("phone2") } 
            placeholderTextColor={inputPlaceholderTextColor}style={[styles.phoneinput,{borderColor: (phoneF || phoneV ) ? (!darkMode?InputFieldborderErrorColor:dmInputFieldborderErrorColor) :   phoneInputFieldborderColor2 ,backgroundColor: !darkMode?phoneInputFieldBackgroundColor:dmphoneInputFieldBackgroundColor ,color:!darkMode?phoneInputFieldTextColor:dmphoneInputFieldTextColor}]}
             onChangeText={(txt)=>{this.setState({phone2:txt,phoneF:false,phoneV:false})
             if ((txt.length == phn2MaxLength && phoneFields==3)) {this.phoneInput_3.focus();}  
             if ((txt.length == "")) {this.phoneInput_1.focus();}
            }} />
         
           {phoneFields==3 &&(  
           <TextInput
           ref={input => {this.phoneInput_3 = input; }}
           keyboardType="number-pad" placeholder={phn3PlaceHolder}  value={phone3} maxLength={phn3MaxLength}     defaultValue={phone3} onFocus={() => this.focusField("phone3") } 
            placeholderTextColor={inputPlaceholderTextColor} style={[styles.phoneinput,{borderColor: (phoneF || phoneV ) ? (!darkMode?InputFieldborderErrorColor:dmInputFieldborderErrorColor) :  phoneInputFieldborderColor3 ,backgroundColor: !darkMode?phoneInputFieldBackgroundColor:dmphoneInputFieldBackgroundColor,color:!darkMode?phoneInputFieldTextColor:dmphoneInputFieldTextColor }]} 
            onChangeText={(txt)=>{this.setState({phone3:txt,phoneF:false,phoneV:false})
            if ((txt.length == "")) {this.phoneInput_2.focus();}
          }}/>
            )}
            
  </View>
            <allOther.CheckError phoneF={phoneF} phoneV={phoneV} countryCode={selectedCountryCode} textColor={!darkMode?errorTextColor:dmerrorTextColor}/>
           
  
</View>
   
 
<Button style={styles.button1}
 onPress={()=>this.SignupClick(name,email,password,cpassword,selectedCountryCode,phone1,phone2,phone3,isInternetConnected,phoneFields)}>
  <Text style={styles.button1Text}>{button1Title}</Text>
</Button>


<View style={{flexDirection:"row",alignItems:"center",marginTop:"7%",alignSelf:"center",marginBottom:10}}>
<Text style={{fontSize:button2FontSize,color:!darkMode?button2LeftTextColor:dmbutton2LeftTextColor}}>Already have an account? </Text>
<TouchableOpacity     onPress={()=>this.LoginHereClick()}>
<Text style={{fontSize:button2FontSize,color:darkMode?button2TextColor:dmbutton2TextColor,fontWeight:"bold"}}>Login here</Text>
</TouchableOpacity>
</View>
 
</Content>
 

      </Container>
  )
}

 
    render() {
      const  {isInternetConnected,darkMode,loader,uid,setUserData} = this.state;
      return (
        <View style={{ flex: 1,backgroundColor:!darkMode ? containerBackgroundColor:dmcontainerBackgroundColor}}>
          {setUserData   && <allOther.firebase.FireBaseFunction type={"set-user-data"} uid={uid} /> } 
          {setUserData   && <allOther.firebase.FireBaseFunction type={"set-products-data"} uid={uid} /> }   
          <allOther.Loader loader={loader} />
          {this.renderSignup()}
          {!isInternetConnected && this.renderShowInternetErrorAlert("No internet connection","Please connect internet.")}
       </View>

       );
     }
  }
  

  const styles = StyleSheet.create({
   title:{fontSize:titleFontSize,color:titleTextColor ,fontWeight:"bold",fontStyle:"italic"},
    button1: {
       backgroundColor:button1BackgroundColor,borderWidth:0.7,borderRadius:20,width:Dimensions.get('window').width/1.5,marginTop:"7%",alignSelf:"center"
    },
     button1Text:{fontSize:button1FontSize,color:button1TextColor,fontWeight:"bold",alignSelf:"center"},
     phoneinput:{fontSize:phoneInputFontSize,width:phoneInputFieldWidth,padding:6,textAlign:"center",borderRadius:phoneInputFieldBorderRadius,marginLeft:5,borderWidth:1},
     Item:{padding:2},
     Input:{fontSize:InputFieldFontSize}
  });

    