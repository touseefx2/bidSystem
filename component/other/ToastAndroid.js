import {  ToastAndroid} from "react-native";

 
  const ToastAndroid_SB=(msg)=>{
    ToastAndroid.showWithGravity(
    msg,
     ToastAndroid.SHORT,
     ToastAndroid.BOTTOM)
     }

    const ToastAndroid_LB=(msg)=>{
        ToastAndroid.showWithGravity(
        msg,
         ToastAndroid.LONG,
         ToastAndroid.BOTTOM)
         }

      

         export default {
             ToastAndroid_SB,
             ToastAndroid_LB
         }

         