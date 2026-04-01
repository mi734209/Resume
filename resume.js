const skillItems = Array.from(document.querySelectorAll('.skills-list li'));
const projectItems = Array.from(document.querySelectorAll('.project-list li'));
const skillFilters = Array.from(document.querySelectorAll('.skill-filter'));
const projectFilters = Array.from(document.querySelectorAll('.project-filter'));
const focusTechBtn = document.getElementById('focusTechBtn');
const jobs = Array.from(document.querySelectorAll('.job'));

const skillCountEl = document.getElementById('skillCount');
const projectCountEl = document.getElementById('projectCount');
const certCountEl = document.getElementById('certCount');

function updateMetrics() {
  const languageCount = skillItems.filter((item) => item.dataset.category === 'language').length;
  const toolCount = skillItems.filter((item) => item.dataset.category === 'tool').length;
  const certCount = skillItems.filter((item) => item.dataset.category === 'cert').length;

  skillCountEl.textContent = String(languageCount + toolCount);
  projectCountEl.textContent = String(projectItems.length);
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

projectFilters.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.projectFilter;
    setActiveButton(projectFilters, button);

    projectItems.forEach((item) => {
      const type = item.dataset.projectType;
      const match = filter === 'all' || filter === type;
      item.classList.toggle('dimmed', !match);
    });
  });
});

let techFocusEnabled = false;
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

updateMetrics();
