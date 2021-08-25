import React, { useEffect, useState,useRef} from 'react';
import { View,TouchableOpacity,Text,Dimensions,StyleSheet,ScrollView,Animated,TextInput ,Alert,Image,StatusBar} from "react-native";
import  allOther from "../other/allOther"
import {useSelector ,useDispatch } from 'react-redux'
import allActions  from "../redux/allActions"
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
  
  export default  function  CheckVerification()  {
 
  const [loader, setloader] = useState(true)
  const [logout, setlogout] = useState(false)
  const userData = useSelector(state => state.userReducer)
  const dispatch = useDispatch()
  


  useEffect(()=>{
     
    const db=firestore().collection("users").doc(userData.user.uid)
   
     const unsub= db.onSnapshot(async  (doc)=>{
      
        try {
           db.get().then(async  (doc)=>{
         
           
            let  data= []
          if(doc.exists){
            id=doc.id;
           data = doc.data()
           }  

         
      
          if(data.block==false){

      const unsubb =   auth().onAuthStateChanged( async (user)=> {
            if (user) {
             db.update({
                emailVerified:user.emailVerified
              })
                      }  
       });

   dispatch(allActions.u_action.setUser(data))
            
       unsubb();

          }

       
        })
       
      } catch (error) {
              var errorMessage = error.message;
              var si  = errorMessage.indexOf("]")+1
              var  ei  = errorMessage.length -1
              const msg = errorMessage.substr(si,ei)
               allOther.AlertMessage("",msg)
        }
         
         
    

    })

    setTimeout(() => {
      setloader(false)
    }, 1500);
 
return () => {
  // Anything in here is fired on component unmount.
   
   unsub();
   
}

  },[])
 
 

 const  sendEmailVerificationLink=()=>
{
    auth().currentUser.sendEmailVerification().then(()=>{
      Alert.alert(
        "",
        "Verfication Link Send Success \n \n Please check your E-Mail",
        [
          { text: "OK", onPress: () =>{ setlogout(true) } }
        ]
      )
}).catch((e)=>{
 
  Alert.alert(
    "",
    e,
    [
      { text: "OK", onPress: () => { setlogout(true)}}
    ]
  )


})
}

 const renderEmailVerified=()=>
 {
   return(
     <View style={{backgroundColor:"black",padding:5}}>
     <Text style={{ fontSize:15, flexShrink:1,color: 'white',textTransform:"capitalize",alignSelf:"center"}}>Please verify your email to continue ..</Text>
     </View>
   )
 }


 if(loader){
  return (
<View style={{flex:1,backgroundColor:"white"}}>
<StatusBar hidden={true} /> 
<allOther.Loader loader={loader}/>
</View>
  )
 } else if(!loader)
 {
return(
  <View style={{flex:1,backgroundColor:"white"}}>
    <StatusBar hidden={true} />    
    {logout && <allOther.firebase.FireBaseFunction type={"logout-user"}  />}   

    {renderEmailVerified()}
   
    <View style={{marginTop:Dimensions.get('window').height/2.5,margin:10,alignItems:"center",justifyContent:"center"}}>
   
   <View style={{ backgroundColor:"#307ecc",padding:10,borderRadius:20}}>
   <Text style={{color:"white",fontSize:16,fontWeight:'bold',alignSelf:"center",flexShrink:1}}>Send Verifiction link to your e-mail : {userData.user.email}</Text>
   </View>
  
   <TouchableOpacity style={{ backgroundColor:"black",padding:7,borderRadius:15,marginTop:20,justifyContent:"center",alignItems:"center",width:70,height:40}}
    onPress={()=>sendEmailVerificationLink()}>
   <Text style={{color:"white",fontSize:17,fontWeight:'bold'}}>Send</Text>
   </TouchableOpacity >
  

    </View>


  </View>   
)
     }
 
  
    }  
  const styles = StyleSheet.create({  
  
  });  