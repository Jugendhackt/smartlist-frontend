var json = " ";
//copy from https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
function makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}




function sendRequest(website, Text, element, methode) {
let request = new XMLHttpRequest();
  request.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
    	json = this.responseText;
    	json = JSON.parse(json);
    	console.log(json);
    	console.log(json["id"]);
      element.id = json["id"];
    }
  };
  request.open(methode, website, true);
  request.setRequestHeader("Content-Type", "application/json");
  request.send(JSON.stringify({entry:{text:Text, category:"Der Himmel ist Blau .ung if bim schlau"}}));
}


function addlistItem(Text) {
	var ul = document.getElementById("overview");
	 var list = document.createElement("LI");
    var textelement = document.createTextNode(Text);

    list.appendChild(textelement);
    ul.appendChild(list);
    list.addEventListener('click', function(e) {
    	list.textContent = prompt('Please enter the Item', list.textContent);
    	sendRequest("http://192.168.21.160:3000/lists/0/entries/"+list.id+"/edit", list.textContent, list, "PUT");
    });
    sendRequest("http://192.168.21.160:3000/lists/0/entries/add", Text, list, "POST");
}

