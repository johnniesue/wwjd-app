let currentScenario = null;

function loadScenario() {
  fetch('scenarios.json')
    .then(res => res.json())
    .then(data => {
      const scenario = data[Math.floor(Math.random() * data.length)];
      currentScenario = scenario;
      renderScenario(scenario);
    });
}

function renderScenario(scenario) {
  const app = document.getElementById('app');
  app.innerHTML = `
    <header><h2>WWJD Scenario</h2></header>
    <section class="scenario-card">
      <h3>${scenario.title}</h3>
      <p>${scenario.situation}</p>
      <div class="choices">
        ${scenario.choices.map((choice, i) => `
          <button onclick="checkAnswer(${i})">${choice}</button>
        `).join('')}
      </div>
      <div id="feedback" class="hidden"></div>
      <button onclick="loadScenario()">🔄 Try Another</button>
    </section>
  `;
}

function checkAnswer(selectedIndex) {
  const feedback = document.getElementById('feedback');
  if (!currentScenario) return;

  const isCorrect = selectedIndex === currentScenario.correctChoice;
  feedback.innerHTML = `
    <p><strong>${isCorrect ? "✅ That's right!" : "❌ Not quite."}</strong></p>
    <p>${currentScenario.response}</p>
    <p><em>${currentScenario.verse}</em></p>
  `;
  feedback.classList.remove('hidden');
}

function navigate(section) {
  if (section === 'scenario') {
    loadScenario();
  } else {
    alert('Feature coming soon: ' + section);
  }
}
