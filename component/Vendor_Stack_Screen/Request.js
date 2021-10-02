import React, { useEffect, useState,useRef} from 'react';
import { View,TouchableOpacity,Dimensions,StyleSheet,ScrollView,Animated,Platform,Alert,Image,Modal} from "react-native";
import  allOther from "../other/allOther"
import {useSelector  } from 'react-redux'
import moment from "moment";
import { Container, Content, Item, Input ,Text } from 'native-base'; 
import firestore from '@react-native-firebase/firestore';
import Dialog, { DialogContent,DialogFooter,DialogButton,SlideAnimation,DialogTitle} from 'react-native-popup-dialog';
import DeviceInfo from 'react-native-device-info';

import storage from '@react-native-firebase/storage';
import RNFetchBlob from 'rn-fetch-blob'
import ImagePicker from "react-native-customized-image-picker"; 
import MultipleImagePicker from "@baronha/react-native-multiple-image-picker"; 

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
 
const cardWidth=windowWidth-35;
  
  let  docfolder=`BidderProduct_Payment/Photos/`;
 
  export default  function  Request(props)  {

    const [mvvv,setmvvv]=useState(false); //amin detail modal
  const [loader, setloader] = useState(true)

  const [vv ,setvv]=useState(false);   // reject modal
  const [rid ,setrid]=useState(""); 
  const [fdb ,setfdb]=useState("");

  const [yp, setyp] = useState([])
  const [dialogVisible, setdialogVisible] = useState(false)
  const [dialogClick, setdialogClick] = useState(false)

  const [pb, setpb] = useState("")  //pymnt by
  const [photo, setphoto] = useState("")  //photo 
  const [p, setp] = useState("")
  const [mv, setmv] = useState(false)

  const [tp, settp] = useState("")  //total amount
  const [pid, setpid] = useState("")  //total amount
  const [pn, setpn] = useState("")  //total amount
  const [pc, setpc] = useState("")  //total amount

  const [hbid, sethbid] = useState("")  //total amount

 
   const userData = useSelector(state => state.userReducer)
   const productsData = useSelector(state => state.productReducer)
 

useEffect(()=>
{
  getDeviceInfo();
  const unsub = firestore().collection("Hb").orderBy("createdAt","desc").onSnapshot((doc)=>{

    let arr=[]
    if(doc.size>0){

      doc.forEach((ee,ii)=>{

        let id=ee.id;
        let d=ee.data();

         if(userData.user.uid==d.vid){
           const obj={id:id,data:d}
          arr.push(obj)
         }


      })

       }
       setyp(arr)

  })
  setTimeout(() => {
    setloader(false)
  }, 800);
  
  return () => 
  {
   unsub();
  }
  
},[])
 

const [apiLevel,setapiLevel]=useState("");
const getDeviceInfo=()=>{
  DeviceInfo.getApiLevel().then((apiLevel) => {
     setapiLevel(apiLevel)
  });
} 

const  uploadImage_android = async () =>
{ 
   if(apiLevel<29){ //29 is andrd 10

    try {
    
      ImagePicker.openPicker({
        multiple: false,
        maxSize:1,
        imageLoader:"UNIVERSAL"
      }).then(res => {
         


        let obj=null
        res.map((e,i,a)=>{

          RNFetchBlob.fs.stat(e.path)
          .then((stats) => { 
           let  name=stats.filename
           obj={name:name,uri:e.path}

           setphoto(obj) 
          })
 
           
        }) 
      
         
       

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
  
const clearfields=() =>{
  setdialogVisible(false);
  setpid("");settp("");setpn("");setpc("");setp("");setphoto("");setpb("");sethbid("")
}

const submit= async (p)=>{
  
  try {
    
    const obj={pb,photo:p}

    let resp =  await  firestore().collection("Hb").doc(hbid).update({pi:obj,status:"pending"})
      
    if(resp){
      allOther.ToastAndroid.ToastAndroid_SB("Payment Sent Successful")
     } 

     clearfields()

  } catch (error) {
    setloader(false);
    console.log("submit bid request error : ",error)
  }



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

 
     
  }).catch((e)=>{
    setloader(false);
   console.log('uploading dcmnt firebase error => ',e)
  }
  )

  }
  
const onSend=()=>{

  if(pb==""||photo==""){
  allOther.AlertMessage("","Please select payment method or upload photo ")
  }else{
 uploaddocumentfirebase()
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

const  render_Payment = ()=>
{
  
  return(
  <Dialog
    visible={dialogVisible}
    hasOverlay={true}
    overlayOpacity={0.8}
    
    dialogTitle={<DialogTitle style={{backgroundColor:"#307ecc"}} textStyle={{color:"white"}}  title="Payment Process" />}s
    footer={
      <DialogFooter style={{backgroundColor:"#307ecc"}}>
        <DialogButton
        style={{backgroundColor: "white"}}
          text="Cancel"
          textStyle={{color: "black"}}
          onPress={() => { clearfields()}}
        />
        <DialogButton
          text="Send"
          textStyle={{color:"white"}}
          style={{backgroundColor:"#307ecc"}}
          onPress={() => { onSend()}}
        />
      </DialogFooter>
    }
    onHardwareBackPress={() => true}
    dialogAnimation={new SlideAnimation({
      slideFrom: 'bottom',
    })}
    dialogStyle={{backgroundColor:"white",borderRadius:20}}
  >
    {mvvv&& ViewDetail()}    
    {mv&&renderFullImage()} 
    <allOther.Loader loader={loader} /> 

    <DialogContent style={{width:windowWidth-10,height:windowHeight/1.3}}>
    <ScrollView   showsVerticalScrollIndicator={false}>
 
    <View style={{padding:15,margin:5,marginTop:20}}>

<View style={{flexDirection:"row",justifyContent:"space-between"}}>
<Text style={{fontSize:16,color:"black"}}>Total Price :</Text>
<Text style={{fontSize:16,color:"green",marginLeft:10}}>{tp} Rs</Text>
</View>

<View style={{flexDirection:"row",justifyContent:"space-between"}}>
<Text style={{fontSize:16,color:"black"}}>Procuct id :</Text>
<Text style={{fontSize:16,color:"green",marginLeft:10}}>{pid}</Text>
</View>

<View style={{flexDirection:"row",justifyContent:"space-between"}}>
<Text style={{fontSize:16,color:"black"}}>Procuct Name :</Text>
<Text style={{fontSize:16,color:"green",marginLeft:10}}>{pn}</Text>
</View> 

<View style={{flexDirection:"row",justifyContent:"space-between"}}>
<Text style={{fontSize:16,color:"black"}}>Category :</Text>
<Text style={{fontSize:16,color:"green",marginLeft:10}}>{pc}</Text>
</View> 
 

    <View style={{marginTop:20}}>
    <Text style={{color:"black",fontSize:16}}>Payment Method : </Text>    
        <View style={{marginTop:15}}>

        <TouchableOpacity   onPress={()=>{setpb("Easy Paisa")}}> 
         <View style={{flexDirection:"row",alignItems:"center"}}>   
          <allOther.vectorIcon.AntDesign name="checkcircle" size={20} color={pb=="Easy Paisa"?"green":"black"} />
          <Text style={{marginLeft:10,color:"black"}}>Easy Paisa</Text>
         </View> 
         </TouchableOpacity>

         <TouchableOpacity style={{marginTop:10}}   onPress={()=>{setpb("Jazz Cash")}}> 
         <View style={{flexDirection:"row",alignItems:"center"}}>   
          <allOther.vectorIcon.AntDesign  name="checkcircle" size={20} color={ pb=="Jazz Cash"?"green":"black"} />
          <Text style={{marginLeft:10,color:"black"}}>Jazz Cash</Text>
         </View> 
         </TouchableOpacity>

         <TouchableOpacity   style={{marginTop:10}}   onPress={()=>{setpb("Bank")}}> 
         <View style={{flexDirection:"row",alignItems:"center"}}>   
          <allOther.vectorIcon.AntDesign name="checkcircle" size={20} color={ pb=="Bank"?"green":"black"} />
          <Text style={{marginLeft:10,color:"black"}}>Bank</Text>
         </View> 
         </TouchableOpacity>
         
        </View>   
    </View>


{photo==""&&(
  <View>
  <Text style={{fontSize:14,color:(pb=="")?"silver":"black",marginTop:20}}>
       Please send payment to vednor account throug selected method and upload payment confirmation receipt 
     </Text>
     <TouchableOpacity onPress={()=>{setmvvv(true)}}>
     <Text style={{fontSize:12,color:(pb=="")?"silver":"green",textDecorationLine:"underline"}}>
       Account Detail 
     </Text> 
     </TouchableOpacity>
</View>
)}
    
 

 {photo==""?(
   <View style={{alignSelf:"center",marginTop:20}}>
 <TouchableOpacity onPress={()=>{uploadImage_android()}} disabled={( pb !="")==""?true:false} style={{alignItems:"center",justifyContent:"center"}}>
 <allOther.vectorIcon.MaterialIcons name="insert-photo" size={50} color={(  pb !="")==""?"silver":"green"} />
 <Text style={{fontSize:14,marginTop:5,color:(  pb !="")==""?"silver":"black"}}>Upload Receipt</Text>
 </TouchableOpacity>
 </View>
 ):(
<View style={{flexDirection:"row",alignItems:"center",marginTop:20}}>
  <TouchableOpacity onPress={()=>{setp(photo.uri);setmv(true)}}>
    <Image source={{uri:photo.uri}}  style={{width:150,height:150,borderColor:"green",borderWidth:0.5}}    />
 </TouchableOpacity>
<TouchableOpacity style={{marginLeft:10}} onPress={()=>{setphoto("");setp("")}}>
  <allOther.vectorIcon.Entypo name="cross" size={35} color="red" />
</TouchableOpacity>
</View>
 )}
 
  
 
   


</View>


      </ScrollView>
    </DialogContent>

  </Dialog>

  )

}
 
const renderProductData=()=>{       
 
  
  let product =  yp.map((e,i,a)=>{
    
       let id=e.id //rqst id
       let data=e.data
       let Pid=data.pid
       let done=data.done
       let status=data.status
       let pi =data.pi
       let fb=data.fb
       let bid=data.bid
       let price=data.price
       let cc =data.createdAt.toDate()//bcs firbase cnvrt into obj so again parse date
        var time =  moment(cc).format('hh:mm a')     //10:12 am 
        var date =  moment(cc).format("D MMMM Y");   //9 july 2021
        cc= date + " at  "+time

      let pn=""
      let pid=""
      let category=""

      console.log("pi : ",pi)

 productsData.products.map((item,index)=>{

if(item.id==Pid){
let d=item.data;
pn=d.name
pid=d.pid
category=d.category
return false;
        }

      })


      if(pi!==false){
          return(
   


  <View style={styles.card}>


   <View style={{padding:10}}>

 
        <TouchableOpacity onPress={()=>{setp(pi.photo);setmv(true)}} style={{position:"absolute",right:5,top:5}} >
         <allOther.vectorIcon.MaterialIcons name="insert-photo" size={25} color="#307ecc" />
        </TouchableOpacity>
 
   


<TouchableOpacity style={{marginTop:pi!==false?20:0}}
 onPress={()=>{props.navigation.navigate("View_Request",{pid:Pid,bid:bid})}} >
 
      
 <View style={{flexDirection:"row",alignItems:"center",flexShrink:1}}>
<allOther.vectorIcon.AntDesign size={20} color="#307ecc" name="rightcircle" />
<View style={{flexShrink:1}}>
<Text style={{color:"#307ecc",fontWeight:"bold",textTransform:"capitalize",fontSize:15,marginLeft:10}}>{pn}</Text>    
</View>
 </View>

 <View style={{marginLeft:30,marginTop:5}}> 


 <View style={{flexDirection:"row",alignItems:"center",marginTop:5}}>
<Text style={{color:"black",textTransform:"capitalize",fontSize:15}}>category</Text>  
<Text style={{color:"#307ecc",textTransform:"capitalize",fontSize:15,position:"absolute",right:0}}>{category}</Text>   
 </View>


 <View style={{flexDirection:"row",alignItems:"center"}}>
          <Text style={{color:"black",textTransform:"capitalize",fontSize:14}}>Product Id</Text> 
          <Text style={{color:"black",textTransform:"capitalize",fontSize:14,position:"absolute",right:0}}>{pid}</Text>
  </View>        
          

 <View style={{flexDirection:"row",alignItems:"center"}}>
<Text style={{color:"black",textTransform:"capitalize",fontSize:14}}>Price</Text>  
<Text style={{color:"black",textTransform:"capitalize",fontSize:14,position:"absolute",right:0}}>{price}</Text>   
 </View>



 
 <View style={{flexDirection:"row",alignItems:"center"}}>
 <Text style={{color:"black",textTransform:"capitalize",fontSize:14}}>Payment Method</Text>  
 <Text style={{color:"black",textTransform:"capitalize",fontSize:14,position:"absolute",right:0}}>{pi.pb}</Text>   
  </View>

  {(status!="pending")&&(
 <View style={{flexDirection:"row",alignItems:"center"}}>
 <Text style={{color:"black",textTransform:"capitalize",fontSize:14}}>Status</Text>  
 <Text style={{color:"black",textTransform:"capitalize",fontSize:14,position:"absolute",right:0}}>{status}</Text>   
  </View>
)} 

{done==true&&(
 <View style={{marginTop:10,alignSelf:"flex-end"}}>
<allOther.vectorIcon.AntDesign name="check" color="green" size={25} />  
  </View>
)}





 </View>

 
 {status=="pending"&&(
    <Text style={{fontSize:12,marginLeft:30,marginTop:10}}>
     Please approve product for this bidder and deliver product  
   </Text>
 )}
  
 

       </TouchableOpacity>
       
     

   </View>


{status=="pending"&&(
   <View style={{flex:1,height:35,justifyContent:"flex-end",marginTop:10,borderBottomRightRadius:10,borderBottomLeftRadius:10,alignItems:"center",justifyContent:"center"}}>

<View style={{flexDirection:"row",alignSelf:"flex-end",marginRight:10,alignItems:"center"}}>

<TouchableOpacity onPress={()=>{onclick(false,id)}}>
<allOther.vectorIcon.Entypo name="cross" size={30} color="red"/>
</TouchableOpacity>

<TouchableOpacity style={{marginLeft:20}} onPress={()=>{onclick(true,id)}}>
<allOther.vectorIcon.Entypo name="check" size={30} color="green"/>
</TouchableOpacity>

</View>


        </View>
        )}

  

{fb!="" 
  &&(
    <View style={{flex:1,height:40,justifyContent:"flex-end",marginTop:10,borderBottomRightRadius:10,borderBottomLeftRadius:10,alignItems:"center",justifyContent:"center",backgroundColor:"silver"}}>
 
    <TouchableOpacity 
     onPress={()=>{
      Alert.alert(
       "Feedback",
       fb,
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
 
    return product;
}
 
const ViewDetail =()=>{
  return(
      <Modal
      animationType='fade'
      transparent={false}
      visible={mvvv}
      >
    
      <View style={{ flex: 1}}>
    
    
<TouchableOpacity style={{left:10,marginTop:5}} onPress={()=>{setmvvv(false)}}
>
<allOther.vectorIcon.Entypo size={40} color="#de5050" style={{opacity:0.8}} name="cross" />
</TouchableOpacity>

<Text style={{alignSelf:"center",marginTop:10,marginBottom:10,fontSize:17}}>Vendor Account Details</Text>

    <ScrollView>
<View style={{padding:20,marginTop:"20%"}}>

<View>
<Text>Easy Paisa :</Text>
<Text>03001212212 </Text>
</View>

<View style={{marginTop:20}}>
<Text>Jazz Cash :</Text>
<Text>03001212212 </Text>
</View>

<View style={{marginTop:20}}>
<Text>HBL Bank :</Text>
<Text>03070104564483</Text>
</View>


</View>

   </ScrollView>

      </View>
  
    </Modal>
  )
  }

  const onclick =  async (c,id)=>{

    try {
  
    if(c){
  
      Alert.alert(
        "Confirmation",
        "Do you want to confim approve request ",
        [
          {
            text: "Cancel",
            onPress:   () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "OK", onPress: async () => 
       {
    setloader(true);
  
  
    let resp =  await  firestore().collection("Hb").doc(id).update({status:"deliver"})
     if(resp){
   
      allOther.ToastAndroid.ToastAndroid_SB("Approve")
     }
     setloader(false)
  
          } }
        ]
      );
  
   
    }else{
      setvv(true);setrid(id) 
    }
  
  } catch (error) {
    console.log("Update rqst bid error  try cath :  ",error);
    setloader(false)
  }
  
  }
  
  const renderRejectSubmitModal=()=>{
    return(
    <Modal
    animationType='fade'
    transparent={true}
    onRequestClose={()=>{setvv(false)}}
    visible={vv}
  >
    <View style={{
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.5)',
      justifyContent: 'center', alignItems: 'center'
    }}>
  
      <View style={{
        backgroundColor: '#fff', height: 260,
        width: 300,
        padding:30,
      }}>
  
        <Text style={{ fontSize: 20,fontWeight:"bold"}}>Confirmation</Text>
  
        <Text style={{ fontSize:17,color:"black",marginTop:10}}>Do you want to confim reject request</Text>
  
  
           <Item style={{backgroundColor:"white",borderRadius:4,height:44,padding:5,marginTop:10,borderColor:"#007069"}} rounded>
            <Input  style={{color: "black",fontSize:16}}
            placeholder='Feedback' placeholderTextColor={"#686868"} value={fdb}    
             onChangeText={(txt)=>setfdb(txt)} />
            </Item>
  
   
      
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width:160,position:"absolute",bottom:10,right:10
          }}
        >
            
          <TouchableOpacity 
          onPress={() => {
            setvv(false);setfdb("");setrid("") 
          }}
            style={{
              width: 60, height: 40,
              justifyContent: 'center', alignItems: 'center',
            }}
          >
            <Text style={{
              fontSize: 14,
              color: 'black'
            }} >CANCEL</Text>
          </TouchableOpacity>
       
  
          <TouchableOpacity onPress={async () => {
                
                if(fdb==""){allOther.AlertMessage("","Please enter feedback !")}
                else
                {
   
                  setloader(true);
                   
               
                  let resp =  await  firestore().collection("Hb").doc(rid).update({fb:fdb,status:"reject"})
                   
                    if(resp){
                     allOther.ToastAndroid.ToastAndroid_SB("Reject")
                    }
                    setvv(false);setfdb("");setrid("");
                    setloader(false) 
                    
                }
              
          }
        
        }
            style={{
              width: 60,
              height: 40,
              justifyContent: 'center', alignItems: 'center',
            }}
          >
            <Text style={{
              fontSize: 14,
              color: 'black'
            }}>OK</Text>
          </TouchableOpacity >
  
        </View>
      </View>
    </View>
  </Modal>
    )
  }
   
return(
  <View style={{flex:1}}>
 
 {mv&&renderFullImage()}
 {vv && renderRejectSubmitModal()}
 {/* {dialogClick &&  render_Payment()}   */}
  <allOther.Loader loader={loader}/>

{yp.length<=0 ?(
  <Text style={{fontSize:25,color:"silver",marginTop:"50%",alignSelf:"center"}}>Empty</Text>
):(
  <ScrollView   scrollEventThrottle={1}>
  {renderProductData()}
 </ScrollView>    
)}

 
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