

const productReducerinitialState = [];

export const productReducer =  (state=productReducerinitialState,action )=>{
  switch(action.type){

    case "Products_Data":
      return{
      ...state,
      products:action.payload,
      };
          default:
            return state;     

  }

}
