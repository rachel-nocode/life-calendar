// Constants
const LIFE_EXPECTANCY = 88; // years
const WEEKS_PER_YEAR = 52;
const TOTAL_WEEKS = LIFE_EXPECTANCY * WEEKS_PER_YEAR; // 4,576 weeks
const MIN_AGE = 0;
const MAX_AGE = 100;

// ─────────────────────────────────────────────────────────────
// Shared Stats Engine — every viral feature reads from here.
// All numbers derive from real life-expectancy math, not fake data.
// ─────────────────────────────────────────────────────────────
function computeStats(age) {
  const weeksLived = Math.floor(age * WEEKS_PER_YEAR);
  const weeksRemaining = Math.max(0, TOTAL_WEEKS - weeksLived);
  const percentLived = Math.min(100, (weeksLived / TOTAL_WEEKS) * 100);
  const yearsRemaining = Math.max(0, LIFE_EXPECTANCY - age);

  // Weekends: 1 per week
  const weekendsLived = weeksLived;
  const weekendsRemaining = weeksRemaining;

  // Activity time (whole-life estimates, scaled to remaining)
  // Hours/day → weeks over a lifetime
  const hoursToWeeks = (hpd, years) => (hpd * 365 * years) / (24 * 7);
  const sleepWeeks = Math.round(hoursToWeeks(8, LIFE_EXPECTANCY));
  const eatWeeks = Math.round(hoursToWeeks(1.5, LIFE_EXPECTANCY));
  const commuteWeeks = Math.round(hoursToWeeks(0.9, LIFE_EXPECTANCY));
  const socialWeeks = Math.round(hoursToWeeks(2.4, LIFE_EXPECTANCY));
  const workWeeks = Math.round(hoursToWeeks(8, 45)); // ~45 working years

  return {
    age,
    weeksLived,
    weeksRemaining,
    totalWeeks: TOTAL_WEEKS,
    percentLived: Math.round(percentLived * 10) / 10,
    percentRemaining: Math.round((100 - percentLived) * 10) / 10,
    yearsRemaining,
    weekendsLived,
    weekendsRemaining,
    summersLived: Math.floor(age),
    summersRemaining: yearsRemaining,
    activity: {
      sleep: sleepWeeks,
      eat: eatWeeks,
      commute: commuteWeeks,
      social: socialWeeks,
      work: workWeeks,
    },
  };
}

function fmt(n) {
  return Number(n).toLocaleString();
}

// Historical Facts Database
const historicalFacts = {
  0: ["You were born! You cried. A lot.", "Age 0: The start of your journey."],
  1: [
    "At age 1, Hercules strangled two snakes in his crib. You were probably eating dirt.",
    "At age 1, you likely took your first steps. A giant leap for mankind.",
  ],
  2: [
    "At age 2, Mozart could identify any note played on a piano.",
    "At age 2, Tiger Woods putted against Bob Hope on TV.",
  ],
  3: [
    "At age 3, Mozart started playing the harpsichord. No pressure.",
    "At age 3, you finally mastered the potty. Huge achievement.",
  ],
  4: [
    "At age 4, King Louis XIV ascended to the throne. He reigned for 72 years!",
    "At age 4, Chopin started piano lessons.",
  ],
  5: [
    "At age 5, Einstein was fascinated by a compass. It led him places.",
    "At age 5, Mozart composed his first minuet.",
  ],
  6: [
    "At age 6, Shirley Temple became the youngest person to win an Oscar.",
    "At age 6, you started school. The grind begins.",
  ],
  7: [
    "At age 7, Picasso could draw like a master (allegedly).",
    "At age 7, Beethoven gave his first public performance.",
  ],
  8: [
    "At age 8, Pascal proved a theorem. You learned multiplication tables.",
    "At age 8, you were probably trading Pokémon cards.",
  ],
  9: [
    "At age 9, Tutankhamun became Pharaoh.",
    "At age 9, Emma Watson was cast as Hermione Granger.",
  ],
  10: [
    "At age 10, Nadia Comaneci was already training for the Olympics.",
    "At age 10, Macaulay Culkin starred in Home Alone.",
  ],
  11: [
    "At age 11, Harry Potter went to Hogwarts. You went to middle school.",
    "At age 11, Venetian merchant Marco Polo began his travels.",
  ],
  12: [
    "At age 12, Blaise Pascal secretly worked out geometry proofs.",
    "At age 12, Ryan Gosling got a spot on the Mickey Mouse Club.",
  ],
  13: [
    "At age 13, Anne Frank started her diary.",
    "At age 13, Taylor Swift signed her first development deal.",
  ],
  14: [
    "At age 14, Nadia Comaneci scored the first perfect 10 in Olympic history.",
    "At age 14, the Dalai Lama was enthroned.",
  ],
  15: [
    "At age 15, Louis Braille invented the Braille system.",
    "At age 15, Greta Thunberg started striking for the climate.",
  ],
  16: [
    "At age 16, Alexander the Great founded his first colony.",
    "At age 16, Lorde released 'Royals'.",
  ],
  17: [
    "At age 17, Joan of Arc led the French army to victory.",
    "At age 17, Pele won the World Cup.",
  ],
  18: [
    "At age 18, Mary Shelley started writing Frankenstein.",
    "At age 18, Malala Yousafzai became the youngest Nobel Prize laureate.",
  ],
  19: [
    "At age 19, Mark Zuckerberg launched Facebook from his dorm.",
    "At age 19, Elvis recorded 'That's All Right'.",
  ],
  20: [
    "At age 20, Bill Gates dropped out of Harvard to start Microsoft.",
    "At age 20, Alexander the Great became King of Macedonia.",
  ],
  21: [
    "At age 21, Thomas Edison filed his first patent.",
    "At age 21, Stephen Hawking was diagnosed with ALS.",
  ],
  22: [
    "At age 22, Charles Darwin set sail on the HMS Beagle.",
    "At age 22, Jennifer Lawrence won an Oscar.",
  ],
  23: [
    "At age 23, Isaac Newton invented calculus during a pandemic lockdown.",
    "At age 23, Oprah Winfrey became a news anchor.",
  ],
  24: [
    "At age 24, Winston Churchill escaped from a POW camp.",
    "At age 24, The Beatles held the top 5 spots on the Billboard chart.",
  ],
  25: [
    "At age 25, Charles Lindbergh made the first solo nonstop transatlantic flight.",
    "At age 25, Janis Joplin released 'Cheap Thrills'.",
  ],
  26: [
    "At age 26, Michelangelo carved David.",
    "At age 26, Einstein published the theory of special relativity.",
  ],
  27: [
    "At age 27, Yuri Gagarin became the first human in space.",
    "At age 27, Van Gogh decided to become an artist.",
  ],
  28: [
    "At age 28, Picasso painted Les Demoiselles d'Avignon.",
    "At age 28, J.K. Rowling was a suicidal single mother living on benefits.",
  ],
  29: [
    "At age 29, Alexander Graham Bell invented the telephone.",
    "At age 29, Harrison Ford was still working as a carpenter.",
  ],
  30: [
    "At age 30, Jeff Bezos started Amazon in his garage.",
    "At age 30, Sylvester Stallone was broke and wrote Rocky.",
  ],
  31: [
    "At age 31, Oprah Winfrey got her own national talk show.",
    "At age 31, J.K. Rowling published Harry Potter.",
  ],
  32: [
    "At age 32, Alexander the Great died after conquering the known world.",
    "At age 32, Bill Gates became the youngest self-made billionaire.",
  ],
  33: [
    "At age 33, Jesus was crucified.",
    "At age 33, Meryl Streep won her first Oscar.",
  ],
  34: [
    "At age 34, Martin Luther King Jr. gave his 'I Have a Dream' speech.",
    "At age 34, Francis Ford Coppola directed The Godfather.",
  ],
  35: [
    "At age 35, Marie Curie discovered Radium.",
    "At age 35, William Shakespeare built the Globe Theatre.",
  ],
  36: [
    "At age 36, Paul Cézanne was still being rejected by the Paris Salon.",
    "At age 36, Julia Child moved to Paris and started cooking.",
  ],
  37: [
    "At age 37, Vincent van Gogh died, having sold only one painting.",
    "At age 37, Morgan Freeman was still looking for his big break.",
  ],
  38: [
    "At age 38, Neil Armstrong walked on the moon.",
    "At age 38, Mark Twain published The Adventures of Tom Sawyer.",
  ],
  39: [
    "At age 39, Cleopatra died.",
    "At age 39, Henry Ford founded the Ford Motor Company.",
  ],
  40: [
    "At age 40, Stan Lee created the Fantastic Four.",
    "At age 40, Vera Wang entered the fashion industry.",
  ],
  41: [
    "At age 41, Laura Ingalls Wilder started writing.",
    "At age 41, Alan Rickman got his first film role in Die Hard.",
  ],
  42: [
    "At age 42, Rosa Parks refused to give up her seat.",
    "At age 42, Steve Carell got his big break in The Office.",
  ],
  43: [
    "At age 43, JFK became the youngest elected US President.",
    "At age 43, Samuel L. Jackson got his breakout role.",
  ],
  44: [
    "At age 44, Sam Walton opened the first Wal-Mart.",
    "At age 44, George Lucas directed Star Wars: A New Hope.",
  ],
  45: [
    "At age 45, George Foreman regained the heavyweight championship.",
    "At age 45, Henry Ford introduced the Model T.",
  ],
  46: [
    "At age 46, Jack Nicklaus won the Masters.",
    "At age 46, Rodney Dangerfield finally got respect on Ed Sullivan.",
  ],
  47: [
    "At age 47, Barack Obama became President.",
    "At age 47, Susan Boyle stunned the world.",
  ],
  48: [
    "At age 48, Susan Boyle... wait, let's swap.",
    "At age 48, Charles Darwin was writing Origin of Species.",
  ],
  49: [
    "At age 49, Julia Child published her first cookbook.",
    "At age 49, Samuel L. Jackson was just getting started.",
  ],
  50: [
    "At age 50, Charles Darwin published On the Origin of Species.",
    "At age 50, Alfred Hitchcock directed Psycho.",
  ],
  51: [
    "At age 51, Leonardo da Vinci painted the Mona Lisa.",
    "At age 51, Ray Kroc met the McDonald brothers.",
  ],
  52: [
    "At age 52, Ray Kroc founded McDonald's.",
    "At age 52, Abraham Lincoln became President.",
  ],
  53: [
    "At age 53, Walter White broke bad (Fiction, but iconic).",
    "At age 53, Winston Churchill became Chancellor of the Exchequer.",
  ],
  54: [
    "At age 54, Dr. Seuss wrote The Cat in the Hat.",
    "At age 54, Ronald Reagan became Governor of California.",
  ],
  55: [
    "At age 55, Pablo Picasso painted Guernica.",
    "At age 55, Colonel Sanders was broke.",
  ],
  56: [
    "At age 56, Mao Zedong proclaimed the People's Republic of China.",
    "At age 56, Charles Darwin received the Copley Medal.",
  ],
  57: [
    "At age 57, Frank Lloyd Wright began the Guggenheim Museum.",
    "At age 57, Ray Kroc bought McDonald's for $2.7 million.",
  ],
  58: [
    "At age 58, Cervantes published Don Quixote.",
    "At age 58, Colonel Sanders was still trying to sell his chicken recipe.",
  ],
  59: [
    "At age 59, Satchel Paige became the oldest MLB player.",
    "At age 59, Alfred Hitchcock directed Vertigo.",
  ],
  60: [
    "At age 60, George Bernard Shaw wrote Heartbreak House.",
    "At age 60, Grandma Moses was still farming.",
  ],
  61: [
    "At age 61, Harland Sanders franchised Kentucky Fried Chicken.",
    "At age 61, J.R.R. Tolkien was finishing Lord of the Rings.",
  ],
  62: [
    "At age 62, J.R.R. Tolkien published The Fellowship of the Ring.",
    "At age 62, Colonel Sanders franchise finally took off.",
  ],
  63: [
    "At age 63, Laura Ingalls Wilder published her first book.",
    "At age 63, Benjamin Franklin invented bifocals.",
  ],
  64: [
    "At age 64, Diana Nyad swam from Cuba to Florida.",
    "At age 64, The Beatles asked 'Will you still need me?'",
  ],
  65: [
    "At age 65, Winston Churchill became Prime Minister.",
    "At age 65, Colonel Sanders used his social security check to franchise KFC.",
  ],
  66: [
    "At age 66, Noah Webster finished his dictionary.",
    "At age 66, Frank Lloyd Wright published his autobiography.",
  ],
  67: [
    "At age 67, Thomas Edison was working on rubber.",
    "At age 67, Leonardo da Vinci died.",
  ],
  68: [
    "At age 68, The Rolling Stones were still touring.",
    "At age 68, Galileo was convicted of heresy.",
  ],
  69: [
    "At age 69, Ronald Reagan became President.",
    "At age 69, David Bowie released Blackstar and died.",
  ],
  70: [
    "At age 70, Golda Meir became Prime Minister of Israel.",
    "At age 70, Donald Trump became President.",
  ],
  71: [
    "At age 71, Katsushika Hokusai painted The Great Wave.",
    "At age 71, Mother Teresa was still working in Calcutta.",
  ],
  72: [
    "At age 72, Margaret Thatcher retired.",
    "At age 72, Mick Jagger had his 8th child.",
  ],
  73: [
    "At age 73, Larry King ended his show.",
    "At age 73, Charles Darwin died.",
  ],
  74: [
    "At age 74, Nelson Mandela was awarded the Nobel Peace Prize.",
    "At age 74, Gandhi led the Quit India movement.",
  ],
  75: [
    "At age 75, Nelson Mandela became President of South Africa.",
    "At age 75, Barbara McClintock won the Nobel Prize.",
  ],
  76: [
    "At age 76, Grandma Moses started painting seriously.",
    "At age 76, Albert Einstein died.",
  ],
  77: [
    "At age 77, John Glenn returned to space.",
    "At age 77, Ronald Reagan left office.",
  ],
  78: [
    "At age 78, Mahatma Gandhi was assassinated.",
    "At age 78, Joe Biden became President.",
  ],
  79: [
    "At age 79, Anthony Hopkins won an Oscar.",
    "At age 79, Mother Teresa received the Nobel Peace Prize.",
  ],
  80: [
    "At age 80, Jessica Tandy won an Oscar.",
    "At age 80, Grandma Moses had her first solo exhibition.",
  ],
  81: [
    "At age 81, Benjamin Franklin signed the Constitution.",
    "At age 81, Queen Victoria died.",
  ],
  82: [
    "At age 82, Leo Tolstoy died.",
    "At age 82, Christopher Plummer won an Oscar.",
  ],
  83: ["At age 83, Isaac Newton died.", "At age 83, Thomas Jefferson died."],
  84: [
    "At age 84, Somerset Maugham published his last book.",
    "At age 84, Benjamin Franklin died.",
  ],
  85: [
    "At age 85, Theodor Mommsen won the Nobel Prize.",
    "At age 85, Coco Chanel died.",
  ],
  86: [
    "At age 86, Frank Lloyd Wright designed the Guggenheim.",
    "At age 86, Nikola Tesla died.",
  ],
  87: [
    "At age 87, Konrad Adenauer resigned as Chancellor.",
    "At age 87, Mother Teresa died.",
  ],
  88: [
    "At age 88, Michelangelo was still sculpting.",
    "At age 88, Betty White was still hosting SNL.",
  ],
};

const upliftWinIdeas = [
  "I did one task I was avoiding.",
  "I took care of my body in a small way.",
  "I asked for help or gave help.",
  "I showed patience when it was hard.",
  "I took a break before I hit empty.",
  "I set a boundary (even a small one).",
  "I learned something new, even by mistake.",
  "I returned to something after drifting.",
  "I made someone’s day a little easier.",
  "I finished a tiny thing that was on my mind.",
  "I was kinder to myself than usual.",
  "I chose “good enough” instead of “perfect.”",
];

// State
let currentAge = 25;
let isDragging = false;
let tooltip = null;
let streakInitialized = false;
let sharedState = null; // set when viewing a shared calendar via URL

// DOM Elements
const inputSection = document.getElementById("input-section");
const calendarSection = document.getElementById("calendar-section");
const ageDisplay = document.getElementById("age-display");
const showCalendarBtn = document.getElementById("show-calendar");
const backBtn = document.getElementById("back-btn");
const knobContainer = document.querySelector(".knob-container");
const knobHandle = document.getElementById("knob-handle");
const knobArc = document.getElementById("knob-arc");

// Week Streak DOM Elements
const streakShell = document.getElementById("streak-shell");
const streakShowBtn = document.getElementById("streak-show-btn");
const streakDismissBtn = document.getElementById("streak-dismiss-btn");
const streakInput = document.getElementById("streak-input");
const streakLogBtn = document.getElementById("streak-log-btn");
const streakIdeaBtn = document.getElementById("streak-idea-btn");
const streakShareBtn = document.getElementById("streak-share-btn");
const streakCountNum = document.getElementById("streak-count-num");
const streakCountLabel = document.getElementById("streak-count-label");
const streakMeta = document.getElementById("streak-meta");
const streakToast = document.getElementById("streak-toast");
const streakWeekLabel = document.getElementById("streak-week-label");

// Initialize
updateKnobPosition(currentAge);
createTooltip();

// Event Listeners
showCalendarBtn.addEventListener("click", showCalendar);
backBtn.addEventListener("click", showInput);

// Knob interaction
knobContainer.addEventListener("mousedown", startDrag);
knobContainer.addEventListener("touchstart", startDrag, { passive: false });
document.addEventListener("mousemove", drag);
document.addEventListener("touchmove", drag, { passive: false });
document.addEventListener("mouseup", stopDrag);
document.addEventListener("touchend", stopDrag);

// Tooltip interaction
const calendarGrid = document.getElementById("calendar-grid");
calendarGrid.addEventListener("mouseover", handleGridHover);
calendarGrid.addEventListener("mouseout", handleGridLeave);

function startDrag(e) {
  isDragging = true;
  updateAgeFromPosition(e);
}

function drag(e) {
  if (!isDragging) return;
  e.preventDefault();
  updateAgeFromPosition(e);
}

function stopDrag() {
  isDragging = false;
}

function updateAgeFromPosition(e) {
  const rect = knobContainer.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  let clientX, clientY;
  if (e.type.startsWith("touch")) {
    clientX = e.touches[0].clientX;
    clientY = e.touches[0].clientY;
  } else {
    clientX = e.clientX;
    clientY = e.clientY;
  }

  const deltaX = clientX - centerX;
  const deltaY = clientY - centerY;

  // Calculate angle in radians
  let angle = Math.atan2(deltaY, deltaX);

  // Convert to degrees and normalize to 0-360
  let degrees = ((angle * 180) / Math.PI + 90 + 360) % 360;

  // Map angle to age (0-360 degrees = MIN_AGE to MAX_AGE)
  const age = Math.round((degrees / 360) * (MAX_AGE - MIN_AGE) + MIN_AGE);

  if (age !== currentAge) {
    currentAge = Math.max(MIN_AGE, Math.min(MAX_AGE, age));
    updateKnobPosition(currentAge);
  }
}

function updateKnobPosition(age) {
  ageDisplay.textContent = age;

  // Calculate angle for the age (0-360 degrees)
  const percentage = (age - MIN_AGE) / (MAX_AGE - MIN_AGE);
  const degrees = percentage * 360;
  const radians = ((degrees - 90) * Math.PI) / 180;

  // Update handle position (radius = 80)
  const radius = 80;
  const handleX = 100 + radius * Math.cos(radians);
  const handleY = 100 + radius * Math.sin(radians);

  knobHandle.setAttribute("cx", handleX);
  knobHandle.setAttribute("cy", handleY);

  // Update arc
  const startAngle = -90;
  const endAngle = degrees - 90;
  const arcPath = describeArc(100, 100, radius, startAngle, endAngle);
  knobArc.setAttribute("d", arcPath);
}

function describeArc(x, y, radius, startAngle, endAngle) {
  if (endAngle - startAngle === 0) return "";

  const start = polarToCartesian(x, y, radius, endAngle);
  const end = polarToCartesian(x, y, radius, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

  return [
    "M",
    start.x,
    start.y,
    "A",
    radius,
    radius,
    0,
    largeArcFlag,
    0,
    end.x,
    end.y,
  ].join(" ");
}

function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
  const angleInRadians = (angleInDegrees * Math.PI) / 180;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
}

function showCalendar() {
  inputSection.classList.remove("active");
  calendarSection.classList.add("active");
  generateCalendar();
}

function showInput() {
  calendarSection.classList.remove("active");
  inputSection.classList.add("active");
}

function generateCalendar() {
  const weeksLived = Math.floor(currentAge * WEEKS_PER_YEAR);
  const weeksRemaining = TOTAL_WEEKS - weeksLived;

  // Update info display
  document.getElementById("display-age").textContent = currentAge;
  document.getElementById("weeks-lived").textContent =
    weeksLived.toLocaleString();
  document.getElementById("weeks-remaining").textContent =
    weeksRemaining.toLocaleString();

  // Generate year labels
  const yearLabelsContainer = document.getElementById("year-labels");
  yearLabelsContainer.innerHTML = "";

  const yearInterval = 8; // Show every 8 years
  for (let year = 0; year <= LIFE_EXPECTANCY; year += yearInterval) {
    const label = document.createElement("div");
    label.className = "year-label";
    label.textContent = year;
    yearLabelsContainer.appendChild(label);
  }

  // Generate calendar grid
  const calendarGrid = document.getElementById("calendar-grid");
  calendarGrid.innerHTML = "";

  for (let i = 0; i < TOTAL_WEEKS; i++) {
    const week = document.createElement("div");
    week.className = "week";

    if (i < weeksLived) {
      week.classList.add("lived");
    }

    const yearNum = Math.floor(i / WEEKS_PER_YEAR);
    const weekNum = (i % WEEKS_PER_YEAR) + 1;

    // Store data for custom tooltip
    week.dataset.year = yearNum;
    week.dataset.week = weekNum;
    week.dataset.index = i;

    // The current week (boundary between lived and remaining)
    if (i === weeksLived) week.classList.add("current-week");

    calendarGrid.appendChild(week);
  }

  renderGridMarkers();
  if (typeof renderStreak === "function") renderStreak();
}

// ───────── localStorage helpers (shared by interactive features) ─────────
function loadData(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}
function saveData(key, val) {
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch {}
}

// Paint bucket-list + life-event markers onto the grid
function renderGridMarkers() {
  const grid = document.getElementById("calendar-grid");
  if (!grid) return;
  grid.querySelectorAll(".week").forEach((w) => {
    w.classList.remove(
      "has-bucket",
      "has-event",
      "has-log",
      "mood-1",
      "mood-2",
      "mood-3",
      "mood-4",
      "mood-5"
    );
    delete w.dataset.label;
  });
  const bucket = sharedState ? sharedState.bucket || [] : loadData("lc_bucket", []);
  const events = sharedState ? sharedState.events || [] : loadData("lc_events", []);
  const journal = sharedState ? sharedState.journal || {} : loadData("lc_journal", {});
  Object.keys(journal).forEach((wk) => {
    const el = grid.querySelector(`.week[data-index="${wk}"]`);
    if (el) {
      el.classList.add("has-log");
      el.dataset.label = `🔥 ${journal[wk]}`;
    }
  });
  bucket.forEach((b) => {
    const el = grid.querySelector(`.week[data-index="${b.week}"]`);
    if (el) {
      el.classList.add("has-bucket");
      el.dataset.label = `✨ ${b.text}`;
    }
  });
  events.forEach((ev) => {
    const el = grid.querySelector(`.week[data-index="${ev.week}"]`);
    if (el) {
      el.classList.add("has-event");
      el.dataset.label = `${ev.emoji || "📍"} ${ev.text}`;
    }
  });
  // Mood heatmap paints last so it reads as a clean gradient.
  const mood = sharedState ? sharedState.mood || {} : loadData("lc_mood", {});
  const moodWord = ["", "rough", "low", "okay", "good", "great"];
  Object.keys(mood).forEach((wk) => {
    const el = grid.querySelector(`.week[data-index="${wk}"]`);
    if (el) {
      el.classList.add(`mood-${mood[wk]}`);
      if (!el.dataset.label)
        el.dataset.label = `${"🟥🟧🟨🟩🟢"[mood[wk] - 1] || "•"} ${
          moodWord[mood[wk]]
        } week`;
    }
  });
}

// Tooltip Logic
function createTooltip() {
  tooltip = document.createElement("div");
  tooltip.className = "fact-tooltip";
  document.body.appendChild(tooltip);
}

function handleGridHover(e) {
  if (e.target.classList.contains("week")) {
    const year = parseInt(e.target.dataset.year);
    const week = parseInt(e.target.dataset.week);
    const rect = e.target.getBoundingClientRect();

    showTooltip(year, week, rect, e.target.dataset.label);
  }
}

function handleGridLeave(e) {
  if (e.target.classList.contains("week")) {
    hideTooltip();
  }
}

function showTooltip(year, week, rect, label) {
  let content = `<span class="tooltip-header">Year ${year} • Week ${week}</span>`;

  // Personal marker (bucket item or life event) takes priority
  if (label) {
    content += `<div class="tooltip-fact" style="font-weight:700">${label}</div>`;
  }

  // Check if we have a fact for this year
  if (historicalFacts[year]) {
    const facts = historicalFacts[year];
    const randomFact = facts[Math.floor(Math.random() * facts.length)];
    content += `<span class="tooltip-emoji">💡</span><div class="tooltip-fact">${randomFact}</div>`;
  }

  tooltip.innerHTML = content;

  // Position tooltip
  // Default: Above the element
  let top = rect.top - tooltip.offsetHeight - 10;
  let left = rect.left + rect.width / 2 - tooltip.offsetWidth / 2;

  // Boundary checks
  if (top < 10) {
    // Show below if too close to top
    top = rect.bottom + 10;
  }

  if (left < 10) {
    left = 10;
  } else if (left + tooltip.offsetWidth > window.innerWidth - 10) {
    left = window.innerWidth - tooltip.offsetWidth - 10;
  }

  tooltip.style.top = `${top}px`;
  tooltip.style.left = `${left}px`;
  tooltip.classList.add("visible");
}

function hideTooltip() {
  tooltip.classList.remove("visible");
}

// ───────── Week Streak logic ─────────
// Streak = consecutive logged weeks ending at the current week.
// Reuses the lc_journal store shared with the "This Week" feature.
const STREAK_BADGES = [
  { weeks: 10, label: "🔥 10" },
  { weeks: 25, label: "🔥 25" },
  { weeks: 52, label: "🔥 52 (a year!)" },
  { weeks: 100, label: "💯 100" },
  { weeks: 260, label: "🏛️ 5 years" },
];

function computeStreak() {
  const journal = loadData("lc_journal", {});
  const freezesAvail = loadData("lc_freezes", 2);
  const keys = Object.keys(journal)
    .map(Number)
    .sort((a, b) => a - b);
  const total = keys.length;

  const currentWeek = Math.floor(currentAge * WEEKS_PER_YEAR);

  // Walk back from the current week. A "freeze" bridges a single missed week
  // so one slip doesn't reset the whole streak. The current (in-progress)
  // week is free — not logging it yet costs nothing.
  let streak = 0;
  let freezesUsed = 0;
  let w = currentWeek;
  if (journal[w] === undefined) w--; // current week still open
  while (w >= 0) {
    if (journal[w] !== undefined) {
      streak++;
      w--;
    } else if (freezesUsed < freezesAvail && journal[w - 1] !== undefined) {
      freezesUsed++; // spend a freeze to bridge the gap
      w--;
    } else {
      break;
    }
  }
  const freezesLeft = Math.max(0, freezesAvail - freezesUsed);

  let longest = 0;
  let run = 0;
  let prev = null;
  keys.forEach((k) => {
    run = prev !== null && k === prev + 1 ? run + 1 : 1;
    longest = Math.max(longest, run);
    prev = k;
  });

  const earned = STREAK_BADGES.filter((b) => longest >= b.weeks || streak >= b.weeks);
  const next = STREAK_BADGES.find((b) => streak < b.weeks);

  return { total, streak, longest, currentWeek, freezesLeft, freezesUsed, earned, next };
}

function renderStreak() {
  if (!streakShell) return;
  const { total, streak, longest, currentWeek, freezesLeft, earned, next } =
    computeStreak();
  const remaining = computeStats(currentAge).weeksRemaining;

  streakCountNum.textContent = streak;
  streakCountLabel.textContent =
    streak === 1 ? "week logged" : "weeks in a row";

  const badgeHtml = earned.length
    ? `<span>🎖️ ${earned.map((b) => b.label.split(" ")[0] + " " + b.weeks).join(" · ")}</span>`
    : next
    ? `<span>🎖️ Next badge: <strong>${next.label}</strong> in ${next.weeks - streak}</span>`
    : "";

  streakMeta.innerHTML = `
    <span>🏆 Longest: <strong>${longest}</strong></span>
    <span>✅ Total: <strong>${total}</strong></span>
    <span title="Each freeze bridges one missed week so your streak survives a slip.">❄️ Freezes: <strong>${freezesLeft}</strong></span>
    <span>⏳ <strong>${fmt(remaining)}</strong> weeks left</span>
    ${badgeHtml}`;
  streakWeekLabel.textContent = `What made week ${fmt(
    currentWeek
  )} count?`;

  const journal = loadData("lc_journal", {});
  if (journal[currentWeek] !== undefined && document.activeElement !== streakInput) {
    streakInput.value = journal[currentWeek];
  }
}

function flashToast(msg) {
  streakToast.textContent = msg;
  streakToast.classList.add("show");
  setTimeout(() => streakToast.classList.remove("show"), 2600);
}

function logCurrentWeek() {
  const text = (streakInput.value || "").trim();
  const journal = loadData("lc_journal", {});
  const currentWeek = Math.floor(currentAge * WEEKS_PER_YEAR);
  if (!text) {
    delete journal[currentWeek];
  } else {
    journal[currentWeek] = text.slice(0, 200);
  }
  saveData("lc_journal", journal);
  renderStreak();
  renderGridMarkers();

  streakCountNum.classList.remove("bump");
  void streakCountNum.offsetWidth; // reflow to restart animation
  streakCountNum.classList.add("bump");

  const { streak } = computeStreak();
  const justHit = STREAK_BADGES.find((b) => b.weeks === streak);
  if (text) {
    if (justHit) {
      flashToast(`🎖️ Badge unlocked: ${justHit.label}! ${streak} weeks strong.`);
    } else {
      flashToast(
        streak > 1
          ? `🔥 ${streak} weeks in a row — week ${fmt(currentWeek)} locked in!`
          : `🔥 Streak started — week ${fmt(currentWeek)} locked in!`
      );
    }
  } else {
    flashToast("Week cleared.");
  }
}

function showStreakShell() {
  streakShell.hidden = false;
  streakShowBtn.hidden = true;
}

function hideStreakShell() {
  streakShell.hidden = true;
  streakShowBtn.hidden = false;
}

function initStreakWidget() {
  if (streakInitialized) return;
  streakInitialized = true;
  if (!streakShell) return;

  streakDismissBtn.addEventListener("click", hideStreakShell);
  streakShowBtn.addEventListener("click", () => {
    showStreakShell();
    renderStreak();
  });
  streakLogBtn.addEventListener("click", logCurrentWeek);
  streakInput.addEventListener("keydown", (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") logCurrentWeek();
  });
  streakIdeaBtn.addEventListener("click", () => {
    streakInput.value =
      upliftWinIdeas[Math.floor(Math.random() * upliftWinIdeas.length)];
    streakInput.focus();
  });
  streakShareBtn.addEventListener("click", () => {
    const { streak, longest } = computeStreak();
    if (streak < 1) {
      flashToast("Log this week first, then share your streak.");
      return;
    }
    tweet(
      `🔥 I've made ${streak} week${
        streak === 1 ? "" : "s"
      } in a row count (longest: ${longest}). Every dot is a week I won't get back. Start yours:`,
      ["WeeksOfMyLife", "WeekStreak", "MementoMori"]
    );
  });

  renderStreak();
  showStreakShell();
}

// Initialize with default age
updateKnobPosition(currentAge);
initStreakWidget();

// ═══════════════════════════════════════════════════════════════
// VIRAL FEATURES
// ═══════════════════════════════════════════════════════════════

// ───────── Shared Modal Infra ─────────
const modalOverlay = document.getElementById("modal-overlay");
const modalTitleEl = document.getElementById("modal-title");
const modalBodyEl = document.getElementById("modal-body");
const modalCloseEl = document.getElementById("modal-close");

function openModal(title, bodyHTML) {
  modalTitleEl.textContent = title;
  modalBodyEl.innerHTML = bodyHTML;
  modalOverlay.hidden = false;
}

function closeModal() {
  modalOverlay.hidden = true;
  modalBodyEl.innerHTML = "";
}

modalCloseEl.addEventListener("click", closeModal);
modalOverlay.addEventListener("click", (e) => {
  if (e.target === modalOverlay) closeModal();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !modalOverlay.hidden) closeModal();
});

// ───────── Shared Tweet Helper ─────────
const SITE_URL = "https://weeksofmylife.app"; // update to live URL
function tweet(text, hashtags) {
  const params = new URLSearchParams({
    text,
    url: SITE_URL,
    hashtags: (hashtags || ["WeeksOfMyLife", "MementoMori"]).join(","),
  });
  window.open(
    `https://twitter.com/intent/tweet?${params.toString()}`,
    "_blank",
    "noopener"
  );
}

// ───────── Feature 1: Shareable Twitter Card (PNG) ─────────
function drawShareCard() {
  const canvas = document.getElementById("export-canvas");
  const ctx = canvas.getContext("2d");
  const W = canvas.width; // 1200
  const H = canvas.height; // 675
  const s = computeStats(currentAge);

  // Background
  ctx.fillStyle = "#0a0a0a";
  ctx.fillRect(0, 0, W, H);

  // Title
  ctx.fillStyle = "#ffffff";
  ctx.font = "800 46px Inter, sans-serif";
  ctx.textBaseline = "top";
  ctx.fillText("WEEKS OF MY LIFE", 60, 54);

  // Mini week grid (right side)
  const cols = 52;
  const rows = LIFE_EXPECTANCY;
  const gridW = 520;
  const gridX = W - gridW - 60;
  const gridY = 150;
  const cell = gridW / cols; // ~10px
  const dot = cell * 0.62;
  for (let i = 0; i < TOTAL_WEEKS; i++) {
    const c = i % cols;
    const r = Math.floor(i / cols);
    const x = gridX + c * cell;
    const y = gridY + r * cell;
    ctx.beginPath();
    ctx.arc(x + cell / 2, y + cell / 2, dot / 2, 0, Math.PI * 2);
    if (i < s.weeksLived) {
      ctx.fillStyle = "#ffffff";
      ctx.fill();
    } else {
      ctx.strokeStyle = "#3a3a3a";
      ctx.lineWidth = 1;
      ctx.stroke();
    }
  }

  // Big stats (left side)
  ctx.fillStyle = "#ffffff";
  ctx.font = "800 120px Inter, sans-serif";
  ctx.fillText(String(currentAge), 60, 180);
  ctx.fillStyle = "#a0a0a0";
  ctx.font = "600 26px Inter, sans-serif";
  ctx.fillText("YEARS OLD", 66, 320);

  ctx.fillStyle = "#ffffff";
  ctx.font = "800 40px Inter, sans-serif";
  ctx.fillText(`${fmt(s.weeksLived)} weeks lived`, 60, 380);
  ctx.fillStyle = "#ff5a5a";
  ctx.fillText(`${fmt(s.weeksRemaining)} weeks left`, 60, 432);

  // Percent bar
  ctx.fillStyle = "#2a2a2a";
  ctx.fillRect(60, 510, 480, 18);
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(60, 510, 480 * (s.percentLived / 100), 18);
  ctx.fillStyle = "#a0a0a0";
  ctx.font = "600 22px Inter, sans-serif";
  ctx.fillText(`${s.percentLived}% of an 88-year life`, 60, 540);

  // Footer
  ctx.fillStyle = "#666666";
  ctx.font = "600 22px Inter, sans-serif";
  ctx.fillText("weeksofmylife.app  ·  #MementoMori", 60, 600);

  return canvas;
}

function openShareCard() {
  // Ensure Inter is loaded before drawing for crisp text
  const render = () => {
    const canvas = drawShareCard();
    const dataUrl = canvas.toDataURL("image/png");
    openModal(
      "📸 Your Shareable Card",
      `<p>1200×675 — sized perfectly for a Twitter/X post.</p>
       <img src="${dataUrl}" class="share-preview" alt="Life calendar share card" />
       <div class="modal-actions">
         <button class="modal-cta" id="dl-card">⬇ Download PNG</button>
         <button class="modal-cta tweet" id="tweet-card">𝕏 Tweet This</button>
       </div>`
    );
    document.getElementById("dl-card").addEventListener("click", () => {
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = `weeks-of-my-life-age-${currentAge}.png`;
      a.click();
    });
    document.getElementById("tweet-card").addEventListener("click", () => {
      const s = computeStats(currentAge);
      tweet(
        `I've lived ${fmt(s.weeksLived)} weeks. I have ${fmt(
          s.weeksRemaining
        )} left. (Attach the card you just downloaded 👇)`
      );
    });
  };
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(render);
  } else {
    render();
  }
}

// ───────── Feature 2: Shocking Stat Generator ─────────
function shockingStats(s) {
  // Parents: assume seen ~52x/yr until 18, then 2x/month. Rough.
  const parentVisitsLeft = Math.round(s.yearsRemaining * 24 * 0.6);
  return [
    `You've already lived through <strong>${fmt(
      s.weekendsLived
    )} weekends</strong>. You have about <strong>${fmt(
      s.weekendsRemaining
    )}</strong> left.`,
    `<strong>${s.percentLived}%</strong> of a typical life is already behind you.`,
    `If you see your parents twice a month, you may have only <strong>~${fmt(
      parentVisitsLeft
    )} visits</strong> left with them.`,
    `You have roughly <strong>${fmt(
      s.summersRemaining
    )} summers</strong> remaining. That's it.`,
    `Every dot you haven't filled is a week you haven't lived yet — <strong>${fmt(
      s.weeksRemaining
    )}</strong> of them.`,
    `By age ${s.age}, you've slept through an estimated <strong>${fmt(
      Math.round(s.activity.sleep * (s.age / LIFE_EXPECTANCY))
    )} weeks</strong> of your life.`,
  ];
}
let shockIndex = 0;
function openShockingStat() {
  const s = computeStats(currentAge);
  const stats = shockingStats(s);
  const render = () => {
    const txt = stats[shockIndex % stats.length];
    openModal(
      "💀 Shocking Stat",
      `<div class="stat-hero danger" style="font-size:1.9rem;line-height:1.3">${txt}</div>
       <div class="modal-actions">
         <button class="modal-cta ghost" id="shock-next">↻ Another</button>
         <button class="modal-cta tweet" id="shock-tweet">𝕏 Tweet This</button>
       </div>`
    );
    document.getElementById("shock-next").addEventListener("click", () => {
      shockIndex++;
      render();
    });
    document.getElementById("shock-tweet").addEventListener("click", () => {
      tweet(stats[shockIndex % stats.length].replace(/<[^>]+>/g, ""));
    });
  };
  render();
}

// ───────── Feature 3: Milestone Badges ─────────
const MILESTONES = [500, 1000, 1300, 1500, 2000, 2500, 3000, 3500, 4000, 4576];
function openMilestones() {
  const s = computeStats(currentAge);
  const next = MILESTONES.find((m) => m > s.weeksLived) || TOTAL_WEEKS;
  const last = [...MILESTONES].reverse().find((m) => m <= s.weeksLived);
  const weeksToNext = next - s.weeksLived;
  const rows = MILESTONES.map((m) => {
    const hit = s.weeksLived >= m;
    return `<p style="margin:6px 0">${hit ? "✅" : "⬜"} <strong>${fmt(
      m
    )} weeks</strong> ${
      hit ? "— unlocked" : `— in ${fmt(m - s.weeksLived)} weeks`
    }</p>`;
  }).join("");
  openModal(
    "🏆 Milestone Badges",
    `<div class="stat-hero">${last ? fmt(last) : "0"} weeks</div>
     <div class="stat-sub">Your latest milestone. Next badge: <strong>${fmt(
       next
     )} weeks</strong> in <strong>${fmt(weeksToNext)}</strong> weeks (~${(
      weeksToNext / 52
    ).toFixed(1)} yrs).</div>
     ${rows}
     <div class="modal-actions">
       <button class="modal-cta tweet" id="ms-tweet">𝕏 Share Badge</button>
     </div>`
  );
  document.getElementById("ms-tweet").addEventListener("click", () => {
    tweet(
      `I just hit ${fmt(last || 0)} weeks of life. 🏆 ${fmt(
        s.weeksRemaining
      )} to go. How many have you lived?`
    );
  });
}

// ───────── Feature 4: Activity Time Calculator ─────────
function openActivity() {
  const s = computeStats(currentAge);
  const a = s.activity;
  const row = (emoji, label, weeks) =>
    `<p style="display:flex;justify-content:space-between;margin:8px 0">
       <span>${emoji} ${label}</span>
       <strong>~${fmt(weeks)} weeks</strong>
     </p>`;
  openModal(
    "⏳ Where Your Life Goes",
    `<div class="stat-sub">Lifetime estimates across all ${LIFE_EXPECTANCY} years:</div>
     ${row("😴", "Sleeping", a.sleep)}
     ${row("🍽️", "Eating", a.eat)}
     ${row("🚗", "Commuting", a.commute)}
     ${row("📱", "On screens / social", a.social)}
     ${row("💼", "Working", a.work)}
     <p style="margin-top:14px;border-top:1px solid var(--border);padding-top:12px">
       That's <strong>${fmt(
         a.sleep + a.eat + a.commute + a.social + a.work
       )} weeks</strong> of your ${fmt(TOTAL_WEEKS)} spoken for.</p>
     <div class="modal-actions">
       <button class="modal-cta tweet" id="act-tweet">𝕏 Tweet This</button>
     </div>`
  );
  document.getElementById("act-tweet").addEventListener("click", () => {
    tweet(
      `Of my life I'll spend ~${fmt(a.sleep)} weeks sleeping, ~${fmt(
        a.social
      )} weeks on screens, and ~${fmt(a.commute)} weeks commuting. 😳`
    );
  });
}

// ───────── Feature 5: Relationship Countdown ─────────
function openRelationships() {
  const s = computeStats(currentAge);
  openModal(
    "❤️ How Many Visits Left",
    `<div class="stat-sub">If you see this person <strong>this often</strong>, here's roughly how many times you have left over your remaining ~${s.yearsRemaining} years.</div>
     <p>Times you see them per month:
       <input id="rel-freq" type="number" value="2" min="0" max="100"
        style="width:70px;background:rgba(0,0,0,.3);border:1px solid var(--border);color:#fff;border-radius:8px;padding:6px;font-size:1rem"/>
     </p>
     <div class="stat-hero danger" id="rel-out">~${fmt(
       s.yearsRemaining * 24
     )} visits</div>
     <div class="stat-sub">over the rest of your life.</div>
     <div class="modal-actions">
       <button class="modal-cta tweet" id="rel-tweet">𝕏 Tweet This</button>
     </div>`
  );
  const freqEl = document.getElementById("rel-freq");
  const outEl = document.getElementById("rel-out");
  const calc = () => {
    const f = Math.max(0, Number(freqEl.value) || 0);
    const visits = Math.round(f * 12 * s.yearsRemaining);
    outEl.textContent = `~${fmt(visits)} visits`;
    return visits;
  };
  freqEl.addEventListener("input", calc);
  document.getElementById("rel-tweet").addEventListener("click", () => {
    const v = calc();
    tweet(
      `If I see the people I love just ${freqEl.value}x a month, I have about ${fmt(
        v
      )} visits left with them. Make them count.`
    );
  });
}

// ───────── Feature 6: Seasonal Markers ─────────
function openSeasons() {
  const s = computeStats(currentAge);
  const row = (emoji, label, lived, left) =>
    `<p style="display:flex;justify-content:space-between;margin:8px 0">
       <span>${emoji} ${label}</span>
       <span><strong>${lived}</strong> lived · <strong style="color:#ff5a5a">${left}</strong> left</span>
     </p>`;
  openModal(
    "🎄 Seasons of a Life",
    `<div class="stat-sub">Each one is rarer than it feels.</div>
     ${row("🎂", "Birthdays", s.age, s.yearsRemaining)}
     ${row("🎄", "Christmases", s.age, s.yearsRemaining)}
     ${row("☀️", "Summers", s.age, s.yearsRemaining)}
     ${row("🍂", "Autumns", s.age, s.yearsRemaining)}
     ${row("🌸", "Springs", s.age, s.yearsRemaining)}
     <div class="modal-actions">
       <button class="modal-cta tweet" id="seas-tweet">𝕏 Tweet This</button>
     </div>`
  );
  document.getElementById("seas-tweet").addEventListener("click", () => {
    tweet(
      `I have about ${s.yearsRemaining} summers and ${s.yearsRemaining} more Christmases left. Suddenly they all matter more. ☀️🎄`
    );
  });
}

// ───────── Feature 7: Memento Mori / Stoic Quotes ─────────
const stoicQuotes = [
  ["You could leave life right now. Let that determine what you do and say and think.", "Marcus Aurelius"],
  ["It is not that we have a short time to live, but that we waste a lot of it.", "Seneca"],
  ["Let us prepare our minds as if we'd come to the very end of life. Let us postpone nothing.", "Seneca"],
  ["You have power over your mind — not outside events. Realize this, and you will find strength.", "Marcus Aurelius"],
  ["Begin at once to live, and count each separate day as a separate life.", "Seneca"],
  ["Memento mori — remember that you will die.", "Stoic maxim"],
  ["The whole future lies in uncertainty: live immediately.", "Seneca"],
  ["Do not act as if you had ten thousand years to live.", "Marcus Aurelius"],
  ["Death smiles at us all; all we can do is smile back.", "Marcus Aurelius"],
  ["He who fears death will never do anything worthy of a living man.", "Seneca"],
  ["Waste no more time arguing about what a good man should be. Be one.", "Marcus Aurelius"],
  ["As is a tale, so is life: not how long it is, but how good it is, is what matters.", "Seneca"],
  ["Confine yourself to the present.", "Marcus Aurelius"],
  ["Sometimes even to live is an act of courage.", "Seneca"],
  ["The best revenge is not to be like your enemy.", "Marcus Aurelius"],
  ["Life is long if you know how to use it.", "Seneca"],
  ["Think of yourself as dead. You have lived your life. Now take what's left and live it properly.", "Marcus Aurelius"],
  ["Every new beginning comes from some other beginning's end.", "Seneca"],
];
let quoteIndex = Math.floor(Math.random() * stoicQuotes.length);
function openMemento() {
  const render = () => {
    const [q, who] = stoicQuotes[quoteIndex % stoicQuotes.length];
    openModal(
      "🪦 Memento Mori",
      `<div style="font-size:1.6rem;line-height:1.4;font-weight:600;margin:10px 0">“${q}”</div>
       <div class="stat-sub">— ${who}</div>
       <div class="modal-actions">
         <button class="modal-cta ghost" id="mem-next">↻ Another</button>
         <button class="modal-cta tweet" id="mem-tweet">𝕏 Tweet This</button>
       </div>`
    );
    document.getElementById("mem-next").addEventListener("click", () => {
      let next = quoteIndex;
      while (next === quoteIndex && stoicQuotes.length > 1) {
        next = Math.floor(Math.random() * stoicQuotes.length);
      }
      quoteIndex = next;
      render();
    });
    document.getElementById("mem-tweet").addEventListener("click", () => {
      tweet(`“${q}” — ${who}`);
    });
  };
  quoteIndex = Math.floor(Math.random() * stoicQuotes.length);
  render();
}

// ───────── Feature 8: Bucket List Overlay ─────────
function openBucket() {
  const bucket = loadData("lc_bucket", []);
  const list = bucket.length
    ? bucket
        .map(
          (b, i) =>
            `<p style="display:flex;justify-content:space-between;gap:8px;margin:6px 0">
               <span>✨ ${b.text} <span style="color:var(--text-secondary)">— by age ${Math.round(
              b.week / 52
            )}</span></span>
               <button class="link-del" data-del="${i}">remove</button>
             </p>`
        )
        .join("")
    : `<p>No goals yet. Add one and it lights up as gold on your calendar.</p>`;
  openModal(
    "✨ Bucket List",
    `<div class="stat-sub">Mark a future week with something you want to do. It glows gold on the grid.</div>
     <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px">
       <input id="bk-text" placeholder="e.g. See the northern lights" maxlength="60"
        style="flex:1;min-width:160px;background:rgba(0,0,0,.3);border:1px solid var(--border);color:#fff;border-radius:8px;padding:8px"/>
       <input id="bk-age" type="number" value="${Math.min(
         currentAge + 5,
         LIFE_EXPECTANCY
       )}" min="${currentAge}" max="${LIFE_EXPECTANCY}" title="By age"
        style="width:80px;background:rgba(0,0,0,.3);border:1px solid var(--border);color:#fff;border-radius:8px;padding:8px"/>
       <button class="modal-cta" id="bk-add">Add</button>
     </div>
     <div id="bk-list">${list}</div>`
  );
  document.getElementById("bk-add").addEventListener("click", () => {
    const text = document.getElementById("bk-text").value.trim();
    const age = Number(document.getElementById("bk-age").value);
    if (!text) return;
    bucket.push({ text, week: Math.floor(age * 52) });
    saveData("lc_bucket", bucket);
    renderGridMarkers();
    openBucket();
  });
  modalBodyEl.querySelectorAll("[data-del]").forEach((btn) =>
    btn.addEventListener("click", () => {
      bucket.splice(Number(btn.dataset.del), 1);
      saveData("lc_bucket", bucket);
      renderGridMarkers();
      openBucket();
    })
  );
}

// ───────── Feature 9: Life Events Timeline ─────────
function openEvents() {
  const events = loadData("lc_events", []);
  const list = events.length
    ? events
        .map(
          (ev, i) =>
            `<p style="display:flex;justify-content:space-between;gap:8px;margin:6px 0">
               <span>${ev.emoji || "📍"} ${ev.text} <span style="color:var(--text-secondary)">— age ${Math.round(
              ev.week / 52
            )}</span></span>
               <button class="link-del" data-del="${i}">remove</button>
             </p>`
        )
        .join("")
    : `<p>No events yet. Plot the moments that shaped you — they mark blue on the grid.</p>`;
  openModal(
    "📍 Life Events",
    `<div class="stat-sub">Add a milestone at the age it happened. It marks blue on your calendar.</div>
     <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px">
       <input id="ev-emoji" value="🎓" maxlength="2" title="Emoji"
        style="width:54px;text-align:center;background:rgba(0,0,0,.3);border:1px solid var(--border);color:#fff;border-radius:8px;padding:8px"/>
       <input id="ev-text" placeholder="e.g. Graduated" maxlength="60"
        style="flex:1;min-width:140px;background:rgba(0,0,0,.3);border:1px solid var(--border);color:#fff;border-radius:8px;padding:8px"/>
       <input id="ev-age" type="number" value="${currentAge}" min="0" max="${LIFE_EXPECTANCY}" title="Age"
        style="width:72px;background:rgba(0,0,0,.3);border:1px solid var(--border);color:#fff;border-radius:8px;padding:8px"/>
       <button class="modal-cta" id="ev-add">Add</button>
     </div>
     <div>${list}</div>`
  );
  document.getElementById("ev-add").addEventListener("click", () => {
    const text = document.getElementById("ev-text").value.trim();
    const emoji = document.getElementById("ev-emoji").value.trim() || "📍";
    const age = Number(document.getElementById("ev-age").value);
    if (!text) return;
    events.push({ text, emoji, week: Math.floor(age * 52) });
    saveData("lc_events", events);
    renderGridMarkers();
    openEvents();
  });
  modalBodyEl.querySelectorAll("[data-del]").forEach((btn) =>
    btn.addEventListener("click", () => {
      events.splice(Number(btn.dataset.del), 1);
      saveData("lc_events", events);
      renderGridMarkers();
      openEvents();
    })
  );
}

// ───────── Feature 10: Generational View ─────────
function openGenerations() {
  const bar = (label, age, color) => {
    const pct = Math.min(100, (age / LIFE_EXPECTANCY) * 100);
    return `<div style="margin:12px 0">
      <div style="display:flex;justify-content:space-between;font-size:.9rem;margin-bottom:4px">
        <span>${label}</span><span style="color:var(--text-secondary)">age ${age} · ${Math.round(
      pct
    )}%</span></div>
      <div style="height:14px;background:#2a2a2a;border-radius:7px;overflow:hidden">
        <div style="height:100%;width:${pct}%;background:${color}"></div></div></div>`;
  };
  openModal(
    "👨‍👩‍👧 Generational View",
    `<div class="stat-sub">See your life alongside the people around you. Enter their ages:</div>
     <div style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:10px">
       <label style="flex:1">Parent <input id="gen-parent" type="number" value="${Math.min(
         currentAge + 28,
         LIFE_EXPECTANCY
       )}" min="0" max="${LIFE_EXPECTANCY}" style="width:100%;background:rgba(0,0,0,.3);border:1px solid var(--border);color:#fff;border-radius:8px;padding:8px"/></label>
       <label style="flex:1">Child <input id="gen-child" type="number" value="0" min="0" max="${LIFE_EXPECTANCY}" style="width:100%;background:rgba(0,0,0,.3);border:1px solid var(--border);color:#fff;border-radius:8px;padding:8px"/></label>
     </div>
     <div id="gen-bars"></div>`
  );
  const draw = () => {
    const p = Number(document.getElementById("gen-parent").value) || 0;
    const c = Number(document.getElementById("gen-child").value) || 0;
    const overlapParent = Math.max(0, LIFE_EXPECTANCY - p);
    document.getElementById("gen-bars").innerHTML =
      bar("You", currentAge, "#ffffff") +
      bar("Parent", p, "#ff5a5a") +
      bar("Child", c, "#1d9bf0") +
      `<p style="margin-top:14px;border-top:1px solid var(--border);padding-top:12px">
        If patterns hold, you may share roughly <strong>${overlapParent} more years</strong> with your parent.</p>`;
  };
  draw();
  document.getElementById("gen-parent").addEventListener("input", draw);
  document.getElementById("gen-child").addEventListener("input", draw);
}

// ───────── Feature 11: "What did you do this week?" ─────────
function openReflect() {
  const s = computeStats(currentAge);
  const wk = s.weeksLived; // current week index
  const journal = loadData("lc_journal", {});
  const past = Object.entries(journal)
    .sort((a, b) => b[0] - a[0])
    .slice(0, 6)
    .map(
      ([w, t]) =>
        `<p style="margin:6px 0;border-left:2px solid var(--border);padding-left:10px">
           <span style="color:var(--text-secondary)">Week ${fmt(w)}:</span> ${t}</p>`
    )
    .join("");
  openModal(
    "📝 What did you do this week?",
    `<div class="stat-sub">This is week <strong>${fmt(
      wk
    )}</strong> of your life (the gold pulsing dot). Don't let it blur into the others.</div>
     <textarea id="rf-text" rows="3" maxlength="280" placeholder="One thing that made this week yours..."
       style="width:100%;background:rgba(0,0,0,.3);border:1px solid var(--border);color:#fff;border-radius:10px;padding:12px;font-family:inherit;font-size:.95rem">${
         journal[wk] || ""
       }</textarea>
     <div class="modal-actions">
       <button class="modal-cta" id="rf-save">Save This Week</button>
       <button class="modal-cta tweet" id="rf-tweet">𝕏 Tweet It</button>
     </div>
     ${past ? `<div style="margin-top:18px"><strong>Recent weeks</strong>${past}</div>` : ""}`
  );
  document.getElementById("rf-save").addEventListener("click", () => {
    const t = document.getElementById("rf-text").value.trim();
    if (t) journal[wk] = t;
    else delete journal[wk];
    saveData("lc_journal", journal);
    renderGridMarkers();
    if (typeof renderStreak === "function") renderStreak();
    openReflect();
  });
  document.getElementById("rf-tweet").addEventListener("click", () => {
    const t = document.getElementById("rf-text").value.trim();
    tweet(
      `Week ${fmt(wk)} of my life: ${t || "making it count."} #ThisWeek`,
      ["WeeksOfMyLife", "ThisWeek"]
    );
  });
}

// Quick-add an event by clicking a week on the grid
document.getElementById("calendar-grid").addEventListener("click", (e) => {
  if (!e.target.classList.contains("week")) return;
  const idx = Number(e.target.dataset.index);
  const age = Math.round(idx / 52);
  const text = prompt(`Add a life event at age ${age}? (leave blank to cancel)`);
  if (text && text.trim()) {
    const events = loadData("lc_events", []);
    events.push({ text: text.trim(), emoji: "📍", week: idx });
    saveData("lc_events", events);
    renderGridMarkers();
  }
});

// ───────── Feature 12: Anonymous Global Stats ─────────
function openGlobal() {
  const s = computeStats(currentAge);
  openModal(
    "🌍 How You Compare",
    `<div class="stat-hero">${s.percentRemaining}%</div>
     <div class="stat-sub">of life is still ahead of the average ${
       s.age
     }-year-old.</div>
     <p>📊 The average <strong>${s.age}-year-old</strong> has lived <strong>${
      s.percentLived
    }%</strong> of an 88-year life.</p>
     <p>⏳ That's <strong>${fmt(
       s.weeksRemaining
     )} weeks</strong> still on the board.</p>
     <p>🌐 Worldwide, ~${(8.1).toFixed(
       1
     )} billion people are filling in their own grids right now. Yours is the only one you control.</p>
     <div class="modal-actions">
       <button class="modal-cta tweet" id="gl-tweet">𝕏 Tweet This</button>
     </div>`
  );
  document.getElementById("gl-tweet").addEventListener("click", () => {
    tweet(
      `The average ${s.age}-year-old still has ${s.percentRemaining}% of their life left — about ${fmt(
        s.weeksRemaining
      )} weeks. What will you do with yours?`
    );
  });
}

// ───────── Feature 13: Challenge Mode ─────────
function openChallenge() {
  const s = computeStats(currentAge);
  openModal(
    "🔥 The Mortality Challenge",
    `<div class="stat-sub">Confront your friends with their own clock. Here's how it spreads:</div>
     <p><strong>1.</strong> Screenshot or download your life calendar (📸 Share Card).</p>
     <p><strong>2.</strong> Post it with the stat below.</p>
     <p><strong>3.</strong> Tag 3 friends and dare them to make theirs.</p>
     <div style="background:rgba(0,0,0,.3);border:1px solid var(--border);border-radius:10px;padding:14px;margin:14px 0">
       I've lived ${fmt(s.weeksLived)} weeks. ${fmt(
      s.weeksRemaining
    )} left. 🪦<br/>Make yours at weeksofmylife.app and tag 3 people who need this reminder. #WeeksOfMyLife
     </div>
     <div class="modal-actions">
       <button class="modal-cta tweet" id="ch-tweet">𝕏 Start the Challenge</button>
     </div>`
  );
  document.getElementById("ch-tweet").addEventListener("click", () => {
    tweet(
      `I've lived ${fmt(s.weeksLived)} weeks. ${fmt(
        s.weeksRemaining
      )} left. 🪦 Make yours and tag 3 people who need this reminder. Who's in?`,
      ["WeeksOfMyLife", "MementoMori", "Challenge"]
    );
  });
}

// ───────── Feature 14: Time Capsule (with .ics calendar delivery) ─────────
const WEEK_MS = 7 * 24 * 60 * 60 * 1000;

// Escape text for an iCalendar field (RFC 5545)
function icsEscape(t) {
  return String(t)
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\r?\n/g, "\\n");
}

function icsStampUTC(ms) {
  // YYYYMMDDTHHMMSSZ
  return new Date(ms).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}
function icsDate(ms) {
  // all-day VALUE=DATE → YYYYMMDD (local)
  const d = new Date(ms);
  const p = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}${p(d.getMonth() + 1)}${p(d.getDate())}`;
}

// Build an .ics calendar reminder with the message embedded in the notes,
// so it reaches the user on the unlock date on ANY device — no backend.
function buildCapsuleIcs(cap) {
  const desc = icsEscape(
    `Your message from ${new Date(cap.createdAt).toLocaleDateString()}:\n\n` +
      `"${cap.msg}"\n\n` +
      `Re-open your full calendar: ${SITE_URL}`
  );
  const uid = `${cap.createdAt}-capsule@weeksofmylife`;
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//WeeksOfMyLife//TimeCapsule//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${icsStampUTC(cap.createdAt)}`,
    `DTSTART;VALUE=DATE:${icsDate(cap.unlockAt)}`,
    `DTEND;VALUE=DATE:${icsDate(cap.unlockAt + 24 * 60 * 60 * 1000)}`,
    "SUMMARY:⏰ Open your Life Calendar time capsule",
    `DESCRIPTION:${desc}`,
    "BEGIN:VALARM",
    "ACTION:DISPLAY",
    "TRIGGER:PT0S",
    "DESCRIPTION:Your time capsule is ready to open",
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ];
  return lines.join("\r\n");
}

function downloadCapsuleIcs(cap) {
  const blob = new Blob([buildCapsuleIcs(cap)], {
    type: "text/calendar;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "life-time-capsule.ics";
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function openCapsule() {
  const cap = loadData("lc_capsule", null);
  const now = Date.now();

  if (cap && now < cap.unlockAt) {
    const weeksLeft = Math.ceil((cap.unlockAt - now) / WEEK_MS);
    openModal(
      "⏰ Time Capsule — Locked",
      `<div class="stat-hero">🔒 ${fmt(weeksLeft)}</div>
       <div class="stat-sub">weeks until your message unlocks (${new Date(
         cap.unlockAt
       ).toLocaleDateString()}).</div>
       <p>The note lives in this browser <strong>and</strong> in the calendar reminder you saved — so it'll find you even if you forget this page.</p>
       <div class="modal-actions">
         <button class="modal-cta" id="cap-ics">📅 Re-download reminder</button>
         <button class="modal-cta ghost" id="cap-reset">Discard</button>
       </div>`
    );
    document.getElementById("cap-ics").addEventListener("click", () => downloadCapsuleIcs(cap));
    document.getElementById("cap-reset").addEventListener("click", () => {
      if (confirm("Discard your sealed capsule?")) {
        localStorage.removeItem("lc_capsule");
        openCapsule();
      }
    });
    return;
  }

  if (cap && now >= cap.unlockAt) {
    openModal(
      "⏰ Time Capsule — Unlocked!",
      `<div class="stat-sub">Sealed ${new Date(
        cap.createdAt
      ).toLocaleDateString()} — opened today.</div>
       <div style="font-size:1.3rem;line-height:1.5;background:rgba(255,255,255,.05);border:1px solid var(--border);border-radius:12px;padding:18px;margin:10px 0">“${
         cap.msg
       }”</div>
       <div class="modal-actions">
         <button class="modal-cta" id="cap-new">Write a new one</button>
       </div>`
    );
    document.getElementById("cap-new").addEventListener("click", () => {
      localStorage.removeItem("lc_capsule");
      openCapsule();
    });
    return;
  }

  openModal(
    "⏰ Time Capsule",
    `<div class="stat-sub">Write to your future self. On seal you'll get a <strong>calendar reminder</strong> dated to the unlock day — with the message inside it — so it actually reaches you, any device.</div>
     <textarea id="cap-msg" rows="4" maxlength="500" placeholder="Dear future me..."
       style="width:100%;background:rgba(0,0,0,.3);border:1px solid var(--border);color:#fff;border-radius:10px;padding:12px;font-family:inherit;font-size:.95rem"></textarea>
     <p style="margin-top:12px">Lock for
       <input id="cap-weeks" type="number" value="52" min="1" max="5200"
        style="width:80px;background:rgba(0,0,0,.3);border:1px solid var(--border);color:#fff;border-radius:8px;padding:6px"/> weeks.</p>
     <div class="modal-actions">
       <button class="modal-cta" id="cap-seal">🔒 Seal &amp; get reminder</button>
     </div>`
  );
  document.getElementById("cap-seal").addEventListener("click", () => {
    const msg = document.getElementById("cap-msg").value.trim();
    const weeks = Math.max(1, Number(document.getElementById("cap-weeks").value) || 1);
    if (!msg) return;
    const newCap = { msg, createdAt: now, unlockAt: now + weeks * WEEK_MS };
    saveData("lc_capsule", newCap);
    downloadCapsuleIcs(newCap); // hand them the calendar delivery immediately
    openCapsule();
  });
}

// ───────── Feature 15: Leaderboard ─────────
function openLeaderboard() {
  // Track the range of ages explored on THIS device (honest, local).
  const rec = loadData("lc_records", { min: currentAge, max: currentAge, count: 0 });
  rec.min = Math.min(rec.min, currentAge);
  rec.max = Math.max(rec.max, currentAge);
  rec.count = (rec.count || 0) + 1;
  saveData("lc_records", rec);
  openModal(
    "📊 Leaderboard",
    `<div class="stat-sub">Your records on this device:</div>
     <p>👴 Oldest life mapped here: <strong>${rec.max}</strong></p>
     <p>👶 Youngest: <strong>${rec.min}</strong></p>
     <p>🔁 Calendars generated: <strong>${fmt(rec.count)}</strong></p>
     <p style="margin-top:14px;border-top:1px solid var(--border);padding-top:12px;font-size:.9rem">
       🌍 A live global leaderboard (oldest & youngest users worldwide) needs a backend — wire this to an API to make it real. Until then these are your local stats.</p>
     <div class="modal-actions">
       <button class="modal-cta tweet" id="lb-tweet">𝕏 Share</button>
     </div>`
  );
  document.getElementById("lb-tweet").addEventListener("click", () => {
    tweet(
      `Just mapped out every week of my life. ${currentAge} years in. How does yours look?`
    );
  });
}

// ───────── Wire Action Bar ─────────
document.getElementById("btn-share-card").addEventListener("click", openShareCard);
document.getElementById("btn-shocking-stat").addEventListener("click", openShockingStat);
document.getElementById("btn-milestones").addEventListener("click", openMilestones);
document.getElementById("btn-activity").addEventListener("click", openActivity);
document.getElementById("btn-relationships").addEventListener("click", openRelationships);
document.getElementById("btn-seasons").addEventListener("click", openSeasons);
document.getElementById("btn-memento").addEventListener("click", openMemento);
document.getElementById("btn-bucket").addEventListener("click", openBucket);
document.getElementById("btn-events").addEventListener("click", openEvents);
document.getElementById("btn-generations").addEventListener("click", openGenerations);
document.getElementById("btn-reflect").addEventListener("click", openReflect);
document.getElementById("btn-global").addEventListener("click", openGlobal);
document.getElementById("btn-challenge").addEventListener("click", openChallenge);
document.getElementById("btn-capsule").addEventListener("click", openCapsule);
document.getElementById("btn-leaderboard").addEventListener("click", openLeaderboard);

// ───────── Feature 16: One-Click Tweet ─────────
function openTweet() {
  const s = computeStats(currentAge);
  const text = `I've lived ${fmt(s.weeksLived)} weeks. ${fmt(
    s.weeksRemaining
  )} left. ${s.percentLived}% of the dots are filled. 🪦`;
  openModal(
    "𝕏 Tweet It",
    `<div class="stat-sub">One tap to post your stat. Hashtags are baked in.</div>
     <div style="background:rgba(0,0,0,.3);border:1px solid var(--border);border-radius:10px;padding:14px;margin-bottom:14px">
       ${text}<br/><span style="color:#1d9bf0">#WeeksOfMyLife #MementoMori</span>
     </div>
     <div class="modal-actions">
       <button class="modal-cta tweet" id="ot-tweet">𝕏 Post It</button>
       <button class="modal-cta ghost" id="ot-card">📸 Add the card first</button>
     </div>`
  );
  document.getElementById("ot-tweet").addEventListener("click", () => tweet(text));
  document.getElementById("ot-card").addEventListener("click", openShareCard);
}

// ───────── Feature 17: Thread Generator ─────────
function openThread() {
  const s = computeStats(currentAge);
  const tweets = [
    `I mapped out every week of my life as dots. Each row = 1 year, 52 dots across. Here's what ${s.age} years looks like. 🧵👇 #WeeksOfMyLife`,
    `I've already lived ${fmt(s.weeksLived)} weeks — ${s.percentLived}% of a typical 88-year life. The filled dots are gone. You don't get them back.`,
    `That leaves ${fmt(s.weeksRemaining)} weeks. About ${s.yearsRemaining} summers. ${s.yearsRemaining} more Christmases. Suddenly the number feels small.`,
    `Of those weeks, I'll spend ~${fmt(s.activity.sleep)} sleeping, ~${fmt(
      s.activity.work
    )} working, ~${fmt(s.activity.social)} on screens. The "free" time is tiny.`,
    `The point isn't to be morbid. It's the opposite: when you see the dots, you stop wasting them. Make this week one you'd mark on the grid.`,
    `Map your own life in 10 seconds → weeksofmylife.app #MementoMori`,
  ];
  const items = tweets
    .map(
      (t, i) =>
        `<div style="background:rgba(0,0,0,.3);border:1px solid var(--border);border-radius:10px;padding:12px;margin:8px 0">
           <div style="color:var(--text-secondary);font-size:.8rem;margin-bottom:6px">${
             i + 1
           }/${tweets.length}</div>
           <div>${t}</div>
           <button class="modal-cta ghost" data-copy="${i}" style="margin-top:8px;padding:6px 12px;font-size:.85rem">Copy</button>
         </div>`
    )
    .join("");
  openModal(
    "🧵 Thread Generator",
    `<div class="stat-sub">A ready-to-post ${tweets.length}-tweet thread built from your numbers.</div>
     ${items}
     <div class="modal-actions">
       <button class="modal-cta tweet" id="th-start">𝕏 Post Tweet 1</button>
       <button class="modal-cta ghost" id="th-all">📋 Copy Whole Thread</button>
     </div>`
  );
  modalBodyEl.querySelectorAll("[data-copy]").forEach((btn) =>
    btn.addEventListener("click", () => {
      navigator.clipboard?.writeText(tweets[Number(btn.dataset.copy)]);
      btn.textContent = "Copied ✓";
      setTimeout(() => (btn.textContent = "Copy"), 1200);
    })
  );
  document.getElementById("th-start").addEventListener("click", () => tweet(tweets[0], ["WeeksOfMyLife"]));
  document.getElementById("th-all").addEventListener("click", () => {
    navigator.clipboard?.writeText(tweets.map((t, i) => `${i + 1}/ ${t}`).join("\n\n"));
    const b = document.getElementById("th-all");
    b.textContent = "Copied ✓";
    setTimeout(() => (b.textContent = "📋 Copy Whole Thread"), 1400);
  });
}

document.getElementById("btn-tweet").addEventListener("click", openTweet);
document.getElementById("btn-thread").addEventListener("click", openThread);

// ───────── Feature: Mood Heatmap ─────────
const MOOD_COLORS = ["#ef476f", "#f78c6b", "#ffd166", "#83d483", "#06d6a0"];
const MOOD_WORDS = ["Rough", "Low", "Okay", "Good", "Great"];
function openMood() {
  const mood = loadData("lc_mood", {});
  const currentWeek = Math.floor(currentAge * WEEKS_PER_YEAR);
  const current = mood[currentWeek];
  const rated = Object.keys(mood).length;
  const avg = rated
    ? (
        Object.values(mood).reduce((a, b) => a + Number(b), 0) / rated
      ).toFixed(1)
    : "—";
  const swatches = MOOD_COLORS.map(
    (c, i) =>
      `<span class="mood-swatch ${
        current === i + 1 ? "sel" : ""
      }" data-mood="${i + 1}" title="${MOOD_WORDS[i]}" style="background:${c}"></span>`
  ).join("");
  openModal(
    "🟩 Mood Heatmap",
    `<div class="stat-sub">Rate this week. Your whole grid colors in like a GitHub contribution graph — a year of you, at a glance.</div>
     <p>Week <strong>${fmt(currentWeek)}</strong> — tap a color:</p>
     <div class="mood-legend">${swatches}
       <span style="margin-left:8px">← rough · great →</span></div>
     <p style="margin-top:10px">📊 Weeks rated: <strong>${fmt(
       rated
     )}</strong> · Avg mood: <strong>${avg}</strong> / 5</p>
     <div class="modal-actions">
       <button class="modal-cta ghost" id="mood-clear">Clear this week</button>
       <button class="modal-cta tweet" id="mood-tweet">𝕏 Share</button>
     </div>`
  );
  modalBodyEl.querySelectorAll(".mood-swatch").forEach((sw) =>
    sw.addEventListener("click", () => {
      mood[currentWeek] = Number(sw.dataset.mood);
      saveData("lc_mood", mood);
      renderGridMarkers();
      openMood();
    })
  );
  document.getElementById("mood-clear").addEventListener("click", () => {
    delete mood[currentWeek];
    saveData("lc_mood", mood);
    renderGridMarkers();
    openMood();
  });
  document.getElementById("mood-tweet").addEventListener("click", () => {
    tweet(
      `My life, one week at a time — color-coded by how each one felt. Avg mood ${avg}/5 across ${fmt(
        rated
      )} weeks. 🟩`,
      ["WeeksOfMyLife", "MoodHeatmap"]
    );
  });
}
document.getElementById("btn-mood").addEventListener("click", openMood);

// ───────── Feature: Shareable URL State (no backend) ─────────
function b64urlEncode(str) {
  return btoa(unescape(encodeURIComponent(str)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}
function b64urlDecode(str) {
  str = str.replace(/-/g, "+").replace(/_/g, "/");
  while (str.length % 4) str += "=";
  return decodeURIComponent(escape(atob(str)));
}

function buildShareUrl() {
  // Short keys keep the link compact. Only include non-empty data.
  const payload = { a: currentAge };
  const events = loadData("lc_events", []);
  const bucket = loadData("lc_bucket", []);
  const journal = loadData("lc_journal", {});
  const mood = loadData("lc_mood", {});
  if (events.length) payload.e = events;
  if (bucket.length) payload.b = bucket;
  if (Object.keys(journal).length) payload.j = journal;
  if (Object.keys(mood).length) payload.m = mood;
  const code = b64urlEncode(JSON.stringify(payload));
  return `${location.origin}${location.pathname}?c=${code}`;
}

function decodeShareCode(code) {
  try {
    const p = JSON.parse(b64urlDecode(code));
    return {
      age: Number(p.a) || 25,
      events: p.e || [],
      bucket: p.b || [],
      journal: p.j || {},
      mood: p.m || {},
    };
  } catch {
    return null;
  }
}

function openShareLink() {
  const url = buildShareUrl();
  openModal(
    "🔗 Share Your Calendar",
    `<div class="stat-sub">This link opens <strong>your</strong> calendar — age, events, moods and all — on any device. No account, no server. Just paste it.</div>
     <input id="sl-url" readonly value="${url}"
       style="width:100%;background:rgba(0,0,0,.3);border:1px solid var(--border);color:#fff;border-radius:8px;padding:10px;font-size:.85rem"/>
     <div class="modal-actions">
       <button class="modal-cta" id="sl-copy">📋 Copy Link</button>
       <button class="modal-cta tweet" id="sl-tweet">𝕏 Tweet My Calendar</button>
     </div>
     <p style="margin-top:14px;font-size:.85rem">Note: this encodes your data into the URL itself. The longer your history, the longer the link.</p>`
  );
  const copy = () => {
    const el = document.getElementById("sl-url");
    el.select();
    navigator.clipboard?.writeText(url);
    const b = document.getElementById("sl-copy");
    b.textContent = "Copied ✓";
    setTimeout(() => (b.textContent = "📋 Copy Link"), 1400);
  };
  document.getElementById("sl-copy").addEventListener("click", copy);
  document.getElementById("sl-tweet").addEventListener("click", () => {
    const s = computeStats(currentAge);
    tweet(
      `Here's every week of my life, mapped. ${fmt(
        s.weeksLived
      )} lived, ${fmt(s.weeksRemaining)} to go. Open mine 👇 then make your own:`
    );
  });
}
document.getElementById("btn-sharelink").addEventListener("click", openShareLink);

function showSharedBanner() {
  if (document.getElementById("shared-banner")) return;
  const bar = document.createElement("div");
  bar.id = "shared-banner";
  bar.innerHTML = `👀 You're viewing a <strong>shared calendar</strong>.
    <button id="make-own" type="button">Make your own →</button>`;
  document.body.prepend(bar);
  document.getElementById("make-own").addEventListener("click", () => {
    location.href = location.pathname; // strip ?c → fresh start
  });
}

// On load: if a shared code is present, render it read-only.
(function initSharedView() {
  const params = new URLSearchParams(location.search);
  const code = params.get("c");
  if (!code) return;
  const data = decodeShareCode(code);
  if (!data) return;
  sharedState = data;
  currentAge = Math.max(MIN_AGE, Math.min(MAX_AGE, data.age));
  updateKnobPosition(currentAge);
  showSharedBanner();
  if (streakShell) streakShell.hidden = true;
  if (streakShowBtn) streakShowBtn.hidden = true;
  showCalendar(); // jump straight to the grid
})();
