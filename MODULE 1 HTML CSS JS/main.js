// =============================================================
//  CityPulse – Community Event Portal
//  main.js  |  Vanilla JavaScript (ES6+)
// =============================================================

// -------------------------------------------------------
// 1. PAGE LOAD
// -------------------------------------------------------
window.addEventListener('load', () => {
  console.log('Welcome to the Community Portal');
  loadStoredPreference();
  renderEvents(eventsData);
});

// -------------------------------------------------------
// 2. DATA – Event objects (simulates a fetched API)
// -------------------------------------------------------
const eventsData = [
  {
    id: 1,
    title: 'Jazz Night at City Park',
    category: 'music',
    date: '2025-07-12',
    location: 'City Park Amphitheatre',
    seats: 45,
    description: 'An evening of soulful jazz under the stars. Featuring local legends and a surprise guest.',
    fee: 150
  },
  {
    id: 2,
    title: 'Pottery Workshop',
    category: 'workshop',
    date: '2025-07-18',
    location: 'Community Art Centre',
    seats: 12,
    description: 'Learn to throw and glaze your own pots with master ceramicist Priya Nair.',
    fee: 300
  },
  {
    id: 3,
    title: 'Annual 5K Fun Run',
    category: 'sports',
    date: '2025-07-20',
    location: 'Marina Beach',
    seats: 200,
    description: 'A morning run for all fitness levels. Medals and refreshments for all finishers!',
    fee: 50
  },
  {
    id: 4,
    title: 'Street Food Festival',
    category: 'food',
    date: '2025-08-03',
    location: 'Gandhi Square',
    seats: 0,
    description: 'Explore cuisines from across Tamil Nadu. 40+ stalls, cooking contests, and live demos.',
    fee: 0
  },
  {
    id: 5,
    title: 'Indie Bands Showcase',
    category: 'music',
    date: '2025-08-10',
    location: 'The Loft, T.Nagar',
    seats: 80,
    description: 'Six indie acts in one night. Discover Chennai\'s next big music stars.',
    fee: 200
  },
  {
    id: 6,
    title: 'Web Dev Bootcamp',
    category: 'workshop',
    date: '2025-08-15',
    location: 'Innovation Hub, OMR',
    seats: 30,
    description: 'A full-day intensive on HTML, CSS & JavaScript. Bring your laptop and curiosity.',
    fee: 499
  }
];

// Fee map used in form dropdown feedback
const categoryFees = {
  music:    '₹150 – ₹200',
  workshop: '₹300 – ₹499',
  sports:   '₹50',
  food:     'Free'
};

// -------------------------------------------------------
// 3. RENDER EVENTS (DOM Manipulation + Arrays)
// -------------------------------------------------------
function renderEvents(events) {
  const grid = document.getElementById('eventsGrid');
  grid.innerHTML = '';

  // Filter out fully booked or past events
  const today = new Date().toISOString().split('T')[0];
  const valid = events.filter(e => e.date >= today);

  if (valid.length === 0) {
    grid.innerHTML = '<p style="text-align:center;grid-column:1/-1;color:#888">No events found.</p>';
    return;
  }

  valid.forEach((event, i) => {
    const card = createEventCard(event, i);
    grid.appendChild(card);
  });
}

function createEventCard(event, index) {
  const card = document.createElement('div');
  card.className = 'event-card';
  card.style.animationDelay = `${index * 0.07}s`;
  card.dataset.category = event.category;

  const seatsLabel = event.seats === 0
    ? '<span class="event-seats low">Fully Booked</span>'
    : event.seats <= 15
    ? `<span class="event-seats low">⚠ Only ${event.seats} seats</span>`
    : `<span class="event-seats">${event.seats} seats</span>`;

  const feeLabel = event.fee === 0 ? 'Free' : `₹${event.fee}`;
  const isFull   = event.seats === 0;

  card.innerHTML = `
    <div class="event-card-body">
      <span class="event-card-badge badge-${event.category}">${event.category}</span>
      <h3>${event.title}</h3>
      <p class="event-meta">📅 ${formatDate(event.date)} &nbsp;|&nbsp; 📍 ${event.location}</p>
      <p>${event.description}</p>
    </div>
    <div class="event-card-footer">
      ${seatsLabel}
      <button
        class="btn btn-primary btn-sm"
        onclick="handleRegisterClick('${event.title}', ${isFull})"
        ${isFull ? 'disabled style="opacity:.45;cursor:not-allowed"' : ''}
      >
        ${isFull ? 'Full' : `Register · ${feeLabel}`}
      </button>
    </div>
  `;

  return card;
}

function formatDate(dateStr) {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
}

// -------------------------------------------------------
// 4. FILTER by category
// -------------------------------------------------------
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const cat = btn.dataset.category;
    const filtered = cat === 'all'
      ? eventsData
      : eventsData.filter(e => e.category === cat);

    renderEvents(filtered);
  });
});

// -------------------------------------------------------
// 5. SEARCH (keydown event)
// -------------------------------------------------------
document.getElementById('searchInput').addEventListener('keyup', function () {
  const query = this.value.toLowerCase();
  const results = eventsData.filter(e => e.title.toLowerCase().includes(query));
  renderEvents(results);
});

// -------------------------------------------------------
// 6. REGISTER CLICK (onclick)
// -------------------------------------------------------
function handleRegisterClick(title, isFull) {
  if (isFull) return;
  const section = document.getElementById('register');
  section.scrollIntoView({ behavior: 'smooth' });
  document.getElementById('fullName').focus();
  console.log(`User clicked Register for: ${title}`);
}

// -------------------------------------------------------
// 7. NAVBAR scroll shadow + hamburger
// -------------------------------------------------------
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  nav.classList.toggle('scrolled', window.scrollY > 20);
});

document.getElementById('hamburger').addEventListener('click', () => {
  document.querySelector('.nav-links').classList.toggle('open');
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    document.querySelector('.nav-links').classList.remove('open');
  });
});

// -------------------------------------------------------
// 8. FORM – Validation, events, output
// -------------------------------------------------------
const form        = document.getElementById('registrationForm');
const nameInput   = document.getElementById('fullName');
const emailInput  = document.getElementById('email');
const phoneInput  = document.getElementById('phone');
const eventSelect = document.getElementById('eventType');
const msgArea     = document.getElementById('message');
const charCount   = document.getElementById('charCount');
const feeDisplay  = document.getElementById('feeDisplay');
const formOutput  = document.getElementById('formOutput');

// onblur – phone validation
phoneInput.addEventListener('blur', function () {
  const err = document.getElementById('phoneError');
  const val = this.value.trim();
  if (val && !/^\d{10}$/.test(val)) {
    err.textContent = 'Please enter a valid 10-digit phone number.';
  } else {
    err.textContent = '';
  }
});

// onchange – show event fee
eventSelect.addEventListener('change', function () {
  const cat = this.value;
  feeDisplay.textContent = cat ? `Typical fee: ${categoryFees[cat]}` : '';

  // Save preference in localStorage
  if (cat) localStorage.setItem('preferredEventType', cat);
});

// Keyboard event – char counter in textarea
msgArea.addEventListener('keyup', function () {
  const len = this.value.length;
  charCount.textContent = `${len} / 300 characters`;
  if (len > 300) {
    charCount.style.color = '#c0392b';
    this.value = this.value.substring(0, 300);
  } else {
    charCount.style.color = '';
  }
});

// Form submit (onclick via submit event, prevents default)
form.addEventListener('submit', function (e) {
  e.preventDefault();
  formOutput.className = 'form-output';
  formOutput.textContent = '';

  let valid = true;

  // Name
  const nameErr = document.getElementById('nameError');
  if (nameInput.value.trim().length < 2) {
    nameErr.textContent = 'Name must be at least 2 characters.';
    valid = false;
  } else { nameErr.textContent = ''; }

  // Email
  const emailErr = document.getElementById('emailError');
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(emailInput.value.trim())) {
    emailErr.textContent = 'Please enter a valid email address.';
    valid = false;
  } else { emailErr.textContent = ''; }

  if (!valid) {
    formOutput.textContent = '⚠ Please fix the errors above.';
    formOutput.classList.add('error');
    return;
  }

  // Simulate async submission
  const submitBtn = document.getElementById('submitBtn');
  submitBtn.textContent = 'Submitting…';
  submitBtn.disabled = true;

  setTimeout(() => {
    submitBtn.textContent = 'Register Now';
    submitBtn.disabled = false;
    formOutput.textContent = `✅ Thank you, ${nameInput.value.trim()}! Your registration is confirmed.`;
    formOutput.classList.add('success');
    form.reset();
    charCount.textContent = '0 / 300 characters';
    feeDisplay.textContent = '';
    console.log('Form submitted successfully');
  }, 1500);
});

// -------------------------------------------------------
// 9. Gallery – double-click to enlarge image
// -------------------------------------------------------
document.querySelectorAll('.gallery-img').forEach(img => {
  img.addEventListener('dblclick', function () {
    this.classList.toggle('enlarged');
  });
});

// -------------------------------------------------------
// 10. Video events
// -------------------------------------------------------
function onVideoReady() {
  document.getElementById('videoStatus').textContent = '▶ Video ready to play!';
}

// Warn before leaving page if form has unsaved data
window.addEventListener('beforeunload', function (e) {
  const hasData = nameInput.value || emailInput.value || msgArea.value;
  if (hasData) {
    e.preventDefault();
    e.returnValue = '';  // Required for Chrome
  }
});

// -------------------------------------------------------
// 11. GEOLOCATION
// -------------------------------------------------------
document.getElementById('geoBtn').addEventListener('click', () => {
  const result = document.getElementById('geoResult');
  result.textContent = '🔍 Locating you…';

  if (!navigator.geolocation) {
    result.textContent = '❌ Geolocation is not supported by your browser.';
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const { latitude, longitude, accuracy } = pos.coords;
      result.textContent =
        `📍 You are at ${latitude.toFixed(4)}°N, ${longitude.toFixed(4)}°E (±${Math.round(accuracy)}m). Searching nearby events…`;
      console.log('Geolocation success:', pos.coords);
    },
    (err) => {
      switch (err.code) {
        case err.PERMISSION_DENIED:
          result.textContent = '🚫 Location access denied. Please allow it in your browser settings.';
          break;
        case err.POSITION_UNAVAILABLE:
          result.textContent = '⚠ Location unavailable. Try again later.';
          break;
        case err.TIMEOUT:
          result.textContent = '⏱ Request timed out. Please try again.';
          break;
        default:
          result.textContent = '❌ An unknown error occurred.';
      }
    },
    {
      enableHighAccuracy: true,
      timeout: 8000,
      maximumAge: 0
    }
  );
});

// -------------------------------------------------------
// 12. localStorage – Save & Restore Preference
// -------------------------------------------------------
function loadStoredPreference() {
  const saved = localStorage.getItem('preferredEventType');
  if (saved && eventSelect) {
    eventSelect.value = saved;
    feeDisplay.textContent = `Typical fee: ${categoryFees[saved] || ''}`;
    console.log(`Restored preference: ${saved}`);
  }
}

document.getElementById('clearPrefsBtn').addEventListener('click', () => {
  localStorage.clear();
  sessionStorage.clear();
  if (eventSelect) {
    eventSelect.value = '';
    feeDisplay.textContent = '';
  }
  alert('Preferences cleared!');
  console.log('localStorage and sessionStorage cleared');
});
