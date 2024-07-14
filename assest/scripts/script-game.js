function levenshtein(a, b) {
    const matrix = [];

    for (let i = 0; i <= b.length; i++) {
        matrix[i] = [i];
    }

    for (let j = 0; j <= a.length; j++) {
        matrix[0][j] = j;
    }

    for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
            if (b.charAt(i - 1) === a.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, Math.min(matrix[i][j - 1] + 1, matrix[i - 1][j] + 1));
            }
        }
    }

    return matrix[b.length][a.length];
}

function isCloseMatch(input, correctAnswers) {
    const threshold = 2; // Adjust this value as needed for how close the match should be
    for (let answer of correctAnswers) {
        if (levenshtein(input, answer.toLowerCase()) <= threshold) {
            return true;
        }
    }
    return false;
}

const questions = {
    easy: [
        {
            question: "Apa saja 10 hewan peliharaan yang umum?",
            correctAnswers: ["Anjing", "Kucing", "Burung", "Ikan", "Hamster", "Kelinci", "Kura-kura", "Iguana", "Kuda", "Bebek"]
        },
        {
            question: "Apa saja 10 buah-buahan tropis?",
            correctAnswers: ["Mangga", "Nanas", "Pisang", "Pepaya", "Rambutan", "Salak", "Durian", "Maggis", "Jambu", "Srikaya"]
        },
        {
            question: "Apa saja 10 warna pelangi?",
            correctAnswers: ["Merah", "Jingga", "Kuning", "Hijau", "Biru", "Nila", "Ungu", "Merah Muda"]
        }
    ],
    normal: [
        {
            question: "Apa saja 10 kota besar di Indonesia?",
            correctAnswers: ["Jakarta", "Surabaya", "Bandung", "Medan", "Semarang", "Makassar", "Palembang", "Denpasar", "Yogyakarta", "Balikpapan"]
        },
        {
            question: "Apa saja 10 makanan khas Indonesia?",
            correctAnswers: ["Rendang", "Sate", "Nasi Goreng", "Gado-Gado", "Soto", "Gudeg", "Pempek", "Rawon", "Bakso", "Nasi Padang"]
        },
        {
            question: "Apa saja 10 jenis olahraga?",
            correctAnswers: ["Sepak Bola", "Basket", "Bulu Tangkis", "Tenis", "Renang", "Bersepeda", "Lari", "Golf", "Volleyball", "Rugby"]
        }
    ],
    hard: [
        {
            question: "Apa saja 10 penemuan besar dalam sejarah?",
            correctAnswers: ["Telepon", "Internet", "Lampu Pijar", "Mesin Uap", "Mobil", "Pesawat", "Komputer", "Penisilin", "Televisi", "Radar"]
        },
        {
            question: "Apa saja 10 negara dengan ekonomi terbesar?",
            correctAnswers: ["Amerika Serikat", "Cina", "Jepang", "Jerman", "India", "Inggris", "Prancis", "Italia", "Brasil", "Kanada"]
        },
        {
            question: "Apa saja 10 bahasa yang paling banyak digunakan?",
            correctAnswers: ["Mandarin", "Spanyol", "Inggris", "Hindi", "Arab", "Bengali", "Portugis", "Rusia", "Jepang", "Punjabi"]
        }
    ]
};

let correctAnswers = [];
let answered = new Set();
let chances = 3;
let points = 0;

document.addEventListener("DOMContentLoaded", () => {
    const selectedDifficulty = localStorage.getItem("selectedDifficulty") || "easy";
    const currentQuestions = questions[selectedDifficulty];
    const randomQuestion = currentQuestions[Math.floor(Math.random() * currentQuestions.length)];

    document.getElementById("question").innerText = randomQuestion.question;
    correctAnswers = randomQuestion.correctAnswers.map(answer => answer.toLowerCase());
    updateChances();
    updatePoints();

    // Setel ikon tema saat halaman dimuat
    const darkMode = localStorage.getItem('darkMode') === 'true';
    if (darkMode) {
        document.body.classList.add('dark-mode');
    }

    setThemeIcon();
});

function handleKeyPress(event) {
    if (event.key === "Enter") {
        submitAnswer();
    }
}

function submitAnswer() {
    const answerInput = document.getElementById("answer");
    const answer = answerInput.value.trim().toLowerCase(); // Ubah jawaban ke huruf kecil
    if (answer === "") {
        displayResult("Please enter an answer.", "error");
        return;
    }

    // Bandingkan jawaban dengan jawaban yang benar dalam huruf kecil
    if ((correctAnswers.includes(answer) || isCloseMatch(answer, correctAnswers)) && !answered.has(answer)) {
        answered.add(answer);
        addAnswerToTable(answer);
        displayResult("Correct!", "correct");
        points += 10; // Tambahkan 10 poin untuk jawaban yang benar
        updatePoints();
    } else {
        chances--;
        displayResult("Wrong answer. Try again.", "error");
    }

    answerInput.value = "";
    updateChances();
    checkGameOver();
}

function addAnswerToTable(answer) {
    const table1 = document.getElementById("correct-answers-table-1").getElementsByTagName("td");
    const table2 = document.getElementById("correct-answers-table-2").getElementsByTagName("td");

    for (let cell of table1) {
        if (cell.innerText === "") {
            cell.innerText = answer;
            return;
        }
    }

    for (let cell of table2) {
        if (cell.innerText === "") {
            cell.innerText = answer;
            return;
        }
    }
}

function updateChances() {
    document.getElementById("chances").innerText = `Kesempatan: ${chances}`;
}

function updatePoints() {
    document.getElementById("points").innerText = `Poin: ${points}`;
}

function displayResult(message, className) {
    const resultElement = document.getElementById("result");
    resultElement.innerText = message;
    resultElement.className = className;
}

function checkGameOver() {
    if (answered.size === correctAnswers.length) {
        displayResult("You have guessed all answers!", "correct");
        showGameOverButton();
    } else if (chances === 0) {
        displayResult("Game over. No more chances.", "error");
        showGameOverButton();
    }
}

function showGameOverButton() {
    document.getElementById("game-over-container").style.display = "block";
    document.getElementById("answer-container").style.display = "none";
    document.getElementById("chances-container").style.display = "none";
}

function restartGame() {
    answered.clear();
    chances = 3;
    points = 0;
    updateChances();
    updatePoints();
    document.getElementById("result").innerText = "";
    clearAnswerTable();
    document.getElementById("game-over-container").style.display = "none";
    document.getElementById("answer-container").style.display = "flex"; // Pastikan elemen answer-container tetap flex
    document.getElementById("chances-container").style.display = "block";
}

function goToMenu() {
    window.location.href = 'index.html';
}

function clearAnswerTable() {
    const table1 = document.getElementById("correct-answers-table-1").getElementsByTagName("td");
    const table2 = document.getElementById("correct-answers-table-2").getElementsByTagName("td");

    for (let cell of table1) {
        cell.innerText = "";
    }

    for (let cell of table2) {
        cell.innerText = "";
    }
}

function setThemeIcon() {
    const themeIcon = document.getElementById("theme-icon");
    if (document.body.classList.contains("dark-mode")) {
        themeIcon.src = "/assest/images/sun.svg";
    } else {
        themeIcon.src = "/assest/images/moon.svg";
    }
}

function toggleTheme() {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
    setThemeIcon();
}
