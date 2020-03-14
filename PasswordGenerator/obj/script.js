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