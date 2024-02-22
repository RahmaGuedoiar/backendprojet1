const orderSchema = require("../model/orderSchema");
const Order = require("../model/orderSchema");
const Product = require("../model/Productschema");
const checkPermissions = require("../utiles/checkPermissions");
const fakeStripeAPI = require("../utiles/fakeStripeApi");

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({});
    res.status(200).json({ orders, count: orders.length });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// let getSingleOrder = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const order = await Order.findById(id);
//     if (!order) {
//       return res.status(404).json({
//         success: false,
//         error: `Order with id ${id} not found`,
//       });
//     }
//     checkPermissions(req.user, order.user);
//     return res.status(200).json({
//       success: true,
//       order,
//     });
//   } catch (error) {
//     return res.status(400).json({
//       success: false,
//       error: error.message,
//     });
//   }
// };

// let getCurrentUserOrders = async (req, res) => {
//   const orders = await Order.find({ user: req.user._id });
//   if (!orders) {
//     return res.status(404).json({
//       success: false,
//       error: "Orders with this user not found",
//     });
//   }
//   return res.status(200).json({ orders, count: orders.length });
// };

const createOrder = async (req, res) => {
  try {
    const { owner, cartItems,total } = req.body;
    const orders = await Order.create({ owner, cartItems,total });
    res.status(201).json({ msg: "order created", orders });
  } catch (error) {
    res.status(500).json({ msg: "somthing went wrong!" ,error});
    console.log(error)
  }
};
const getOrders=async(req,res)=>{
  try {
    const {userId}=req.body

    const Orders=await Order.find({owner:userId})
    res.status(201).json({msg:"get Orders",orders:Orders})
  } catch (error) {
      res.status(500).json({msg:"somthing went wrong"})
      console.log(error)
  }
}




// let updateOrder = async (req, res) => {
//   const { id } = req.params;
//   const { paymentIntentId } = req.body;

//   const order = await Order.findById(id);
//   if (!order) {
//     return res.status(400).send(`No order with id : ${id}`);
//   }
//   checkPermissions(req.user, order.user);
//   order.paymentIntentId = paymentIntentId;
//   order.status = "paid";
//   await order.save();

//   return res.status(200).json({ order });
// };

module.exports = {
  getAllOrders,
  // getSingleOrder,
  // getCurrentUserOrders,
  createOrder,
  getOrders
  // updateOrder,
};
