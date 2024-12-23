chrome.action.onClicked.addListener(() => {
  chrome.tabs.create({
    url: chrome.runtime.getURL("dashboard.html") // Open the local dashboard.html in a new tab
  });
});
