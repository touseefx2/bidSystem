

const userReducerinitialState = [];

export const userReducer =  (state=userReducerinitialState,action )=>{
  switch(action.type){

    case "User_Data":
      return{
      ...state,
      user:action.payload,
      };
      case "Logout":
        return{
          ...state,
          user:action.payload,
        };
          default:
            return state;     

  }

}
