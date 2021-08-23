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

  export default  function  Auction(props)  {

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
 
  const clearfields =()=>{
    setloader(false)
    setdialogVisible(false);
    setname("");
    setcategory("");
    setdescription("");
    setphoto([]) ;
    setstartingAmount("");
    setauction("");
   setdate("");
   setst("");setet("");
   settp(false);
   setc("");
   setcb([])

}

const  onClickAdd = async (url)=>{
      
  
  try {
 
   
    const obj={
     name,
     date,
     et,
     st,
     cb,
     createdAt:new Date(),
     active:"no",
      }

   setdialogVisible(false);
   let resp =  await allOther.firebase.__Add_Auction(obj)
    
  if(resp){
    allOther.ToastAndroid.ToastAndroid_SB("Auction Create Successfully")
    clearfields()
    // setsetProductData(true)
   }
    
   setloader(false)
   setdialogVisible(false);
  } catch (error) {
    setloader(false)
    setdialogVisible(false);
   console.log("addactn error try cath ==> ",error)
  }
 
  
 }

const checkEmptyFields= ()=> 
{
  
    if(name=="" || date=="" || st==""  || et=="" || cb.length<=0  ){
      return false;
    } else{
      return true;
    }
}

const removeAuction=  (id)=>{
 
  
  Alert.alert(
    "",
    "Are you sure ?  you want to Delete this auction ?",
    [
      {
        text: "No",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
      },
      { text: "Yes", onPress: async () => {
         
        try {
          setloader(true);
          let resp =  await allOther.firebase.__Remove_Item(id,"auctions")
         
         if(resp){
           allOther.ToastAndroid.ToastAndroid_SB("auction Delete Successful")
          } 
           setloader(false)
     
         } catch (error) {
           setloader(false)
          console.log("remove  auction error try cath ==> ",error)
         }

      }
      }
    ]
  );
  
  
  } 

const renderLabel = (label, style) => {
  return (
        <Text style={{fontSize:12,textTransform:"capitalize"}}>{label}</Text> 
  )
}
 
  const  render_Add_Auction = ()=>
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
       dialogTitle={<DialogTitle style={{backgroundColor:"#307ecc"}} textStyle={{color:"white"}}  title="Create Auction" />}s
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
             text="Create"
           textStyle={{color:!ButtonEnable ? "silver":"white"}}
             style={{backgroundColor:!ButtonEnable ?"white":"#307ecc"}}
             onPress={() => { ButtonEnable ?  onClickAdd() : null}}
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

       <DialogContent style={{width:windowWidth-50,height:windowHeight/1.5 }}>
       <ScrollView>
       {renderDatePicker()}
       {renderTimePicker()}
     <View style={{padding:5,marginTop:20}}>
  
  {name!=""&&(
  <Text style={{fontSize:18,color:"black",fontWeight:"bold"}}>
  {name}
  </Text>
  )}
   

  <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between",marginTop:20}}> 
    <TouchableOpacity onPress={()=>{setdtp(true)}}
    style={{width:80,padding:5,alignItems:"center",backgroundColor:"#dedede",borderRadius:10}}>
    <Text style={{color:"black",fontSize:15}}>Set Day</Text>
    </TouchableOpacity>

      {date!=""&&(
        <Text>{date}</Text>
      )}
  </View>

  <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between",marginTop:20}}> 
    <TouchableOpacity onPress={()=>{settp(true);setc("s")}}
    style={{width:80,padding:5,alignItems:"center",backgroundColor:"#dedede",borderRadius:10}}>
    <Text style={{color:"black",fontSize:15}}>Start Time</Text>
    </TouchableOpacity>

      {st!=""&&(
        <Text>{st}</Text>
      )}
  </View>

  <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between",marginTop:20}}> 
    <TouchableOpacity onPress={()=>{settp(true);setc("e")}}
    style={{width:80,padding:5,alignItems:"center",backgroundColor:"#dedede",borderRadius:10}}>
    <Text style={{color:"black",fontSize:15}}>End Time</Text>
    </TouchableOpacity>

      {et!=""&&(
        <Text>{et}</Text>
      )}
  </View>

<View style={{marginTop:20}}>
<Text>Select Categories</Text>
  <SelectMultiple
          items={productCategory}
          selectedItems={cb}
          renderLabel={renderLabel}
          flatListProps={{marginTop:10,numColumns:3}}
          onSelectionsChange={(v)=>{setcb(v)}} />
</View>

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

      const    RenderAuctions  = () => { 
    
         let c= false;
         let  auctions  =   auctionsData.auctions.map((item,index)=>{
        
       

          if(item.data.active!="end"){

        c=true;    
        let name = item.data.name || ""
        let active = item.data.active || ""
        let id=item.id || ""
        name  =   allOther.strLength(name,"name")
        let date=item.data.date
        let st=item.data.st
        let et=item.data.et
        let cb=item.data.cb
    


       return (
  
 
        <View style={styles.card}>

      
{active=="no" &&(
  <TouchableOpacity 
style={{position:"absolute",right:0,marginRight:5}}
  onPress={()=>{removeAuction(id)}}
>
<allOther.vectorIcon.Entypo size={26} color="#de5050" style={{opacity:0.8}} name="cross" />
</TouchableOpacity>

)}

 
<TouchableOpacity onPress={()=>{props.navigation.navigate("Active_Products",{aid:id,an:name})}}>
 

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
 
       })
    
   if(c){
    return  auctions;
   }  else{
     return    <Text style={{fontSize:38,color:"silver",marginTop:"60%",alignSelf:"center"}} >Empty</Text>
   }  
  

      }

const confirmDate  = (d)=>{
 
  // var time =  moment(c).format('hh:mm a')     //10:12 am 
  var date =  moment(d).format("D MMM Y");   //9 july 2021
  var day= moment(d).format('dddd');
  setdtp(false)
  setdate(date)
  setname(day+" Auction");

  // c= date + " at  "+time
 
  
}

const confirmTime = (t)=>{
  var time =  moment(t).format('hh:mm a')     //10:12 am 
  settp(false) 
  if(c=="s"){
    setst(time)
  }else{
    setet(time)
  }

  
}
 
const   renderDatePicker = ()=>
{
  return(
    <View>
      <DateTimePickerModal
        isVisible={dtp}
        mode='date'
        date={new Date()}
        itemStyle={{
          backgroundColor: "red"            
        }}
        
        minimumDate={new Date()}
        onConfirm={(d)=> {confirmDate(d)}}
        onCancel={()=>{setdtp(false)}}
        
      />
    </View>
  )
}

const   renderTimePicker = ()=>
{
  return(
    <View>
      <DateTimePickerModal
        isVisible={tp}
        minimumDate={new Date()}
        mode='time'
        date={new Date()}
        itemStyle={{
          backgroundColor: "red"            
        }}
        
        // minimumDate={new Date()}
        onConfirm={(t)=> {confirmTime(t)}}
        onCancel={()=>{settp(false);setc(null)}}
        
      />
    </View>
  )
}
     
return(
  <View style={{flex:1}}>
 
   
 {renderUp()} 
  <allOther.Loader loader={loader}/>

 <ScrollView ref={listViewRef} scrollEventThrottle={1}>
         {dialogClick &&  render_Add_Auction()}  

              {auctionsData.auctions.length<=0   && !loader   
              ?(
              <Text style={{fontSize:38,color:"silver",marginTop:"60%",alignSelf:"center"}} >Empty</Text>
              )
             :(
        RenderAuctions()
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
      borderRadius:10,padding:10,borderRadius:10,
      elevation:5,
    }
  
  });  