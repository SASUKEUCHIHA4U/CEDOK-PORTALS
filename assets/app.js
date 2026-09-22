/**
 * CEDOK Portal — Interactive Engine & Client Logic
 * Center for Entrepreneurship Development of Karnataka
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initGlobalSearch();
  initProgrammeQuiz();
  initProgrammeFilters();
  initLanguageToggle();
  initAccessibilityControls();
  initStatsCounter();
  updateCopyrightYear();
});

/* ==========================================================================
   1. Data Repositories
   ========================================================================== */

const SEARCH_INDEX = [
  { title: "Entrepreneurship Development Programme (EDP)", type: "Programme", link: "programmes.html#edp", desc: "Structured 2 to 6-week training for aspiring entrepreneurs." },
  { title: "Entrepreneurship Awareness Programme (EAP)", type: "Programme", link: "programmes.html#eap", desc: "1 to 3-day orientation into business opportunities." },
  { title: "Skill & Business Inputs Training", type: "Programme", link: "programmes.html#training", desc: "Technical & domain-specific business input sessions." },
  { title: "1-Day Motivation Camp", type: "Programme", link: "programmes.html#motivation", desc: "Inspiring one-day camp for aspiring entrepreneurs." },
  { title: "3-Day Awareness Programme (EAP)", type: "Programme", link: "programmes.html#awareness", desc: "3-day orientation into entrepreneurship and business basics." },
  { title: "10-Day EDP Training", type: "Programme", link: "programmes.html#edp", desc: "Intensive 10-day Entrepreneurship Development Programme." },
  { title: "Sector Specific EDP (30 Days)", type: "Programme", link: "programmes.html#sector", desc: "Sector-focused 30-day advanced EDP training." },
  { title: "Management Development Programme (MDP)", type: "Programme", link: "programmes.html#mdp", desc: "Management and leadership development for entrepreneurs." }
];

/* ==========================================================================
   2. Core Navigation & UI Setup
   ========================================================================== */

function initNavigation() {
  const hamb = document.querySelector(".hamb");
  const navBar = document.querySelector(".gov-nav-bar");
  const menu = navBar ? navBar.querySelector(".menu") : null;

  if (hamb && menu) {
    hamb.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = menu.classList.toggle("open");
      hamb.setAttribute("aria-expanded", String(isOpen));
    });

    // Close menu when tapping any link inside it on mobile
    menu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        if (window.innerWidth <= 768) {
          menu.classList.remove("open");
          hamb.setAttribute("aria-expanded", "false");
        }
      });
    });

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (!navBar.contains(e.target)) {
        menu.classList.remove("open");
        hamb.setAttribute("aria-expanded", "false");
      }
    });
  }

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

function updateCopyrightYear() {
  const yearElements = document.querySelectorAll(".year");
  const currentYear = new Date().getFullYear();
  yearElements.forEach(el => el.textContent = currentYear);
}
function initProgrammeFilters() {
  const filterButtons = document.querySelectorAll(".filter-btn[data-filter]");
  if (!filterButtons.length) return;

  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      const selected = button.dataset.filter || "all";
      document.querySelectorAll(".program-card").forEach(card => {
        const matches = selected === "all" || card.dataset.type === selected;
        card.style.display = matches ? "flex" : "none";
      });
      filterButtons.forEach(btn => btn.classList.toggle("active", btn === button));
    });
  });
}

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
        <input type="search" id="globalSearchInput" class="search-box-input" placeholder="Search programmes..." autofocus>
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
   7. Bilingual Title Toggle (English / Kannada)
   ========================================================================== */

const KANNADA_MAP = {
  "Center for Entrepreneurship Development of Karnataka": "ಕರ್ನಾಟಕ ಉದ್ಯಮಶೀಲತಾ ಅಭಿವೃದ್ಧಿ ಕೇಂದ್ರ",
  "Your business journey starts with knowledge.": "ನಿಮ್ಮ ಉದ್ಯಮದ ಪಯಣ ಜ್ಞಾನದಿಂದ ಪ್ರಾರಂಭವಾಗುತ್ತದೆ.",
  "Learn • Prepare • Start": "ಕಲಿಯಿರಿ • ಸಿದ್ಧರಾಗಿ • ಪ್ರಾರಂಭಿಸಿ",
  "Home": "ಮುಖ್ಯ ಪುಟ",
  "Programmes": "ಕಾರ್ಯಕ್ರಮಗಳು",
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
