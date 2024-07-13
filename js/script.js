function startGame() {
    window.location.href = "difficulty.html"; // Ganti "game.html" dengan halaman game Anda
}

function toggleDarkMode() {
    const body = document.body;
    const modeText = document.getElementById('mode-text');
    const modeIcon = document.getElementById('mode-icon');
    const darkModeButton = document.getElementById('dark-mode-button');

    body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', body.classList.contains('dark-mode'));

    if (body.classList.contains('dark-mode')) {
        modeIcon.src = '/img/sun.svg';
        darkModeButton.style.backgroundColor = '#333';
    } else {
        modeIcon.src = '/img/moon.svg';
        darkModeButton.style.backgroundColor = '#f0f0f0';
    }
}

window.onload = function() {
    const darkMode = localStorage.getItem('darkMode') === 'true';
    if (darkMode) {
        document.body.classList.add('dark-mode');
        document.getElementById('mode-icon').src = '/img/sun.svg';
        document.getElementById('dark-mode-button').style.backgroundColor = '#333';
    } else {
        document.getElementById('mode-icon').src = '/img/moon.svg';
        document.getElementById('dark-mode-button').style.backgroundColor = '#f0f0f0';
    }
}