 
// Products actions

 const  setProducts=(products)=>
{
   return async (dispacth)=> 
    {
    dispacth({
        type:"Products_Data",
        payload:products
    })
    }
}
   



export default {
 setProducts
}