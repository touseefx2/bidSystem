import React  from 'react';
import { StyleSheet,ScrollView,AppState,Text,View} from "react-native";
import firestore from '@react-native-firebase/firestore';
import moment from "moment";
import  allOther from "../other/allOther"
import { Container,Content } from 'native-base';

 export default function History(props)  { 
 
   
return(
        <Container>
     
       <Content> 
      <Text>History</Text>
      </Content>
      
       </Container>
)
 

  };

const styles= StyleSheet.create({

  container:
  {
    flex:1,
  }
});



 