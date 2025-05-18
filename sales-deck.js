import "https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.11/clipboard.min.js";

const clipboard = new ClipboardJS('.clipboard-copy');
const clipboardEl = document.querySelector(".clipboard-copy");

clipboardEl.insertAdjacentHTML("beforeEnd", "<span class='tooltip'>Copied!</span>");

clipboard.on('success', function (e) {
    const tt = clipboardEl.querySelector(".tooltip");

    tt.classList.add("tooltip--active");

    setTimeout(() => {
        tt.classList.remove("tooltip--active");
    }, 2000);

    e.clearSelection();
});

const setGameLinks = () => {
    const gameIcons = document.querySelectorAll("[data-game-link]");
    if (gameIcons.length <= 0) return;
    gameIcons.forEach(icon => {
        const link = "https://playson.com/game/" + icon.getAttribute("data-game-link");
        icon.href = link;
    })
}

setGameLinks();
