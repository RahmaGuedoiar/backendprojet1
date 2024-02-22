const { getAllUsers,getUserById,UpdateUser,UpdateUserPassword,getCurrentUser } = require("../controlles/User");
const { authMiddleware, authorizeRoles } = require("../middleware/UserMiddleware");

const userRouter = require("express").Router();

userRouter.route("/getallusers").get(authMiddleware,authorizeRoles('admin'),getAllUsers);
userRouter.route("/getcurrentuser").get(authMiddleware,getCurrentUser);
userRouter.route("/update").patch(UpdateUser);
userRouter.route("/update/password").patch(UpdateUserPassword);
userRouter.route("/getuser/:id").get(getUserById)


module.exports = userRouter;