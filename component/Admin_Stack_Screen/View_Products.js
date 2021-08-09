import React, { useEffect, useState,useRef} from 'react';
import { View,TouchableOpacity,Text,Dimensions,StyleSheet,ScrollView,Modal,Image} from "react-native";
import  allOther from "../other/allOther"
import Dialog, { DialogContent,DialogFooter,DialogButton,SlideAnimation,DialogTitle} from 'react-native-popup-dialog';
import ImagePicker from 'react-native-image-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import { Container,Content, Item, Input} from 'native-base'
import permissions from "../permissions/permissions"
import {productCategory} from "./Category"
import {useSelector} from 'react-redux'
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import RNFetchBlob from 'rn-fetch-blob'
import { TextInput } from 'react-native-paper';
import moment from "moment";
 
  export default  function View_Products(props)  {

    const [loader, setloader] = useState(true)
    const  {pid} = props.route.params;

    const [name, setname] = useState("")
    const [photo, setphoto] = useState("")
    const [category, setcategory] = useState("")
    const [description, setdescription] = useState("")
    const [startingAmount, setstartingAmount] = useState("")
    const [auction, setauction] = useState("")
    const [status, setstatus] = useState("")
    const [Pid, setPid] = useState("")
    const [vn, setvn] = useState("")
    const [ve, setve] = useState("")
    const [vid, setvid] = useState("")
    const [ca, setca] = useState("")
    const [sa, setsa] = useState("")
    const [ea, setea] = useState("")

    const [dialogVisible, setdialogVisible] = useState(false)
    const [dialogClick, setdialogClick] = useState(false)

    const productsData = useSelector(state => state.productReducer)

    useEffect(()=>{
     
      if(vid!=""){
        setloader(true)
        }

      const unsubb = firestore().collection("users").doc(vid).onSnapshot((doc)=>{
       

      if(vid!=""){
       
      if(doc.exists){
         let d= doc.data();

 
         setvn(d.name);setve(d.email)
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
  

    },[vid])

 
    useEffect(()=>{
      productsData.products.map((item,index)=>{

        if(item.id==pid){

         if(item.data.status=="end" || item.data.status=="active"){
        
          console.log("item : " , item)

          let name = item.data.name || ""
          let category = item.data.category || ""
          let starting_Amount = item.data.startingAmount || ""
          let status = item.data.status || ""
          let photo = item.data.photo || ""
          let auction = item.data.auction || ""
          let description =  item.data.description || ""
          let Pid =  item.data.pid || ""
          let vid= item.data.uid || ""
 
        

          
          let c =  item.data.createdAt.toDate()//bcs firbase cnvrt into obj so again parse date
         
          var time =  moment(c).format('hh:mm a')     //10:12 am 
          var date =  moment(c).format("D MMMM Y");   //9 july 2021

          c= date + " at  "+time

          let s =  item.data.startDate.toDate() || "" //bcs firbase cnvrt into obj so again parse date
         
          var time =  moment(s).format('hh:mm a')     //10:12 am 
          var date =  moment(s).format("D MMMM Y");   //9 july 2021

          s= date + " at  "+time

          let e =  item.data.endDate.toDate()//bcs firbase cnvrt into obj so again parse date
         
          var time =  moment(e).format('hh:mm a')     //10:12 am 
          var date =  moment(e).format("D MMMM Y");   //9 july 2021

          e= date + " at  "+time

          
           
        
          
          setvid(vid);setname(name);setphoto(photo);setcategory(category);setdescription(description);setstartingAmount(starting_Amount);
          setauction(auction);setstatus(status);setPid(Pid);setca(c);setsa(s);setea(e)
          setTimeout(() => {
          setloader(false)
          }, 1000);
    
        }

        if(item.data.status=="reject"){
 
          console.log("item : " , item)

          let name = item.data.name || ""
          let category = item.data.category || ""
          let starting_Amount = item.data.startingAmount || ""
          let status = item.data.status || ""
          let photo = item.data.photo || ""
          let auction = item.data.auction || ""
          let description =  item.data.description || ""
          let Pid =  item.data.pid || ""
          let vid= item.data.uid || ""

          let c =  item.data.createdAt.toDate()//bcs firbase cnvrt into obj so again parse date
         
          var time =  moment(c).format('hh:mm a')     //10:12 am 
          var date =  moment(c).format("D MMMM Y");   //9 july 2021

          c= date + " at  "+time
 
 
          setvid(vid);setname(name);setphoto(photo);setcategory(category);setdescription(description);setstartingAmount(starting_Amount);
          setauction(auction);setstatus(status);setPid(Pid);setvn(vn);setve(ve);setca(c); 
          setTimeout(() => {
          setloader(false)
          }, 1000);



        }
  
        }
 
      })
     },[productsData])
  
   const  renderProduct  =   ()  => {
 
      return (
       
        <View style={{marginTop:"5%",margin:15,padding:15}}>

   <View style={{flex:1,alignSelf:"center"}}>
      <Image style={{height: 270,width:270,borderRadius:5}} source={{uri:photo}}  />  
      <TouchableOpacity style={{
         position:"absolute",right:10,top:10, backgroundColor:"black",borderRadius:12.5,padding:2}}
         onPress={()=>{setdialogClick(true);setdialogVisible(true)}}>
       <allOther.vectorIcon.Entypo name="resize-full-screen" color="#53ff1f" size={25} />
       </TouchableOpacity>
  </View> 
    
 
  <TextInput
      style={[styles.textInput,{marginTop:70}]}
      disabled={true}
      mode="outlined"
      label="Product Id"
      value={Pid}
      placeholder="Product Id"
    />


<TextInput
      style={styles.textInput}
      mode="outlined"
      label='Vendor Name'
      disabled={true}
      value={vn}   
      placeholder='Vendor Name'
 
    />


<TextInput
      style={styles.textInput}
      mode="outlined"
      label='Vendor Email'
      disabled={true}
      value={ve}  
      placeholder='Vendor Email'
      multiline={true}
    />

    
  <TextInput
     style={styles.textInput}
      disabled={true}
      mode="outlined"
      label="Status"
      value={status}
      placeholder="Status"
    />

<TextInput
     style={styles.textInput}
      disabled={true}
      mode="outlined"
      label="Created At"
      value={ca}
      placeholder="Created At"
    />

{sa!=""&&(
  <TextInput
     style={styles.textInput}
      disabled={true}
      mode="outlined"
      label="Start Date"
      value={sa}
      placeholder="Start Date"
    />
)}


{ea!=""&&(
  <TextInput
     style={styles.textInput}
      disabled={true}
      mode="outlined"
      label="End Date"
      value={ea}
      placeholder="End Date"
    />

)}


<TextInput
     style={styles.textInput}
      disabled={true}
      mode="outlined"
      label="Category"
      value={category}
      placeholder="Category"
    />

 


  <TextInput
      style={styles.textInput}
      mode="outlined"
      label="Product Name"
      value={name}
      disabled={true}
      placeholder="Product name"
    />



<TextInput
      style={styles.textInput}
      mode="outlined"
      disabled={true}
      label="Starting Amount"
      value={startingAmount} 
      keyboardType="number-pad"
      placeholder='Starting Amount'
    />


<TextInput
      style={styles.textInput}
      mode="outlined"
      label='Auction'
      value={auction} 
      disabled={true}
      keyboardType="number-pad"
      placeholder='Auction'
    />

<TextInput
      style={styles.textInput}
      mode="outlined"
      label='Descritption'
      disabled={true}
      value={description}  
      placeholder='Descritption'
      numberOfLines={5}
      multiline={true}
    />




 
 

          </View>
 
        
      )
    }
 
    const render_FullImage=( )=>{

      return(
        <Modal
        animationType='fade'
        visible={dialogVisible}
        >
    
  
    <View style={{flex: 1,backgroundColor:"black"}}>
       
       <Image style={{position: 'absolute',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,}} resizeMode="contain"   source={{uri:photo}}  />   
    
    
    <TouchableOpacity  
onPress={()=>setdialogVisible(!dialogVisible)}
style={{backgroundColor:"black",borderRadius:25,padding:5,position:"absolute",top:15,left:15}}>
      <allOther.vectorIcon.Ionicons  name="arrow-back" color="white" size={25} />
</TouchableOpacity> 



        </View>
    
    
      </Modal>
    )


    }
 
return(
  <View style={{flex:1}}>
 <allOther.Header  title="" nav={props.navigation}/>
  <allOther.Loader loader={loader}/>
  {dialogClick &&  render_FullImage()}  
 <ScrollView>      
          {renderProduct()}
</ScrollView>    

 
  
 
</View>   
)
     }
 
      
  const styles = StyleSheet.create({  
  
    textInput:
    {
    marginTop:25,
    textTransform:"capitalize"
}
  
  });  