 
// Products actions

 const  setAuctions=(auctions)=>
{
   return async (dispacth)=> 
    {
    dispacth({
        type:"Auction_Data",
        payload:auctions
    })
    }
}
   



export default {
 setAuctions
}