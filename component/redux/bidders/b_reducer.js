

const bidderReducerinitialState = [];

export const bidderReducer =  (state=bidderReducerinitialState,action )=>{
  switch(action.type){

    case "Bidders_Data":
      return{
      ...state,
      bidders:action.payload,
      };
          default:
            return state;     

  }

}
