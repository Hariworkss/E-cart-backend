//import wushlist collection
const wishlists = require('../models/wishlistSchema')

//add to wishlist button-fn
exports.addtoWishlist = async (req,res)=>{
    // get product details from request

    // using destructuring
    const {id,title,price,image}=req.body

    // logic 
    try{
        // check if the product in MongoDB
        const item = await wishlists.findOne({id})
        if(item){
            res.status(403).json("Item already exists in Wishlist")  //there is no  need of an items more than 1 copy in wishlist, 
        }
        else{
            //add item to wishlist
            const newProduct = new wishlists({id,title,price,image})
            // to store into mongodb
            res.status(200).json("Product added to wishlist")
            await newProduct.save()
        }
    }
    catch(error){

    }

}

    //get or view wishlist data
    exports.getWishlistitems = async(req,res)=>{
        // logic
        try{
            //get all wishlist items
            const allWishlistItems = await wishlists.find()
            res.status(200).json(allWishlistItems)

        }
        catch(error){
            res.status(401).json(error)
        }
        
    }

    //remove wishlist item
    exports.removeWishlistitems = async(req,res)=>{
        //get id from the requests
        const {id}= req.params     //we just needed id so taking it from params rather than req.body
        try{
            const removewishlistitem = await wishlists.deleteOne({id})
            console.log(removewishlistitem)
            if(removewishlistitem){
                // get all wishlist items after removing item
                const allWishlists = await wishlists.find()
                res.status(200).json(allWishlists)
            }
            else{
                res.status(404).json("item not found")
            }
        }
        catch(error){
            res.status(401).json(error)
        }
    }
