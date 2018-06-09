function addTabHolder() {
    var mainContend = document.getElementById("mainContent");
    var fragment = document.createElement("div");

    fragment.className = "tabHolder";

    var tabIndicatorHolder = document.createElement("div");
    tabIndicatorHolder.className = "tabIndicatorHolder";

    var gameTabIndi = document.createElement("div");
    gameTabIndi.className = "game";
    gameTabIndi.innerText = "Game";

    tabIndicatorHolder.appendChild(gameTabIndi);

    var tabToolbar = document.createElement("div");
    tabToolbar.className = "tabToolbar";
    var btnAddGame = document.createElement("button");
    btnAddGame.textContent = "+ Game";
    var btnAddGear = document.createElement("button");
    btnAddGear.textContent = "+ Gear";
    tabToolbar.appendChild(btnAddGame);
    tabToolbar.appendChild(btnAddGear);

    var tabContentHolder = document.createElement("tabContentHolder");
    tabContentHolder.className = "tabContentHolder";

    var tab = document.createElement("div");
    tab.className = "tab";

    var itemHolder = document.createElement("div");
    itemHolder.className = "itemHolder";
    for (var i = 0; i < 8; i++) {
        var item = document.createElement("div");
        item.className = "item";
        itemHolder.appendChild(item);
    }

    tab.appendChild(itemHolder);
    tabContentHolder.appendChild(tab);

    fragment.appendChild(tabIndicatorHolder);
    fragment.appendChild(tabToolbar);
    fragment.appendChild(tabContentHolder);

    mainContend.appendChild(fragment);
}

var tabCount = 1;
addTab(0, "fragment1tabIndicatorHolder");
addTab(1, "fragment1tabIndicatorHolder");

function addTab(type, tabIndicatorHolder) {
    var tabIndicatorHolder = document.getElementById(tabIndicatorHolder);
    var tabIndicator = document.createElement("div");
    tabIndicator.className = (type == 0) ? "gameTabIndicator tabIndicator" : "gearTabIndicator tabIndicator";
    tabIndicator.textContent = (type == 0) ? "Game" : "Gear";
    var a = document.createElement("a");
    var i = document.createElement("i");
    i.className = "icon ion-md-close";

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

    tabCount++;
}

setUpItemEvent();
var gamesInCompareTab = false;
function setUpItemEvent() {
    var items = document.getElementsByClassName("item");
    for (var i = 0; i < items.length; i++) {
        var button = items[i].childNodes[1];
        if (button != null) {
            button.onclick = function () {
                var games = document.getElementById("games");
                var game = document.createElement("div");
                game.textContent = this.parentElement.nodeName;
                games.appendChild(game);
                gamesInCompareTab = true;
                if (gamesInCompareTab) {
                    var compareTab = document.getElementById("compareTab");
                    compareTab.style.bottom = "0px";
                    compareTab.style.transitionDuration = "0.5s";
                }
            }
        }
        items[i].onmouseenter = function () {
            var btn = this.childNodes[1];
            if (btn != null) {
                btn.style.visibility = "visible";
            }
        };
        items[i].onmouseleave = function () {
            var btn = this.childNodes[1];
            if (btn != null) {
                btn.style.visibility = "hidden";
            }
        };
    }
}
var lastTab = null;
changeTab("tab1");
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
        }
    }

    ev.stopPropagation();
}