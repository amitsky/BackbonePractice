var view = Backbone.View.extend({
   events :{
     "click #subm":"submitt", //validation on submit
     "blur input":"submit", //validation on blur
     "change .country": "country_city"  //dynamic country city change
   },
   //initialize View
   initialize: function(){
       console.log("View is initialize");
       this.registration_m = new model();
       this.modelbinder = new Backbone.ModelBinder();
       console.log("Before set:" +JSON.stringify(this.registration_m));
       this.render();
   },
   render:function (){
       var self = this;
       $.ajax({
           url:"js/templates/template.html",
           success: function(res){
              console.log("res:",res);
               $('body').append(res);
               var reg = $('#reg_tem').html(),
//                   wrap = {
//                       "obj":self.registration_m.toJSON()
//                   },
                   template = _.template(reg,{});
                   $(self.el).html(template);
                   self.modelbinder.bind(self.registration_m, self.el);
           } 
       });
       return this;
   },
   country_city:function (e){
       
      var targt = $(e.target).val();
      $('.cities').val("");
      $('.cities option').css("display","none");
      $('.' +targt).css("display","block");     
   },
   submit:function (e){
        
       var target = $(e.target),
           tarClass = target.prop("class") + "label",
           tarName = target.prop("placeholder");
       if(target.val() == ""){
           $('.'+tarClass).text("*Fill your " + tarName + " field");
       }else{
           $('.'+tarClass).text("");
       }
   },
   submitt:function (){
       var name = $('.name').val(),
           email = $('.email').val(),
           phone = $('.phn').val(),
           pass = $('.pwd').val(),
           cpass = $('.cpwd').val(),
           occupation = $('.work').val(),
           pan = $('.pan').val(),
           address = $('.add').val(),
           pin = $('.pin').val(),
           quali = $('.qual').val(),
           city = $('.city').val(),
           country = $('.country').val(),
           emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
           filter =  /^\d{10}$/;
   
    if(name == ""){
        alert('Please fill up your name');
        $('.name').focus();
        return false;
    }else if(email == ""){
        alert("Please fill up your email");
        $('.email').focus();
        return false;
    }else if(!emailReg.test(email)){
        alert("Please fill up your valid email");
        $('.email').focus();
        return false;
    }else if(phone == ""){
        alert("Please fill up your Phone no.");
        $('.phn').focus();
        return false;
    }else if(!filter.test(phone)){
        alert("Please enter your valid Phone no.");
        $('.phn').focus();
        return false;
    }else if(pass == ""){
        alert("Please enter up your password");
        $('.pwd').focus();
        return false;
    }else if(pass != cpass){
        alert("Please confirm your password");
        $('.cpwd').focus();
        return false;
    }else if(occupation == ""){
        alert("Please enter your occupation");
        $('.work').focus();
        return false;
    }else if(pan == ""){
        alert("Please enter your PAN no.");
        $('.pan').focus();
        return false;
    }else if(address == ""){
        alert("Please enter your address");
        $('.add').focus();
        return false;
    }else if(pin == ""){
        alert("Please enter your pin");
        $('.pin').focus();
        return false;
    }else if(quali == ""){
        alert("Please enter your qualification");
        $('.qual').focus();
        return false;
    }else if(city == ""){
        alert("Please select your city");
        return false;
    }else if(country == ""){
        alert("Please select your country");
        return false;
    }else{
        this.createModel();
        return true;
        
    }
   },
   createModel:function (){
        var name = $('.name').val(),
            email = $('.email').val(),
            phone = $('.phn').val(),
            pass = $('.pwd').val(),
            occupation = $('.work').val(),
            pan = $('.pan').val(),
            address = $('.add').val(),
            pin = $('.pin').val(),
            quali = $('.qual').val(),
            city = $('.city').val(),
            country = $('.country').val();
    
    this.registration_m.set({
        "name": name,
        "email": email,
        "phone": phone,
        "pass": pass,
        "occupation": occupation,
        "pan": pan,
        "address": address,
        "pin": pin,
        "quali": quali,
        "city": city,
        "country": country
        
    });
    alert(JSON.stringify(this.registration_m));      
   }
});
