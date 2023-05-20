// import cart collection
const carts = require('../models/cartSchema')

//add to cart
exports.addtocart = async(req,res)=>{
    //get product details from request
    const{id,title,price,image,quantity} = req.body;

    //logic
    try{
        //check if product is already in cart
        const product = await carts.findOne({id})
        if(product){   //updating product quantity & grand tot ie already there
            //product is in cart, increment product quantity
            product.quantity+=1;
            //update grand total in mongodb
            product.grandTotal = product.price*product.quantity
            // to save changes in mongodb
            product.save()
            //send response to the client
            res.status(200).json("product added to cart")

        }
        else{          //adding new product to mongodb
            //product is not available  in the cart
            //add product to cart
            const newProduct = new carts({id,title,price,image,quantity,grandTotal:price})
            //save new product
            await newProduct.save()   //giving await 'cause function is async
            res.status(200).json("Product added to the cart")
        }
    }
    catch(error){
        res.status(401).json(error)
    }
}

// get cart
exports.getcartitems = async(req,res)=>{
    // logic
    try{
        // get all cart items
        const allCartItems = await carts.find()
        res.status(200).json(allCartItems)
    }
    catch(error){
        res.status(401).json(error)
    }
}

// remove a product from cart
    exports.removecartitems= async(req,res)=>{
        // get product id from req params
        const{id}=req.params
        try{
            //remove an item from cart
            const removeProduct = await carts.deleteOne({id})   
            if(removeProduct.deletedCount!=0){              //if above deleteone works deletecount:1 ,ie property assigned to remove product after deleted item
                // get remaining products
                const remainingproducts = await carts.find()
                res.status(200).json(remainingproducts)
            }
            else{
                res.status(404).json("item not found")
            }
        }
        catch(error){
            res.status(401).json(error)

        }
    }

   //increment cart item  
   exports.incrementcount = async(req,res)=>{
    // get product id from req params
    const{id} = req.params
    try{
        // check if product is in cart
        const product = await carts.findOne({id})
        if(product){
            // increment product count and grand total
            product.quantity+=1;
            product.grandTotal=product.price*product.quantity
            // save changes in mongodb
            await product.save()
            //increment , get all the product from the cart after updating in
            // particular cart items
            const allitems = await carts.find()
            res.status(200).json(allitems)
        }
        else{
            res.status(404).json('item not found')
        }

    }
    catch(error){
        res.status(401).json(error)
    }

    
   } 

      //decrement cart item  

   exports.decrementcount = async(req,res)=>{
    // get product id from req params
    const{id} = req.params
    try{
        // check if product is in cart
        const product = await carts.findOne({id})
        if(product){
            // increment product count and grand total
            product.quantity-=1;
            if(product.quantity==0){
                //remove product from cart
                await carts.deleteOne({id})
                // await product.save() no needed 'cause its delete
               const allitems = await carts.find()

               res.status(200).json(allitems)
            }
            else{
                product.grandTotal=product.price*product.quantity
                // save changes in mongodb
                await product.save()
               //increment , get all the product from the cart after updating in
               // particular cart items
               const allitems = await carts.find()
               res.status(200).json(allitems)
            }
            
        }
        else{
            res.status(404).json('item not found')
        }

    }
    catch(error){
        res.status(401).json(error)
    }

    
   } 