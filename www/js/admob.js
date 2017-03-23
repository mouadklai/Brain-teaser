function runads() {
    document.addEventListener("deviceready", onDeviceReady, false);
}
 function onRequestSuccess(success) {
            console.log("Successfully set requested accuracy: " + success.message);
        }

        function onRequestFailure(error) {
            console.error("Accuracy request failed: error code=" + error.code + "; error message=" + error.message);
            if (window.confirm("Failed to automatically set Location Mode to 'High Accuracy'. Would you like to switch to the Location Settings page and do this manually?")) {
                    cordova.plugins.diagnostic.switchToLocationSettings();
                }
            }
        
        function activelocal() {
            document.addEventListener("deviceready", function () {
                cordova.plugins.locationAccuracy.request(onRequestSuccess, onRequestFailure, cordova.plugins.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY);
            }, false);
        }
function initAds() {
    if (admob) {
        var adPublisherIds = {
            ios: {
                banner: "ca-app-pub-5024010797462161/9623268734"
            },
            android: {
                banner: "ca-app-pub-5024010797462161/3996925936",
                interstitial: "ca-app-pub-5024010797462161/5473659135"
            }
        };

        var admobid = (/(android)/i.test(navigator.userAgent)) ? adPublisherIds.android : adPublisherIds.ios;

        admob.setOptions({
            publisherId: admobid.banner,
            interstitialAdId: admobid.interstitial,
            // tappxIdiOs:       "/XXXXXXXXX/Pub-XXXX-iOS-IIII",
            // tappxIdAndroid:   "/XXXXXXXXX/Pub-XXXX-Android-AAAA",
            tappxShare: 0.5
        });

        registerAdEvents();

    } else {
        alert('AdMobAds plugin not ready');
    }
}

function onAdLoaded(e) {
    if (e.adType === admob.AD_TYPE.INTERSTITIAL) {
        admob.showInterstitialAd();
        showNextInterstitial = setTimeout(function () {
            admob.requestInterstitialAd();
        }, 20 * 1000); // 1/3 minutes
    }
}

// optional, in case respond to events
function registerAdEvents() {
    document.addEventListener(admob.events.onAdLoaded, onAdLoaded);
    document.addEventListener(admob.events.onAdFailedToLoad, function (e) { });
    document.addEventListener(admob.events.onAdOpened, function (e) { });
    document.addEventListener(admob.events.onAdClosed, function (e) { });
    document.addEventListener(admob.events.onAdLeftApplication, function (e) { });
    document.addEventListener(admob.events.onInAppPurchaseRequested, function (e) { });
}

function onDeviceReady() {
    document.removeEventListener('deviceready', onDeviceReady, false);
    initAds();

    // display a banner at startup
    admob.createBannerView();

    // request an interstitial
    admob.requestInterstitialAd();
}


function onRequestSuccess(success) {
    console.log("Successfully set requested accuracy: " + success.message);
}

function onRequestFailure(error) {
    console.error("Accuracy request failed: error code=" + error.code + "; error message=" + error.message);
    if (window.confirm("Failed to automatically set Location Mode to 'High Accuracy'. Would you like to switch to the Location Settings page and do this manually?")) {
        cordova.plugins.diagnostic.switchToLocationSettings();
    }
}

function activelocal() {
    document.addEventListener("deviceready", function () {
        cordova.plugins.locationAccuracy.request(onRequestSuccess, onRequestFailure, cordova.plugins.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY);
    }, false);
}