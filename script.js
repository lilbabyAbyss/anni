/* ================== JavaScript ================== */

/* ---------- SLIDES DATA ---------- */
/* Each slide has:
     - a title
     - text (what i want to say)
     - a background color
     - loop through these when she clicks "Next".
*/
const slides = [
  { title: "The Start", text: "It all started 19th of November 2024 when you added me on Instagram. That day I was a chicken with his head cut off, I was a mess. Then, 26th of November I messaged you, and that's where it all kicked off.", color: "linear-gradient(180deg, #ffb6c1, #d291bc)" },
  { title: "Our First Date", text: "I'll never forget asking you if you wanted to see Wicked, and you actually agreeing. The whole time before I was so stressed and nervous, even needed to do breathing exercises just before we left!", color: "linear-gradient(180deg, #ffcc80, #ffab91)" },
  { title: "Our Random Obsessions", text: "We binged Dandadan together, which was some of my favourite memories (still dying for season 3)!! Then we had a little Pokemon phase, which I'm still not totally out of!", color: "linear-gradient(180deg, #a8edea, #fed6e3)" },
  { title: "I hope Stranger Things was good", text: "I know you are super excited for this final season, and as I am writing this, it's not aired, I hope you love it.", color: "linear-gradient(180deg, #6a11cb, #2575fc)" },
  { title: "Musicals", text: "The first movie you got me to watch was Hairspray, then not so long after we seen Wicked and we bonded over Hamilton. It is fair to say that musicals are definitely our favourite genre.", color: "linear-gradient(180deg, #d9a7c7, #fffcdc)" },
  { 
 
  title: "Photos & Videos of Us",
  text: "Some of my favourite moments with you 💕",
  color: "linear-gradient(180deg, #ffe0f0, #ffb6c1)",
photos: ["photo1.JPG","photo2.JPEG","photo3.JPEG","photo4.JPEG","photo5.JPEG","photo6.JPEG"],
videos: ["video1.mp4"]



  },
  { title: "The Future", text: "I will be proposing to you in not too long, that is a promise. I cannot wait for all the long cozy nights, laughter and travel we will have.", color: "linear-gradient(180deg, #89f7fe, #66a6ff)" },
  { title: "I Love You", text: "I love you more than words can describe, Eleanor. I will never be able to actually express it.", color: "linear-gradient(180deg, #ff9a9e, #fad0c4)" }
];

/* ---------- DOM REFERENCES ---------- */
/* Here it grabs important parts of the page and stores them in variables
   so it's easier to change them later. */
const container = document.getElementById("story"); // Where slide content goes
const body = document.body;                          // The whole page background
const clickStart = document.getElementById("clickStart"); // The overlay you click to start
const music = document.getElementById("bgMusic");    // Background music
const countdownElement = document.getElementById("countdown"); // Countdown timer

/* ---------- CURRENT SLIDE ---------- */
let current = 0; // Start at slide 0 (the first one)

/* ---------- COUNTDOWN FUNCTION ---------- */
/* This calculates the time left until January 8, 2026 and updates the page */
function updateCountdown() {
  const now = new Date(); // Get current time
  const eventDate = new Date("January 8, 2026 00:00:00"); // Target date
  const diff = eventDate - now; // Difference in milliseconds

  // If countdown is done
  if (diff <= 0) {
    countdownElement.textContent = "🎉 Happy Anniversary! 🎉";
    clearInterval(countdownInterval); // Stop running this function every second
    return;
  }

  // Convert milliseconds into days, hours, minutes, seconds
  const days = Math.floor(diff / (1000*60*60*24)); // 1000ms * 60s * 60min * 24h
  const hours = Math.floor((diff / (1000*60*60)) % 24);
  const minutes = Math.floor((diff / (1000*60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  // Update the text on the page
  countdownElement.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s until Jan 8, 2026`;
}
// Run it every second so it updates live
const countdownInterval = setInterval(updateCountdown, 1000);
updateCountdown(); // Also run it once immediately

/* ---------- START CLICK ---------- */
/* When you click the overlay, hide it, play the music, and show the first slide */
clickStart.addEventListener("click", () => {
  music.play().catch(()=>{}); // Try to play music 
  clickStart.style.display = "none"; // Hide overlay
  showSlide(0); // Show the first slide
});

/* ---------- TYPEWRITER EFFECT ---------- */
/* This makes the text appear letter by letter for a "typing" effect. This was fucking HELL OH MY FUCKING GOD THIS WAS NOT WORTH IT*/
function typeText(element, text) {
  element.textContent = ''; // Start blank
  let i = 0;
  const interval = setInterval(() => {
    element.textContent += text[i]; // Add one letter at a time (oh my fuck)
    i++; // (????)
    if(i >= text.length) clearInterval(interval); // Stop when it gets done 
  }, 25); // Speed of typing in milliseconds
}

// ---------- SHOW SLIDE ----------
function showSlide(index) {
  const slide = slides[index]; // Get the slide info
  body.style.background = slide.color; // Change background

  container.style.opacity = 0; // Fade out old stuff
  setTimeout(() => {
    // Main slide HTML
    container.innerHTML = `
      <h1 style="margin-left:${Math.random()*10}px;">${slide.title}</h1> 
      <p></p>
      ${
        slide.photos || slide.videos
          ? `<div id="mediaCollage" style="
                margin-top:1rem; 
                display:flex; 
                flex-wrap:wrap; 
                justify-content:center; 
                gap:10px;
                max-height:60vh; 
                overflow-y:auto;
                padding:10px;
            ">
              ${
                // Photos
                (slide.photos || []).map(photo => 
                  `<img src="${photo}" style="
                      height:30vh; 
                      width:auto;
                      object-fit:cover; 
                      border-radius:1rem; 
                      box-shadow:0 0 10px rgba(0,0,0,0.3);
                  ">`
                ).join('') +

                // Videos
                (slide.videos || []).map(video => 
                  `<video src="${video}" style="
                      height:30vh; 
                      width:auto;
                      object-fit:cover; 
                      border-radius:1rem; 
                      box-shadow:0 0 10px rgba(0,0,0,0.3);
                  " controls muted loop></video>` 
                ).join('')
              }
            </div>` 
          : ''
      }
      <div id="slideButtonContainer" style="margin-top:1rem; text-align:center;">
        ${index < slides.length-1 ? '<button class="btn" onclick="nextSlide()">Next ➤</button>' : '<button class="btn" onclick="restart()">↻ Replay</button>'}
      </div>
    `;

    // Typewriter effect for text
    typeText(container.querySelector('p'), slide.text);
    container.style.opacity = 1; // Fade in new content
  }, 400);
}



/* ---------- SLIDE NAVIGATION ---------- */
function nextSlide() {
  current++; // Move to next slide
  if(current < slides.length) showSlide(current); // Show it
}
function restart() {
  current = 0; // Go back to first slide
  showSlide(current);
}

/* ---------- FLOATING HEARTS ---------- */
/* These hearts float up the screen randomly */
const hearts = document.querySelector(".hearts");

function createHeart() {
  const heart = document.createElement("div"); // Make a new div
  heart.classList.add("heart");                 // Add the heart style
  heart.textContent = "💖";                     // Set the symbol

  // Random horizontal position
  heart.style.left = Math.random()*100 + "vw";
  // Random speed
  heart.style.animationDuration = Math.random()*4 + 4 + "s";

  hearts.appendChild(heart); // Add it to the page

  // Remove the heart after it floats off screen
  setTimeout(()=>heart.remove(), 8000);
}

// Keep making hearts every second
setInterval(createHeart, 1000);
