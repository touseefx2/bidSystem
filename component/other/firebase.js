import auth from '@react-native-firebase/auth';
import allOther from "./allOther"
import  {useEffect} from 'react'
import { useDispatch, useSelector  } from 'react-redux'
import firestore from '@react-native-firebase/firestore';
import allActions from "../redux/allActions"

 
   const __doSingIn = async (email, password) => {
 
        try {
      let response = await auth().signInWithEmailAndPassword(email, password)
     
      
  
      if (response && response.user) {
       // AlertMessage.alert("Success ✅", "Authenticated successfully")
        return response;
      }
      
    } catch (error) {
          var errorMessage = error.message;
          var si  = errorMessage.indexOf("]")+1
          var  ei  = errorMessage.length -1
          const msg = errorMessage.substr(si,ei)
 
      allOther.AlertMessage("",msg)
      return false;
     
 
    }
    }

    const __doSingUp = async (email, password) => {
        try {
          let response = await  auth().createUserWithEmailAndPassword(email,password) 
         
          if (response) {
           // AlertMessage.alert("Success ✅", "Authenticated successfully")
            return response;
          }
          
        } catch (error) {
              var errorMessage = error.message;
              var si  = errorMessage.indexOf("]")+1
              var  ei  = errorMessage.length -1
              const msg = errorMessage.substr(si,ei)
              allOther.AlertMessage("",msg)
              return false;
         
        }
      }
 
      const __Add_Product = async (product) => {
        try {    
       let response =   firestore().collection("products").add(product)
          if (response) {
    
           // AlertMessage.alert("Success ✅", "Authenticated successfully")
            return response;
          }else{
            return false;
          }
          
        } catch (error) {
              var errorMessage = error.message;
              var si  = errorMessage.indexOf("]")+1
              var  ei  = errorMessage.length -1
              const msg = errorMessage.substr(si,ei)
              allOther.AlertMessage("",msg)
              return false;
         
        }
      }

      const __Add_BidReq = async (br) => {
        try {    
       let response =   firestore().collection("bidrequests").add(br)
          if (response) {
           // AlertMessage.alert("Success ✅", "Authenticated successfully")
            return response;
          }else{
            return false;
          }
          
        } catch (error) {
              var errorMessage = error.message;
              var si  = errorMessage.indexOf("]")+1
              var  ei  = errorMessage.length -1
              const msg = errorMessage.substr(si,ei)
              allOther.AlertMessage("",msg)
              return false;
         
        }
      }

      const __Add_Auction = async (auction) => {
        try {    
       let response =   firestore().collection("auctions").add(auction)
          if (response) {
    
           // AlertMessage.alert("Success ✅", "Authenticated successfully")
            return response;
          }else{
            return false;
          }
          
        } catch (error) {
              var errorMessage = error.message;
              var si  = errorMessage.indexOf("]")+1
              var  ei  = errorMessage.length -1
              const msg = errorMessage.substr(si,ei)
              allOther.AlertMessage("",msg)
              return false;
         
        }
      }

      const __Update= async (id,obj,typ) => {
        try {    

          if(obj!="block"){
 
    
       let response =   firestore().collection(typ).doc(id).update(obj);
          if (response) {
    
            return true;
          }else{
            return false;
          }
          




        }else{

          const obj=
          {
            block:true
          }


          let response =   firestore().collection("users").doc(id).update(obj);

 
          if (response) {

            if(typ=="vendor"){
               let bid=id;
            firestore().collection("products").get().then(async  (d)=>{ 
              if(d.docs){
               d.docs.map((data)=>{
                 const pid=data.id; //pid rndn
                 const uid=data.data().uid; //all prdcts data                
                 if(bid==uid)
                 {
                  firestore().collection("products").doc(pid).update(obj);
                 }                
               })
              }
            })
            }
 
            return true;
          }else{
            return false;
          }

        }

        } catch (error) {
              var errorMessage = error.message;
              var si  = errorMessage.indexOf("]")+1
              var  ei  = errorMessage.length -1
              const msg = errorMessage.substr(si,ei)
              allOther.AlertMessage("",msg)
              return false;
         
        }
      }

      const __UpdateBidReq= async (rid,obj) => {
        try {    

         
    
          let response =   firestore().collection("bidrequests").doc(rid).update(obj);
          if (response) {
            return true;
          }else{
            return false;
          }
    

        } catch (error) {
              var errorMessage = error.message;
              var si  = errorMessage.indexOf("]")+1
              var  ei  = errorMessage.length -1
              const msg = errorMessage.substr(si,ei)
              allOther.AlertMessage("",msg)
              return false;
         
        }
      }
      
      const __Remove_Item = async (id,t) => {
        try {    
       let response =   firestore().collection(t).doc(id).delete();
          if (response) {
           // AlertMessage.alert("Success ✅", "Authenticated successfully")
            return true;
          }else{
            return false;
          }
          
        } catch (error) {
              var errorMessage = error.message;
              var si  = errorMessage.indexOf("]")+1
              var  ei  = errorMessage.length -1
              const msg = errorMessage.substr(si,ei)
              allOther.AlertMessage("",msg)
              return false;
         
        }
      }
 
  export    function FireBaseFunction (props) {

    const dispatch = useDispatch()
 
   // const userData = useSelector(state => state.userReducer)
  
    useEffect(() => {
      let type=props.type || ""
      let uid=props.uid || ""
  

      if(type=="set-user-data"){
        SetUserData(uid)
      }

      if(type=="logout-user"){
        LogOut()
      }

      if(type=="set-products-data"){
        SetProductsData(uid,"specific")
      }

      if(type=="set-allrbdata"){
        SetallReqBidData()
      }

      if(type=="set-auctions-data"){
        SetAuctionsData();
      }

      if(type=="set-all-products-data"){
        SetProductsData(uid,"all")
      }
      

      if(type=="set-all-vendors-data"){
       SetAllVendorsData()
      }
   

      if(type=="set-all-bidders-data"){
        SetAllBiddersData()
       }

       if(type=="set-product-bidders-data"){
        SetbdData()
       }

  
    }, [])
  
 
  function SetUserData  (uid)  {
   
  try {
  
    const db=firestore().collection("users").doc(uid)
    const unsub =   auth().onAuthStateChanged( async (user)=> {
     
      if (user) {
        // console.log("Uuuuuu : ",user)
     await  db.update({
          emailVerified:user.emailVerified
        })
                }  
 });

   
     db.get().then(async  (doc)=>{
   
    let  data= []
    if(doc.exists){
      id=doc.id;
     data = doc.data()
     }  

     

       
     dispatch(allActions.u_action.setUser(data))
    //  unsub()
  
  })
 
} catch (error) {
        var errorMessage = error.message;
        var si  = errorMessage.indexOf("]")+1
        var  ei  = errorMessage.length -1
        const msg = errorMessage.substr(si,ei)
         allOther.AlertMessage("",msg)
  }
   
   
  }

  function SetProductsData  (uid,c)  {
    
    try {

      if(c=="specific")
      {
       const unsubscribe = firestore().collection("products").orderBy('createdAt', 'desc').onSnapshot(async  (d)=>{
       let arr=[]
       if(d){
        d.docs.map((data)=>{
          
          const id=data.id;
          const u=data.data();
          if(u.uid == uid)
          {
            const obj={id,data:u}
            arr.push(obj)
          }
        })
       
      } 
 
       dispatch(allActions.p_acton.setProducts(arr))
       //unsubscribe()
    })

      }else 
      if(c=="all")
      {

        const unsubscribe = firestore().collection("products").orderBy('createdAt', 'desc').onSnapshot(async  (d)=>{
          let arr=[]
          if(d){
           d.docs.map((data)=>{
             
             const id=data.id; //pid rndn
             const u=data.data(); //all prdcts data
             
               const obj={id,data:u}
               arr.push(obj)
             
           })
          
         } 
    
          dispatch(allActions.p_acton.setProducts(arr))
          //unsubscribe()
       })


      }
 
    
   
  } catch (error) {
          var errorMessage = error.message;
          var si  = errorMessage.indexOf("]")+1
          var  ei  = errorMessage.length -1
          const msg = errorMessage.substr(si,ei)
           allOther.AlertMessage("",msg)
    }
     
     
    }

    function SetAuctionsData  ()  {
  
      try {
   
        const unsubscribey = firestore().collection("auctions").orderBy('createdAt', 'desc').onSnapshot(async  (d)=>{
          let arr=[]
          if(d){
           d.docs.map((data)=>{
             
             const id=data.id; //pid rndn
             const u=data.data(); //all prdcts data
             
               const obj={id,data:u}
               arr.push(obj)
             
           })
          
         } 
    
          dispatch(allActions.a_action.setAuctions(arr))
          //unsubscribe()
       })
     
    } catch (error) {
            var errorMessage = error.message;
            var si  = errorMessage.indexOf("]")+1
            var  ei  = errorMessage.length -1
            const msg = errorMessage.substr(si,ei)
             allOther.AlertMessage("",msg)
      }
       
       
      }

      function SetallReqBidData  ()  {
  
        try {
     
          const db=firestore().collection("bidrequests").orderBy('updatedAt', 'desc')
          const unsub = db.onSnapshot(async (d)=>{
            let arr=[]
            if(d){
             d.docs.map((data)=>{
               
               const id=data.id; //pid rndn
               const u=data.data(); //all prdcts data
               
                 const obj={id,data:u}
                 arr.push(obj)
               
             })
            
           } 
      
            dispatch(allActions.rb_action.setrb(arr))
            //unsubscribe()
         })
       
      } catch (error) {
              var errorMessage = error.message;
              var si  = errorMessage.indexOf("]")+1
              var  ei  = errorMessage.length -1
              const msg = errorMessage.substr(si,ei)
               allOther.AlertMessage("",msg)
        }
         
         
        }

    function SetAllVendorsData  ()  {
  
      try {
   
        const unsubscribe = firestore().collection("users").where("type", '==', "vendor").onSnapshot(async  (d)=>{
         let arr=[]
         if(d){
          d.docs.map((dd)=>{
            
             const data=dd.data();
              arr.push(data)
             
          })
         
        } 
   
         dispatch(allActions.v_action.setVendors(arr))
         //unsubscribe()
      })
     
    } catch (error) {
            var errorMessage = error.message;
            var si  = errorMessage.indexOf("]")+1
            var  ei  = errorMessage.length -1
            const msg = errorMessage.substr(si,ei)
             allOther.AlertMessage("",msg)
      }
       
       
      }

      function SetAllBiddersData  ()  {
  
        try {
     
          const unsubscribe = firestore().collection("users").where("type", '==', "bidder").onSnapshot(async  (d)=>{
           let arr=[]
           if(d){
            d.docs.map((dd)=>{
              
               const data=dd.data();
                arr.push(data)
               
            })
           
          } 
     
           dispatch(allActions.b_action.setBidders(arr))
           //unsubscribe()
        })
       
      } catch (error) {
              var errorMessage = error.message;
              var si  = errorMessage.indexOf("]")+1
              var  ei  = errorMessage.length -1
              const msg = errorMessage.substr(si,ei)
               allOther.AlertMessage("",msg)
        }
         
         
        }

        function SetbdData  ()  {
  
          try {
 
              const unsubscribe = firestore().collection("products").orderBy("updatedAt","desc").onSnapshot(async  (d)=>{
                let arr=[]
                
                console.log("prdct snap" )
                
                if(d){
                 d.docs.map((data)=>{
                   
                   const pid=data.id; //pid rndn
                   let aa=[]
 

                   firestore().collection("products").doc(pid).collection("bids").orderBy("createdAt","desc").onSnapshot((doc)=>{
                    console.log("prdct bdr snap" )
                    
         
                    
                    if(doc.size>0){
       
                      doc.forEach((e,i,a)=>{
                       let d=e.data()
                        aa.push(d)
                        
                      })
                    
                    } 

                   })
                   
                   const obj={pid:pid,data:aa}
                   arr.push(obj)

                   
                 })
                
               } 
          
                dispatch(allActions.bd_action.setBd(arr))
                //unsubscribe()
             })
      
      
           
       
          
         
        } catch (error) {
                var errorMessage = error.message;
                var si  = errorMessage.indexOf("]")+1
                var  ei  = errorMessage.length -1
                const msg = errorMessage.substr(si,ei)
                 allOther.AlertMessage("",msg)
          }
           
           
          }

 async function LogOut()  {
    console.log("logout functn call")
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

  return null
  
  }

   
  const firebase={
    __doSingIn,
    __doSingUp,
    FireBaseFunction,
    __Add_Product ,
    __Add_Auction,
    __Add_BidReq,
    __Remove_Item,
    __Update,
    __UpdateBidReq
 
  }

  export default firebase;

 