document.addEventListener('DOMContentLoaded', () => {
  const pills = document.querySelectorAll('.filter-pill');
  const cards = document.querySelectorAll('.essay-card');
  const featured = document.querySelector('.featured-card');

  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => { p.classList.remove('active'); p.setAttribute('aria-selected', 'false'); });
      pill.classList.add('active');
      pill.setAttribute('aria-selected', 'true');

      const filter = pill.dataset.filter;

      // Featured card
      if (featured) {
        if (filter === 'all' || featured.dataset.category === filter) {
          featured.style.display = '';
          featured.closest('.writing-featured').style.display = '';
        } else {
          featured.style.display = 'none';
          featured.closest('.writing-featured').style.display = 'none';
        }
      }

      // Essay cards
      cards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
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
