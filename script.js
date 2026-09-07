// Edit these details to update the presentation without touching the layout.
const projectData = {
  // Main project details — update these strings when adapting this template.
  projectName: 'Dry-Gold-Ratio',
  subtitle: 'AI-Assisted Grain Drying Readiness Tool',
  partnerName: 'Your Institution / Partner Name',
  team: [
    { name: 'PraveenRaj K', role: 'Team Leader', responsibilities: 'Guides the project vision and coordinates the team.', initials: 'PK', color: 'sage' },
    { name: 'Sivaraj K', role: 'Task Executor', responsibilities: 'Turns plans into progress and drives task delivery.', initials: 'SK', color: 'gold' },
    { name: 'Aashik H', role: 'Financial Officer / Designer', responsibilities: 'Manages resources and shapes the product experience.', initials: 'AH', color: 'clay' },
    { name: 'Bharanidharan V', role: 'Webmaster', responsibilities: 'Creates the project’s digital presentation and web presence.', initials: 'BV', color: 'leaf' },
    { name: 'Karthikeyan S', role: 'Recorder / Designer', responsibilities: 'Documents the journey and supports visual design.', initials: 'KS', color: 'earth' }
  ]
};

const teamGrid = document.querySelector('#team-grid');
teamGrid.innerHTML = projectData.team.map((member, index) => `
  <article class="member-card reveal" style="--delay: ${index * 80}ms">
    <div class="member-head"><div class="avatar ${member.color}">${member.initials}</div><span class="member-index">0${index + 1}</span></div>
    <p class="member-role">${member.role}</p><h3>${member.name}</h3><p class="member-task">${member.responsibilities}</p>
  </article>`).join('');

const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
menuToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuToggle.classList.toggle('open', isOpen);
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});
document.querySelectorAll('.nav-links a').forEach(link => link.addEventListener('click', () => {
  navLinks.classList.remove('open'); menuToggle.classList.remove('open'); menuToggle.setAttribute('aria-expanded', 'false');
}));

const observer = new IntersectionObserver((entries) => entries.forEach(entry => {
  if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
}), { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(item => observer.observe(item));
