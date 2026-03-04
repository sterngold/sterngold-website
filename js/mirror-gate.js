(function() {
  // If gate was already completed this session, skip straight to content
  if (sessionStorage.getItem('mirror-done')) {
    document.getElementById('mirror-gate').style.display = 'none';
    document.getElementById('research-content').style.display = 'block';
    return;
  }

  var answers = {};
  var currentStep = 0;

  function mirrorSelect(btn) {
    var q = btn.getAttribute('data-q');
    var a = btn.getAttribute('data-a');
    answers['q' + q] = a;

    var siblings = btn.parentElement.querySelectorAll('.mirror-option');
    for (var i = 0; i < siblings.length; i++) siblings[i].classList.remove('selected');
    btn.classList.add('selected');

    setTimeout(function() {
      var nextStep = parseInt(q) + 1;
      if (nextStep === 4) {
        renderReflection();
      }
      mirrorAdvance(nextStep);
    }, 600);
  }

  function mirrorAdvance(step) {
    var current = document.getElementById('mirror-step-' + currentStep);
    var next = document.getElementById('mirror-step-' + step);
    if (!current || !next) return;

    current.classList.add('fading-out');
    current.classList.remove('active');

    setTimeout(function() {
      current.classList.remove('fading-out');
      next.classList.add('active');
      currentStep = step;
    }, 300);
  }

  function mirrorSkip() {
    sessionStorage.setItem('mirror-done', '1');
    var gate = document.getElementById('mirror-gate');
    var content = document.getElementById('research-content');
    gate.style.opacity = '1';
    gate.style.transition = 'opacity 0.4s ease';
    gate.style.opacity = '0';
    setTimeout(function() {
      gate.style.display = 'none';
      content.style.display = 'block';
      content.style.opacity = '0';
      content.style.transition = 'opacity 0.4s ease';
      requestAnimationFrame(function() {
        content.style.opacity = '1';
      });
      window.scrollTo(0, 0);
    }, 400);
  }

  function renderReflection() {
    var q1 = answers.q1 || '';
    var q2 = answers.q2 || '';
    var el = document.getElementById('mirror-reflection');
    var text = '';

    if (q1 === 'attack-self' || q1 === 'withdrawal') {
      text = '<p>You\u2019ve felt it. That discomfort when the machine catches up. G\u00fcnther Anders named it in 1956 \u2014 <em>Prometheische Scham</em> \u2014 the shame of being born instead of made. He saw it on factory floors. Now it shows up at standing desks.</p>' +
             '<p>The research below traces that feeling \u2014 where it comes from, why it persists, and what it means for how we work.</p>';
    }
    else if (q1 === 'avoidance' || q2 === 'ai-partner') {
      text = '<p>The change happened so gradually you might not have noticed. Your tools became your thinking partners. The line between your ideas and their suggestions blurred.</p>' +
             '<p>G\u00fcnther Anders called this <em>Promethean adaptation</em> \u2014 the quiet reshaping of humans to match their machines. The research below explores what that adaptation costs, and what it preserves.</p>';
    }
    else {
      text = '<p>Most people carry both feelings at once \u2014 the discomfort and the adaptation. The unease when the machine is faster, and the quiet relief when it helps.</p>' +
             '<p>In 1956, G\u00fcnther Anders named the space between those feelings <em>the Promethean Gap</em>. The research below maps it \u2014 in boardrooms, clinics, and the silence after someone shows what AI can do.</p>';
    }

    el.innerHTML = text;
  }

  // Event delegation — no inline onclick needed
  var gate = document.getElementById('mirror-gate');
  if (gate) {
    gate.addEventListener('click', function(e) {
      var target = e.target;

      // Mirror option buttons
      if (target.classList.contains('mirror-option')) {
        mirrorSelect(target);
        return;
      }

      // Begin button
      if (target.classList.contains('mirror-begin-btn')) {
        mirrorAdvance(1);
        return;
      }

      // Skip links and Enter button
      if (target.classList.contains('mirror-skip') || target.classList.contains('mirror-enter-btn')) {
        e.preventDefault();
        mirrorSkip();
        return;
      }
    });
  }
})();
