const Product = require("../model/Productschema");

const addProdcut = async (req, res) => {
  const product = new Product({
    name: req.body.name,
    image: req.body.image,
    category: req.body.category,
    new_price: req.body.new_price,
    old_price: req.body.old_price,
    description: req.body.description,
  });
  try {
    await product.save();
    res.status(201).json({ msg: "Product created", product });
  } catch (error) {
    res.status(500).json({ msg: "somthing went wrong!", error });
  }
};

const getProduct = async (req, res) => {
  try {
    const products = await Product.find({});
    return res.status(200).json({ msg: "get Products", products });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const deleteproduct = await Product.findByIdAndDelete({
      _id: req.params.id,
    });
    res.status(201).json({ msg: "Productdeleted" });
  } catch (error) {
    res.status(500).json({ msg: "somthing went wrong!", error });
  }
};

const updateProduct = async (req, res) => {
  try {
    const updateproduct = await Product.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    res.status(201).json({ msg: "Product updated", updateproduct });
  } catch (error) {
    res.status(500).json({ msg: "somthing went wrong!", error });
  }
};

module.exports = { addProdcut, updateProduct, deleteProduct, getProduct };
