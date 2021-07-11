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
const cardHeight=110;
 
 

  export default  function  Request(props)  {

  const [pids, setpids] = useState([]) //for check random id not match other product
  const listViewRef = useRef(); 
  const [name, setname] = useState("")
  const [photo, setphoto] = useState("")
  const [blockUser,setblockuser]=useState([])
  const [photoName, setphotoName] = useState("")
  const [category, setcategory] = useState("")
  const [description, setdescription] = useState("")
  const [startingAmount, setstartingAmount] = useState("")
  const [auction, setauction] = useState("")
  const [status, setstatus] = useState("pending")
  const [loader, setloader] = useState(true)
 
 
  const productsData = useSelector(state => state.productReducer)  //all
  const userData = useSelector(state => state.userReducer)        
 
  useEffect(()=>{
   
  },[])

 
 
const onClickReject=  (id)=>{
 
  
  Alert.alert(
    "",
    "Are you sure ?  you want to Cancel ?",
    [
      {
        text: "No",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
      },
      { text: "Yes", onPress: async () => {
         
        try {
          setloader(true);
          let resp =  await allOther.firebase.__Remove_Item(id)
         
         if(resp){
           allOther.ToastAndroid.ToastAndroid_SB("Product Cancel Successful")
          } 
           setloader(false)
     
         } catch (error) {
           setloader(false)
          console.log("remove prdct error try cath ==> ",error)
         }

      }
      }
    ]
  );
  
  
  }
 
  
 
 const  onClickaccept = async (url)=>{
      
    try {
      let photo=url;
      let pid="";
      if(pids.length==0){
        pid= random();
      }else{
        pid=random();
        var pidscontainspid = (pids.indexOf(pid) > -1);
        while(pidscontainspid){
          pid=random();
          pidscontainspid = (pids.indexOf(pid) > -1);
        }
      }
    
        const obj={
       name,
       photo,
       startDate:"",
       endDate:"",
       photoName,
       category,
       startingAmount,
       auction,
       description,
       uid:userData.user.uid,
       status,
       pid,
       createdAt:new Date(),
       updatedAt:new Date()
        }


     let resp =  await allOther.firebase.__Add_Product(obj)
    
    if(resp){
      allOther.ToastAndroid.ToastAndroid_SB("Product Add Successful")
      setsetProductData(true);setdialogVisible(false)
     }
      
     setloader(false)
    } catch (error) {
      setloader(false)
     console.log("addprdct error try cath ==> ",error)
    }
   
    
   }
  
       
      const    RenderProducts  = () => { 
    
         let product  =   productsData.products.map((item,index)=>{
        
        let name = item.data.name || ""
        let status = item.data.status || ""
        let id=item.id || ""
        let Pid=item.data.pid
         name  =   allOther.strLength(name,"name")
        
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
  onPress={()=>{removeProducts(id)}}
>
<allOther.vectorIcon.Entypo size={26} color="#de5050" style={{opacity:0.8}} name="cross" />
</TouchableOpacity>




<TouchableOpacity style={{marginTop:10}}
 onPress={()=>{props.navigation.navigate("Update_Product",{pid:id})}} >

     
      
 <View style={{flexDirection:"row",alignItems:"center",flexShrink:1,marginTop:10}}>
<allOther.vectorIcon.AntDesign size={20} color="#307ecc" name="rightcircle" />
<View style={{flexShrink:1}}>
<Text style={{color:"#307ecc",fontWeight:"bold",textTransform:"capitalize",fontSize:15,marginLeft:10}}>{name}</Text>    
</View>
 </View>

 <View style={{marginLeft:30,marginTop:5}}> 


 <View style={{flexDirection:"row",alignItems:"center"}}>
          <Text style={{color:"black",textTransform:"capitalize",fontSize:14}}>Product Id</Text> 
          <Text style={{color:"black",textTransform:"capitalize",fontSize:14,position:"absolute",right:0}}>{Pid}</Text>
  </View>        
          
 <View style={{flexDirection:"row",alignItems:"center",marginTop:5}}>
<Text style={{color:"black",textTransform:"capitalize",fontSize:15}}>status</Text>  
<Text style={{color:"#307ecc",textTransform:"capitalize",fontSize:15,position:"absolute",right:0}}>{status}</Text>   
 </View>

 </View>

       </TouchableOpacity>
       
     


       
    </Animated.View>  
      
 
             )

       })
    
  return  product;

      }
       
     
return(
  <View style={{flex:1}}>
  
  <allOther.Loader loader={loader}/>

 <ScrollView >
        

              {productsData.products.length<=0   && !loader   
              ?(
              <Text style={{fontSize:38,color:"silver",marginTop:"60%",alignSelf:"center"}} >Empty</Text>
              )
             :(
        
            RenderProducts()
              ) 

            }

</ScrollView>    

 
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
  
  });  