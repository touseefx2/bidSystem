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
  
    const auctionsData = useSelector(state => state.auctionReducer)
    const productsData = useSelector(state => state.productReducer)
    const allVendorsData = useSelector(state => state.vendorReducer)
 
    useEffect(()=>{
      productsData.products.map((item,index)=>{

        if(item.id==pid){

          let uid=item.data.uid || ""
           let vn=""
           let ve=""

          allVendorsData.vendor.map((item,index)=>{
            if(item.uid==uid){
              vn=item.name || ""
              ve=item.email || ""
              }

          })


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
  
 
          setvn(vn);setve(ve)
        setname(name);setphoto(photo);setcategory(category);setdescription(description);setstartingAmount(starting_Amount);
        setPid(Pid);setsba(sba);setnoi(noi);setab(ab);setinc(inc)
          setTimeout(() => {
          setloader(false)
          }, 1000);
 
        
        
        
        }

 
      })
     },[productsData])

  
    
    const renderPhoto=({item,index})=>{
      return(
      <TouchableOpacity  onPress={()=>{setp(item.uri);setspi(index);setmv(true)}} style={{marginLeft:5,marginRight:5,marginTop:10}} >
      
      <Image source={{uri: item.uri}}   style={{
         width: 150,
         height:150,
         shadowColor: "black",
         elevation: 2,
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
      style={[styles.textInput,{marginTop:70}]}
      disabled={true}
      mode="outlined"
      label="Vendor Name"
      value={vn}
      placeholder="Vendor Name"
    />

<TextInput
      style={styles.textInput}
      disabled={true}
      mode="outlined"
      label="Vendor Email"
      value={ve}
      placeholder="Vendor Email"
    />
 

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

<TextInput
      style={styles.textInput}
      mode="outlined"
      label='Auto Bid'
      disabled={true}
      value={ab} 
      keyboardType="number-pad"
     
      placeholder='AUto Bid'
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
 <ScrollView>      
          {renderProduct(active)}
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