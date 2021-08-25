 

 const  setBidders=(bidders)=>
{
   return async (dispacth)=> 
    {
    dispacth({
        type:"Bidders_Data",
        payload:bidders
    })
    }
}
   



export default {
setBidders
}