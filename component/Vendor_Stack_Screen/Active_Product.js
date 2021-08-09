import React, { useEffect, useState,useRef} from 'react';
import { View,TouchableOpacity,Text,Dimensions,StyleSheet,ScrollView,Modal,Image} from "react-native";
import  allOther from "../other/allOther"
import {useSelector  } from 'react-redux'
import moment from "moment";
import firestore from '@react-native-firebase/firestore';
import { TextInput } from 'react-native-paper';
import { set } from 'react-native-reanimated';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
 
const cardWidth=windowWidth-35;
const cardHeight=170;

 
  export default  function  Active_Product(props)  {

 
  const [vb, setvb] = useState(false)  //all bider show modal

  const [vbd, setvbd] = useState(false)  //  bider detail show modal
  const [name, setname] = useState("")
  const [email, setemail] = useState("")
  const [phone, setphone] = useState("")
  const [ba, setba] = useState("") //bid at

  const [loader, setloader] = useState(false)
 
  const [b, setb] = useState([]) //bidders
  const [pid, setpid] = useState("") //pid
  const [bid, setbid] = useState("") //pid
  
  const productsData = useSelector(state => state.productReducer)
  const userData = useSelector(state => state.userReducer)
      
      const    RenderProducts  = () => { 
    
         let product  =   productsData.products.map((item,index)=>{
        
          if(item.data.status=="active" && item.data.block==false){

        let name = item.data.name || ""
        let status = item.data.status || ""
        let id=item.id || ""
        let Pid=item.data.pid
        let endDate= item.data.endDate.toDate() || ""
        name  =   allOther.strLength(name,"name")

          var time = "at "+moment(endDate).format('hh:mm a')     //10:12 am 
          var date =  moment(endDate).format("D MMMM Y");   //9 july 2021
 
       return (
  <View style={styles.card}>

<TouchableOpacity onPress={()=>{props.navigation.navigate("View_Products",{pid:id})}} >

<View style={{flexDirection:"row",alignItems:"center",flexShrink:1,marginTop:10}}>
<allOther.vectorIcon.AntDesign size={20} color="#307ecc" name="rightcircle" />
<View style={{flexShrink:1}}>
<Text style={{color:"#307ecc",fontWeight:"bold",textTransform:"capitalize",fontSize:15,marginLeft:10}}>{name}</Text>    
</View>
 </View>

 <View style={{marginLeft:30,marginTop:5}}> 


 <View style={{flexDirection:"row",alignItems:"center"}}>
          <Text style={{color:"black",textTransform:"capitalize",fontSize:13}}>Product Id</Text> 
          <Text style={{color:"black",textTransform:"capitalize",fontSize:13,position:"absolute",right:0}}>{Pid}</Text>
  </View>      

   <View style={{flexDirection:"row",alignItems:"center",marginTop:15}}>
          <Text style={{color:"black",textTransform:"capitalize",fontSize:13}}>End Date</Text> 
          <View style={{position:"absolute",right:0}}>
          <Text style={{color:"black",textTransform:"capitalize",fontSize:13}}>{date}</Text>
          <Text style={{color:"black",textTransform:"capitalize",fontSize:13}}>{time}</Text>
          </View>
          
  </View>   
          
 <View style={{flexDirection:"row",alignItems:"center",marginTop:15}}>
<Text style={{color:"black",textTransform:"capitalize",fontSize:13}}>status</Text>  
<Text style={{color:"#307ecc",textTransform:"capitalize",fontSize:13,position:"absolute",right:0,fontWeight:"bold"}}>{status}</Text>   
 </View>

 </View>

       </TouchableOpacity>


  <View style={{position:"absolute",bottom:0,width:cardWidth,borderBottomRightRadius:10,borderBottomLeftRadius:10}}>
<TouchableOpacity 
onPress={()=>{setpid(id);setvb(true)}}
style={{backgroundColor:"#dedede",borderBottomRightRadius:10,borderBottomLeftRadius:10}} >
<Text style={{fontSize:18,color:"black",alignSelf:"center",fontWeight:"800"}}>View Bids</Text>
</TouchableOpacity>
      </View>

    
       
    </View>  
      
 
             )
          }
 
       })
    
  return  product;

      }

      useEffect(()=>{
  

        const unsub = firestore().collection("products").doc(pid).collection("bids").orderBy("createdAt","desc").onSnapshot((doc)=>{
          let arr=[]
 
        if(pid!=""){
        if(doc.size>0){
          doc.forEach((e,i,a)=>{
          arr.push(e.data())
          })
        } 
               }
      setb(arr)
    })

    
 

     return () => {
      // Anything in here is fired on component unmount.
       unsub();
    }
    

      },[pid])


      useEffect(()=>{
     
        if(bid!=""){
        setloader(true)
        }

        const unsubb = firestore().collection("users").doc(bid).onSnapshot((doc)=>{
         
 
        if(bid!=""){
         
        if(doc.exists){
           let d= doc.data();


           let c =  d.createdAt.toDate()//bcs firbase cnvrt into obj so again parse date
         
          var time =  moment(c).format('hh:mm a')     //10:12 am 
          var date =  moment(c).format("D MMMM Y");   //9 july 2021

          c= date + " at  "+time

           setname(d.name);setemail(d.email);setphone(d.phone);setba(c)
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
    

      },[bid])

      const renderBidders=()=>{
   
        if(b.length>0){

      let bidder =  b.map((e,i,a)=>{

        let name=e.bidderName;
        let email=e.bidderEmail;
        let price = e.price;
        let bid=e.bid

         name= allOther.strLength(name,"bname")
         email= allOther.strLength(email,"email")

         return(

          <View style={{margin:10,padding:10}}>
         
        <TouchableOpacity
        onPress={()=>{setbid(bid);setvbd(true)}}
        style={{backgroundColor:"#66bd7d",padding:10,borderRadius:10}}>
        
   {i==0&&(
     <allOther.vectorIcon.Entypo style={{position:"absolute",right:5,top:5}} size={18} name="star" color="yellow" />
   )}
        <View style={{flexDirection:"row" }}>
        <Image style={{width:30,height:30}} source={require("../../assets/bidder.png")} />
        <View style={{marginLeft:15}}> 
        <Text style={{color:"white",fontWeight:"bold",textTransform:"capitalize"}}>{name}</Text>
        <Text style={{color:"white",fontWeight:"bold"}}>{email}</Text>
         
        <View style={{flexDirection:"row",alignItems:"center" ,width:230}}>
                  <Text style={{color:"white",textTransform:"capitalize"}}>Price :</Text> 
                  <Text style={{color:"blue",textTransform:"capitalize",position:"absolute",right:0}}>{price}</Text>
         </View>
         
        </View> 
        </View>
        
         
        </TouchableOpacity>
        
          </View>
              )
          
          })

          return bidder;

        }else{
       return <Text style={{fontSize:38,color:"silver",marginTop:"60%",alignSelf:"center"}} >Empty</Text>
        }
  

      }

      const renderBidderDetail=()=>{
   
       
      return (
       
        <View style={{margin:10,padding:10}}>
   <allOther.Loader loader={loader}/>
   <View style={{flex:1,alignSelf:"center"}}>
      <Image style={{height:150,width:150}} source={require("../../assets/dp.png")}  />  
  </View> 
    

  <TextInput
      style={[styles.textInput,{marginTop:30}]}
      mode="outlined"
      disabled={true}
      label="Name"
      value={name}
      placeholder="Name"
      onChangeText={(txt)=>setname(txt)}
    />
    
  <TextInput
     style={styles.textInput}
      disabled={true}
      mode="outlined"
      label="email"
      value={email}
      placeholder="email"
    />

 


  <TextInput
      style={styles.textInput}
      mode="outlined"
      disabled={true}
      label="Phone"
      value={phone}
      placeholder="Phone"
    />

<TextInput
      style={styles.textInput}
      mode="outlined"
      disabled={true}
      label="Bid Date"
      value={ba}
      placeholder="Bid Date"
    />
  
          </View>
 
        
      )
       
      }
      
      const ViewBids =()=>{
        return(
            <Modal
            animationType='fade'
            transparent={false}
            visible={vb}
            >
           {BidderDetail()}
            <View style={{ flex: 1}}>
          
          
<TouchableOpacity style={{left:10,marginTop:5}} onPress={()=>{setpid("");setb([]);setvb(false)}}
>
<allOther.vectorIcon.Entypo size={40} color="#de5050" style={{opacity:0.8}} name="cross" />
</TouchableOpacity>
 
          <ScrollView>

{renderBidders()}
        
         </ScrollView>
 
            </View>
        
          </Modal>
        )
        }

        const BidderDetail =()=>{
          return(
              <Modal
              animationType='fade'
              transparent={false}
              visible={vbd}
              >
              

              <View style={{ flex: 1}}>
            
            
  <TouchableOpacity style={{left:10,marginTop:5}} onPress={()=>{setbid("");setvbd(false);setname("");setemail("");setphone("");setba("")}}
  >
  <allOther.vectorIcon.Entypo size={40} color="#de5050" style={{opacity:0.8}} name="cross" />
  </TouchableOpacity>
   
            <ScrollView>
  
  {renderBidderDetail()}
          
           </ScrollView>
   
              </View>
          
            </Modal>
          )
          }
return(
  <View style={{flex:1}}>

{ViewBids()}
 <ScrollView >
          
              {productsData.products.length<=0   && !loader   
              ?(
              <Text style={{fontSize:38,color:"silver",marginTop:"60%",alignSelf:"center"}} >Empty</Text>
              )
             :(
        
            RenderProducts()
              ) 

            }

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
      height:cardHeight,borderRadius:10,padding:10,borderRadius:10,
      elevation:5,
    },
    textInput:
    {
    marginTop:25,
    textTransform:"capitalize"
}
  
  });  

  