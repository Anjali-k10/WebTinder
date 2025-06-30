// const mongoose = require("mongoose");

// const paymentSchema = new mongoose.Schema({
//     paymentId: {
//         type: string,
//     },
//     orderId: {
//         type: string,
//     },
//     userId: {
//         type: mongoose.Schema.Types.ObjectId,
//        ref: "User",
//         required: true
//     },
//     amount: {
//         type: Number,
//         required: true
//     },
//     currency: {
//         type: String,
//         required: true
//     },
//     receipt: {
//         type: String,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
//         required: true
//     },
//     notes:{
//      firstName: {
//             type: String,
          
//         },
//         lastName: {
//             type: String,
           
//         },
//         email: {
//             type: String,
           
//         },
//         phoneNumber: {
//             type: String,
           
//         }
//     },
//     // isPremium: {
//     //     type: Boolean,
//     //     default: false
//     // },
//     // membershipType: {
//     //     type: String,   },
//     status: {
//         type: String,
//         enum: ["pending", "completed", "failed"],
//         required: true
//     }
// },{timestamps: true});

// module.exports = mongoose.model("Payment", paymentSchema);
