document.addEventListener("DOMContentLoaded", () => {
    const darkMode = localStorage.getItem('darkMode') === 'true';
    if (darkMode) {
        document.body.classList.add('dark-mode');
        document.getElementById('mode-icon').src = '/assest/images/sun.svg';
    } else {
        document.getElementById('mode-icon').src = '/assest/images/moon.svg';
    }
})

document.addEventListener("DOMContentLoaded", () => {
        const buttons = document.querySelectorAll(".difficulty-button");
    
     buttons.forEach(button => {
        button.addEventListener("click", () => {
        const difficulty = button.getAttribute("data-difficulty");
            localStorage.setItem("selectedDifficulty", difficulty);
            window.location.href = "game.html";
        });
    });
});
