const joi = require("joi");

module.exports.listingSchema = joi.object({
   listing: joi.object({
      title: joi.string().required().min(5),
      description: joi.string().required().min(5),
      price: joi.number().required().min(0),
      country: joi.string().required(),
      location: joi.string().required(),
      category: joi.string().required(),
   }).required()
});

          
    
module.exports.reviewSchema = joi.object({
    review : joi.object({
      comment : joi.string().required(),
      rating : joi.number().required().min(1).max(5), 
   }).required(),
});