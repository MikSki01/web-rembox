// ЛР5 — інтерактивність сайту «РемБокс».
// Інтерфейс змінюється через перемикання CSS-класів (не через inline-стилі).
"use strict";

// ---------- 1. Мобільне меню (показати / сховати навігацію) ----------
const navToggle = document.querySelector(".nav-toggle");
const mainNav = document.querySelector("#main-nav");

if (navToggle && mainNav) {
  navToggle.addEventListener("click", () => {
    const opened = mainNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(opened));
    navToggle.textContent = opened ? "Закрити" : "Меню";
  });

  // Після переходу за пунктом меню — згортаємо його на мобільному
  mainNav.addEventListener("click", (event) => {
    if (event.target.matches("a") && mainNav.classList.contains("is-open")) {
      mainNav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.textContent = "Меню";
    }
  });
}

// ---------- 2. «Показати більше» (розгорнути / згорнути текст) ----------
const moreBtn = document.querySelector('[data-toggle="more"]');
const moreText = document.querySelector(".more-text");

if (moreBtn && moreText) {
  moreBtn.addEventListener("click", () => {
    const hidden = moreText.toggleAttribute("hidden");
    moreBtn.textContent = hidden ? "Показати більше" : "Згорнути";
  });
}

// ---------- 3. «Зберегти напрям» (обране + лічильник) ----------
const favButtons = document.querySelectorAll(".fav");
const favCount = document.querySelector("[data-fav-count]");

if (favButtons.length && favCount) {
  const updateCount = () => {
    const saved = document.querySelectorAll(".card.is-saved").length;
    favCount.textContent = String(saved);
  };

  favButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const card = button.closest(".card");
      const saved = card.classList.toggle("is-saved");
      button.setAttribute("aria-pressed", String(saved));
      button.textContent = saved ? "★ Збережено" : "☆ Зберегти напрям";
      updateCount();
    });
  });
}
