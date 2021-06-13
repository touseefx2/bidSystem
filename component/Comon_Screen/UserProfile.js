import React, { Component } from 'react';
import { StyleSheet,Text,View,Image,TouchableOpacity,ToastAndroid} from 'react-native';
import { Item, Input, Form ,Spinner,Container,Content,Label } from 'native-base';
import auth from '@react-native-firebase/auth';
import FontAwesome from 'react-native-vector-icons/FontAwesome'; //icon
import { Button } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import ImagePicker from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import {connect} from "react-redux"
import RNFetchBlob from 'rn-fetch-blob'
import Dialog, { DialogContent,DialogFooter,DialogButton,FadeAnimation,DialogTitle} from 'react-native-popup-dialog';

class UserProfile extends Component {

  constructor(props)
  {
    super(props);
    this.state = {
    name:"",
    email:"",
    phone:""
 }
}
 

componentDidMount(){

  const {myuser} = this.props;
  this.setState({
    name:myuser.userReducer.name,
    email:myuser.userReducer.email,
    phone:myuser.userReducer.phone,
  })

}


 
renderprofile()
{ 

  const {myuser} = this.props

return(
  <View>

  <View style={{flexDirection:"row",alignItems:"center",backgroundColor:"#307ecc"}} > 

<View style={{margin:5,padding:5}}>
  
<Image style={styles.avatar} source={{uri:myuser.user.photo}}/>
<TouchableOpacity   style={{backgroundColor:"#bfbfbf",width:35,height:35,alignItems:"center",alignSelf:"center",borderRadius:17.5,borderColor:"white",borderWidth:2,marginTop:-35,marginLeft:110,justifyContent:"center"}}>
<FontAwesome name="camera" size={23}  color="#363636"  />
</TouchableOpacity>
</View>
<View style={{flexShrink:1,marginRight:3,marginLeft:6}}>
      {myuser.user.name.length >30 ?
         (
         <Text   style={styles.name}>{`${ myuser.user.name.substring(0, 30)}..`}</Text>
         ) :
         <Text style={styles.name}>{myuser.user.name}</Text>
  }
      </View>
</View>

 

  {/* <Form style={{margin:15,padding:15}}>

            <Item floatingLabel style={{borderColor:"black"}}>
              <Label>User Name</Label>
              <Input value={this.props.myuser.username} style={{textTransform: 'capitalize',}} 
              multiline={true}
              numberOfLines={1}
              underlineColorAndroid='transparent'  
             editable={false} />
            </Item>

            <Item floatingLabel style={{borderColor:"black"}}>
              <Label>Phone</Label>
              <Input style={{textTransform:"capitalize"}}  editable={false} value={this.props.myuser.phone} />
            </Item>

            

            <Item floatingLabel style={{borderColor:"black"}}>
              <Label>Tele-Phone</Label>
              <Input style={{textTransform:"capitalize"}}  editable={false} value={this.props.myuser.ptcl_phone} />
            </Item>

            <Item floatingLabel style={{borderColor:"black"}}>
              <Label>E-mail</Label>
              <Input  value={this.props.myuser.email}
              multiline={true}
              numberOfLines={1}
              underlineColorAndroid='transparent'  
             editable={false} />
            </Item>
            
            <Item floatingLabel style={{borderColor:"black"}}>
              <Label>Payment Method</Label>
              <Input style={{textTransform:"capitalize"}}  editable={false} value={this.props.myuser.payment} />
            </Item>


   <Item floatingLabel style={{borderColor:"black"}}>
              <Label>Cnic</Label>
              <Input style={{textTransform:"capitalize"}} editable={false} value={this.props.myuser.cnic} />
            </Item>

            <Item floatingLabel style={{borderColor:"black"}}>
              <Label>Country</Label>
              <Input style={{textTransform:"capitalize"}} editable={false} value={this.props.myuser.address.country} />
            </Item>

         

            <Item floatingLabel style={{borderColor:"black"}}>
              <Label>City</Label>
              <Input style={{textTransform:"capitalize"}} editable={false} value={this.props.myuser.address.city} />
            </Item>

            <Item floatingLabel style={{borderColor:"black"}}>
              <Label>Address</Label>
              <Input 
                                multiline={true}
                                style={{textTransform:"capitalize"}}
                                numberOfLines={1}
                                 editable={false} value={this.props.myuser.address.address} />
            </Item>

            
          </Form> */}

</View>

)
}

  render() {
    return (
      <Container >
      <Content>
         {this.renderprofile()}
         </Content>
    </Container>

  
    );
  }

}


const styles = StyleSheet.create({
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 66,
    borderWidth: 2,
    borderColor:"white",
  },
  name:{
    color: "white",
    fontWeight:"bold",
    fontSize:20,
    textTransform: 'capitalize',
  },
inputitem:{
  fontSize:16,
  color:"black"
},
  Item:{
marginTop:10,
  },
  buttonContainer: {
    marginTop:10,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
    backgroundColor: "#00BFFF",
  },
});
 

const mapStateToProps = state => ({
  myuser: state.userReducer
});

export default connect(
  mapStateToProps,
null
)(UserProfile);