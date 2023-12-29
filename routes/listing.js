const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { listingSchema } = require("../schema.js");
const Listing = require("../models/listing.js");
const {isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controller/listing.js"); 
const multer = require("multer");
const {storage} = require("../cloudConfig.js");
const upload = multer({storage});

// index route
router.route("/")

.get(wrapAsync(listingController.index))
//create route
.post(isLoggedIn,upload.single('listing[image]'), validateListing, wrapAsync(listingController.createListing));

// category wise search route
router.get("/filter/:name", listingController.category);


//privacy & terms route
router.get("/privacy",listingController.privacy);

//contact route
router.route("/contact")

.get(listingController.contact)
.post((listingController.sendMail));


// search bar route  
router.post("/search",listingController.searchBar);

// new route
router.get("/new",isLoggedIn, listingController.newForm);

router.route("/:id")

// show route
.get( wrapAsync(listingController.showListing))

// update route
.put(isLoggedIn,isOwner,upload.single('listing[image]'),validateListing, wrapAsync(listingController.updateListing))

// destroy route for listings
.delete(isLoggedIn,isOwner, wrapAsync(listingController.deleteListing));

// Edit route
router.get("/:id/edit",isLoggedIn, isOwner, wrapAsync(listingController.editListing));



module.exports = router;