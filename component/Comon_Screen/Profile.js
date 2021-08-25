import React, { useEffect, useState,useRef} from 'react';
import { View,TouchableOpacity,Text,Dimensions,StyleSheet,ScrollView,Modal,Image, Alert} from "react-native";
import  allOther from "../other/allOther"
import {useSelector} from 'react-redux'
import { TextInput } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';

let nameValidate=true
 
  export default  function  Profile(props)  {

    const [loader, setloader] = useState(true)
 

    const [name, setname] = useState("")
    const [email, setemail] = useState("")
    const [phone, setphone] = useState("")
    const [type, settype] = useState("")
   
 
    const userData = useSelector(state => state.userReducer)
 
   
 
  const cef=()=>{
    if(name==""){
      return true
    }else{
      return false
    }
  }
 
 

  useEffect(() => {
    // Anything in here is fired on component mount.
    
    let name = userData.user.name || ""
    let email = userData.user.email || ""
    let phone = userData.user.phone || ""
    let type = userData.user.type|| ""
    
    
    setname(name);setemail(email);setphone(phone);settype(type) 
    setTimeout(() => {
    setloader(false)
    }, 600);

     

}, [userData])

    const onClickUpdate=async ()=>{
  
      if(!cef()){

        nameValidate       = allOther.Validation.NameValidate(name)
        
        if(nameValidate){
 
setloader(true);
    
        try {
          
    const obj={
          name,
           }

        let resp =  await allOther.firebase.__Update(userData.user.uid,obj,"users")
 
        if(resp){

          if(userData.user.type=="bidder"){

       firestore().collection("products").get().then((doc)=>{
          if(doc.size>0){

            doc.forEach((e,i,a)=>{
              let pid=e.id
  
              let u= firestore().collection("products").doc(pid).collection("bids").doc(userData.user.uid)
         
              u.get().then((doc)=>{
              
                if(doc.exists){
                  u.update({
                    bidderName:name
                  })
                }

              })
 



            })

          }
          })

          }
        
          
          
          // doc(pid).collection("bids").doc(userData.user.uid).set(obj).then(
          //   allOther.ToastAndroid.ToastAndroid_SB("Bid Success"),setdialogVisible2(false),Keyboard.dismiss())

          allOther.ToastAndroid.ToastAndroid_SB("Update Successful")
         }
         setloader(false)

        } catch (error) {
          console.log("Update Product error  try cath :  ",error);
          setloader(false)
        }

      }else{
      
        allOther.AlertMessage("","Please enter correct name \nexample: abc12")
        setname(userData.user.name)
      }


      }else{
     
        allOther.AlertMessage("","Please fil empty fields")
      }
      
      
   
    }

   const  renderUser =   ()  => {
 
      return (
       
        <View style={{margin:10,padding:10}}>

   <View style={{flex:1,alignSelf:"center"}}>
      <Image style={{height:150,width:150}} source={require("../../assets/dp.png")}  />  
  </View> 
    

  <TextInput
      style={[styles.textInput,{marginTop:30}]}
      mode="outlined"
      label="Name"
      value={name}
      placeholder="Name"
      onChangeText={(txt)=>setname(txt)}
    />
    
  <TextInput
     style={styles.textInput}
      disabled={true}
      mode="outlined"
      label="email"
      value={email}
      placeholder="email"
    />

 


  <TextInput
      style={styles.textInput}
      mode="outlined"
      disabled={true}
      label="Phone"
      value={phone}
      placeholder="Phone"
    />



<TextInput
     style={styles.textInput}
      disabled={true}
      mode="outlined"
      label="Type"
      value={type}
      placeholder="Type"
    />

 

 
<TouchableOpacity  
style={{backgroundColor: "black",width:100,height:40,borderRadius:20,alignItems:"center",justifyContent:"center",alignSelf:"center",marginTop:40,elevation:5}} 
 onPress={()=>{onClickUpdate()}}
>
<Text style={{color :"white"  ,fontSize:22}}>Update</Text>
</TouchableOpacity>


          </View>
 
        
      )
    }

   

return(
  <View style={{flex:1}}>
 {/* <allOther.Header  title="" nav={props.navigation}/> */}
  <allOther.Loader loader={loader}/>
 
 <ScrollView>      
          {renderUser()}
</ScrollView>    

 
  
 
</View>   
)
     }
 
      
  const styles = StyleSheet.create({  
  
    textInput:
    {
    marginTop:25,
    textTransform:"capitalize"
}
  
  });  