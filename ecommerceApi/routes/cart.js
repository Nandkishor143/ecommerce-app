const Cart = require("../models/Cart");
const {
    verifyToken,
    verifyAndAuthorize,
    verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

// CREATE
router.post("/", verifyToken, async (req, res) => {
    const newCart = new Cart(req.body);
    try {
        const saveCart = await newCart.save();
        res.status(200).json(saveCart);
    } catch (err) {
        res.status(500).json(err);
    }
});

// UPDATE

router.put("/:id", verifyAndAuthorize, async (req, res) => {


    try {
        const updatedCart = await Cart.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updatedCart);
    } catch (err) {
        res.status(500).json(err);
    }
});

// DELETE

router.delete("/:id", verifyAndAuthorize, async (req, res) => {
    try {
        await Cart.findByIdAndDelete(req.params.id);
        res.status(200).json("Product has been removed");
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET A PRODUCT
router.get("/find/:id", async (req, res) => {
    try {
        const cart = await Cart.findById(req.params.id);
        res.status(200).json(cart);
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET ALL USER CART (ONLY ADMIN)
router.get("/",verifyTokenAndAdmin, async (req, res) => {
    try {
            const carts = await Cart.find();
            res.status(200).json(carts);
    } catch (err) {
        res.status(500).json(err);
    }
});



module.exports = router;
