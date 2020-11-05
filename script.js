

output("p","bot","Welcome <br>  Hi Nice to meet you... and what is your name");

var user_input=document.getElementById("input")


user_input.addEventListener("click",function loadDoc() {
  var xhttp = new XMLHttpRequest();
  try{
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      
    var data= JSON.parse(this.responseText);
    var msg=document.getElementById("inp").value;
    
    document.getElementById("inp").value="";
    
    output("p","user",msg);
    
    if(msg=="Hi" || msg=="hi" || msg=="hy" || msg=="Hy" || msg=='kumar' || msg=='priyanka')
    {
      output("p","bot",get_timeofday_greeting()+","+Greeting()+"<br>"+data["menu"]);
    }

    else if(msg.length==1)
    {
      if(data[msg]){
         output("p","bot",data[msg]);
         if(msg=="3"){
        output("p","image","<img style='margin-top:10px; margin-left:140px; width:400px; height:300px;' src='https://thumbs.dreamstime.com/b/white-stone-words-thank-you-smile-face-color-glitter-boke-background-117350639.jpg'>");
          output("p","bot","Say hi to restart the bot");
        }
      }

      else{
          output("p","bot","Plz enter only a number [1-3]");
      }
    }

    else if(msg.includes("calculate")){
      evaluator(msg.split(" ")[1]);
    }

    else if(msg.includes("moviename"))
    {
      movie(msg.split(" ")[1].trim())
    }

    else if(msg.includes("back")){
      output("p","bot",data["menu"]);
    }

    else{
      output("p","bot","Sorry I didnt get that");
    }

  }

 };

  xhttp.open("GET", "jsondata.json", true);
  xhttp.send();
  }

  catch(e){
    output("p","bot","Sorry I didnt get that");
  }

}

);


function output(tag,className,text){

  var reply= document.getElementById("main")


  if(className=="bot"){
    reply.innerHTML+=`<img class="bot_image" 
    src="https://www.logo.bot/img/landing/logobot_3d_banner.png">`;
  }

  if(className=="user"){
    reply.innerHTML+=`<img  class="user_image" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTf5gL1EHaQMtnT7V1GhQnHATVtBQ0mQK8EYg&usqp=CAU">`;
  }

  if(className=="image"){
    reply.innerHTML+=`<img class="bot_image" 
    src="https://www.logo.bot/img/landing/logobot_3d_banner.png">`;
  }

  reply.innerHTML+=`<${tag} class=${className}>${text}</${tag}>`
}


function Greeting(){ 

  res=[" Nice to see you. I can provide the following options for you", 

  " Its a pleasure chatting with you. Here are the options I can provide you"];  
  
  return res[Math.floor((Math.random() * res.length))];
  
}


function get_timeofday_greeting(){

    var date = new Date();
    var current_time = date.getHours();
    let timeofday_greeting ="Good Morning"
    if(current_time>21)
        timeofday_greeting ="Good Night"
    else if(current_time>16)
        timeofday_greeting ="Good Evening"
    else if(current_time>=12)
        timeofday_greeting ="Good AfterNoon"
    
    return timeofday_greeting ;

}


function evaluator(expression){

   output("p","image","<img style='margin-top:10px; margin-left:140px; width:400px; height:300px;' src='https://www.wikihow.com/images/0/01/Improve-Your-Mathematical-Calculation-Skills-Step-7.jpg'>");
     
    try{
        output("p","bot","Result of the expression:"+eval(expression)); 
        output("p","bot","If you want to calculate another expression enter the expression as 'calculate 1+2' or  "+"<br>"+ "enter back")
       

    }
    catch(e){
       output("p","bot","Enter a valid expression"); 
    }
        
}


function movie(moviename)
{
  fetch('https://www.omdbapi.com/?t='+moviename+'&apikey=cdd20ef2')
  .then(response => response.json())
  .then(mdata => {
      console.log(mdata['name']);

      output("p","image","<img style='margin-top:10px; margin-left:140px; width:400px; height:300px;' src='https://image.shutterstock.com/image-illustration/raster-version-cinematograph-concept-banner-260nw-1697799442.jpg'>");

      output("p","bot","**** This is the movies list information  in "
      +"****"+mdata['Title']+"****"+"<br>"
      +"Year : "+mdata['Year']+"<br>"+"Rated : "+mdata['Rated']+"<br>"+"Released : "+mdata['Released']+"<br>"+"Director:"+mdata['Director']+"<br>"+"Country:"+mdata['Country']+"<br>"+"Awards:"+mdata['Awards']);

      output("p","bot","If you want to know  the another movies please enter the movie name as 'movie moviename' or "+"<br>"+ "enter back")
  })

  .catch(err => {
    output("p","bot","Please enter correct movie name");
    input.value="";
    return 0;

  });

}

