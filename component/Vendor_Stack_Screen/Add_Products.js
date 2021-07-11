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

 

  let  items=null;
  let  docfolder=`Vendor_Products/Photos/`;

  export default  function  Products(props)  {

  const [pids, setpids] = useState([]) //for check random id not match other product
  const listViewRef = useRef(); 
  const [name, setname] = useState("")
  const [photo, setphoto] = useState("")
  const [photoName, setphotoName] = useState("")
  const [category, setcategory] = useState("")
  const [description, setdescription] = useState("")
  const [startingAmount, setstartingAmount] = useState("")
  const [auction, setauction] = useState("")
  const [status, setstatus] = useState("pending")
  const [dialogVisible, setdialogVisible] = useState(false)
  const [dialogClick, setdialogClick] = useState(false)
  const [loader, setloader] = useState(true)
  const [setProductData, setsetProductData] = useState(false)
 
  
  const scrollY= useRef(new Animated.Value(0)).current;
  const productsData = useSelector(state => state.productReducer)
  const userData = useSelector(state => state.userReducer)
 
  useEffect(()=>{
  
  addItemCategory() ;
  getProductsId();
setTimeout(() => {
  setloader(false)
}, 800);

 
  },[])

 

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
   
     permissions.requestWriteInternalStorage()
  
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
  
    try {
      

      ImagePicker.launchImageLibrary(options ,async (response) => {
       // console.log("response : => ",response)
        if (response.didCancel) {
          allOther.ToastAndroid.ToastAndroid_SB("Cancel")
        } else if (response.error) {
          allOther.ToastAndroid.ToastAndroid_SB(response.error.toString())
          console.log('ImagePicker Error: ', response.error);
        } else{
          const URI =   response.uri ;
          const s   =  response.fileName ;   
          setphoto(URI);setphotoName(s)
        }
      });

    } catch (error) {
      

console.log("select image catch error : ",error)
    }
   
  }
  
 
  const addItemCategory=()=>{
    if(productCategory){
         items=productCategory.map((e,i,a)=>{
      return {label: e.c.toUpperCase(), value: e.c.toLowerCase()};
    });  
    }else{
          items=null
    }

}

  const clearfields =()=>{
    setdialogVisible(false);
    setname("");
    setcategory("");
    setstatus("");
    setdescription("");
    setphoto("");setphotoName("");
    setstartingAmount("");setauction("");

}

const checkEmptyFields= ()=> 
{
  
    if(name=="" || startingAmount=="" || description==""  || category=="" || photo=="" || photoName=="" || auction=="" ){
      return false;
    } else{
      return true;
    }
}

 
const removeProducts=  (id)=>{
 
  
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
    permissions.requestReadExternalStorage();
    setloader(true);
  
      let uri = await getPathForFirebaseStorage(photo)
 
      storage().ref(`${docfolder}/${userData.user.uid}/${photoName}`)
      .putFile(uri)
      .then((snapshot) => {
        console.log(`${photoName} has been successfully uploaded.`);
        getdocfirebase();
      
      }).catch((e) => {console.log('uuploading dcmnt firebase error => ', e)});
  }catch (e){
setloader(false);
 console.log('uploading dcmnt firebase error => ',e)
  }
  
  }


 const  getdocfirebase = async () =>
  {
     await storage().ref(`${docfolder}/${userData.user.uid}/${photoName}`)
      .getDownloadURL()
      .then((url) => {
        //from url you can fetched the uploaded image easily
        onClickAdd(url)
      })
      .catch((e) => console.log('getting downloadURL of image error => ', e));
      setloader(false);
    }


 const  onClickAdd = async (url)=>{
      
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

       <DialogContent style={{width:windowWidth-50,alignItems:"center",justifyContent:"center"}}>

     <View style={{padding:5,marginTop:15,alignSelf:"center"}}>
  
  
   <DropDownPicker
      items={items !=null ? items : []} 
      placeholder="Select Category"
      placeholderStyle={{ textAlign: 'center'}}
      containerStyle={{width: 200, height:50,alignSelf:"center"}}
      style={{backgroundColor: '#fafafa',paddingVertical:10,borderColor:"black",borderWidth:0.4}}
      dropDownStyle={{backgroundColor: '#fafafa'}}
      onChangeItem={i => 
        setcategory(i.value)
     }
 /> 
    
 
 <TextInput  style={{ backgroundColor:"white",width:230,height:45,fontSize:16,marginTop:17,borderColor:"black",borderWidth:0.4}}  
       onChangeText={text=> setname(text)}
       placeholder={"Name"} 
 />

<TextInput  style={{ backgroundColor:"white",width:230,height:45,fontSize:16,marginTop:17,borderColor:"black",borderWidth:0.4 }}  
      keyboardType={"numeric"}
      onChangeText={text=> setstartingAmount(text)}
       placeholder={"Start Bidding Amount"} 
 />
 
 <TextInput  style={{ backgroundColor:"white",width:230,height:45,fontSize:16,marginTop:17,borderColor:"black",borderWidth:0.4 }}  
      keyboardType={"numeric"}
      onChangeText={text=> setauction(text)}
       placeholder={"auction"} 
 />
 

 <TextInput  style={{ backgroundColor:"white",width:230,height:70,fontSize:16,marginTop:17,borderColor:"black",borderWidth:0.4 }}  
       onChangeText={text=>setdescription(text)}
       placeholder={"Description"} 
       multiline={true}
       numberOfLines={2}
       scrollEnabled={true}
 />


    </View>

 {photo=="" 
 ? (
   <TouchableOpacity 
   onPress={()=>{ uploadImage_android()}}
   style={{marginTop:35,alignItems:"center",flexDirection:"row",alignSelf:"center"}} >
   <Text style={{fontSize:15}}>Add Photo</Text>
   <allOther.vectorIcon.MaterialCommunityIcons style={{marginLeft:10}}  size={30} color="#307ecc" name="image-plus" />
   </TouchableOpacity>
 ) 
 :(
 <View  style={{marginTop:30,alignSelf:"center"}} >
   <TouchableOpacity style={{marginLeft:"50%"}} onPress={()=>{setphoto("");setphotoName("")}}>
  <allOther.vectorIcon.Entypo size={33} color="red" name="cross" />
  </TouchableOpacity>
  <Image source={{uri:photo}} resizeMode={"contain"} style={{width:200,height:170}} />
 </View> 
 ) 
 }

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
 
 {setProductData  && <allOther.firebase.FireBaseFunction type={"set-products-data"} uid={userData.user.uid} /> }   
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
         {dialogClick &&  render_Add_Product()}  

              {productsData.products.length<=0   && !loader   
              ?(
              <Text style={{fontSize:38,color:"silver",marginTop:"60%",alignSelf:"center"}} >Empty</Text>
              )
             :(
        
            RenderProducts()
              ) 

            }

</ScrollView>    

{renderDown()}    
 

   {renderAddButton()}  
 
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