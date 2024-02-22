const router = require("express").Router();
const {
  authMiddleware,
  authorizeRoles,
} = require("../middleware/UserMiddleware");

const {
  getAllOrders,
  // getSingleOrder,
  // getCurrentUserOrders,
  createOrder, getOrders,
  // updateOrder,
} = require("../controlles/orderControlles");

router.post("/createorder/order",authMiddleware, createOrder);
router.get("/getOrders",getOrders)
router.get("/allorder",[authMiddleware,authorizeRoles('admin')], getAllOrders);
// router.route("/getCurrentUserOrders").get(authMiddleware, getCurrentUserOrders);
// router.get("/getsingleorder/:id", authMiddleware, getSingleOrder);
// router.patch("/updateorder/:id", authMiddleware, updateOrder);

module.exports = router;
