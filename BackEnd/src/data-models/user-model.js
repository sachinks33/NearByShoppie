const mongoose=require('mongoose');
mongoose.connect('mongodb+srv://Nearby:Nearby@nearbycluster.kt9nk.mongodb.net/NearbyShoppie?retryWrites=true&w=majority');
const schema=mongoose.Schema;

const userSchema= new schema({
    userType:String,
    name:String,
    mobile: Number,
    email:String,
    pinCode:Number,
    location:String,
    password:String
});
var userModel= mongoose.model("users",userSchema);
module.exports.userData=userModel;
