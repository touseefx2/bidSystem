import React, { useEffect, useState,useRef} from 'react';
import { View,TouchableOpacity,Dimensions,StyleSheet,ScrollView,Animated,Platform,Alert,Image,Modal} from "react-native";
import  allOther from "../other/allOther"
import {useSelector  } from 'react-redux'
import moment from "moment";
import { Container, Content, Item, Input ,Text } from 'native-base'; 
import firestore from '@react-native-firebase/firestore';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
 
const cardWidth=windowWidth-35;
 
 
 
  export default  function  PurchaseBid(props)  {

 
  const [loader, setloader] = useState(false)
  // const [setAuctiontData, setsetProductData] = useState(false)
 
  const [mv, setmv] = useState(false)
  const [dv, setdv] = useState(false)
  const [dc, setdc] = useState(false)
  const [p, setp] = useState("")

  let pbr=3 //per bid rate
 
  const [rb, setrb] = useState("") //rqr bid
  const [pb, setpb] = useState("")  //pymnt by
  const [ta, setta] = useState("")  //total amount
  const [photo, setphoto] = useState([])  //photo 

  const auctionsData = useSelector(state => state.auctionReducer)
  const userData = useSelector(state => state.userReducer)
  const reqData = useSelector(state => state.rbReducer)
  const allBiddersData = useSelector(state => state.bidderReducer)

 
  const [vv ,setvv]=useState(false);   // reject modal
  const [rid ,setrid]=useState(""); 
  const [fdb ,setfdb]=useState("");
 
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
onPress={()=>{setmv(!mv);setp("") }}
style={{backgroundColor:"black",borderRadius:25,}}>
<allOther.vectorIcon.Ionicons  name="arrow-back" color="white" size={25} />
</TouchableOpacity> 

 


</View>

      </View>
  
  
    </Modal>
  )


  }

  const onclick =  async (c,rid,uid,rb)=>{

    try {

    if(c){

      Alert.alert(
        "Confirmation",
        "Do you want to confim approve request ",
        [
          {
            text: "Cancel",
            onPress:   () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "OK", onPress: async () => 
       {
    setloader(true);
   const obj={
    status:"approve",
    updatedAt:new Date()
     }

     let resp =  await allOther.firebase.__UpdateBidReq(rid,obj)
     if(resp){

      firestore().collection("users").doc(uid).get().then((d)=>{
        if(d.data()){
          let tb=  parseInt(d.data().tb) + parseInt(rb)

          firestore().collection("users").doc(uid).update({
            tb:tb
          })
          
        }
      })

    

      allOther.ToastAndroid.ToastAndroid_SB("Approve")
     }
     setloader(false)

          } }
        ]
      );

   
    }else{
      setvv(true);setrid(rid) 
    }

  } catch (error) {
    console.log("Update rqst bid error  try cath :  ",error);
    setloader(false)
  }

  }

  
const renderReqData=()=>{
 
  let c=false;

   
  let product=null

  if(reqData.rb.length>0){
   product =  reqData.rb.map((e,i,a)=>{
    
      let rid=e.id //rqst id
      let data=e.data
 
      if(data.status=="pending"){
         c=true;
        let cc =  data.createdAt.toDate()//bcs firbase cnvrt into obj so again parse date
         
        var time =  moment(cc).format('hh:mm a')     //10:12 am 
        var date =  moment(cc).format("D MMMM Y");   //9 july 2021

        cc= date + " at  "+time


        let bn=""
        let be=""

        allBiddersData.bidders.map((item,index)=>{
         if(item.uid==data.uid){
         bn=item.name
         be=item.email
         }
        
        })
  

       return(
        <View style={styles.card}>

          <View style={{padding:10}}>

 <View style={{flexDirection:"row",alignItems:"center",flexShrink:1,marginTop:10}}>
        <allOther.vectorIcon.AntDesign size={20} color="#307ecc" name="rightcircle" />
        <View style={{flexShrink:1}}>
        <Text style={{color:"#307ecc",fontWeight:"bold",textTransform:"capitalize",fontSize:14,marginLeft:10}}>{bn}</Text>    
        </View>
        <TouchableOpacity onPress={()=>{setp(data.photo);setmv(true)}} style={{position:"absolute",right:0}} >
         <allOther.vectorIcon.MaterialIcons name="insert-photo" size={25} color="#307ecc" />
        </TouchableOpacity>
</View>
        
         <View style={{marginLeft:30,marginTop:5}}> 

         <View style={{flexDirection:"row",alignItems:"center",marginTop:5}}>
        <Text style={{color:"black",textTransform:"capitalize",fontSize:13}}>{be}</Text>  
         </View>

         <View style={{flexDirection:"row",alignItems:"center",marginTop:5}}>
        <Text style={{color:"black",textTransform:"capitalize",fontSize:13}}>Payment Method</Text>  
        <Text style={{color:"black",textTransform:"capitalize",fontSize:12,position:"absolute",right:0}}>{data.pb}</Text>   
         </View>


         <View style={{flexDirection:"row",alignItems:"center",marginTop:5}}>
        <Text style={{color:"black",textTransform:"capitalize",fontSize:13}}>Required Bids</Text>  
        <Text style={{color:"black",textTransform:"capitalize",fontSize:12,position:"absolute",right:0}}>{data.rb}</Text>   
         </View>
        
         <View style={{flexDirection:"row",alignItems:"center",marginTop:5}}>
        <Text style={{color:"black",textTransform:"capitalize",fontSize:13}}>Total Rs</Text>  
        <Text style={{color:"black",textTransform:"capitalize",fontSize:12,position:"absolute",right:0}}>{data.ta}</Text>   
         </View>
        
        
        
         <View style={{marginTop:5,flexDirection:"row",alignItems:"center"}}>
        <Text style={{color:"black",fontSize:12}}>{cc}</Text>  
        <Text style={{color:"#307ecc",textTransform:"capitalize",fontSize:12,position:"absolute",right:0}}>{data.status}</Text>   
         </View>

         

         </View>
        
          </View>
         
      
     <View style={{flex:1,height:35,justifyContent:"flex-end",marginTop:10,borderBottomRightRadius:10,borderBottomLeftRadius:10,alignItems:"center",justifyContent:"center"}}>

<View style={{flexDirection:"row",alignSelf:"flex-end",marginRight:10,alignItems:"center"}}>

<TouchableOpacity onPress={()=>{onclick(false,rid,data.uid,data.rb)}}>
<allOther.vectorIcon.Entypo name="cross" size={30} color="red"/>
</TouchableOpacity>

<TouchableOpacity style={{marginLeft:20}} onPress={()=>{onclick(true,rid,data.uid,data.rb)}}>
<allOther.vectorIcon.Entypo name="check" size={30} color="green"/>
</TouchableOpacity>

</View>


        </View>
              
                
            </View> 
       )

      }
    
   
        

    })
  }else{
    c=false
  }

   

  if(!c){
return <Text style={{fontSize:25,color:"silver",marginTop:"60%",alignSelf:"center"}}>Empty</Text>
  }else{
    return product;
  }

}

const renderRejectSubmitModal=()=>{
  return(
  <Modal
  animationType='fade'
  transparent={true}
  onRequestClose={()=>{setvv(false)}}
  visible={vv}
>
  <View style={{
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center', alignItems: 'center'
  }}>

    <View style={{
      backgroundColor: '#fff', height: 260,
      width: 300,
      padding:30,
    }}>

      <Text style={{ fontSize: 20,fontWeight:"bold"}}>Confirmation</Text>

      <Text style={{ fontSize:17,color:"black",marginTop:10}}>Do you want to confim reject request</Text>


         <Item style={{backgroundColor:"white",borderRadius:4,height:44,padding:5,marginTop:10,borderColor:"#007069"}} rounded>
          <Input  style={{color: "black",fontSize:16}}
          placeholder='Feedback' placeholderTextColor={"#686868"} value={fdb}    
           onChangeText={(txt)=>setfdb(txt)} />
          </Item>

 
    
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width:160,position:"absolute",bottom:10,right:10
        }}
      >
          
        <TouchableOpacity 
        onPress={() => {
          setvv(false);setfdb("");setrid("") 
        }}
          style={{
            width: 60, height: 40,
            justifyContent: 'center', alignItems: 'center',
          }}
        >
          <Text style={{
            fontSize: 14,
            color: 'black'
          }} >CANCEL</Text>
        </TouchableOpacity>
     

        <TouchableOpacity onPress={async () => {
              
              if(fdb==""){allOther.AlertMessage("","Please enter feedback !")}
              else
              {
 
                setloader(true);
                const obj={
                 status:"reject",
                 fb:fdb,
                 updatedAt:new Date()
                  }
             
                  let resp =  await allOther.firebase.__UpdateBidReq(rid,obj)
                  if(resp){
                   allOther.ToastAndroid.ToastAndroid_SB("Reject")
                  }
                  setvv(false);setfdb("");setrid("");
                  setloader(false) 
                  
              }
            
        }
      
      }
          style={{
            width: 60,
            height: 40,
            justifyContent: 'center', alignItems: 'center',
          }}
        >
          <Text style={{
            fontSize: 14,
            color: 'black'
          }}>OK</Text>
        </TouchableOpacity >

      </View>
    </View>
  </View>
</Modal>
  )
}
  
 
return(
  <View style={{flex:1}}>
 
 {mv && renderFullImage()}
 {vv && renderRejectSubmitModal()}

  <allOther.Loader loader={loader}/>

 <ScrollView   scrollEventThrottle={1}>
 {renderReqData()}
</ScrollView>    
 
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
      elevation:7,flex:1
    }
  
  });  