var home = true;
var listID = -1;


function toggle(className, displayState){
  console.log("hidden1");
    var elements = document.getElementsByClassName(className);
    for (var i = 0; i < elements.length; i++){
        elements[i].style.visibility = displayState;
    }
}

function showhome() {
  console.log("Home Update");
  if(!home)  toggle('additem', 'visible');
  if(home)toggle('additem', 'hidden');
}

function removeElement(element) {
  element.parentNode.removeChild(element);
}

function add() {
	var t = prompt('Please enter the Item');
	if(t) addlistItem(t,true,true);
}
function sendRequest(website, Text, element, methode) {
let request = new XMLHttpRequest();
  request.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
    	json = this.responseText;
    	json = JSON.parse(json);
    	if(element !== null) {
      	element.id = json.id;
      	element.textContent = json.entry.text;
	}
    }
  };
  request.open(methode, website, true);
  request.setRequestHeader("Content-Type", "application/json");
  request.send(JSON.stringify({entry:{text:Text, category:"Der Himmel ist Blau .ung if bim schlau"}}));
}

function loadLists(website) {
let request = new XMLHttpRequest();
  request.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
    	json = this.responseText;
    	json = JSON.parse(json);
    	console.log(json);
	for(let list of json.lists)
		addlistItem(list.title,false,false).id=list.id;
     }
  };
  request.open("GET", website, true);
  request.send();
}

function loadEntries(website) {
  home = false;
showhome();
let request = new XMLHttpRequest();
  request.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
    	json = this.responseText;
    	json = JSON.parse(json);
    	console.log(json);
	for(let entry of json.entries)
		addlistItem(entry.text,false,true).id=entry.id;
     }
  };
  request.open("GET", website, true);
  request.send();
}

function emptyList(){
	var ul = document.getElementsByClassName("overview")[0];
	while (ul.firstChild) {
    		ul.removeChild(ul.firstChild);
}}

function addlistItem(Text, send, isEntry) {
	var ul = document.getElementsByClassName("overview")[0];
	 var list = document.createElement("LI");
    var textelement = document.createTextNode(Text);

    list.appendChild(textelement);
    ul.appendChild(list);
	if(isEntry){
	    list.addEventListener('click', function(e) {
	    var t = prompt('Please enter the Item', list.textContent);
    	    if(t) {
    	      list.textContent = t;
      	    sendRequest("http://192.168.21.160:3000/lists/"+listID+"/entries/"+list.id+"/edit", list.textContent, null, "PUT");
          }else if(t !== null){
            console.log("Bool");
            removeElement(list);
            }
	    });
	}else{
	    list.addEventListener('click', function(e) {
	    setTitle(list.innerText)
	    emptyList()
       	    loadEntries("http://192.168.21.160:3000/lists/"+list.id);
        listID = list.id;
	});
	}
	
    if(send)sendRequest("http://192.168.21.160:3000/lists/"+listID+"/entries/add", Text, list, "POST");
	return list;
}

function setTitle(title){

e=document.getElementById("title");
e.innerHTML=title;

}

