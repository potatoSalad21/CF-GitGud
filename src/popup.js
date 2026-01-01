const API_URL = "https://codeforces.com/api/problemset.problems";
const PROBLEM_URL = "https://codeforces.com/problemset/problem";


chrome.storage.sync.get(["hardEnabled"], ({ hardEnabled }) => {
    hardbtn.checked = !!hardEnabled;
});

hardbtn.onchange = () => {
    chrome.storage.sync.set({ hardEnabled: hardbtn.checked });

    chrome.runtime.sendMessage({
        type: "TOGGLE_HARD",
        enabled: hardbtn.checked
    });
};

search.onsubmit = (e) => {
    e.preventDefault();
    msg.innerHTML = "";

    const cfPattern = /\d+[A-Z]/
    const code = searchbar.value;

    if (!cfPattern.test(code)) {
        displayErr("Invalid CF problem code!");
        return;
    }

    const contestID = code.slice(0, code.length-1);
    const idx = code[code.length-1];
    chrome.tabs.create(
        { url: `${PROBLEM_URL}/${contestID}/${idx}` },
        (tab) => {
            chrome.scripting.insertCSS({
                target: { tabId: tab.id },
                files: ["tag_hider.css"]
            }).catch(err => console.error(err));
        });
}

randbtn.onclick = () => {
    let contestID;
    let idx;
    fetch(API_URL)
        .then(resp => resp.json())
        .then(data => {
            const sz = data.result.problems.length;
            const problem = data.result.problems[randInt(0, sz-1)];
            contestID = problem.contestId;
            idx = problem.index;
            if (contestID && idx) {
                chrome.tabs.create({ url: `${PROBLEM_URL}/${contestID}/${idx}` });
            }
        })
        .catch(err => console.error("ERROR: " + err));
}


/*
*   HELPER FUNCTIONS ~~
*/
function displayErr(err) {
    msg.style.color = "red";
    msg.innerHTML = err;
}

function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

