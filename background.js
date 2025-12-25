chrome.runtime.onMessage.addListener(async (msg, sender) => {
    if (msg.type !== "TOGGLE_HARD") return;

// TODO: toggle style for all open codeforces tabs
    const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true
    });
    if (!tab?.id || !tab?.url) return;

    if (!tab.url.startsWith("https://codeforces.com") &&
        !tab.url.startsWith("https://www.codeforces.com")) { return; }

    if (msg.enabled) {
        chrome.scripting.insertCSS({
            files: ["tag_hider.css"],
            target: { tabId: tab.id }
        });
    } else {
        chrome.scripting.removeCSS({
            files: ["tag_hider.css"],
            target: { tabId: tab.id }
        });
    }
});

