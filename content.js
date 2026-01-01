chrome.storage.sync.get("hardEnabled", (data) => {
    if (data.hardEnabled) {
        const sidebarDivs = document.querySelectorAll('#sidebar div div');
        sidebarDivs.forEach(div => {
            if (div.textContent.trim().includes("→ Problem tags")) {
                const parentBox = div.closest('.roundbox');
                if (parentBox) {
                    parentBox.classList.add('hide-meeee');
                }
            }
        });
    }
});

