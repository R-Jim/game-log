// function addTabHolder() {
//     var mainContend = document.getElementById("mainContent");
//     var fragment = document.createElement("div");

//     fragment.className = "tabHolder";

//     var tabIndicatorHolder = document.createElement("div");
//     tabIndicatorHolder.className = "tabIndicatorHolder";

//     var gameTabIndi = document.createElement("div");
//     gameTabIndi.className = "game";
//     gameTabIndi.innerText = "Game";

//     tabIndicatorHolder.appendChild(gameTabIndi);

//     var tabToolbar = document.createElement("div");
//     tabToolbar.className = "tabToolbar";
//     var btnAddGame = document.createElement("button");
//     btnAddGame.textContent = "+ Game";
//     var btnAddGear = document.createElement("button");
//     btnAddGear.textContent = "+ Gear";
//     tabToolbar.appendChild(btnAddGame);
//     tabToolbar.appendChild(btnAddGear);

//     var tabContentHolder = document.createElement("tabContentHolder");
//     tabContentHolder.className = "tabContentHolder";

//     var tab = document.createElement("div");
//     tab.className = "tab";

//     var itemHolder = document.createElement("div");
//     itemHolder.className = "itemHolder";
//     for (var i = 0; i < 8; i++) {
//         var item = document.createElement("div");
//         item.className = "item";
//         itemHolder.appendChild(item);
//     }

//     tab.appendChild(itemHolder);
//     tabContentHolder.appendChild(tab);

//     fragment.appendChild(tabIndicatorHolder);
//     fragment.appendChild(tabToolbar);
//     fragment.appendChild(tabContentHolder);

//     mainContend.appendChild(fragment);
// }

var lastTab = null;
var tabCount = 1;
addTab(0, "fragment1tabIndicatorHolder");
addTab(1, "fragment1tabIndicatorHolder");

function addTab(type, tabIndicatorHolder) {
    var tabIndicatorHolder = document.getElementById(tabIndicatorHolder);
    var tabIndicator = document.createElement("div");
    tabIndicator.className = (type == 0) ? "gameTabIndicator tabIndicator" : "gearTabIndicator tabIndicator";
    tabIndicator.textContent = (type == 0) ? "Game" : "Gear";
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

    tabIndicatorHolder.appendChild(tabIndicator);
    if (lastTab == null) {
        changeTab(tabIndicator.id.substring(0, tabIndicator.id.length - 9));
    }
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
                    this.parentElement.addEventListener('animationend', function (evt) { this.remove(); });
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
    if(visible == "hidden" || visible=="") {
        cmpScreen.style.visibility =  "visible";
        cmpScreen.style.opacity = 1;
    }else{
        cmpScreen.style.visibility =  "hidden";
        cmpScreen.style.opacity = 0;
    }
}
