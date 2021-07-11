import React, { useEffect, useState,useRef} from 'react';
import { View,TouchableOpacity,Text,Dimensions,StyleSheet,ScrollView,Animated,Platform,Alert,Image} from "react-native";
import  allOther from "../other/allOther"
import {useSelector} from 'react-redux'
 
import { TextInput } from 'react-native-paper';

 

  export default  function  ViewVendors(props)  {

    const  {vid} = props.route.params;
    const allVendorsData = useSelector(state => state.vendorReducer)
 
 
   const  renderProfile  =   ()  => {

    let vendor  =   allVendorsData.vendor.map((item,index)=>{

    if(item.uid==vid){

      let name = item.name || ""
      let email = item.email || ""
      let photo = item.photo|| ""
      let Phone = item.phone|| ""
      // let createdAt =  item.createdAt || ""
      let id = item.uid || ""
      let emailVerified=  JSON.stringify(item.emailVerified) || ""
  
      return(
        <View style={{marginBottom:20,margin:10,padding:10}}>
      
        
 
      <Image style={{width:250,height:250,alignSelf:"center"}} source={ {uri:photo}}/>
    
     
      
       
      
        <View style={{ marginTop:"5%"}}>
       
       
      <TextInput
            style={styles.textInput}
            disabled={true}
            mode="outlined"
            multiline
            label="Name"
            value={name}
            placeholder="Name"
            // right={<TextInput.Affix text="/100" />}
          />

          <TextInput
            style={styles.textInput}
            disabled={true}
            mode="outlined"
            label="Email"
            multiline={true}
            scrollEnabled={true}
            value={email}
            placeholder="Email"
          />
      
      <TextInput
            style={styles.textInput}
            disabled={true}
            mode="outlined"
            label="email Verified"
            value={emailVerified}
            placeholder="email Verified"
          />
      
      <TextInput
            style={styles.textInput}
            disabled={true}
            mode="outlined"
            label="Phone"
            value={Phone}
            placeholder="Phone"
          />
      
      
      <TextInput
            style={styles.textInput}
            disabled={true}
            mode="outlined"
            label="id"
            multiline={true}
            scrollEnabled={true}
            value={id}
            placeholder="id"
          />
     
       
     {/* <TextInput
            style={styles.textInput}
            disabled={true}
            mode="outlined"
            label="createdAt"
            value={createdAt}
            placeholder="createdAt"
          /> */}
                  
        </View> 
      
      
      
      </View>
      
      ) 



    }
 
    })

    return vendor;

    }

 
return(
  <View style={{flex:1}}>
 <allOther.Header  title="" nav={props.navigation}/>
 <ScrollView>      
 {allVendorsData.vendor.length<=0      
              ?(
              <Text style={{fontSize:38,color:"silver",marginTop:"60%",alignSelf:"center"}} >Empty</Text>
              )
             :(
        
            renderProfile()
              ) 

            }
</ScrollView>    

 
  
 
</View>   
)
     }
 
      
  const styles = StyleSheet.create({  
  
    textInput:
    {
    marginTop:20,
    textTransform:"capitalize",
    fontSize:14,
}
  
  });  