function getNextCharacter(charSets) {
    let set = Math.floor(Math.random() * charSets.length);
    let charSet = charSets[set];
    let i = Math.floor(Math.random() * charSet.length);
    return charSet.charAt(i);
}

function randomPassword(length) {
    const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const upperChaseChars = "ABCDEFGHIJKLMNOP";
    const numbers = '1234567890';
    const symbols = '!@#$%^&*()-+<>';
    const charSets = []
    if (document.getElementById('chkUpper').checked) {
        charSets.push(upperChaseChars);
    }
    if (document.getElementById('chkLower').checked) {
        charSets.push(lowerCaseChars);
    }
    if (document.getElementById('chkNumbers').checked) {
        charSets.push(numbers);
    }
    if (document.getElementById('chkSymbols').checked) {
        charSets.push(symbols);
    }

    let pass = "";
    for (var x = 0; x < length; x++) {

        pass += getNextCharacter(charSets);
    }

    return pass;
}

function generateNewPassword() {
    let length = Math.floor(document.getElementById('txt-length').value);
    let passWord = randomPassword(length);
    let el = document.getElementById('generated-password');
    el.innerText = passWord;
    document.activeElement.blur();
}

function keyDown(event) {
    if (event.keyCode === 13) {
        document.activeElement.blur();
    }
}

function copyToClipboard() {
    const el = document.createElement('textarea');
    el.value = document.getElementById('generated-password').innerText;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
};

window.addEventListener('DOMContentLoaded', function(event) {
    generateNewPassword();
});