function displayErr(err) {
    msg.style.color = "red";
    msg.innerHTML = err;
}

search.onsubmit = (e) => {
    e.preventDefault();
    msg.innerHTML = "";

    const cfPattern = /\d+[A-Z]/
    const code = searchbar.value;

    if (!cfPattern.test(code)) {
        displayErr("Invalid CF problem code!");
        return;
    }

    const num = code.slice(0, code.length-1);
    const letter = code[code.length-1];
    chrome.tabs.create({ url: `https://codeforces.com/problemset/problem/${num}/${letter}` });
}

randbtn.onclick = () => {
}
