var home = true;
var serverIp = "http://192.168.21.174:3000";
var listID = -1;

function homeUpdate() {
  document.getElementById("back").style.visibility = home ? "hidden" : "visible";
  document.getElementsByClassName("additem")[0].style.display = home ? "none" : "";
}

function add() {
  var t = prompt('Please enter the Item');
  if(t) addlistItem(t,true,true,"kategorie");
}

function sendRequest(website, text, element, methode, category) {
  let request = new XMLHttpRequest();
  request.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      json = this.responseText;
      if(element !== null) {
        json = JSON.parse(json);
        element.id = json.id;
        element.childNodes[4].textContent = "["+json.entry.category+"]";
        element.childNodes[6].textContent = json.entry.text;
      }
    }
  };
  request.open(methode, website, true);
  request.setRequestHeader("Content-Type", "application/json");
  request.send(JSON.stringify({entry:{text:text, category:category}}));
}

function removeElement(element) {
  if(element) {
    console.log(element);
    sendRequest(serverIp+"/lists/"+listID+"/entries/"+element.id+"/delete", "delete", null,"DELETE");
    element.parentNode.removeChild(element);
  }
}

function loadLists(website) {
  let request = new XMLHttpRequest();
  request.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      json = this.responseText;
      json = JSON.parse(json);
      emptyList();
      for(let list of json.lists)
        addlistItem(list.title,false,false).id=list.id;
    }
  };
  request.open("GET", website, true);
  request.send();
}

function back() {
  home = true;
  homeUpdate();
  emptyList();
  setTitle("Übersicht");
  loadLists(serverIp+'/user/lists');
}

function loadEntries(website) {
  home = false;
  homeUpdate();
  let request = new XMLHttpRequest();
  request.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      json = this.responseText;
      json = JSON.parse(json);
      emptyList();
      for(let entry of json.entries)
        addlistItem(entry.text,false,true,entry.category).id=entry.id;
    }
  };
  request.open("GET", website, true);
  request.send();
}

function emptyList(){
  var ul = document.getElementsByClassName("overview")[0];
  while (ul.firstChild)
    ul.removeChild(ul.firstChild);
}

function addlistItem(text, send, isEntry, category) {
  var ul = document.getElementsByClassName("overview")[0];
  var li = document.createElement("li");


  if(isEntry) {
    li.innerHTML = '<p class="btn">✎</p>&nbsp;<p class="btn">∅</p>&nbsp;<p></p>&nbsp<p></p>';
    li.childNodes[6].innerText = text;
    li.childNodes[4].innerText = "["+category+"]";
    function edit() {
      console.log(this.parentNode.id);
      var t = prompt('Please enter the Item', li.childNodes[6].textContent);
      if(t) {
        li.childNodes[6].innerText = t;
        sendRequest(serverIp+"/lists/"+listID+"/entries/"+li.id+"/edit", li.childNodes[6].textContent, null, "PUT");
      } else if(t !== null){
        removeElement(li);
      }
    }

    li.childNodes[0].addEventListener('click', edit);
    li.childNodes[6].addEventListener('click', edit);
    li.childNodes[2].addEventListener('click', function(){removeElement(li)});
  } else {
    li.innerHTML = '<p class="btn">&gt;</p>&nbsp;<p></p>';
    li.childNodes[2].innerText = text;
    function load() {
      setTitle(li.childNodes[2].innerText)
      emptyList()
      loadEntries(serverIp+"/lists/"+li.id);
      listID = li.id;
    };
    li.childNodes[0].addEventListener('click', load);
    li.childNodes[2].addEventListener('click', load);
  }
  
  ul.appendChild(li);

  if(send) sendRequest(serverIp+"/lists/"+listID+"/entries/add", text, li, "POST");
  return li;
}

function setTitle(title){
  e = document.getElementById("title");
  e.textContent=title;
}

