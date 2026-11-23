const jokes = [
  "Твой компьютер тоже устал от тебя 😂",
  "Уровень интеллекта: картошка 🥔",
  "Сегодня ты легенда. Завтра посмотрим.",
  "404: мозг не найден 🤯",
  "Не баг, а фича!",
  "Главное — не победа, а чтобы интернет не лагал."
];

function randomJoke() {
  const joke = jokes[Math.floor(Math.random() * jokes.length)];
  document.getElementById("joke").textContent = joke;
}

function showHome() {
  document.getElementById("content").innerHTML = `
    <h2>Добро пожаловать!</h2>
    <p>Главная база друзей 😎</p>
    <button onclick="randomJoke()">Получить прикол 🎲</button>
    <button onclick="showDailyGame()">🎮 Ежедневная игра</button>
    <p id="joke"></p>
  `;
}

function showMemes() {
  document.getElementById("content").innerHTML = `
    <h2>😂 МЕМНАЯ БАЗА</h2>
    <p>Выбирай категорию:</p>
    <button onclick="filterMemes('all')">Все</button>
    <button onclick="filterMemes('life')">Жизнь</button>
    <button onclick="filterMemes('roblox')">Roblox</button>
    <button onclick="filterMemes('minecraft')">Minecraft</button>
    <button onclick="filterMemes('cs')">CS</button>
    <div id="memeGallery"></div>
    <h3>📸 Добавить свой мем</h3>
    <input type="file" id="memeFile" accept="image/*">
    <input type="text" id="memeCaption" placeholder="Подпись к мему">
    <button onclick="addMeme()">Опубликовать</button>
    <div id="myMemes"></div>
  `;
  filterMemes("all");
}

function showGames() {
  document.getElementById("content").innerHTML = '<h2>🎮 Игры</h2><p>Угадай число от 1 до 10!</p><input id="guess" type="number" min="1" max="10"><button onclick="checkGuess()">Проверить</button><p id="gameResult"></p>';
  secretNumber = Math.floor(Math.random() * 10) + 1;
}

let secretNumber = 0;

function checkGuess() {
  const guess = Number(document.getElementById("guess").value);
  const result = document.getElementById("gameResult");

  if (guess < 1 || guess > 10 || !Number.isInteger(guess)) {
    result.textContent = "Введи число от 1 до 10!";
  } else if (guess === secretNumber) {
    result.textContent = "🎉 ПОБЕДА! Ты угадал!";
  } else {
    result.textContent = guess < secretNumber ? "Моё число больше!" : "Моё число меньше!";
  }
}
function showHall() {
  document.getElementById("content").innerHTML = `
    <h2>🏆 ДОСКА ПОЗОРА</h2>
    <input id="friendName" placeholder="Имя друга">
    <select id="friendTitle">
      <option>Картошка года 🥔</option>
      <option>Главный клоун 🤡</option>
      <option>Самый медленный 🐌</option>
      <option>Гений наоборот 🧠</option>
      <option>Легенда компании 👑</option>
    </select>
    <button onclick="addFriend()">Добавить</button>
    <div id="friendList"></div>
  `;
}
function addFriend() {
  const name = document.getElementById("friendName").value.trim();
  const title = document.getElementById("friendTitle").value;

  if (!name) {
    alert("Введи имя друга!");
    return;
  }

  const list = document.getElementById("friendList");
  const item = document.createElement("p");

  item.textContent = "🏆 " + name + " — " + title;
  list.appendChild(item);

  document.getElementById("friendName").value = "";
}
function showSecret() {
  document.getElementById("content").innerHTML = `
    <div class="secret-room">
      <div style="font-size:60px;">🔐</div>
      <h2>СЕКРЕТНАЯ КОМНАТА</h2>
      <p>⛔ Доступ только для посвящённых</p>
      <input id="secretPassword" type="password" placeholder="Введи пароль">
      <button onclick="checkPassword()">🚪 Открыть дверь</button>
      <p id="secretResult"></p>
    </div>
  `;
}
function checkPassword() {
  const password = document.getElementById("secretPassword").value;

  if (password === "63355336") {
    renderBlackMarket();
  } else {
    document.getElementById("secretResult").textContent =
      "❌ Неверный пароль!";
  }
}


function renderBlackMarket() {
  const items = [
    ["Главный клоун", 100, "🤡"],
    ["Картофель года", 150, "🥔"],
    ["Легенда без смысла", 200, "🗿"],
    ["Крыса десятилетия", 250, "🐀"],
    ["Повелитель хаоса", 500, "👑"]
  ];

  const bought = JSON.parse(localStorage.getItem("boughtTitles") || "[]");

  document.getElementById("content").innerHTML = `
    <div class="secret-room">
      <h2>🔐 СЕКРЕТНАЯ КОМНАТА</h2>
      <h3>🪙 Баланс: ${getCoins()} монет</h3>
      <button onclick="claimDailyBonus()">🎁 Забрать 25 монет</button>
      <h2>💀 ЧЁРНЫЙ РЫНОК</h2>
      ${items.map(item => `
        <div class="meme">
          <h3>${item[2]} ${item[0]}</h3>
          <p>Цена: ${item[1]} 🪙</p>
          ${bought.includes(item[0])
            ? "<p>✅ Куплено</p>"
            : `<button onclick="buyTitle('${item[0]}', ${item[1]})">Купить</button>`}
        </div>
      `).join("")}
      <button onclick="showSecret()">Назад</button>
    </div>
  `;
}

function buyTitle(title, price) {
  const bought = JSON.parse(localStorage.getItem("boughtTitles") || "[]");

  if (bought.includes(title)) return;

  if (!spendCoins(price)) {
    alert("❌ Недостаточно монет!");
    return;
  }

  bought.push(title);
  localStorage.setItem("boughtTitles", JSON.stringify(bought));
  renderBlackMarket();
}
function showChallenges() {
  document.getElementById("content").innerHTML = `
    <h2>🎲 ГЕНЕРАТОР ЗАДАНИЙ</h2>
    <p>Нажми кнопку и получи случайное задание!</p>
    <button onclick="generateChallenge()">Получить задание</button>
    <h3 id="challengeResult">❓ Твоё задание?</h3>
  `;
}

function generateChallenge() {
  const challenges = [
    "Расскажи самый смешной случай 😂",
    "Изобрази робота 🤖",
    "Придумай новое прозвище другу",
    "Скажи скороговорку три раза",
    "Расскажи анекдот",
    "Придумай рэп за 20 секунд 🎤",
    "Назови 10 животных за 15 секунд",
    "Изобрази любимого игрового персонажа 🎮",
    "Придумай рекламу обычной картошки 🥔",
    "Скажи три комплимента друзьям"
  ];

  const random = Math.floor(Math.random() * challenges.length);
  document.getElementById("challengeResult").textContent = challenges[random];
}
const memeData = [
  {
    category: "life",
    caption: "Когда мама сказала убрать комнату",
    image: "https://i.imgflip.com/1ur9b0.jpg"
  },
  {
    category: "life",
    caption: "Когда друг обещал прийти 5 минут назад",
    image: "https://i.imgflip.com/1g8my4.jpg"
  },
  {
    category: "roblox",
    caption: "Когда потратил все Robux",
    image: "https://i.imgflip.com/30b1gx.jpg"
  },
  {
    category: "minecraft",
    caption: "Когда крипер появился за спиной",
    image: "https://i.imgflip.com/wxica.jpg"
  },
  {
    category: "cs",
    caption: "Когда остался один против всех",
    image: "https://i.imgflip.com/1g8my4.jpg"
  }
];

function filterMemes(category) {
  const gallery = document.getElementById("memeGallery");
  gallery.innerHTML = "";

  const filtered = category === "all"
    ? memeData
    : memeData.filter(m => m.category === category);

  filtered.forEach(m => {
    const card = document.createElement("div");
    card.className = "meme";

    const img = document.createElement("img");
    img.src = m.image;
    img.alt = m.caption;

    const caption = document.createElement("h3");
    caption.textContent = m.caption;

    card.append(img, caption);
    gallery.appendChild(card);
  });
}

function addMeme() {
  const fileInput = document.getElementById("memeFile");
  const captionInput = document.getElementById("memeCaption");
  const gallery = document.getElementById("myMemes");

  const file = fileInput.files[0];

  if (!file) {
    alert("Выбери фотографию!");
    return;
  }

  if (!file.type.startsWith("image/")) {
    alert("Это не фотография!");
    return;
  }

  const reader = new FileReader();

  reader.onload = function(event) {
    const card = document.createElement("div");
    card.className = "meme";

    const img = document.createElement("img");
    img.src = event.target.result;

    const title = document.createElement("h3");
    title.textContent = captionInput.value.trim() || "Мой мем 😂";

    const remove = document.createElement("button");
    remove.textContent = "Удалить 🗑️";
    remove.onclick = function() {
      card.remove();
    };

    card.append(img, title, remove);
    gallery.appendChild(card);

    fileInput.value = "";
    captionInput.value = "";
  };

  reader.readAsDataURL(file);
}
// 🪙 СИСТЕМА ХАОС-МОНЕТ

function getCoins() {
  return Number(localStorage.getItem("chaosCoins")) || 0;
}

function addCoins(amount) {
  const balance = getCoins() + amount;
  localStorage.setItem("chaosCoins", balance);

  syncPlayer();
  return balance;
}


function spendCoins(amount) {
  const balance = getCoins();

  if (balance < amount) {
    return false;
  }

  localStorage.setItem("chaosCoins", balance - amount);
  return true;
}
function randomJoke() {
  const jokes = [
    "Когда хотел стать легендой, но стал мемом 🤡",
    "Мозг: 404. Мысль не найдена 🗿",
    "Друг сказал «я на 5 минут» и пропал на 3 часа 💀",
    "План был идеальный. Но появился я 😂",
    "Уровень интеллекта временно недоступен 🥔"
  ];

  document.getElementById("joke").textContent =
    jokes[Math.floor(Math.random() * jokes.length)];
}
function claimDailyBonus() {
  const today = new Date().toLocaleDateString();
  const lastClaim = localStorage.getItem("lastCoinBonus");

  if (lastClaim === today) {
    alert("🎁 Ты уже забрал сегодняшний бонус!");
    return;
  }

  addCoins(25);
  localStorage.setItem("lastCoinBonus", today);

  alert("🎉 Ты получил 25 хаос-монет!");
  renderBlackMarket();
}

function randomJoke() {
  const jokes = [
    "Когда мама сказала убрать комнату 😂",
    "Друг опять опоздал на 3 часа 💀",
    "Мозг ушёл на перерыв 🗿",
    "Robux закончились. Жизнь тоже 🤡",
    "Я не опоздал, я эффектно появился 😎"
  ];

  document.getElementById("joke").textContent =
    jokes[Math.floor(Math.random() * jokes.length)];
}
function showChallenges() {
  document.getElementById("content").innerHTML = `
    <h2>🎲 СЛУЧАЙНЫЕ ЗАДАНИЯ</h2>
    <p>Выполни задание и получи +15 хаос-монет!</p>
    <button onclick="generateChallenge()">🎯 Получить задание</button>
    <p id="challengeResult"></p>
  `;
}

function showSecret() {
  document.getElementById("content").innerHTML = `
    <div class="secret-room">
      <h2>🔐 СЕКРЕТНАЯ КОМНАТА</h2>
      <p>Введи пароль:</p>
      <input id="secretPassword" type="password" placeholder="Пароль">
      <button onclick="checkPassword()">🚪 Открыть дверь</button>
      <p id="secretResult"></p>
    </div>
  `;
}
let dailyAttempts = 3;
let dailyNumber = 0;

function showDailyGame() {
  const today = new Date().toLocaleDateString();
  const played = localStorage.getItem("dailyGameDate");

  dailyAttempts = 3;
  dailyNumber = Math.floor(Math.random() * 10) + 1;

  document.getElementById("content").innerHTML = `
    <h2>🎮 ЕЖЕДНЕВНАЯ ИГРА</h2>
    <p>Угадай число от 1 до 10!</p>
    <p>🏆 Награда: 20 монет</p>
    <div id="dailyGameArea">
      ${played === today
        ? "✅ Сегодня ты уже играл!"
        : `<input id="dailyGuess" type="number" min="1" max="10">
           <button onclick="playDailyGame()">Проверить</button>
           <p id="dailyResult"></p>`}
    </div>
    <button onclick="showHome()">На главную</button>
  `;
}

function playDailyGame() {
  const today = new Date().toLocaleDateString();
  const input = document.getElementById("dailyGuess");
  const result = document.getElementById("dailyResult");
  const guess = Number(input.value);

  if (!Number.isInteger(guess) || guess < 1 || guess > 10) {
    result.textContent = "Введи число от 1 до 10!";
    return;
  }

  dailyAttempts--;

  if (guess === dailyNumber) {
    addCoins(20);
    localStorage.setItem("dailyGameDate", today);
    document.getElementById("dailyGameArea").textContent =
      "🎉 Победа! Получено 20 монет!";
  } else if (dailyAttempts === 0) {
    localStorage.setItem("dailyGameDate", today);
    document.getElementById("dailyGameArea").textContent =
      "💀 Попытки закончились! Число: " + dailyNumber;
  } else {
    result.textContent =
      (guess < dailyNumber ? "⬆️ Больше!" : "⬇️ Меньше!") +
      " Осталось попыток: " + dailyAttempts;
    input.value = "";
  }
}
// Подключение Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDdapPh3u-T_YxGEbAxI5OJH_gnol0TRm4",
  authDomain: "baza-prikolov.firebaseapp.com",
  databaseURL: "https://baza-prikolov-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "baza-prikolov",
  storageBucket: "baza-prikolov.firebasestorage.app",
  messagingSenderId: "382164162695",
  appId: "1:382164162695:web:e900ffaca8f5cad3e6c022"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.database();
const auth = firebase.auth();

auth.signInAnonymously()
  .then(() => {
    console.log("Firebase подключён!");
  })
  .catch(error => {
    console.error("Ошибка Firebase:", error);
  });
function syncPlayer() {
  const user = auth.currentUser;
  if (!user) return;

  const nickname = localStorage.getItem("playerNickname") || "Игрок";

  db.ref("players/" + user.uid).set({
    nickname: nickname,
    wins: 0,
    coins: getCoins()
  });
}

auth.onAuthStateChanged(user => {
  if (user) {
    syncPlayer();
  }
})
function setPlayerNickname() {
  const current = localStorage.getItem("playerNickname") || "";
  const nickname = prompt("Придумай себе ник:", current);

  if (!nickname || !nickname.trim()) return;

  localStorage.setItem("playerNickname", nickname.trim().slice(0, 20));
  syncPlayer();

  alert("Ник сохранён!");
}
function showLeaderboard() {
  const content = document.getElementById("content");

  content.innerHTML = `
    <h2>🏆 Общий рейтинг</h2>
    <div id="leaderboardList">Загрузка...</div>
    <button onclick="showHome()">На главную</button>
  `;

  db.ref("players").on("value", snapshot => {
    const players = snapshot.val() || {};

    const sorted = Object.values(players)
      .sort((a, b) => (b.coins || 0) - (a.coins || 0));

    document.getElementById("leaderboardList").innerHTML =
      sorted.length
        ? sorted.map((p, i) =>
            `<p>${i + 1}. ${p.nickname} — 🪙 ${p.coins}</p>`
          ).join("")
        : "Пока игроков нет";
  });
}
