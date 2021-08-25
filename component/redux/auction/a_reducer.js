

const auctionReducerinitialState = [];

export const auctionReducer =  (state=auctionReducerinitialState,action )=>{
  switch(action.type){

    case "Auction_Data":
      return{
      ...state,
      auctions:action.payload,
      };
          default:
            return state;     

  }

}
