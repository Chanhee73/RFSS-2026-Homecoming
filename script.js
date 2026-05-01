/**
 * Modern Minimal Wedding Invitation - Script
 */

(function () {
  'use strict';

  // ── Helpers ──
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

  function formatDate(dateStr) {
    const d = new Date(dateStr);
    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const day = d.getDate();
    const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
    const dayName = dayNames[d.getDay()];
    return { year, month, day, dayName, date: d };
  }

  function formatTime(timeStr) {
    const [h, m] = timeStr.split(':').map(Number);
    const period = h < 12 ? '오전' : '오후';
    const hour12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
    return `${period} ${hour12}시${m > 0 ? ' ' + m + '분' : ''}`;
  }

  // ── Image Loading ──
  function loadImagesFromFolder(folder, maxAttempts = 50) {
    return new Promise(resolve => {
        const images = [];
        let current = 1;
        let consecutiveFails = 0;

        function tryNext() {
            if (current > maxAttempts || consecutiveFails >= 3) {
                resolve(images);
                return;
            }
            const img = new Image();
            const path = `images/${folder}/${current}.jpg`;
            img.onload = function() {
                images.push(path);
                consecutiveFails = 0;
                current++;
                tryNext();
            };
            img.onerror = function() {
                consecutiveFails++;
                current++;
                tryNext();
            };
            img.src = path;
        }

        tryNext();
    });
  }

  // ── Toast ──
  let toastTimer = null;
  function showToast(message) {
    let toast = $('.toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'toast';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    clearTimeout(toastTimer);
    toast.classList.remove('show');
    requestAnimationFrame(() => {
      toast.classList.add('show');
      toastTimer = setTimeout(() => toast.classList.remove('show'), 2000);
    });
  }

  // ── Copy to clipboard ──
  async function copyToClipboard(text, successMsg) {
    try {
      await navigator.clipboard.writeText(text);
      showToast(successMsg || '복사되었습니다');
    } catch {
      // fallback
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.cssText = 'position:fixed;left:-9999px';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      showToast(successMsg || '복사되었습니다');
    }
  }

  // ── Curtain / Intro Overlay ──
  function initCurtain(c, dateInfo, timeText) {
    const overlay = $('#curtain-overlay');
    if (!overlay) return;

    if (!c.useCurtain) {
      // 커튼 사용하지 않음 - 즉시 제거
      overlay.remove();
      return;
    }

    // 커튼 표시
    overlay.style.display = 'flex';
    document.body.style.overflow = 'hidden';

    // 커튼 내용 채우기
    const names = $('.curtain-names', overlay);
    const date = $('.curtain-date', overlay);
    if (names) names.textContent = '2026 RFSS Homecoming Day';
    if (date) date.textContent = `${dateInfo.year}. ${String(dateInfo.month).padStart(2, '0')}. ${String(dateInfo.day).padStart(2, '0')}`;

    // 열기 버튼
    const btn = $('#curtain-open-btn');
    if (btn) {
      btn.addEventListener('click', () => {
        overlay.classList.add('fade-out');
        document.body.style.overflow = '';
        overlay.addEventListener('transitionend', () => {
          overlay.remove();
        }, { once: true });
      });
    }
  }

  // ── Build Page ──
  async function init() {
    if (typeof CONFIG === 'undefined') return;

    const c = CONFIG;
    const dateInfo = formatDate(c.wedding.date);
    const timeText = formatTime(c.wedding.time);

    // Handle curtain overlay
    initCurtain(c, dateInfo, timeText);

    // Build non-image sections immediately
    buildHero(c, dateInfo, timeText);
    buildInvitation(c, dateInfo, timeText);
    buildCountdown(c, dateInfo);
    buildStoryText(c);
    buildLocation(c);
    buildContact(c);
    buildAccount(c);
    initScrollAnimations();
    initModal();

    // Show loading state for image-dependent sections
    showLoadingState();

    // Load images asynchronously
    const [storyImages, galleryImages] = await Promise.all([
      loadImagesFromFolder('story'),
      loadImagesFromFolder('gallery')
    ]);

    // Render image-dependent sections
    buildGallery(galleryImages);

    // Remove loading state
    hideLoadingState();

    // Re-observe newly added elements for scroll animations
    reobserveAnimations();
  }

  // ── Loading State ──
  function showLoadingState() {
    const storyImagesEl = $('.story-images');
    const galleryGrid = $('.gallery-grid');
    if (storyImagesEl) storyImagesEl.classList.add('loading');
    if (galleryGrid) galleryGrid.classList.add('loading');
  }

  function hideLoadingState() {
    const storyImagesEl = $('.story-images');
    const galleryGrid = $('.gallery-grid');
    if (storyImagesEl) storyImagesEl.classList.remove('loading');
    if (galleryGrid) galleryGrid.classList.remove('loading');
  }

  // ── Hero ──
  function buildHero(c, dateInfo, timeText) {
    const heroImg = $('.hero-image');
    if (heroImg) {
      heroImg.src = 'images/hero/1.jpg';
      heroImg.alt = `${c.groom.name} & ${c.bride.name}`;
    }

    const heroNames = $('.hero-names');
    if (heroNames) {
      heroNames.textContent = '2026 KAIST RFSS Homecoming Day';
    }

    const heroDate = $('.hero-date');
    if (heroDate) {
      heroDate.textContent = `${dateInfo.year}. ${String(dateInfo.month).padStart(2, '0')}. ${String(dateInfo.day).padStart(2, '0')}. ${dateInfo.dayName}요일 ${timeText}`;
    }

    const heroVenue = $('.hero-venue');
    if (heroVenue) {
      heroVenue.textContent = c.wedding.venue;
    }
  }

  // ── Invitation ──
  function buildInvitation(c, dateInfo, timeText) {
    const title = $('#invitation-title');
    if (title) {
      title.textContent = c.invitation.title;
    }

    const msg = $('.invitation-message');
    if (msg) {
      msg.textContent = c.invitation.message;
    }

    const parents = $('.invitation-parents');
    if (parents) {
      parents.innerHTML = "2026년 05월 01일<br>RFSS 연구실 재학생 일동";
    }

  }

  // ── Countdown ──
  function buildCountdown(c, dateInfo) {
    const [h, m] = c.wedding.time.split(':').map(Number);
    const weddingDate = new Date(dateInfo.date);
    weddingDate.setHours(h, m, 0, 0);

    function update() {
      const now = new Date();
      const diff = weddingDate - now;

      const daysEl = $('#cd-days');
      const hoursEl = $('#cd-hours');
      const minsEl = $('#cd-mins');
      const secsEl = $('#cd-secs');
      const ddayEl = $('.countdown-dday');

      if (diff <= 0) {
        if (daysEl) daysEl.textContent = '0';
        if (hoursEl) hoursEl.textContent = '0';
        if (minsEl) minsEl.textContent = '0';
        if (secsEl) secsEl.textContent = '0';
        if (ddayEl) ddayEl.textContent = '결혼식 당일입니다';
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((diff % (1000 * 60)) / 1000);

      if (daysEl) daysEl.textContent = days;
      if (hoursEl) hoursEl.textContent = hours;
      if (minsEl) minsEl.textContent = mins;
      if (secsEl) secsEl.textContent = secs;

      if (ddayEl) {
        ddayEl.textContent = `RFSS 홈커밍데이 D-${days}`;
      }
    }

    update();
    setInterval(update, 1000);

    // Calendar buttons
    const gcalBtn = $('#btn-gcal');
    const icalBtn = $('#btn-ical');

    if (gcalBtn) {
      gcalBtn.addEventListener('click', () => {
        const start = formatGoogleDate(weddingDate);
        const end = formatGoogleDate(new Date(weddingDate.getTime() + 2 * 60 * 60 * 1000));
        const title = encodeURIComponent(`2026 RFSS 홈커밍데이`);
        const location = encodeURIComponent(`${c.wedding.venue} ${c.wedding.address}`);
        const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${end}&location=${location}`;
        window.open(url, '_blank');
      });
    }

    if (icalBtn) {
      icalBtn.addEventListener('click', () => {
        const start = formatICSDate(weddingDate);
        const end = formatICSDate(new Date(weddingDate.getTime() + 2 * 60 * 60 * 1000));
        const ics = [
          'BEGIN:VCALENDAR',
          'VERSION:2.0',
          'PRODID:-//RFSS_Homecoming//Invitation//KO',
          'BEGIN:VEVENT',
          `DTSTART:${start}`,
          `DTEND:${end}`,
          `SUMMARY:2026 RFSS 홈커밍데이`,
          `LOCATION:KAIST E3-2 1220호`,
          'END:VEVENT',
          'END:VCALENDAR'
        ].join('\r\n');

        const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'RFSS_Homecoming.ics';
        link.click();
        URL.revokeObjectURL(link.href);
      });
    }
  }

  function formatGoogleDate(d) {
    return d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
  }

  function formatICSDate(d) {
    const pad = (n) => String(n).padStart(2, '0');
    return `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${pad(d.getHours())}${pad(d.getMinutes())}00`;
  }

  // ── Story (text only, rendered immediately) ──
  function buildStoryText(c) {
    const title = $('#story-title');
    const table = $('#program-table');
    const games = $('#program-games');
    const survey = $('#program-survey');

    if (title) title.textContent = c.story.title;

    if (table && c.story.schedule) {
      table.innerHTML = `
        <div class="program-header">
          <div class="program-col-time">시간</div>
          <div class="program-col-program">내용</div>
          <div class="program-col-place">장소</div>
        </div>
        ${c.story.schedule.map(row => `
          <div class="program-row">
            <div class="program-col-time">${row.time}</div>
            <div class="program-col-program">${row.program}</div>
            <div class="program-col-place">${row.place}</div>
          </div>
        `).join('')}
      `;
    }

    if (games) {
      const makeGameLinks = (items = []) =>
        items.map(item => `
          <a class="game-chip game-chip-link" href="sport.html?game=${item.slug}">
            ${item.title}
          </a>
        `).join('');

      games.innerHTML = `
        <div class="program-games-grid">
          <div class="program-game-card">
            <div class="program-game-title">단체전 종목 설명 (청백전)</div>
            <div class="program-game-chips">
              ${makeGameLinks(c.story.teamGames)}
            </div>
          </div>

          <div class="program-game-card">
            <div class="program-game-title">개인전 종목 설명 (개별 상품)</div>
            <div class="program-game-chips">
              ${makeGameLinks(c.story.individualGames)}
            </div>
          </div>
        </div>
      `;
    }

    if (survey) {
      survey.innerHTML = `
        <p class="program-survey-text">단체전 참가 희망 종목 설문조사 링크 (5월 5일까지)</p>
        <a
          class="program-survey-link"
          href="https://forms.gle/fhdA5NMY4sGa7W8M6"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://forms.gle/fhdA5NMY4sGa7W8M6
        </a>
      `;
    }
  }


  // ── Gallery (rendered after auto-detection) ──
  let galleryAllImages = [];

  function buildGallery(images) {
    const grid = $('.gallery-grid');
    if (!grid) return;

    galleryAllImages = images;

    if (images.length === 0) {
      // Hide entire gallery section if no images found
      const gallerySection = grid.closest('.gallery');
      if (gallerySection) gallerySection.style.display = 'none';
      return;
    }

    const initialCount = 6;

    function renderImages(count) {
      grid.innerHTML = images.slice(0, count).map((src, i) =>
        `<div class="gallery-item" data-index="${i}">
          <img src="${src}" alt="Gallery photo ${i + 1}" loading="lazy">
        </div>`
      ).join('');

      $$('.gallery-item', grid).forEach(item => {
        item.addEventListener('click', () => {
          openModal(images, parseInt(item.dataset.index));
        });
      });
    }

    renderImages(Math.min(initialCount, images.length));

    const moreBtn = $('.btn-gallery-more');
    if (moreBtn) {
      if (images.length <= initialCount) {
        moreBtn.parentElement.style.display = 'none';
      } else {
        let expanded = false;
        moreBtn.addEventListener('click', () => {
          if (!expanded) {
            renderImages(images.length);
            moreBtn.textContent = '접기';
            expanded = true;
          } else {
            renderImages(initialCount);
            moreBtn.textContent = '더보기';
            expanded = false;
            grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        });
      }
    }
  }

  // ── Photo Modal ──
  let currentModalImages = [];
  let currentModalIndex = 0;
  let touchStartX = 0;
  let touchEndX = 0;

  function initModal() {
    const overlay = $('.modal-overlay');
    if (!overlay) return;

    const closeBtn = $('.modal-close');
    const prevBtn = $('.modal-prev');
    const nextBtn = $('.modal-next');
    const swipeArea = $('.modal-swipe-area');

    closeBtn?.addEventListener('click', closeModal);
    prevBtn?.addEventListener('click', () => navigateModal(-1));
    nextBtn?.addEventListener('click', () => navigateModal(1));

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay || e.target === swipeArea) closeModal();
    });

    // Swipe
    swipeArea?.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    swipeArea?.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 50) {
        navigateModal(diff > 0 ? 1 : -1);
      }
    }, { passive: true });

    // Keyboard
    document.addEventListener('keydown', (e) => {
      if (!overlay.classList.contains('active')) return;
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowLeft') navigateModal(-1);
      if (e.key === 'ArrowRight') navigateModal(1);
    });
  }

  function openModal(images, index) {
    currentModalImages = images;
    currentModalIndex = index;

    const overlay = $('.modal-overlay');
    if (!overlay) return;

    updateModalImage();
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    const overlay = $('.modal-overlay');
    if (!overlay) return;
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  function navigateModal(dir) {
    currentModalIndex += dir;
    if (currentModalIndex < 0) currentModalIndex = currentModalImages.length - 1;
    if (currentModalIndex >= currentModalImages.length) currentModalIndex = 0;
    updateModalImage();
  }

  function updateModalImage() {
    const img = $('.modal-image');
    const counter = $('.modal-counter');
    if (img) {
      img.src = currentModalImages[currentModalIndex];
      img.alt = `Photo ${currentModalIndex + 1}`;
    }
    if (counter) {
      counter.textContent = `${currentModalIndex + 1} / ${currentModalImages.length}`;
    }
  }

  // ── Location ──
  function buildLocation(c) {
    const list = $('.location-list');
    if (!list) return;

    const locations = c.locations || [];
    if (locations.length === 0) {
      list.style.display = 'none';
      return;
    }

    list.innerHTML = locations.map((loc, i) => `
      <div class="location-block">
        <div class="location-info">
          <div class="location-venue-name">${loc.venue || ''}</div>
          <div class="location-venue-hall">${loc.hall || ''}</div>
          <div class="location-address">${loc.address || ''}</div>
          ${loc.tel ? `<div class="location-tel"><a href="tel:${loc.tel}">${loc.tel}</a></div>` : ''}
        </div>

        <div class="location-map-image">
          <img src="${loc.mapImage || ''}" alt="${loc.venue || '약도'}" loading="lazy">
        </div>

        <div class="location-actions">
          <button type="button" class="btn-copy-address" data-address="${loc.address || ''}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
              <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
            </svg>
            주소 복사
          </button>

          <a href="${loc.mapLinks?.kakao || '#'}" class="link-kakao-map" target="_blank" rel="noopener">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            카카오맵
          </a>

          <a href="${loc.mapLinks?.naver || '#'}" class="link-naver-map" target="_blank" rel="noopener">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            네이버지도
          </a>
        </div>
      </div>
    `).join('');

    $$('.btn-copy-address', list).forEach(btn => {
      btn.addEventListener('click', () => {
        copyToClipboard(btn.dataset.address, '주소가 복사되었습니다');
      });
    });
  }

  function buildContact(c) {
    const phdList = $('#contact-phd');
    const masterList = $('#contact-master');

    const phd = c.contacts?.phd || [];
    const master = c.contacts?.master || [];

    if (phdList) {
      phdList.innerHTML = phd.map(person => `
        <div class="contact-item">
          <span class="contact-name">${person.name}</span>
          <a class="contact-phone" href="tel:${person.phone}">${person.phone}</a>
        </div>
      `).join('');
    }

    if (masterList) {
      masterList.innerHTML = master.map(person => `
        <div class="contact-item">
          <span class="contact-name">${person.name}</span>
          <a class="contact-phone" href="tel:${person.phone}">${person.phone}</a>
        </div>
      `).join('');
    }
  }

  // ── Account ──
    function buildAccount(c) {
      buildAccountGroup('groom', c.accounts.groom);
    }

  function buildAccountGroup(side, accounts) {
    const group = $(`#account-${side}`);
    if (!group) return;

    const list = $('.account-list', group);
    if (!list) return;

    list.innerHTML = accounts.map(acc =>
      `<div class="account-item">
        <div class="account-info">
          <div class="account-role">${acc.role}</div>
          <div class="account-detail account-copy-target"
               data-copy="${acc.bank} ${acc.number}">
            <span class="account-name">${acc.name}</span>
            ${acc.bank} ${acc.number}
          </div>
        </div>
      </div>`
    ).join('');

    $$('.account-copy-target', list).forEach(el => {
      el.addEventListener('click', () => {
        copyToClipboard(el.dataset.copy, '계좌번호가 복사되었습니다');
      });
    });
  }

  // ── Scroll Animations ──
  let scrollObserver = null;

  function initScrollAnimations() {
    scrollObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            scrollObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    $$('.fade-in').forEach(el => scrollObserver.observe(el));
  }

  function reobserveAnimations() {
    if (!scrollObserver) return;
    $$('.fade-in:not(.visible)').forEach(el => scrollObserver.observe(el));
  }

  // ── Init ──
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
