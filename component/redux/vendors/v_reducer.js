

const vendorReducerinitialState = [];

export const vendorReducer =  (state=vendorReducerinitialState,action )=>{
  switch(action.type){

    case "Vendors_Data":
      return{
      ...state,
      vendor:action.payload,
      };
          default:
            return state;     

  }

}
