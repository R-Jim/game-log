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
        var itemId = result[i].getAttribute("id");
        var imgSrc = result[i].getAttribute("img");
        var itemName = result[i].getAttribute("name");
        var x = result[i].getElementsByTagName("price")[0].childNodes[0];
        var itemPrice = "";
        if (x != null) {
            itemPrice = x.nodeValue;
        }
        var tags = result[i].getElementsByTagName("tags")[0];

        newItem(itemList, "A" + itemId, imgSrc, itemName, null, itemPrice, tags);
    }
}

function printGearData(doc, tabId) {
    var result = doc.getElementsByTagName("gear");

    var tabContent = document.getElementById(tabId + "Content");
    var itemList = tabContent.getElementsByClassName("itemList")[0];

    for (var i = 0; i < result.length; i++) {
        var itemId = result[i].getAttribute("id");
        var imgSrc = result[i].getAttribute("img");
        var itemName = result[i].getElementsByTagName("name")[0].childNodes[0].nodeValue;
        var x = result[i].getElementsByTagName("price")[0].childNodes[0];
        var itemPrice = "";
        if (x != null) {
            itemPrice = x.nodeValue;
        }
        newItem(itemList, "B" + itemId, imgSrc, itemName, null, itemPrice);
    }
}


function newItem(itemList, itemId, imgSrc, itemName, itemType, itemPrice, tags) {
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
    var item = createElementWithClassName("div", "item");
    item.id = itemId;

    var btnCompare = createElementWithClassName("div", "btnCompare");
    var tri = createElementWithClassName("div", "tri");
    var icon = createElementWithClassName("div", "icon");
    icon.textContent = "So Sánh";
    btnCompare.appendChild(tri);
    btnCompare.appendChild(icon);
    btnCompare.onclick = function () {
        btnCompareEvent(this);
    }

    item.appendChild(btnCompare);

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
    price.textContent = itemPrice;
    item.appendChild(price);

    var tagsUl = createElementWithClassName("ul", "itemTags");
    if (tags != null) {
        var tagArray = tags.getElementsByTagName("tag");
        for (var i = 0; i < tagArray.length; i++) {
            var tag = createElementWithClassName("li", "itemTag");
            tag.textContent = tagArray[i].childNodes[0].textContent;
            console.log(tagArray[i].childNodes[0]);
            tagsUl.appendChild(tag);
        }
        item.appendChild(tagsUl);
    }

    itemList.insertBefore(item, itemList.getElementsByClassName("btnLoadMore")[0]);
}

function btnCompareEvent(element) {
    var item = element.parentElement;
    var isGame = element.parentElement.parentElement.parentElement.className.includes("gameList");

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
    image.innerHTML = item.getElementsByClassName("itemImg")[0].innerHTML;
    image.className = "cmpItemImg";

    var cmpItemName = document.createElement("div");
    cmpItemName.className = "itemName";
    cmpItemName.textContent = item.getElementsByClassName("itemName")[0].textContent;

    var removeButton = document.createElement("button");
    removeButton.className = "removeCmpItemButton";
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

    var categoryId = document.getElementById(id + "DropSrch").value;
    var categoryUrl = (categoryId == "null") ? "" : "&categoryId=" + categoryId;
    var functionName = (type == 0) ? printGameData : printGearData;
    traversalDOMTree("GET", url + "?currentPage=" + currentPage.value + categoryUrl, functionName, id);
}

function sortByCategory(element, urlParam, type) {

    var id = element.id.substring(0, element.id.length - 8);
    var categoryId = element.value;

    var tabContent = document.getElementById(id + "Content");
    var itemList = tabContent.getElementsByClassName("itemList")[0];
    itemList.innerHTML = "";
    var btnLoadMore = createElementWithClassName("button", "btnLoadMore item");
    btnLoadMore.id = id + "LoadMore";
    btnLoadMore.textContent = "Tải thêm";
    btnLoadMore.onclick = function () {
        loadMore(this, url[type], type)
    }
    itemList.appendChild(btnLoadMore);

    for (var i = 0; i < element.childNodes.length; i++) {
        if (categoryId == element.childNodes[i].value) {
            document.getElementById(id + "TabDescription").textContent = " - " + element.childNodes[i].label;
        }
    }

    var functionName = (type == 0) ? printGameData : printGearData;
    traversalDOMTree("GET", urlParam + "?categoryId=" + categoryId, functionName, id);
}


//End traversal

var lastTab = null;
var tabCount = 1;
addTab(0, "tabIndicatorHolder", false);
addTab(1, "tabIndicatorHolder", false);
changeTab("tab" + 1);

function addTab(type, tabIndicatorHolder, isChangeTab) {
    var tabIndicatorHolder = document.getElementById(tabIndicatorHolder);
    var tabIndicator = document.createElement("div");
    tabIndicator.className = (type == 0) ? "gameTabIndicator tabIndicator" : "gearTabIndicator tabIndicator";

    var indicator = createElementWithClassName("ion-icon", "indicatorIndicator");
    indicator.name = (type == 0) ? "logo-game-controller-a" : "tv";

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
    var id = "tab" + tabCount;
    tabIndicator.id = id + "Indicator";
    tabIndicator.appendChild(a);
    tabIndicator.onclick = function () {
        var id = this.id.substring(0, this.id.length - 9);
        changeTab(id);
    }

    tabIndicatorHolder.insertBefore(tabIndicator, tabIndicatorHolder.childNodes[tabIndicatorHolder.childNodes.length - 2]);
    if (lastTab == null && isChangeTab) {
        changeTab(id);
    }
    addTabContent(id, type);

    var currentPage = document.getElementById(id + "CurrentPage");
    currentPage.value = 1;
    var url = (type == 0) ? "http://localhost:8080/game" : "http://localhost:8080/gear";
    var functionName = (type == 0) ? printGameData : printGearData;
    traversalDOMTree("GET", url, functionName, id);
    traversalDOMTree("GET", url + "/category", printCategoryData, id);

    tabCount++;
}

function addTabContent(tabId, type) {
    var tabContent = createElementWithClassName("div", "tab");
    tabContent.id = tabId + "Content";

    var tabUtitlites = createElementWithClassName("div", (type == 0) ? "tabUtilities gameUti" : "tabUtilities gearUti");

    var inputCurrentPage = document.createElement("input");
    inputCurrentPage.id = tabId + "CurrentPage";
    inputCurrentPage.type = "hidden";
    tabUtitlites.appendChild(inputCurrentPage);

    var tabUtility = createElementWithClassName("span", "tabUtility");
    var tabName = createElementWithClassName("div", "tabNameContent");
    var indicator = createElementWithClassName("ion-icon", "tabTxtNameIcon");
    indicator.name = (type == 0) ? "logo-game-controller-a" : "tv";
    tabName.appendChild(indicator);
    var tabTxtName = createElementWithClassName("span", "tabTxtName");
    tabTxtName.textContent = (type == 0) ? "Game" : "Gear";
    var tabTxtDescription = createElementWithClassName("span", "");
    tabTxtDescription.id = tabId + "TabDescription";
    tabTxtName.appendChild(tabTxtDescription);
    tabName.appendChild(tabTxtName);

    tabUtility.appendChild(tabName);

    // var text = document.createElement("span");
    // text.textContent = "Tìm Kiếm ";
    // tabUtility.appendChild(text);
    // var txtSearch = document.createElement("input");
    // tabUtility.appendChild(txtSearch);
    tabUtitlites.appendChild(tabUtility);

    tabUtility = createElementWithClassName("span", "tabUtility");
    text = document.createElement("span");
    text.textContent = "Lọc ";
    tabUtility.appendChild(text);
    var dropbox = document.createElement("select");
    dropbox.id = tabId + "DropSrch";
    dropbox.onchange = function () {
        sortByCategory(this, url[type], type);
    }
    var defaultDB = document.createElement("option");
    defaultDB.label = "Tất cả";
    defaultDB.value = null;
    dropbox.appendChild(defaultDB);
    tabUtility.appendChild(dropbox);
    tabUtitlites.appendChild(tabUtility);
    tabContent.appendChild(tabUtitlites);

    var className = (type == 0) ? "gameList" : "gearList";
    var itemListHolder = createElementWithClassName("div", "itemListHolder " + className);
    var itemList = createElementWithClassName("div", "itemList");
    itemListHolder.appendChild(itemList);
    var btnLoadMore = createElementWithClassName("button", "btnLoadMore item");
    btnLoadMore.id = tabId + "LoadMore";
    btnLoadMore.textContent = "Tải thêm";
    btnLoadMore.onclick = function () {
        loadMore(this, url[type], type)
    }
    itemList.appendChild(btnLoadMore);
    tabContent.appendChild(itemListHolder);


    var mainContent = document.getElementById("mainContent");
    mainContent.appendChild(tabContent);
}

var cmpUp = false;

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

function compareScreenPopUp() {
    var cmpScreen = document.getElementById("compareScreen");
    var visible = cmpScreen.style.visibility;
    if (visible == "hidden" || visible == "") {
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
        game.id = games[i].id;
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
        game.onclick = function (ev) {
            setIdForCmp(true, this.id);
            comparingGameAndGear(true);
            var btnMinimum = document.getElementById("switchCmpModeMinimum");
            btnMinimum.onclick = function (ev2) {
                comparingGameAndGear(true);
            }
            btnMinimum.disabled = false;
            var btnRecommend = document.getElementById("switchCmpModeRecommend");
            btnRecommend.disabled = true;
            if (this.className.includes("hasRecommend")) {
                btnRecommend.disabled = false;
                btnRecommend.onclick = function (ev2) {
                    comparingGameAndGear(false);
                }
            }
        }
        gameHolder.appendChild(game);
    }

    for (var i = 0; i < gears.length; i++) {
        var gear = document.createElement("div");
        gear.id = gears[i].id;
        gear.className = "cmpScreenItem";
        var gearExist = false;
        for (var j = 0; j < gearChoosed; j++) {
            if (gearChoosed[j].includes(gears[i].id)) {
                gearExist = true;
            }
        }
        if (!gearExist) {
            var spec = loadSpecForCompare(gears[i].id, 1);
            var gearSpec = [];
            gearSpec.push(gears[i].id);
            gearSpec.push(castListToSpec(spec));
            gearChoosed.push(gearSpec);
        }
        gear.innerHTML = gears[i].innerHTML;
        gear.onclick = function (ev) {
            setIdForCmp(false, this.id);
            comparingGameAndGear(true);
        }
        gear.getElementsByClassName("removeCmpItemButton")[0].remove();
        gearHolder.appendChild(gear);
    }
    document.getElementById("switchCmpModeMinimum").disabled = true;
    document.getElementById("switchCmpModeRecommend").disabled = true;
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
    var normalArrayPlease = []
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
        gameIdCmpChoose = value;
    } else {
        gearIdCmpChoose = value;
    }
}

function comparingGameAndGear(isMinimum) {
    document.getElementById("errorResult").textContent = "";
    clearCmpData();
    if (gameIdCmpChoose != null && gearIdCmpChoose != null) {
        var game;
        var gear;

        for (var i = 0; i < gameChoosed.length; i++) {
            if (gameChoosed[i][0] == gameIdCmpChoose) {
                game = gameChoosed[i];
            }
        }
        for (var i = 0; i < gearChoosed.length; i++) {
            if (gearChoosed[i][0] == gearIdCmpChoose) {
                gear = gearChoosed[i];
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

        document.getElementById("osGameResult").textContent = (gameSpec.os != "null") ? gameSpec.os : "No Content";
        document.getElementById("cpuGameResult").textContent = (gameSpec.processor != "null") ? gameSpec.processor : "No Content";
        document.getElementById("ramGameResult").textContent = (gameSpec.memory != "null") ? gameSpec.memory : "No Content";
        document.getElementById("graphicGameResult").textContent = (gameSpec.graphic != "null") ? gameSpec.graphic : "No Content";
        document.getElementById("osGearResult").textContent = (gear[1][0].os != "null") ? gear[1][0].os : "No Content";
        document.getElementById("cpuGearResult").textContent = (gear[1][0].processor != "null") ? gear[1][0].processor : "No Content";
        document.getElementById("ramGearResult").textContent = (gear[1][0].memory != "null") ? gear[1][0].memory : "No Content";
        document.getElementById("graphicGearResult").textContent = (gear[1][0].graphic != "null") ? gear[1][0].graphic : "No Content";
    } else {
        document.getElementById("errorResult").textContent = "Are you missing something ?";
    }
}

function runScoreBar(typeScoreId, score) {
    var typeScoreHolder = document.getElementById(typeScoreId);
    if (score > 0) {
        var scorebar = typeScoreHolder.getElementsByClassName("meterGame")[0].getElementsByClassName("scoreBar")[0];
        scorebar.style.width = 20 * score + "px";
    } else {
        var scorebar = typeScoreHolder.getElementsByClassName("meterGear")[0].getElementsByClassName("scoreBar")[0];
        scorebar.style.width = -1 * 20 * score + "px";
    }
}

function clearCmpData() {
    var scorebars = document.getElementById("cmpResult").getElementsByClassName("scoreBar");
    for (var i = 0; i < scorebars.length; i++) {
        scorebars[i].style.width = "0px";
    }

    document.getElementById("osGameResult").textContent = "";
    document.getElementById("cpuGameResult").textContent = "";
    document.getElementById("ramGameResult").textContent = "";
    document.getElementById("graphicGameResult").textContent = "";
    document.getElementById("osGearResult").textContent = "";
    document.getElementById("cpuGearResult").textContent = "";
    document.getElementById("ramGearResult").textContent = "";
    document.getElementById("graphicGearResult").textContent = "";
}

var gamesInCompareTab = false;

function tabToolBarVisible() {
    var element = document.getElementById("tabToolbarOverlay");
    element.style.visibility = (element.style.visibility == "visible" || element.style.visibility == "") ? "hidden" : "visible";
    var tabToolbar = document.getElementById("tabToolbar");
    tabToolbar.style.visibility = (tabToolbar.style.visibility == "hidden" || tabToolbar.style.visibility == "") ? "visible" : "hidden";
}

function loadSpec(url) {
    var xhttp = new XMLHttpRequest();
    console.log(url);
    var entity;
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
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

    // console.log(compareOsStat(os[1][2], os[2][3]));
    // console.log(cpu.toString());
    // compareCpuStat("Intel Core i7-4790 4.0GHz or equivalent", "Intel Celeron 1.10 GHz");
    // compareGpuStat("NVIDIA GeForce 940MX 4 GB","Intel HD Graphics 3000 or equivalent");
}

function loadTypeToList(url) {
    var xhttp = new XMLHttpRequest();
    console.log(url);
    var tmpArray = [];
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
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
    for (var i = 0; i < array.length; i++) {
        var txt = array[i].match("(Windows|Win|Window)( \\w*)*8");
        if (txt != null) {
            window8Array.push(array[i]);
            array.splice(i, 1);
            i--
        }
    }
    processedArray[2] = window8Array;
    var window10Array = [];
    for (var i = 0; i < array.length; i++) {
        var txt = array[i].match("(Windows|Win|Window)( \\w*)*10");
        if (txt != null) {
            window10Array.push(array[i]);
            array.splice(i, 1);
            i--
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
    for (var i = 0; i < array.length; i++) {
        var txt = array[i].match("(^3|[^\\d.]3)\\.?\\d{0,3} ?(GHz|GHZ|Ghz|ghz)");
        if (txt != null) {
            _3GHzArray.push(array[i]);
            array.splice(i, 1);
            i--;
        }
    }

    var _2GHzArray = [];
    for (var i = 0; i < array.length; i++) {
        var txt = array[i].match("(^2|[^\\d.]2)\\.?\\d{0,3} ?(GHz|GHZ|Ghz|ghz)");
        if (txt != null) {
            _2GHzArray.push(array[i]);
            array.splice(i, 1);
            i--;
        }
    }

    var _1GHzArray = [];
    for (var i = 0; i < array.length; i++) {
        var txt = array[i].match("(^1|[^\\d.]1)\\.?\\d{0,3} ?(GHz|GHZ|Ghz|ghz)");
        if (txt != null) {
            _1GHzArray.push(array[i]);
            array.splice(i, 1);
            i--;
        }
    }

    var IntelArray = [];
    for (var i = 0; i < array.length; i++) {
        var txt = array[i].match("(Intel|Core i|i\\d)");
        if (txt != null) {
            IntelArray.push(array[i]);
            array.splice(i, 1);
            i--;
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
    for (var i = 0; i < array.length; i++) {
        var txt = array[i].match("(Geforce|GTX|GeForce|GEFORCE|NVIDIA|Nvidia|GT|geforce|gtx|Ge force)");
        if (txt != null) {
            geforceArray.push(array[i]);
            array.splice(i, 1);
            i--;
        }
    }

    var amdArray = [];
    for (var i = 0; i < array.length; i++) {
        var txt = array[i].match("(AMD|Radeon)");
        if (txt != null) {
            amdArray.push(array[i]);
            array.splice(i, 1);
            i--;
        }
    }

    var vramArray = [];
    for (var i = 0; i < array.length; i++) {
        var txt = array[i].match("(VRAM|RAM|MB|GB|mb|Mb)");
        if (txt != null) {
            vramArray.push(array[i]);
            array.splice(i, 1);
            i--;
        }
    }

    var directXArray = [];
    for (var i = 0; i < array.length; i++) {
        var txt = array[i].match("(DX|DirectX|Direct)");
        if (txt != null) {
            directXArray.push(array[i]);
            array.splice(i, 1);
            i--;
        }
    }

    var resolutionArray = [];
    for (var i = 0; i < array.length; i++) {
        var txt = array[i].match("\\d ?(x|X) ?\\d");
        if (txt != null) {
            resolutionArray.push(array[i]);
            array.splice(i, 1);
            i--;
        }
    }
    //get other shit
    processedArray[0] = array;
    processedArray[1] = resolutionArray;
    processedArray[2] = sortSpec(directXArray, "X®? ?\\d{1,}\\.?\\d?", /X|®/g, "", true);
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
                        // console.log(parseFloat(txt[0].replace(replace, to)));
                        if (parseFloat(txt[0].replace(replace, to)) > parseFloat(txtJ[0].replace(replace, to))) {
                            var swamp = array[i];
                            array[i] = array[j];
                            array[j] = swamp;
                        }
                    } else {
                        if (txt[0].replace(replace, to) > txtJ[0].replace(replace, to)) {
                            var swamp = array[i];
                            array[i] = array[j];
                            array[j] = swamp;
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
                if (txt[1].toLowerCase().trim() == "gb") {
                    multi = 1024;//convert to MB
                }
                ramI = parseInt(txt[0].substring(0, index)) * multi;
            }
            var txtJ = array[j].match("\\d{1,} ?(VRAM|RAM|MB|GB|mb|Mb)");
            if (txtJ != null) {
                var multi = 1;
                var index = txtJ[0].indexOf(txtJ[1]);
                if (txtJ[1].toLowerCase().trim() == "gb") {
                    multi = 1024;//convert to MB
                }
                ramJ = parseInt(txtJ[0].substring(0, index)) * multi;
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
            if (index == -1) {
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
            if (index == -1) {
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
            if (os1 == os[i][j]) {
                console.log("1: " + i + "|" + j);
                os1Score = i ^ 1.3 * j / os[i].length * 1.5;
            }
            if (os2 == os[i][j]) {
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
            if (cpu1 == cpu[i][j]) {
                score1 = i ^ 1.5 + j / cpu[i].length * 4;
            }
            if (cpu2 == cpu[i][j]) {
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
            if (gpu1 == gpu[i][j]) {
                score1 = i ^ 1.5 + j / gpu[i].length * 4;
            }
            if (gpu2 == gpu[i][j]) {
                score2 = i ^ 1.5 + j / gpu[i].length * 4;
            }
        }
    }
    console.log("Result: " + score1 + "," + score2);
    return score1 - score2;
}
