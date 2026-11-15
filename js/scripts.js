// ЛР6 — динамічне формування DOM: каталог послуг із пошуком і фільтром за категорією.
"use strict";

// Дані каталогу: масив об'єктів (id, title, category, description, image).
const services = [
  { id: 1, title: "Заміна екрана ноутбука", category: "laptop",
    description: "Швидка заміна матриці та захисного скла ноутбука.", image: "images/tools.svg" },
  { id: 2, title: "Чистка та заміна термопасти", category: "laptop",
    description: "Усуваємо перегрів і шум вентиляторів ПК та ноутбуків.", image: "images/tools.svg" },
  { id: 3, title: "Ремонт материнської плати", category: "laptop",
    description: "Діагностика й пайка материнських плат після збоїв.", image: "images/tools.svg" },
  { id: 4, title: "Заміна дисплея смартфона", category: "phone",
    description: "Міняємо дисплейні модулі смартфонів і планшетів.", image: "images/tools.svg" },
  { id: 5, title: "Заміна акумулятора", category: "phone",
    description: "Повертаємо автономність пристрою новим акумулятором.", image: "images/tools.svg" },
  { id: 6, title: "Ремонт роз'єму зарядки", category: "phone",
    description: "Пайка та заміна гнізда заряджання смартфона.", image: "images/tools.svg" },
  { id: 7, title: "Ремонт кавомашини", category: "appliance",
    description: "Чистка, заміна ущільнювачів і ремонт помпи кавомашини.", image: "images/workshop.svg" },
  { id: 8, title: "Ремонт пилососа", category: "appliance",
    description: "Відновлюємо тягу та замінюємо щітки й двигун пилососа.", image: "images/workshop.svg" },
  { id: 9, title: "Ремонт мікрохвильової печі", category: "appliance",
    description: "Безпечний ремонт магнетрона та електроніки НВЧ-печі.", image: "images/workshop.svg" },
];

const catalog = document.querySelector("#catalog");
const searchInput = document.querySelector("#search");
const categorySelect = document.querySelector("#category");
const noResults = document.querySelector(".no-results");
const favCount = document.querySelector("[data-fav-count]");

if (catalog) {
  // Створення розмітки однієї картки (окрема функція, шаблонні рядки).
  const createCard = (item) => `
    <article class="card" data-id="${item.id}">
      <img class="card-image" src="${item.image}" alt="${item.title}" width="80" height="80" />
      <h3>${item.title}</h3>
      <p>${item.description}</p>
      <button class="fav" type="button" aria-pressed="false">☆ Зберегти послугу</button>
    </article>`;

  // Рендеринг списку карток (окрема функція). Показує повідомлення, якщо список порожній.
  const renderList = (items) => {
    catalog.innerHTML = items.map(createCard).join("");
    noResults.hidden = items.length > 0;
  };

  // Відбір за пошуковим запитом (без урахування регістру) та категорією одночасно.
  const applyFilters = () => {
    const query = searchInput.value.trim().toLowerCase();
    const category = categorySelect.value;
    const filtered = services.filter((item) => {
      const matchesCategory = category === "all" || item.category === category;
      const matchesQuery =
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query);
      return matchesCategory && matchesQuery;
    });
    renderList(filtered);
  };

  searchInput.addEventListener("input", applyFilters);
  categorySelect.addEventListener("change", applyFilters);

  // Обране через делегування подій — працює й для динамічно створених карток.
  catalog.addEventListener("click", (event) => {
    const button = event.target.closest(".fav");
    if (!button) return;
    const card = button.closest(".card");
    const saved = card.classList.toggle("is-saved");
    button.setAttribute("aria-pressed", String(saved));
    button.textContent = saved ? "★ Збережено" : "☆ Зберегти послугу";
    if (favCount) {
      favCount.textContent = String(document.querySelectorAll(".card.is-saved").length);
    }
  });

  renderList(services); // початковий показ усіх послуг
}
