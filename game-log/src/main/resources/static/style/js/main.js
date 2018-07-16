// traversalDOMTree("GET","http://localhost:8080/game/category","//*[local-name()='category']");
var url =
    ['http://localhost:8080/game', 'http://localhost:8080/gear']
;

//Start traversal

function createElementWithClassName(name, className) {
    var element = document.createElement(name);
    element.className = className;
    return element;
}

function traversalDOMTree(method, url, parseFunction, tabId) {
    var xhttp = new XMLHttpRequest();
    console.log(url);
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            //Because of this shit always losing data
            var doc = this.responseXML;
            //That is why
            //Magic need to happen
            var magicArray = [];
            for (var i = 0; i < doc.childNodes[0].childNodes.length; i++) {
                //dont know why but it works
                //Please work
                magicArray.push(doc.childNodes[0].childNodes[i]);
            }
            parseFunction(magicArray, tabId);

        }
    };
    xhttp.open(method, url, true);
    xhttp.send();
}

function printCategoryData(magicArray, tabId) {

    var tabContent = document.getElementById(tabId + "DropSrch");

    for (var i = 0; i < magicArray.length; i++) {
        var category = magicArray[i];
        var id = category.getAttribute("id");
        var name = category.childNodes[0].nodeValue;

        var option = document.createElement("option");
        option.value = id;
        option.label = name;
        tabContent.appendChild(option);
    }
}

var gameArray = [];
var gearArray = [];

function filteringdata(name, tabId, type) {
    if (type === 0) {
        filteringGamedata(name, tabId, type);
    } else {
        filteringGeardata(name, tabId, type);
    }
}


function filteringGamedata(name, tabId, type) {
    var magicArray = null;
    for (var j = 0; j < gameArray.length; j++) {
        if (gameArray[j][0].trim() === tabId.trim()) {
            magicArray = gameArray[j][1];
            break;
        }
    }
    if (magicArray != null) {
        var tabContent = document.getElementById(tabId + "Content");
        var itemList = tabContent.getElementsByClassName("itemList")[0];
        itemList.innerHTML = "";
        var btnLoadMore = createElementWithClassName("button", "btnLoadMore item");
        btnLoadMore.id = tabId + "LoadMore";
        btnLoadMore.textContent = "Xem thêm";
        btnLoadMore.onclick = function () {
            filteringGamedata(name, tabId, type);
            loadMore(this, url[type], type);
        };
        itemList.appendChild(btnLoadMore);
        for (var i = 0; i < magicArray.length; i++) {
            var game = magicArray[i];
            var itemName = game.getAttribute("name");
            if (itemName.toLowerCase().includes(name.toLowerCase())) {
                var itemId = game.getAttribute("id");
                var imgSrc = game.getAttribute("img");
                var x = game.getElementsByTagName("price")[0].childNodes[0];
                var itemPrice = "";
                if (x != null) {
                    itemPrice = x.nodeValue;
                }
                var tags = game.getElementsByTagName("tags")[0];

                newItem(tabId, itemList, "A" + itemId, imgSrc, itemName, 0, itemPrice, tags);
            }
        }
    }
}

function filteringGeardata(name, tabId, type) {
    var magicArray = null;
    for (var j = 0; j < gearArray.length; j++) {
        if (gearArray[j][0].trim() === tabId.trim()) {
            magicArray = gearArray[j][1];
            break;
        }
    }
    if (magicArray != null) {
        var tabContent = document.getElementById(tabId + "Content");
        var itemList = tabContent.getElementsByClassName("itemList")[0];
        itemList.innerHTML = "";
        var btnLoadMore = createElementWithClassName("button", "btnLoadMore item");
        btnLoadMore.id = tabId + "LoadMore";
        btnLoadMore.textContent = "Xem thêm";
        btnLoadMore.onclick = function () {
            filteringGamedata("", tabId, type);
            loadMore(this, url[type], type);
        };
        itemList.appendChild(btnLoadMore);
        for (var i = 0; i < magicArray.length; i++) {
            var gear = magicArray[i];
            var itemName = gear.getElementsByTagName("name")[0].childNodes[0].nodeValue;
            if (itemName.toLowerCase().includes(name.toLowerCase())) {

                var itemId = gear.getAttribute("id");
                var imgSrc = gear.getAttribute("img");
                var x = gear.getElementsByTagName("price")[0].childNodes[0];
                var itemPrice = "";
                if (x != null) {
                    itemPrice = x.nodeValue;
                }
                newItem(tabId, itemList, "B" + itemId, imgSrc, itemName, 1, itemPrice);
            }
        }
    }
}


function printGameData(magicArray, tabId) {
    var existed = false;
    for (var j = 0; j < gameArray.length; j++) {
        if (gameArray[j][0] === tabId) {
            gameArray[j][1] = gameArray[j][1].concat(magicArray);
            existed = true;
            break;
        }
    }
    if (!existed) {
        gameArray.push([tabId, magicArray]);
    }
    var tabContent = document.getElementById(tabId + "Content");
    var itemList = tabContent.getElementsByClassName("itemList")[0];
    if (magicArray.length === 0) {
        document.getElementById(tabId + "LoadMore").remove();
        var noMoreContent = createElementWithClassName("div", "noMoreContent");
        noMoreContent.innerHTML = "<span>Không còn</span><br/><span>kết quả</span>";
        itemList.appendChild(noMoreContent);
    }

    for (var i = 0; i < magicArray.length; i++) {
        var game = magicArray[i];
        var itemId = game.getAttribute("id");
        var imgSrc = game.getAttribute("img");
        var itemName = game.getAttribute("name");
        var x = game.getElementsByTagName("price")[0].childNodes[0];
        var itemPrice = "";
        if (x != null) {
            itemPrice = x.nodeValue;
        }
        var tags = game.getElementsByTagName("tags")[0];

        newItem(tabId, itemList, "A" + itemId, imgSrc, itemName, 0, itemPrice, tags);
    }
}

function printGearData(magicArray, tabId) {
    var existed = false;
    for (var j = 0; j < gearArray.length; j++) {
        if (gearArray[j][0] === tabId) {
            gearArray[j][1] = gearArray[j][1].concat(magicArray);
            existed = true;
            break;
        }
    }
    if (!existed) {
        gearArray.push([tabId, magicArray]);
    }

    var tabContent = document.getElementById(tabId + "Content");
    var itemList = tabContent.getElementsByClassName("itemList")[0];
    if (magicArray.length === 0) {
        document.getElementById(tabId + "LoadMore").remove();
        var noMoreContent = createElementWithClassName("div", "noMoreContent");
        noMoreContent.innerHTML = "<span>Không còn</span><br/><span>kết quả</span>";
        itemList.appendChild(noMoreContent);
    }
    for (var i = 0; i < magicArray.length; i++) {
        var gear = magicArray[i];
        var itemId = gear.getAttribute("id");
        var imgSrc = gear.getAttribute("img");
        var itemName = gear.getElementsByTagName("name")[0].childNodes[0].nodeValue;
        var x = gear.getElementsByTagName("price")[0].childNodes[0];
        var itemPrice = "";
        if (x != null) {
            itemPrice = x.nodeValue;
        }
        newItem(tabId, itemList, "B" + itemId, imgSrc, itemName, 1, itemPrice);
    }
}


function newItem(tabId, itemList, itemId, imgSrc, itemName, itemType, itemPrice, tags) {
    var item = createElementWithClassName("div", "item");
    item.id = itemId;

    var btnCompare = createElementWithClassName("div", "btnCompare");
    var tri = createElementWithClassName("div", "tri");
    var icon = createElementWithClassName("div", "icon");
    icon.textContent = "So Sánh";
    btnCompare.appendChild(tri);
    btnCompare.appendChild(icon);
    btnCompare.onclick = function () {
        btnCompareEvent(this.parentElement);
    };

    item.appendChild(btnCompare);

    var btnDetail = createElementWithClassName("div", "btnDetail");
    btnDetail.id = itemId + "BtnDetail";

    var btnDetailIcon = createElementWithClassName("i", "icon ion-md-search btnDetailIcon");

    btnDetail.appendChild(btnDetailIcon);
    btnDetail.onclick = function (ev) {
        var position = (ev.pageX > 800) ? 0 : 1;
        showItemDetail(position, tabId);
        printItemDetail(itemType, tabId, item.id);
    };
    item.appendChild(btnDetail);

    var itemImg = createElementWithClassName("div", "itemImg");
    var imgHelper = createElementWithClassName("span", "imgHelper");
    var img = document.createElement("img");
    img.src = imgSrc;
    itemImg.appendChild(imgHelper);
    itemImg.appendChild(img);
    item.appendChild(itemImg);

    var name = createElementWithClassName("div", "itemName");
    name.textContent = itemName;
    item.appendChild(name);

    var price = createElementWithClassName("div", "itemPrice");
    price.innerHTML = (itemPrice === "" || itemPrice === "đ") ? "<span class='noResult'>Không thông tin</span>" : itemPrice;
    item.appendChild(price);

    var tagsUl = createElementWithClassName("ul", "itemTags");
    if (tags != null) {
        var tagArray = tags.getElementsByTagName("tag");
        for (var i = 0; i < tagArray.length; i++) {
            var tag = createElementWithClassName("li", "itemTag");
            tag.textContent = tagArray[i].childNodes[0].textContent;
            tagsUl.appendChild(tag);
        }
        item.appendChild(tagsUl);
    }

    itemList.insertBefore(item, itemList.getElementsByClassName("btnLoadMore")[0]);
}

function btnCompareEvent(element) {
    var isGame = element.parentElement.parentElement.className.includes("gameList");

    var list = (isGame) ? document.getElementById("games") : document.getElementById("gears");
    var itemInCmpList = list.childNodes;

    for (var i = 0; i < itemInCmpList.length; i++) {
        if (element.id === itemInCmpList[i].id) {
            return;
        }
    }


    var cmpItem = document.createElement("div");
    cmpItem.className = "cmpItem";
    cmpItem.id = element.id;
    cmpItem.className = (isGame) ? "cmpGame cmpItem" : "cmpGear cmpItem";

    var cmpListType = (isGame) ? document.getElementById("games") : document.getElementById("gears");

    var image = document.createElement("div");
    image.innerHTML = element.getElementsByClassName("itemImg")[0].innerHTML;
    image.className = "cmpItemImg";

    var cmpItemName = document.createElement("div");
    cmpItemName.className = "itemName";
    cmpItemName.textContent = element.getElementsByClassName("itemName")[0].textContent;

    var removeButton = document.createElement("button");
    removeButton.className = "removeCmpItemButton";
    removeButton.textContent = "x";
    removeButton.onclick = function () {
        this.parentElement.removeEventListener('animationend', null);
        this.parentElement.style.minWidth = "0";
        var node = this.parentElement.parentElement.children[0];
        this.parentElement.classList.add((this.parentElement.id === node.id) ? "cmpItem-remove-first" : "cmpItem-remove");
        this.parentElement.addEventListener('animationend', function () {
            this.remove();
        });
    };
    cmpItem.addEventListener('animationend', function () {
        this.style.minWidth = "100px";
        this.parentElement.scrollLeft = this.parentElement.scrollWidth - this.parentElement.clientWidth;
        // checkScrollBtn(this.parentElement);
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

function loadMore(element, url, type) {
    var id = element.id.substring(0, element.id.length - 8);
    var currentPage = document.getElementById(id + "CurrentPage");
    currentPage.value = +currentPage.value + 1;

    var nameLike = document.getElementById(id + "SearchLikeName").value;
    var nameUrl = (nameLike === "null") ? "" : "&nameLike=" + nameLike;
    var categoryId = document.getElementById(id + "DropSrch").value;
    var categoryUrl = (categoryId === "null") ? "" : "&categoryId=" + categoryId;
    var functionName = (type === 0) ? printGameData : printGearData;
    traversalDOMTree("GET", url + "?currentPage=" + currentPage.value + categoryUrl + nameUrl, functionName, id);
}

function sortByCategory(element, urlParam, type) {

    var id = element.id.substring(0, element.id.length - 8);
    var categoryId = element.value;

    var tabContent = document.getElementById(id + "Content");
    var itemList = tabContent.getElementsByClassName("itemList")[0];
    itemList.innerHTML = "";
    var btnLoadMore = createElementWithClassName("button", "btnLoadMore item");
    btnLoadMore.id = id + "LoadMore";
    btnLoadMore.textContent = "Xem thêm";
    btnLoadMore.onclick = function () {
        loadMore(this, url[type], type);
    };
    itemList.appendChild(btnLoadMore);

    for (var i = 0; i < element.childNodes.length; i++) {
        if (categoryId === element.childNodes[i].value) {
            document.getElementById(id + "TabDescription").textContent = " - " + element.childNodes[i].label;
            document.getElementById(id + "Detail").textContent = " - " + element.childNodes[i].label;
            break;
        }
    }

    for (var j = 0; j < gameArray.length; j++) {
        if (gameArray[j][0] === id) {
            gameArray.splice(j, 1);
            break;
        }
    }
    for (var j1 = 0; j1 < gearArray.length; j1++) {
        if (gearArray[j1][0] === id) {
            gearArray.splice(j1, 1);
            break;
        }
    }

    var functionName = (type === 0) ? printGameData : printGearData;
    traversalDOMTree("GET", urlParam + "?categoryId=" + categoryId, functionName, id);
}


//End traversal

var lastTab = null;
var tabCount = 1;
addTab(0, "tabIndicatorHolder", false);
addTab(1, "tabIndicatorHolder", false);
changeTab("tab" + 1);

function addTab(type, tabIndicatorHolderId, isChangeTab) {
    var tabIndicatorHolder = document.getElementById(tabIndicatorHolderId);
    var tabIndicator = document.createElement("div");
    tabIndicator.className = (type === 0) ? "gameTabIndicator tabIndicator" : "gearTabIndicator tabIndicator";

    var indicator = createElementWithClassName("i", "icon indicatorIndicator");
    indicator.className += (type === 0) ? " ion-logo-game-controller-a" : " ion-md-tv";

    tabIndicator.appendChild(indicator);

    var span = document.createElement("span");
    span.textContent = (type === 0) ? "Game" : "Gear";
    tabIndicator.appendChild(span);

    var spanDetail = createElementWithClassName("span", "indicatorDetail");
    spanDetail.id = "tab" +tabCount +"Detail";
    tabIndicator.appendChild(spanDetail);

    var a = document.createElement("a");
    var i = createElementWithClassName("i", "icon ion-md-close");
    a.appendChild(i);
    a.id = "tab" + tabCount;
    a.onclick = function (ev) {
        closeTab(ev, this.id);
    };
    var id = "tab" + tabCount;
    tabIndicator.id = id + "Indicator";
    tabIndicator.appendChild(a);
    tabIndicator.onclick = function () {
        var id = this.id.substring(0, this.id.length - 9);
        changeTab(id);
        switchBackground(type);
    };

    tabIndicatorHolder.insertBefore(tabIndicator, tabIndicatorHolder.childNodes[tabIndicatorHolder.childNodes.length - 2]);
    if (lastTab == null && isChangeTab) {
        changeTab(id);
        switchBackground(type);
    }
    addTabContent(id, type);

    var currentPage = document.getElementById(id + "CurrentPage");
    currentPage.value = 1;
    var url = (type === 0) ? "http://localhost:8080/game" : "http://localhost:8080/gear";
    var functionName = (type === 0) ? printGameData : printGearData;
    traversalDOMTree("GET", url, functionName, id);
    traversalDOMTree("GET", url + "/category", printCategoryData, id);

    tabCount++;
}

function addTabContent(tabId, type) {
    var tabContent = createElementWithClassName("div", "tab");
    tabContent.id = tabId + "Content";

    var tabUtitlites = createElementWithClassName("div", (type === 0) ? "tabUtilities gameUti" : "tabUtilities gearUti");

    var inputCurrentPage = document.createElement("input");
    inputCurrentPage.id = tabId + "CurrentPage";
    inputCurrentPage.type = "hidden";
    tabUtitlites.appendChild(inputCurrentPage);

    var tabUtility = createElementWithClassName("span", "tabUtility");
    var tabName = createElementWithClassName("div", "tabNameContent");
    var indicator = createElementWithClassName("i", "icon tabTxtNameIcon");
    indicator.className += (type === 0) ? " ion-logo-game-controller-a" : " ion-md-tv";
    tabName.appendChild(indicator);
    var tabTxtName = createElementWithClassName("span", "tabTxtName");
    tabTxtName.textContent = (type === 0) ? "Game" : "Gear";
    var tabTxtDescription = createElementWithClassName("span", "");
    tabTxtDescription.id = tabId + "TabDescription";
    tabTxtName.appendChild(tabTxtDescription);
    tabName.appendChild(tabTxtName);

    tabUtility.appendChild(tabName);

    var txtSearch = document.createElement("input");
    txtSearch.id = tabId + "SearchLikeName";
    txtSearch.placeholder = "Tìm kiếm";
    txtSearch.oninput = function () {
        filteringdata(this.value, tabId, type);
    };
    tabUtility.appendChild(txtSearch);
    tabUtitlites.appendChild(tabUtility);

    tabUtility = createElementWithClassName("span", "tabUtility");
    var text = document.createElement("span");
    text.textContent = "Lọc ";
    tabUtility.appendChild(text);
    var dropbox = document.createElement("select");
    dropbox.id = tabId + "DropSrch";
    dropbox.onchange = function () {
        sortByCategory(this, url[type], type);
    };
    var defaultDB = document.createElement("option");
    defaultDB.label = "Tất cả";
    defaultDB.value = null;
    dropbox.appendChild(defaultDB);
    tabUtility.appendChild(dropbox);
    tabUtitlites.appendChild(tabUtility);
    tabContent.appendChild(tabUtitlites);

    var className = (type === 0) ? "gameList" : "gearList";
    var itemListHolder = createElementWithClassName("div", "itemListHolder " + className);
    var itemList = createElementWithClassName("div", "itemList");
    itemListHolder.appendChild(itemList);
    var btnLoadMore = createElementWithClassName("button", "btnLoadMore item");
    btnLoadMore.id = tabId + "LoadMore";
    btnLoadMore.textContent = "Xem thêm";
    btnLoadMore.onclick = function () {
        loadMore(this, url[type], type)
    };
    itemList.appendChild(btnLoadMore);
    tabContent.appendChild(itemListHolder);


    var mainContent = document.getElementById("mainContent");
    mainContent.appendChild(tabContent);
}

var cmpUp = false;

function changeUserTheme(type) {
    var userHolder = document.getElementById("userIndicator");
    userHolder.style.background = (type === 0) ? "var(--main-login-background-game)" : "var(--main-login-background-gear)";
    userHolder.style.color = (type === 0) ? "var(--main-game-deactive-color)" : "var(--main-gear-deactive-color)";
    var loginPane = document.getElementById("loginPanel");
    loginPane.style.background = (type === 0) ? "var(--main-login-panel-game)" : "var(--main-login-panel-gear)";
    loginPane.style.color = (type === 0) ? "var(--main-game-deactive-color)" : "var(--main-gear-deactive-color)";
}

function changeTab(tabId) {

    if (lastTab === tabId) {
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
    var type = tabIndicator.className.includes(("gameTabIndicator")) ? 0 : 1;
    var tabClass = (type === 0) ? "gameTabIndicator" : "gearTabIndicator";
    tabIndicator.classList.remove(tabClass);
    tabIndicator.classList.add(tabClass + "-active");

    var tabContent = document.getElementById(tabId + "Content");
    if (tabContent != null) {
        tabContent.style.visibility = "visible";
        tabContent.style.display = "block";
    }
    lastTab = tabId;
    changeUserTheme(type);
}

function closeTab(ev, tabId) {
    var tabIndicator = document.getElementById(tabId + "Indicator");
    tabIndicator.remove();

    var tabContent = document.getElementById(tabId + "Content");
    if (tabContent != null) {
        tabContent.remove();
    }

    if (lastTab === tabId) {
        var tabIndicators = document.getElementsByClassName("tabIndicator");
        tabIndicator = tabIndicators[0];
        if (tabIndicator != null) {
            var tabClass = tabIndicator.className.includes(("gameTabIndicator")) ? "gameTabIndicator" : "gearTabIndicator";
            tabIndicator.classList.remove(tabClass);
            tabIndicator.classList.add(tabClass + "-active");
            lastTab = tabIndicator.id.substr(0, tabIndicator.id.length - 9);
            tabContent = document.getElementById(lastTab + "Content");
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

function compareScreenPopUp() {
    var cmpScreen = document.getElementById("compareScreen");
    var visible = cmpScreen.style.visibility;
    if (visible === "hidden" || visible === "") {
        cmpScreen.style.visibility = "visible";
        cmpScreen.style.opacity = 1;
        compareScreenComparing();
    } else {
        cmpScreen.style.visibility = "hidden";
        cmpScreen.style.opacity = 0;
    }
}

var gameChoosed = [];
var gearChoosed = [];

var lastCmpGame = null;
var lastCmpGear = null;

function compareScreenComparing() {
    var tabGame = document.getElementById("games");
    var tabGear = document.getElementById("gears");
    var games = tabGame.getElementsByClassName("cmpItem");
    var gears = tabGear.getElementsByClassName("cmpItem");

    var gameHolder = document.getElementById("gameCompareHolder");
    gameHolder.innerHTML = "";
    var gearHolder = document.getElementById("gearCompareHolder");
    gearHolder.innerHTML = "";
    for (var i = 0; i < games.length; i++) {
        var game = document.createElement("div");
        game.id = games[i].id + "CmpItem";
        game.className = "cmpScreenItem";
        var gameExist = false;
        for (var j = 0; j < gameChoosed.length; j++) {
            if (gameChoosed[j][0].includes(games[i].id)) {
                gameExist = true;
                if (gameChoosed[j][1][1] != null) {
                    game.className += " hasRecommend";
                }
            }
        }
        if (!gameExist) {
            var spec = loadSpecForCompare(games[i].id, 0);
            var gameSpec = [];
            gameSpec.push(games[i].id);
            gameSpec.push(castListToSpec(spec));
            gameChoosed.push(gameSpec);
            if (gameSpec[1][1] != null) {
                game.className += " hasRecommend";
            }
        }
        game.innerHTML = games[i].innerHTML;
        game.getElementsByClassName("removeCmpItemButton")[0].remove();
        game.onclick = function () {
            if (lastCmpGame != null) {
                document.getElementById(lastCmpGame).className =
                    document.getElementById(lastCmpGame).className.replace(" cmpItemActive", "");
            }
            this.className += " cmpItemActive";
            lastCmpGame = this.id;
            setIdForCmp(true, this.id);
            comparingGameAndGear(true);
            var btnMinimum = document.getElementById("switchCmpModeMinimum");
            btnMinimum.onclick = function () {
                comparingGameAndGear(true);
            };
            btnMinimum.disabled = false;
            var btnRecommend = document.getElementById("switchCmpModeRecommend");
            btnRecommend.disabled = true;
            if (this.className.includes("hasRecommend")) {
                btnRecommend.disabled = false;
                btnRecommend.onclick = function () {
                    comparingGameAndGear(false);
                }
            }
        };
        gameHolder.appendChild(game);
    }

    for (var i2 = 0; i2 < gears.length; i2++) {
        var gear = document.createElement("div");
        gear.id = gears[i2].id + "CmpItem";
        gear.className = "cmpScreenItem";
        var gearExist = false;
        for (var j2 = 0; j2 < gearChoosed; j2++) {
            if (gearChoosed[j2].includes(gears[i2].id)) {
                gearExist = true;
            }
        }
        if (!gearExist) {
            var spec2 = loadSpecForCompare(gears[i2].id, 1);
            var gearSpec = [];
            gearSpec.push(gears[i2].id);
            gearSpec.push(castListToSpec(spec2));
            gearChoosed.push(gearSpec);
        }
        gear.innerHTML = gears[i2].innerHTML;
        gear.onclick = function () {
            if (lastCmpGear != null) {
                document.getElementById(lastCmpGear).className = "cmpScreenItem";
            }
            this.className += " cmpItemActive";
            lastCmpGear = this.id;
            setIdForCmp(false, this.id);
            comparingGameAndGear(true);
        };
        gear.getElementsByClassName("removeCmpItemButton")[0].remove();
        gearHolder.appendChild(gear);
    }
    document.getElementById("switchCmpModeMinimum").disabled = true;
    document.getElementById("switchCmpModeRecommend").disabled = true;

    if (gameHolder.childNodes[0] == null || gearHolder.childNodes[0] == null) {
        clearCmpData();
        document.getElementById("errorResult").textContent = "Chọn game và gear trước khi so sánh";
        return;
    }
    if (gameHolder.childNodes[0] != null) {
        gameHolder.childNodes[0].click();
    }
    if (gearHolder.childNodes[0] != null) {
        gearHolder.childNodes[0].click();
    }
}

function castListToSpec(array) {
    var normal = array.replace("[", "").replace("]", "").replace(/},{/g, "&and;").replace(/{/g, "").replace(/}/g, "");
    normal = normal.split("&and;");
    var normalArrayPlease = [];
    for (var i = 0; i < normal.length; i++) {
        var properties = normal[i].split(",");
        var spec = {
            screen: null,
            weight: null,
            os: null,
            processor: null,
            memory: null,
            graphic: null
        };
        for (var j = 0; j < properties.length; j++) {
            var property = properties[j].split(":");
            switch (property[0].replace(/"/g, "")) {
                case "os":
                    spec.os = property[1].replace(/"/g, "");
                    break;
                case "cpu":
                case "processor":
                    spec.processor = property[1].replace(/"/g, "");
                    break;
                case "ram":
                case "memory":
                    spec.memory = property[1].replace(/"/g, "");
                    break;
                case "vga":
                case "graphics":
                    spec.graphic = property[1].replace(/"/g, "");
                    break;
                case "screen":
                    spec.screen = property[1].replace(/"/g, "");
                    break;
                case "weight":
                    spec.weight = property[1].replace(/"/g, "");
                    break;
            }
        }
        normalArrayPlease.push(spec);
    }
    return normalArrayPlease;
}

function loadSpecForCompare(id, type) {
    var idCrop = id.substring(1, id.length);
    var specUrl = url[type] + "/spec?id=" + idCrop;
    return loadSpec(specUrl);
}

var gameIdCmpChoose = null;
var gearIdCmpChoose = null;

function setIdForCmp(isGame, value) {
    if (isGame) {
        gameIdCmpChoose = value.substring(0, value.length - 7);
    } else {
        gearIdCmpChoose = value.substring(0, value.length - 7);
    }
}

function comparingGameAndGear(isMinimum) {
    document.getElementById("errorResult").textContent = "";
    clearCmpData();
    if (gameIdCmpChoose != null && gearIdCmpChoose != null) {
        var game;
        var gear;

        for (var i = 0; i < gameChoosed.length; i++) {
            if (gameChoosed[i][0] === gameIdCmpChoose) {
                game = gameChoosed[i];
            }
        }
        for (var j = 0; j < gearChoosed.length; j++) {
            if (gearChoosed[j][0] === gearIdCmpChoose) {
                gear = gearChoosed[j];
            }
        }
        console.log("And so it begin");
        console.log(game);
        console.log(gear);
        var gameSpec = (isMinimum) ? game[1][0] : game[1][1];
        runScoreBar("osResult", compareOsStat(gameSpec.os, gear[1][0].os));
        runScoreBar("cpuResult", compareCpuStat(gameSpec.processor, gear[1][0].processor));
        runScoreBar("ramResult", compareRamStat(gameSpec.memory, gear[1][0].memory));
        runScoreBar("graphicResult", compareGpuStat(gameSpec.graphic, gear[1][0].graphic));


        cmpResultSpecDetail("osGameResult", gameSpec.os);
        cmpResultSpecDetail("cpuGameResult", gameSpec.processor);
        cmpResultSpecDetail("ramGameResult", gameSpec.memory);
        cmpResultSpecDetail("graphicGameResult", gameSpec.graphic);

        cmpResultSpecDetail("osGearResult", gear[1][0].os);
        cmpResultSpecDetail("cpuGearResult", gear[1][0].processor);
        cmpResultSpecDetail("ramGearResult", gear[1][0].memory);
        cmpResultSpecDetail("graphicGearResult", gear[1][0].graphic);
    } else {
        document.getElementById("errorResult").textContent = "Chọn game và gear trước khi so sánh";
    }
}

function cmpResultSpecDetail(parentId, value) {
    var parent = document.getElementById(parentId);
    parent.innerHTML = (value !== "null" && value !== "" && value != null) ? value : "<span class='noResult'>không thông tin</span>";
}

function runScoreBar(typeScoreId, score) {
    var typeScoreHolder = document.getElementById(typeScoreId);
    if (score > 0) {
        var scorebar = typeScoreHolder.getElementsByClassName("meterGame")[0].getElementsByClassName("scoreBar")[0];
        var scoreRegister = typeScoreHolder.getElementsByClassName("meterGame")[0].getElementsByClassName("score")[0];
        scorebar.style.width = 20 * score + "px";
        scoreRegister.style.width = 20 * score + "px";
        scoreRegister.textContent = score;
    } else {
        var scorebar2 = typeScoreHolder.getElementsByClassName("meterGear")[0].getElementsByClassName("scoreBar")[0];
        var scoreRegister2 = typeScoreHolder.getElementsByClassName("meterGear")[0].getElementsByClassName("score")[0];
        scorebar2.style.width = -1 * 20 * score + "px";
        scoreRegister2.style.width = -1 * 20 * score + "px";
        scoreRegister2.textContent = -1 * score;
    }
}

function clearCmpData() {
    var scorebars = document.getElementById("cmpResult").getElementsByClassName("scoreBar");
    for (var i = 0; i < scorebars.length; i++) {
        scorebars[i].style.width = "0px";
    }
    var scores = document.getElementById("cmpResult").getElementsByClassName("score");
    for (var j = 0; j < scorebars.length; j++) {
        scores[j].style.width = "0px";
        scores[j].textContent = "";
    }

    document.getElementById("osGameResult").innerHTML = "";
    document.getElementById("cpuGameResult").innerHTML = "";
    document.getElementById("ramGameResult").innerHTML = "";
    document.getElementById("graphicGameResult").innerHTML = "";
    document.getElementById("osGearResult").innerHTML = "";
    document.getElementById("cpuGearResult").innerHTML = "";
    document.getElementById("ramGearResult").innerHTML = "";
    document.getElementById("graphicGearResult").innerHTML = "";
}

var gamesInCompareTab = false;

function tabToolBarVisible() {
    var element = document.getElementById("tabToolbarOverlay");
    element.style.visibility = (element.style.visibility === "visible" || element.style.visibility === "") ? "hidden" : "visible";
    var tabToolbar = document.getElementById("tabToolbar");
    tabToolbar.style.visibility = (tabToolbar.style.visibility === "hidden" || tabToolbar.style.visibility === "") ? "visible" : "hidden";
}

function loadSpec(url) {
    var xhttp = new XMLHttpRequest();
    console.log(url);
    var entity = null;
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            entity = this.responseText;
        }
    };
    xhttp.open("GET", url, false);
    xhttp.send();
    return entity;
}

//Getting data type
var os = [];
var cpu = [];
var gpu = [];
setUpDataType();

function setUpDataType() {
    //Get os type data
    os = (loadTypeToList("http://localhost:8080/game/type/os"));
    os = os.concat(loadTypeToList("http://localhost:8080/gear/type/os"));
    //Get cpu type data
    cpu = loadTypeToList("http://localhost:8080/game/type/cpu");
    cpu = cpu.concat(loadTypeToList("http://localhost:8080/gear/type/cpu"));
    //Get gpu type data
    gpu = loadTypeToList("http://localhost:8080/game/type/gpu");
    gpu = gpu.concat(loadTypeToList("http://localhost:8080/gear/type/gpu"));

    //Remove dublicate
    os = uniq(os);
    //To matrix
    os = processOsTypeList(os);
    //Remove dublicate
    cpu = uniq(cpu);
    //To matrix
    cpu = processCpuTypeList(cpu);
    //Remove dublicate
    gpu = uniq(gpu);
    //To matrix
    gpu = processGpuTypeList(gpu);

}

function loadTypeToList(url) {
    var xhttp = new XMLHttpRequest();
    console.log(url);
    var tmpArray = [];
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            var txt = this.responseText;
            txt = txt.replace("[", "").replace("]", "").replace(/"/g, "");
            tmpArray = txt.split(",");
        }
    };
    xhttp.open("GET", url, false);
    xhttp.send();
    return tmpArray;
}

function uniq(array) {
    var prims = {"boolean": {}, "number": {}, "string": {}}, objs = [];

    return array.filter(function (item) {
        var type = typeof item;
        if (type in prims)
            return prims[type].hasOwnProperty(item) ? false : (prims[type][item] = true);
        else
            return objs.indexOf(item) >= 0 ? false : objs.push(item);
    });
}

function processOsTypeList(array) {
    var processedArray = [];
    var window7Array = [];
    for (var i = 0; i < array.length; i++) {
        var txt = array[i].match("(Windows|Win|Window)( \\w*)*7");
        if (txt != null) {
            window7Array.push(array[i]);
            array.splice(i, 1);
            i--;
        }
    }

    processedArray[1] = window7Array;
    var window8Array = [];
    for (var i1 = 0; i1 < array.length; i1++) {
        var txt1 = array[i1].match("(Windows|Win|Window)( \\w*)*8");
        if (txt1 != null) {
            window8Array.push(array[i1]);
            array.splice(i1, 1);
            i1--
        }
    }
    processedArray[2] = window8Array;
    var window10Array = [];
    for (var i2 = 0; i2 < array.length; i2++) {
        var txt2 = array[i2].match("(Windows|Win|Window)( \\w*)*10");
        if (txt2 != null) {
            window10Array.push(array[i2]);
            array.splice(i2, 1);
            i2--
        }
    }
    processedArray[3] = window10Array;
    processedArray[0] = array;
    return processedArray;
}

function processCpuTypeList(array) {
    var processedArray = [];
    var _4GHzArray = [];
    for (var i = 0; i < array.length; i++) {
        var txt = array[i].match("(^4|[^\\d.]4)\\.?\\d{0,3} ?(GHz|GHZ|Ghz|ghz)");
        if (txt != null) {
            _4GHzArray.push(array[i]);
            array.splice(i, 1);
            i--;
        }
    }

    var _3GHzArray = [];
    for (var i1 = 0; i1 < array.length; i1++) {
        var txt1 = array[i1].match("(^3|[^\\d.]3)\\.?\\d{0,3} ?(GHz|GHZ|Ghz|ghz)");
        if (txt1 != null) {
            _3GHzArray.push(array[i1]);
            array.splice(i1, 1);
            i1--;
        }
    }

    var _2GHzArray = [];
    for (var i2 = 0; i2 < array.length; i2++) {
        var txt2 = array[i2].match("(^2|[^\\d.]2)\\.?\\d{0,3} ?(GHz|GHZ|Ghz|ghz)");
        if (txt2 != null) {
            _2GHzArray.push(array[i2]);
            array.splice(i2, 1);
            i2--;
        }
    }

    var _1GHzArray = [];
    for (var i3 = 0; i3 < array.length; i3++) {
        var txt3 = array[i3].match("(^1|[^\\d.]1)\\.?\\d{0,3} ?(GHz|GHZ|Ghz|ghz)");
        if (txt3 != null) {
            _1GHzArray.push(array[i3]);
            array.splice(i3, 1);
            i3--;
        }
    }

    var IntelArray = [];
    for (var i4 = 0; i4 < array.length; i4++) {
        var txt4 = array[i4].match("(Intel|Core i|i\\d)");
        if (txt4 != null) {
            IntelArray.push(array[i4]);
            array.splice(i4, 1);
            i4--;
        }
    }
    processedArray[0] = sortSpec(_1GHzArray, "\\d.?\\d{0,} ?G", "G", "", true);
    processedArray[1] = array;
    processedArray[2] = sortSpec(IntelArray, "i\\d(-? ?\\d{0,})?", "-", " ", false);
    processedArray[3] = sortSpec(_2GHzArray, "\\d.?\\d{0,} ?G", "G", "", true);
    processedArray[4] = sortSpec(_3GHzArray, "\\d.?\\d{0,} ?G", "G", "", true);
    processedArray[5] = sortSpec(_4GHzArray, "\\d.?\\d{0,} ?G", "G", "", true);

    // other shit
    return processedArray;
}

function processGpuTypeList(array) {
    var processedArray = [];
    var intelArray = [];
    for (var i = 0; i < array.length; i++) {
        var txt = array[i].match("(Intel|intel)");
        if (txt != null) {
            intelArray.push(array[i]);
            array.splice(i, 1);
            i--;
        }
    }

    var geforceArray = [];
    for (var i1 = 0; i1 < array.length; i1++) {
        var txt1 = array[i1].match("(Geforce|GTX|GeForce|GEFORCE|NVIDIA|Nvidia|GT|geforce|gtx|Ge force)");
        if (txt1 != null) {
            geforceArray.push(array[i1]);
            array.splice(i1, 1);
            i1--;
        }
    }

    var amdArray = [];
    for (var i2 = 0; i2 < array.length; i2++) {
        var txt2 = array[i2].match("(AMD|Radeon)");
        if (txt2 != null) {
            amdArray.push(array[i2]);
            array.splice(i2, 1);
            i2--;
        }
    }

    var vramArray = [];
    for (var i3 = 0; i3 < array.length; i3++) {
        var txt3 = array[i3].match("(VRAM|RAM|MB|GB|mb|Mb)");
        if (txt3 != null) {
            vramArray.push(array[i3]);
            array.splice(i3, 1);
            i3--;
        }
    }

    var directXArray = [];
    for (var i4 = 0; i4 < array.length; i4++) {
        var txt4 = array[i4].match("(DX|DirectX|Direct)");
        if (txt4 != null) {
            directXArray.push(array[i4]);
            array.splice(i4, 1);
            i4--;
        }
    }

    var resolutionArray = [];
    for (var i5 = 0; i5 < array.length; i5++) {
        var txt5 = array[i5].match("\\d ?(x|X) ?\\d");
        if (txt5 != null) {
            resolutionArray.push(array[i5]);
            array.splice(i5, 1);
            i5--;
        }
    }
    //get other shit
    processedArray[0] = array;
    processedArray[1] = resolutionArray;
    processedArray[2] = sortSpec(directXArray, "X®? ?\\d{1,}\\.?\\d?", /[X®]/g, "", true);
    processedArray[3] = sortSpec(intelArray, "\\d{2,}", "", "", true);
    processedArray[4] = sortVram(vramArray);
    processedArray[5] = sortSpec(amdArray, "\\d{3,}", "", "", true);
    processedArray[6] = sortSpec(geforceArray, "\\d{3,}", "", "", true);
    console.log(processedArray);
    return processedArray;
}

function sortSpec(array, regex, replace, to, isFloat) {
    for (var i = 0; i < array.length; i++) {
        for (var j = array.length - 1; j > i; j--) {
            var txt = array[i].match(regex);
            if (txt != null) {
                var txtJ = array[j].match(regex);
                if (txtJ != null) {
                    if (isFloat) {
                        if (parseFloat(txt[0].replace(replace, to)) > parseFloat(txtJ[0].replace(replace, to))) {
                            var swamp = array[i];
                            array[i] = array[j];
                            array[j] = swamp;
                        }
                    } else {
                        if (txt[0].replace(replace, to) > txtJ[0].replace(replace, to)) {
                            var swamp1 = array[i];
                            array[i] = array[j];
                            array[j] = swamp1;
                        }
                    }

                }
            }
        }
    }
    return array;
}

function sortVram(array) {
    for (var i = 0; i < array.length; i++) {
        var ramI = 0;
        for (var j = array.length - 1; j > i; j--) {
            var ramJ = 0;
            var txt = array[i].match("\\d{1,} ?(VRAM|RAM|MB|GB|mb|Mb)");
            if (txt != null) {
                var multi = 1;
                var index = txt[0].indexOf(txt[1]);
                if (txt[1].toLowerCase().trim() === "gb") {
                    multi = 1024;//convert to MB
                }
                ramI = parseInt(txt[0].substring(0, index)) * multi;
            }
            var txtJ = array[j].match("\\d{1,} ?(VRAM|RAM|MB|GB|mb|Mb)");
            if (txtJ != null) {
                var multi1 = 1;
                var index1 = txtJ[0].indexOf(txtJ[1]);
                if (txtJ[1].toLowerCase().trim() === "gb") {
                    multi = 1024;//convert to MB
                }
                ramJ = parseInt(txtJ[0].substring(0, index1)) * multi1;
            }
            if (ramI > ramJ) {
                var swap = array[i];
                array[i] = array[j];
                array[j] = swap;
            }
        }
    }
    return array;
}

function compareRamStat(ram1, ram2) {
    console.log("compare: " + ram1 + " vs " + ram2);
    var ramI = 0;
    var ramJ = 0;
    if (ram1 != null) {
        var txt = ram1.match("\\d{1,20} ?(GB|MB)");
        if (txt != null) {
            var multi = 1;
            var index = txt[0].indexOf("MB");
            if (index === -1) {
                index = txt[0].indexOf("GB");
                multi = 1024;//convert to MB
            }
            ramI = parseInt(txt[0].substring(0, index)) * multi;
        }
    }
    if (ram2 != null) {
        var txtJ = ram2.match("\\d{1,20} ?(GB|MB)");
        if (txtJ != null) {
            multi = 1;
            index = txtJ[0].indexOf("MB");
            if (index === -1) {
                index = txtJ[0].indexOf("GB");
                multi = 1024;//convert to MB
            }
            ramJ = parseInt(txtJ[0].substring(0, index)) * multi;
        }
    }
    return (ramI - ramJ) / 1024;
}

function compareOsStat(os1, os2) {
    console.log(os);
    console.log("comparing: " + os1 + "," + os2);
    var os1Score = 0;
    var os2Score = 0;
    for (var i = 0; i < os.length; i++) {
        for (var j = 0; j < os[i].length; j++) {
            if (os1 === os[i][j]) {
                console.log("1: " + i + "|" + j);
                os1Score = i ^ 1.3 * j / os[i].length * 1.5;
            }
            if (os2 === os[i][j]) {
                console.log("2: " + i + "|" + j);
                os2Score = i ^ 1.3 * j / os[i].length * 1.5;
            }
        }
    }
    console.log("score is: " + os1Score + "," + os2Score);
    return os1Score - os2Score;
}

function compareCpuStat(cpu1, cpu2) {
    var score1 = 0;
    var score2 = 0;
    for (var i = 0; i < cpu.length; i++) {
        for (var j = 0; j < cpu[i].length; j++) {
            if (cpu1 === cpu[i][j]) {
                score1 = i ^ 1.5 + j / cpu[i].length * 4;
            }
            if (cpu2 === cpu[i][j]) {
                score2 = i ^ 1.5 + j / cpu[i].length * 4;
            }
        }
    }
    console.log("Result: " + score1 + "," + score2);
    return score1 - score2;
}

function compareGpuStat(gpu1, gpu2) {
    var score1 = 0;
    var score2 = 0;
    for (var i = 0; i < gpu.length; i++) {
        for (var j = 0; j < gpu[i].length; j++) {
            if (gpu1 === gpu[i][j]) {
                score1 = i ^ 1.5 + j / gpu[i].length * 4;
            }
            if (gpu2 === gpu[i][j]) {
                score2 = i ^ 1.5 + j / gpu[i].length * 4;
            }
        }
    }
    console.log("Result: " + score1 + "," + score2);
    return score1 - score2;
}

function hideLoginPanel() {
    var loginPanel = document.getElementById("loginPanel");
    var loginBackground = document.getElementById("loginBackground");
    var visible = loginPanel.style.visibility;
    if (visible === "hidden" || visible === "") {
        loginPanel.style.visibility = "visible";
        loginPanel.style.opacity = 1;
        loginBackground.style.visibility = "visible";
        loginBackground.style.opacity = 1;
        document.getElementById("loginError").textContent = "";
        window.setTimeout(function () {
            document.getElementById("txtUsername").focus();
        }, 300);
    } else {
        loginPanel.style.visibility = "hidden";
        loginPanel.style.opacity = 0;
        loginBackground.style.visibility = "hidden";
        loginBackground.style.opacity = 0;
    }
}

function clearLogin() {
    document.getElementById("txtUsername").value = "";
    document.getElementById("txtPassword").value = "";
}

var onLoadLastIdKey = sessionStorage.getItem("gamaUserIdKey");
if (onLoadLastIdKey != null && onLoadLastIdKey !== "") {
    login(false);
    document.getElementById("loginError").textContent = "";
}

function login(hideLogin) {
    var params = "";
    var username = document.getElementById("txtUsername");
    var password = document.getElementById("txtPassword");
    var lastIdKey = sessionStorage.getItem("gamaUserIdKey");
    if (lastIdKey != null && lastIdKey !== "") {
        params = "uniqueID=" + lastIdKey + "&username=" + username.value + "&password=" + password.value;
    } else {
        params = "username=" + username.value + "&password=" + password.value;
    }
    document.getElementById("loginError").textContent = "";

    var http = new XMLHttpRequest();
    var url = "http://localhost:8080/main/login";

    http.open('POST', url, true);
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    http.onreadystatechange = function () {//Call a function when the state changes.
        if (http.readyState === 4 && http.status === 200) {
            if (http.responseText != null && http.responseText !== "") {
                document.getElementById("adminName").textContent = (username.value !== "") ? username.value : sessionStorage.getItem("gamaUsername");
                sessionStorage.setItem("gamaUserIdKey", http.responseText);
                sessionStorage.setItem("gamaUsername", username.value);
                adminIsHere(true);
                clearLogin();
                if (hideLogin) {
                    hideLoginPanel();
                }
                loadAdministrationTab();
            } else {
                document.getElementById("loginError").textContent = "Tên Đăng nhập hoặc Mật khẩu không đúng";
            }
        }
    };
    http.send(params);
}

function logout() {
    var onLoadLastIdKey = sessionStorage.getItem("gamaUserIdKey");
    if (onLoadLastIdKey != null || onLoadLastIdKey === "") {
        sessionStorage.removeItem("gamaUserIdKey");
        sessionStorage.removeItem("gamaUsername");

        var http = new XMLHttpRequest();
        var params = "uniqueID=" + onLoadLastIdKey;
        http.open('POST', "http://localhost:8080/main/logout", true);
        http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

        http.onreadystatechange = function () {//Call a function when the state changes.
            if (http.readyState === 4 && http.status === 200) {
                adminIsHere(false);
            }
        };
        http.send(params);
    }
}

function adminIsHere(isIt) {
    if (isIt) {
        document.getElementById("guest").style.visibility = "collapse";
        document.getElementById("admin").style.visibility = "visible";
    } else {
        document.getElementById("guest").style.visibility = "visible";
        document.getElementById("admin").style.visibility = "collapse";
        document.getElementById("adminName").textContent = "";
        document.getElementById("administrationTabContent").innerHTML = "";
    }
}

function loadAdministrationTab() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            var mainContentHolder = document.getElementById("administrationTabContent");
            mainContentHolder.innerHTML = this.responseText;
            // alert(this.responseText);
        }
    };
    xhttp.open("GET", "http://localhost:8080/main?admin=needed", true);
    xhttp.send();
}

function admistrationTabHide() {
    var administrationTab = document.getElementById("administrationTab");
    var visible = administrationTab.style.visibility;
    if (visible === "hidden" || visible === "") {
        administrationTab.style.visibility = "visible";
        administrationTab.style.opacity = "1";
    } else {
        administrationTab.style.visibility = "hidden";
        administrationTab.style.opacity = "0";
    }
}

var gameCategoryProcessTime;
var gearCategoryProcessTime;

function crawlCategory(thisButton, type) {
    var result = (type === 0) ? document.getElementById("txtGameCategoryCrawlResult") : document.getElementById("txtGearCategoryCrawlResult");
    var xhttp = new XMLHttpRequest();
    thisButton.disabled = true;
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            thisButton.disabled = false;
            result.textContent = "Item lấy được: " + this.responseText;
            var progress = (type === 0) ? document.getElementById("txtGameCategoryCrawlProcess") : document.getElementById("txtGearCategoryCrawlProcess");
            var progressBar = progress.getElementsByClassName("progressResultBar")[0];
            progressBar.style.width = "100%";
            progressBar.textContent = "100%";
            if (type === 0) {
                clearInterval(gameCategoryProcessTime);
            } else {
                clearInterval(gearCategoryProcessTime);
            }
        }
    };
    xhttp.open("GET", url[type] + "/category/load", true);
    xhttp.send();
    categoryProgressBarGoing(type);
}

function categoryProgressBarGoing(type) {
    var progress = (type === 0) ? document.getElementById("txtGameCategoryCrawlProcess") : document.getElementById("txtGearCategoryCrawlProcess");
    var progressBar = progress.getElementsByClassName("progressResultBar")[0];
    progressBar.style.width = "0";
    progressBar.textContent = "0%";
    if (type === 0) {
        gameCategoryProcessTime = setInterval(function () {
            progressBar.style.width = Math.floor(progressBar.offsetWidth + ((progress.offsetWidth - progressBar.offsetWidth) / 5)) + "px";
            progressBar.textContent = Math.floor(progressBar.offsetWidth / progress.offsetWidth * 100) + "%";
        }, 200);
    } else {
        gearCategoryProcessTime = setInterval(function () {
            progressBar.style.width = Math.floor(progressBar.offsetWidth + ((progress.offsetWidth - progressBar.offsetWidth) / 5)) + "px";
            progressBar.textContent = Math.floor(progressBar.offsetWidth / progress.offsetWidth * 100) + "%";
        }, 200);
    }
}

var gameProcessTime;
var gearProcessTime;

function startCrawlItem(type) {
    var btnStart = (type === 0) ? document.getElementById("btnGameCrawlStart") : document.getElementById("btnGearCrawlStart");
    var btnStop = (type === 0) ? document.getElementById("btnGameCrawlStop") : document.getElementById("btnGearCrawlStop");
    var result = (type === 0) ? document.getElementById("txtGameCrawlResult") : document.getElementById("txtGearCrawlResult");
    var xhttp = new XMLHttpRequest();
    btnStart.disabled = true;
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            btnStop.disabled = false;
            result.textContent = this.responseText + " bắt đầu";
            var threadName = (type === 0) ? document.getElementById("txtGameCrawlThreadName") : document.getElementById("txtGearCrawlThreadName");
            threadName.value = this.responseText;
            theWaitingGame(url[type] + '/status', threadName.value, result, type);
        }
    };
    xhttp.open("GET", url[type] + '/load', true);
    xhttp.send();
    var progress = (type === 0) ? document.getElementById("txtGameCrawlProcess") : document.getElementById("txtGearCrawlProcess");
    var progressBar = progress.getElementsByClassName("progressResultBar")[0];
    progressBar.style.width = "0";
    progressBar.textContent = "0%";
}

var gameWorker;
var gearWorker;

function theWaitingGame(url, threadName, resultBanner, type) {
    window.setTimeout(function () {
        if (typeof(Worker) !== "undefined") {
            if (type === 0) {
                gameWorker = new Worker("style/js/webworker.js");
                gameWorker.postMessage(url + "/?name=" + threadName);
            } else {
                gearWorker = new Worker("style/js/webworker.js");
                gearWorker.postMessage(url + "/?name=" + threadName);
            }
            var count = 0;
            var w = (type === 0) ? gameWorker : gearWorker;
            w.onmessage = function (event) {
                var results = event.data.replace("[", "").replace("]", "");
                results = results.split(",");
                if (results[2] !== "-1") {
                    count += (parseInt(results[2]) - count);
                    resultBanner.textContent = threadName + " đang chạy\r\n Item lấy được: " + count;
                    gameAndGearProgressBarGoing(type, results);
                } else {
                    resultBanner.textContent = threadName + " hoàn thành\r\n Item lấy được: " + count;
                    if (type === 0) {
                        gameWorker.terminate();
                        gameWorker = undefined;
                    } else {
                        gearWorker.terminate();
                        gearWorker = undefined;
                    }
                    var btnStart = (type === 0) ? document.getElementById("btnGameCrawlStart") : document.getElementById("btnGearCrawlStart");
                    var btnStop = (type === 0) ? document.getElementById("btnGameCrawlStop") : document.getElementById("btnGearCrawlStop");
                    btnStart.disabled = false;
                    btnStop.disabled = true;
                    gameAndGearProgressBarGoing(type, results);
                }
            };
        }
    }, 1000);
}

function gameAndGearProgressBarGoing(type, results) {
    var progress = (type === 0) ? document.getElementById("txtGameCrawlProcess") : document.getElementById("txtGearCrawlProcess");
    var progressBar = progress.getElementsByClassName("progressResultBar")[0];
    if (results[2] !== "-1") {
        progressBar.style.width = Math.floor(parseInt(results[1]) / parseInt(results[0]) * 100) + "%";
        progressBar.textContent = Math.floor(parseInt(results[1]) / parseInt(results[0]) * 100) + "%";
    } else {
        progressBar.style.width = "100%";
        progressBar.textContent = "100%";
    }
}

function stopCrawlItem(type) {
    // var w = (type === 0) ? gameWorker : gearWorker;
    var btnStart = (type === 0) ? document.getElementById("btnGameCrawlStart") : document.getElementById("btnGearCrawlStart");
    var btnStop = (type === 0) ? document.getElementById("btnGameCrawlStop") : document.getElementById("btnGearCrawlStop");
    var threadName = (type === 0) ? document.getElementById("txtGameCrawlThreadName") : document.getElementById("txtGearCrawlThreadName");
    var result = (type === 0) ? document.getElementById("txtGameCrawlResult") : document.getElementById("txtGearCrawlResult");
    var xhttp = new XMLHttpRequest();
    btnStop.disabled = true;
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            if (type === 0) {
                gameWorker.terminate();
                gameWorker = undefined;
            } else {
                gearWorker.terminate();
                gearWorker = undefined;
            }
            var results = this.responseText.replace("[", "").replace("]", "");
            results = results.split(",");
            result.textContent = threadName.value + " dừng\r\n Item lấy được: " + results[2];
            btnStart.disabled = false;
            gameAndGearProgressBarGoing(type, results);
        }
    };
    xhttp.open("GET", url[type] + "/stop?name=" + threadName.value, true);
    xhttp.send();
}

function printItemDetail(type, tabId, id) {
    if (type === 0) {
        printGameItemDetail(tabId, id);
    } else {
        printGearItemDetail(tabId, id);
    }
}

function printGameItemDetail(tabId, gameId) {
    var game = null;
    for (var i = 0; i < gameArray.length; i++) {
        if (gameArray[i][0] === tabId) {
            console.log(tabId + "," + gameArray[i][1]);
            for (var j = 0; j < gameArray[i][1].length; j++) {
                var tmpGame = gameArray[i][1][j];
                if (tmpGame.getAttribute("id") === gameId.substring(1)) {
                    game = tmpGame;
                    break;
                }
            }
            break;
        }
    }
    if (game != null) {
        //print basic info
        document.getElementById("itemDetailName").innerHTML = "<span class='gameTxt'>" + game.getAttribute("name") + "</span>";
        var x = game.getElementsByTagName("price")[0].childNodes[0];
        var itemPrice = "";
        if (x != null) {
            itemPrice = x.nodeValue;
        }
        document.getElementById("itemDetailPrice").innerHTML = (itemPrice === "" || itemPrice === "đ") ? "<span class='noResult'>Không thông tin</span>" : itemPrice;
        document.getElementById("itemDetailImg").src = game.getAttribute("img");
        var tags = game.getElementsByTagName("tags")[0];
        var tagArray = tags.getElementsByTagName("tag");
        for (var z = 0; z < tagArray.length; z++) {
            var tag = createElementWithClassName("li", "itemTag");
            tag.textContent = tagArray[z].childNodes[0].textContent;
            document.getElementById("itemDetailTagHolder").appendChild(tag);
        }
        var origin = createElementWithClassName("a", "linkToOrigin gameOri");
        origin.innerHTML = "Tới <div><i class=\"icon ion-logo-steam\"></i></div>";
        origin.href = game.getAttribute("href");
        origin.target = "_blank";
        document.getElementById("itemDetailToOrigin").appendChild(origin);
        //Get that compare button
        var tab = document.getElementById(tabId + "Content");
        var items = tab.getElementsByClassName("item");
        var itemBaseOn = null;
        for (var k = 0; k < items.length; k++) {
            if (items[k].getAttribute("id") === gameId) {
                itemBaseOn = items[k];
                break;
            }
        }
        if (itemBaseOn != null) {
            var button = createElementWithClassName("button", "itemDetailCompareBtn gameOri");
            button.textContent = "So sánh";
            button.onclick = function () {
                btnCompareEvent(itemBaseOn);
            };
            document.getElementById("itemDetailToOrigin").appendChild(button);
        }
        //Getting into deep shit
        printGameSpecDetail(game);
    }
}

function printGameSpecDetail(game) {
    var gameExist = false;
    var specDetail = null;
    for (var j = 0; j < gameChoosed.length; j++) {
        if (gameChoosed[j][0].includes("A" + game.id)) {
            specDetail = gameChoosed[j][1];
            gameExist = true;
        }
    }
    if (!gameExist) {
        var spec = loadSpecForCompare("A" + game.id, 0);
        var gameSpec = [];
        gameSpec.push("A" + game.id);
        specDetail = castListToSpec(spec);
        gameSpec.push(specDetail);
        gameChoosed.push(gameSpec);
    }
    if (specDetail !== null) {
        var specHolder = document.getElementById("itemDetailSpecMinimum");
        var specHolder1 = document.getElementById("itemDetailSpecRecommend");
        var specSwitchHolder = document.getElementById("itemDetailSpecSwitchHolder");
        specSwitchHolder.innerHTML = "";
        if (specDetail[0] != null) {
            var switchButton = createElementWithClassName("button", "btnSwitch");
            switchButton.id = "itemDetailMinimumBtn";
            switchButton.textContent = "Tối thiểu";
            switchButton.onclick = function () {
                specHolder.style.visibility = "visible";
                specHolder.style.cssFloat = "left";
                specHolder1.style.visibility = "hidden";
                specHolder1.style.cssFloat = "right";
                this.className = this.className.replace(" de-active", "");
                if (document.getElementById("itemDetailRecommendBtn") !== null) {
                    document.getElementById("itemDetailRecommendBtn").className += " de-active";
                }
                printSpecDetail(specHolder, specDetail[0]);
            };
            specSwitchHolder.appendChild(switchButton);
            switchButton.click();
        }
        if (specDetail[1] != null) {
            var switchButton1 = createElementWithClassName("button", "btnSwitch de-active");
            switchButton1.id = "itemDetailRecommendBtn";
            switchButton1.textContent = "Kiến nghị";
            switchButton1.onclick = function () {
                specHolder.style.visibility = "hidden";
                specHolder.style.cssFloat = "right";
                specHolder1.style.visibility = "visible";
                specHolder1.style.cssFloat = "left";
                this.className = this.className.replace(" de-active", "");
                document.getElementById("itemDetailMinimumBtn").className += " de-active";
                printSpecDetail(specHolder1, specDetail[1]);
            };
            specSwitchHolder.appendChild(switchButton1);
        }
    }
}

function printGearItemDetail(tabId, gearId) {
    var gear = null;
    for (var i = 0; i < gearArray.length; i++) {
        if (gearArray[i][0] === tabId) {
            for (var j = 0; j < gearArray[i][1].length; j++) {
                var tmpGear = gearArray[i][1][j];
                if (tmpGear.getAttribute("id") === gearId.substring(1)) {
                    gear = tmpGear;
                    break;
                }
            }
            break;
        }
    }
    if (gear != null) {
        document.getElementById("itemDetailName").innerHTML = "<span class='gearTxt'>" + gear.getElementsByTagName("name")[0].childNodes[0].nodeValue + "</span>";
        var x = gear.getElementsByTagName("price")[0].childNodes[0];
        var itemPrice = "";
        if (x != null) {
            itemPrice = x.nodeValue;
        }
        document.getElementById("itemDetailPrice").innerHTML = (itemPrice === "" || itemPrice === "đ") ? "<span class='noResult'>Không thông tin</span>" : itemPrice;
        document.getElementById("itemDetailImg").src = gear.getAttribute("img");
        var origin = createElementWithClassName("a", "linkToOrigin gearOri");
        origin.textContent = "Tới Fptshop";
        origin.href = "https://fptshop.com.vn" + gear.getAttribute("href");
        origin.target = "_blank";
        document.getElementById("itemDetailToOrigin").appendChild(origin);
        //Get that compare button
        var tab = document.getElementById(tabId + "Content");
        var items = tab.getElementsByClassName("item");
        var itemBaseOn = null;
        for (var k = 0; k < items.length; k++) {
            if (items[k].getAttribute("id") === gearId) {
                itemBaseOn = items[k];
                break;
            }
        }
        if (itemBaseOn != null) {
            var button = createElementWithClassName("button", "itemDetailCompareBtn gearOri");
            button.textContent = "So sánh";
            button.onclick = function () {
                btnCompareEvent(itemBaseOn);
            };
            document.getElementById("itemDetailToOrigin").appendChild(button);
        }
        //print spec
        var specSwitchHolder = document.getElementById("itemDetailSpecSwitchHolder");
        var specName = document.createElement("div");
        specName.textContent = "Cấu hình";
        specSwitchHolder.appendChild(specName);

        var gearExist = false;
        var specDetail = null;
        for (var z = 0; z < gearChoosed.length; z++) {
            if (gearChoosed[z][0].includes("B" + gear.id)) {
                specDetail = gearChoosed[z][1];
                gearExist = true;
            }
        }
        if (!gearExist) {
            var spec = loadSpecForCompare("B" + gear.id, 1);
            var gearSpec = [];
            gearSpec.push("B" + gear.id);
            specDetail = castListToSpec(spec);
            gearSpec.push(specDetail);
            gearChoosed.push(gearSpec);
        }
        if (specDetail !== null) {
            var specHolder = document.getElementById("itemDetailSpecMinimum");
            printSpecDetail(specHolder, specDetail[0]);
        }
    }
}

function printSpecDetail(specHolder, spec) {
    specHolder.innerHTML = "";
    var os = createElementWithClassName("div", "specDetail");
    var cpu = createElementWithClassName("div", "specDetail");
    var ram = createElementWithClassName("div", "specDetail");
    var gpu = createElementWithClassName("div", "specDetail");
    whatDidIJustDo(os, "Hệ điều hành: ", spec.os);
    whatDidIJustDo(cpu, "Vi xử lý: ", spec.processor);
    whatDidIJustDo(ram, "Bộ nhớ: ", spec.memory);
    whatDidIJustDo(gpu, "Đồ họa: ", spec.graphic);
    specHolder.appendChild(os);
    specHolder.appendChild(cpu);
    specHolder.appendChild(ram);
    specHolder.appendChild(gpu);
}

function whatDidIJustDo(parent, name, value) {
    var aSpan = createElementWithClassName("span", "specDetailName");
    aSpan.textContent = name;
    parent.appendChild(aSpan);
    var vSpan = createElementWithClassName("span", "specDetailValue");
    vSpan.innerHTML = (value !== "null" && value !== "" && value != null) ? value : "<span class='noResult'>Không thông tin</span>";
    parent.appendChild(vSpan);
}

function showItemDetail(position) {
    var screen = document.getElementById("itemDetailScreen");
    var screenBack = document.getElementById("itemDetailScreenBackScreen");
    var closeBtn = document.getElementById("btnItemDetailScreenHide");
    if (position === 0) {
        screen.style.left = 25 + "px";
        screen.style.right = "unset";
        closeBtn.style.right = 10 + "px";
        closeBtn.style.left = "unset";
    } else if (position === 1) {
        screen.style.right = 25 + "px";
        screen.style.left = "unset";
        closeBtn.style.left = 10 + "px";
        closeBtn.style.right = "unset";
    }
    screen.style.opacity = 1 + "";
    screen.style.visibility = "visible";
    screenBack.style.opacity = 1 + "";
    screenBack.style.visibility = "visible";
    wipeDataDetail();
}

function wipeDataDetail() {
    document.getElementById("itemDetailName").innerHTML = "";
    document.getElementById("itemDetailPrice").innerHTML = "";
    document.getElementById("itemDetailImg").src = "";
    document.getElementById("itemDetailTagHolder").innerText = "";
    document.getElementById("itemDetailToOrigin").innerHTML = "";

    document.getElementById("itemDetailSpecMinimum").innerHTML = "";
    document.getElementById("itemDetailSpecRecommend").innerHTML = "";
    document.getElementById("itemDetailSpecSwitchHolder").innerHTML = "";

    document.getElementById("itemDetailSpecMinimum").style.visibility = "visible";
    document.getElementById("itemDetailSpecRecommend").style.visibility = "hidden";
}

function hideItemTab() {
    var screen = document.getElementById("itemDetailScreen");
    screen.style.opacity = 0 + "";
    screen.style.visibility = "hidden";
    var screenBack = document.getElementById("itemDetailScreenBackScreen");
    screenBack.style.opacity = 0 + "";
    screenBack.style.visibility = "hidden";
    document.getElementById("itemDetailSpecRecommend").style.visibility = "hidden";
    document.getElementById("itemDetailSpecRecommend").style.cssFloat = "right";
    document.getElementById("itemDetailSpecMinimum").style.visibility = "hidden";
    document.getElementById("itemDetailSpecMinimum").style.cssFloat = "left";
}

function loginInByPressingEnter(e) {
    if (e.keyCode === 13) {
        document.getElementById("btnLogin").click();
    }
}

var gameIndex = 0;
gameCarousel();

function gameCarousel() {
    var i;
    var background = document.getElementById("gameBackground");
    var x = background.getElementsByTagName("img");
    for (i = 0; i < x.length; i++) {
        x[i].style.visibility = "hidden";
        x[i].style.opacity = "0";
    }
    gameIndex++;
    if (gameIndex > x.length) {
        gameIndex = 1
    }
    x[gameIndex - 1].style.visibility = "visible";
    x[gameIndex - 1].style.opacity = "1";
    setTimeout(gameCarousel, 2000);
}

var gearIndex = 0;
gearCarousel();

function gearCarousel() {
    var i;
    var background = document.getElementById("gearBackground");
    var x = background.getElementsByTagName("img");
    for (i = 0; i < x.length; i++) {
        x[i].style.visibility = "hidden";
        x[i].style.opacity = "0";
    }
    gearIndex++;
    if (gearIndex > x.length) {
        gearIndex = 1
    }
    x[gearIndex - 1].style.visibility = "visible";
    x[gearIndex - 1].style.opacity = "1";
    setTimeout(gearCarousel, 2000);
}

function switchBackground(type) {
    var gearBackground = document.getElementById("gearBackground");
    var gameBackground = document.getElementById("gameBackground");
    if (type === 1) {
        gameBackground.style.visibility = "hidden";
        gameBackground.style.opacity = "0";
        gearBackground.style.visibility = "visible";
        gearBackground.style.opacity = "1";
    }
    else {
        gearBackground.style.visibility = "hidden";
        gearBackground.style.opacity = "0";
        gameBackground.style.visibility = "visible";
        gameBackground.style.opacity = "1";
    }

}