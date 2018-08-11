var ul = document.getElementById("overview");
function addlistItem(Text, edit) {
	if(edit != true && edit != false) edit = false;
	 var list = document.createElement("LI");
	 list.contentEditable  = edit;
    var textelement = document.createTextNode(Text);
    list.appendChild(textelement);
    ul.appendChild(list);
}
addlistItem("Test Text", true);