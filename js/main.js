// Головний модуль (entry). Підключається як <script type="module">.
// Асинхронно завантажує каталог послуг, керує станами «Завантаження» / «Помилка»,
// пошуком (з debounce), фільтром за категорією та обраним.
import { fetchServices } from "./api.js";
import { renderCatalog, setMessage } from "./render.js";
import { debounce } from "./utils.js";
import { initUi } from "./ui.js";

initUi();

const catalog = document.querySelector("#catalog");
const searchInput = document.querySelector("#search");
const categorySelect = document.querySelector("#category");
const noResults = document.querySelector(".no-results");
const status = document.querySelector("#catalog-status");
const favCount = document.querySelector("[data-fav-count]");

let services = []; // завантажується з data/items.json

// Відбір за запитом (без регістру) і категорією одночасно.
function applyFilters() {
  const query = searchInput.value.trim().toLowerCase();
  const category = categorySelect.value;
  const filtered = services.filter((item) => {
    const matchesCategory = category === "all" || item.category === category;
    const matchesQuery =
      item.title.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query);
    return matchesCategory && matchesQuery;
  });
  renderCatalog(catalog, filtered);
  noResults.hidden = filtered.length > 0;
}

// Асинхронне завантаження з обробкою станів.
async function loadCatalog() {
  setMessage(status, "Завантаження…");
  noResults.hidden = true;
  catalog.replaceChildren();
  try {
    services = await fetchServices();
    applyFilters();
  } catch (error) {
    renderError(error.message);
  } finally {
    if (services.length) setMessage(status, ""); // сховати «Завантаження», якщо дані є
  }
}

// Стан помилки з кнопкою повторної спроби.
function renderError(message) {
  status.hidden = false;
  status.textContent = `Помилка: ${message}. `;
  const retry = document.createElement("button");
  retry.className = "button button-ghost";
  retry.type = "button";
  retry.textContent = "Повторити";
  retry.addEventListener("click", loadCatalog);
  status.append(retry);
}

// Пошук із затримкою 300 мс, щоб не фільтрувати на кожну літеру.
searchInput.addEventListener("input", debounce(applyFilters, 300));
categorySelect.addEventListener("change", applyFilters);

// Обране через делегування подій — працює для динамічних карток.
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

loadCatalog();
