// Модуль рендерингу: безпечне формування DOM (createElement + textContent, без innerHTML).

// Створює DOM-елемент однієї картки послуги.
export function createCard(item) {
  const article = document.createElement("article");
  article.className = "card";
  article.dataset.id = item.id;

  const img = document.createElement("img");
  img.className = "card-image";
  img.src = item.image;
  img.alt = item.title;
  img.width = 80;
  img.height = 80;

  const title = document.createElement("h3");
  title.textContent = item.title;

  const desc = document.createElement("p");
  desc.textContent = item.description;

  const button = document.createElement("button");
  button.className = "fav";
  button.type = "button";
  button.setAttribute("aria-pressed", "false");
  button.textContent = "☆ Зберегти послугу";

  article.append(img, title, desc, button);
  return article;
}

// Рендерить список карток у контейнер (замінює попередній вміст).
export function renderCatalog(container, items) {
  container.replaceChildren(...items.map(createCard));
}

// Показує/ховає текстове повідомлення (завантаження, помилка, порожній результат).
export function setMessage(element, text) {
  element.textContent = text;
  element.hidden = !text;
}
