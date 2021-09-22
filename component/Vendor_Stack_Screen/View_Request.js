import React, { useEffect, useState,useRef} from 'react';
import { View,TouchableOpacity,Text,Dimensions,StyleSheet,ScrollView,Modal,Image,FlatList} from "react-native";
import  allOther from "../other/allOther"
import {useSelector} from 'react-redux'
import firestore from '@react-native-firebase/firestore';
import { TextInput } from 'react-native-paper';
import Dialog, { DialogContent,DialogFooter,DialogButton,SlideAnimation,DialogTitle} from 'react-native-popup-dialog';
import CountDown from 'react-native-countdown-component'; 
import moment   from "moment";
import { set } from 'react-native-reanimated';
 
  export default  function  View_Request(props)  {

    const [loader, setloader] = useState(true)
    const  {pid,bid} = props.route.params;

    const [name, setname] = useState("")
    const [photo, setphoto] = useState([])
  
    const [category, setcategory] = useState("")
    const [description, setdescription] = useState("")
    const [noi, setnoi] = useState("")
    const [sba, setsba] = useState("")
    const [dur, setdur] = useState("")
    const [fdur, setfdur] = useState("")
    const [abo,setabo]=useState("") //autobid optnl
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

    const [ybn, setybn] = useState("")
    const [ybe, setybe] = useState("")
    const [ybp, setybp] = useState("")
    const [yab, setyab] = useState("")

   

    const [vn, setvn] = useState("")
    const [ve, setve] = useState("")
    const [vp, setvp] = useState("")

    // const [tb, settb] = useState(0)
    const [dialogVisible2, setdialogVisible2] = useState(false) //bid dialog
    const [dialogClick2, setdialogClick2] = useState(false)

    const [ip, setip] = useState(0)   //incrmt dec plus   minus check

    const [dc, setdc] = useState(false)  //vie tour bid modal
    
    const windowWidth = Dimensions.get('window').width;

    const auctionsData = useSelector(state => state.auctionReducer)
    const productsData = useSelector(state => state.productReducer)
    const userData = useSelector(state => state.userReducer)

    const allBiddersData = useSelector(state => state.bidderReducer)
    const allVendorsData = useSelector(state => state.vendorReducer)

    const bdd = useSelector(state => state.bdReducer)
 
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
        setPid(Pid);setsba(sba);setnoi(noi);setab(ab);setinc(inc);setlprice(sba);setprice(sba);setdur(item.data.duration)
          setTimeout(() => {
          setloader(false)
          }, 400);
 
        
        
        
        }

 
      })
     },[productsData])
 

     useEffect(()=>{

      allBiddersData.bidders.map((item,index)=>{

        if(bid==item.uid){


          let name = item.name || ""
          let email = item.email || ""
          let Phone = item.phone|| ""
        
          setve(email);
          setvn(name);
          setvp(Phone)

        }
      

      })

     },[allBiddersData])
 
  
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
 
   const  renderProduct  =   ()  => {
 
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

{/* <TextInput
      style={styles.textInput}
      mode="outlined"
      label="Num Of Items"
      disabled={true}
      value={noi}
      keyboardType={"number-pad"}
      placeholder="Num Of Items"
       
    /> */}


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


 
{/* <TextInput
      style={styles.textInput}
      mode="outlined"
      label='Increment'
      value={inc} 
      disabled={true}
      keyboardType="number-pad"
 
      placeholder='Increment'
    /> */}
 
{/* <TextInput
      style={styles.textInput}
      mode="outlined"
      label='Start Bid Amount'
      value={sba} 
      disabled={true}
      keyboardType="number-pad"
      
      placeholder='Start Bid Amount'
    /> */}

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

<TextInput
      style={styles.textInput}
      mode="outlined"
      disabled={true}
      label="Bidder Name"
      value={vn}
      placeholder="Bidder Name"
      
    />

<TextInput
      style={styles.textInput}
      mode="outlined"
      disabled={true}
      label="Bidder Email"
      value={ve}
      placeholder="Bidder Email"
      
    />

<TextInput
      style={styles.textInput}
      mode="outlined"
      disabled={true}
      label="Bidder Phone"
      value={vp}
      placeholder="Bidder Phone"
      
    />
  
          </View>
 
        
      )
    }
 
 

return(
  <View style={{flex:1}}>
 <allOther.Header    title=""  nav={props.navigation}/>
  <allOther.Loader loader={loader}/>
  {mv && render_FullImage()} 
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