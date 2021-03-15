const mongoose=require('mongoose');
mongoose.connect('mongodb+srv://Nearby:Nearby@nearbycluster.kt9nk.mongodb.net/NearbyShoppie?retryWrites=true&w=majority');
const schema=mongoose.Schema;

const billSchema= new schema({
    customerName:String,
    shopName:String,
    customerMobile: Number,
    pinCode:Number,
    customerLocation:String,
    status:String,
    bill:String,
    total:Number
});
var billModel= mongoose.model("bills",billSchema);
module.exports.billData=billModel;
