const express = require("express");
const bodyparser = require("body-parser");
const date = require(__dirname + "/date.js");
// console.log(date());
const app = express();
const newItems = ["buy food", "cook food", "eat food"];
const workItem = [];

app.use(bodyparser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');

app.get("/", function(req,res){
    let day = date.getDay();
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
// }); it simply customised to if-else statement in app.get()

app.listen(process.env.PORt || "3000", function(){
    console.log("server running on 3000");
});
