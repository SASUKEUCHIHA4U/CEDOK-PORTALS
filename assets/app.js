/**
 * CEDOK Portal — Interactive Engine & Client Logic
 * Center for Entrepreneurship Development of Karnataka
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initDistrictsEngine();
  initGlobalSearch();
  initProgrammeQuiz();
  initResourcePreview();
  initLanguageToggle();
  initAccessibilityControls();
  initLoginHandler();
  initStatsCounter();
  updateCopyrightYear();
});

/* ==========================================================================
   1. Data Repositories
   ========================================================================== */

const DISTRICTS_DATA = [
  // Kittur Karnataka
  { name: "Dharwad", region: "Kittur Karnataka", hq: "Dharwad / Hubballi", address: "CEDOK Building, Belur Industrial Area, Dharwad - 580011", phone: "0836-2486450 / 2486440", email: "cedokdwd@karnataka.gov.in", focus: "Headquarters, EDP Training, Industrial Units" },
  { name: "Belagavi", region: "Kittur Karnataka", hq: "Belagavi", address: "District Industries Centre (DIC), Udyambag, Belagavi", phone: "0831-2440120", email: "dic.belagavi@karnataka.gov.in", focus: "Foundry, Auto Components, Textiles" },
  { name: "Bagalkot", region: "Kittur Karnataka", hq: "Bagalkot", address: "DIC Office, Sector 23, Navanagar, Bagalkot", phone: "08354-235120", email: "dic.bagalkot@karnataka.gov.in", focus: "Weaving, Horticulture, Sugar Mills" },
  { name: "Gadag", region: "Kittur Karnataka", hq: "Gadag", address: "Industrial Estate, Narasapur, Gadag", phone: "08372-238450", email: "dic.gadag@karnataka.gov.in", focus: "Textile Parks, Renewable Energy, Agriculture" },
  { name: "Haveri", region: "Kittur Karnataka", hq: "Haveri", address: "DIC Office, Devagiri Industrial Area, Haveri", phone: "08375-232140", email: "dic.haveri@karnataka.gov.in", focus: "Agri-Processing, Byadgi Chilli Value Addition" },
  { name: "Uttara Kannada", region: "Kittur Karnataka", hq: "Karwar", address: "DIC Office, Habbuwada, Karwar", phone: "08382-226340", email: "dic.karwar@karnataka.gov.in", focus: "Ecotourism, Fisheries, Spices & Food" },
  { name: "Vijayapura", region: "Kittur Karnataka", hq: "Vijayapura", address: "DIC Office, Mahalbagayat, Vijayapura", phone: "08352-250830", email: "dic.vijayapura@karnataka.gov.in", focus: "Horticulture, Grape Processing, Cold Chain" },

  // Kalyana Karnataka
  { name: "Kalaburagi", region: "Kalyana Karnataka", hq: "Kalaburagi", address: "DIC Office, MSK Mill Road, Kalaburagi", phone: "08472-220450", email: "dic.kalaburagi@karnataka.gov.in", focus: "Pulses Processing (Dal Mills), Cement Industry" },
  { name: "Ballari", region: "Kalyana Karnataka", hq: "Ballari", address: "DIC Office, Cantonment, Ballari", phone: "08392-272310", email: "dic.ballari@karnataka.gov.in", focus: "Jeans Manufacturing, Steel Auxiliaries" },
  { name: "Bidar", region: "Kalyana Karnataka", hq: "Bidar", address: "DIC Office, Kolhar Industrial Area, Bidar", phone: "08482-226120", email: "dic.bidar@karnataka.gov.in", focus: "Pharma, Auto Ancillary, Handloom" },
  { name: "Koppal", region: "Kalyana Karnataka", hq: "Koppal", address: "DIC Office, Hospet Road, Koppal", phone: "08539-220340", email: "dic.koppal@karnataka.gov.in", focus: "Toy Manufacturing, Paddy Processing, Rice Mills" },
  { name: "Raichur", region: "Kalyana Karnataka", hq: "Raichur", address: "DIC Office, Hyderabad Road, Raichur", phone: "08532-235890", email: "dic.raichur@karnataka.gov.in", focus: "Cotton Ginning, Thermal Power Services, Agro" },
  { name: "Vijayanagara", region: "Kalyana Karnataka", hq: "Hosapete", address: "DIC Office, College Road, Hosapete", phone: "08394-224150", email: "dic.vijayanagara@karnataka.gov.in", focus: "Tourism Services, Handicrafts, Mining Services" },
  { name: "Yadgir", region: "Kalyana Karnataka", hq: "Yadgir", address: "DIC Office, KADECO Industrial Area, Yadgir", phone: "08473-250110", email: "dic.yadgir@karnataka.gov.in", focus: "Pharmaceutical Hub, Food Parks" },

  // Karavali / Coastal
  { name: "Dakshina Kannada", region: "Karavali", hq: "Mangaluru", address: "DIC Office, Yeyyadi, Mangaluru", phone: "0824-2211040", email: "dic.mangalore@karnataka.gov.in", focus: "Marine Export, Cashew Processing, IT & Port" },
  { name: "Udupi", region: "Karavali", hq: "Udupi", address: "DIC Office, Shivally Industrial Area, Manipal, Udupi", phone: "0820-2570850", email: "dic.udupi@karnataka.gov.in", focus: "Food Processing, Hospitality, General Engineering" },

  // Malenadu
  { name: "Shivamogga", region: "Malenadu", hq: "Shivamogga", address: "DIC Office, Nidige Industrial Estate, Shivamogga", phone: "08182-222450", email: "dic.shivamogga@karnataka.gov.in", focus: "Arecanut Processing, Foundries, Auto Parts" },
  { name: "Chikkamagaluru", region: "Malenadu", hq: "Chikkamagaluru", address: "DIC Office, Jyothinagar, Chikkamagaluru", phone: "08262-220640", email: "dic.ckm@karnataka.gov.in", focus: "Coffee Processing, Homestays, Spices" },
  { name: "Kodagu", region: "Malenadu", hq: "Madikeri", address: "DIC Office, Industrial Estate, Madikeri", phone: "08272-228410", email: "dic.kodagu@karnataka.gov.in", focus: "Honey & Spices, Agro-Tourism, Plantation" },

  // Old Mysuru / South Karnataka
  { name: "Bengaluru Urban", region: "South Karnataka", hq: "Bengaluru", address: "DIC Office, Rajajinagar Industrial Estate, Bengaluru", phone: "080-23300450", email: "dic.blrurban@karnataka.gov.in", focus: "Tech Startups, Electronics, Garments, Biotech" },
  { name: "Bengaluru Rural", region: "South Karnataka", hq: "Bengaluru Rural", address: "DIC Office, KIADB Complex, Devanahalli", phone: "080-28392120", email: "dic.blrrural@karnataka.gov.in", focus: "Logistics Parks, Aerospace Ancillary, Hardware" },
  { name: "Chamarajanagar", region: "South Karnataka", hq: "Chamarajanagar", address: "DIC Office, Badanaguppe Industrial Area, Chamarajanagar", phone: "08226-222150", email: "dic.chnagar@karnataka.gov.in", focus: "Granite & Marble, Silk Weaving, Turmeric" },
  { name: "Chikkaballapur", region: "South Karnataka", hq: "Chikkaballapur", address: "DIC Office, BB Road, Chikkaballapur", phone: "08156-273180", email: "dic.cbpur@karnataka.gov.in", focus: "Sericulture, Grape & Fruit Processing" },
  { name: "Chitradurga", region: "South Karnataka", hq: "Chitradurga", address: "DIC Office, Kelagote, Chitradurga", phone: "08194-222340", email: "dic.chitradurga@karnataka.gov.in", focus: "Garments, Wind Energy Ancillaries, Groundnut" },
  { name: "Davanagere", region: "South Karnataka", hq: "Davanagere", address: "DIC Office, Lokikere Road, Davanagere", phone: "08192-251290", email: "dic.davanagere@karnataka.gov.in", focus: "Textile Mills, Puffed Rice Units, Food Industry" },
  { name: "Hassan", region: "South Karnataka", hq: "Hassan", address: "DIC Office, BM Road, Hassan", phone: "08172-268340", email: "dic.hassan@karnataka.gov.in", focus: "SEZ Textile Park, Potato Processing, Coffee" },
  { name: "Kolar", region: "South Karnataka", hq: "Kolar", address: "DIC Office, Tamaka Industrial Area, Kolar", phone: "08152-222560", email: "dic.kolar@karnataka.gov.in", focus: "Automobile Manufacturing Hub, Mango Processing" },
  { name: "Mandya", region: "South Karnataka", hq: "Mandya", address: "DIC Office, Mysuru-Bengaluru Road, Mandya", phone: "08232-220450", email: "dic.mandya@karnataka.gov.in", focus: "Sugar Mills, Jaggery Units, Paddy Milling" },
  { name: "Mysuru", region: "South Karnataka", hq: "Mysuru", address: "DIC Office, Hebbal Industrial Area, Mysuru", phone: "0821-2402120", email: "dic.mysore@karnataka.gov.in", focus: "IT & Electronics, Handicrafts, Silk & Food" },
  { name: "Ramanagara", region: "South Karnataka", hq: "Ramanagara", address: "DIC Office, Bidadi Industrial Area, Ramanagara", phone: "080-27271450", email: "dic.ramanagara@karnataka.gov.in", focus: "Automobile Hub, Silk Cocoon Market, Toys" },
  { name: "Tumakuru", region: "South Karnataka", hq: "Tumakuru", address: "DIC Office, Antarasanahalli Industrial Area, Tumakuru", phone: "0816-2211240", email: "dic.tumakuru@karnataka.gov.in", focus: "Industrial Smart City, Coconut Processing, Food Park" }
];

const SEARCH_INDEX = [
  { title: "Entrepreneurship Development Programme (EDP)", type: "Programme", link: "programmes.html#edp", desc: "Structured 2 to 6-week training for aspiring entrepreneurs." },
  { title: "Entrepreneurship Awareness Programme (EAP)", type: "Programme", link: "programmes.html#eap", desc: "1 to 3-day orientation into business opportunities." },
  { title: "Skill & Business Inputs Training", type: "Programme", link: "programmes.html#training", desc: "Technical & domain-specific business input sessions." },
  { title: "Food & Value-Added Processing", type: "Opportunity", link: "opportunities.html", desc: "Food demand, processing, packaging, and raw material conversion." },
  { title: "Agri & Rural Enterprise", type: "Opportunity", link: "opportunities.html", desc: "Value addition around agricultural produce and rural resources." },
  { title: "Digital & Local Service Business", type: "Opportunity", link: "opportunities.html", desc: "Digital marketing, repair, bookkeeping, and consumer services." },
  { title: "Business Idea Checklist (PDF)", type: "Resource", link: "resources.html", desc: "Comprehensive checklist covering customer, demand, and validation." },
  { title: "Project Planning Worksheet (PDF)", type: "Resource", link: "resources.html", desc: "Plan machinery, raw materials, personnel, and costs." },
  { title: "Market Research Starter Guide (PDF)", type: "Resource", link: "resources.html", desc: "Identify customers, pricing strategy, and competitor analysis." },
  { title: "Business Plan Outline (PDF)", type: "Resource", link: "resources.html", desc: "Structure your formal business report for banks & schemes." }
];

/* ==========================================================================
   2. Core Navigation & UI Setup
   ========================================================================== */

function initNavigation() {
  const hamb = document.querySelector(".hamb");
  const menu = document.querySelector(".gov-nav-bar .menu, .menu");

  if (hamb && menu) {
    hamb.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = menu.classList.toggle("open");
      hamb.setAttribute("aria-expanded", isOpen);
    });

    document.querySelectorAll(".dropdown-menu a").forEach(link => {
      link.addEventListener("click", () => {
        menu.classList.remove("open");
      });
    });
  }

  // Mobile dropdown toggling on click
  document.querySelectorAll(".has-dropdown > a").forEach(parentLink => {
    parentLink.addEventListener("click", (e) => {
      if (window.innerWidth <= 992) {
        e.preventDefault();
        const parentLi = parentLink.parentElement;
        parentLi.classList.toggle("open");
      }
    });
  });
}

function initAccessibilityControls() {
  const fontDec = document.getElementById("fontDecrease");
  const fontReset = document.getElementById("fontReset");
  const fontInc = document.getElementById("fontIncrease");

  if (fontDec && fontReset && fontInc) {
    const buttons = [fontDec, fontReset, fontInc];
    
    fontDec.addEventListener("click", () => {
      document.documentElement.style.fontSize = "14.5px";
      setActiveFontBtn(fontDec, buttons);
      showToast("Font size: Small (A-)");
    });

    fontReset.addEventListener("click", () => {
      document.documentElement.style.fontSize = "16px";
      setActiveFontBtn(fontReset, buttons);
      showToast("Font size: Default (A)");
    });

    fontInc.addEventListener("click", () => {
      document.documentElement.style.fontSize = "17.5px";
      setActiveFontBtn(fontInc, buttons);
      showToast("Font size: Large (A+)");
    });
  }
}

function setActiveFontBtn(activeBtn, allButtons) {
  allButtons.forEach(b => b.classList.remove("active"));
  activeBtn.classList.add("active");
}

function initLoginHandler() {
  const loginBtn = document.getElementById("loginBtn");
  if (loginBtn) {
    loginBtn.addEventListener("click", () => {
      const loginHtml = `
        <div style="text-align: center; padding: 10px 0;">
          <div style="width: 56px; height: 56px; background: #eff6ff; border-radius: 50%; display: grid; place-items: center; margin: 0 auto 16px;">
            <svg width="28" height="28" fill="none" stroke="#1d4ed8" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
          </div>
          <h3 style="font-size: 1.25rem; font-weight: 800; color: var(--navy-deep); margin-bottom: 8px;">CEDOK Officer Sign In</h3>
          <p style="font-size: 0.875rem; color: var(--slate-600); margin-bottom: 24px;">Official portal access for CEDOK administrators, district industrial officers, and trainers.</p>
          <form onsubmit="event.preventDefault(); showToast('Redirecting to Karnataka SSO Service...'); closeModal();">
            <div style="margin-bottom: 16px; text-align: left;">
              <label style="font-size: 0.8125rem; font-weight: 700; color: var(--slate-700); display: block; margin-bottom: 6px;">KGID / Government Email</label>
              <input type="text" class="search-box-input" style="padding-left: 14px;" placeholder="officer@karnataka.gov.in" required>
            </div>
            <div style="margin-bottom: 24px; text-align: left;">
              <label style="font-size: 0.8125rem; font-weight: 700; color: var(--slate-700); display: block; margin-bottom: 6px;">Password</label>
              <input type="password" class="search-box-input" style="padding-left: 14px;" placeholder="••••••••" required>
            </div>
            <button type="submit" class="btn primary full">Login to Officer Dashboard →</button>
          </form>
        </div>
      `;
      showModal("CEDOK Department Login", loginHtml);
    });
  }
}

function updateCopyrightYear() {
  const yearElements = document.querySelectorAll(".year");
  const currentYear = new Date().getFullYear();
  yearElements.forEach(el => el.textContent = currentYear);
}

/* ==========================================================================
   3. District Network Engine
   ========================================================================== */

function initDistrictsEngine() {
  const gridContainer = document.getElementById("districtGrid");
  const searchInput = document.getElementById("districtSearch");
  const emptyState = document.getElementById("emptyDistrict");
  const filterPills = document.querySelectorAll(".district-filter");

  if (!gridContainer) return;

  let activeRegion = "all";
  let searchQuery = "";

  function render() {
    const filtered = DISTRICTS_DATA.filter(item => {
      const matchesRegion = activeRegion === "all" || item.region.toLowerCase().includes(activeRegion.toLowerCase());
      const matchesQuery = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           item.hq.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           item.focus.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesRegion && matchesQuery;
    });

    if (filtered.length === 0) {
      gridContainer.style.display = "none";
      if (emptyState) emptyState.style.display = "block";
    } else {
      gridContainer.style.display = "grid";
      if (emptyState) emptyState.style.display = "none";

      gridContainer.innerHTML = filtered.map(d => `
        <div class="district-card" onclick="openDistrictModal('${d.name}')">
          <div>
            <div class="district-card-head">
              <span class="district-title">${d.name}</span>
              <span class="region-tag">${d.region}</span>
            </div>
            <p style="font-size: 0.8125rem; color: var(--slate-600); margin-top: 6px;">
              <strong>Focus:</strong> ${d.focus}
            </p>
          </div>
          <div class="district-meta">
            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
            <span>HQ: ${d.hq} • Click for details</span>
          </div>
        </div>
      `).join("");
    }
  }

  render();

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchQuery = e.target.value;
      render();
    });
  }

  filterPills.forEach(pill => {
    pill.addEventListener("click", () => {
      filterPills.forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
      activeRegion = pill.dataset.region || "all";
      render();
    });
  });
}

window.openDistrictModal = function(districtName) {
  const district = DISTRICTS_DATA.find(d => d.name === districtName);
  if (!district) return;

  const content = `
    <div style="margin-bottom: 20px;">
      <span class="region-tag" style="margin-bottom: 10px; display: inline-block;">${district.region}</span>
      <h3 style="font-size: 1.5rem; color: var(--navy-deep); margin-bottom: 8px;">${district.name} District Office</h3>
      <p style="color: var(--slate-600); font-size: 0.9375rem;"><strong>District HQ:</strong> ${district.hq}</p>
    </div>
    <div style="background: var(--slate-50); padding: 18px; border-radius: var(--radius-md); border: 1px solid var(--slate-200); margin-bottom: 20px;">
      <h4 style="font-size: 0.875rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--slate-500); margin-bottom: 8px;">Official Address</h4>
      <p style="font-weight: 600; color: var(--slate-800); font-size: 0.9375rem;">${district.address}</p>
    </div>
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 20px;">
      <div style="background: var(--primary-light); padding: 14px; border-radius: var(--radius-md);">
        <small style="color: var(--primary); font-weight: 700; display: block;">HELPLINE / PHONE</small>
        <strong style="color: var(--navy-deep); font-size: 0.9375rem;">${district.phone}</strong>
      </div>
      <div style="background: var(--primary-light); padding: 14px; border-radius: var(--radius-md);">
        <small style="color: var(--primary); font-weight: 700; display: block;">OFFICIAL EMAIL</small>
        <strong style="color: var(--navy-deep); font-size: 0.84375rem;">${district.email}</strong>
      </div>
    </div>
    <div style="margin-bottom: 24px;">
      <h4 style="font-size: 0.9375rem; color: var(--navy-deep); font-weight: 700; margin-bottom: 6px;">Key District Industrial Focus</h4>
      <p style="color: var(--slate-600); font-size: 0.875rem;">${district.focus}</p>
    </div>
    <div style="display: flex; gap: 12px; justify-content: flex-end;">
      <button class="btn secondary" onclick="closeModal()">Close</button>
      <a href="registration.html" class="btn primary">Register for ${district.name} Programme →</a>
    </div>
  `;

  showModal(`CEDOK ${district.name} Contact`, content);
};

/* ==========================================================================
   4. Global Search Modal (Cmd + K)
   ========================================================================== */

function initGlobalSearch() {
  const triggers = document.querySelectorAll(".search-trigger-btn");

  triggers.forEach(btn => {
    btn.addEventListener("click", openSearchModal);
  });

  document.addEventListener("keydown", (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      openSearchModal();
    }
  });
}

function openSearchModal() {
  const content = `
    <div style="margin-bottom: 20px;">
      <div class="search-box-wrap" style="margin-bottom: 12px;">
        <svg class="search-box-icon" width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
        <input type="search" id="globalSearchInput" class="search-box-input" placeholder="Search programmes, districts, resources..." autofocus>
      </div>
      <div id="globalSearchResults" style="max-height: 340px; overflow-y: auto; display: flex; flex-direction: column; gap: 8px;">
        ${renderSearchItems(SEARCH_INDEX)}
      </div>
    </div>
  `;

  showModal("Search CEDOK Portal", content);

  setTimeout(() => {
    const input = document.getElementById("globalSearchInput");
    const results = document.getElementById("globalSearchResults");
    if (input && results) {
      input.focus();
      input.addEventListener("input", (e) => {
        const q = e.target.value.toLowerCase();
        const filtered = SEARCH_INDEX.filter(item => 
          item.title.toLowerCase().includes(q) || item.desc.toLowerCase().includes(q) || item.type.toLowerCase().includes(q)
        );
        results.innerHTML = renderSearchItems(filtered);
      });
    }
  }, 100);
}

function renderSearchItems(items) {
  if (items.length === 0) {
    return `<div style="text-align: center; color: var(--slate-500); padding: 20px;">No matching results found.</div>`;
  }
  return items.map(item => `
    <a href="${item.link}" onclick="closeModal()" style="display: block; padding: 14px; border: 1px solid var(--slate-200); border-radius: var(--radius-md); transition: var(--transition-fast);" onmouseover="this.style.borderColor='var(--primary)'; this.style.background='var(--slate-50)'" onmouseout="this.style.borderColor='var(--slate-200)'; this.style.background='transparent'">
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 4px;">
        <strong style="color: var(--navy-deep); font-size: 0.9375rem;">${item.title}</strong>
        <span class="region-tag">${item.type}</span>
      </div>
      <p style="font-size: 0.8125rem; color: var(--slate-600); margin: 0;">${item.desc}</p>
    </a>
  `).join("");
}

/* ==========================================================================
   5. Interactive Programme Recommendation Quiz
   ========================================================================== */

function initProgrammeQuiz() {
  const quizTriggers = document.querySelectorAll(".launch-quiz-btn");
  quizTriggers.forEach(btn => {
    btn.addEventListener("click", openProgrammeQuizModal);
  });
}

window.openProgrammeQuizModal = function() {
  const content = `
    <div id="quizContainer">
      <p style="color: var(--slate-600); font-size: 0.9375rem; margin-bottom: 20px;">
        Answer 3 quick questions to discover the most suitable CEDOK entrepreneurship training for your current goals.
      </p>

      <form id="quizForm" onsubmit="handleQuizSubmit(event)">
        <div style="margin-bottom: 20px;">
          <label style="font-weight: 700; color: var(--navy-deep); display: block; margin-bottom: 8px;">
            1. What is your current business stage?
          </label>
          <select name="q1" class="search-box-input" style="padding-left: 16px;" required>
            <option value="explore">I have an idea / exploring self-employment</option>
            <option value="plan">I am ready to make a formal project plan</option>
            <option value="skill">I need practical management & marketing inputs</option>
          </select>
        </div>

        <div style="margin-bottom: 20px;">
          <label style="font-weight: 700; color: var(--navy-deep); display: block; margin-bottom: 8px;">
            2. How much time can you commit to training?
          </label>
          <select name="q2" class="search-box-input" style="padding-left: 16px;" required>
            <option value="short">Short orientation (1 to 3 days)</option>
            <option value="full">Comprehensive training (2 to 6 weeks)</option>
          </select>
        </div>

        <div style="margin-bottom: 24px;">
          <label style="font-weight: 700; color: var(--navy-deep); display: block; margin-bottom: 8px;">
            3. What is your primary industry interest?
          </label>
          <select name="q3" class="search-box-input" style="padding-left: 16px;" required>
            <option value="agri">Agri-Business & Food Processing</option>
            <option value="mfg">Manufacturing & Micro-Enterprises</option>
            <option value="service">Digital & Consumer Services</option>
          </select>
        </div>

        <button type="submit" class="btn primary full">Find My Recommended Programme →</button>
      </form>
    </div>
  `;

  showModal("Programme Finder Quiz", content);
};

window.handleQuizSubmit = function(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const q1 = formData.get("q1");
  const q2 = formData.get("q2");

  let rec = {
    title: "Entrepreneurship Development Programme (EDP)",
    badge: "RECOMMENDED FOR YOU",
    desc: "A structured, in-depth 2 to 6-week training covering business preparation, feasibility, project cost, bank scheme financing, and operational management.",
    link: "registration.html"
  };

  if (q1 === "explore" || q2 === "short") {
    rec = {
      title: "Entrepreneurship Awareness Programme (EAP)",
      badge: "RECOMMENDED FOR YOU",
      desc: "A focused 1 to 3-day awareness workshop introducing you to entrepreneurial opportunities, government schemes, and basic business selection criteria.",
      link: "registration.html"
    };
  } else if (q1 === "skill") {
    rec = {
      title: "Skill & Management Inputs Training",
      badge: "RECOMMENDED FOR YOU",
      desc: "Specialized training focused on practical business skills, statutory compliance, accounting basics, digital marketing, and market linkage.",
      link: "registration.html"
    };
  }

  const container = document.getElementById("quizContainer");
  if (container) {
    container.innerHTML = `
      <div style="text-align: center; padding: 10px 0;">
        <span class="announcement-badge" style="margin-bottom: 12px; font-size: 0.8125rem;">${rec.badge}</span>
        <h3 style="font-size: 1.6rem; color: var(--navy-deep); font-weight: 800; margin-bottom: 12px;">${rec.title}</h3>
        <p style="color: var(--slate-600); font-size: 1rem; max-width: 480px; margin: 0 auto 24px;">${rec.desc}</p>
        <div style="display: flex; gap: 12px; justify-content: center;">
          <button class="btn secondary" onclick="openProgrammeQuizModal()">Retake Quiz</button>
          <a href="${rec.link}" class="btn primary" onclick="closeModal()">Proceed to Registration ↗</a>
        </div>
      </div>
    `;
  }
};

/* ==========================================================================
   6. Resource Preview Engine
   ========================================================================== */

function initResourcePreview() {
  const previewBtns = document.querySelectorAll(".preview-resource-btn");
  previewBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
      const title = btn.dataset.title || "Business Resource Preview";
      const file = btn.dataset.file || "#";
      openResourcePreviewModal(title, file);
    });
  });
}

function openResourcePreviewModal(title, filePath) {
  const content = `
    <div>
      <span class="resource-type" style="margin-bottom: 12px;">PDF STARTER DOCUMENT</span>
      <h3 style="font-size: 1.4rem; color: var(--navy-deep); font-weight: 800; margin-bottom: 12px;">${title}</h3>
      <p style="color: var(--slate-600); font-size: 0.9375rem; margin-bottom: 20px;">
        This downloadable worksheet provides a structured framework developed for CEDOK trainees to document critical project parameters.
      </p>

      <div style="background: var(--slate-50); border: 1px solid var(--slate-200); border-radius: var(--radius-md); padding: 20px; margin-bottom: 24px;">
        <h4 style="font-size: 0.875rem; font-weight: 700; color: var(--navy-deep); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 12px;">Worksheet Structure & Highlights</h4>
        <ul style="padding-left: 20px; color: var(--slate-700); font-size: 0.875rem; line-height: 1.8;">
          <li>Executive Summary & Problem Statement</li>
          <li>Target Customer Persona & Market Demand Signals</li>
          <li>Capital Requirement, Machinery & Raw Material Breakdown</li>
          <li>Operational Timeline & Statutory Clearances Needed</li>
        </ul>
      </div>

      <div style="display: flex; justify-content: space-between; align-items: center;">
        <span style="font-size: 0.8125rem; color: var(--slate-500);">Format: PDF • Free Official Resource</span>
        <div style="display: flex; gap: 10px;">
          <button class="btn secondary" onclick="closeModal()">Close</button>
          <a href="${filePath}" download class="btn primary">Download File PDF ↓</a>
        </div>
      </div>
    </div>
  `;

  showModal("Document Preview", content);
}

/* ==========================================================================
   7. Bilingual Title Toggle (English / Kannada)
   ========================================================================== */

const KANNADA_MAP = {
  "Center for Entrepreneurship Development of Karnataka": "ಕರ್ನಾಟಕ ಉದ್ಯಮಶೀಲತಾ ಅಭಿವೃದ್ಧಿ ಕೇಂದ್ರ",
  "Your business journey starts with knowledge.": "ನಿಮ್ಮ ಉದ್ಯಮದ ಪಯಣ ಜ್ಞಾನದಿಂದ ಪ್ರಾರಂಭವಾಗುತ್ತದೆ.",
  "Learn • Prepare • Start": "ಕಲಿಯಿರಿ • ಸಿದ್ಧರಾಗಿ • ಪ್ರಾರಂಭಿಸಿ",
  "Home": "ಮುಖ್ಯ ಪುಟ",
  "Programmes": "ಕಾರ್ಯಕ್ರಮಗಳು",
  "Opportunities": "ಅವಕಾಶಗಳು",
  "Districts": "ಜಿಲ್ಲೆಗಳು",
  "Resources": "ಸಂಪನ್ಮೂಲಗಳು",
  "About": "ನಮ್ಮ ಬಗ್ಗೆ",
  "Register ↗": "ನೋಂದಣಿ ↗"
};

function initLanguageToggle() {
  const langBtn = document.getElementById("langToggleBtn");
  if (!langBtn) return;

  let isKannada = localStorage.getItem("cedok_lang") === "kn";
  if (isKannada) applyLanguage(true);

  langBtn.addEventListener("click", () => {
    isKannada = !isKannada;
    localStorage.setItem("cedok_lang", isKannada ? "kn" : "en");
    applyLanguage(isKannada);
    showToast(isKannada ? "ಭಾಷೆಯನ್ನು ಕನ್ನಡಕ್ಕೆ ಬದಲಾಯಿಸಲಾಗಿದೆ" : "Language switched to English");
  });
}

function applyLanguage(isKannada) {
  const langBtn = document.getElementById("langToggleBtn");
  if (langBtn) langBtn.textContent = isKannada ? "English" : "ಕನ್ನಡ";

  document.querySelectorAll("[data-kn]").forEach(el => {
    if (!el.dataset.en) el.dataset.en = el.textContent.trim();
    el.textContent = isKannada ? el.dataset.kn : el.dataset.en;
  });
}

/* ==========================================================================
   8. Stats Counter Animation
   ========================================================================== */

function initStatsCounter() {
  const statsElements = document.querySelectorAll(".stat-number[data-count]");
  if (!statsElements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const countTo = parseInt(target.dataset.count, 10);
        let count = 0;
        const step = Math.ceil(countTo / 40);
        const timer = setInterval(() => {
          count += step;
          if (count >= countTo) {
            target.textContent = countTo.toLocaleString() + "+";
            clearInterval(timer);
          } else {
            target.textContent = count.toLocaleString();
          }
        }, 30);
        observer.unobserve(target);
      }
    });
  }, { threshold: 0.5 });

  statsElements.forEach(el => observer.observe(el));
}

/* ==========================================================================
   9. Modal & Toast Utility System
   ========================================================================== */

function showModal(title, htmlContent) {
  closeModal();

  const modalHtml = `
    <div class="modal-overlay active" id="activeModalOverlay" onclick="handleModalBackdropClick(event)">
      <div class="modal-dialog">
        <div class="modal-header">
          <h3 class="modal-title">${title}</h3>
          <button class="modal-close" onclick="closeModal()">✕</button>
        </div>
        <div class="modal-body">
          ${htmlContent}
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML("beforeend", modalHtml);
  document.body.style.overflow = "hidden";
}

window.closeModal = function() {
  const overlay = document.getElementById("activeModalOverlay");
  if (overlay) {
    overlay.remove();
    document.body.style.overflow = "";
  }
};

window.handleModalBackdropClick = function(e) {
  if (e.target.classList.contains("modal-overlay")) {
    closeModal();
  }
};

function showToast(msg) {
  let toastContainer = document.querySelector(".toast-container");
  if (!toastContainer) {
    toastContainer = document.createElement("div");
    toastContainer.className = "toast-container";
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `
    <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
    <span>${msg}</span>
  `;

  toastContainer.appendChild(toast);
  setTimeout(() => {
    toast.remove();
  }, 3000);
}
