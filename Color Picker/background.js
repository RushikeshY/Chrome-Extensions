let color = 'black';
chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ color });
});







