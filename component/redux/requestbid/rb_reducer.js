

const rbReducerinitialState = [];

export const rbReducer =  (state=rbReducerinitialState,action )=>{
  switch(action.type){

    case "rb_Data":
      return{
      ...state,
      rb:action.payload,
      };
          default:
            return state;     

  }

}
