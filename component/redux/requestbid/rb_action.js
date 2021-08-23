 
// Products actions

 const  setrb=(auctions)=>
{
   return async (dispacth)=> 
    {
    dispacth({
        type:"rb_Data",
        payload:auctions
    })
    }
}
   



export default {
 setrb
}