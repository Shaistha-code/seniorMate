// Handles opening a specific mode page
function openMode(mode) {
  window.location.href = `${mode}.html`;
}

// Handles emergency button
function handleEmergency() {
  alert("Calling Emergency Services...");
}

// Handles contact button
function handleContact() {
  alert("Opening Contact Us...");
}

// Navigates back to religion selection
function goBack() {
  window.location.href = "../religious.html";
}

// Changes mode (currently just an alert)
function changeMode() {
  alert("Returning to Mode Selection...");
}

// Handles religion selection and redirects to appropriate file
function selectReligion(religion) {
  localStorage.setItem('selectedReligion', religion);

  const religionMap = {
    islam: 'muslim',
    hinduism: 'hindu',
    christianity: 'christian',
    other: 'other'
  };

  const fileName = religionMap[religion] || religion;
  window.location.href = `religion/${fileName}.html`;
}

// Chatbox functionality
function sendMessage() {
  const input = document.getElementById("userInput");
  const message = input.value.trim();
  if (!message) return;

  const chatBox = document.getElementById("chatBox");

  const userMsg = document.createElement("div");
  userMsg.className = "message user";
  userMsg.textContent = message;
  chatBox.appendChild(userMsg);

  const aiMsg = document.createElement("div");
  aiMsg.className = "message ai";
  aiMsg.textContent = "(Reply from AI will go here)";
  chatBox.appendChild(aiMsg);

  chatBox.scrollTop = chatBox.scrollHeight;
  input.value = "";
}

// Fetches and displays today's prayer times
function getPrayerTimes() {
  const city = "Bangalore";
  const country = "India";
  const url = `https://api.aladhan.com/v1/timingsByCity?city=${city}&country=${country}&method=2`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const timings = data.data.timings;

      const grid = document.querySelector(".grid");
      if (grid) grid.style.display = "none";

      const box = document.getElementById("prayerTimesBox");
      box.innerHTML = `
        <h3>🕋 Today's Prayer Times</h3>
        <p><strong>Fajr:</strong> ${timings.Fajr}</p>
        <p><strong>Dhuhr:</strong> ${timings.Dhuhr}</p>
        <p><strong>Asr:</strong> ${timings.Asr}</p>
        <p><strong>Maghrib:</strong> ${timings.Maghrib}</p>
        <p><strong>Isha:</strong> ${timings.Isha}</p>
        <button onclick="goBack()">🔙 Go Back</button>
      `;
      box.style.display = "block";
    })
    .catch(error => {
      console.error("Error fetching prayer times:", error);
    });
}

// Displays YouTube spiritual talks
function showSpiritualTalks() {
  const grid = document.querySelector(".grid");
  if (grid) grid.style.display = "none";

  const box = document.getElementById("prayerTimesBox");
  box.innerHTML = `
    <h3>📺 Spiritual Talks Playlist</h3>
    <iframe width="100%" height="315"
      src="https://www.youtube.com/embed/videoseries?list=PLIgUzcnbbNNUuXjNUW6YY4kFLZS73TwBN"
      title="YouTube video player" frameborder="0" allowfullscreen></iframe>
    <button onclick="goBack()">🔙 Go Back</button>
  `;
  box.style.display = "block";
}

// Display Quranic scriptures with refresh
function showScriptures() {
  const grid = document.querySelector(".grid");
  if (grid) grid.style.display = "none";

  const box = document.getElementById("prayerTimesBox");
  box.innerHTML = `
    <h3>📖 Quran Verse of the Moment</h3>
    <div id="verseBox">
      <p>Loading verse...</p>
    </div>
    <button onclick="fetchRandomVerse()">🔁 Refresh</button>
    <button onclick="goBack()">🔙 Go Back</button>
  `;
  box.style.display = "block";

  fetchRandomVerse();
}

// Fetch random verse in Arabic and English
function fetchRandomVerse() {
  const randomVerseNumber = Math.floor(Math.random() * 6236) + 1;
  const apiURL = `https://api.alquran.cloud/v1/ayah/${randomVerseNumber}/editions/ar.alafasy,en.asad`;

  fetch(apiURL)
    .then(response => response.json())
    .then(data => {
      const [arabic, english] = data.data;
      const verseBox = document.getElementById("verseBox");
      verseBox.innerHTML = `
        <p><strong>Surah ${english.surah.englishName} (${english.surah.name}) – Ayah ${english.numberInSurah}</strong></p>
        <p style="font-size: 1.5rem; direction: rtl;">${arabic.text}</p>
        <p style="font-size: 1.2rem;">"${english.text}"</p>
      `;
    })
    .catch(error => {
      console.error("Error fetching verse:", error);
      document.getElementById("verseBox").innerHTML = `<p>⚠️ Could not load verse. Please try again.</p>`;
    });
}

// Displays Duas
function showDuass() {
  const grid = document.querySelector(".grid");
  if (grid) grid.style.display = "none";

  const box = document.getElementById("prayerTimesBox");
  box.innerHTML = `
    <h3>🤲 Dua of the Moment</h3>
    <div id="duaBox">
      <p>Loading dua...</p>
    </div>
    <button onclick="fetchRandomDua()">🔁 Refresh</button>
    <button onclick="goBack()">🔙 Go Back</button>
  `;
  box.style.display = "block";

  fetchRandomDua();
}

// Fetch a random dua
function fetchRandomDua() {
  const duaAPI = `https://dua-api.vercel.app/dua`;

  fetch(duaAPI)
    .then(res => res.json())
    .then(data => {
      const randomIndex = Math.floor(Math.random() * data.length);
      const dua = data[randomIndex];
      const duaBox = document.getElementById("duaBox");
      duaBox.innerHTML = `
        <p><strong>${dua.dua_name}</strong></p>
        <p style="direction: rtl; font-size: 1.5rem;">${dua.arabic}</p>
        <p><em>${dua.transliteration}</em></p>
        <p><strong>Translation:</strong> ${dua.translation}</p>
        <p><strong>Reference:</strong> ${dua.refference}</p>
      `;
    })
    .catch(err => {
      console.error("Error fetching dua:", err);
      document.getElementById("duaBox").innerHTML = `<p>⚠️ Could not load dua. Please try again.</p>`;
    });
}

// Hook all cards to their actions
document.addEventListener("DOMContentLoaded", () => {
  const prayerCard = document.getElementById("dailyPrayerCard");
  if (prayerCard) {
    prayerCard.addEventListener("click", getPrayerTimes);
  }

  const talksCard = document.querySelector(".card:nth-child(2)");
  if (talksCard) {
    talksCard.addEventListener("click", showSpiritualTalks);
  }

  const scriptureCard = document.querySelector(".card:nth-child(3)");
  if (scriptureCard) {
    scriptureCard.addEventListener("click", showScriptures);
  }

  const duaCard = document.querySelector(".card:nth-child(4)");
  if (duaCard) {
    duaCard.addEventListener("click", showDuass);
  }
});
// Universal Functions
function speakText(text) {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9; // Slower for seniors
    speechSynthesis.speak(utterance);
  } else {
    alert("Text-to-speech not supported in your browser");
  }
}

function startGuidedMeditation() {
  // Implement using Web Audio API or embed meditation audio
  alert("Starting 5-minute guided meditation...");
}

function shareQuote(quote) {
  if (navigator.share) {
    navigator.share({
      title: "Today's Inspiration",
      text: quote,
    });
  } else {
    // Fallback for non-share API browsers
    prompt("Copy this quote:", quote);
  }
}
async function getPhilosophicalQuote() {
  const response = await fetch('https://api.quotable.io/random?tags=wisdom|philosophy');
  const data = await response.json();
  return `"${data.content}" - ${data.author}`;
}
function saveGratitudeEntry(entry) {
  const entries = JSON.parse(localStorage.getItem('gratitudeEntries') || []);
  entries.push({ date: new Date(), text: entry });
  localStorage.setItem('gratitudeEntries', JSON.stringify(entries));
}
const gitaVerses = [
  {
    verse: "You have the right to perform your prescribed duties, but you are not entitled to the fruits of your actions.",
    chapter: "Chapter 2, Verse 47"
  },
  {
    verse: "When meditation is mastered, the mind is unwavering like the flame of a lamp in a windless place.",
    chapter: "Chapter 6, Verse 19"
  },
  {
    verse: "A person is said to be elevated in yoga when, having renounced all material desires, he neither acts for sense gratification nor engages in fruitive activities.",
    chapter: "Chapter 6, Verse 4"
  },
  {
    verse: "There is neither this world nor the world beyond nor happiness for the one who doubts.",
    chapter: "Chapter 4, Verse 40"
  }
];

function showGitaVerse() {
  const grid = document.querySelector(".grid");
  const contentBox = document.getElementById("contentBox");
  if (grid) grid.style.display = "none";

  const randomVerse = gitaVerses[Math.floor(Math.random() * gitaVerses.length)];

  contentBox.innerHTML = `
    <div class="card">
      <h3>📖 Gita Verse</h3>
      <p style="font-size: 1.2rem; font-style: italic;">"${randomVerse.verse}"</p>
      <p><strong>${randomVerse.chapter}</strong></p>
      <button onclick="showGitaVerse()">🔁 New Verse</button>
      <button onclick="goBack()">🔙 Go Back</button>
    </div>
  `;
  contentBox.style.display = "block";
}

function showPoojaTimings() {
  const grid = document.querySelector(".grid");
  const contentBox = document.getElementById("contentBox");
  if (grid) grid.style.display = "none";

  contentBox.innerHTML = `
    <div class="card">
      <h3>🕉️ Daily Pooja Timings</h3>
      <ul style="text-align: left;">
        <li><strong>🪔 Morning Pooja:</strong> 6:00 AM – 7:30 AM</li>
        <li><strong>🌞 Midday Aarti:</strong> 12:00 PM – 12:30 PM</li>
        <li><strong>🌇 Evening Pooja:</strong> 6:30 PM – 7:30 PM</li>
        <li><strong>🌙 Shayan Aarti:</strong> 9:00 PM</li>
      </ul>
      <button onclick="goBack()">🔙 Go Back</button>
    </div>
  `;
  contentBox.style.display = "block";
}

function showSpiritualTalks() {
  const grid = document.querySelector(".grid");
  const contentBox = document.getElementById("contentBox");
  if (grid) grid.style.display = "none";

  contentBox.innerHTML = `
    <div class="card">
      <h3>📺 Spiritual Talks</h3>
      <iframe width="100%" height="315"
        src="https://www.youtube.com/embed/videoseries?list=PLfOWGVMMuHsn9DJcsRUz2NflPkNzC_i5c"
        title="YouTube playlist" frameborder="0" allowfullscreen>
      </iframe>
      <p>Enjoy spiritual wisdom and inspiration from revered teachers.</p>
      <button onclick="goBack()">🔙 Go Back</button>
    </div>
  `;
  contentBox.style.display = "block";
}

function showMantras() {
  const grid = document.querySelector(".grid");
  const contentBox = document.getElementById("contentBox");

  if (grid) grid.style.display = "none";

  contentBox.innerHTML = `
    <div class="card">
      <h3>🙏 Daily Mantras</h3>
      <ul style="text-align: left; line-height: 1.6;">
        <li><strong>🕉️ Gayatri Mantra:</strong><br>ॐ भूर्भुवः स्वः । तत्सवितुर्वरेण्यं<br>भर्गो देवस्य धीमहि । धियो यो नः प्रचोदयात् ॥</li>
        <li><strong>🙏 Maha Mrityunjaya Mantra:</strong><br>ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम् ।<br>उर्वारुकमिव बन्धनान् मृत्योर्मुक्षीय मामृतात् ॥</li>
        <li><strong>🪔 Ganesh Mantra:</strong><br>ॐ गण गणपतये नमः ॥</li>
      </ul>
      <button onclick="goBack()" style="margin-top: 1rem;">🔙 Go Back</button>
    </div>
  `;
  contentBox.style.display = "block";
}

function goBack() {
  const grid = document.querySelector(".grid");
  const contentBox = document.getElementById("contentBox");
  if (contentBox) contentBox.style.display = "none";
  if (grid) grid.style.display = "grid";
}

document.addEventListener("DOMContentLoaded", () => {
  const prayerCard = document.getElementById("dailyPrayerCard");
  const talksCard = document.querySelectorAll(".card")[1];
  const gitaVerseCard = document.querySelectorAll(".card")[2];
  const mantraCard = document.querySelectorAll(".card")[3];

  if (prayerCard) prayerCard.addEventListener("click", showPoojaTimings);
  if (talksCard) talksCard.addEventListener("click", showSpiritualTalks);
  if (gitaVerseCard) gitaVerseCard.addEventListener("click", showGitaVerse);
  if (mantraCard) mantraCard.addEventListener("click", showMantras);
});
function showDailyPrayer() {
  const contentBox = document.getElementById('contentBox');
  const grid = document.querySelector('.grid');
  if (grid) grid.style.display = 'none';

  contentBox.innerHTML = `
    <h3>🙏 Daily Prayers</h3>
    <ul>
      <li><strong>🌅 Morning Prayer:</strong><br>Heavenly Father, thank You for a new day. Guide me and protect me. Amen.</li>
      <li><strong>🌇 Evening Prayer:</strong><br>Lord, thank You for being with me today. Grant me peaceful rest. Amen.</li>
    </ul>
    <button onclick="hideContent()">🔙 Go Back</button>
  `;
  contentBox.style.display = 'block';
}

function showHymns() {
  const contentBox = document.getElementById('contentBox');
  const grid = document.querySelector('.grid');
  if (grid) grid.style.display = 'none';

  contentBox.innerHTML = `
    <h3>🎶 Inspirational Hymns</h3>
    <p>🎵 Amazing Grace, how sweet the sound...</p>
    <p>🎵 How Great Thou Art...</p>
    <p>🎵 Be Thou My Vision...</p>
    <button onclick="hideContent()">🔙 Go Back</button>
  `;
  contentBox.style.display = 'block';
}

function showSermons() {
  const contentBox = document.getElementById('contentBox');
  const grid = document.querySelector('.grid');
  if (grid) grid.style.display = 'none';

  contentBox.innerHTML = `
    <h3>📺 Sermons</h3>
    <iframe width="100%" height="315"
      src="https://www.youtube.com/embed/videoseries?list=PLvN7cJpqqRSpUNPYuWXv6eAAQRA2RciG1"
      frameborder="0" allowfullscreen></iframe>
    <p>Watch sermons and spiritual guidance from trusted pastors.</p>
    <button onclick="hideContent()">🔙 Go Back</button>
  `;
  contentBox.style.display = 'block';
}
