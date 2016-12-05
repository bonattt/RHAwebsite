function setup() {
    var xhr = getEvents();
    xhr.send();
    setTimeout(function() {createHTMLFromResponseText(xhr.responseText)}, 300);

    function createHTMLFromResponseText(funds) {
        funds = JSON.parse(funds);

        var html = "<table border='1' align='center' bordercolor='#808080' id='floor-money'><tbody><tr>";
        html += "<td align='middle' width='200'><b>Floor</b></td><td align='middle' width='60'><b>Balance</b></td>";
        html += "<td align='middle' width='200'><b>Floor</b></td><td align='middle' width='60'><b>Balance</b></td></tr>";
        var countForColoring = 0;
        for (var i = 0; i < funds.length - 1; i += 2) {
            if (funds[i].display_on_site) {
                if(countForColoring % 2 == 0){
                html += "<tr bgcolor='#f0f0f0'><td>" + funds[i].fund_name + "</td>";
                } else{
                html += "<tr><td>" + funds[i].fund_name + "</td>";
                }
                html += "<td align='right'>" + funds[i].funds_amount + "</td>";
                html += "<td>" + funds[i + 1].fund_name + "</td>";
                html += "<td align='right'>" + funds[i + 1].funds_amount + "</td></tr>";
                countForColoring++;
            }
        }
        var floorMoneyTable = document.getElementById("floorMoneyTable");
        floorMoneyTable.innerHTML += html;
    }

    function getEvents() {
        var url = 'http://rha-website-1.csse.rose-hulman.edu:3000/api/v1/funds';
        function createCORSRequest(method, url) {
            var xhr = new XMLHttpRequest();
            if ("withCredentials" in xhr) {

            // Check if the XMLHttpRequest object has a "withCredentials" property.
            // "withCredentials" only exists on XMLHTTPRequest2 objects.
                xhr.open(method, url, true);

            } else if (typeof XDomainRequest != "undefined") {

            // Otherwise, check if XDomainRequest.
            // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
                xhr = new XDomainRequest();
                xhr.open(method, url);

            } else {

            // Otherwise, CORS is not supported by the browser.
                xhr = null;

            }
            return xhr;
        }

        var xhr = createCORSRequest('GET', url);
        // console.log(xhr);
        if (!xhr) {
          throw new Error('CORS not supported');
        }

        xhr.onload = function () {
            var responseText = xhr.responseText;
            // return responseText;
        }

        xhr.onerror = function() {
            console.log("There was an error");
        }
        // xhr.send();
        // console.log(xhr);
        return xhr;

    }    
} 


// window.onload = function() {
//     setup();
// };

document.addEventListener("DOMContentLoaded", function(event) {
    setup();
});