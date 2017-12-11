$(document).ready(function(){

  //array of users we will be keeping track of
  var channels =[["ESL_SC2"], ["OgamingSC2"], ["cretetion"], ["freecodecamp"], ["storbeck"], ["habathcx"], ["RobotCaleb"], ["noobs2ninjas"],["hyperrpg"]];
  var $table1 = $("#table1");
  var $panel1 = $("#panel1");
  var $panel2 = $("#panel2");
  var $panel3 = $("#panel3");
 //Select and display the correct tab 
 $("li").on("click",function(){
      $(".panel").removeClass("current");
      $("li").removeClass("current");
      $(this).addClass("current");
      var tab_id = $(this).attr("tab_id");
      $("#panel" + tab_id).addClass("current");
    });
 
 //record status of channels 
 for(var i in channels){ 
  checkIfOnline(channels[i],i); 
  populatePanels(channels[i],i); 
 }
    
 function checkIfOnline(channelName,i){
   var url = 'https://wind-bow.glitch.me/twitch-api/streams/' + channelName;
   channels[i].push("https://www.twitch.tv/" + channels[i][0]); 
   
   $.ajax({
     url: url,
     async: false
   }).done(function(channelJSON){

     if (channelJSON["stream"] == null) {        
        channels[i].push("offline");
    } else {
        channels[i].push("online");    
    }
       });  
 } 
  
 function populatePanels(channelArray,i){
   var href = "<a target='blank' href=\"" + channelArray[1] + "\">";
   var url = 'https://wind-bow.glitch.me/twitch-api/streams/' + channelArray[0];
   var details = "";
   
   $.ajax({
     url: url,
     async: false
   }).done(function(channelJSON){
     if (channelJSON["stream"] !== null) {        
        details = "<td>"+ href + channelJSON.stream.game +"</a></td>";
        }
       });  
   
   var row = "<tr>" + "<td>" + href + channelArray[0] + "</a></td>"  + "<td>" + href + channels[i][2] + "</a></td>" +  details +"</tr>";

   $table1.append(row);

   if(channels[i][2] == "offline"){
      $panel3.append(row);
    } else {
      $panel2.append(row);
    }
      
 }
      
});