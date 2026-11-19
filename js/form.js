// Модуль форми заявки (ЛР8): перевірка, збереження заявок і чернетки у localStorage.
import { read, write, remove } from "./storage.js";

const DRAFT_KEY = "rembox_form_draft"; // незавершена чернетка полів форми
const ORDERS_KEY = "rembox_orders";    // надіслані заявки

const DEVICE_LABELS = {
  laptop: "Ноутбук / ПК",
  phone: "Смартфон / планшет",
  appliance: "Побутова техніка",
};

// Ініціалізує логіку форми: відновлення чернетки, автозбереження, надсилання і список заявок.
export function initForm() {
  const form = document.querySelector(".order-form");
  if (!form) return;

  const success = document.querySelector("#form-success");
  const ordersSection = document.querySelector("#orders");
  const ordersList = document.querySelector("#orders-list");
  const fields = ["name", "phone", "email", "device", "problem"];

  // 1. Відновлюємо раніше збережену чернетку.
  const draft = read(DRAFT_KEY, null);
  if (draft) {
    fields.forEach((name) => {
      if (form.elements[name] && typeof draft[name] === "string") {
        form.elements[name].value = draft[name];
      }
    });
  }

  // 2. Автозбереження чернетки під час введення.
  form.addEventListener("input", () => {
    const data = {};
    fields.forEach((name) => {
      data[name] = form.elements[name] ? form.elements[name].value : "";
    });
    write(DRAFT_KEY, data);
  });

  // 3. Надсилання заявки.
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity(); // показуємо вбудовані повідомлення браузера
      return;
    }
    const order = {
      id: Date.now(),
      name: form.elements.name.value.trim(),
      phone: form.elements.phone.value.trim(),
      email: form.elements.email.value.trim(),
      device: form.elements.device.value,
      problem: form.elements.problem.value.trim(),
      createdAt: new Date().toLocaleString("uk-UA"),
    };

    const orders = read(ORDERS_KEY, []);
    orders.unshift(order);
    write(ORDERS_KEY, orders);

    remove(DRAFT_KEY); // чернетка більше не потрібна
    form.reset();
    showSuccess(success, order.name);
    renderOrders(ordersSection, ordersList);
  });

  // 4. Показуємо список раніше збережених заявок (переживає перезавантаження).
  renderOrders(ordersSection, ordersList);
}

// Повідомлення про успіх.
function showSuccess(element, name) {
  if (!element) return;
  element.textContent = `Дякуємо, ${name}! Заявку збережено. Ми зв'яжемося з вами найближчим часом.`;
  element.hidden = false;
}

// Рендерить збережені заявки з кнопкою видалення.
function renderOrders(section, list) {
  if (!section || !list) return;
  const orders = read(ORDERS_KEY, []);
  list.replaceChildren();

  if (!orders.length) {
    section.hidden = true;
    return;
  }
  section.hidden = false;

  orders.forEach((order) => {
    const item = document.createElement("li");
    item.className = "order-card";

    const head = document.createElement("p");
    head.className = "order-head";
    head.textContent = `${DEVICE_LABELS[order.device] || order.device} · ${order.createdAt}`;

    const who = document.createElement("p");
    who.textContent = `${order.name}, ${order.phone}`;

    const problem = document.createElement("p");
    problem.className = "order-problem";
    problem.textContent = order.problem;

    const del = document.createElement("button");
    del.className = "button button-ghost order-del";
    del.type = "button";
    del.textContent = "Видалити";
    del.addEventListener("click", () => {
      const left = read(ORDERS_KEY, []).filter((o) => o.id !== order.id);
      write(ORDERS_KEY, left);
      renderOrders(section, list);
    });

    item.append(head, who, problem, del);
    list.append(item);
  });
}
