import React, { useEffect, useState,useRef} from 'react';
import { View,TouchableOpacity,Text,Dimensions,StyleSheet,ScrollView,Animated,TextInput,Platform,Alert,Image,Modal, SegmentedControlIOSComponent} from "react-native";
import  allOther from "../other/allOther"
import Dialog, { DialogContent,DialogFooter,DialogButton,SlideAnimation,DialogTitle} from 'react-native-popup-dialog';
import {useSelector  } from 'react-redux'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
 
const cardWidth=windowWidth-35;
const cardHeight=135;
 
  
  export default  function  Request(props)  {

 
  const [date, setdate] = useState("") //only for show with time
  const [d , setd ] = useState("") //for save in db

  const [dtp, setdtp] = useState(false)
  const [loader, setloader] = useState(true)
  const [pid, setpid] = useState(true) //pid
  
  const [vr,setvr]=useState(false);

  const [dialogVisible, setdialogVisible] = useState(false)
  const [dialogClick, setdialogClick] = useState(false)
 
  const productsData = useSelector(state => state.productReducer)  //all
  const userData = useSelector(state => state.userReducer)  
  const scrollY= useRef(new Animated.Value(0)).current;
        
 
  useEffect(()=>{
  
    setTimeout(() => {
      setloader(false)
    }, 800);
    
     
      },[])



      const checkEmptyFields= ()=> 
{
  
    if(date==""   ){
      return false;
    } else{
      return true;
    }
}

      const onClickAccept=async ()=>{
     
        setloader(true);   

          try {
            
           const obj={
            status:"active",
            endDate:d,
            startDate:new Date()
             }
  
          let resp =  await allOther.firebase.__Update(pid,obj,"products")
   
          if(resp){
            allOther.ToastAndroid.ToastAndroid_SB("Accept")
           }

           setloader(false)
           setpid("")
           setd("")
           setdate("")
           setdialogVisible(false)
  
          } catch (error) {
            console.log("Update Product error  try cath :  ",error);
            setloader(false)
           setpid("")
           setd("")
           setdate("")
           setdialogVisible(false)
          }
   
           
      }

      const onClickReject=async ()=>{
        setvr(false)
        setloader(true);
         
          try {
            
           const obj={
            status:"reject"
             }
  
          let resp =  await allOther.firebase.__Update(pid,obj,"products")
   
          if(resp){
            allOther.ToastAndroid.ToastAndroid_SB("Reject")
           }
           setloader(false)
           setpid("")
  
          } catch (error) {
            console.log("Update Product error  try cath :  ",error);
            setloader(false)
            setpid("")
          }
   
           
      }
 
      const confirmDateTime = (d)=>{
        let c =  d 
        var time =  moment(c).format('hh:mm a')     //10:12 am 
        var date =  moment(c).format("D MMMM Y");   //9 july 2021
        c= date + " at  "+time
        setdtp(false)
        setdate(c)
        setd(d)
      }
  
      const    RenderProducts  = () => { 
    
         let c=false;
         let product  =   productsData.products.map((item,index)=>{
          if(item.data.status=="pending" && item.data.block==false){
            
            c=true;
            let name = item.data.name || ""
            let status = item.data.status || ""
            let id=item.id || ""
            let Pid=item.data.pid
            name  =   allOther.strLength(name,"name")
            
           const scale = scrollY.interpolate({
            inputRange :[
              -1,0,
              cardHeight * index,
              cardHeight * (index+2)
            ]
            ,  
            outputRange:[1, 1, 1, 0]
          })
    
          const opacity = scrollY.interpolate({
            inputRange :[
              -1,0,
              cardHeight * index,
              cardHeight * (index+0.9)
            ]
            ,  
            outputRange:[1, 1, 1, 0]
          })
    
    
           return (
      
     
            <Animated.View style={[styles.card,
              {
              opacity,
              transform:[{scale}]
              }
            ]}>
  
    
    <TouchableOpacity onPress={()=>{props.navigation.navigate("View_Request",{pid:id})}} >
    
    
     <View style={{flexDirection:"row",alignItems:"center",flexShrink:1,marginTop:10}}>
    <allOther.vectorIcon.AntDesign size={20} color="#307ecc" name="rightcircle" />
    <View style={{flexShrink:1}}>
    <Text style={{color:"#307ecc",fontWeight:"bold",textTransform:"capitalize",fontSize:15,marginLeft:10}}>{name}</Text>    
    </View>
     </View>
    
     <View style={{marginLeft:30,marginTop:5}}> 
    
    
     <View style={{flexDirection:"row",alignItems:"center"}}>
              <Text style={{color:"black",textTransform:"capitalize",fontSize:14}}>Product Id</Text> 
              <Text style={{color:"black",textTransform:"capitalize",fontSize:14,position:"absolute",right:0}}>{Pid}</Text>
      </View>        
              
     <View style={{flexDirection:"row",alignItems:"center",marginTop:5}}>
    <Text style={{color:"black",textTransform:"capitalize",fontSize:15}}>status</Text>  
    <Text style={{color:"#307ecc",textTransform:"capitalize",fontSize:15,position:"absolute",right:0}}>{status}</Text>   
     </View>
    
     </View>
    
           </TouchableOpacity>
           
         
  <View style={{flexDirection:"row",position:"absolute",bottom:0,width:cardWidth,borderBottomRightRadius:10,borderBottomLeftRadius:10}}>

<TouchableOpacity  style={{backgroundColor:"#47d13b",width:cardWidth/2,borderBottomLeftRadius:10}} onPress={()=>{setdialogClick(true);setdialogVisible(true);setpid(id)}}>
<Text style={{fontSize:22,color:"white",alignSelf:"center"}}>Accept</Text>
</TouchableOpacity>

<TouchableOpacity  style={{backgroundColor:null,width:cardWidth/2,borderBottomRightRadius:10}}  onPress={()=>{setvr(true);setpid(id)}}>
<Text style={{fontSize:22,color:"#5e5e5e",alignSelf:"center"}}>Reject</Text>
</TouchableOpacity>

      </View>

    
           
        </Animated.View>  
          
     
                 )

             }


       })
    
       if(!c){
        return <Text style={{fontSize:38,color:"silver",marginTop:"60%",alignSelf:"center"}} >Empty</Text>
       }else{
       return product;
       }
      }
       
      const renderRejectSubmitModal=()=>{
        return(
        <Modal
        animationType='fade'
        transparent={true}
        visible={vr}
      >
        <View style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.5)',
          justifyContent: 'center', alignItems: 'center'
        }}>
    
          <View style={{
            backgroundColor: '#fff', height: 150,
            width: 270,
            borderRadius: 18
          }}>
    
            <Text style={{ textAlign: 'center', fontSize: 25,marginTop:20}}>
              <Text> Confirm Reject ?</Text>
            </Text>
          
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width:270,position:"absolute",bottom:0
              }}
            >
              <TouchableOpacity onPress={() => {
                    onClickReject()
              }}
                style={{
                  backgroundColor: '#5E81F4', width: 135,
                  height: 40,
                  borderBottomLeftRadius:18,
                  justifyContent: 'center', alignItems: 'center',
                }}
              >
                <Text style={{
                  fontSize: 16,
                  color: '#fff'
                }}>Yes</Text>
              </TouchableOpacity >
              <TouchableOpacity 
              onPress={() => {
                setvr(false); setpid("") 
              }}
                style={{
                  width: 135, height: 40,
                  justifyContent: 'center', alignItems: 'center',
                }}
              >
                <Text style={{
                  fontSize: 16,
                  color: '#5E81F4'
                }} >No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
        )
      }

      const renderAcceptSubmitModal=()=>{
        let ButtonEnable=false

        if(checkEmptyFields()) 
        ButtonEnable=true 
        
        return(
        <Dialog
          visible={dialogVisible}
          hasOverlay={true}
          overlayOpacity={0.8}
          
          dialogTitle={<DialogTitle style={{backgroundColor:"#307ecc"}} textStyle={{color:"white"}}  title="Accept" />}s
          footer={
            <DialogFooter style={{backgroundColor:"#307ecc"}}>
              <DialogButton
              style={{backgroundColor:!ButtonEnable ? "#307ecc" : "white"}}
                text="Cancel"
                textStyle={{color:!ButtonEnable ? "white" : "black"}}
                onPress={() => {setdialogVisible("");setpid("");setdate("")}}
              />
              <DialogButton
               disabled={!ButtonEnable}
                text="Confirm"
              textStyle={{color:!ButtonEnable ? "silver":"white"}}
                style={{backgroundColor:!ButtonEnable ?"white":"#307ecc"}}
                onPress={() => { ButtonEnable ? onClickAccept() : null}}
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
          {renderDateTimePicker()}
          <DialogContent style={{width:windowWidth-50,alignItems:"center",justifyContent:"center",padding:5}}>
    
    <TouchableOpacity onPress={()=>{setdtp(true)}}
    style={{width:180,height:50,justifyContent:"center",alignItems:"center",backgroundColor:"#dedede",marginTop:20,borderRadius:10}}>
    <Text style={{color:"black",fontSize:16}}>Set End (Date/time)</Text>
    </TouchableOpacity>
 
{date!==""  &&(
<Text style={{fontSize:15,marginTop:15}}>
{date}
</Text>

     )}
 
   
          </DialogContent>
        </Dialog>
      
        )
      }

   const   renderDateTimePicker = ()=>
      {
        return(
          <View>
            <DateTimePickerModal
              isVisible={dtp}
              mode='datetime'
              date={new Date()}
              itemStyle={{
                backgroundColor: "red"            
              }}
              
              minimumDate={new Date()}
              onConfirm={(d)=> confirmDateTime(d)}
              onCancel={()=>{setdtp(false);setdate("");setd("")}}
              
            />
          </View>
        )
      }
     
return(
  <View style={{flex:1}}>
  
  <allOther.Loader loader={loader}/>
  {dialogClick &&  renderAcceptSubmitModal()}  
  {renderRejectSubmitModal()}
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