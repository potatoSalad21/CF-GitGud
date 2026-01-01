chrome.runtime.onMessage.addListener(async (msg, _sender) => {
    if (msg.type !== "TOGGLE_HARD") return;

    const tabs = await chrome.tabs.query({
        url: "*://*.codeforces.com/problemset/problem/*",
    });

    for (const tab of tabs) {
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: (enabled) => {
                const sidebarDivs = document.body.querySelectorAll('#sidebar div div');
                let parentBox;
                sidebarDivs.forEach(div => {
                    if (div.textContent.trim().includes("→ Problem tags")) {
                        parentBox = div.closest('.roundbox');
                    }
                });

                if (enabled) {
                    if (parentBox) {
                        parentBox.classList.add('hide-meeee');
                    }
                } else {
                    if (parentBox) {
                        parentBox.classList.remove('hide-meeee');
                    }
                }
            },
            args: [msg.enabled],
        }).catch(e => console.error(e));
    }
});

