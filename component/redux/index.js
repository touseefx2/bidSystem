//firebase and redux
 import {createStore,applyMiddleware,combineReducers} from 'redux'
 import thunk from 'redux-thunk'
 import {userReducer} from "./user/u_reducer"
import {productReducer} from "./products/p_reducer";
import {vendorReducer} from "./vendors/v_reducer";



  const rootReducer = combineReducers ({
        userReducer,
        productReducer,
        vendorReducer
  })

  export const store = createStore(rootReducer,applyMiddleware(thunk));