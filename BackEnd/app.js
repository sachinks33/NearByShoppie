const express=require("express");
const cors = require('cors');
const multer= require('multer');
const bodyParser = require('body-parser');
const jwt=require('jsonwebtoken')
const { productData } = require("./src/data-models/product-model");
const { userData } = require("./src/data-models/user-model");
const { billData } = require("./src/data-models/bill-model");

var fs = require('fs');
var path = require('path');
const { STATUS_CODES } = require("http");
const app= new express();
const port=3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

function verifyToken(req,res,nxt){
  if(!req.headers.authorization)
  {
    return res.status(401).send('unauthorized request');
  }
  let token=req.headers.authorization.split('')[1]
  if(token=='null')
  {
    return res.status(401).send('Unauthorized request');
  }
  let payload=jwt.verify(token,'secretKey');
  if(!payload)
  {
    return res.status(401).send('Unauthorized request')
  }
  req.userId=payload.subject;
  console.log(req.userId);
  nxt();
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads");
    },
    filename: function (req, file, cb) {
        console.log("name")
      cb(null, Date.now() + "_" + file.originalname);
    },
  });
  const upload = multer({storage: storage,});
  
//add Products
app.post("/addproduct",upload.single('productImage'), (req,res)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Methods:GET, POST, PATCH, PUT, DELETE, OPTIONS');
   // console.log(req.file.buffer);
    if (!req.file) {
        throw Error("FILE_MISSING");
      } else {
        var imageBuffer=fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)).toString("base64");
        
      }

    var product={
        productName:req.body.productName,
        shopName:req.body.shopName,
        category:req.body.category,
        price:req.body.price,
        quantity:req.body.quantity,
        unit:req.body.unit,
        stock:req.body.stock,
        image:imageBuffer
    }
    //console.log(req.file);
    res.send("success");
    var product=new productData(product);
    product.save();
    //console.log(product.image.data);
});

//Update Products
app.post("/update-product", (req,res)=>{
    productData.findOneAndUpdate({_id:req.body.products._id},{
      productName:req.body.products.productName,
      shopName:req.body.products.shopName,
      category:req.body.products.category,
      price:req.body.products.price,
      quantity:req.body.products.quantity,
      unit:req.body.products.unit,
      stock:req.body.products.stock
    }).then(function(pDetails){
      //console.log(pDetails.stock)
      res.statusCode = 200;
    })
  
});

//register
app.post("/c-registeration",(req,res)=>{
  res.header('Access-Control-Allow-Origin','*');
  res.header('Access-Control-Allow-Methods:GET, POST, PATCH, PUT, DELETE, OPTIONS');
    var user={
        userType:req.body.user.userType,
        name:req.body.user.name,
        mobile: req.body.user.mobile,
        email:req.body.user.email,
        pinCode:req.body.user.pinCode,
        location:req.body.user.location,
        password:req.body.user.password
    }
    var user=new userData(user);
    user.save().then((uDetails)=>{
      if(req.body.user.userType=='shop-admin')
      {
        let payload={subject:uDetails.mobile+uDetails.password};
        let token=jwt.sign(payload,'secretkey')
        let shopName=uDetails.name;
        res.send({token, shopName});
      }
      else if(req.body.user.userType=='Customer')
      {
        let cToken=uDetails.userType;
        let cCode=uDetails.pinCode;
        let cName=uDetails.name;
        let cMobile=uDetails.mobile;
        let cLocation=uDetails.location;
        res.send({cToken, cCode, cName,cMobile,cLocation});
      }
    });
    
      
    console.log("User Added Successfully");
});

//login
app.post("/login", (req,res)=>{
  res.header('Access-Control-Allow-Origin','*');
  res.header('Access-Control-Allow-Methods:GET, POST, PATCH, PUT, DELETE, OPTIONS');
  console.log(req.body.mobile)
  data=req.body;
  mobile=Number(data.mobile)
  console.log(Number(data.mobile))
  userData.findOne({mobile: req.body.mobile}).then(function(uDetails){
    console.log(uDetails);
    //console.log(error);
    if(!uDetails)  
    {
      res.send("Invalid Mobile number");
    }

    else if(uDetails.password==data.password)
    {
      if(uDetails.userType=='shop-admin')
      {
        let payload={subject:uDetails.mobile+uDetails.password};
        let token=jwt.sign(payload,'secretkey')
        let shopName=uDetails.name;
        res.send({token,shopName});
      }
      else if(uDetails.userType=='Customer')
      {
        let cToken=uDetails.userType;
        let cCode=uDetails.pinCode;
        let cName=uDetails.name;
        let cMobile=uDetails.mobile;
        let cLocation=uDetails.location;
        res.send({cToken, cCode, cName,cMobile,cLocation});
      }
      
    }
    else{
      res.send("Invalid Password");
    }
  });
});
//shop wise product listing
app.post("/products", (req, res)=>{
  
  productData.find({shopName:req.body.shoppingAt}).then(function(shopProducts){
    //console.log(req.body.shoppingAt);
    res.send(shopProducts);
  });
})

//shop list
app.post("/shops", (req, res)=>{
  console.log(req.body)
  userData.find({pinCode:req.body.cCode, userType:"shop-admin"}).then(function(shopList){
    res.send(shopList);
  });
});

//update product quantity while purchase
app.post("/update-stock", (req,res)=>{
  productData.findOneAndUpdate({shopName:req.body.productDetail.shopName, productName:req.body.productDetail.productName},
    {stock:parseInt(req.body.productDetail.stock)-parseInt(req.body.quantity)})
    .then(function(pDetails){
      //console.log(pDetails.stock)
      res.statusCode = 404;
    })
});

//billing
app.post("/record-bill",(req,res)=>{
  res.header('Access-Control-Allow-Origin','*');
  res.header('Access-Control-Allow-Methods:GET, POST, PATCH, PUT, DELETE, OPTIONS');
  //console.log(req.body.fullBill[0])
  var bill={
    customerName:req.body.fullBill[0].cName,
    shopName:req.body.fullBill[0].shop,
    customerMobile: req.body.fullBill[0].cMobile,
    pinCode:req.body.fullBill[0].pincode,
    customerLocation:req.body.fullBill[0].cLocation,
    status:req.body.fullBill[0].status,
    bill:req.body.fullBill[0].bd,
    total:req.body.fullBill[0].total
  }
  var bill=new billData(bill);
  bill.save();
});

//get bill records
app.post("/get-records", (req, res)=>{
  
  billData.find({customerMobile:req.body.datas}).then(function(billList){
    res.send(billList);
  })
});
//get M bill records
app.post("/get-m-records", (req, res)=>{
  
  billData.find({shopName:req.body.datas}).then(function(billList){
    res.send(billList);
  })
});

//update order status
app.post("/update-status", (req,res)=>{
  billData.findOneAndUpdate({_id:req.body.id},{status:req.body.status}).then(function(data){
    res.statusCode = 200;
  });
})

//remove product
app.post("/remove-product", (req,res)=>{
  console.log(req.body.id)
  productData.findOneAndDelete({_id:req.body.id}).then(function(data){
    res.statusCode = 200;
  });
});

app.post("/get-data", (req, res)=>{
  //console.log(req.body)
  productData.find({_id:req.body.id}).then(function(productData){
    res.send(productData);
  });
});
app.listen(port, ()=>{console.log("Server ready at "+port )});