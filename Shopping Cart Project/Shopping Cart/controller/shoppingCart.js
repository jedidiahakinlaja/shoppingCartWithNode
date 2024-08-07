const Cart = require("../model/shoppingcartModel")


exports.postCart=(req,res)=>{
    const { id, product, data, price}=req.body;

    const cartObj = new Cart ({
        id,
        product,
        data,
        price
    });

    cartObj.save()

    .then(response => {
        res.status(200).json({
            message: "Cart Saved Successfully",
            cart: response
        })
    })
    .catch( err => {
        res.status(500).json({ error: err })
    })
}