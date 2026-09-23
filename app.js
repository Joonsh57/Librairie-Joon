const books = [
  { title: "Still Life", author: "Sarah Winman", category: "Romans", price: "35 000 Ar", cover: "https://files.manuscdn.com/search-media/310519663561245363/fup7KtQenoZEzvCb3EDwz8/Bz3XArUKP97aDpP39Habqc.jpg", label: "Coup de cœur" },
  { title: "Le vieux qui lisait des romans d'amour", author: "Luis Sepúlveda", category: "Romans", price: "28 000 Ar", cover: "https://files.manuscdn.com/search-media/310519663561245363/fup7KtQenoZEzvCb3EDwz8/rpLdYpNto7qJ3QiU7AM3KJ.jpg", label: "À découvrir" },
  { title: "Une histoire du monde", author: "David Hockney", category: "Essais", price: "42 000 Ar", cover: "https://files.manuscdn.com/search-media/310519663561245363/fup7KtQenoZEzvCb3EDwz8/8hXoAieBptgziwPYXqUVPh.jpg", label: "Nouveau" },
  { title: "Le goût des voyages", author: "Collectif", category: "Beaux livres", price: "60 000 Ar", cover: "https://files.manuscdn.com/search-media/310519663561245363/fup7KtQenoZEzvCb3EDwz8/3GpATjbqQCsu.jpg", label: "Édition" },
  { title: "La couleur des émotions", author: "Anna Llenas", category: "Jeunesse", price: "31 000 Ar", cover: "https://files.manuscdn.com/search-media/310519663561245363/fup7KtQenoZEzvCb3EDwz8/SlPP6YKCLpxr.jpg", label: "Dès 4 ans" },
  { title: "L'art de la simplicité", author: "Dominique Loreau", category: "Essais", price: "29 000 Ar", cover: "https://files.manuscdn.com/search-media/310519663561245363/fup7KtQenoZEzvCb3EDwz8/tfW0ofOGGpIk.jpg", label: "Essentiel" },
  { title: "Le jardin secret", author: "Frances Hodgson Burnett", category: "Jeunesse", price: "25 000 Ar", cover: "https://files.manuscdn.com/search-media/310519663561245363/fup7KtQenoZEzvCb3EDwz8/GoStHhmDpqjmeMcnxQfZoK.jpg", label: "Classique" },
  { title: "Lire le monde", author: "A. S. Byatt", category: "Beaux livres", price: "47 000 Ar", cover: "https://files.manuscdn.com/search-media/310519663561245363/fup7KtQenoZEzvCb3EDwz8/8hXoAieBptgziwPYXqUVPh.jpg", label: "À feuilleter" },
];

const grid = document.querySelector('#book-grid');
const empty = document.querySelector('#empty-state');
const search = document.querySelector('#search');
let activeCategory = 'Tous';

function renderBooks() {
  const query = search.value.trim().toLowerCase();
  const visible = books.filter((book) => {
    const categoryMatch = activeCategory === 'Tous' || book.category === activeCategory;
    const queryMatch = `${book.title} ${book.author}`.toLowerCase().includes(query);
    return categoryMatch && queryMatch;
  });
  grid.innerHTML = visible.map((book) => `
    <article class="book-card">
      <div class="cover"><img src="${book.cover}" alt="Couverture de ${book.title}" loading="lazy" referrerpolicy="no-referrer"><span class="cover-label">${book.label}</span></div>
      <div class="book-info"><h3>${book.title}</h3><p>${book.author}</p><div class="book-meta"><strong>${book.price}</strong><span>${book.category}</span></div></div>
    </article>`).join('');
  empty.hidden = visible.length !== 0;
}

document.querySelectorAll('.filter').forEach((button) => button.addEventListener('click', () => {
  activeCategory = button.dataset.category;
  document.querySelectorAll('.filter').forEach((item) => item.classList.toggle('active', item === button));
  renderBooks();
}));
search.addEventListener('input', renderBooks);
document.querySelectorAll('[data-jump]').forEach((card) => card.addEventListener('click', () => {
  activeCategory = card.dataset.jump;
  document.querySelectorAll('.filter').forEach((item) => item.classList.toggle('active', item.dataset.category === activeCategory));
  renderBooks();
}));

const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
toggle.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') === 'true';
  toggle.setAttribute('aria-expanded', String(!open));
  nav.style.display = open ? '' : 'flex';
  nav.style.position = open ? '' : 'absolute';
  nav.style.top = open ? '' : '76px';
  nav.style.right = open ? '' : '17px';
  nav.style.flexDirection = open ? '' : 'column';
  nav.style.padding = open ? '' : '18px';
  nav.style.background = open ? '' : 'var(--paper)';
  nav.style.boxShadow = open ? '' : '0 15px 30px rgba(24,43,58,.15)';
} );

document.querySelectorAll('.main-nav a').forEach((link) => link.addEventListener('click', () => {
  toggle.setAttribute('aria-expanded', 'false');
  nav.style.display = '';
}));

renderBooks();

