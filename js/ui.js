// Модуль інтерфейсу: мобільне меню та кнопка «Показати більше».

export function initUi() {
  // Мобільне меню — показати/сховати навігацію.
  const navToggle = document.querySelector(".nav-toggle");
  const mainNav = document.querySelector("#main-nav");

  if (navToggle && mainNav) {
    navToggle.addEventListener("click", () => {
      const opened = mainNav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(opened));
      navToggle.textContent = opened ? "Закрити" : "Меню";
    });

    mainNav.addEventListener("click", (event) => {
      if (event.target.matches("a") && mainNav.classList.contains("is-open")) {
        mainNav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.textContent = "Меню";
      }
    });
  }

  // «Показати більше» — розгорнути/згорнути додатковий текст.
  const moreBtn = document.querySelector('[data-toggle="more"]');
  const moreText = document.querySelector(".more-text");

  if (moreBtn && moreText) {
    moreBtn.addEventListener("click", () => {
      const hidden = moreText.toggleAttribute("hidden");
      moreBtn.textContent = hidden ? "Показати більше" : "Згорнути";
    });
  }
}
