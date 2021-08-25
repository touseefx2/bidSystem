 
// user actions

 const  setUser=(user)=>
{
   return async (dispacth)=> 
    {
    dispacth({
        type:"User_Data",
        payload:user
    })
    }
}
  const logOut = () => {
    return async (dispacth)=> 
    {
    dispacth({
        type:"Logout",
        payload:[]
    })
    }
}



export default {
    setUser,
    logOut
}