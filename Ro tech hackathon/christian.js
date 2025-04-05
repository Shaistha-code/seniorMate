function hideContent() {
    const contentBox = document.getElementById('contentBox');
    const grid = document.querySelector('.grid');
    if (contentBox) contentBox.style.display = 'none';
    if (grid) grid.style.display = 'grid';
  }
  
  // Daily Prayers
  function showDailyPrayer() {
    const contentBox = document.getElementById('contentBox');
    document.querySelector('.grid').style.display = 'none';
    contentBox.innerHTML = `
      <h3>🙏 Daily Prayers</h3>
      <p><strong>Morning Prayer:</strong> Dear Lord, thank you for this new day. Guide me and be with me in all I do.</p>
      <p><strong>Evening Prayer:</strong> Heavenly Father, thank you for today. Forgive my shortcomings and grant me peaceful rest.</p>
      <button onclick="hideContent()">🔙 Go Back</button>
    `;
    contentBox.style.display = 'block';
  }
  
  // Bible Verse
  function showBibleVerse() {
    const contentBox = document.getElementById('contentBox');
    const grid = document.querySelector('.grid');
    if (grid) grid.style.display = 'none';
  
    // Instead of using the unreliable API, use your own array of verses:
    const verses = [
      {
        reference: "John 3:16",
        text: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life."
      },
      {
        reference: "Psalm 23:1",
        text: "The Lord is my shepherd, I lack nothing."
      },
      {
        reference: "Philippians 4:13",
        text: "I can do all this through him who gives me strength."
      },
      {
        reference: "Romans 8:28",
        text: "And we know that in all things God works for the good of those who love him."
      }
    ];
  
    const randomVerse = verses[Math.floor(Math.random() * verses.length)];
  
    contentBox.innerHTML = `
      <h3>📖 ${randomVerse.reference}</h3>
      <p style="font-style: italic;">"${randomVerse.text}"</p>
      <button onclick="hideContent()">🔙 Go Back</button>
    `;
  
    contentBox.style.display = 'block';
  }
  
  
  
  // Hymns
  function showHymns() {
    const hymns = [
      "🎵 Amazing Grace, how sweet the sound...",
      "🎵 Great is Thy Faithfulness...",
      "🎵 How Great Thou Art...",
      "🎵 Be Thou My Vision..."
    ];
    
    const contentBox = document.getElementById('contentBox');
    document.querySelector('.grid').style.display = 'none';
    contentBox.innerHTML = `
      <h3>🎶 Hymns</h3>
      <div style="text-align: left; margin: 0 auto; max-width: 400px;">
        ${hymns.map(hymn => `<p>${hymn}</p>`).join('')}
      </div>
      <button onclick="hideContent()">🔙 Go Back</button>
    `;
    contentBox.style.display = 'block';
  }
  
  // Sermons
  function showSermons() {
    const contentBox = document.getElementById('contentBox');
    document.querySelector('.grid').style.display = 'none';
    contentBox.innerHTML = `
      <h3>📺 Sermons</h3>
      <iframe width="100%" height="315"
        src="https://www.youtube.com/embed/videoseries?list=PLYkmH0MHfYphgiZqFYEDaqtAd-nSN2MjA"
        frameborder="0" allowfullscreen></iframe>
      <p>Watch uplifting sermons to inspire your day.</p>
      <button onclick="hideContent()">🔙 Go Back</button>
    `;
    contentBox.style.display = 'block';
  }
  