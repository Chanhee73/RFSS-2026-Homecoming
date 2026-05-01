(function () {
  'use strict';

  const $ = (sel, ctx = document) => ctx.querySelector(sel);

  function getQueryParam(name) {
    const url = new URL(window.location.href);
    return url.searchParams.get(name);
  }

  function initSportPage() {
    if (typeof CONFIG === 'undefined') return;

    const slug = getQueryParam('game');
    const games = [
      ...(CONFIG.story?.teamGames || []),
      ...(CONFIG.story?.individualGames || [])
    ];

    const game = games.find(item => item.slug === slug);

    const titleEl = $('#sport-title');
    const imageEl = $('#sport-image');
    const descEl = $('#sport-description');
    const rulesEl = $('#sport-rules');

    if (!game) {
      if (titleEl) titleEl.textContent = '종목 정보를 찾을 수 없습니다';
      if (descEl) descEl.textContent = '잘못된 접근이거나 아직 등록되지 않은 종목입니다.';
      return;
    }

    document.title = `${game.title} | 2026 RFSS Homecoming Day`;

    if (titleEl) titleEl.textContent = game.title;
    if (imageEl) {
      imageEl.src = game.image;
      imageEl.alt = game.title;
    }
    if (descEl) descEl.textContent = game.description || '';

    if (rulesEl) {
      rulesEl.innerHTML = (game.rules || [])
        .map(rule => `<li>${rule}</li>`)
        .join('');
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSportPage);
  } else {
    initSportPage();
  }
})();