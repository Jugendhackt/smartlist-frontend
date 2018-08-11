var ul = document.getElementById("overview");

//copy from https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
function makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

function addrequest(Text) {
return makeid();
}

function changerequest(Text) {
	
}

function addlistItem(Text, edit) {
	if(edit != true && edit != false) edit = false;
	 var list = document.createElement("LI");
    var textelement = document.createTextNode(Text);

    list.appendChild(textelement);
    ul.appendChild(list);
    list.addEventListener('click', function(e) {
    	list.textContent = prompt('Please enter the Item', list.textContent);
 });
    if(!edit) {
    list.id = addrequest(Text);
    }else{
    	changerequest();
    } 
}
