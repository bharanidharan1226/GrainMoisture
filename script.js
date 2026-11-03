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
    { name: 'Karthikeyan S', role: 'Recorder / Designer', responsibilities: 'Documents the journey and supports visual design.', initials: 'KS', color: 'earth' },
    { name: 'Mohaprasath K', role: 'Designer', responsibilities: '', initials: 'MK', color: 'sage' }
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

const notesStorageKey = 'dry-gold-ratio-notes';
const notesSection = document.querySelector('#notes');

if (notesSection) {
  const addNoteButton = notesSection.querySelector('[data-notes-add]');
  const notesList = notesSection.querySelector('[data-notes-list]');
  const notesDialog = notesSection.querySelector('[data-notes-dialog]');
  const notesForm = notesSection.querySelector('[data-notes-form]');
  const titleInput = notesForm.elements.title;
  const contentInput = notesForm.elements.content;
  let editingNoteId = null;
  let notes = [];

  try {
    const storedNotes = JSON.parse(localStorage.getItem(notesStorageKey) || '[]');
    notes = Array.isArray(storedNotes) ? storedNotes.filter(note => note && typeof note.title === 'string' && typeof note.content === 'string') : [];
  } catch {
    notes = [];
  }

  const saveNotes = () => localStorage.setItem(notesStorageKey, JSON.stringify(notes));

  const openEditor = (note) => {
    editingNoteId = note ? note.id : null;
    notesForm.reset();
    notesForm.querySelector('#notes-editor-title').textContent = note ? 'Edit note' : 'Add a note';
    if (note) {
      titleInput.value = note.title;
      contentInput.value = note.content;
    }
    notesDialog.hidden = false;
    titleInput.focus();
  };

  const closeEditor = () => {
    notesDialog.hidden = true;
    editingNoteId = null;
    notesForm.reset();
  };

  const renderNotes = () => {
    notesList.replaceChildren();
    notes.forEach(note => {
      const article = document.createElement('article');
      article.className = 'notes-note';
      const top = document.createElement('div');
      top.className = 'notes-note-top';
      const title = document.createElement('h3');
      title.textContent = note.title;
      const actions = document.createElement('div');
      actions.className = 'notes-note-actions';
      const editButton = document.createElement('button');
      editButton.type = 'button';
      editButton.textContent = 'Edit';
      editButton.addEventListener('click', () => openEditor(note));
      const deleteButton = document.createElement('button');
      deleteButton.type = 'button';
      deleteButton.className = 'notes-delete-button';
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', () => {
        if (window.confirm('Delete this note?')) {
          notes = notes.filter(item => item.id !== note.id);
          saveNotes();
          renderNotes();
        }
      });
      actions.append(editButton, deleteButton);
      top.append(title, actions);
      const content = document.createElement('p');
      content.textContent = note.content;
      article.append(top, content);
      notesList.append(article);
    });
  };

  addNoteButton.addEventListener('click', () => openEditor());
  notesSection.querySelectorAll('[data-notes-cancel]').forEach(button => button.addEventListener('click', closeEditor));
  notesForm.addEventListener('submit', event => {
    event.preventDefault();
    const title = titleInput.value.trim();
    const content = contentInput.value.trim();
    if (!title || !content) return;
    if (editingNoteId) {
      notes = notes.map(note => note.id === editingNoteId ? { ...note, title, content } : note);
    } else {
      notes.push({ id: `${Date.now()}-${Math.random().toString(16).slice(2)}`, title, content });
    }
    saveNotes();
    renderNotes();
    closeEditor();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !notesDialog.hidden) closeEditor();
  });
  renderNotes();
}
