import React, { Component } from "react";
import { View,TouchableOpacity,Text,Dimensions,TextInput,Image} from "react-native";
import { connect} from 'react-redux'
import allOther from "../other/allOther"
import ImagePicker from 'react-native-image-picker';
import { ScrollView } from 'react-native-gesture-handler';
import Dialog, { DialogContent,DialogFooter,DialogButton,SlideAnimation,DialogTitle} from 'react-native-popup-dialog';
import {productCategory} from "./Category"
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import { Container,Content} from 'native-base'
import DropDownPicker from 'react-native-dropdown-picker';
import permissions from "../permissions/permissions"

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

 class  Add_Products extends Component  {
  
      constructor(props) {
            super(props);
            this.state =
            {
            loader:false,
            dialogVisible:false,
            dialogClick:false,

            photo:"",
            photoName:"",
            category:"",
            name:"",
            description:"",
            staringAmount:"",
            status:"pending"
            }
            this.items=null;
     
          }

          componentDidMount(){
                this.addItemCategory() 
               
          }

          addItemCategory(){
                if(productCategory){
                    this.items=productCategory.map((e,i,a)=>{
                  return {label: e.c.toUpperCase(), value: e.c.toLowerCase()};
                });  
                }else{
                      this.items=null
                }
            
          }

 uploadImage_android = async () =>
{
 
   permissions.requestWriteInternalStorage()

  let options = {
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

  
  ImagePicker.launchImageLibrary(options ,async (response) => {
    console.log("response : => ",response)
    if (response.didCancel) {
      allOther.ToastAndroid.ToastAndroid_SB("Cancel")
    } else if (response.error) {
      allOther.ToastAndroid.ToastAndroid_SB(response.error.toString())
      console.log('ImagePicker Error: ', response.error);
    } else{
      const URI =   response.uri ;
      const s   =  response.fileName ;   
      this.setState({photo:URI,photoName:s});
    }
  });
}

clearfields(){
    this.setState(
      {
            dialogVisible:false,
            photo:"",
            photoName:"",
            category:"",
            name:"",
            description:"",
            staringAmount:"",
      }
    ) 
}

checkEmptyFields () 
{
  const {name,photo,photoName,category,staringAmount,description}= this.state;

    if(name=="" || staringAmount=="" || description==""  || category=="" || photo=="" || photoName=="" ){
      return false;
    } else{
      return true;
    }
}
 

async onClickAdd(){
 this.setState({loader:true});
 const {userData}= this.props;  
 const {name,photo,photoName,category,staringAmount,description,status}= this.state;

 const obj={
name,
photo,
photoName,
category,
staringAmount,
description,
uid:userData.user.uid,
status
 }

 try {
  let resp =  await allOther.firebase.__Add_Product(obj)
 
 if(resp){
   allOther.ToastAndroid.ToastAndroid_SB("Product Add Successful")
   this.setState({loader:false,dialogVisible:false})
  }else{
    this.setState({loader:false})
  }

 } catch (error) {
  this.setState({loader:false})
  console.log("addprdct error try cath ==> ",error)
 }

 
}
               

      render_Add_Product()
      {
        const {loader,dialogVisible ,photo} = this.state;
        const check =  this.checkEmptyFields();
        let ButtonEnable=false
        if(check) 
        ButtonEnable=true 
        
        return(
        <Dialog
          visible={dialogVisible}
          hasOverlay={true}
          overlayOpacity={0.8}
          
          dialogTitle={<DialogTitle style={{backgroundColor:"#307ecc"}} textStyle={{color:"white"}}  title="New Products" />}s
          footer={
            <DialogFooter style={{backgroundColor:"#307ecc"}}>
              <DialogButton
              style={{backgroundColor:!ButtonEnable ? "#307ecc" : "white"}}
                text="Cancel"
                textStyle={{color:!ButtonEnable ? "white" : "black"}}
                onPress={() => {this.clearfields()}}
              />
              <DialogButton
               disabled={!ButtonEnable}
                text="Add"
              textStyle={{color:!ButtonEnable ? "silver":"white"}}
                style={{backgroundColor:!ButtonEnable ?"white":"#307ecc"}}
                onPress={() => { ButtonEnable? this.onClickAdd():null}}
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

          <DialogContent style={{width:windowWidth-50,alignItems:"center",justifyContent:"center"}}>

        <View style={{padding:5,marginTop:15,alignSelf:"center"}}>
     
     
      <DropDownPicker
         items={this.items !=null ?  this.items : ""} 
         placeholder="Select Category"
         placeholderStyle={{ textAlign: 'center'}}
         containerStyle={{width: 200, height:50,alignSelf:"center"}}
         style={{backgroundColor: '#fafafa',paddingVertical:10,borderColor:"black",borderWidth:0.4}}
         dropDownStyle={{backgroundColor: '#fafafa'}}
         onChangeItem={item => 
          this.setState({
          category: item.value
        })
        }
    /> 
       
    
    <TextInput  style={{ backgroundColor:"white",width:230,height:45,fontSize:16,marginTop:17,borderColor:"black",borderWidth:0.4}}  
          onChangeText={text=> this.setState({name :text })}
          placeholder={"Name"} 
    />

<TextInput  style={{ backgroundColor:"white",width:230,height:45,fontSize:16,marginTop:17,borderColor:"black",borderWidth:0.4 }}  
         keyboardType={"numeric"}
         onChangeText={text=> this.setState({staringAmount :text })}
          placeholder={"Start Bidding Amount"} 
    />
    

    <TextInput  style={{ backgroundColor:"white",width:230,height:70,fontSize:16,marginTop:17,borderColor:"black",borderWidth:0.4 }}  
          onChangeText={text=> this.setState({description :text })}
          placeholder={"Description"} 
          multiline={true}
          numberOfLines={2}
          scrollEnabled={true}
    />

  
       </View>

    {photo=="" 
    ? (
      <TouchableOpacity 
      onPress={()=>{this.uploadImage_android()}}
      style={{marginTop:35,alignItems:"center",flexDirection:"row",alignSelf:"center"}} >
      <Text style={{fontSize:15}}>Add Photo</Text>
      <MaterialCommunityIcons style={{marginLeft:10}}  size={30} color="#307ecc" name="image-plus" />
      </TouchableOpacity>
    ) 
    :(
    <View  style={{marginTop:30,alignSelf:"center"}} >
      <TouchableOpacity style={{marginLeft:"50%"}} onPress={()=>this.setState({photo:"",photoName:""})}>
     <Entypo size={33} color="red" name="cross" />
     </TouchableOpacity>
     <Image source={{uri:photo}} resizeMode={"contain"} style={{width:200,height:150}} />
    </View> 
    ) 
    }
 
          </DialogContent>
        </Dialog>
      
        )
      
      }

    
      renderTopBar(){

        return(
       
      <TouchableOpacity onPress={()=>{this.setState({dialogVisible:true,dialogClick:true})}}
      style={{backgroundColor:"#307ecc",borderBottomEndRadius:40,borderBottomLeftRadius:40,height:65, marginTop:10,width:"90%",alignSelf:"center",alignItems:"center",justifyContent:"center"}}
      >

   <View   style={{backgroundColor:"#307ecc",borderBottomEndRadius:40,borderBottomLeftRadius:40,alignItems:"center",flexDirection:"row",height:50,justifyContent:"center",width:"90%",alignSelf:"center",borderColor:"white",borderWidth:2.5}}>  
<Text style={{color:"white",fontSize:18,fontWeight:"bold"}}>Add New Product</Text>
<MaterialIcons style={{marginLeft:10}}  size={30} color="white" name="add-circle-outline" />
    </View>

    </TouchableOpacity>

                  
    
        )
      }
 
    
render(){
 const {dialogClick}= this.state;
 const {productsData}= this.props;  

 
 console.log("productsData : ",productsData)

return(
      <Container style={{backgroundColor:"white"}}>   
      {this.renderTopBar()}
      <Content style={{backgroundColor:"white"}}>
              <ScrollView>
              {dialogClick && this.render_Add_Product()}            
              </ScrollView>
      </Content>
           </Container>
)
     }

  }
 
  const mapStateToProps = state => ({
      userData: state.userReducer,
      productsData: state.productReducer,
    });
  
    export default connect(
      mapStateToProps,
   null
    )(Add_Products);
 