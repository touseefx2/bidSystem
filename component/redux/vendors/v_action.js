 
// Products actions

 const  setVendors=(vendors)=>
{
   return async (dispacth)=> 
    {
    dispacth({
        type:"Vendors_Data",
        payload:vendors
    })
    }
}
   



export default {
setVendors
}