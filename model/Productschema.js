const  mongoose  = require("mongoose");

const Productschema=mongoose.Schema({
   
    name:{type:String, require:true},
    image:{type:String, require:true},
    category:{type:String, require:true},
    new_price:{type:Number, require:true},
    old_price:{type:Number, require:true},
    description:{type:String, require:true},
    date:{type:Date,default:new Date()},
    avilable:{type:Boolean, default:true},

})


const Product= mongoose.model("products", Productschema)
module.exports=Product