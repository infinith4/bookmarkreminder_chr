function rewriteAction() {
    chrome.tabs.executeScript(null, { file: "jquery.min.js"},
                              function(){
                                  chrome.tabs.executeScript(null, { file: "rewrite.js" }, function() { });
                              });
}
 
chrome.browserAction.onClicked.addListener(rewriteAction);
rewriteAction();
