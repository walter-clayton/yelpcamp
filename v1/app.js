var express = require("express");
var app = express();

app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res){
    var campgrounds = [
        {name: "Salmon Creek", image:"https://cdn.shopify.com/s/files/1/2468/4011/products/campsite_1_600x.png?v=1524622915"},
        {name: "Granite Hill", image:"https://cdn.shopify.com/s/files/1/2468/4011/products/campsite2_600x.png?v=1524622941"},
        {name: "Kili Hill", image:"https://cdn.shopify.com/s/files/1/2468/4011/products/campsite3_600x.png?v=1524622961"},
    ]
    res.render("campgrounds", {campgrounds:campgrounds});
});



app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The YelpCamp Server Has Started!");
});

var port = process.env.PORT || 3000;
app.listen(3000, function(){
	console.log("ready on port 3000 " + port);
});
