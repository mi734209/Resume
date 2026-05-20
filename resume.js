const skillItems = Array.from(document.querySelectorAll('.skills-list li'));
const skillFilters = Array.from(document.querySelectorAll('.skill-filter'));
const focusTechBtn = document.getElementById('focusTechBtn');
const jobs = Array.from(document.querySelectorAll('.job'));

const skillCountEl = document.getElementById('skillCount');
const certCountEl = document.getElementById('certCount');

const downloadBtn = document.getElementById('downloadBtn');

function updateMetrics() {
  const languageCount = skillItems.filter((item) => item.dataset.category === 'language').length;
  const toolCount = skillItems.filter((item) => item.dataset.category === 'tool').length;
  const certCount = skillItems.filter((item) => item.dataset.category === 'cert').length;

  skillCountEl.textContent = String(languageCount + toolCount);
  certCountEl.textContent = String(certCount);
}

function setActiveButton(buttons, selected) {
  buttons.forEach((btn) => btn.classList.toggle('active', btn === selected));
}

skillFilters.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    setActiveButton(skillFilters, button);

    skillItems.forEach((item) => {
      const category = item.dataset.category;
      const match = filter === 'all' || filter === category;
      item.classList.toggle('dimmed', !match);
    });
  });
});

// Project filtering removed: portfolio link now points to external site instead

let techFocusEnabled = false;
if (focusTechBtn) {
  focusTechBtn.addEventListener('click', () => {
  techFocusEnabled = !techFocusEnabled;

  jobs.forEach((job) => {
    const type = job.dataset.type || '';
    const isTechnical = type.includes('technical') || type.includes('web');
    job.classList.toggle('tech-focus', techFocusEnabled && isTechnical);
    job.classList.toggle('dimmed', techFocusEnabled && !isTechnical);
  });

  focusTechBtn.textContent = techFocusEnabled
    ? 'Show All Roles'
    : 'Highlight Technical Roles';
  });
}

updateMetrics();

if (downloadBtn) {
  downloadBtn.addEventListener('click', () => {
    window.print();
  });
}
