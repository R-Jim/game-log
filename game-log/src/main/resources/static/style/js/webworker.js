var url = null;
onmessage = function (ev) {
    url = ev.data;
    checkStatus();
};

function checkStatus() {
    if (url != null) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                postMessage(this.responseText);
            }
        };
        xhttp.open("GET", url, true);
        xhttp.send();
        setTimeout("checkStatus()", 500);
    }
}

