// const express=require("express");
// const { userAuth } = require("../middlewares/userAuth");
// const paymentRouter=express.Router();
// const PaymentModel = require("../models/payment");
// const Razorpay = require("../utils/razorpay");
// const payment = require("../models/payment");
// paymentRouter.get("/payment/create",userAuth,async(req,res)=>{
//     try{
//         const {membershipType}=req.body;
//         const {firstName,lastName,email,phoneNumber} =req.user;
//   const order= await Razorpay.orders.create({
//             amount: 50000, // Amount in paise
//             currency: "INR",
//             receipt: "receipt#1",
//             notes: {
//                 firstName: firstName,
//                 lastName: lastName,
//                 email: email,
//                 phoneNumber: phoneNumber,
//                 membershipType: membershipType,
//             }
//     })

//   const payment = new PaymentModel({
//     userId: req.user._id,
//     paymentId: order.id,
//     orderId: order.id,
//     amount: order.amount / 100, // Convert paise to rupees
//     currency: order.currency,
//     receipt: order.receipt,
//   })

//   const savedPayment = await payment.save();
//   return res.status(200).json({ payment: savedPayment });

// }
//     catch(err){
//         console.error("Error creating order:", err);
//         return res.status(500).json({ message: "Internal server error" });
//     }
// });

// payment



// module.exports=paymentRouter;