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
import moment from "moment";
import Textarea from 'react-native-textarea';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
 
const cardWidth=windowWidth-35;
 

 
 
  let  docfolder=`Vendor_Products/Photos/`;

  export default  function  Active_Product(props)  {

   

    const {aid,an,st,et}=props.route.params;
    const auctionsData = useSelector(state => state.auctionReducer)
 
  const listViewRef = useRef(); 
 
  const [loader, setloader] = useState(true)
 
 
  const scrollY= useRef(new Animated.Value(0)).current;
  const productsData = useSelector(state => state.productReducer)
  const userData = useSelector(state => state.userReducer)
 
  const [vb, setvb] = useState(false)  //all bider show modal
  const [b, setb] = useState([]) //bidders
  const [pid, setpid] = useState("") //pid
  const [bid, setbid] = useState("") //bid

  const [vbd, setvbd] = useState(false)  //  bider detail show modal
  const [name, setname] = useState("")
  const [email, setemail] = useState("")
  const [phone, setphone] = useState("")
  const [ba, setba] = useState("") //bid at
 
  useEffect(()=>{
setTimeout(() => {
  setloader(false)
}, (400));
  },[])
 

  useEffect(()=>{
  

    const unsub = firestore().collection("products").doc(pid).collection("bids").orderBy("createdAt","desc").onSnapshot((doc)=>{
      let arr=[]

    if(pid!=""){
    if(doc.size>0){
      doc.forEach((e,i,a)=>{
      arr.push(e.data())
      })
    } 
           }
  setb(arr)
})




 return () => {
  // Anything in here is fired on component unmount.
   unsub();
}


  },[pid])


  useEffect(()=>{
 
    if(bid!=""){
    setloader(true)
    }

    const unsubb = firestore().collection("users").doc(bid).onSnapshot((doc)=>{
     

    if(bid!=""){
     
    if(doc.exists){
       let d= doc.data();


       let c =  d.createdAt.toDate()//bcs firbase cnvrt into obj so again parse date
     
      var time =  moment(c).format('hh:mm a')     //10:12 am 
      var date =  moment(c).format("D MMMM Y");   //9 july 2021

      c= date + " at  "+time

       setname(d.name);setemail(d.email);setphone(d.phone);setba(c)
       setTimeout(() => {
         setloader(false) 
       }, 500);
      
    } 
           }

 
})




 return () => {
  // Anything in here is fired on component unmount.
   unsubb();
}


  },[bid])


 
  
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
    
         let  cardHeight=170;
         let c= false;
         let product  =   productsData.products.map((item,index)=>{
        
 
          if(item.data.aid==aid && item.data.block==false){

        c=true;    
        let name = item.data.name || ""
        let catg = item.data.category || ""
        let sba=item.data.sba|| ""
        let noi= item.data.noi || ""
        let id=item.id || ""
        let Pid=item.data.pid
        name  =   allOther.strLength(name,"name")

        let duration = item.data.duration || ""
  
        let stime=""
        let ms=""
           if(duration!=""){
            ms= moment.duration(duration);
           }
        
if(ms!=""){
  let h=ms.hours()
  let m=ms.minutes()
  let s=ms.seconds()

   if(h<=0 && m<=0){
            stime= s+" Seconds"
          }else
          if(h<=0 && s<=0){
            stime= m+" Min "
          }else  if(h<=0 && s>0){
            stime= m+" Min "+": "+s+" Sec"
          }else if(h>0 && s<=0 && m<=0){
            stime= h+" Hours "
          }
        else{
            stime=ms.hours() +" H " + ': ' + ms.minutes()+" M "+": "+ms.seconds()+" S"
          }
}
        
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
          height:cardHeight,
          transform:[{scale}]
          }
        ]}>

      
<View style={{padding:10}}> 




{active=="no" && (
  <TouchableOpacity 
style={{position:"absolute",right:0,marginRight:5}}
  onPress={()=>{removeProducts(id)}}
>
<allOther.vectorIcon.Entypo size={26} color="#de5050" style={{opacity:0.8}} name="cross" />
</TouchableOpacity>
)}


<TouchableOpacity style={{marginTop:10}}
 onPress={()=>{props.navigation.navigate("View_Products",{pid:id,aid:aid,st,et})}} >

     
      
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

 <View style={{flexDirection:"row",alignItems:"center"}}>
<Text style={{color:"black",textTransform:"capitalize",fontSize:14}}>Start Bidding Amount</Text>  
<Text style={{color:"black",textTransform:"capitalize",fontSize:14,position:"absolute",right:0}}>{sba}</Text>   
 </View>

 {stime!=""&&(
   <View style={{flexDirection:"row",alignItems:"center"}}>
<Text style={{color:"black",textTransform:"capitalize",fontSize:14}}>duration</Text>  
<Text style={{color:"black",textTransform:"capitalize",fontSize:12,position:"absolute",right:0}}>{stime}</Text>   
 </View>
)}


 </View>

       </TouchableOpacity>
       
     

       </View>


          
       
     
    </Animated.View>  
      
 
             )
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
      borderRadius:10,borderRadius:10,
      elevation:5,
    }
  
  });  