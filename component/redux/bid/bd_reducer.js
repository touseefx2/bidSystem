

const bidderReducerinitialState = [];

export const bdReducer =  (state=bidderReducerinitialState,action )=>{
  switch(action.type){

    case "Bd_Data":
      return{
      ...state,
      bd:action.payload,
      };
          default:
            return state;     

  }

}
