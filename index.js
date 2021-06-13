/**
 * @format
 */
import 'react-native-gesture-handler';
import React   from "react";
import {AppRegistry,LogBox,StatusBar} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { Provider} from 'react-redux'
import {store} from "./component/redux/index"

LogBox.ignoreAllLogs(true);
StatusBar.setBackgroundColor("black");

function MainApp() {
    
  return(
           <Provider store={store}>
                <App/>
            </Provider>
            )
  }
    

AppRegistry.registerComponent(appName, () => MainApp);
