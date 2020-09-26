let nameTable = {
    A: "Radiant",
    B: "Vibrant",
    C: "Moonbeam",
    D: "Energetic",
    E: "Brave",
    F: "Whirlwind",
    G: "Twilight",
    H: "Glimmer",
    I: "Joyful",
    J: "Sunbeam",
    K: "Emerald",
    L: "Optimistic",
    M: "Delightful",
    N: "Confetti",
    O: "Breezy",
    P: "Sparkle",
    Q: "Butterfly",
    R: "Daffodil",
    S: "Fancy",
    T: "Cheerful",
    U: "Creative",
    V: "Sprinkle",
    W: "Brilliant",
    X: "Amethyst",
    Y: "Gracious",
    Z: "Bumblebee"
};

let birthdayTable = {
    jan: "Crystal-Dazzler",
    feb: "Twinkle-Sweet",
    mar: "Glitter-Blossom",
    apr: "Nimble-Flower",
    may: "Snowflake-Dream",
    jun: "Cloud-Jumper",
    jul: "Raindrop-Mist",
    aug: "Summer-Dancer",
    sep: "Moon-Clover",
    oct: "Feather-Wind",
    nov: "Starshine-Blazer",
    dec: "Frost-Fire"
}

let Months = Array('jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec');

let nameField = "txtName";
let monthField = "selMonth";
let outputField = "lblUnicornName";
let collapseClass = "collapse";
let progressElement = "pgrIndicator";
let placeholderClass = "text-placeholder";
let delay = 300;

function formIsValid() {
    let name = document.getElementById(nameField).value;
    let monthEl = document.getElementById(monthField);
    let month = monthEl.value; //getBirthMonth();

    monthEl.blur();

    if (!checkValue(name)) {
        return false;
    } else if (!checkValue(month)) {
        return false;
    }

    return true;
}

function enableButton() {
    let btn = document.getElementById("getNameButton");
    btn.classList.remove("disabled-button");
}

function disableButton() {
    let btn = document.getElementById("getNameButton");
    btn.classList.add("disabled-button");
}

function formFieldChanged() {
    if (formIsValid()) {
        enableButton();
    } else {
        disableButton();
    }
}

function getUnicornName() {
    let name = document.getElementById(nameField).value;
    let month = document.getElementById(monthField).value; //getBirthMonth();

    let error = false;
    if (!checkValue(name)) {
        let el = document.getElementById("lblNameError");
        el.classList.remove("hidden");
        error = true;
    }
    if (!checkValue(month)) {
        let el = document.getElementById("lblMonthError");
        el.classList.remove("hidden");
        error = true;
    }

    if (error) {
        return;
    }



    inProgress();
    setUnicornName(name, month);

    setTimeout(completed, delay);
}

function getBirthMonth() {
    let month = document.getElementById(monthField).value;
    if (month === '') {
        let monthNum = 0;
        let name = document.getElementById(nameField).value;
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
    let outputBlock = document.getElementById("outputBlock");
    outputBlock.classList.remove("hidden");
    let nameEl = document.getElementById(outputField);
    let progressEl = document.getElementById(progressElement)
    nameEl.classList.add(collapseClass);
    progressEl.classList.remove(collapseClass);
    progressEl.classList.add("spin");
    hideInputTable();
}

function completed() {
    let nameEl = document.getElementById(outputField);
    let progressEl = document.getElementById(progressElement)

    nameEl.classList.remove(collapseClass);
    // nameEl.classList.remove(placeholderClass)
    progressEl.classList.add(collapseClass);
    progressEl.classList.remove("spin");

    showInputTable();

    //removeIf(production)
    if (!isLocal()) {
        //endRemoveIf(production)
        document.getElementById(nameField).value = '';
        document.getElementById(monthField).value = '';
        //removeIf(production)
    }
    //endRemoveIf(production)
}

function isASCII(str) {
    return /^[\x00-\x7F]*$/.test(str);
}

function getUnicornFirstName(inputName) {
    let name = nameTable["A"];

    try {
        //It's a number, convert to a letter
        if (!isNaN(inputName)) {
            inputName = String.fromCharCode(65 + (inputName % 26));
        }

        let firstLetter = inputName.substring(0, 1).toUpperCase();
        if (!isASCII(firstLetter)) {
            firstLetter = String.fromCharCode(65 + (firstLetter.charCodeAt(0) % 26))
        }
        if (nameTable[firstLetter] !== undefined) {
            name = nameTable[firstLetter];
        }

    } catch (err) {

    }

    return name;
}

function setUnicornName(name, month) {
    let firstName = getUnicornFirstName(name);
    let unicornName = firstName + " " + birthdayTable[month];

    let output = document.getElementById(outputField);
    output.innerText = unicornName;
}

function hideInputTable() {
    // let table = document.getElementById('tblDisplayInput');

    // table.classList.add('collapse');
}

function showInputTable() {
    let name = document.getElementById(nameField);
    let monthDropdown = document.getElementById(monthField);
    let monthStr = monthDropdown.options[monthDropdown.selectedIndex].text;

    // let table = document.getElementById('tblDisplayInput');
    let nameLable = document.getElementById('lblOriginalName');
    let bdayLabel = document.getElementById('lblOriginalBirthday');

    if (monthDropdown.value === '') {
        monthStr = '';
    }

    // table.classList.remove('collapse');

    nameLable.innerText = name.value;
    bdayLabel.innerText = monthStr;

}

function checkValue(value) {
    if (value === null || value === "") {
        return false;
    }
    return true;
}

//removeIf(production)
function addTestValues() {
    document.getElementById(nameField).value = "Andrew";
    document.getElementById(monthField).value = "nov";
    enableButton();
}

function isLocal() {
    try {
        // IE doesn't support .startsWith
        let fromFile = window.location.href.toLocaleLowerCase().indexOf("file:///c:/") === 0;
        let queryOverride = window.location.search.toLocaleLowerCase().indexOf("nodefaults") === -1;
        console.log(window.location.search);
        return fromFile && queryOverride;
    } catch (error) {
        return false;
    }
}

if (isLocal()) {
    document.addEventListener("DOMContentLoaded", addTestValues, false);
}
//endRemoveIf(production)