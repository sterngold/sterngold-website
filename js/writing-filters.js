document.addEventListener('DOMContentLoaded', () => {
  const pills = document.querySelectorAll('.filter-pill');
  const cards = document.querySelectorAll('.essay-card');
  const featured = document.querySelector('.featured-card');

  function showAll() {
    pills.forEach(p => { p.classList.remove('active'); p.setAttribute('aria-selected', 'false'); });
    if (featured) {
      featured.style.display = '';
      featured.closest('.writing-featured').style.display = '';
    }
    cards.forEach(card => {
      card.style.display = '';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    });
  }

  // Show all essays on load
  showAll();

  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      const filter = pill.dataset.filter;
      const wasActive = pill.classList.contains('active');

      // Toggle: clicking active pill resets to show all
      if (wasActive) {
        showAll();
        return;
      }

      // Activate this pill
      pills.forEach(p => { p.classList.remove('active'); p.setAttribute('aria-selected', 'false'); });
      pill.classList.add('active');
      pill.setAttribute('aria-selected', 'true');

      // Featured card
      if (featured) {
        if (featured.dataset.category === filter) {
          featured.style.display = '';
          featured.closest('.writing-featured').style.display = '';
        } else {
          featured.style.display = 'none';
          featured.closest('.writing-featured').style.display = 'none';
        }
      }

      // Essay cards
      cards.forEach(card => {
        if (card.dataset.category === filter) {
          card.style.display = '';
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
});
