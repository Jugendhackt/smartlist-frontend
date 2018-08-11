var ul = document.getElementById("overview");
function addlistItem(Text, edit) {
	if(edit != true && edit != false) edit = false;
	 var list = document.createElement("LI");
	 list.contentEditable  = edit;
    var textelement = document.createTextNode(Text);
    list.id = "li";
    list.appendChild(textelement);
    ul.appendChild(list);
}

 document.addEventListener('click', function(e) {
    e = e || window.event;
    target = e.target || e.srcElement; 
    if(target.id == "li") target.textContent = prompt('Please enter the Item');
 });