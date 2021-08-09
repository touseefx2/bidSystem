import React   from "react";
import { View,Modal,ActivityIndicator} from "react-native";

export function Loader (props){
return(
    <Modal
    animationType='fade'
    transparent={true}
    visible={props.loader}
    >

    <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', alignItems: 'center' }}>
  
    <ActivityIndicator
     size='large'
     color={"#307ecc"}
    />

    </View>

  </Modal>
)
}