var ul = document.getElementById("overview");
function addlistItem(Text) {
	 var list = document.createElement("LI");
    var textelement = document.createTextNode(Text);
    list.appendChild(textelement);
    ul.appendChild(list);
}
addlistItem("Test Text");