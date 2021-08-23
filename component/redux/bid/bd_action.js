 

 const  setBd=(bidders)=>
{
   return async (dispacth)=> 
    {
    dispacth({
        type:"Bd_Data",
        payload:bidders
    })
    }
}
   



export default {
setBd
}