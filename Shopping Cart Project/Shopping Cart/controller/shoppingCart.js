const Cart = require("../model/shoppingcartModel")


exports.postCart=  (req,res)=>{
    const { id, product, data, price}=req.body;

    const cartObj = new Cart ({
        id,
        product,
        data,
        price
    });

     cartObj.save()

    .then(response => {
        res.redirect("/profile")
    })
    .catch( err => {
        res.status(500).json({ error: err })
    })
}


exports.getCart = (req, res) => {
    
    Cart.find()
        .then(response => {
            res.status(200).json({
                message: "result found",
                response
            })
        })
        .catch(err => {
            return res.send({ msg: "Error occured" })
        })
}

exports.getCartId = (req, res) => {

    const { locId } = req.params;
    console.log(req.param)
    Cart.findById(locId)
        .then(response => {
           res.status(200).json({
            response
           })
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
}


exports.DeletetCartId = (req, res) => {

    const { dast } = req.params;
    console.log(req.params);
    Cart.deleteOne({_id:dast})
        .then(response => {
            res.redirect("/profile")
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
}

exports.putCartId= (req,res)=>{
    const { ids } = req.params;
     
    const {id,product,data,price}=req.body
        console.log(price)
    Cart.findOneAndUpdate({id:ids},{ $set:{
        id,
        product,
        data,
        price
       }
    })

    .then(response => {
        res.status(200).json(response)
    })
    .catch(err => {
        res.status(500).json({ error: err })
    })

}