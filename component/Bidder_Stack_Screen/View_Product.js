import React, { useEffect, useState,useRef} from 'react';
import { View,TouchableOpacity,Text,Dimensions,StyleSheet,ScrollView,Modal,Image, Keyboard} from "react-native";
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
 
  export default  function View_Product(props)  {

    const [loader, setloader] = useState(true)
    const  {pid} = props.route.params; //prdouct id

    const [name, setname] = useState("")
    const [photo, setphoto] = useState("")
    const [category, setcategory] = useState("")
    const [description, setdescription] = useState("")
    const [startingAmount, setstartingAmount] = useState("")
    const [auction, setauction] = useState("")
    const [status, setstatus] = useState("")
    const [Pid, setPid] = useState("")
    
    const [ca, setca] = useState("")
    const [sa, setsa] = useState("")
    const [ea, setea] = useState("")

    const [b, setb] = useState(false)  //check user already bid 

    const [price, setprice] = useState("")  //input price

    const [lprice, setlprice] = useState("")

    const [lb, setlb] = useState(false)

    const [bn, setbn] = useState("")
    const [be, setbe] = useState("")
    const [bp, setbp] = useState("")

    const [vn, setvn] = useState("")
    const [ve, setve] = useState("")
    const [vid, setvid] = useState("")


    const [dialogVisible, setdialogVisible] = useState(false)   //full image
    const [dialogClick, setdialogClick] = useState(false)

    const [dialogVisible2, setdialogVisible2] = useState(false) //bid
    const [dialogClick2, setdialogClick2] = useState(false)

    const productsData = useSelector(state => state.productReducer)
    const userData = useSelector(state => state.userReducer)

    const windowWidth = Dimensions.get('window').width;
 
    useEffect(()=>{
      productsData.products.map((item,index)=>{

        if(item.id==pid){

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

          let s =  item.data.startDate.toDate()//bcs firbase cnvrt into obj so again parse date
         
          var time =  moment(s).format('hh:mm a')     //10:12 am 
          var date =  moment(s).format("D MMMM Y");   //9 july 2021

          s= date + " at  "+time

          let e =  item.data.endDate.toDate()//bcs firbase cnvrt into obj so again parse date
         
          var time =  moment(e).format('hh:mm a')     //10:12 am 
          var date =  moment(e).format("D MMMM Y");   //9 july 2021

          e= date + " at  "+time

          
           
        
          
          setvid(vid); setname(name);setphoto(photo);setcategory(category);setdescription(description);setstartingAmount(starting_Amount);
          setauction(auction);setstatus(status);setPid(Pid);setca(c);setsa(s);setea(e); 
          setTimeout(() => {
          setloader(false)
          }, 500);
    
         
       
       
       
        }

 
      })
     },[productsData])
 

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



     useEffect(() => {
      // Anything in here is fired on component mount.
   
  const unsub = firestore().collection("products").doc(pid).collection("bids").orderBy("createdAt","desc").onSnapshot((doc)=>{
         
        if(doc.size>0){
   
          doc.forEach((e,i,a)=>{

            let d=e.data()
            console.log("d : ",d)

            if(userData.user.uid==d.bid){
              setb(true)
            }

            if(i==0){  //bcd 1st one is latest date 

            setbn(d.bidderName);
            setbe(d.bidderEmail);
            setbp(d.price);
            setlprice(d.price)
            setlb(true)
            }
       
            
          })
        

        }else{
          console.log("no any bid found")
          setlb(false)
          setb(false)
          setlprice("")
        }

      
      })

      return () => {
          // Anything in here is fired on component unmount.
          unsub()
      }
  
  }, [])
  

  const bidnow=()=>{
    const obj={
      createdAt:new Date(),
      bidderName:userData.user.name,
      bidderEmail:userData.user.email,
      price:price,
      bid:userData.user.uid
    }
  firestore().collection("products").doc(pid).collection("bids").doc(userData.user.uid).set(obj).then(
    allOther.ToastAndroid.ToastAndroid_SB("Bid Success"),setdialogVisible2(false),Keyboard.dismiss()

  ).catch((e)=>console.log("bide add error , ",e))
  }

  const onClickBid=()=>{
 
    if(!checkEmptyField()){

      if(lprice!=""){
 
     
        if(price>lprice){
 
          let p= parseInt(lprice)+parseInt(auction)
         
          if(price<p){
            allOther.AlertMessage("","Please increase price with greater or equal to auction")
          }
        
          if(price>=p){
            bidnow()
          }
        
         }
                
               
                if(price<=lprice){
                  allOther.AlertMessage("","Price must be greater than last bid price")
                }
        

      }
      else{
     

if(price>startingAmount){
 
  let p= parseInt(startingAmount)+parseInt(auction)
 
  if(price<p){
    allOther.AlertMessage("","Please increase price with greater or equal to auction")
  }

  if(price>=p){
    bidnow()
  }

 }
        
        if(price==startingAmount){
          bidnow()
        }

        if(price<startingAmount){
          allOther.AlertMessage("","Price must be greater or equal than starting price")
        }

      }

  
     
    
    }else{
      allOther.AlertMessage("","Please Enter Price")
    }
     }

   const  renderProduct  =   ()  => {
 
      return (
       
        <View style={{marginTop:"5%",margin:15,padding:15}}>

   <View style={{flex:1,alignSelf:"center"}}>
      <Image style={{height: 270,width:270,borderRadius:10}} source={{uri:photo}}  />  
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

{/* <TextInput
     style={styles.textInput}
      disabled={true}
      mode="outlined"
      label="Created At"
      value={ca}
      placeholder="Created At"
    /> */}

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
      onChangeText={(txt)=>setname(txt)}
    />



<TextInput
      style={styles.textInput}
      mode="outlined"
      disabled={true}
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
      disabled={true}
      keyboardType="number-pad"
      onChangeText={(txt)=>setauction(txt)}
      placeholder='Auction'
    />

<TextInput
      style={styles.textInput}
      mode="outlined"
      label='Descritption'
      disabled={true}
      value={description}  
      onChangeText={(txt)=>setdescription(txt)}
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

    const checkEmptyField=()=>{
      if(price!=""){
        return false
      }else{
        return true
      }
  
    }
 
    const  render_Bid = ()=>
   {
      
     return(
     <Dialog
       visible={dialogVisible2}
       hasOverlay={true}
       overlayOpacity={0.8}
       
       dialogTitle={<DialogTitle style={{backgroundColor:"#307ecc"}} textStyle={{color:"white"}}  title="Bid" />}s
       footer={
         <DialogFooter style={{backgroundColor:"#307ecc"}}>
           <DialogButton
           style={{backgroundColor:"white"}}
             text="Cancel"
             textStyle={{color:"black"}}
             onPress={() => { setprice("");setdialogVisible2(false)}}
           />
           <DialogButton
           
             text="Bid"
           textStyle={{color: "white"}}
             style={{backgroundColor:"#307ecc"}}
             onPress={() => { onClickBid() }}
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

       <DialogContent style={{width:windowWidth-20}}>

<View style={{backgroundColor:"black",padding:5}}>
<Text style={{color:"white"}}>
Note :  Your price must be greater than last bid price
</Text>
</View>




     <View style={{padding:2,marginTop:15,alignSelf:"center"}}>

<View style={{flexDirection:"row",justifyContent:"space-between"}}>
        <Text> 
         auction : 
       </Text>

       <Text style={{color:"green"}}> 
        {auction}
       </Text>

</View>

<View style={{flexDirection:"row",justifyContent:"space-between",marginTop:10}}>
        <Text> 
         Starting Price : 
       </Text>

       <Text style={{color:"green"}}> 
        {startingAmount}
       </Text>

</View>
       
<View style={{flexDirection:"row",justifyContent:"space-between",marginTop:10}}>
        <Text> 
         Last Bid Price : 
       </Text>

       <Text style={{color:"green"}}> 
        {lprice}
       </Text>

</View>
   
 <TextInput  style={{ backgroundColor:"white",width:230,height:45,fontSize:16,marginTop:25,borderColor:"black",borderWidth:0.4}}  
       onChangeText={text=> setprice(text)}
       keyboardType="number-pad"
       placeholder={"Price"} 
 />

  
    </View>

 

       </DialogContent>
     </Dialog>
   
     )
   
   }

    const renderLastBid=()=>{

      if(lb){
         let bname =bn
          bname= allOther.strLength(bname,"bname")
          let bemail=be
          bemail= allOther.strLength(bemail,"email")
         let bprice=bp


          return(
            <View style={{margin:15,padding:15}}>
          
          <Text style={{fontSize:17,color:"grey",fontWeight:"900"}}>Last Bid : </Text>
          
          <View style={{backgroundColor:"#66bd7d",marginTop:5,padding:10}}>
          
     
          <View style={{flexDirection:"row" }}>
          <Image style={{width:30,height:30}} source={require("../../assets/bidder.png")} />
          <View style={{marginLeft:15}}> 
          <Text style={{color:"white",fontWeight:"bold",textTransform:"capitalize"}}>{bname}</Text>
          <Text style={{color:"white",fontWeight:"bold"}}>{bemail}</Text>
           
          <View style={{flexDirection:"row",alignItems:"center" ,width:230}}>
                    <Text style={{color:"white",textTransform:"capitalize"}}>Price :</Text> 
                    <Text style={{color:"blue",textTransform:"capitalize",position:"absolute",right:0}}>{bprice}</Text>
           </View>
           
          </View> 
          </View>
          
           
          </View>
          
            </View>
                )


      }

      if(lb==false){
        return(
          <View style={{margin:15,padding:15}}>
        
        <Text style={{fontSize:17,color:"grey",fontWeight:"900"}}>Last Bid : </Text>
        
        <View style={{backgroundColor:"#66bd7d",marginTop:5,padding:10}}>
 
        <Text style={{ color:"white",alignSelf:"center"}}>Empty </Text>
         
        </View> 
  
          </View>
              )
        

      }
     
    }

    const renderButton=()=>{
      return(
        <View style={{marginTop:"5%",margin:15,padding:15}}>
<TouchableOpacity 
 onPress={()=>{
  if(b==false) {
      setdialogClick2(true);setdialogVisible2(true)
  }
  else{
    allOther.AlertMessage("","You have already bid this poduct")
  }
  
  }}
style={{backgroundColor:"#32a852",height:40,alignItems:"center",justifyContent:"center",borderRadius:10}} >
<Text style={{fontSize:22,color:"white",alignSelf:"center",fontWeight:"bold"}}>Bid Now</Text>
</TouchableOpacity>
      </View>
      )
    }
 

return(
  <View style={{flex:1}}>
 <allOther.Header  title="" nav={props.navigation}/>
  <allOther.Loader loader={loader}/>
  {dialogClick &&  render_FullImage()}  
  {dialogClick2 &&  render_Bid()}
 <ScrollView>      
          {renderProduct()}
          {renderLastBid()}
          {renderButton()}
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