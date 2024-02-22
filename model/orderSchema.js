const mongoose = require('mongoose');


const OrderSchema = new mongoose.Schema(
  {
    owner:{type:Object,require:true},
  cartItems:{ type:Array,require:true},
  total:{type:Object,require:true}
     }
     
);

module.exports = mongoose.model('Order', OrderSchema);