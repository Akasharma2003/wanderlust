const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js")

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    image: {
        // type: String,
        // set:(v)=> v==="" ? "https://images.unsplash.com/photo-1526779259212-939e64788e3c?auto=format&fit=crop&q=80&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&w=1474":v,
        // default:"https://images.unsplash.com/photo-1526779259212-939e64788e3c?auto=format&fit=crop&q=80&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&w=1474",
         url : String,
         filename : String,
    },
    price: {
        type: Number,
    },
    location: {
        type: String,
    },
    country: {
        type: String,
    },

    review : [
        {
            type : Schema.Types.ObjectId,
            ref : "Review",
        },
    ],
    owner : {
        type : Schema.Types.ObjectId,
        ref : "User",
    },
    geometry : {
            type: {
                type: String, // Don't do `{ location: { type: String } }`
                enum: ['Point'], // 'location.type' must be 'Point'
                required: true
              },
              coordinates: {
                type: [Number],
                required: true
              }
            },
            category:{
                type : String,
                enum : ['Trending','Rooms','Iconic City','Mountain','Castles','Amazing Pools','Camping','Farms','Arctic','Domes','Boats'],
            }
        });

listingSchema.post("findOneAndDelete", async(listing) => {
    if(listing) {
        await Review.deleteMany({_id : {$in :listing.review}});
    }
});
const Listing=mongoose.model("Listing",listingSchema);
module.exports=Listing;