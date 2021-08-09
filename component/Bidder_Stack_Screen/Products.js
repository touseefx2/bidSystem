import React, { useEffect, useState,useRef} from 'react';
import { View,TouchableOpacity,Text,Dimensions,StyleSheet,ScrollView,Modal,Image} from "react-native";
import  allOther from "../other/allOther"
import {useSelector  } from 'react-redux'
import moment from "moment";
 

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
 
const cardWidth=windowWidth-35;
const cardHeight=280;

 
  export default  function  Products(props)  {

 
  const [vb, setvb] = useState(false)
  const [loader, setloader] = useState(false)
 
  
  const productsData = useSelector(state => state.productReducer)
 
      
      const    RenderProducts  = () => { 
    
        let c=false; //for check empty vndrs or not
         let product  =   productsData.products.map((item,index)=>{
        
          if(item.data.status=="active" && item.data.block==false){
            c=true;
        let name = item.data.name || ""
        let status = item.data.status || ""
        let id=item.id || ""
        let photo = item.data.photo || ""
        let Pid=item.data.pid
        let endDate= item.data.endDate.toDate() || ""
        name  =   allOther.strLength(name,"name")

          var time = "at "+moment(endDate).format('hh:mm a')     //10:12 am 
          var date =  moment(endDate).format("D MMMM Y");   //9 july 2021
 
       return (
  <View style={styles.card}>

 

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

  <Image style={{height:100,width:100,alignSelf:"center",marginTop:10,borderRadius:10}} source={{uri:photo}}  />

  <View style={{position:"absolute",bottom:0,width:cardWidth,borderBottomRightRadius:10,borderBottomLeftRadius:10}}>
<TouchableOpacity 
 onPress={()=>{props.navigation.navigate("View_Product",{pid:id})}}
style={{backgroundColor:"#dedede",borderBottomRightRadius:10,borderBottomLeftRadius:10}} >
<Text style={{fontSize:18,color:"black",alignSelf:"center",fontWeight:"800"}}>View more</Text>
</TouchableOpacity>
      </View>

    
       
    </View>  
      
 
             )
          }
 
       })
    
       if(!c){
        return <Text style={{fontSize:38,color:"silver",marginTop:"60%",alignSelf:"center"}} >Empty</Text>
       }else{
       return product;
       }

      }
      
      
return(
  <View style={{flex:1}}>
 
  <allOther.Loader loader={loader}/>
 
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
    }
  
  });  