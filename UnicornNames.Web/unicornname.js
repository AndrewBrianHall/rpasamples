var nameTable = {
    "A": "Productive",
    "B": "Vibrant",
    "C": "Moonbeam",
    "D": "Energetic",
    "E": "Brave",
    "F": "Whirlwind",
    "G": "Twilight",
    "H": "Glimmer",
    "I": "Joyful",
    "J": "Sunbeam",
    "K": "Emerald",
    "L": "Optimistic",
    "M": "Delightful",
    "N": "Confetti",
    "O": "Breezy",
    "P": "Sparkle",
    "Q": "Butterfly",
    "R": "Daffodil",
    "S": "Fancy",
    "T": "Cheerful",
    "U": "Creative",
    "V": "Sprinkle",
    "W": "Brilliant",
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
    "aug": "Summer-Dancer",
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