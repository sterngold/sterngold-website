// WerkAnders Mirror Gate — sequential questions with reflection
(function() {
  // If gate was already completed this session, skip straight to content
  if (sessionStorage.getItem('werkanders-done')) {
    document.getElementById('mirror-gate').style.display = 'none';
    document.getElementById('werkanders-content').style.display = 'block';
    return;
  }

  var answers = {};
  var currentStep = 0;

  function advance(step) {
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

  function skip() {
    sessionStorage.setItem('werkanders-done', '1');
    var gate = document.getElementById('mirror-gate');
    var content = document.getElementById('werkanders-content');
    gate.style.transition = 'opacity 0.4s ease';
    gate.style.opacity = '0';
    setTimeout(function() {
      gate.style.display = 'none';
      content.style.display = 'block';
      content.style.opacity = '0';
      content.style.transition = 'opacity 0.4s ease';
      requestAnimationFrame(function() { content.style.opacity = '1'; });
      window.scrollTo(0, 0);
    }, 400);
  }

  function renderReflection() {
    var q1 = answers.q1 || '';
    var q2 = answers.q2 || '';
    var el = document.getElementById('mirror-reflection');
    var text = '';

    if (q1 === 'shame' || q1 === 'learn') {
      text = '<p>You\u2019ve felt it. That discomfort when the machine catches up. G\u00fcnther Anders named it in 1956 \u2014 <em>Prometheische Scham</em> \u2014 the shame of being born instead of made. He saw it on factory floors. Now it shows up at standing desks.</p>' +
             '<p>The work below traces that feeling \u2014 where it comes from, why it persists, and what it means for how we lead.</p>';
    } else if (q1 === 'dismiss' || q2 === 'ai') {
      text = '<p>The change happened so gradually you might not have noticed. Your tools became your thinking partners. The line between your ideas and their suggestions blurred.</p>' +
             '<p>G\u00fcnther Anders called this <em>Promethean adaptation</em> \u2014 the quiet reshaping of humans to match their machines. The work below explores what that adaptation costs, and what it preserves.</p>';
    } else {
      text = '<p>Most people carry both feelings at once \u2014 the discomfort and the adaptation. The unease when the machine is faster, and the quiet relief when it helps.</p>' +
             '<p>In 1956, G\u00fcnther Anders named the space between those feelings <em>the Promethean Gap</em>. The work below maps it \u2014 in boardrooms, clinics, and the silence after someone shows what AI can do.</p>';
    }

    el.innerHTML = text;
  }

  // Event delegation
  var gate = document.getElementById('mirror-gate');
  if (gate) {
    gate.addEventListener('click', function(e) {
      var target = e.target;

      // Begin button
      if (target.classList.contains('mirror-begin-btn')) {
        advance(1);
        return;
      }

      // Skip button
      if (target.classList.contains('mirror-skip-btn')) {
        e.preventDefault();
        skip();
        return;
      }

      // Enter/Continue button (after reflection)
      if (target.classList.contains('mirror-enter-btn')) {
        skip();
        return;
      }

      // Answer option
      if (target.classList.contains('mirror-option')) {
        var q = target.getAttribute('data-q');
        var a = target.getAttribute('data-a');
        answers['q' + q] = a;

        // Highlight selected
        var siblings = target.parentElement.querySelectorAll('.mirror-option');
        for (var i = 0; i < siblings.length; i++) siblings[i].classList.remove('selected');
        target.classList.add('selected');

        // Auto-advance after delay
        setTimeout(function() {
          var nextStep = parseInt(q) + 1;
          if (nextStep === 4) {
            renderReflection();
          }
          advance(nextStep);
        }, 600);
        return;
      }
    });
  }
})();
