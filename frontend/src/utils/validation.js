
export default {
  brand: (value) =>{
    if(!value){
      return "Brand is required"
    }
  },

  name: (value) =>{
    if(!value){
      return "Name is required"
    }
  },

img: (value) =>{
  if(!value){
    return "Image is required"
  }
},

description: (value) =>{
  if(!value){
    return "Description is required"
  } else if (value.length < 10 || value.length > 200){
    return "Description must be between 10 and 200 characters long"
  }
},

price: (value) =>{
  if(!value){
    return "Price is required"
  }else if(
    isNaN(value)){
      return "Price must be a number"
    }else if (parseFloat(value) < 0) {
      return "Price cannot be negative";
    }
},

stock: (value) =>{
  if(!value){
    return "Stock is required"
  } else if(
    isNaN(value)){
      return "Stock must be a number"
    }
},

rating: (value) =>{
  if(!value){
    return "Rating is required"
  } else if(
    isNaN(value) || value < 0 || value > 5){
    return "Rating must be a number between 0 and 5"
  }
},

category: (value) =>{
  if(!value){
    return "Category is required"
  }
}
}
