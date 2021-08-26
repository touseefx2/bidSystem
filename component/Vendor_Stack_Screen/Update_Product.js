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

 

  export default  function  UpdateProduct(props)  {

    const [loader, setloader] = useState(true)
    const  {pid,ac,aid} = props.route.params;

    const [name, setname] = useState("")
    const [photo, setphoto] = useState([])
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

 
    useEffect(()=>{
      productsData.products.map((item,index)=>{

        if(item.id==pid){

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
        setPid(Pid);setsba(sba);setnoi(noi);setab(ab);setinc(inc)
          setTimeout(() => {
          setloader(false)
          }, 1000);
 
        
        
        
        }

 
      })
     },[productsData])

  
     const checkEmptyFields=()=>{
      if(name!=""   && category!="" && description!="" && startingAmount!="" && sba!="" && inc!="" && noi!="" && ab!="" )
    {
      return false
    }else{
      return true
    }
    }


    const onClickUpdate=async ()=>{
      setloader(true);
      const c= checkEmptyFields();

      console.log("c : ",c)

      if(!c)
      {

        try {
          
  const obj={
          name,
          startingAmount,
          description,
          updatedAt:new Date(),
          category,
          autoBid:ab,
          sba,
          inc,
          noi,
           }

        let resp =  await allOther.firebase.__Update(pid,obj,"products")
 
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

{photo.length>3 && (
  <Text style={{marginTop:10,color:"red",fontSize:12}}>Max 3 photo upload</Text>
)}
    

  <TextInput
      style={[styles.textInput,{marginTop:70}]}
      disabled={true}
      mode="outlined"
      label="Product Id"
      value={Pid}
      placeholder="Product Id"
    />
    
 

 {active=="no" ?(
  <DropDownPicker
      items={ac||[]} 
      placeholder={category.toUpperCase()}
      placeholderStyle={{ textAlign: 'center'}}
      containerStyle={{marginTop:20}}
      style={{backgroundColor: '#fafafa',paddingVertical:10,borderColor:"black",borderWidth:1,flexShrink:1,flexWrap:"wrap"}}
      dropDownStyle={{backgroundColor: '#fafafa'}}
      onChangeItem={i => 
        setcategory(i.value)
     }  
 />
 ):(
  <TextInput
  style={styles.textInput}
  mode="outlined"
  disabled={true}
  label="Category"
  value={category.toUpperCase()}
  placeholder="Category"
  // onChangeText={(txt)=>setname(txt)}
/>
 )}



  <TextInput
      style={styles.textInput}
      mode="outlined"
      disabled={active=="no"?false:true}
      label="Product Name"
      value={name}
      placeholder="Product name"
      onChangeText={(txt)=>setname(txt)}
    />

<TextInput
      style={styles.textInput}
      mode="outlined"
      label="Num Of Items"
      disabled={active=="no"?false:true}
      value={noi}
      keyboardType={"number-pad"}
      placeholder="Num Of Items"
      onChangeText={(txt)=>setnoi(txt)}
    />



<TextInput
      style={styles.textInput}
      mode="outlined"
      disabled={active=="no"?false:true}
      label="Starting Amount"
      value={startingAmount} 
      keyboardType="number-pad"
      onChangeText={(txt)=>{setstartingAmount(txt);setab(txt)}}
      placeholder='Starting Amount'
    />


 
<TextInput
      style={styles.textInput}
      mode="outlined"
      label='Increment'
      value={inc} 
      disabled={active=="no"?false:true}
      keyboardType="number-pad"
      onChangeText={(txt)=>setinc(txt)}
      placeholder='Increment'
    />
 
<TextInput
      style={styles.textInput}
      mode="outlined"
      label='Start Bid Amount'
      value={sba} 
      disabled={active=="no"?false:true}
      keyboardType="number-pad"
      onChangeText={(txt)=>setsba(txt)}
      placeholder='Start Bid Amount'
    />

<TextInput
      style={styles.textInput}
      mode="outlined"
      label='Auto Bid'
      disabled={true}
      value={ab} 
      keyboardType="number-pad"
      onChangeText={(txt)=>setab(txt)}
      placeholder='AUto Bid'
    />

<TextInput
      style={styles.textInput}
      mode="outlined"
      label='Descritption'
      disabled={active=="no"?false:true}
      value={description}  
      onChangeText={(txt)=>setdescription(txt)}
      placeholder='Descritption'
      numberOfLines={5}
      multiline={true}
    />

 
 {active=="no"&&(
  <TouchableOpacity  
style={{backgroundColor: "black",width:100,height:40,borderRadius:20,alignItems:"center",justifyContent:"center",alignSelf:"center",marginTop:40,elevation:5}} 
 onPress={()=>{onClickUpdate()}}
>
<Text style={{color :"white"  ,fontSize:22}}>Update</Text>
</TouchableOpacity>
 )}


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