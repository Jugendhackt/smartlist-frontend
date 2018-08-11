var ul = document.getElementById("overview");

//copy from https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
function makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}


function addlistItem(Text, edit, id) {
	if(edit != true && edit != false) edit = false;
	 var list = document.createElement("LI");
	 list.contentEditable  = edit;
    var textelement = document.createTextNode(Text);
    list.id = makeid();

    list.appendChild(textelement);
    ul.appendChild(list);
    list.addEventListener('click', function(e) {
    list.textContent = prompt('Please enter the Item');
 });
}
