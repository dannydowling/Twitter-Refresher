/**
 * CSS to hide everything on the page,
 * except for elements that have the "refresh-twitter" class.
 */
const hidePage = `body > :not(.refresh-twitter) {
  display: none;
}`;

/**
 * Listen for clicks on the buttons, and send the appropriate message to
 * the content script in the page.
 */
function listenForClicks() {
  document.addEventListener("click", function(e) {
    /**
     * Given the name of an action, perform the following.
     */
    function actionNameToPerform(actionName) {
      switch (actionName) {
          case "Start":
              countdown();
              return browser.tabs.executeScript(tabs[0].id, { code: 'window.location.reload();' });
          return 
        case "Stop":
          return 
        case "Pause":
          return 
      }
    }

    /**
     * Insert the page-hiding CSS into the active tab,
     * then get the beast URL and
     * send a "beastify" message to the content script in the active tab.
     */
    function twitterRefresh(tabs) {
      browser.tabs.insertCSS({code: hidePage});
      let url = actionNameToPerform(e.target.textContent);
      browser.tabs.sendMessage(tabs[0].id, {
        command: "twitterRefresh",
        actionURL: url
      });
    }

    /**
     * Remove the page-hiding CSS from the active tab,
     * send a "reset" message to the content script in the active tab.
     */
    function reset(tabs) {
      browser.tabs.sendMessage(tabs[0].id, {
        command: "reset",
      });
      browser.tabs.executeScript(tabs[0].id, { code: 'window.location.reload();' });      
    }

    /**
     * Get the active tab,
     * then call "twitterRefresh()" or "reset()" as appropriate.
     */
    if (e.target.classList.contains("action")) {
      browser.tabs.query({active: true, currentWindow: true}, function(tabs) {
        twitterRefresh(tabs);
      });
      return;
    }
    else if (e.target.classList.contains("reset")) {
      browser.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        reset(tabs);
      });
      return;
    }
  });
}

/**
 * When the popup loads, inject a content script into the active tab,
 * and add a click handler.
 */
browser.tabs.executeScript({file: "/content_scripts/twitterRefresh.js"});
listenForClicks();