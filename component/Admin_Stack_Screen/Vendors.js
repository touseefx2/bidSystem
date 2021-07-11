import React, { useEffect, useState,useRef} from 'react';
import { View,TouchableOpacity,Text,Dimensions,StyleSheet,ScrollView,Animated,TextInput,Platform,Alert,Image} from "react-native";
import  allOther from "../other/allOther"
import Dialog, { DialogContent,DialogFooter,DialogButton,SlideAnimation,DialogTitle} from 'react-native-popup-dialog';
import ImagePicker from 'react-native-image-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import permissions from "../permissions/permissions"
import {productCategory} from "./Category"
import {useSelector  } from 'react-redux'
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import RNFetchBlob from 'rn-fetch-blob'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
 
const cardWidth=windowWidth-35;
const cardHeight=160;

 
 

  export default  function  Vendors(props)  {

  const listViewRef = useRef(); 
  const [loader, setloader] = useState(true)
 
  const scrollY= useRef(new Animated.Value(0)).current;
  
  
  const allVendorsData = useSelector(state => state.vendorReducer)

  useEffect(()=>{
  
setTimeout(() => {
  setloader(false)
}, 800);

 
  },[])

 useEffect(()=>{
   console.log("all v d : ",allVendorsData);
 })
  
 
const blockVendor=  (id)=>{
 
  
  Alert.alert(
    "",
    "Are you sure ?  you want to Block this Vendor ?",
    [
      {
        text: "No",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
      },
      { text: "Yes", onPress: async () => {
         
        try {
          setloader(true);
      
        let resp =  await allOther.firebase.__Update(id,"block")
         
         if(resp){
           allOther.ToastAndroid.ToastAndroid_SB("Vendor Cancel Successful")
          } 
           setloader(false)
     
         } catch (error) {
           setloader(false)
          console.log("block vendor error try cath ==> ",error)
         }

      }
      }
    ]
  );
  
  
  }
  
      const    renderUp=()=>{
        return(
          <View  style={{width:"100%",height:30}}>
   
<TouchableOpacity  style={{alignSelf:"flex-end",marginRight:12,marginTop:5}} onPress={()=>{
  listViewRef.current?.scrollTo({
    offset: 0,
    animated: true,
});
  }} >
     <allOther.vectorIcon.FontAwesome5  style={{opacity:.7}}    size={25} color="black" name="angle-double-up" />
    </TouchableOpacity>
   
         </View>
        )
      } 

      const    renderDown=()=>{
        return(
          <View  style={{width:"100%",height:30,bottom:0}}>
 
    <TouchableOpacity  style={{alignSelf:"flex-end",marginRight:12,marginBottom:5}} onPress={()=>{
       listViewRef.current?.scrollToEnd({ animated: true })
    }} >
     <allOther.vectorIcon.FontAwesome5   style={{opacity:.7}}   size={25} color="black" name="angle-double-down" />
    </TouchableOpacity>
   
         </View>
        )
      }
   
       
      const    RenderVendors  = () => { 
    
        let c=false; //for check empty vndrs or not
         let vendors  =   allVendorsData.vendor.map((item,index)=>{
        
          if(item.block==false){

         c=true;
        let name = item.name || ""
        let email = item.email || ""
        let photo = item.photo|| ""
        let Phone = item.phone|| ""
        let createdAt = item.createAt || ""
        let id = item.uid || ""
       
 
        name  =   allOther.strLength(name,"name")
       Phone =   allOther.strLength(Phone,"phone")
       email  =   allOther.strLength(email,"email")
        
         
       const scale = scrollY.interpolate({
        inputRange :[
          -1,0,
          cardHeight * index,
          cardHeight * (index+2)
        ]
        ,  
        outputRange:[1, 1, 1, 0]
      })

      const opacity = scrollY.interpolate({
        inputRange :[
          -1,0,
          cardHeight * index,
          cardHeight * (index+0.9)
        ]
        ,  
        outputRange:[1, 1, 1, 0]
      })


       return (
  
 
        <Animated.View style={[styles.card,
          {
          opacity,
          transform:[{scale}]
          }
        ]}>

      

<TouchableOpacity 
style={{position:"absolute",right:0,marginRight:5}}
  onPress={()=>{blockVendor(id)}}>
<Text style={{fontSize:15,textDecorationLine:"underline",color:"red"}}>Block</Text>
</TouchableOpacity>




<TouchableOpacity style={{marginTop:10}}
 onPress={()=>{props.navigation.navigate("ViewVendors",{vid:id})}}>

 
      
 <View style={{flexDirection:"row",alignItems:"center",flexShrink:1,marginTop:5}}>
  <Image  style={{width:60,height:60,borderRadius:30}}  source={{uri:photo}} />  
<View style={{flexShrink:1}}>
<Text style={{color:"#307ecc",fontWeight:"bold",textTransform:"capitalize",fontSize:15,marginLeft:10}}>{name}</Text>    
</View>
</View>

<View style={{marginTop:5,marginLeft:10}}> 
<Text style={{color:"black",fontSize:14}}>{email}</Text> 
<Text style={{color:"black",textTransform:"capitalize",fontSize:14,marginTop:5}}>{Phone}</Text>
</View>




 

       </TouchableOpacity>
       
     


       
    </Animated.View>  
      
 
             )

          }
 })

 
if(!c){
 return <Text style={{fontSize:38,color:"silver",marginTop:"60%",alignSelf:"center"}} >Empty</Text>
}else{
return vendors;
}

}
       
     
return(
  <View style={{flex:1}}>
 
 
 {renderUp()} 
  <allOther.Loader loader={loader}/>

 <ScrollView ref={listViewRef}
onScroll={Animated.event([
  {
    nativeEvent: {
      contentOffset: {
        y: scrollY
      }
    }
  }
])}
  scrollEventThrottle={1}
 >
     

              {allVendorsData.vendor.length<=0   && !loader   
              ?(
              <Text style={{fontSize:38,color:"silver",marginTop:"60%",alignSelf:"center"}} >Empty</Text>
              )
             :(
        
            RenderVendors()
              ) 

            }

</ScrollView>    

 {renderDown()} 
 
 
</View>   
)
     }
 
      
  const styles = StyleSheet.create({  
  
    modalContainer: {    
      backgroundColor : 'rgba(0,0,0,0.8)', 
      justifyContent: 'center', 
      alignItems: 'center',
      flex:1,        
       },
    modal: {    
    backgroundColor : "#e3e3e3",   
    height: 350 ,  
    width: '70%',         
     },  
     card:
     {
      marginTop:20,marginBottom:20,alignSelf:"center", width:cardWidth, backgroundColor:"white",
      height:cardHeight,borderRadius:10,padding:10,borderRadius:10,
      elevation:5,
    }
  
  })  