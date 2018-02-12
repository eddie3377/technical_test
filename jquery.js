/*eslint-env browser*/
/*eslint "no-console": "off"*/
/*eslint "no-undef": "off"*/
/*global $*/

function getUserInfo(data) {
    var outcome = document.getElementById("results");
    var username = document.getElementById("name").value;
    var table = document.getElementById("table");
    results.innerHTML = "";
    table.innerHTML = "";


   $.getJSON("https://api.github.com/users/" + username, function call1(data) {
       infoUser(data)

       $.getJSON("https://api.github.com/users/" + username + "/repos", function call2(data2) {
           minTable(data2)
       });
    }).fail(function () {

        var notFound = document.createElement("div");

        notFound.append("Username not found");
             //Messsage styling   
        notFound.style.background = "#FFB7B7";
        notFound.style.marginTop = 10 + "px";
        notFound.style.marginLeft = 29 + "px";
        notFound.style.padding = 5 + "%";
        notFound.style.width = 78 + "%";
        notFound.style.borderRadius = 5 + "px";
        notFound.style.opacity = 0.6;
        notFound.style.color = "darkred";
        notFound.style.fontWeight = "bold";

        results.append(notFound);

    });
}

function infoUser(data) {
    var username = document.getElementById("name");
    var outcome = document.getElementById("results");

    var endUser = document.createElement("img");
    endUser.setAttribute("src", data.avatar_url);
    endUser.setAttribute("class", "avatar");
    var endUserHolder = document.createElement("div")
    endUserHolder.setAttribute("class", "information");

    var endUser2 = document.createElement("p");
    endUser2.setAttribute("class", "user");
    var endUser3 = document.createElement("p");
    endUser3.setAttribute("class", "fullName");
    var endUser4 = document.createElement("p");
    endUser4.setAttribute("class", "biog");


    if (data.login != null) {
        endUser2.append(data.login);

        if (data.name != null) {
            endUser3.append(data.name);
        }
        if (data.bio != null) {
            endUser4.append(data.bio);
        }

        endUserHolder.append(endUser2);
        endUserHolder.append(endUser3);
        endUserHolder.append(endUser4);

        results.append(endUser);
        results.append(endUserHolder);

        username.value = "";
    }

}

var button = document.getElementById("button");
button.addEventListener("click", getUserInfo)

function minTable(data2) {
    var table = document.getElementById("table");
    var tHead = document.createElement("h3");
    tHead.innerHTML = "Repositories";
    tHead.setAttribute("class", "repositories");
    table.append(tHead);

    for (var i = 0; i < data2.length; i++) {
        var tr = document.createElement("tr");
        var td = document.createElement("td");
        var td1 = document.createElement("td");
        var td2 = document.createElement("td");

        td.append(data2[i].name);
        td1.innerHTML = '<img src="images/star.png">' + data2[i].stargazers_count;
        td2.innerHTML = '<img src="images/fork.png">' + data2[i].forks_count;

        tr.append(td);
        tr.append(td1);
        tr.append(td2);

        table.append(tr);

    }

}