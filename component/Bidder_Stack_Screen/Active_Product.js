// import React  from 'react';
// import { StyleSheet,ScrollView,AppState,Text,View} from "react-native";
// import firestore from '@react-native-firebase/firestore';
// import auth from '@react-native-firebase/auth';
// import moment from "moment";
// import  allOther from "../other/allOther"
// import { Container,Content } from 'native-base';
// import AppointmentCard from "./AppointmentCard";
// import {Spinner } from 'native-base';
// import RNFetchBlob from 'rn-fetch-blob'
// import { Searchbar} from 'react-native-paper';
// import RNFS from 'react-native-fs';

// export default class  Active_Product extends React.Component  { 

//     constructor(props) {
//     super(props);
//     this.state = {
//       appState: AppState.currentState,
//       search:"",
//       load:true,
//       empty:false,
//       loader:true,
//     }
//   }

//   handleAppStateChange = (nextAppState) => {
 
//     this.setState({ appState: nextAppState });
  
//     if (nextAppState === 'background') {
//       // Do something here on app background.
//       console.log("App is in Background Mode. actvappmnt")
//     }
  
//     if (nextAppState === 'active') {
      
//       // Do something here on app active foreground mode.
//       console.log("App is in Active Foreground Mode. actvappmnt")
//     }
  
//     if (nextAppState === 'inactive') {
//       // Do something here on app inactive mode.
//       console.log("App is in inactive Mode. actvappmnt")
//     }
//   };
 
//   componentDidMount(){
//     AppState.addEventListener('change', this.handleAppStateChange);
//     setTimeout(() => {
//         this.setState({loader:false})
//     }, 600);
//     // this.timerInterval = setInterval(() => {},10000)
// }

// componentWillUnmount()
// {
//   AppState.removeEventListener('change', this.handleAppStateChange);
//   if(this.unsubscribe) {
//     this.unsubscribe();
//     }
  
//     // if(this.timerInterval) {
//     // clearInterval(this.timerInterval);
//     // }
// }

// // rendercheckProduct()
// // {
// //   const {empty} = this.state;
// //   return( 
// //       <View>
// //       {empty 
// //         ? ( <Text style={{fontSize:25,color:"silver",marginTop:"40%",textAlign:"center"}}>No Record Found</Text>) 
// //         :   <Searchbar placeholder="Search  Product by Name"   onChangeText={t=>this.setState({search:t})} value={this.state.search} placeholderTextColor="silver" style={{elevation:4,marginTop:1,height:40}}   />  }

// //       </View>
// //   )
// // }

//     Render_ActiveProducts  = (productsData) => { 
    
//   let product  =   productsData.products.map((item,index)=>{
   
//     let status = item.data.status || ""

//     if(status=="active"){

//         let name = item.data.name || ""
//         let category = item.data.category || ""
//         let starting_Amount = item.data.startingAmount || ""
//         let auction = item.data.auction || ""
//         let id=item.id || ""
//         name  =   allOther.strLength(name,"name")
        


//   return (
//     <View style={styles.card}>
 
//  <TouchableOpacity style={{marginTop:10}}
//     // onPress={()=>{props.navigation.navigate("Product_Detail",{index:index,item:item})}} 
// >
 
 
  
//  <View style={{flexDirection:"row",alignItems:"center",flexShrink:1,marginTop:10}}>
//  <allOther.vectorIcon.AntDesign size={20} color="#307ecc" name="rightcircle" />
//  <View style={{flexShrink:1}}>
//  <Text style={{color:"#307ecc",fontWeight:"bold",textTransform:"capitalize",fontSize:15,marginLeft:10}}>{name}</Text>    
//  </View>
//  </View>
 
//  <View style={{marginLeft:30,marginTop:10}}> 
//       <Text style={{color:"black",textTransform:"capitalize",fontSize:14}}>{starting_Amount}</Text> 
//       <Text style={{color:"black",textTransform:"capitalize",fontSize:14,marginTop:10}}>{category}</Text> 
//       {/* <Text style={{color:"black",textTransform:"capitalize",fontSize:14,marginTop:10}}>{auction} (auction)</Text>  */}
      
      
//  <View style={{flexDirection:"row",alignItems:"center",marginTop:10}}>
//  <Text style={{color:"#307ecc",textTransform:"capitalize",fontSize:15}}>status</Text>  
//  <Text style={{color:"orange",textTransform:"capitalize",fontSize:15,position:"absolute",right:0}}>{status}</Text>   
//  </View>
 
//  </View>
 
//    </TouchableOpacity>
   
 
 
 
   
//  </View>  
   
//          )

//     }




//   })

// return  product;

//  }
  

// render(){ 
//   const {load,search} = this.state;
//   const {productsData}=  this.props;
  
// return(
//         <Container>
//       {/* {load ? ( <Spinner style={{marginTop:"40%",alignSelf:"center"}} size="large" color="#307ecc"/>) : this.rendercheckProduct()} */}
//        <Content> 
//       <ScrollView> 
//         <View style={{marginTop:20,marginBottom:15}}>

//         {productsData.products.length<=0   && !loader   
//               ?(
//               <Text style={{fontSize:38,color:"silver",marginTop:"60%",alignSelf:"center"}} >Empty</Text>
//               )
//              :(
        
//             render_ActiveProducts(productsData)
//               ) 

//             }

//         </View>
//       </ScrollView> 
//       </Content>
//        </Container>
// )
//      }

//   };

// const styles= StyleSheet.create({

//   container:
//   {
//     flex:1,
//   }
// });



// const  mapStateToProps = (state) => 
// {
//   return{
//  productsData:state.productReducer,
//         }
// }

 

// export default connect(mapStateToProps,null)(Active_Product);