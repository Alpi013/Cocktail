const body = document.querySelector("body"),
      nav = document.querySelector("nav"),
      modeToogle = document.querySelector(".dark-light"),
      searchToogle = document.querySelector(".searchToggle"),
      sidebarOpen = document.querySelector(".sidebarOpen"),
      sidebarClose = document.querySelector(".sidebarClose");

// Event listeners for UI interactions
modeToogle.addEventListener("click", () => {
    modeToogle.classList.toggle("active");
    body.classList.toggle("dark");

    if (!body.classList.contains("dark")) {
        localStorage.setItem("mode", "light-mode");
    } else {
        localStorage.setItem("mode", "dark-mode");
    }
});

searchToogle.addEventListener("click", () => {
    searchToogle.classList.toggle("active");
});

sidebarOpen.addEventListener("click", () => {
    nav.classList.add("active");
});

body.addEventListener("click", e => {
    let clickedElm = e.target;

    if (!clickedElm.classList.contains("sidebarOpen") && !clickedElm.classList.contains("menu")) {
        nav.classList.remove("active");
    }
});

// Set initial theme based on local storage
document.addEventListener('DOMContentLoaded', () => {
    const mode = localStorage.getItem("mode");
    if (mode === "dark-mode") {
        body.classList.add("dark");
        modeToogle.classList.add("active");
    }
});
