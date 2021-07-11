import React, { useEffect, useState,useRef} from 'react';
import { View,TouchableOpacity,Text,Dimensions,StyleSheet,ScrollView,Animated,Platform,Alert,Image} from "react-native";
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

let  items=null;

  export default  function  UpdateProduct(props)  {

    const [loader, setloader] = useState(true)
    const  {pid} = props.route.params;

    const [name, setname] = useState("")
    const [photo, setphoto] = useState("")
    const [ imgWidth, setimgWidth] = useState(0)
    const [ imgHeight, setimgHeight] = useState(0)
    const [category, setcategory] = useState("")
    const [description, setdescription] = useState("")
    const [startingAmount, setstartingAmount] = useState("")
    const [auction, setauction] = useState("")
    const [status, setstatus] = useState("")
    const [Pid, setPid] = useState("")

    const [dialogVisible, setdialogVisible] = useState(false)
    const [dialogClick, setdialogClick] = useState(false)

    const productsData = useSelector(state => state.productReducer)

useEffect(()=>{
  addItemCategory() ;
},[])

    useEffect(()=>{
      productsData.products.map((item,index)=>{

        if(item.id==pid){

          let name = item.data.name || ""
          let category = item.data.category || ""
          let starting_Amount = item.data.startingAmount || ""
          let status = item.data.status || ""
          let photo = item.data.photo || ""
          let auction = item.data.auction || ""
          let description =  item.data.description || ""
          let Pid =  item.data.pid || ""
  

          Image.getSize(photo, (width, height) => {
            // calculate image width and height 
            const screenWidth = Dimensions.get('window').width
            const scaleFactor = width / screenWidth
            const imageHeight = height / scaleFactor
            setimgWidth(screenWidth); setimgHeight(imageHeight)
          })

          setname(name);setphoto(photo);setcategory(category);setdescription(description);setstartingAmount(starting_Amount);
          setauction(auction);setstatus(status);setPid(Pid);
          setTimeout(() => {
          setloader(false)
          }, 1000);
 
        
        
        
        }

 
      })
     },[productsData])


     const addItemCategory=()=>{
      if(productCategory){
           items=productCategory.map((e,i,a)=>{
        return {label: e.c.toUpperCase(), value: e.c.toLowerCase()};
      });  
      }else{
            items=null
      }
  
  }
  

     const checkEmptyFields=()=>{
      if(name!="" && photo!="" && category!="" && description!="" && startingAmount!="" && auction!="" &&status!="")
    {
      return false
    }else{
      return true
    }
    }


    const onClickUpdate=async ()=>{
      setloader(true);
      if(!checkEmptyFields())
      {

        try {
          
  const obj={
          name,
          startingAmount,
          auction,
          description,
          updatedAt:new Date(),
          category
           }

        let resp =  await allOther.firebase.__Update(pid,obj)
 
        if(resp){
          allOther.ToastAndroid.ToastAndroid_SB("Update Successful")
         }
         setloader(false)

        } catch (error) {
          console.log("Update Product error  try cath :  ",error);
          setloader(false)
        }

      

      }else{
        setloader(false);
        allOther.AlertMessage("","Please fill empty field")
 
      }
    }

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
      disabled={true}
      mode="outlined"
      label="Status"
      value={status}
      placeholder="Status"
    />

 
<DropDownPicker
      items={items !=null ? items : []} 
      placeholder={category.toUpperCase()}
      placeholderStyle={{ textAlign: 'center'}}
      containerStyle={{marginTop:20}}
      style={{backgroundColor: '#fafafa',paddingVertical:10,borderColor:"black",borderWidth:1,flexShrink:1,flexWrap:"wrap"}}
      dropDownStyle={{backgroundColor: '#fafafa'}}
      onChangeItem={i => 
        setcategory(i.value)
     }  
 />


  <TextInput
      style={styles.textInput}
      mode="outlined"
      label="Product Name"
      value={name}
      placeholder="Product name"
      onChangeText={(txt)=>setname(txt)}
    />



<TextInput
      style={styles.textInput}
      mode="outlined"
      label="Starting Amount"
      value={startingAmount} 
      keyboardType="number-pad"
      onChangeText={(txt)=>setstartingAmount(txt)}
      placeholder='Starting Amount'
    />


<TextInput
      style={styles.textInput}
      mode="outlined"
      label='Auction'
      value={auction} 
      keyboardType="number-pad"
      onChangeText={(txt)=>setauction(txt)}
      placeholder='Auction'
    />

<TextInput
      style={styles.textInput}
      mode="outlined"
      label='Descritption'
      value={description}  
      onChangeText={(txt)=>setdescription(txt)}
      placeholder='Descritption'
      numberOfLines={5}
      multiline={true}
    />

 
<TouchableOpacity  
style={{backgroundColor: "black",width:100,height:40,borderRadius:20,alignItems:"center",justifyContent:"center",alignSelf:"center",marginTop:40,elevation:5}} 
 onPress={()=>{onClickUpdate()}}
>
<Text style={{color :"white"  ,fontSize:22}}>Update</Text>
</TouchableOpacity>


          </View>
 
        
      )
    }


    const  render_FullImage = ()=>
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
        footer={
          <DialogFooter>
            <DialogButton
              text="Close"
              onPress={() => {setdialogVisible(false)}}
            />
          </DialogFooter>
        }
        onHardwareBackPress={() => true}
        dialogAnimation={new SlideAnimation({
          slideFrom: 'bottom',
        })}
        dialogStyle={{backgroundColor:"white",borderRadius:10}}
      >
 
 
        <DialogContent>
 
 <View style={{flex:1}}>

  
        
        <Image style={{width: imgWidth, height: imgHeight}}  source={{uri:photo}}  /> 

<TouchableOpacity  
onPress={()=>setdialogVisible(!dialogVisible)}
style={{position:"absolute",top:40,backgroundColor:"black",borderRadius:25,right:20}}>
        <allOther.vectorIcon.AntDesign  name="close" color="red" size={50} />
</TouchableOpacity>

   </View>
        </DialogContent>
      </Dialog>
    
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