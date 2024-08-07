const mongoose = require('mongoose');

const shoppingSchema = mongoose.Schema({
  id:{
    type:Number,
    required:true,
  },
  product:{
    type:String,
    required:true,
  },
  data:{
    type:Number,
    required:true,
  },
  price:{
    type:Number,
    required:true,
  }
})


module.exports=mongoose.model('shoppingCart',shoppingSchema)