var inputName = document.getElementById("name");
var inputUrl = document.getElementById("url");

var regex = /^(https?:\/\/)?(www\.)?[a-zA-Z0-9\-]+(\.[a-zA-Z]{2,})(\/.*)?$/;

///^(https?:\/\/)?(www\.)?([a-zA-Z0-9\-]+\.)+[a-zA-Z]{2,}(\:[0-9]{1,5})?(\/.*)?$/

websiteList = [];

if (localStorage.getItem("websiteList") !== null) {
  websiteList = JSON.parse(localStorage.getItem("websiteList"));
  display();
}

function addWebsite() {
  website = {
    name: inputName.value,
    url: inputUrl.value,
  };

  if (regex.test(website.url)) {
    websiteList.push(website);
    localStorage.setItem("websiteList", JSON.stringify(websiteList));
    display();
    clear();
  } else {
    alert("Please enter a valid URL (e.g., https://example.com)");
  }
}

function clear() {
  inputName.value = null;
  inputUrl.value = null;
}

function display() {
  var cartona = "";
  for (var i = 0; i < websiteList.length; i++) {
    cartona += `
            <tr>
                    <td>${i + 1}</td>
                    <td>${websiteList[i].name}</td>
                    <td><button onclick="visit(${i})" class="visit">Visit</button></td>
                    <td><button onclick="deleteItem(${i})" class="delete">Delete</button></td>
                </tr>
          `;
  }

  document.getElementById("tbody").innerHTML = cartona;
}

function deleteItem(index) {
  websiteList.splice(index, 1);
  localStorage.setItem("websiteList", JSON.stringify(websiteList));
  display();
}

function visit(index) {
  var urlvisit = websiteList[index].url;

  if (urlvisit) {
    window.open(urlvisit, "-blank");
  } else {
    alert("URL is not valid!");
  }
}
