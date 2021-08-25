import React, { useEffect, useState,useRef} from 'react';
import { View,TouchableOpacity,Text,Dimensions,StyleSheet,ScrollView,Animated,Platform,Alert,Image,FlatList,Modal} from "react-native";
import  allOther from "../other/allOther"
import {TextInput} from 'react-native-paper';
import Dialog, { DialogContent,DialogFooter,DialogButton,SlideAnimation,DialogTitle} from 'react-native-popup-dialog';
import DropDownPicker from 'react-native-dropdown-picker';
import permissions from "../permissions/permissions"
import {productCategory} from "./Category"
import {useSelector  } from 'react-redux'
import firestore from '@react-native-firebase/firestore';
import MultipleImagePicker from "@baronha/react-native-multiple-image-picker"; 
import DeviceInfo from 'react-native-device-info';
import ImagePicker from "react-native-customized-image-picker"; 
import storage from '@react-native-firebase/storage';
import RNFetchBlob from 'rn-fetch-blob'

import Textarea from 'react-native-textarea';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
 
const cardWidth=windowWidth-35;
const cardHeight=130;

 
  
  export default  function  History_Product(props)  {

    const {aid,an}=props.route.params;
    const auctionsData = useSelector(state => state.auctionReducer)
    const bdd = useSelector(state => state.bdReducer)

  const [pids, setpids] = useState([]) //for check random id not match other product
  const listViewRef = useRef(); 
  const [name, setname] = useState("")
  const [category, setcategory] = useState("")
  const [noi, setnoi] = useState("")
  const [sba, setsba] = useState("")
  const [inc, setinc] = useState("")
  const [description, setdescription] = useState("")
  const [startingAmount, setstartingAmount] = useState("")
  const [status, setstatus] = useState("pending")
  const [dialogVisible, setdialogVisible] = useState(false)
  const [dialogClick, setdialogClick] = useState(false)
  const [loader, setloader] = useState(true)
 
 
  const scrollY= useRef(new Animated.Value(0)).current;
  const productsData = useSelector(state => state.productReducer)
  const userData = useSelector(state => state.userReducer)
 

  const [photo,setphoto]=useState([]);
  const [mv,setmv]=useState(false);    //fulll image render modal vs
  const [p,setp]=useState("");  //slectd photo uri
  const [spi,setspi]=useState(null);  //slectd photo index
  const [cc,setcc]=useState(false);

 
  useEffect(()=>{
setTimeout(() => {
  setloader(false)
}, (400));
  },[])
 

  
 
  
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
  
       
      const    RenderProducts  = (active) => { 
    
         let c= false;
         let product  =   productsData.products.map((item,index)=>{
        
 
          if(item.data.aid==aid && item.data.block==false){

        c=true;    
        let name = item.data.name || ""
        let catg = item.data.category || ""
        let uid=item.data.uid || ""
        let noi= item.data.noi || ""
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


        let v=false;
        if(bdd.bd.length>0){

          bdd.bd.map((item,index)=>{
          
            if(id==item.data.pid )
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
  
 
        <Animated.View style={[styles.card,
          {
          opacity,
          transform:[{scale}]
          }
        ]}>

      

 


<TouchableOpacity style={{marginTop:10}}
 onPress={()=>{props.navigation.navigate("View_Products",{pid:id,aid:aid})}} >

     
      
 <View style={{flexDirection:"row",alignItems:"center",flexShrink:1,marginTop:10}}>
<allOther.vectorIcon.AntDesign size={20} color="#307ecc" name="rightcircle" />
<View style={{flexShrink:1}}>
<Text style={{color:"#307ecc",fontWeight:"bold",textTransform:"capitalize",fontSize:15,marginLeft:10}}>{name}</Text>    
</View>
 </View>

 <View style={{marginLeft:30,marginTop:5}}> 


 <View style={{flexDirection:"row",alignItems:"center",marginTop:5}}>
<Text style={{color:"black",textTransform:"capitalize",fontSize:15}}>category</Text>  
<Text style={{color:"#307ecc",textTransform:"capitalize",fontSize:15,position:"absolute",right:0}}>{catg}</Text>   
 </View>


 <View style={{flexDirection:"row",alignItems:"center"}}>
          <Text style={{color:"black",textTransform:"capitalize",fontSize:14}}>Product Id</Text> 
          <Text style={{color:"black",textTransform:"capitalize",fontSize:14,position:"absolute",right:0}}>{Pid}</Text>
  </View>        
          

 <View style={{flexDirection:"row",alignItems:"center"}}>
<Text style={{color:"black",textTransform:"capitalize",fontSize:14}}>items</Text>  
<Text style={{color:"black",textTransform:"capitalize",fontSize:14,position:"absolute",right:0}}>{noi}</Text>   
 </View>

 </View>

       </TouchableOpacity>
       
     


       
    </Animated.View>  
      
 
             )
        }
       
          }
 
       })
    
   if(c){
    return  product;
   }  else{
     return    <Text style={{fontSize:38,color:"silver",marginTop:"60%",alignSelf:"center"}} >Empty</Text>
   }  
  

      }
       

      let active="";

      auctionsData.auctions.map((item,index)=>{    
        if(item.id==aid){
          active=item.data.active
        }
      })

     
return(
  <View style={{flex:1}}>
 
 <allOther.Header  st={"View All Products"} title={an} nav={props.navigation}/>

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
          

             
            {RenderProducts(active)}
             

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
  
  });  