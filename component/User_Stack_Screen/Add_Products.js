import React, { Component } from "react";
import { View,TouchableOpacity,Text,Dimensions,TextInput,Image,FlatList,Alert} from "react-native";
import { connect} from 'react-redux'
import allOther from "../other/allOther"
import ImagePicker from 'react-native-image-picker';
import { ScrollView } from 'react-native-gesture-handler';
import Dialog, { DialogContent,DialogFooter,DialogButton,SlideAnimation,DialogTitle} from 'react-native-popup-dialog';
import {productCategory} from "./Category"
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { Container,Content,Item, Input, Label,Textarea } from 'native-base'
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
            startingAmount:"",
            status:"pending",
            flastlistR:false,
            setProductData:false
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
  
  removeProducts=(index)=>{
 
  
  Alert.alert(
    "",
    "Are you sure ?  you want to Cancel ?",
    [
      {
        text: "No",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
      },
      { text: "Yes", onPress: () => {alert("cancel")}
      }
    ]
  );
  
  
  }

async onClickAdd(){
 this.setState({loader:true});
 const {userData}= this.props;  
 const {name,photo,photoName,category,startingAmount,description,status}= this.state;

 const obj={
name,
photo,
photoName,
category,
startingAmount,
description,
uid:userData.user.uid,
status
 }

 try {
  let resp =  await allOther.firebase.__Add_Product(obj)
 
 if(resp){
   allOther.ToastAndroid.ToastAndroid_SB("Product Add Successful")
   this.setState({setProductData:true,loader:false,dialogVisible:false})
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
         onChangeText={text=> this.setState({startingAmount :text })}
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
     <Image source={{uri:photo}} resizeMode={"contain"} style={{width:200,height:170}} />
    </View> 
    ) 
    }
 
          </DialogContent>
        </Dialog>
      
        )
      
      }

    
      renderTopBar(){

        return(
       
      <TouchableOpacity onPress={()=>{this.setState({setProductData:false,dialogVisible:true,dialogClick:true})}}
      style={{backgroundColor:"#307ecc" ,height:50, marginTop:10,width:"90%",alignSelf:"center",alignItems:"center",justifyContent:"center"}}
      >

   <View   style={{backgroundColor:"#307ecc",alignItems:"center",flexDirection:"row",height:40,justifyContent:"center",width:"90%",alignSelf:"center",borderColor:"white",borderWidth:1.5}}>  
<Text style={{color:"white",fontSize:18,fontWeight:"bold"}}>Add New Product</Text>
<MaterialIcons style={{marginLeft:10}}  size={30} color="white" name="add-circle-outline" />
    </View>

    </TouchableOpacity>

                  
    
        )
      }

      RenderProducts  =   ({ item, index })  => {
         
        let name = item.name
        let category = item.category
        let starting_Amount = item.startingAmount
        let photo ={uri:item.photo}
        let description=item.description
        let status = item.status
    
          name  =   allOther.strLength(name,"product_name")
          category  =   allOther.strLength(category,"category")
          starting_Amount =   allOther.strLength(starting_Amount,"starting_amount")
       
 
        return (

          <View style={{marginTop:20}}>



<View style={{width:windowWidth-50, backgroundColor:"white",height:140, borderRadius:7,marginTop:30,elevation:10,margin:10,padding:10 }}>



<TouchableOpacity 
style={{position:"absolute",right:0,marginRight:5}}
onPress={()=>{this.removeProducts(index)}}>
<Entypo size={26} color="#db5a5a" name="cross" />
</TouchableOpacity>



<TouchableOpacity
          //  onPress={()=>{this.props.navigation.navigate("Edit Details",{index:index,rf:()=>this.rf()})}}
            style={{marginTop:7}}>
 
       

<View style={{flexDirection:"row",alignItems:"center"}}>
<AntDesign size={20} color="#307ecc" name="rightcircle" />
<View style={{flexShrink:1}}>
<Text style={{color:"#307ecc",fontWeight:"bold",textTransform:"capitalize",fontSize:15,marginLeft:10}}>{name}</Text>    
</View>
 </View>

          {/* <Image source={photo}    resizeMode={'contain'}
          style={{ height: 200 , width: 300}}/>
            */}
          <View style={{marginLeft:30,marginTop:10}}> 
          <Text style={{color:"black",textTransform:"capitalize",fontSize:14}}>{starting_Amount}</Text> 
          <Text style={{color:"black",textTransform:"capitalize",fontSize:14,marginTop:10}}>{category}</Text> 
          
          
 <View style={{flexDirection:"row",alignItems:"center",marginTop:10}}>
<Text style={{color:"#307ecc",textTransform:"capitalize",fontSize:15}}>status</Text>  
<Text style={{color:"orange",textTransform:"capitalize",fontSize:15,position:"absolute",right:0}}>{status}</Text>   
 </View>
          
          </View>



    
           
            </TouchableOpacity>
          


</View>

       
        
      

          </View>
)
       
        
      }
 
    
render(){
 const {dialogClick,flastlistR,setProductData}= this.state;
 const {productsData,userData}= this.props;  

 
 console.log("productsData : ",productsData)

return(
      <Container  style={{backgroundColor:"#f2f2f2"}}>   
      {setProductData  && <allOther.firebase.FireBaseFunction type={"set-products-data"} uid={userData.user.uid} /> } 
      {this.renderTopBar()}
      <Content  style={{backgroundColor:"#f2f2f2"}}>
              <ScrollView>
              {dialogClick && this.render_Add_Product()}   
           
              {productsData.products.length<=0     
              ?(
              <Text style={{fontSize:38,color:"silver",marginTop:"60%",alignSelf:"center"}} >Empty</Text>
              )
             :(
              <FlatList
        numColumns={1}
        data={productsData.products}
        extraData={flastlistR} //true/fasle
        renderItem={this.RenderProducts}
        ListFooterComponent={<View style={{ height:10}} />}
        keyExtractor={(item, index) => { return index.toString() }}
        showsVerticalScrollIndicator={false}
        style={{marginTop:"10%",alignSelf:"center"}}
      />
              ) 
            }       
              
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
 