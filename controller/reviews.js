const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const { reviewSchema } = require("../schema.js");

module.exports.createReview = async(req,res)=>{ 
    let listing = await Listing.findById(req.params.id);      
     let newReview = new Review(req.body.review);
       newReview.author = req.user._id;
     listing.review.push(newReview);
     await newReview.save();
     await listing.save();
     req.flash("success","Review Added Successfully");
     res.redirect(`/listings/${listing.id}`);
 };


 module.exports.destroyReview = async(req,res)=>{
    let {id,reviewId} = req.params;
   await Listing.findByIdAndUpdate(id,{$pull : {review : reviewId}});
    await  Review.findByIdAndDelete(reviewId);
    req.flash("success","Review Deleted Successfully");
     res.redirect(`/listings/${id}`);
};