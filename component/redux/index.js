//firebase and redux
 import {createStore,applyMiddleware,combineReducers} from 'redux'
 import thunk from 'redux-thunk'
 import {userReducer} from "./user/u_reducer"





  const rootReducer = combineReducers ({
        userReducer,
  })

  export const store = createStore(rootReducer,applyMiddleware(thunk));