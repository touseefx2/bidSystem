import React, { useEffect, useState,useRef} from 'react';
import { View,TouchableOpacity,Text,Dimensions,StyleSheet,ScrollView,Animated,Platform,Alert,Image,FlatList,Modal} from "react-native";
import  allOther from "../other/allOther"
import {TextInput} from 'react-native-paper';
import Dialog, { DialogContent,DialogFooter,DialogButton,SlideAnimation,DialogTitle} from 'react-native-popup-dialog';
import DropDownPicker from 'react-native-dropdown-picker';
import {useSelector  } from 'react-redux'
import firestore from '@react-native-firebase/firestore';
import MultipleImagePicker from "@baronha/react-native-multiple-image-picker"; 
import DeviceInfo from 'react-native-device-info';
import ImagePicker from "react-native-customized-image-picker"; 
import storage from '@react-native-firebase/storage';
import RNFetchBlob from 'rn-fetch-blob'
import moment from "moment";
import CountDown from 'react-native-countdown-component';
import Textarea from 'react-native-textarea';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
 
const cardWidth=windowWidth-35;


 
 
  let  docfolder=`Vendor_Products/Photos/`;

  export default  function  Products(props)  {

   

 

    const {aid,an,ac,st,et}=props.route.params;
    const auctionsData = useSelector(state => state.auctionReducer)

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
  const allBiddersData = useSelector(state => state.bidderReducer)
  const allVendorsData = useSelector(state => state.vendorReducer)
 
  const bdd = useSelector(state => state.bdReducer)


  const [photo,setphoto]=useState([]);
  const [mv,setmv]=useState(false);    //fulll image render modal vs
  const [p,setp]=useState("");  //slectd photo uri
  const [spi,setspi]=useState(null);  //slectd photo index
  const [cc,setcc]=useState(false);


  const [vb, setvb] = useState(false)  //all bider show modal
  const [b, setb] = useState([]) //bidders
  const [pid, setpid] = useState("") //pid
  const [bid, setbid] = useState("") //bid

  const [vbd, setvbd] = useState(false)  //  bider detail show modal
  const [bname, setbname] = useState("")
  const [email, setemail] = useState("")
  const [phone, setphone] = useState("")
  const [ba, setba] = useState("") //bid at


  const [apiLevel,setapiLevel]=useState("");
  const getDeviceInfo=()=>{
    DeviceInfo.getApiLevel().then((apiLevel) => {
       setapiLevel(apiLevel)
    });
  }

 

  useEffect(()=>{
  getDeviceInfo();
 
  getProductsId();
setTimeout(() => {
  setloader(false)
}, 400);

  
  },[])

  useEffect(()=>{
  
    if(pid!=""){


      if(bdd.bd.length>0){

        let arr=[]
        bdd.bd.map((e,i,a)=>{
   
          let d=e.data
    
          if(d.pid==pid && d.aid==aid){
    
            
              arr.push(d)
      
            
      
    
          }
       
    
        })
    
        setb(arr)

      }
    
    
      } 


 


//     const unsub = firestore().collection("products").doc(pid).collection("bids").orderBy("createdAt","desc").onSnapshot((doc)=>{
//       let arr=[]

//     if(pid!=""){
//     if(doc.size>0){
//       doc.forEach((e,i,a)=>{
//       arr.push(e.data())
//       })
//     } 
//            }
//   setb(arr)
// })
 
//  return () => {
//   // Anything in here is fired on component unmount.
//    unsub();
// }


  },[pid])


  useEffect(()=>{
 
    if(bid!=""){
    setloader(true)
    }

    
    let c=false        
 
    if(bid!=""){
     
      if( allVendorsData.vendor.length>0){
        allVendorsData.vendor.map((d,i,a)=>{
         if(d.uid==bid){
                 setname(d.name);setemail(d.email);setphone(d.phone);
                 setTimeout(() => {
                   setloader(false) 
                 }, 500);
                   c=true
         }
        })
      }
    
      if(c==false){
    
        if( allBiddersData.bidders.length>0){
            allBiddersData.bidders.map((d,i,a)=>{
           if(d.uid==bid){
            setname(d.name);setemail(d.email);setphone(d.phone);
            setTimeout(() => {
              setloader(false) 
            }, 500);
             c=true
           }
          })
        }
    
      }
    
    
    
    }

    if(!c){
      setTimeout(() => {
        setloader(false) 
      }, 500);
    }
 

  },[bid])

 
  const random=()=>{
    const min = 1;
    const max = 1000000000;
    const rand = min + Math.random() * (max - min);

    return JSON.stringify(rand).substring(0,6);
  }

  const getProductsId = ()=>{
    const db = firestore().collection("products")
   db.onSnapshot((doc)=>{ 
     if(doc.size>0)
     {
      let pid=[]
       doc.forEach(da => {
         const d = da.data()
          pid.push(d.pid)
       });
      setpids(pid)
     } 
  //unsubscribe();
   })
  }

 const  uploadImage_android = async () =>
  {
   
   

     if(apiLevel<29){ //29 is andrd 10

      try {
      
        ImagePicker.openPicker({
          multiple: true,
          maxSize:3,
          imageLoader:"UNIVERSAL"
        }).then(res => {
           

          if(photo.length>0  )
          {
            let arr=photo 
            res.map((e,i,a)=>{
              const obj={name:e.fileName,uri:e.path}
             arr.push(obj)
           }) 

       
            setphoto(arr)   
            setcc(!cc)
           
                
          }
          else
          {
            let arr=[]
            res.map((e,i,a)=>{
              const obj={name:e.fileName,uri:e.path}
              arr.push(obj)
            }) 
            setphoto(arr)
          }


        });
      

      } catch (error) {
        console.log("photo picker imgepckr error : ",error)
      }

    }else{

       try {
     let options = {
      mediaType:"image",
      isPreview:false,
      maxSelectedAssets:3
      
                   };

    const res = await MultipleImagePicker.openPicker(options);
    if(res){
      if(photo.length>0)
      {
        let arr=photo  
        res.map((e,i,a)=>{
         const obj={name:e.fileName,uri:e.path}
         arr.push(obj)
       }) 

    
         setphoto(arr) 
          setcc(!cc)
      
             
           
      }
      else
      {
        let arr=[]
        res.map((e,i,a)=>{
          const obj={name:e.fileName,uri:e.path}
          arr.push(obj)
        }) 
        setphoto(arr)
      }

    }

    } catch (error) {
      console.log("photo n picker error : ",error)
    } 
    }
 
   
  }
   
  const clearfields =()=>{
    setdialogVisible(false);
    setloader(false)
    setname("");
    setinc("");
    setsba("");
    setnoi("");
    setcategory("");
    setdescription("");
    setphoto([]) ;
    setstartingAmount("");

}

const checkEmptyFields= ()=> 
{
  
    if(name=="" || startingAmount=="" || description==""  || category=="" || photo.length<=0 || photo.length>3  || sba=="" || inc=="" || noi=="" ){
      return false;
    } else{
      return true;
    }
}

const removeProducts=  (id)=>{
   
  Alert.alert(
    "",
    "Are you sure ?  you want to delete product in this auction ?",
    [
      {
        text: "No",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
      },
      { text: "Yes", onPress: async () => {
         
        try {
          setloader(true);
          let resp =  await allOther.firebase.__Remove_Item(id,"products")
         
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
 
  try{  

    
    setloader(true);
  
    if(photo.length>0){

      let arr=[]

       

      photo.map(async (e,i,a)=>{
           
        let uri = await getPathForFirebaseStorage(e.uri)

        storage().ref(`${docfolder}/${userData.user.uid}/${e.name}`)
        .putFile(uri)
        .then( async (snapshot) => {
          
          await storage().ref(`${docfolder}/${userData.user.uid}/${e.name}`)
          .getDownloadURL()
          .then((url) => {
            const obj={uri:url}
            arr.push(obj)
            if(i==a.length-1){
              console.log("arrr andr se: ",arr)
              onClickAdd(arr)
            }
          })
          .catch((e) => console.log('getting downloadURL of image error => ', e));


        
        }).catch((e) => {console.log('uuploading dcmnt firebase error => ', e)});

      })

 
      console.log("arrr bhr se: ",arr)


    }

     
  }catch (e){
 console  .log('uploading dcmnt firebase error => ',e)
  }
  
  }

 const  onClickAdd = async (arr)=>{
 
  console.log("arr on clck add se :  ",arr)

    try {
      
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
       photo:arr,
       category,
       startingAmount,
       sba,
       noi,
       duration:"",
       inc,
       st:"",
       et:"",
       aid:aid,
       autoBid:startingAmount,
       description,
       uid:userData.user.uid,
       pid,
       createdAt:new Date(),
       updatedAt:new Date(),
       block:false,
        }

   
     let resp =  await allOther.firebase.__Add_Product(obj)
      
    if(resp){
      clearfields()
      allOther.ToastAndroid.ToastAndroid_SB("Product Add Successful")
     } 
     
    
     
    } catch (error) {
      setloader(false);
      setdialogVisible(false);
     console.log("addprdct error try cath ==> ",error)
    }
   
    
   }

   const removePhoto=(i)=>{
   
      if (i > -1) {
      photo.splice(i, 1);
        setmv(!mv);setspi(null);setp("");setcc(!cc)
      }
     
  }
  
   const renderPhoto=({item,index})=>{
    return(
    <TouchableOpacity  onPress={()=>{setp(item.uri);setspi(index);setmv(true)}} style={{marginLeft:5,marginRight:5,marginTop:10}} >
    
    <Image source={{uri: item.uri}}   style={{
       width: 75,
       height:75,
       shadowColor: "black",
       elevation: 2,
    } } />
     
    
    </TouchableOpacity>
     )
         
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
    onPress={()=>{setmv(!mv);setp("");setspi(null)}}
    style={{backgroundColor:"black",borderRadius:25,}}>
    <allOther.vectorIcon.Ionicons  name="arrow-back" color="white" size={25} />
    </TouchableOpacity> 
    
     
     <TouchableOpacity  
  onPress={()=>{removePhoto(spi)}}
  style={{backgroundColor:"black",borderRadius:25,marginLeft:35}}>
    <allOther.vectorIcon.AntDesign  name="delete" color="white" size={25} />
  </TouchableOpacity>
  
  
  
  
  </View>
     
              </View>
          
          
            </Modal>
          )
    
    
          }

  const  render_Add_Product = ()=>
   {
    
     const check =   checkEmptyFields();
     let ButtonEnable=false
     if(check) 
     ButtonEnable=true 
     return(
     <Dialog
       visible={dialogVisible}
       hasOverlay={true}
       overlayOpacity={0.8}
       
       dialogTitle={<DialogTitle style={{backgroundColor:"#307ecc"}} textStyle={{color:"white"}}  title="New Products" />}s
       footer={
         <DialogFooter style={{backgroundColor:"#307ecc"}}>
           <DialogButton
           style={{backgroundColor:!ButtonEnable ? "#307ecc" : "white"}}
             text="Cancel"
             textStyle={{color:!ButtonEnable ? "white" : "black"}}
             onPress={() => { clearfields()}}
           />
           <DialogButton
            disabled={!ButtonEnable}
             text="Add"
           textStyle={{color:!ButtonEnable ? "silver":"white"}}
             style={{backgroundColor:!ButtonEnable ?"white":"#307ecc"}}
             onPress={() => { ButtonEnable ?  uploaddocumentfirebase(): null}}
           />
         </DialogFooter>
       }
       onHardwareBackPress={() => true}
       dialogAnimation={new SlideAnimation({
         slideFrom: 'bottom',
       })}
       dialogStyle={{backgroundColor:"white",borderRadius:20}}
     >

       <allOther.Loader loader={loader} /> 

       <DialogContent style={{width:windowWidth-50,height:windowHeight/1.3}}>
       <ScrollView showsVerticalScrollIndicator={false}>

       <TouchableOpacity 
   onPress={()=>{ uploadImage_android()}}
   style={{marginTop:20,alignItems:"center",flexDirection:"row",alignSelf:"center"}} >
   <Text style={{fontSize:15}}>Add Photo</Text>
   <allOther.vectorIcon.MaterialCommunityIcons style={{marginLeft:10}}  size={30} color="#307ecc" name="image-plus" />
   </TouchableOpacity>
 
   {(photo.length>0) && (
  <FlatList
  horizontal={true}
  data={photo}
 //  extraData={FlatListR} //true/fasle
  renderItem={renderPhoto}
  keyExtractor={(item, index) => { return index.toString() }}
  showsVerticalScrollIndicator={true}
/>

)}  

{photo.length>3 && (
  <Text style={{marginTop:10,color:"red",fontSize:12}}>Max 3 photo upload</Text>
)}


     <View style={{padding:5,marginTop:30}}>
  
  
   <DropDownPicker
      items={ac || []} 
      placeholder="Select Category"
      placeholderStyle={{ textAlign: 'center'}}
      containerStyle={{width: 200, height:50,alignSelf:"center"}}
      style={{backgroundColor: '#fafafa',paddingVertical:10,borderColor:"black",borderWidth:0.4}}
      dropDownStyle={{backgroundColor: '#fafafa'}}
      onChangeItem={i => 
        setcategory(i.value)
     }
 /> 
    

    <TextInput
      style={{ backgroundColor:"white",marginTop:17 }}  
      mode="outlined"
      label="Name"
      onChangeText={text=> setname(text)}
    />
 
 
 
 
<TextInput  style={{backgroundColor:"white",marginTop:17 }}  
      keyboardType={"numeric"}
      label="Num Of Items"
      mode="outlined"
      onChangeText={text=> setnoi(text)} 
 />

<TextInput  style={{ backgroundColor:"white",marginTop:17 }}  
      keyboardType={"numeric"}
      mode="outlined"
      onChangeText={text=> setstartingAmount(text)}
      label="Starting Amount"
 />
 
 <TextInput  style={{ backgroundColor:"white"  ,marginTop:17 }}  
      keyboardType={"numeric"}
      mode="outlined"
      onChangeText={text=> setsba(text)}
      label={"Start Bid Amount"} 
 />

<TextInput  style={{ backgroundColor:"white" ,marginTop:17 }}  
      keyboardType={"numeric"}
      mode="outlined"
      onChangeText={text=> setinc(text)}
      label={"Increment"} 
 />

 
<Textarea
   containerStyle={{ height: 160,marginTop:17,
    padding: 5,
    borderColor:"black",
    borderWidth:1,
    backgroundColor:'white',
    borderBottomEndRadius:4}}

   style={{
    color: 'black',
    borderRadius:10,
   }}
   onChangeText={text=>setdescription(text)}
   defaultValue={description}
   placeholder={"Description"}
   placeholderTextColor={'silver'}
   underlineColorAndroid={'transparent'}
 />
  
    </View>

  
 
 </ScrollView>
       </DialogContent>
 
     </Dialog>
   
     )
   
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
  
      const    renderAddButton=()=>{
        return(
          <View  style={{ position: 'absolute',flex:1,right: 10,bottom: 70}}>


          
    <TouchableOpacity onPress={()=>{setdialogClick(true);setdialogVisible(true)}} 
    style={{ opacity:.8,backgroundColor:"black",width:60,height:60,borderRadius:30,alignItems:"center",justifyContent:"center"}}>
     <allOther.vectorIcon.MaterialIcons onPress={()=>{setdialogClick(true);setdialogVisible(true)}}   size={50} color="white" name="add" />
    </TouchableOpacity>
   
         </View>
        )
      }

      const    RenderProducts  = (active) => { 
        let  cardHeight= active!="no"?180:130;
 
         let c= false;

         let product  =  productsData.products.map((item,index)=>{
            
         
 
          if(item.data.aid==aid && item.data.block==false){
  
        c=true;    
        let name = item.data.name || ""
        let catg = item.data.category || ""
        let noi= item.data.noi || ""
        let id=item.id || ""
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


{/* /ac mean catgry array */}
<TouchableOpacity style={{marginTop:10}}
 onPress={()=>{props.navigation.navigate("Update_Product",{pid:id,ac:ac,aid:aid})}} >

     
      
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

{/* {stime!=""&&(
   <View style={{flexDirection:"row",alignItems:"center"}}>
<Text style={{color:"black",textTransform:"capitalize",fontSize:14}}>duration</Text>  
<Text style={{color:"black",textTransform:"capitalize",fontSize:12,position:"absolute",right:0}}>{stime}</Text>   
 </View>
)} */}


 </View>

       </TouchableOpacity>
       
     
       </View>

       {active!="no" &&(
    <View style={{flex:1,height:30,justifyContent:"flex-end",marginTop:10,borderBottomRightRadius:10,borderBottomLeftRadius:10,alignItems:"center",justifyContent:"center",backgroundColor:"silver"}}>
 
    <TouchableOpacity onPress={()=>{setpid(id);setvb(true)}}>
     <Text style={{alignSelf:"center",color:"black",fontSize:16}}>View Bids</Text>
    </TouchableOpacity>
      
            </View>
  )}         
     

       
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
     
      const ViewBids =()=>{
        return(
            <Modal
            animationType='fade'
            transparent={false}
            visible={vb}
            >
           {BidderDetail()}
            <View style={{ flex: 1}}>
          
          
<TouchableOpacity style={{left:10,marginTop:5}} onPress={()=>{setpid("");setb([]);setvb(false)}}
>
<allOther.vectorIcon.Entypo size={40} color="#de5050" style={{opacity:0.8}} name="cross" />
</TouchableOpacity>
 
          <ScrollView>

{renderBidders()}
        
         </ScrollView>
 
            </View>
        
          </Modal>
        )
        }
       
        const BidderDetail =()=>{
          return(
              <Modal
              animationType='fade'
              transparent={false}
              visible={vbd}
              >
              

              <View style={{ flex: 1}}>
            
            
  <TouchableOpacity style={{left:10,marginTop:5}} onPress={()=>{setbid("");setvbd(false);setname("");setemail("");setphone("");setba("")}}
  >
  <allOther.vectorIcon.Entypo size={40} color="#de5050" style={{opacity:0.8}} name="cross" />
  </TouchableOpacity>
   
            <ScrollView>
  
  {renderBidderDetail()}
          
           </ScrollView>
   
              </View>
          
            </Modal>
          )
          }

          const renderBidderDetail=()=>{
   
       
            return (
             
              <View style={{margin:10,padding:10}}>
         <allOther.Loader loader={loader}/>
         <View style={{flex:1,alignSelf:"center"}}>
            <Image style={{height:150,width:150}} source={require("../../assets/dp.png")}  />  
        </View> 
          
      
        <TextInput
            style={[styles.textInput,{marginTop:30}]}
            mode="outlined"
            disabled={true}
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
      
    
        
                </View>
       
              
            )
             
            }

            const renderBidders=()=>{
   
              if(b.length>0){
      
            let bidder =  b.map((e,i,a)=>{
      
              let name="";
              let email="";
              let c=false        
 
              if(e.bid!=""){
               
                if( allVendorsData.vendor.length>0){
                  allVendorsData.vendor.map((ee,i,a)=>{
                   if(ee.uid==e.bid){
                     name=ee.name
                     email=ee.email
                     c=true
                   }
                  })
                }
              
                if(c==false){
              
                  if( allBiddersData.bidders.length>0){
                      allBiddersData.bidders.map((ee,i,a)=>{
                     if(ee.uid==e.bid){
                       name=ee.name
                       email=ee.email
                       c=true
                     }
                    })
                  }
              
                }
               
              }

      let cc =  e.createdAt.toDate()//bcs firbase cnvrt into obj so again parse date
     
      var time =  moment(cc).format('hh:mm a')     //10:12 am 
      var date =  moment(cc).format("D MMMM Y");   //9 july 2021

      cc= date + " at  "+time
     


              let price = e.price;
              let bid=e.bid
      
               name= allOther.strLength(name,"bname")
               email= allOther.strLength(email,"email")
      
               return(
      
                <View style={{margin:10,padding:10}}>
               
              <TouchableOpacity
              onPress={()=>{setbid(bid);setvbd(true)}}
              style={{backgroundColor:"#66bd7d",padding:10,borderRadius:10}}>
              
         {i==0&&(
           <allOther.vectorIcon.Entypo style={{position:"absolute",right:5,top:5}} size={18} name="star" color="yellow" />
         )}
              <View style={{flexDirection:"row" }}>
              <Image style={{width:30,height:30}} source={require("../../assets/bidder.png")} />
              <View style={{marginLeft:15}}> 
              <Text style={{color:"white",fontWeight:"bold",textTransform:"capitalize"}}>{name}</Text>
              <Text style={{color:"white",fontWeight:"bold"}}>{email}</Text>
              <View style={{flexDirection:"row",alignItems:"center" ,width:230}}>
                        <Text style={{color:"white",textTransform:"capitalize"}}>Price :</Text> 
                        <Text style={{color:"blue",textTransform:"capitalize",position:"absolute",right:0}}>{price}</Text>
               </View>
               <Text style={{color:"white",fontSize:12}}>{cc}</Text>   
              </View> 
              </View>
              
               
              </TouchableOpacity>
              
                </View>
                    )
                
                })
      
                return bidder;
      
              }else{
             return <Text style={{fontSize:38,color:"silver",marginTop:"60%",alignSelf:"center"}} >Empty</Text>
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
 
 <allOther.Header  st={"View Your Products"} title={an} nav={props.navigation}/>
 {ViewBids()}
 {renderUp()} 
 {mv && renderFullImage()}
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
         {dialogClick &&  render_Add_Product()}  

              {productsData.products.length<=0   && !loader   
              ?(
              <Text style={{fontSize:38,color:"silver",marginTop:"60%",alignSelf:"center"}} >Empty</Text>
              )
             :(
        
            RenderProducts(active)
              ) 

            }

</ScrollView>    

{renderDown()}    
 

   {active=="no" && renderAddButton()}  
 
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