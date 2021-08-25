import React, { useEffect, useState,useRef} from 'react';
import { View,TouchableOpacity,Text,Dimensions,StyleSheet,ScrollView,Animated,Platform,Alert,Image, FlatList} from "react-native";
import  allOther from "../other/allOther"
import Dialog, { DialogContent,DialogFooter,DialogButton,SlideAnimation,DialogTitle} from 'react-native-popup-dialog';
import DropDownPicker from 'react-native-dropdown-picker';
import permissions from "../permissions/permissions"
import {productCategory} from "./Category"
import {useSelector  } from 'react-redux'
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import RNFetchBlob from 'rn-fetch-blob'
import DeviceInfo from 'react-native-device-info';
import ImagePicker from "react-native-customized-image-picker"; 
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import { TextInput } from 'react-native-paper';
import SelectMultiple from 'react-native-select-multiple'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
 
const cardWidth=windowWidth-35;
 


  let  items=null;
  let  docfolder=`Vendor_Products/Photos/`;

  export default  function  Historys(props)  {

  const [pids, setpids] = useState([]) //for check random id not match other product
  const listViewRef = useRef(); 
  const [name, setname] = useState("")
  const [photo, setphoto] = useState([])
  const [category, setcategory] = useState("")
  const [description, setdescription] = useState("")
  const [startingAmount, setstartingAmount] = useState("")
  const [auction, setauction] = useState("")
  const [status, setstatus] = useState("pending")
  const [dialogVisible, setdialogVisible] = useState(false)
  const [dialogClick, setdialogClick] = useState(false)
  const [loader, setloader] = useState(false)
  // const [setAuctiontData, setsetProductData] = useState(false)
 
  const scrollY= useRef(new Animated.Value(0)).current;
  const productsData = useSelector(state => state.productReducer)
  const userData = useSelector(state => state.userReducer)

  const [dtp, setdtp] = useState(false)
  const [tp, settp] = useState(false)
  const [date, setdate] = useState("") //only for show with time
  const [c, setc] = useState(null)
  const [st, setst] = useState("")
  const [et, setet] = useState("")

  const [cb, setcb] = useState([]) //checkbox

  const auctionsData = useSelector(state => state.auctionReducer)
  const bdd = useSelector(state => state.bdReducer)
 
  
  
  

      const    RenderAuctions  = () => { 
    
         let c= false;
         let  auctions  =   auctionsData.auctions.map((item,index)=>{
        
       

          if(item.data.active=="end"){

        
        let name = item.data.name || ""
        let active = item.data.active || ""
        let id=item.id || ""
        name  =   allOther.strLength(name,"name")
        let date=item.data.date
        let st=item.data.st
        let et=item.data.et
        let cb=item.data.cb

        let v=false;
        if(bdd.bd.length>0){

          bdd.bd.map((item,index)=>{
          
            if(userData.user.uid==item.data.bid && id==item.data.aid )
            {
              c=true
              v=true
            }
      
          })
      
        }else{
          c=false
          v=false
        }    



if(v){
 return (
  
 
        <View style={styles.card}>

 

 
<TouchableOpacity onPress={()=>{props.navigation.navigate("History_Products",{aid:id,an:name})}}>
 

<View style={{marginTop:10}}>


      
 <View style={{flexDirection:"row",alignItems:"center",flexShrink:1,marginTop:10}}>
<allOther.vectorIcon.AntDesign size={20} color="#307ecc" name="rightcircle" />
<View style={{flexShrink:1}}>
<Text style={{color:"#307ecc",fontWeight:"bold",textTransform:"capitalize",fontSize:15,marginLeft:10}}>{name}</Text>    
</View>
 </View>

 <View style={{marginLeft:30,marginTop:5}}> 


 <View style={{flexDirection:"row",alignItems:"center"}}>
          <Text style={{color:"black",textTransform:"capitalize",fontSize:14}}>Date</Text> 
          <Text style={{color:"black",textTransform:"capitalize",fontSize:14,position:"absolute",right:0}}>{date}</Text>
  </View>        
          
 <View style={{flexDirection:"row",alignItems:"center",marginTop:5}}>
<Text style={{color:"black",textTransform:"capitalize",fontSize:15}}>start Time</Text>  
<Text style={{color:"black",textTransform:"capitalize",fontSize:15,position:"absolute",right:0}}>{st}</Text>   
 </View>

 <View style={{flexDirection:"row",alignItems:"center",marginTop:5}}>
<Text style={{color:"black",textTransform:"capitalize",fontSize:15}}>end Time</Text>  
<Text style={{color:"black",textTransform:"capitalize",fontSize:15,position:"absolute",right:0}}>{et}</Text>   
 </View>

 <View style={{marginTop:5}}>
<Text style={{color:"black",textTransform:"capitalize",fontSize:15}}>Products : </Text> 

<View style={{flexDirection:"row",flexWrap:"wrap",flex:1}}> 
{cb.length>0 && cb.map((e,i,a)=>{
  return(
    <View style={{backgroundColor:"#2794CA",padding:5,marginLeft:i==0?0:7,borderRadius:15,marginTop:10,marginBottom:10}}>
<Text style={{color:"white",textTransform:"capitalize",fontSize:15}}>{e.value}</Text>   
    </View>
  )
 })}
</View>

 </View>

 <View style={{flexDirection:"row",alignItems:"center",marginTop:5}}>
<Text style={{color:"black",textTransform:"capitalize",fontSize:15}}>Active</Text>  
<Text style={{color:"#307ecc",textTransform:"capitalize",fontSize:15,position:"absolute",right:0}}>{active}</Text>   
 </View>

 </View>

       </View>
       
    
    
     </TouchableOpacity>


       
    </View>  
      
 
             )
}
    
          }
 
       })
    
   if(c){
    return  auctions;
   }  else{
     return    <Text style={{fontSize:38,color:"silver",marginTop:"60%",alignSelf:"center"}} >Empty</Text>
   }  
  

      }
 
 

      
return(
  <View style={{flex:1}}>
 
   
 
  <allOther.Loader loader={loader}/>

 <ScrollView  scrollEventThrottle={1}>
       

              {auctionsData.auctions.length<=0   && !loader   
              ?(
              <Text style={{fontSize:38,color:"silver",marginTop:"60%",alignSelf:"center"}} >Empty</Text>
              )
             :(
        RenderAuctions()
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
      borderRadius:10,padding:10,borderRadius:10,
      elevation:5,
    }
  
  });  