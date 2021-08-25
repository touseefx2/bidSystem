//firebase and redux
 import {createStore,applyMiddleware,combineReducers} from 'redux'
 import thunk from 'redux-thunk'
 import {userReducer} from "./user/u_reducer"
import {productReducer} from "./products/p_reducer";
import {vendorReducer} from "./vendors/v_reducer";
import {bidderReducer} from "./bidders/b_reducer";
import {bdReducer} from "./bid/bd_reducer";
import {auctionReducer} from "./auction/a_reducer";
import {rbReducer} from "./requestbid/rb_reducer";

  const rootReducer = combineReducers ({
        userReducer,
        productReducer,
        vendorReducer,
        bidderReducer,
        auctionReducer,
        rbReducer,
        bdReducer
  })

  export const store = createStore(rootReducer,applyMiddleware(thunk));