chrome.runtime.onMessage.addListener(async (msg, sender) => {
    if (msg.type !== "TOGGLE_HARD") return;

    const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true
    });
    if (!tab?.id) return;

    if (msg.enabled) {
        console.log("style!")
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

