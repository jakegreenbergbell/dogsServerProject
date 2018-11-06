var resetName = "";
var resetBreed = "";
var nameId = "";
var breedId = "";


function switchAndSend(name, breed){
  console.log(name + breed);
  nameId = name;
  breedId = breed;
  resetName = document.getElementById(name);
  resetName.innerHTML = '<input type="text" id="changed" class="enterPress" placeholder="change name?">';
  resetBreed = document.getElementById(breed);
  resetBreed.innerHTML = '<input type="text" id="changed2" class="enterPress" placeholder="change breed?">';
  $(".enterPress").keypress(function(e){
    var key = e.which;
    if(key == "13"){
        var val1 = document.getElementById("changed2").value
        var idOfChangedBreed = document.getElementById(breedId).innerHTML = val1
        var val2 = document.getElementById("changed").value
        var idOfChangedName = document.getElementById(nameId).innerHTML = val2

        $.ajax({
          url:"http://localhost:3000/api/update?oldName=" + nameId + "&newName=" + val2 + "&newBreed=" + val1,
          type:"GET",
          success: function(){
            console.log("success")
          }
          })
     }
  })
}
