import React, { Component } from "react";
import { View} from "react-native";
 import allOther from "../other/allOther"
 

 export default class  logout extends Component  {
  
  constructor(props)
  {
  super(props);
  this.state=
  {
 logout:false,
 loader:false,
 
  }
}

componentDidMount(){
  

    this.logout() 
}

 
      logout(){
         this.setState({loader:true})
         setTimeout(() => {
            this.setState({logout:true,loader:false})
         }, (500));   
      }


render(){
const {logout,loader}= this.state
 
return(
<View >  
 
{logout && <allOther.firebase.FireBaseFunction type={"logout-user"}  />}   
<allOther.Loader loader={loader} />
   </View>
)
     }

  }

  