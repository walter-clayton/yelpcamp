var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    Campground      = require("./models/campground"),
    seedDB          = require("./seeds");
    


mongoose.connect('mongodb://localhost/yelp_camp', {useNewUrlParser: true, useUnifiedTopology: true}, (err) => {
    if(err) {
    console.log('Database error: ' + err);
    } else {
    console.log('Successful database connection'); 
    }
});

seedDB();


app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");


// SCHEMA SETUP



// Campground.create(
//     {
//     name: "Granite Hill",
//     image: "https://cdn.shopify.com/s/files/1/2468/4011/products/campsite2_600x.png?v=1524622941",
//     description: "This a huge granite hill, no bathrooms. No water, beatiful granite!"
// }, function(err, campground){
//     if(err){
//         console.log(err);
//     } else {
//         console.log("NEWLY CREATED CAMPGROUND :  ");
//         console.log(Campground);
//     }
// });


// var campgrounds = [
//         {name: "Salmon Creek", image:"https://cdn.shopify.com/s/files/1/2468/4011/products/campsite_1_600x.png?v=1524622915"},
//         {name: "Granite Hill", image:"https://cdn.shopify.com/s/files/1/2468/4011/products/campsite2_600x.png?v=1524622941"},
//         {name: "Kili Hill", image:"https://cdn.shopify.com/s/files/1/2468/4011/products/campsite3_600x.png?v=1524622961"},
//         {name: "Salmon Creek", image:"https://cdn.shopify.com/s/files/1/2468/4011/products/campsite_1_600x.png?v=1524622915"},
//         {name: "Granite Hill", image:"https://cdn.shopify.com/s/files/1/2468/4011/products/campsite2_600x.png?v=1524622941"},
//         {name: "Kili Hill", image:"https://cdn.shopify.com/s/files/1/2468/4011/products/campsite3_600x.png?v=1524622961"},
//     ]

// INDEX - show all campgrounds
app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res){
    
    // get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else {
                res.render("index", {campgrounds: allCampgrounds});
        }
    });
});

// create new campground to database
app.post("/campgrounds", function(req, res){
    //get data from form and add to campgrounds array
   var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {name: name, image: image, description: desc}
    // create a new campground and save to DB
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
                // redirect back to campgrounds page
                res.redirect("/campgrounds");
        }
    });
});

// NEW - show form to create new campgrounds
app.get("/campgrounds/new", function(req, res){
    res.render("new.ejs");
});

//  SHOW - shows more info about one campground
app.get("/campgrounds/:id", function(req,res){
    // find the campground with provided ID
    Campground.findById(req.params.id, function(err, foundCampground){
        if (err){
            console.log(err);
        }   else {
            // render show template with that campground
            res.render("show", {campground: foundCampground});
        }
    });
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The YelpCamp Server Has Started!");
});

var port = process.env.PORT || 3000;
app.listen(3000, function(){
	console.log("ready on port 3000 " + port);
});
