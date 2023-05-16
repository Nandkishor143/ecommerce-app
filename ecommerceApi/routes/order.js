const Order = require("../models/Order");
const {
  verifyToken,
  verifyAndAuthorize,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

// CREATE
router.post("/", verifyAndAuthorize, async (req, res) => {
  const newOrder = new Order(req.body);
  try {
    const saveOrder = await newOrder.save();
    res.status(200).json(saveOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE

router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE

router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json("Order has been removed");
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET A ORDER
router.get("/find/:id", verifyAndAuthorize, async (req, res) => {
  try {
    const Order = await Order.findById(req.params.id);
    res.status(200).json(Order);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ALL USER Order (ONLY ADMIN)
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const Orders = await Order.find();
    res.status(200).json(Orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET MONTHLY SALES INCOME:
router.get("/sales", verifyTokenAndAdmin, async (req, res) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const prevMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
  try{

      const income = await Order.aggregate([
          {
              $match: { createdAt: { $gte: prevMonth } },
            },
            {
                $project: {
                    month: { $month: "$createdAt" },
                    sales: "$amount",
                },
            },
            { 
                $group: {
                    _id: "$month",
                    total: {$sum: "$sales"}
                },
            },
        ]);
        res.status(200).json(income);
    }catch(err){
        res.status(500).json(err);
    }
});
module.exports = router;
