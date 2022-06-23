const express = require("express");
const bodyparser = require("body-parser");

const app = express();
let newItems = ["buy food", "cook food", "eat food"];
let workItem = [];

app.use(bodyparser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');

app.get("/", function(req,res){
    let today = new Date();
   let options = {
    weekday : "long",
    day: "numeric",
    month: "long",
    year: "numeric"
   }
   var day = today.toLocaleDateString("en-US", options);
    res.render("list", {listTitle: day, itemlist: newItems});
    
});

app.post("/", function(request,response){
    let item = request.body.newitem;
    newItems.push(item);
    if(request.body.list === "work list")
    {
        workItem.push(item);
        response.redirect("/work");
    }
    else{
        newItems.push(item);
        response.redirect("/");
    }
    
});

app.get("/about", function(req,res){
    res.render("about");
});

app.get("/work", function(req,res){
    res.render("list", {listTitle: "work list", itemlist: workItem});
});
// app.post("/work", function(req, res){
//     let item = req.body.newitem;
//     workItem.push(item);
//     res.redirect("/work");
// });

app.listen("3000", function(){
    console.log("server running on 3000");
});
