import { PermissionsAndroid } from "react-native";

export const requestCameraPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: "Cool Photo App Camera Permission",
        message:
          "Cool Photo App needs access to your camera " +
          "so you can take awesome pictures.",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK"
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("You can use the camera");
    } else {
      console.log("Camera permission denied");
    }
  } catch (err) {
    console.warn(err);
  }
};

export const requestWriteInternalStorage = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: "Bid Sysytem App Write Storage Permission",
          message:
            "Bid Sysytem App needs access to your Storage " +
            "",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use Write Storage");
      } else {
        console.log("Write Storage permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };
  

 export const requestReadExternalStorage = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: "Bid Sysytem App read Storage Permission",
          message:
            "Bid Sysytem App needs access to your Storage " +
            "",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the read Storage");
      } else {
        console.log("read Storage Permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };
  


  export default{
      requestCameraPermission,
      requestReadExternalStorage,
      requestWriteInternalStorage
  }
