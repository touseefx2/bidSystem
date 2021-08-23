import React, { useEffect, useState,useRef} from 'react';
import { View,TouchableOpacity,Text,Dimensions,StyleSheet,ScrollView,Animated,Platform,Alert,Image,Modal} from "react-native";
import  allOther from "../other/allOther"
import {useSelector  } from 'react-redux'
import { TextInput } from 'react-native-paper';
import { utils } from '@react-native-firebase/app';
import MultipleImagePicker from "@baronha/react-native-multiple-image-picker"; 
import DeviceInfo from 'react-native-device-info';
import ImagePicker from "react-native-customized-image-picker"; 
import Dialog, { DialogContent,DialogFooter,DialogButton,SlideAnimation,DialogTitle} from 'react-native-popup-dialog';
import storage from '@react-native-firebase/storage';
import RNFetchBlob from 'rn-fetch-blob'
import moment from "moment";
 

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
 
const cardWidth=windowWidth-40;
 
let  docfolder=`Bidder_Bid_Request/Photos/`;
 
  export default  function  PurchaseBid(props)  {

  const [pids, setpids] = useState([]) //for check random id not match other product
  const listViewRef = useRef(); 
  const [name, setname] = useState("")
 
  const [category, setcategory] = useState("")
  const [description, setdescription] = useState("")
  const [startingAmount, setstartingAmount] = useState("")
 
  const [status, setstatus] = useState("pending")
  const [dialogVisible, setdialogVisible] = useState(false)
  const [dialogClick, setdialogClick] = useState(false)
  const [loader, setloader] = useState(false)
  // const [setAuctiontData, setsetProductData] = useState(false)
 
  const [mv, setmv] = useState(false)
  const [dv, setdv] = useState(false)
  const [dc, setdc] = useState(false)
  const [p, setp] = useState("")

  let pbr=3 //per bid rate
 
  const [rb, setrb] = useState("") //rqr bid
  const [pb, setpb] = useState("")  //pymnt by
  const [ta, setta] = useState("")  //total amount
  const [photo, setphoto] = useState([])  //photo 

  const auctionsData = useSelector(state => state.auctionReducer)
  const userData = useSelector(state => state.userReducer)
  const reqData = useSelector(state => state.rbReducer)

  const [apiLevel,setapiLevel]=useState("");
  const getDeviceInfo=()=>{
    DeviceInfo.getApiLevel().then((apiLevel) => {
       setapiLevel(apiLevel)
    });
  } 

  useEffect(()=>{
    getDeviceInfo();
   
  },[])
     
  useEffect(()=>{
if(rb!==""){
  setta(rb*pbr)
}
  },[rb])

  const  uploadImage_android = async () =>
  { 
     if(apiLevel<29){ //29 is andrd 10

      try {
      
        ImagePicker.openPicker({
          multiple: true,
          maxSize:1,
          imageLoader:"UNIVERSAL"
        }).then(res => {
           
 
          let obj=null
          res.map((e,i,a)=>{
            obj={name:e.fileName||"",uri:e.path}
             
          }) 
        
            setphoto(obj)   
     
           
         

        });
      

      } catch (error) {
        console.log("photo picker imgepckr error : ",error)
      }

    }else{

       try {
     let options = {
      mediaType:"image",
      isPreview:false,
        maxSelectedAssets:1
      
                   };

    const res = await MultipleImagePicker.openPicker(options);
    if(res){
       
      let obj=null
      res.map((e,i,a)=>{
        obj={name:e.fileName,uri:e.path}
         
      }) 
           
          
        setphoto(obj)
      }

  

    } catch (error) {
      console.log("photo n picker error : ",error)
    } 
    }
 
   
  }
 
  const renderFullImage=( )=>{
             
    return(
      <Modal
      animationType='fade'
      visible={mv}
      >
  

  <View style={{flex: 1,backgroundColor:"black"}}>
     
     <Image style={{position: 'absolute',
top: 0,
left: 0,
bottom: 0,
right: 0,}} resizeMode="contain"   source={{uri:p}}  />   
  


<View style={{backgroundColor:null,width:"100%",flexDirection:"row",alignItems:"center",position:"absolute",top:5,padding:5,paddingLeft:20}}>

<TouchableOpacity  
onPress={()=>{setmv(!mv);setp("") }}
style={{backgroundColor:"black",borderRadius:25,}}>
<allOther.vectorIcon.Ionicons  name="arrow-back" color="white" size={25} />
</TouchableOpacity> 

 


</View>

      </View>
  
  
    </Modal>
  )


  }

  const checkEmptyFields= ()=> 
{
  
    if(rb=="" || pb=="" || ta==""    || photo.length<=0   ){
      return true;
    } else{
      return false;
    }
}

const renderReqData=()=>{
  let c= false

   
  let product=null

  if(reqData.rb.length>0){
   product =  reqData.rb.map((e,i,a)=>{
    
      let rid=e.id //rqst id
      let data=e.data
 
    
      let cc =  data.createdAt.toDate()//bcs firbase cnvrt into obj so again parse date
         
          var time =  moment(cc).format('hh:mm a')     //10:12 am 
          var date =  moment(cc).format("D MMMM Y");   //9 july 2021

          cc= date + " at  "+time

       if(data.uid==userData.user.uid){
         c=true;
         return(
          <View style={styles.card}>
           

<View style={{padding:10}}>

<View style={{flexDirection:"row",alignItems:"center",flexShrink:1,marginTop:10}}>
          <allOther.vectorIcon.AntDesign size={20} color="#307ecc" name="rightcircle" />
          <View style={{flexShrink:1}}>
          <Text style={{color:"#307ecc",fontWeight:"bold",textTransform:"capitalize",fontSize:14,marginLeft:10}}>{data.pb}</Text>    
          </View>
          <TouchableOpacity onPress={()=>{setp(data.photo);setmv(true)}} style={{position:"absolute",right:0}} >
           <allOther.vectorIcon.MaterialIcons name="insert-photo" size={25} color="#307ecc" />
            </TouchableOpacity>
           </View>
          
           <View style={{marginLeft:30,marginTop:5}}> 
 
                    
           <View style={{flexDirection:"row",alignItems:"center",marginTop:5}}>
          <Text style={{color:"black",textTransform:"capitalize",fontSize:13}}>Required Bids</Text>  
          <Text style={{color:"black",textTransform:"capitalize",fontSize:12,position:"absolute",right:0}}>{data.rb}</Text>   
           </View>
          
           <View style={{flexDirection:"row",alignItems:"center",marginTop:5}}>
          <Text style={{color:"black",textTransform:"capitalize",fontSize:13}}>Total Rs</Text>  
          <Text style={{color:"black",textTransform:"capitalize",fontSize:12,position:"absolute",right:0}}>{data.ta}</Text>   
           </View>
          
          
          
           <View style={{marginTop:5,flexDirection:"row",alignItems:"center"}}>
          <Text style={{color:"black",fontSize:12}}>{cc}</Text>  
          <Text style={{color:data.status=="penidng"?"#307ecc":data.status=="approve"?"green":"red",textTransform:"capitalize",fontSize:12,position:"absolute",right:0}}>{data.status}</Text>   
           </View>

           

           </View>
          
</View>


  {data.fb!="" 
  &&(
    <View style={{flex:1,height:30,justifyContent:"flex-end",marginTop:10,borderBottomRightRadius:10,borderBottomLeftRadius:10,alignItems:"center",justifyContent:"center",backgroundColor:"silver"}}>
 
    <TouchableOpacity 
     onPress={()=>{
      Alert.alert(
       "Feedback",
       data.fb,
       [
          
         { text: "OK", onPress: ()=> {} }
       ]
     );
       }}
    >
     <Text style={{alignSelf:"center",color:"black",fontSize:16}}>View Feedback</Text>
    </TouchableOpacity>
    
    
     
            </View>
  )}         
             
   </View> 
         )
       }

    })
  }else{
    c=false
  }

   

  if(!c){
return <Text style={{fontSize:25,color:"silver",marginTop:"50%",alignSelf:"center"}}>Empty</Text>
  }else{
    return product;
  }

}

const  render_ShowReq = ()=>
{
   
  return(
  <Dialog
    visible={dv}
    hasOverlay={true}
    overlayOpacity={0.8}
    
    dialogTitle={<DialogTitle style={{backgroundColor:"#307ecc"}} textStyle={{color:"white"}}  title="Purchase Bid Requests" />}s
    footer={
      <DialogFooter style={{backgroundColor:"#307ecc"}}>
        <DialogButton
        style={{backgroundColor:"#307ecc"}}
          text="Close"
          textStyle={{color: "white" }}
          onPress={() => {setdv(false)}}
        />
      </DialogFooter>
    }
    onHardwareBackPress={() => true}
    dialogAnimation={new SlideAnimation({
      slideFrom: 'bottom',
    })}
    dialogStyle={{backgroundColor:"white",borderRadius:10}}
  >
 
    <DialogContent style={{width:windowWidth,height:windowHeight/1.3}}>
 <ScrollView showsVerticalScrollIndicator={false}>
  {renderReqData()}
</ScrollView>
    </DialogContent>

  </Dialog>

  )

}

const getPathForFirebaseStorage = async(uri) => {
  if (Platform.OS === 'ios')
  {
      return uri
  } 
  const stat = await RNFetchBlob.fs.stat(uri)
  return stat.path
}

const uploaddocumentfirebase = async () =>
{
      setloader(true)
  
        let uri = await getPathForFirebaseStorage(photo.uri)

        storage().ref(`${docfolder}/${userData.user.uid}/${photo.name}`)
        .putFile(uri)
       .then( async (snapshot) => {
          
          await storage().ref(`${docfolder}/${userData.user.uid}/${photo.name}`)
          .getDownloadURL()
          .then((url) => {
            
             submit(url)
             
          }) .catch((e) => {console.log('getting downloadURL of image error => ', e);setloader(false);});

v
     
  }).catch((e)=>{
    setloader(false);
   console.log('uploading dcmnt firebase error => ',e)
  }
  )

  }

  const clearfields =()=>{
    
    setpb("");
    setphoto([]);
    setrb("");
    setta("");
    setp("");
    setmv(false);
    setdialogVisible(false);
    setloader(false);
}

const submit= async (p)=>{
  
  try {
    
    const obj={rb,pb,ta,photo:p,createdAt:new Date(),updatedAt:new Date(),uid:userData.user.uid,status:"pending",fb:""}

    let resp =  await allOther.firebase.__Add_BidReq(obj)
      
    if(resp){
      allOther.ToastAndroid.ToastAndroid_SB("Purchase bid request Successful")
     } 

     clearfields()

  } catch (error) {
    setloader(false);
    console.log("submit bid request error : ",error)
  }



}
 
let c= checkEmptyFields()
return(
  <View style={{flex:1}}>
 
 {mv && renderFullImage()}
 {dc &&  render_ShowReq()}
  <allOther.Loader loader={loader}/>

 <ScrollView   scrollEventThrottle={1}>
  
  <TouchableOpacity onPress={()=>{setdv(true);setdc(true)}} style={{position:"absolute",top:5,right:10}}>
    <Text style={{fontSize:14,textDecorationLine:"underline"}}>Requests</Text>
  </TouchableOpacity>

<View style={{padding:10,margin:10,marginTop:20}}>

<View style={{flexDirection:"row",alignItems:"center",alignSelf:"center"}}>
<Text style={{fontSize:16,color:"black"}}>Per Bid Rate : </Text>
<Text style={{fontSize:16,color:"green",marginLeft:10}}>{pbr} Rs</Text>
</View>

  
<TextInput
      style={{marginTop:30,textTransform:"capitalize",height:40}}
      mode="outlined"
      keyboardType={"number-pad"}
      label="Required Bid"
      value={rb}
      placeholder=""
      onChangeText={(txt)=>setrb(txt)}
    />

{rb!=""&&(
    <View style={{flexDirection:"row",alignItems:"center",marginTop:20}}>
<Text style={{fontSize:16,color:"black"}}>Total Rs     : </Text>
<Text style={{fontSize:16,color:"green",marginLeft:20}}>{ta}</Text>
</View>
)}

    <View style={{marginTop:20}}>
    <Text style={{color:rb==""?"silver":"black",fontSize:16}}>Payment Method : </Text>    
        <View style={{marginTop:15}}>

        <TouchableOpacity disabled={rb==""?true:false} onPress={()=>{setpb("Easy Paisa")}}> 
         <View style={{flexDirection:"row",alignItems:"center"}}>   
          <allOther.vectorIcon.AntDesign name="checkcircle" size={20} color={rb==""?"silver":pb=="Easy Paisa"?"green":"black"} />
          <Text style={{marginLeft:10,color:rb==""?"silver":"black"}}>Easy Paisa</Text>
         </View> 
         </TouchableOpacity>

         <TouchableOpacity style={{marginTop:10}} disabled={rb==""?true:false} onPress={()=>{setpb("Jazz Cash")}}> 
         <View style={{flexDirection:"row",alignItems:"center"}}>   
          <allOther.vectorIcon.AntDesign  name="checkcircle" size={20} color={rb==""?"silver":pb=="Jazz Cash"?"green":"black"} />
          <Text style={{marginLeft:10,color:rb==""?"silver":"black"}}>Jazz Cash</Text>
         </View> 
         </TouchableOpacity>

         <TouchableOpacity   style={{marginTop:10}} disabled={rb==""?true:false} onPress={()=>{setpb("Bank")}}> 
         <View style={{flexDirection:"row",alignItems:"center"}}>   
          <allOther.vectorIcon.AntDesign name="checkcircle" size={20} color={rb==""?"silver":pb=="Bank"?"green":"black"} />
          <Text style={{marginLeft:10,color:rb==""?"silver":"black"}}>Bank</Text>
         </View> 
         </TouchableOpacity>
         
        </View>   
    </View>


{photo.length<=0&&(
  <Text style={{fontSize:14,color:(rb=="" || pb=="")?"silver":"black",marginTop:20}}>
       Please send payment to admin account throug selected method and upload payment confirmation receipt 
     </Text>
)}
    
 

 {photo.length<=0?(
   <View style={{alignSelf:"center",marginTop:20}}>
 <TouchableOpacity onPress={()=>{uploadImage_android()}} disabled={(rb!="" && pb !="")==""?true:false} style={{alignItems:"center",justifyContent:"center"}}>
 <allOther.vectorIcon.MaterialIcons name="insert-photo" size={50} color={(rb!="" && pb !="")==""?"silver":"green"} />
 <Text style={{fontSize:14,marginTop:5,color:(rb!="" && pb !="")==""?"silver":"black"}}>Upload Receipt</Text>
 </TouchableOpacity>
 </View>
 ):(
<View style={{flexDirection:"row",alignItems:"center",marginTop:20}}>
  <TouchableOpacity onPress={()=>{setp(photo.uri);setmv(true)}}>
    <Image source={{uri:photo.uri}}  style={{width:150,height:150,borderColor:"green",borderWidth:0.5}}    />
 </TouchableOpacity>
<TouchableOpacity style={{marginLeft:10}} onPress={()=>setphoto([])} >
  <allOther.vectorIcon.Entypo name="cross" size={35} color="red" />
</TouchableOpacity>
</View>
 )}
 
  
 
   


</View>

    
</ScrollView>    

<View style={{width:"90%",justifyContent:"flex-end",marginBottom:15,backgroundColor:c ?"silver":"green",alignItems:"center",justifyContent:"center",alignSelf:"center",height:40,borderRadius:10,marginTop:10}}>
<TouchableOpacity onPress={()=>{

Alert.alert(
  "Confirm Request",
  "Are you sure youn want to confirm purchase bid requsest ?",
  [
    {
      text: "Cancel",
      onPress: () => console.log("Cancel Pressed"),
      style: "cancel"
    },
    { text: "OK", onPress: () => {
      uploaddocumentfirebase()
    } }
  ]
);

}} disabled={c?true:false} >
<Text style={{color:c?"#8a8a8a":"white",fontWeight:"bold",fontSize:16}}>Purchase Bid</Text>
</TouchableOpacity>
</View>
 
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
      elevation:7,
    }
  
  });  