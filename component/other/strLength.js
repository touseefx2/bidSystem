

const assignL = (type)=>{
if(type=="name"){  
    return 18 
}
else if(type=="phone"){   
    return 20
}
else if(type=="city"){
    return 22
}
}

export const  strLength =  (str,type)=>{
 let length= assignL(type)
 
 let strng= str;
 if (str.length > length){
  strng =  str.substring(0, 18)+".."
 } 
     return strng
}