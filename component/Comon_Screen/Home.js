import React, { useEffect, useState,useRef} from 'react';
import { View,Text,StyleSheet} from "react-native";
import  allOther from "../other/allOther"
import {useSelector,useDispatch  } from 'react-redux'
import firestore from '@react-native-firebase/firestore';
import allActions  from "../redux/allActions"
import moment  from "moment";
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
  let unsubPb=null;
  let unsubPb2=null;

   const GlobaldynamicheckProduct=()=>{
    

    const adb=firestore().collection("auctions")
    const pdb=firestore().collection("products")
     unsubP= adb.onSnapshot((doc)=>{
      
      if(doc){
      doc.forEach((e,i,a)=>{
        let d=e.data()
        let aid=e.id;

        if(d.active=="no"){

           
          var ed = moment(new Date(d.date),"DD/MM/YYYY");
          let cd =  compare(ed)
 
          if(cd == "Greater")
          {
            adb.doc(aid).update({
             active:"end"
            })
          }

          if(cd == "Equal")
          {
            var ct= moment(new Date()).format('h:mm a')
            var currentTime = moment(ct, 'h:mm a');
            var st =  moment(d.st, 'h:mm a');

           
 
            if(currentTime.isAfter(st) || currentTime.isSame(st))
            {
              adb.doc(aid).update({
                active:"yes"
              }) 
              
             pdb.get().then((doc)=>{
              if(doc){
                doc.forEach((e,i,a)=>{
                  let d=e.data()
                  let paid=d.aid

                  if(paid==aid){
                    pdb.doc(e.id).update({active:"yes"})
                  }

                })
              }
             })
              
            }
         
          }
      

        }else if(d.active=="yes") {


           

          var ed = moment( new Date(d.date),"DD/MM/YYYY");
          let cd =  compare(ed)

         
          if(cd == "Greater")
          {
            adb.doc(aid).update({
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
              adb.doc(aid).update({
                active:"end"
              })      
            }
          }


        }

      })
      }

    })
  }

  const GlobaldynamicheckProductBids=()=>{
    // unsubPb= 
   
  const pdb=firestore().collection("products")

  pdb.get().then((doc)=>{
      
      if(doc){


      doc.forEach(async (e,iii)=>{


        let pid=e.id;
        let pd=e.data()
        let done=pd.done
        let vid=pd.uid
        let inc=pd.inc
        let aid=pd.aid
        let active=pd.active
        let block=pd.block
        let duration = pd.duration

        if(active=="yes"&& done==false && block==false){

        let st=""
        let dbb= await firestore().collection("auctions").doc(aid).get() 
       

          if (dbb.exists) {
            st=dbb.data().st
          }

          var startTime = moment(st, "hh:mm a");
          let cdd=moment(new Date()).format("hh:mm a")
          var ct = moment(cdd, "hh:mm a");
    
          var durationn = moment.duration(ct.diff(startTime));
          var minutes = parseInt(durationn.asMilliseconds());

          console.log("pid : ",pid)
          console.log("min : ",minutes)
          console.log("dur : ",duration)

          if((minutes>duration)||(Math.sign(minutes)==-1)){
            pdb.doc(pid).update({active:"end"})
          }
       
                
         firestore().collection("products").doc(pid).collection("bids").orderBy("createdAt","desc").get().then((d)=>{
          
          if(d.size>0){

            d.forEach( (ee,ii)=>{

              // console.log("ii loop wala: ",ii)

               if(ii==0){

               let bidid=ee.id
               let bd=ee.data()
               let bid=bd.bid
               let aid=bd.aid
               let lprice=bd.price
               let startingAmount=bd.sp
               let ab=bd.abo

      let cc =  bd.createdAt.toDate()//bcs firbase cnvrt into obj so again parse date
      var stime =  moment(cc).format('hh:mm:ss a')     //10:12 am 
      var sdate =  moment(cc).format("D MMMM Y");   //9 july 2021
      var startTime = moment(stime, "hh:mm:ss a");
     
 
      var cd =  new Date() //bcs firbase cnvrt into obj so again parse date
      var etime =  moment(cd).format('hh:mm:ss a')     //10:12 am 
      var edate =  moment(cd).format("D MMMM Y");   //9 july 2021
      var endTime = moment(etime, "hh:mm:ss a");
     

      
    if(sdate==edate){

      var duration = moment.duration(endTime.diff(startTime));
      var min = parseInt(duration.asMinutes());
   
      
      
      // console.log("ii ladst  k andr : ",ii)
      console.log("bd : ",ee.id)
      console.log("st ",stime);
      console.log("et ",etime);
      console.log("min ",min);
   

     let c= bd.from
     let cf= bd.from

      if(active=="yes"){

         
        pdb.doc(pid).collection("bids").get().then(async (d)=>{
         if(d.size>0){

           let aab=0

           d.forEach(async (e,ii,a)=>{
           let f=e.data()
           let ff=f.abo
           if(ff==""){
             ff=0
           }
            if(aab<ff){
              aab=f.abo
              bid=f.bid
            }
           })

           if(aab==0){
            ab=""
           }else{
             ab=aab
           }
          
         let lp= lprice

 
         if(min>1)
         {

           var  cas  =    moment(startTime).add(1, 'minutes').format('LTS');
                cas =     moment(cas, "hh:mm:ss a").toDate(); 
            let chk=false;
                
          for (let index= 0; index < min; index++) {
            
             console.log("for loop in : ")
            c = c=="bidder"?"vendor":"bidder"
            chk=false;
            
            if(c=="bidder"){
  
               
              if(ab!="" && cf=="vendor" && ab<lp){
                let  tb=null;
                let db= await firestore().collection("users").doc(bid).get() 
                  
                    if (db.exists) {
       
                       tb = db.data().tb
                 
                     }
      
                  if(tb>0 && lp<ab){
  
                     lp=parseInt(lp)+parseInt(inc)
                    const obj={
                      createdAt:cas,
                      aid:aid,
                      pid:pid,
                      bid:bid,
                      from:"bidder",
                      sp: parseInt(startingAmount), //also prdct same autobid
                      price: parseInt(lp),
                      abo:ab
                    }
                    
                    
                tb=tb-1
               firestore().collection("products").doc(pid).collection("bids").add(obj)
               firestore().collection("bd").add(obj)
               firestore().collection("users").doc(bid).update({tb:tb})
                 cas= moment(cas).add(1, 'minutes').format('LTS')
                 cas = moment(cas, "hh:mm:ss a");   
                 cf="bidder"  
                 chk=true
                     console.log("bider bid  min>1 1st wali")
                  }
                 
              }

              if(ab!="" && cf=="vendor" && ab>lp){
                let  tb=null;
                let db= await firestore().collection("users").doc(bid).get() 
                  
                    if (db.exists) {
       
                       tb = db.data().tb
                 
                     }
      
                  if(tb>0 && lp<ab){
 
 
 
                     lp=parseInt(lp)+parseInt(inc)
                    const obj={
                      createdAt:cas,
                      aid:aid,
                      pid:pid,
                      bid:bid,
                      from:"bidder",
                      sp: parseInt(startingAmount), //also prdct same autobid
                      price: parseInt(lp),
                      abo:ab
                    }
                    
                    
                tb=tb-1
               firestore().collection("products").doc(pid).collection("bids").add(obj)
               firestore().collection("bd").add(obj)
               firestore().collection("users").doc(bid).update({tb:tb})
                 cas= moment(cas).add(1, 'minutes').format('LTS')
                 cas = moment(cas, "hh:mm:ss a");
                 cf="bidder"   
                 chk=true    
                     console.log("bider bid  min>1 2nd wali")
                  }
               
              }
              
           
     
          }else if(c=="vendor"){
    
             

             if(lp<startingAmount && ab!="" && cf=="bidder"  ){
 
               lp=parseInt(lp)+parseInt(inc)
               const obj={
                 createdAt:cas,
                 aid:aid,
                 pid:pid,
                 bid:vid,
                 from:"vendor",
                 sp: parseInt(startingAmount), //also prdct same autobid
                 price: parseInt(lp), 
                 abo:""
               }
       
               firestore().collection("products").doc(pid).collection("bids").add(obj)
               firestore().collection("bd").add(obj)
               cas= moment(cas).add(1, 'minutes').format('LTS')
               cas = moment(cas, "hh:mm:ss a");     
               cf="vendor"  
               chk=true
               console.log("vndr bid min>1 1st wali")
             }
 

             if(lp<startingAmount && ab=="" && cf=="bidder"){
 
              lp=parseInt(lp)+parseInt(inc)
              const obj={
                createdAt:cas,
                aid:aid,
                pid:pid,
                bid:vid,
                from:"vendor",
                sp: parseInt(startingAmount), //also prdct same autobid
                price: parseInt(lp), 
                abo:""
              }
      
              firestore().collection("products").doc(pid).collection("bids").add(obj)
              firestore().collection("bd").add(obj)
              cas= moment(cas).add(1, 'minutes').format('LTS')
              cas = moment(cas, "hh:mm:ss a");     
              cf="vendor"  
              chk=true
              console.log("vndr bid min>1  2nd wali")
            }
           
            if(ab==""){
              break;
            }
  
         
          
          }
          
        
          if(chk==false){
            break;
          }
      

         }

         }else 
         if(min==1)
         {
          // for (let index= 0; index < min; index++) {
            
         
            c = c=="bidder"?"vendor":"bidder"
    
            if(c=="bidder"){
 
             if(cf=="vendor"){
 
               
              if(ab!==""){
                let  tb=null;
                let db= await firestore().collection("users").doc(bid).get() 
                  
                    if (db.exists) {
       
                       tb = db.data().tb
                 
                     }
      
                  if(tb>0 && lp<ab){
 
 
 
                     lp=parseInt(lp)+parseInt(inc)
                     const date=new Date()

                    const obj={
                      createdAt:date,
                      aid:aid,
                      pid:pid,
                      bid:bid,
                      from:"bidder",
                      sp: parseInt(startingAmount), //also prdct same autobid
                      price: parseInt(lp),
                      abo:ab
                    }
                    
                    
                tb=tb-1
               firestore().collection("products").doc(pid).collection("bids").add(obj)
               firestore().collection("bd").add(obj)
               firestore().collection("users").doc(bid).update({tb:tb})
                    
                     console.log("bider bid ")
                    //  return false
                  }
               
              }
              
            }
     
          }else if(c=="vendor"){
    
           if(cf=="bidder"){
            
             if(lp<startingAmount){
 
               lp=parseInt(lp)+parseInt(inc)
               const date=new Date()

               const obj={
                 createdAt:date,
                 aid:aid,
                 pid:pid,
                 bid:vid,
                 from:"vendor",
                 sp: parseInt(startingAmount), //also prdct same autobid
                 price: parseInt(lp), 
                 abo:""
               }
       
               firestore().collection("products").doc(pid).collection("bids").add(obj)
               firestore().collection("bd").add(obj)
       
             
     
               console.log("vndr bid ")
              
              //  if(ab==""){
              //   // break;
              //   return false;
              // }
            
            }
 
           
 
           }
          
          }
          
        
          
      

        //  }
  
        }       


      }
        })


    


      }

    

      

    }
      

              
              

  }

            })


          }

                                                        })
          
          
  }//actv yes end brckt

 

  if(active=="end" && done==false && block==false){

    firestore().collection("products").doc(pid).collection("bids").orderBy("createdAt","desc").get().then((d)=>{
          
      if(d.size>0){

        let c=false;
        d.forEach( (ee,ii)=>{
        

          if(ii==0){



            let bidid=ee.id
            let bd=ee.data()

            

            let bid=bd.bid
            let aid=bd.aid
            let pid=bd.pid
            let lprice= parseInt(bd.price)
            let startingAmount= parseInt(bd.sp)
            let ab=bd.abo
            let from=bd.from

      if(from=="bidder"){

        if(lprice>=startingAmount)
          {
            console.log("bd : ",bd)

            const obj={
              createdAt:new Date(),
              aid:aid,
              vid:vid,
              pid:pid,
              pi:false,
              fb:"",
              done:false,
              acpt:false,
              status:"",
              dlvr:false,
              bid:bid,
              price: lprice,
            }
            
            
        
       firestore().collection("Hb").add(obj).then(

        firestore().collection("products").doc(pid).update({done:true})

       )
       c=false;
       return false;
          }
                      }  
      if(from=="vendor"){
        c=true;
      } 

                 }

         if(c==true){
         
          if(ii==1){
            let bidid=ee.id
            let bd=ee.data()
            let bid=bd.bid
            let aid=bd.aid
            
            let pid=bd.pid
            let lprice= parseInt(bd.price)
            let startingAmount=parseInt(bd.sp)
            let ab=bd.abo
            let from=bd.from

            if(from=="bidder"){

              if(lprice>=startingAmount)
                {
                  
      
                  const obj={
                    createdAt:new Date(),
                    aid:aid,
                    pi:false,
                    acpt:false,
                    status:"",
                    dlvr:false,
                    fb:"",
                    done:false,
                    pid:pid,
                    vid:vid,
                    bid:bid,
                    price: lprice,
                  }
                  
                  
              
             firestore().collection("Hb").add(obj).then(
              firestore().collection("products").doc(pid).update({done:true})
             )
              
             return false;
                }
                            } 


          }

         }        
    
                   })
                   
        }
    
    })



 
  }


      })

      

    } 
})

}

const Globalrm1=()=>{
   const db2=firestore().collection("products") 
  db2.get().then((doc)=>{
if(doc.size>0){

doc.forEach((e,i)=>{
let ppid=e.id;

    db2.doc(ppid).collection("bids").get().then((data)=>{
        if(data.size>0){

         data.forEach((ee,ii)=>{

           let bidid=ee.id
           let bd=ee.data()

           let bid=bd.bid
           let aid=bd.aid
           let pid=bd.pid
           let price=parseInt(bd.price)
           let sp=bd.sp
           let abo=bd.abo
           let from=bd.from
           let createdAt=bd.createdAt.toDate()
           var time =  moment(createdAt).format('hh:mm:ss a')     //10:12 am 

           var  t =  moment(createdAt).format('hh:mm a')   
           var date =  moment(createdAt).format("D MMMM Y");   //9 july 2021
           let   cc= date + " at  "+t
          
           var beginningTime = moment(time, 'hh:mm:ss a');
     
           
           let c=0
           let did=""

data.forEach((eee,iii)=>{
let d=eee.data()
let bidid2=eee.id

let createdAt=d.createdAt.toDate()
var time =  moment(createdAt).format('hh:mm:ss a')     //10:12 am 
var  t =  moment(createdAt).format('hh:mm a')  
var date =  moment(createdAt).format("D MMMM Y");   //9 july 2021
let   ccc= date + " at  "+t
var endTime = moment(time, 'hh:mm:ss a');

if(  bid==d.bid && aid==d.aid && pid==d.pid & price==parseInt(d.price) && sp==d.sp && abo==d.abo && from==d.from && cc==ccc    )   
            {
              c++;
              if(beginningTime.isAfter(endTime)){
                // console.log("b a e : ","yes")
                did=bidid
              }else if(beginningTime.isBefore(endTime)){
                // console.log("b b e : ","yes")
                did=bidid2
              }
              else if(beginningTime.isSame(endTime)){
                // console.log("b s e : ","yes")
                did=bidid2
              } 
            } 

           })



           if(c>1){
              console.log("same bid id in prdct dlt ye krne >>> ",did)
             
               db2.doc(ppid).collection("bids").doc(did).delete();
               return false; 
           }


         })

        }
})



})
}
}) 


const db3=firestore().collection("bd")
db3.get().then((doc)=>{
if(doc.size>0){

  doc.forEach((ee,i)=>{
     
  let bidid=ee.id
  let bd=ee.data()


  let bid=bd.bid
  let aid=bd.aid
  let pid=bd.pid
  let price= parseInt(bd.price)
  let sp=bd.sp
  let abo=bd.abo
  let from=bd.from
  let createdAt=bd.createdAt.toDate()
  var time =  moment(createdAt).format('hh:mm:ss a')     //10:12 am 
  var  t =  moment(createdAt).format('hh:mm a')  
  var date =  moment(createdAt).format("D MMMM Y");   //9 july 2021
  let   cc= date + " at  "+t 
  var beginningTime = moment(time, 'hh:mm:ss a');


    let c=0
    let did=""

 doc.forEach((eee,iii)=>{
 let d=eee.data()
 let bidid2=eee.id

 let createdAt=d.createdAt.toDate()
var time =  moment(createdAt).format('hh:mm:ss a')     //10:12 am 
var  t =  moment(createdAt).format('hh:mm a')  
var date =  moment(createdAt).format("D MMMM Y");   //9 july 2021
let   ccc= date + " at  "+t 
var endTime = moment(time, 'hh:mm:ss a');

 if( bid==d.bid && aid==d.aid && pid==d.pid & price==parseInt(d.price) && sp==d.sp && abo==d.abo && from==d.from && cc==ccc     )   
               {
                 c++;
                 if(beginningTime.isAfter(endTime)){
                  did=bidid
                }else if(beginningTime.isBefore(endTime)){
                  did=bidid2
                } else if(beginningTime.isSame(endTime)){
                  did=bidid2
                } 
               } 

              })


              // console.log("c :",c)

              if(c>1){
                console.log("same bid id in bd dlt ye krne  >>> ",did)
                db3.doc(did).delete();
                return false; 
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
     
    let  interval  = setInterval(  () =>
     {
    GlobaldynamicheckProduct();
    Globalrm1()
    },6000); 
    let  intervall  = setInterval(  () => {GlobaldynamicheckProductBids()},8000); 
    const db=firestore().collection("users").doc(userData.user.uid)
   
    const usu = firestore().collection("auctions").onSnapshot(async  (d)=>{
      
      if(d){

       d.docs.map((d)=>{
         
        let item=d.data();

        if(item.active=="yes"){

 
          var  s=item.st;
          var  e=item.et;
           let aid=d.id
    
          
          var startTime = moment(s, "hh:mm a");
          var endTime = moment(e, "hh:mm a");
  
          
        
          var duration = moment.duration(endTime.diff(startTime));
          var minutes = parseInt(duration.asMilliseconds());

         
         
       
    let i=0;
    let arr=[]
    
      firestore().collection("products").orderBy('createdAt', 'asc').get().then(async  (d)=>{
    
           if(d){
            d.docs.map((data)=>{
              
              const id=data.id; //pid  
              const u=data.data();
     
         

              if(u.aid==aid){       
                i++;
                arr.push({id:id})
         
    
              }
              
            })
           
        
            let dfc= minutes/i

            
    
            if(arr.length>0){
              arr.map((e,ii,a)=>{
   
               
        let db=firestore().collection("products").doc(e.id)
        
           
              let d= dfc*(ii+1)
        
             db.update({
                duration:d
              })
            
           
              
        
        
              })
            }
   
          } 
     
           
        })
   
      
      
       
     
    
          }

         
       })
      
     } 

    
      
   })
   
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
             
              dispatch(allActions.u_action.logOut()),
              )
              .catch(error=>{ 
              //  allOther.AlertMessage("",error.message)
           
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
                      } else{
                        data=[]
                      } 
       });

             unsubb();

              dispatch(allActions.u_action.setUser(data))
            
           

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
        setsetAllVendorsData(true)
        setsetAllBiddersData(true)
        setsetbdData(true)
   }

   if(userData.user.type=="admin"){
     
      setsetAuctionData(true)
      setsetAllVendorsData(true)
      setsetAllBiddersData(true)
      setsetAllProductsData(true)
      setsetAllrbData(true)
      setsetbdData(true)
}

if(userData.user.type=="bidder"){
  setsetAllProductsData(true)
  setsetAuctionData(true)
  setsetAllrbData(true)
  setsetbdData(true)
  setsetAllVendorsData(true)
  setsetAllBiddersData(true)
}

return () => {
  // Anything in here is fired on component unmount.
   clearInterval(interval)
   clearInterval(intervall)
   unsub();
   usu();
  //  ubd();
  //  usuu();
  //  if(usuuu!=null){
  //   usuuu();
  //  }
   if(unsubP!=null){
    unsubP();
   }
  //  if(unsubPb!=null){
  //   unsubPb();
  //  }
  //  if(unsubPb2!=null){
  //   unsubPb2();
  //  }
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
 {setbdData && <allOther.firebase.FireBaseFunction type={"set-product-bidders-data"}  /> }   
 {setAllProductstData && <allOther.firebase.FireBaseFunction type={"set-all-products-data"}   /> } 
 
<Text style={{fontSize:30,color:"silver",alignSelf:"center"}}>Welcome</Text>
<Text style={{fontSize:40,color:"#666666",alignSelf:"center"}}>{userData.user.name}</Text>
 

</View>   
)
     }
 
      
  