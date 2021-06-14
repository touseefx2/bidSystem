

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
else if(type=="category"){
    return 35
}
else if(type=="product_name"){
    return 35
}
else if(type=="starting_amount"){
    return 35
}
}

export const  strLength =  (str,type)=>{
 let length= assignL(type)
 
 let strng= str;
 if (str.length > length){
  strng =  str.substring(0, length)+".."
 } 
     return strng
}