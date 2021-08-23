import React, { useEffect, useState,useRef} from 'react';
import { View,Text,StyleSheet} from "react-native";
import  allOther from "../other/allOther"
import {useSelector,useDispatch  } from 'react-redux'
import firestore from '@react-native-firebase/firestore';
import allActions  from "../redux/allActions"
import moment from "moment";
import auth from '@react-native-firebase/auth';

  export default  function  Home(props)  {

 
  const [setProductData, setsetProductData]         = useState(false)
  const [setAuctionData, setsetAuctionData]         = useState(false)
  const [setAllVendorstData, setsetAllVendorsData] = useState(false)
  const [setAllBiddersData, setsetAllBiddersData] = useState(false)
  const [setbdData, setsetbdData] = useState(false)
  const [setAllProductstData, setsetAllProductsData] = useState(false)
  const [setAllrbData, setsetAllrbData] = useState(false)

  const dispatch = useDispatch()
  const userData = useSelector(state => state.userReducer)
  let unsubP=null;
 
 
   const GlobaldynamicheckProduct=()=>{
    
   
    const pdb=firestore().collection("auctions")
     unsubP= pdb.onSnapshot((doc)=>{
      
      if(doc){
      doc.forEach((e,i,a)=>{
        let d=e.data()
       
        if(d.active=="no"){

          
          let pid=e.id;

          var ed = moment(new Date(d.date),"DD/MM/YYYY");
          let cd =  compare(ed)

         

          if(cd == "Greater")
          {
            pdb.doc(pid).update({
             active:"end"
            })
          }

          if(cd == "Equal")
          {
            var ct= moment(new Date()).format('h:mma')
            var currentTime = moment(ct, 'h:mma');
            var st =  moment(d.st, 'h:mma');

           
 
            if(currentTime.isAfter(st) || currentTime.isSame(st))
            {
              pdb.doc(pid).update({
                active:"yes"
              })      
            }
          }
      

        }else if(d.active=="yes") {


          let pid=e.id;

          var ed = moment( new Date(d.date),"DD/MM/YYYY");
          let cd =  compare(ed)

         
          if(cd == "Greater")
          {
            pdb.doc(pid).update({
             active:"end"
            })
          }

          if(cd == "Equal")
          {
            var ct= moment(new Date()).format('h:mma')
            var currentTime = moment(ct, 'h:mma');
            var et  =  moment(d.et, 'h:mma');
            if(currentTime.isAfter(et) || currentTime.isSame(et))
            {
              pdb.doc(pid).update({
                active:"end"
              })      
            }
          }


        }

      })
      }

    })
  }

  const compare=(d)=> {
    var cd = moment(new Date()).format("D/M/Y")
    var CurrentDate = moment(cd,"DD/MM/YYYY");  //curemt dare

    var aad = moment(d).format("D/M/Y")
    var ad = moment(aad,"DD/MM/YYYY");  //end date

   

    if (CurrentDate > ad) {
      return "Greater"
     } else if (CurrentDate < ad){
      return "Smaller"
     }else{
      return "Equal"
     }
}
 
  useEffect(()=>{
    GlobaldynamicheckProduct()
    let  interval  = setInterval(  () => {GlobaldynamicheckProduct()},2000); 
    const db=firestore().collection("users").doc(userData.user.uid)
   
     const unsub= db.onSnapshot(async  (doc)=>{
      
        try {
           db.get().then(async  (doc)=>{
         
           
            let  data= []
          if(doc.exists){
            id=doc.id;
           data = doc.data()
           }  

           if(data.block==true){
            try {
      
              auth().signOut()
              .then(()=>
              console.log("Logout"),
              dispatch(allActions.u_action.logOut()),
              )
              .catch(error=>{ 
              //  allOther.AlertMessage("",error.message)
              console.log("logout error : ",error);
              });
        } catch (error) {
              var errorMessage = error.message;
              var si  = errorMessage.indexOf("]")+1
              var  ei  = errorMessage.length -1
              const msg = errorMessage.substr(si,ei)
              allOther.AlertMessage("",msg)
         
        }
           }
      
          if(data.block==false){

      const unsubb =   auth().onAuthStateChanged( async (user)=> {
            if (user) {
             db.update({
                emailVerified:user.emailVerified
              })
                      }  
       });

   dispatch(allActions.u_action.setUser(data))
            
       unsubb();

          }

       
        })
       
      } catch (error) {
              var errorMessage = error.message;
              var si  = errorMessage.indexOf("]")+1
              var  ei  = errorMessage.length -1
              const msg = errorMessage.substr(si,ei)
               allOther.AlertMessage("",msg)
        }
         
         
    

    })

    
   if(userData.user.type=="vendor"){
        setsetProductData(true)
        setsetAuctionData(true)
   }

   if(userData.user.type=="admin"){
      setsetAllVendorsData(true)
      setsetAuctionData(true)
      setsetAllBiddersData(true)
      setsetAllProductsData(true)
      setsetAllrbData(true)
}

if(userData.user.type=="bidder"){
  setsetAllProductsData(true)
  setsetAuctionData(true)
  setsetAllrbData(true)
  // setsetbdData(true)
}

return () => {
  // Anything in here is fired on component unmount.
   clearInterval(interval)
   unsub();
   if(unsubP!=null){
    unsubP();
   }
   
}

  },[])
     
return(
  <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
 
 {userData.user.type=="bidder" &&(
   <Text style={{position:"absolute",top:10,right:10,color:"black",fontSize:16}}>Total Bids : {userData.user.tb}</Text>
 )}

 {setProductData  && <allOther.firebase.FireBaseFunction type={"set-products-data"} uid={userData.user.uid} /> }   
 {setAuctionData  && <allOther.firebase.FireBaseFunction type={"set-auctions-data"} /> }   
 {setAllVendorstData && <allOther.firebase.FireBaseFunction type={"set-all-vendors-data"}  /> }   
 {setAllrbData && <allOther.firebase.FireBaseFunction type={"set-allrbdata"}  /> }   
 {setAllBiddersData && <allOther.firebase.FireBaseFunction type={"set-all-bidders-data"}  /> }   
 {/* {setbdData && <allOther.firebase.FireBaseFunction type={"set-product-bidders-data"}  /> }    */}
 {setAllProductstData && <allOther.firebase.FireBaseFunction type={"set-all-products-data"}   /> } 
 
<Text style={{fontSize:30,color:"silver",alignSelf:"center"}}>Welcome</Text>
<Text style={{fontSize:40,color:"#666666",alignSelf:"center"}}>{userData.user.name}</Text>
 

</View>   
)
     }
 
      
  