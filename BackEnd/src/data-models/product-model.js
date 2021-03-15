const mongoose= require('mongoose');
console.log(mongoose.connection.readyState);
mongoose.connect("mongodb+srv://Nearby:Nearby@nearbycluster.kt9nk.mongodb.net/NearbyShoppie?retryWrites=true&w=majority");
mongoose.set('useFindAndModify', false); 
const schema= mongoose.Schema;

const productSchema= new schema({

    productName: String,
    shopName:String,
    category:String,
    price:Number,
    quantity:Number,
    unit:String,
    stock:Number,
    image:String
});
var productModel=mongoose.model('products', productSchema);
module.exports.productData= productModel;