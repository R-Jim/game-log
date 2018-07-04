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

        newItem(itemList, "A" + itemId, imgSrc, itemName, null, itemPrice);
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


function newItem(itemList, itemId, imgSrc, itemName, itemType, itemPrice) {
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

    itemList.appendChild(item);
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
    cmpItemName.textContent = item.getElementsByClassName("itemName")[0].textContent;

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

function loadMore(element, url, type) {
    var id = element.id.substring(0, element.id.length - 8);
    var currentPage = document.getElementById(id + "CurrentPage");
    currentPage.value = +currentPage.value + 1;

    var categoryId = document.getElementById(id + "DropSrch").value;
    var categoryUrl = (categoryId == "null") ? "" : "&categoryId=" + categoryId;
    var functionName = (type == 0) ? printGameData : printGearData;
    traversalDOMTree("GET", url + "?currentPage=" + currentPage.value + categoryUrl, functionName, id);
}

function sortByCategory(element, url, type) {

    var id = element.id.substring(0, element.id.length - 8);
    var categoryId = element.value;

    var tabContent = document.getElementById(id + "Content");
    var itemList = tabContent.getElementsByClassName("itemList")[0];
    itemList.innerHTML = "";

    var functionName = (type == 0) ? printGameData : printGearData;
    traversalDOMTree("GET", url + "?categoryId=" + categoryId, functionName, id);
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

    // tabIndicatorHolder.appendChild(tabIndicator);
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

    var tabUtitlites = createElementWithClassName("div", "tabUtilities");

    var inputCurrentPage = document.createElement("input");
    inputCurrentPage.id = tabId + "CurrentPage";
    inputCurrentPage.type = "hidden";
    tabUtitlites.appendChild(inputCurrentPage);

    var tabUtility = createElementWithClassName("span", "tabUtility");
    var text = document.createElement("span");
    text.textContent = "Tìm Kiếm";
    tabUtility.appendChild(text);
    var txtSearch = document.createElement("input");
    tabUtility.appendChild(txtSearch);
    tabUtitlites.appendChild(tabUtility);

    tabUtility = createElementWithClassName("span", "tabUtility");
    text = document.createElement("span");
    text.textContent = "Lọc";
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
    var btnLoadMore = createElementWithClassName("button", "btnLoadMore");
    btnLoadMore.id = tabId + "LoadMore";
    btnLoadMore.textContent = "Tải thêm";
    btnLoadMore.onclick = function () {
        loadMore(this, url[type], type)
    }
    itemListHolder.appendChild(btnLoadMore);
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

var gamesInCompareTab = false;

function tabToolBarVisible() {
    var element = document.getElementById("tabToolbarOverlay");
    element.style.visibility = (element.style.visibility == "visible" || element.style.visibility == "") ? "hidden" : "visible";
    var tabToolbar = document.getElementById("tabToolbar");
    tabToolbar.style.visibility = (tabToolbar.style.visibility == "hidden" || tabToolbar.style.visibility == "") ? "visible" : "hidden";
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
    compareGpuStat("NVIDIA GeForce 940MX 4 GB","Intel HD Graphics 3000 or equivalent");
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
            if (ramI > ramJ){
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
    return (ramI - ramJ) / 1024;
}

function compareOsStat(os1, os2) {
    var os1Score = 0;
    var os2Score = 0;
    for (var i = 0; i < os.length; i++) {
        for (var j = 0; j < os[i].length; j++) {
            if (os1 == os[i][j]) {
                os1Score = i * j * 0.75;
            }
            if (os2 == os[i][j]) {
                os2Score = i * j * 0.75;
            }
        }
    }
    return os1Score - os2Score;
}

function compareCpuStat(cpu1, cpu2) {
    var score1 = 0;
    var score2 = 0;
    for (var i = 0; i < cpu.length; i++) {
        for (var j = 0; j < cpu[i].length; j++) {
            if (cpu1 == cpu[i][j]) {
                score1 = i ^ 1.5 + j / cpu[i].length;
            }
            if (cpu2 == cpu[i][j]) {
                score2 = i ^ 1.5 + j / cpu[i].length;
            }
        }
    }
    console.log("Result: " + score1 + "," + score2);
    return score1 - score2;
}

function compareGpuStat(gpu1,gpu2) {
    var score1 = 0;
    var score2 = 0;
    for (var i = 0; i < gpu.length; i++) {
        for (var j = 0; j < gpu[i].length; j++) {
            if (gpu1 == gpu[i][j]) {
                score1 = i ^ 1.5 + j / gpu[i].length;
            }
            if (gpu2 == gpu[i][j]) {
                score2 = i ^ 1.5 + j / gpu[i].length;
            }
        }
    }
    console.log("Result: " + score1 + "," + score2);
    return score1 - score2;
}