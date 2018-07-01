// traversalDOMTree("GET","http://localhost:8080/game/category","//*[local-name()='category']");

function traversalDOMTree(method, url, parseFunction, tabId) {
    var xhttp = new XMLHttpRequest();
    console.log(url);
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var doc = this.responseXML;
            parseFunction(doc, tabId);
        }
    };
    xhttp.open(method, url, false);
    xhttp.send();
}

function printCategoryData(doc, tabId) {
    var result = doc.getElementsByTagName("category");

    var tabContent = document.getElementById(tabId + "DropSrch");

    for (var i = 0; i < result.length; i++) {
        var id = result[i].getAttribute("id");
        var name = result[i].childNodes[0].nodeValue;

        var option = document.createElement("option");
        option.value = id;
        option.label = name;
        tabContent.appendChild(option);
    }
};

function printGameData(doc, tabId) {
    var result = doc.getElementsByTagName("game");

    var tabContent = document.getElementById(tabId + "Content");
    var itemList = tabContent.getElementsByClassName("itemList")[0];

    for (var i = 0; i < result.length; i++) {
        var imgSrc = result[i].getAttribute("img");
        var itemName = result[i].getAttribute("name");
        var itemPrice = result[i].getElementsByTagName("price")[0].nodeValue;

        newItem(itemList, imgSrc, itemName, null, itemPrice);
    }
}

function newItem(itemList, imgSrc, itemName, itemType, itemPrice) {
// <div class="item" id="10">
//         <div class="btnCompare">
//         <div class="tri"></div>
//         <div class="icon"> So sánh</div>
//     </div>
//     <div class="itemImg">
//         <span class="imgHelper"></span>
//         <img src="D:\Memes\21768216_364241094010983_1496368460535907350_n.jpg" />
//         </div>
//         <div class="itemName">Gunbound</div>
//         <div class="itemType">Turn-based</div>
//         <div class="itemPrice">20.00 $</div>
//     </div>
    var item = document.createElement("div");
    item.className = "item";

    var btnCompare = document.createElement("div");
    btnCompare.className = "btnCompare";
    var tri = document.createElement("div");
    tri.className = "tri";
    var icon = document.createElement("div");
    icon.className = "icon";
    icon.textContent = "So Sánh";
    btnCompare.appendChild(tri);
    btnCompare.appendChild(icon);
    item.appendChild(btnCompare);

    var itemImg = document.createElement("div");
    itemImg.className = "itemImg";
    var imgHelper = document.createElement("span");
    imgHelper.className = "imgHelper";
    var img = document.createElement("img");
    img.src = imgSrc;
    itemImg.appendChild(imgHelper);
    itemImg.appendChild(img);
    item.appendChild(itemImg);

    var name = document.createElement("div");
    name.className = "itemName";
    name.textContent = itemName;
    item.appendChild(name);

    var price = document.createElement("div");
    price.className = "itemPrice";
    price.textContent = itemPrice;
    item.appendChild(price);

    itemList.appendChild(item);
}

function loadMore(element, url) {
    var id = element.id.substring(0, element.id.length - 8);
    var currentPage = document.getElementById(id + "CurrentPage");
    currentPage.value = +currentPage.value + 1;

    var categoryId = document.getElementById(id + "DropSrch").value;
    var categoryUrl = (categoryId == "null") ? "" : "&categoryId=" + categoryId;
    traversalDOMTree("GET", url + "?currentPage=" + currentPage.value + categoryUrl, printGameData, id);
}

function sortByCategory(element, url) {

    var id = element.id.substring(0, element.id.length - 8);
    var categoryId = element.value;

    var tabContent = document.getElementById(id + "Content");
    var itemList = tabContent.getElementsByClassName("itemList")[0];
    itemList.innerHTML = "";

    traversalDOMTree("GET", url + "?categoryId=" + categoryId, printGameData, id);
}


var lastTab = null;
var tabCount = 1;
addTab(0, "tabIndicatorHolder");
addTab(1, "tabIndicatorHolder");

function addTab(type, tabIndicatorHolder) {
    var tabIndicatorHolder = document.getElementById(tabIndicatorHolder);
    var tabIndicator = document.createElement("div");
    tabIndicator.className = (type == 0) ? "gameTabIndicator tabIndicator" : "gearTabIndicator tabIndicator";

    var indicator = document.createElement("ion-icon");
    indicator.name = (type == 0) ? "logo-game-controller-a" : "tv";
    indicator.className = "indicatorIndicator";

    tabIndicator.appendChild(indicator);

    var span = document.createElement("span");
    span.textContent = (type == 0) ? "Game" : "Gear";
    tabIndicator.appendChild(span);

    var a = document.createElement("a");
    var i = document.createElement("ion-icon");
    i.name = "close";
    a.appendChild(i);
    a.id = "tab" + tabCount;
    a.onclick = function (ev) {
        closeTab(ev, this.id);
    }

    tabIndicator.id = "tab" + tabCount + "Indicator";
    tabIndicator.appendChild(a);
    tabIndicator.onclick = function () {
        var id = this.id.substring(0, this.id.length - 9);
        changeTab(id);
    }

    // tabIndicatorHolder.appendChild(tabIndicator);
    tabIndicatorHolder.insertBefore(tabIndicator, tabIndicatorHolder.childNodes[tabIndicatorHolder.childNodes.length - 2]);
    if (lastTab == null) {
        changeTab(tabIndicator.id.substring(0, tabIndicator.id.length - 9));
    }
    var currentPage = document.getElementById(tabIndicator.id.substring(0, tabIndicator.id.length - 9) + "CurrentPage");
    currentPage.value = 1;
    traversalDOMTree("GET", "http://localhost:8080/game", printGameData, tabIndicator.id.substring(0, tabIndicator.id.length - 9));
    traversalDOMTree("GET", "http://localhost:8080/game/category", printCategoryData, tabIndicator.id.substring(0, tabIndicator.id.length - 9));

    tabCount++;
}

setUpItemEvent();
var cmpUp = false;

var gamesInCompareTab = false;

function setUpItemEvent() {
    var items = document.getElementsByClassName("item");
    for (var i = 0; i < items.length; i++) {
        var button = items[i].childNodes[1];
        if (button != null) {
            button.onclick = function () {
                var item = this.parentElement;
                var isGame = this.parentElement.parentElement.parentElement.className.includes("gameList");

                var list = (isGame) ? document.getElementById("games") : document.getElementById("gears");
                var itemInCmpList = list.childNodes;

                for (var i = 0; i < itemInCmpList.length; i++) {
                    if (item.id == itemInCmpList[i].id) {
                        return;
                    }
                }


                var cmpItem = document.createElement("div");
                cmpItem.className = "cmpItem";
                cmpItem.id = item.id;
                cmpItem.className = (isGame) ? "cmpGame cmpItem" : "cmpGear cmpItem";

                var cmpListType = (isGame) ? document.getElementById("games") : document.getElementById("gears");

                var image = document.createElement("div");
                image.innerHTML = item.childNodes[3].innerHTML;
                image.className = "cmpItemImg";

                var cmpItemName = document.createElement("div");
                cmpItemName.textContent = item.childNodes[5].textContent;

                var removeButton = document.createElement("button");
                removeButton.id = "removeCmpItemButton";
                removeButton.textContent = "x";
                removeButton.onclick = function () {
                    this.parentElement.removeEventListener('animationend', null);
                    this.parentElement.style.minWidth = "0";
                    var node = this.parentElement.parentElement.children[0];
                    this.parentElement.classList.add((this.parentElement.id == node.id) ? "cmpItem-remove-first" : "cmpItem-remove");
                    this.parentElement.addEventListener('animationend', function (evt) {
                        this.remove();
                    });
                }
                cmpItem.addEventListener('animationend', function (evt) {
                    this.style.minWidth = "100px";
                    this.parentElement.scrollLeft = this.parentElement.scrollWidth - this.parentElement.clientWidth;
                    checkScrollBtn(this.parentElement);
                });
                cmpItem.appendChild(removeButton);
                cmpItem.appendChild(image);
                cmpItem.appendChild(cmpItemName);

                cmpListType.appendChild(cmpItem);
                gamesInCompareTab = true;
                if (gamesInCompareTab) {
                    var compareTab = document.getElementById("compareTab");
                    compareTab.style.bottom = "0px";
                    compareTab.style.transitionDuration = "0.5s";
                    cmpUp = true;
                }
            }
        }
    }
}

function changeTab(tabId) {

    if (lastTab == tabId) {
        return;
    }
    if (lastTab != null) {
        var lastTabContent = document.getElementById(lastTab + "Content");
        if (lastTabContent != null) {
            lastTabContent.style.visibility = "hidden";
            lastTabContent.style.display = "none";
        }
        var lastTabIndicator = document.getElementById(lastTab + "Indicator");
        if (lastTabIndicator != null) {
            var lastTabclass = lastTabIndicator.className.includes(("gameTabIndicator")) ? "gameTabIndicator" : "gearTabIndicator";
            lastTabIndicator.classList.remove(lastTabclass + "-active");
            lastTabIndicator.classList.add(lastTabclass);
        }
    }


    var tabIndicator = document.getElementById(tabId + "Indicator");
    var tabClass = tabIndicator.className.includes(("gameTabIndicator")) ? "gameTabIndicator" : "gearTabIndicator";
    tabIndicator.classList.remove(tabClass);
    tabIndicator.classList.add(tabClass + "-active");

    var tabContent = document.getElementById(tabId + "Content");
    if (tabContent != null) {
        tabContent.style.visibility = "visible";
        tabContent.style.display = "block";
    }
    lastTab = tabId;
}

function closeTab(ev, tabId) {
    var tabIndicator = document.getElementById(tabId + "Indicator");
    tabIndicator.remove();

    var tabContent = document.getElementById(tabId + "Content");
    if (tabContent != null) {
        tabContent.remove();
    }

    if (lastTab == tabId) {
        var tabIndicators = document.getElementsByClassName("tabIndicator");
        var tabIndicator = tabIndicators[0];
        if (tabIndicator != null) {
            var tabClass = tabIndicator.className.includes(("gameTabIndicator")) ? "gameTabIndicator" : "gearTabIndicator";
            tabIndicator.classList.remove(tabClass);
            tabIndicator.classList.add(tabClass + "-active");
            lastTab = tabIndicator.id.substr(0, tabIndicator.id.length - 9);
            var tabContent = document.getElementById(lastTab + "Content");
            if (tabContent != null) {
                tabContent.style.visibility = "visible";
                tabContent.style.display = "block";
            }
        } else {
            lastTab = null;
        }
    }

    ev.stopPropagation();
}

setUpCompareTabEvent();

function setUpCompareTabEvent() {
    var btnHide = document.getElementById("btnHideCompareTab");
    btnHide.onclick = function () {
        var compareTab = document.getElementById("compareTab");
        compareTab.style.bottom = (cmpUp) ? "-100px" : "0px";
        compareTab.style.transitionDuration = "0.5s";
        cmpUp = !cmpUp;
    }
}

function moveIt(id, moveLeft) {
    var holder = document.getElementById(id);
    var moveTo = (moveLeft) ? -110 : 110;
    holder.scrollLeft = holder.scrollLeft + moveTo;
    checkScrollBtn(holder);
}

function checkScrollBtn(holder) {
    setTimeout(function () {
        var maxLeft = 0;
        var maxRight = holder.scrollWidth - holder.clientWidth;

        var cmpDirection = holder.parentElement;
        var btnMovLeft = cmpDirection.getElementsByClassName("left")[0];
        var btnMovRight = cmpDirection.getElementsByClassName("right")[0];
        btnMovLeft.style.visibility = "visible";
        btnMovRight.style.visibility = "visible";

        if (holder.scrollLeft == maxLeft) {
            btnMovLeft.style.visibility = "hidden";
        }
        if ((holder.scrollLeft > maxRight - 1 && holder.scrollLeft < maxRight)
            || holder.scrollLeft == maxRight) {
            btnMovRight.style.visibility = "hidden";
        }
    }, 100);
}

function compareScreenPopUp() {
    var cmpScreen = document.getElementById("compareScreen");
    var visible = cmpScreen.style.visibility;
    if (visible == "hidden" || visible == "") {
        cmpScreen.style.visibility = "visible";
        cmpScreen.style.opacity = 1;
    } else {
        cmpScreen.style.visibility = "hidden";
        cmpScreen.style.opacity = 0;
    }
}

