import React, { useEffect, useState,useRef} from 'react';
import { View,TouchableOpacity,Text,Dimensions,StyleSheet,ScrollView,Modal,Image,FlatList} from "react-native";
import  allOther from "../other/allOther"
import DropDownPicker from 'react-native-dropdown-picker';
import {productCategory} from "./Category"
import {useSelector} from 'react-redux'
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import RNFetchBlob from 'rn-fetch-blob'
import { TextInput } from 'react-native-paper';
import Dialog, { DialogContent,DialogFooter,DialogButton,SlideAnimation,DialogTitle} from 'react-native-popup-dialog';
 
  export default  function  View_Products(props)  {

    const [loader, setloader] = useState(true)
    const  {pid,aid} = props.route.params;

    const [name, setname] = useState("")
    const [photo, setphoto] = useState([])
    const [vn, setvn] = useState("")
    const [ve, setve] = useState("")
    const [category, setcategory] = useState("")
    const [description, setdescription] = useState("")
    const [noi, setnoi] = useState("")
    const [sba, setsba] = useState("")
    const [inc, setinc] = useState("")
    const [ab, setab] = useState("")
    const [startingAmount, setstartingAmount] = useState("")
    const [Pid, setPid] = useState("")

    const [mv,setmv]=useState(false);    //fulll image render modal vs
    const [p,setp]=useState("");  //slectd photo uri
    const [spi,setspi]=useState(null);  //slectd photo index
    const [cc,setcc]=useState(false);
  
    //biddere 
    const [lprice, setlprice] = useState("")  //last bid price or if not any bid set sba amount
    const [price, setprice] = useState("")  //new perice store
    const [lb, setlb] = useState(false) //last bid chck
    const [b, setb] = useState(false)  //check user already bid 
    const [bn, setbn] = useState("")
    const [be, setbe] = useState("")
    const [bp, setbp] = useState("")
    const [tb, settb] = useState(0)
    const [dialogVisible2, setdialogVisible2] = useState(false) //bid dialog
    const [dialogClick2, setdialogClick2] = useState(false)

    const [ip, setip] = useState(0)   //incrmt dec plus   minus check
    
    const windowWidth = Dimensions.get('window').width;

    const auctionsData = useSelector(state => state.auctionReducer)
    const productsData = useSelector(state => state.productReducer)
    const userData = useSelector(state => state.userReducer)
 
    useEffect(()=>{
      productsData.products.map((item,index)=>{

        if(item.id==pid){

          let uid=item.data.uid || ""
    
          let name = item.data.name || ""
          let category = item.data.category || ""
          let starting_Amount = item.data.startingAmount || ""
          let photo = item.data.photo || []
          let noi = item.data.noi || ""
          let ab = item.data.autoBid || ""
          let sba = item.data.sba || ""
          let inc = item.data.inc || ""
          let description =  item.data.description || ""
          let Pid =  item.data.pid || ""
          
 
         
        setname(name);setphoto(photo);setcategory(category);setdescription(description);setstartingAmount(starting_Amount);
        setPid(Pid);setsba(sba);setnoi(noi);setab(ab);setinc(inc);setlprice(sba);setprice(sba)
          setTimeout(() => {
          setloader(false)
          }, 400);
 
        
        
        
        }

 
      })
     },[productsData])
 

     useEffect(() => {
      // Anything in here is fired on component mount.
         settb(userData.user.tb)
         const unsub = firestore().collection("products").doc(pid).collection("bids").orderBy("createdAt","desc").onSnapshot((doc)=>{
         
        if(doc.size>0){
   
          doc.forEach((e,i,a)=>{

            let d=e.data()
           

            if(userData.user.uid==d.bid){
              setb(true)
            }

            if(i==0){  //bcd 1st one is latest date 

            setbn(d.bidderName);
            setbe(d.bidderEmail);
            setbp(d.price);
            setlprice(d.price)
            setprice(d.price)
            setlb(true)
            }
       
            
          })
        

        }else{
          console.log("no any bid found")
          setlb(false)
          setb(false)
        }

      
      })

      return () => {
          // Anything in here is fired on component unmount.
          unsub()
      }
  
  }, [])

  const bidnow=()=>{
   if(price>lprice){
     setloader(true);

       const obj={
      createdAt:new Date(),
      bidderName:userData.user.name,
      bidderEmail:userData.user.email,
      price:price,
      bid:userData.user.uid
    }
  firestore().collection("products").doc(pid).collection("bids").doc(userData.user.uid).set(obj).then(

    firestore().collection("users").doc(userData.user.uid).update({tb:tb}).then(
      allOther.ToastAndroid.ToastAndroid_SB("Bid Success"),setloader(false),setdialogVisible2(false),setip(0)
    ).catch((e)=>console.log("user tb update error add error , ",e),setloader(false))
 

  ).catch((e)=>console.log("bid add error , ",e),setloader(false))
  
   }else{
     allOther.AlertMessage("","Please Add  Bid !")
   }
 

}
 
    const renderPhoto=({item,index})=>{
      return(
      <TouchableOpacity  onPress={()=>{setp(item.uri);setspi(index);setmv(true)}} style={{marginLeft:5,marginRight:5,marginTop:10}} >
      
      <Image source={{uri: item.uri}}   style={{
         width: 150,
         height:150,
         borderWidth:0.5,
         borderColor:"green",
         shadowColor: "black",
         elevation: 2,
         borderRadius:10,
      } } />
       
      
      </TouchableOpacity>
       )
           
            }
  
            const  render_FullImage=( )=>{
             
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
      
       
   
     
    </View>
       
                </View>
            
            
              </Modal>
            )
      
      
            }
 
   const  renderProduct  =   (active)  => {
 
      return (
       
        <View style={{marginTop:"5%",margin:15,padding:15}}>
 

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

  
  <TextInput
       style={styles.textInput}
      disabled={true}
      mode="outlined"
      label="Product Id"
      value={Pid}
      placeholder="Product Id"
    />
    
 

 
  <TextInput
  style={styles.textInput}
  mode="outlined"
  disabled={true}
  label="Category"
  value={category.toUpperCase()}
  placeholder="Category"
   
/>
 


  <TextInput
      style={styles.textInput}
      mode="outlined"
      disabled={true}
      label="Product Name"
      value={name}
      placeholder="Product name"
      
    />

<TextInput
      style={styles.textInput}
      mode="outlined"
      label="Num Of Items"
      disabled={true}
      value={noi}
      keyboardType={"number-pad"}
      placeholder="Num Of Items"
       
    />


{/* 
<TextInput
      style={styles.textInput}
      mode="outlined"
      disabled={true}
      label="Starting Amount"
      value={startingAmount} 
      keyboardType="number-pad"
 
      placeholder='Starting Amount'
    /> */}


 
<TextInput
      style={styles.textInput}
      mode="outlined"
      label='Increment'
      value={inc} 
      disabled={true}
      keyboardType="number-pad"
 
      placeholder='Increment'
    />
 
<TextInput
      style={styles.textInput}
      mode="outlined"
      label='Start Bid Amount'
      value={sba} 
      disabled={true}
      keyboardType="number-pad"
      
      placeholder='Start Bid Amount'
    />

{/* <TextInput
      style={styles.textInput}
      mode="outlined"
      label='Auto Bid'
      disabled={true}
      value={ab} 
      keyboardType="number-pad"
     
      placeholder='AUto Bid'
    /> */}

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
 
    const renderLastBid=()=>{

      if(lb){
         let bname =bn
          bname= allOther.strLength(bname,"bname")
          let bemail=be
          bemail= allOther.strLength(bemail,"email")
         let bprice=bp


          return(
            <View style={{padding:10,borderRadius:10,marginBottom:10}}>
          
          <Text style={{fontSize:17,color:"white",fontWeight:"900"}}>Last Bid : </Text>
          
          <View style={{backgroundColor:"white",marginTop:5,padding:10}}>
          
     
          <View style={{flexDirection:"row" }}>
          <Image style={{width:30,height:30}} source={require("../../assets/bidder.png")} />
          <View style={{marginLeft:15}}> 
          <Text style={{color:"black",fontWeight:"bold",textTransform:"capitalize"}}>{bname}</Text>
          <Text style={{color:"black",fontWeight:"bold"}}>{bemail}</Text>
           
          <View style={{flexDirection:"row",alignItems:"center" ,width:230}}>
                    <Text style={{color:"black",textTransform:"capitalize"}}>Price :</Text> 
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
          <View style={{padding:10,borderRadius:10,marginBottom:10}}>
        
          <Text style={{fontSize:17,color:"white",fontWeight:"900"}}>Last Bid : </Text>
          
          <View style={{backgroundColor:"white",marginTop:5,padding:10,borderRadius:10}}>
   
          <Text style={{ color:"black",alignSelf:"center"}}>Empty </Text>
           
          </View> 
    
            </View>
              )
        

      }
     
    }

    const renderButton=()=>{


      return(
        <View style={{width:"100%",marginTop:20,padding:10,justifyContent:"flex-end",backgroundColor:"#383838"}}>

       
{renderLastBid()}
<TouchableOpacity 
 onPress={()=>{
  if(b==false) {
      setdialogClick2(true);setdialogVisible2(true)
  }
  else{
    // allOther.AlertMessage("","You have already bid this poduct")
  }
  
  }}
style={{backgroundColor:"#32a852",height:40,alignItems:"center",justifyContent:"center",borderRadius:10}} >
<Text style={{fontSize:20,color:"white",alignSelf:"center",fontWeight:"bold"}}>{b==false?"Bid Now":"View Your Bid"}</Text>
</TouchableOpacity>
      </View>
      )
    }

    const  render_Bid = ()=>
    {
      
      return(
      <Dialog
        visible={dialogVisible2}
        hasOverlay={true}
        overlayOpacity={0.8}
        
        dialogTitle={<DialogTitle style={{backgroundColor:"#307ecc"}} textStyle={{color:"white"}}  title="Bid" />}
        footer={
          <DialogFooter style={{backgroundColor:"#307ecc"}}>
            <DialogButton
            style={{backgroundColor:"white"}}
              text="Cancel"
              textStyle={{color:"black"}}
              onPress={() => {setdialogVisible2(false);setip(0);settb(userData.user.tb);setprice(lprice)}}
            />
            <DialogButton
            
              text="Bid"
            textStyle={{color: "white"}}
              style={{backgroundColor:"#307ecc"}}
              onPress={() => { bidnow()  }}
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
 
        <DialogContent style={{width:windowWidth-20,padding:7}}>
 <ScrollView style={{marginBottom:10}}>
 
 <View style={{alignSelf:"center",marginTop:10,flexDirection:"row"}}>
<Text>Total Bids : </Text>
<Text style={{color:"green",marginLeft:10}}>{tb}</Text>
 </View>
  
      <View style={{marginTop:15}}>
 
 <View style={{flexDirection:"row",justifyContent:"space-between"}}>
         <Text> 
          Start Bidding Amount : 
        </Text>
 
        <Text style={{color:"green"}}> 
         {sba}
        </Text>
 
 </View>
 
 <View style={{flexDirection:"row",justifyContent:"space-between",marginTop:10}}>
         <Text> 
         Increment : 
        </Text>
 
        <Text style={{color:"green"}}> 
         {inc}
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

 <View style={{flexDirection:"row",justifyContent:"space-between",marginTop:10}}>
         <Text> 
         Bid : 
        </Text>
 
 <View style={{flexDirection:"row"}}>

<TouchableOpacity disabled={ip==0?true:false}  onPress={()=>{
    let i=ip-1;
    let ii=tb+1;
    let np= parseInt(price)-500
     setip(i)
     settb(ii)
    setprice(np)
    }} >
<allOther.vectorIcon.AntDesign name="minuscircleo" color={ip>0?"black":"silver"} size={22} />
</TouchableOpacity>

<Text style={{color:"green",marginLeft:10}}>{ip}</Text>

<TouchableOpacity style={{marginLeft:10}} onPress={()=>{
  if(tb>0){
    let i=ip+1;
    let ii=tb-1;
    let np=parseInt(price)+500
    setip(i);
    settb(ii)
    setprice(np)
  }else{
    allOther.AlertMessage("","Your total bids is 0 , Please Purchase  bids")
  }
 
  }}>
<allOther.vectorIcon.AntDesign name="pluscircleo" color="black" size={22} />
</TouchableOpacity>

 </View>
        
 
 </View>

{ip>0&&(
    <View style={{flexDirection:"row",justifyContent:"space-between",marginTop:10}}>
         <Text> 
         New Bid Price : 
        </Text>
 
        <Text style={{color:"green"}}> 
         {price}
        </Text>
 
 </View> 
)}
  
   
     </View>
 
  
     </ScrollView>
        </DialogContent>
      </Dialog>
    
      )
    
    }

    let active="";

    auctionsData.auctions.map((item,index)=>{    
      if(item.id==aid){
        active=item.data.active
      }
    })

return(
  <View style={{flex:1}}>
 <allOther.Header  title="" nav={props.navigation}/>
  <allOther.Loader loader={loader}/>
  {mv && render_FullImage()} 
  {dialogClick2 &&  render_Bid()}
 <ScrollView>      
          {renderProduct(active)}
</ScrollView>    
{renderButton()}
 
  
 
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