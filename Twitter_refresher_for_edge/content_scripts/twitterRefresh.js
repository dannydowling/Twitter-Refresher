(function() {
  /**
   * Check and set a global guard variable.
   * If this content script is injected into the same page again,
   * it will do nothing next time.
   */
  if (window.hasRun) {
    return;
  }
  window.hasRun = true;

  /**
   * Given a URL to a beast image, remove all existing actions, then
   * create and style an IMG node pointing to
   * that image, then insert the node into the document.
   */
  function insertAction(actionURL) {
    removeExistingActions();
    let beastImage = document.createElement("img");
    beastImage.setAttribute("src", actionURL);
    beastImage.style.height = "100vh";
    beastImage.className = "twitter-refresh";
    document.body.appendChild(actionImage);
  }

  /**
   * Remove every action from the page.
   */
  function removeExistingActions() {
    let existingActions = document.querySelectorAll(".twitter-refresh");
    for (let action of existingActions) {
      action.remove();
    }
  }

  /**
   * Listen for messages from the background script.
   * Call "twitterRefresh()" or "reset()".
  */
  browser.runtime.onMessage.addListener((message) => {
    if (message.command === "twitterRefresh") {
      insertAction(message.actionURL);
    } else if (message.command === "reset") {
      removeExistingActions();
    }
  });

})();
