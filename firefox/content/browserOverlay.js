/** Imports the unsocialize(url) function.
 */
Components.utils.import("resource://unsocialize/unsocialize.js");

/** Defines an Unsocialize object containing the link URL to be unsocialized.
 */
if ("undefined" == typeof(Unsocialize)) {
  var Unsocialize = {
    linkURL : ""
  };
};

/** When the document is loaded, we add a context menu listener that checks if a
 * context menu event has been triggered on an <A> element, and if so, shows the
 * Unsocialize menu item and saves the URL to be unsocialized.
 */
window.addEventListener("load", function(loadEvent) {
  document.addEventListener("contextmenu", function(contextEvent) {
    // Walks up the DOM tree up to maxDepth levels looking for an <A> element
    var maxDepth = 10;
    var target = contextEvent.target;
    for (var i = 0; i < maxDepth && target.nodeName != "A"; i++) {
      target = target.parentElement;
    }
    if (target.nodeName == "A") {
      Unsocialize.linkURL = target.href;
      document.getElementById("unsocialize-menu-item").hidden = "";
    } else {
      document.getElementById("unsocialize-menu-item").hidden = "true";
    }
  });
});

/** Triggered when the Unsocialize menu item has been clicked. Unsocializes the
 * link URL and opens a new tab with the URL.
 */
Unsocialize.menuItemClicked = function() {
  gBrowser.selectedTab = gBrowser.loadOneTab(unsocialize(this.linkURL));
};
