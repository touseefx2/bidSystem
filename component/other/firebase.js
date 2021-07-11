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

      const __Update= async (id,obj) => {
        try {    

          if(obj!="block"){
 
       let response =   firestore().collection("products").doc(id).update(obj);
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
      
      const __Remove_Item = async (id) => {
        try {    
       let response =   firestore().collection("products").doc(id).delete();
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

      if(type=="set-all-products-data"){
        SetProductsData(uid,"all")
      }
      

      if(type=="set-all-vendors-data"){
       SetAllVendorsData()
      }
   

    }, [])
  
  
  function SetUserData  (uid)  {
   
  try {
    const db=firestore().collection("users").doc(uid)
    const unsubscribe = db.onSnapshot(async  (doc)=>{
    let  data= []
    if(doc.exists){
     data = doc.data()
     }  

     const unsub =   auth().onAuthStateChanged( async (user)=> {
      if (user) {
       db.update({
          emailVerified:user.emailVerified
        })
                }  
 });

  
     dispatch(allActions.u_action.setUser(data))
     //unsubscribe()
     unsub();
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
       const unsubscribe = firestore().collection("products").onSnapshot(async  (d)=>{
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

        const unsubscribe = firestore().collection("products").onSnapshot(async  (d)=>{
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

  function LogOut()  {
    console.log("logout functn call")
    try {
      auth().signOut()
      .then(()=>
      console.log("Logout"),
      dispatch(allActions.u_action.logOut())
      )
      .catch(error=>{ allOther.AlertMessage("",error.message)});
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
    __Remove_Item,
    __Update,
 
  }

  export default firebase;



