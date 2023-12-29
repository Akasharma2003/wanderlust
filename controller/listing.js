const Listing = require("../models/listing.js");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const { listingSchema } = require("../schema.js");
const mapToken = process.env.MAPBOX_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });
const nodemailer = require("nodemailer");

module.exports.index = async (req, res) => {
  const allListing = await Listing.find({});
  res.render("./listings/index.ejs", { allListing });
};

module.exports.newForm = (req, res) => {
  res.render("./listings/new.ejs");
};

module.exports.category = async (req, res) => {
  let name = req.params.name;
  const allListing = await Listing.find({ category: name });
  if (!allListing.length > 0) {
    req.flash("error", `${name} category listings is not available `);
    res.redirect("/listings");
  } else {
    res.render("./listings/index.ejs", { allListing });
  }
};

module.exports.searchBar = async (req, res) => {
  let data = req.body.search;
  let allListing = await Listing.find({ location: data })
    .collation({ locale: "en", strength: 2 })
    .exec();
  if (!allListing.length > 0) {
    req.flash("error", `${data} location listings is not available`);
    res.redirect("/listings");
  } else {
    res.render("./listings/index.ejs", { allListing });
  }
};

module.exports.createListing = async (req, res, next) => {
  let responce = await geocodingClient
    .forwardGeocode({
      query: req.body.listing.location,
      limit: 1,
    })
    .send();

  let url = req.file.path;
  let filename = req.file.filename;
  const newListings = new Listing(req.body.listing);
  newListings.owner = req.user._id;
  newListings.image = { url, filename };
  newListings.geometry = responce.body.features[0].geometry;
  let savedListing = await newListings.save();
  console.log(savedListing);
  req.flash("success", "New Listing Created!");
  res.redirect("/listings");
};

module.exports.showListing = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({ path: "review", populate: { path: "author" } })
    .populate("owner");
  if (!listing) {
    req.flash("error", "Listing You requested for does not exists!");
    res.redirect("/listings");
  }
  res.render("./listings/show.ejs", { listing });
};

module.exports.editListing = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing You requested for does not exists!");
    res.redirect("/listings");
  }

  let originalImageUrl = listing.image.url;
  originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250,h_200");
  res.render("./listings/edit.ejs", { listing, originalImageUrl });
};

module.exports.updateListing = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findByIdAndUpdate(
    id,
    { ...req.body.listing },
    { runValidators: true }
  );

  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = { url, filename };
    await listing.save();
  }

  req.flash("success", "Listing Update Successfully");
  res.redirect(`/listings/${id}`);
};

module.exports.deleteListing = async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  req.flash("success", "Listing Deleted Successfully");
  console.log("deleted listing");
  res.redirect("/listings");
};

module.exports.privacy = (req, res) => {
  res.render("./listings/privacy.ejs");
};

module.exports.contact = (req, res) => {
  res.render("./listings/contact.ejs");
};

module.exports.sendMail = (req, res) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "akash70611sharma@gmail.com",
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  let mailOption = {
    from: "akash70611sharma@gmail.com",
    to: req.body.email,
    subject: req.body.subject,
    text: req.body.message,
  };

  let to = req.body.email;

  transporter.sendMail(mailOption, (error, info) => {
    if (error) {
      console.log("your mail error is " + error);
    } else {
      console.log("Email sent:" + info.response);
      req.flash("success", `Email successfully sent to ${to}`);
      res.redirect("/listings/contact");
    }
  });
};
