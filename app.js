var express=require("express");
var app=express();
var methodOverride=require("method-override");
var bp=require("body-parser");
var mon=require("mongoose");

mon.connect("mongodb://localhost/tsfmentorsapp");
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bp.urlencoded({extended:true}));
app.use(methodOverride("_method"));

//mongoose model config
var mentorSchema=new mon.Schema({
    name:String,
    image:String,
    profile:String
});
var mentor=mon.model("mentor",mentorSchema );
mentor.create({
    name:"Parul Verma",
    image:"https://media.licdn.com/dms/image/C5103AQF4aHSbDZdEqQ/profile-displayphoto-shrink_800_800/0?e=1560988800&v=beta&t=6hJM7U2AkmOTxTZ7KTnkCGAt4MJh5UTOKq_KT2XFqF4",
    profile:"Skilled Human Resource Executive adept at managing Learning and Development projects, HR functions including Salary, Increments, and Payroll whilst simultaneously supporting the training team and ensuring a smooth and effective HR process flow and proper governance. Team player, always seeking opportunities to increase efficiency. Thrives on new challenges, actively seeking them and takes pride in seeing them through to completion."
});

mentor.create(
    {
        name:"Priyesh Kumar",
        image:"https://media.licdn.com/dms/image/C5103AQH6ZERA2Gvrbw/profile-displayphoto-shrink_800_800/0?e=1560988800&v=beta&t=OG0pDrMDPxhvZ3XN_ybAwXV1Z-M0lBI8WAb2rNQti5c",
        profile:"He lives in Singapore, and works as Software Developer at Visa. His role requires architecting applications, and ensure its development.He does a lot of volunteer work and mentorship; helping learners know more about latest technologies, methodologies and innovations."      
    });
//restful routes

//index route
app.get("/",function(req,res){
    res.redirect("/mentors");
});
app.get("/mentors",function(req,res){
    mentor.find({},function(err,mentors)
    {
        if(err)
           console.log(err);
        else
            res.render("index.ejs",{mentors:mentors});
    })
});

//new route
app.get("/mentors/new",function(req,res)
{
    res.render("new.ejs");
});

//create route
app.post("/mentors",function(req,res)
{   
    mentor.create(req.body.mentor,function(err,newmentor){
        if(err)
           res.render("new.ejs");
        else
           res.redirect("/mentors");
            
    })
});


//show route
app.get("/mentors/:id", function(req,res){
     mentor.findById(req.params.id,function(err,foundmentor){
         if(err)
          res.redirect("/mentors");
         else 
         {
           res.render("show",{mentor:foundmentor});
}
}); 
});


//edit route
app.get("/mentors/:id/edit",function(req,res)
{   mentor.findById(req.params.id,function(err,foundmentor){
         if(err)
          res.redirect("/mentors");
         else 
         {
           res.render("edit.ejs",{mentor:foundmentor});
}
})
});


//update route
app.put("/mentors/:id",function(req,res)
{    
    mentor.findByIdAndUpdate(req.params.id,req.body.mentor,function(err,updatedmentor){
        if(err)
            res.redirect("/mentors");
        else
            res.redirect("/mentors/"+req.params.id);
    })
});


//delete route
app.delete("/mentors/:id",function(req,res){
   mentor.findByIdAndRemove(req.params.id,function(err){
        if(err)
            res.redirect("/mentors");
        else
            res.redirect("/mentors");
       
   }) 
});



app.listen(process.env.PORT ,process.env.IP,function(){
    console.log("server has started");
});
