var sdkInstance = "appInsightsSDK";
window[sdkInstance] = "appInsights";
var aiName = window[sdkInstance],
    aisdk = window[aiName] || function(e) {
        function n(e) {
            t[e] = function() {
                var n = arguments;
                t.queue.push(function() {
                    t[e].apply(t, n)
                })
            }
        }
        var t = {
            config: e
        };
        t.initialize = !0;
        var i = document,
            a = window;
        setTimeout(function() {
            var n = i.createElement("script");
            n.src = e.url || "https://az416426.vo.msecnd.net/scripts/b/ai.2.min.js", i.getElementsByTagName("script")[0].parentNode.appendChild(n)
        });
        try {
            t.cookie = i.cookie
        } catch (e) {}
        t.queue = [], t.version = 2;
        for (var r = ["Event", "PageView", "Exception", "Trace", "DependencyData", "Metric", "PageViewPerformance"]; r.length;) n("track" + r.pop());
        n("startTrackPage"), n("stopTrackPage");
        var s = "Track" + r[0];
        if (n("start" + s), n("stop" + s), n("setAuthenticatedUserContext"), n("clearAuthenticatedUserContext"), n("flush"), !(!0 === e.disableExceptionTracking || e.extensionConfig && e.extensionConfig.ApplicationInsightsAnalytics && !0 === e.extensionConfig.ApplicationInsightsAnalytics.disableExceptionTracking)) {
            n("_" + (r = "onerror"));
            var o = a[r];
            a[r] = function(e, n, i, a, s) {
                var c = o && o(e, n, i, a, s);
                return !0 !== c && t["_" + r]({
                    message: e,
                    url: n,
                    lineNumber: i,
                    columnNumber: a,
                    error: s
                }), c
            }, e.autoExceptionInstrumented = !0
        }
        return t
    }({
        instrumentationKey: "82237e6b-1220-4b29-ba1c-403ad6d99497"
    });
window[aiName] = aisdk, aisdk.queue && 0 === aisdk.queue.length && aisdk.trackPageView({});
var nameTable = {
    "A": "Mystic",
    "B": "Lemonade",
    "C": "Moonbeam",
    "D": "Rainbow",
    "E": "Princess",
    "F": "Whirlwind",
    "G": "Twilight",
    "H": "Glimmer",
    "I": "Joyful",
    "J": "Sunbeam",
    "K": "Emerald",
    "L": "Ladybug",
    "M": "Violet",
    "N": "Confetti",
    "O": "Breezy",
    "P": "Sparkle",
    "Q": "Butterfly",
    "R": "Daffodil",
    "S": "Fancy",
    "T": "Duchess",
    "U": "Sassy",
    "V": "Sprinkle",
    "W": "Queen",
    "X": "Amethyst",
    "Y": "Gracious",
    "Z": "Bumblebee"
};

var birthdayTable = {
    "jan": "Crystal-Dazzler",
    "feb": "Twinkle-Sweet",
    "mar": "Glitter-Blossom",
    "apr": "Nimble-Flower",
    "may": "Snowflake-Dream",
    "jun": "Cloud-Jumper",
    "jul": "Raindrop-Mist",
    "aug": "Spirit-Dancer",
    "sep": "Moon-Clover",
    "oct": "Feather-Wind",
    "nov": "Starshine-Blazer",
    "dec": "Frost-Fire"
}

var Months = Array('jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec');

var nameField = "txtName";
var monthField = "selMonth";
var outputField = "lblUnicornName";
var collapseClass = "collapse";
var progressElement = "pgrIndicator";
var placeholderClass = "text-placeholder";
var delay = 400;

function getUnicornName() {
    var name = document.getElementById(nameField).value;
    var month = getBirthMonth();

    if (!checkValue(name)) {
        alert("Enter your name");
        return;
    } else if (!checkValue(month)) {
        alert("Enter your birthday month");
        return;
    }

    inProgress();
    setUnicornName(name, month);

    setTimeout(completed, delay);
}

function getBirthMonth() {
    var month = document.getElementById(monthField).value;
    if (month === '') {
        var monthNum = 0;
        var name = document.getElementById(nameField).value;
        try {
            monthNum = name.charCodeAt(1) % 12;
        } catch (error) {
            monthNum = name.length % 12;
        }
        return Months[monthNum];
    }

    return month;
}

function inProgress() {
    var nameEl = document.getElementById(outputField);
    var progressEl = document.getElementById(progressElement)
    nameEl.classList.add(collapseClass);
    progressEl.classList.remove(collapseClass);
    progressEl.classList.add("spin");
    hideInputTable();
}

function completed() {
    var nameEl = document.getElementById(outputField);
    var progressEl = document.getElementById(progressElement)

    nameEl.classList.remove(collapseClass);
    nameEl.classList.remove(placeholderClass)
    progressEl.classList.add(collapseClass);
    progressEl.classList.remove("spin");

    showInputTable();

    if (!isLocal()) {
        document.getElementById(nameField).value = '';
        document.getElementById(monthField).value = '';
    }
}

function setUnicornName(name, month) {
    var firstLetter = name.substring(0, 1).toUpperCase();
    var unicornName = nameTable[firstLetter] + " " + birthdayTable[month];

    var output = document.getElementById(outputField);
    output.innerText = unicornName;
}

function hideInputTable() {
    var table = document.getElementById('tblDisplayInput');

    table.classList.add('collapse');
}

function showInputTable() {
    var name = document.getElementById(nameField);
    var monthDropdown = document.getElementById(monthField);
    var monthStr = monthDropdown.options[monthDropdown.selectedIndex].text;

    var table = document.getElementById('tblDisplayInput');
    var nameLable = document.getElementById('lblOriginalName');
    var bdayLabel = document.getElementById('lblOriginalBirthday');

    if (monthDropdown.value === '') {
        monthStr = '';
    }

    table.classList.remove('collapse');

    nameLable.innerText = name.value;
    bdayLabel.innerText = monthStr;

}

function checkValue(value) {
    if (value === null || value === "") {
        return false;
    }
    return true;
}

function addTestValues() {
    document.getElementById(nameField).value = "Andrew";
    document.getElementById(monthField).value = "nov";
}

function isLocal() {
    try {
        // IE doesn't support .startsWith
        var fromFile = window.location.href.toLocaleLowerCase().indexOf("file:///c:/") === 0;
        var queryOverride = window.location.search.toLocaleLowerCase().indexOf("nodefaults") === -1;
        console.log(window.location.search);
        return fromFile && queryOverride;
    } catch (error) {
        return false;
    }
}

if (isLocal()) {
    document.addEventListener("DOMContentLoaded", addTestValues, false);
}